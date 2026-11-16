import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { readdir, readFile } from "node:fs/promises";
import { readJson, hash } from "./io.mjs";
export async function loadEvidence() {
  return {
    ...(await readJson("data/reviewed/evidence.json")),
    sources: await readJson("data/reviewed/sources.json"),
    publications: await readJson("data/reviewed/publications.json"),
    perspectives: await readJson("data/reviewed/perspectives.json"),
  };
}
export async function createSchemaValidator() {
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  for (const file of (await readdir("schemas/v1")).filter((f) =>
    f.endsWith(".json"),
  ))
    ajv.addSchema(await readJson(`schemas/v1/${file}`));
  return (kind, record) => {
    const valid = ajv.getSchema(
      `https://ethics.egohygiene.io/schemas/v1/${kind}.schema.json`,
    );
    if (!valid?.(record))
      throw new Error(`${record.id || kind}: ${JSON.stringify(valid?.errors)}`);
  };
}
export function validateGraph(data) {
  const records = Object.values(data).filter(Array.isArray).flat();
  const byId = new Map();
  for (const record of records) {
    if (byId.has(record.id)) throw new Error(`Duplicate ID: ${record.id}`);
    byId.set(record.id, record);
  }
  function reference(id, kind) {
    const found = byId.get(id);
    if (!found || (kind && found.kind !== kind))
      throw new Error(`Unresolved ${kind || "record"} reference: ${id}`);
    return found;
  }
  for (const record of records) {
    for (const key of [
      "sourceIds",
      "evidenceRefs",
      "observationIds",
      "claimIds",
    ]) {
      const kind = {
        sourceIds: "source",
        evidenceRefs: "evidence",
        observationIds: "observation",
        claimIds: "claim",
      }[key];
      for (const id of record[key] || []) reference(id, kind);
    }
    if (record.sourceId) reference(record.sourceId, "source");
    if (record.metricId) reference(record.metricId, "metric");
    if (record.datasetId) reference(record.datasetId, "dataset");
    if (
      record.review?.status === "human_reviewed" &&
      !record.review.humanReviewedAt
    )
      throw new Error(`Missing human review clock: ${record.id}`);
    if (
      record.freshness?.lastHumanReviewAt !== undefined &&
      record.freshness.lastHumanReviewAt !== record.review?.humanReviewedAt
    )
      throw new Error(`Human review clock mismatch: ${record.id}`);
  }
  for (const source of data.sources) {
    if (source.automated && source.accessMode !== "automated_dataset")
      throw new Error(`Automation not permitted for ${source.id}`);
    if (source.availability !== "accessible" && source.freshness.lastCheckedAt)
      throw new Error(
        `Failed access cannot establish successful freshness for ${source.id}`,
      );
  }
  for (const observation of data.observations) {
    const dataset = reference(observation.datasetId, "dataset");
    if (
      dataset.metricId !== observation.metricId ||
      !dataset.observationIds.includes(observation.id)
    )
      throw new Error(`Dataset/metric membership mismatch: ${observation.id}`);
    if (
      JSON.stringify(observation.amount.evidenceRefs) !==
      JSON.stringify(observation.evidenceRefs)
    )
      throw new Error(`Amount evidence mismatch: ${observation.id}`);
    for (const id of observation.evidenceRefs) {
      const evidence = reference(id, "evidence");
      if (!observation.sourceIds.includes(evidence.sourceId))
        throw new Error(`Source lineage mismatch: ${observation.id}`);
    }
    const value = observation.amount.value;
    if (
      value !== null &&
      !Array.isArray(value) &&
      (typeof value !== "number" || !Number.isFinite(value))
    )
      throw new Error(
        `Observation requires a finite numeric amount: ${observation.id}`,
      );
    if (
      Array.isArray(value) &&
      (value.length !== 2 ||
        value[0] > value[1] ||
        value.some((n) => !Number.isFinite(n)))
    )
      throw new Error(`Invalid scenario range: ${observation.id}`);
    if (observation.classification === "projection" && !observation.uncertainty)
      throw new Error(`Projection without uncertainty: ${observation.id}`);
  }
  for (const dataset of data.datasets)
    for (const id of dataset.observationIds) {
      if (reference(id, "observation").datasetId !== dataset.id)
        throw new Error(`Observation assigned to different dataset: ${id}`);
    }
  for (const claim of data.claims) {
    const cited = new Set(
      claim.evidenceRefs.map((id) => reference(id, "evidence").sourceId),
    );
    if (
      claim.sourceIds.some((id) => !cited.has(id)) ||
      [...cited].some((id) => !claim.sourceIds.includes(id))
    )
      throw new Error(`Claim lineage mismatch: ${claim.id}`);
  }
  for (const chart of data.visualizations) {
    const dataset = reference(chart.datasetId, "dataset");
    for (const id of dataset.observationIds) {
      const observation = reference(id, "observation");
      const value = observation.amount.value;
      if (value === null) continue;
      if (Math.max(...(Array.isArray(value) ? value : [value])) > chart.axisMax)
        throw new Error(`Chart clips an exact value: ${chart.id}`);
    }
  }
  const dois = data.publications.map((p) => p.doi.toLowerCase());
  if (new Set(dois).size !== dois.length)
    throw new Error("Duplicate DOI in reading queue");
  return { byId, records };
}
export async function validateEvidence(data) {
  data ??= await loadEvidence();
  const validateSchema = await createSchemaValidator();
  const result = validateGraph(data);
  for (const record of result.records) validateSchema(record.kind, record);
  for (const evidence of data.evidence) {
    if (!/^data\/raw\/[a-z0-9-]+\.json$/.test(evidence.rawRef))
      throw new Error(`Unsafe raw reference: ${evidence.id}`);
    const raw = await readJson(evidence.rawRef);
    if (
      hash(raw.excerpt) !== raw.sha256 ||
      raw.excerpt !== evidence.excerpt ||
      raw.sourceId !== evidence.sourceId ||
      raw.originalUrl !== evidence.url
    )
      throw new Error(`Source capture integrity mismatch: ${evidence.id}`);
  }
  return { ...result, validateSchema };
}
export async function verifyManifest(manifest) {
  const validateSchema = await createSchemaValidator();
  validateSchema("dataset-manifest", manifest);
  if (new Set(manifest.files.map((f) => f.path)).size !== manifest.files.length)
    throw new Error("Duplicate manifest file path");
  for (const file of manifest.files) {
    if (!/^data\/v1\/[a-z.-]+\.json$/.test(file.path))
      throw new Error("Unsafe manifest path");
    const bytes = await readFile(`public/${file.path}`);
    if (hash(bytes) !== file.sha256 || bytes.byteLength !== file.bytes)
      throw new Error(`Manifest integrity mismatch: ${file.path}`);
  }
  const view = await readJson("public/data/v1/observatory.json");
  const counts = Object.fromEntries(
    Object.entries(view)
      .filter(([, v]) => Array.isArray(v))
      .map(([key, value]) => [key, value.length]),
  );
  if (JSON.stringify(counts) !== JSON.stringify(manifest.recordCounts))
    throw new Error("Manifest record counts mismatch");
  const attributions = view.sources.map(({ id, title, url, licenseNotes }) => ({
    id,
    title,
    url,
    licenseNotes,
  }));
  if (
    JSON.stringify(attributions) !== JSON.stringify(manifest.sourceAttributions)
  )
    throw new Error("Manifest attribution mismatch");
}
