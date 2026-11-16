import test from "node:test";
import assert from "node:assert/strict";
import { loadEvidence, validateEvidence, validateGraph, createSchemaValidator, verifyManifest } from "../scripts/lib/validate.mjs";
import { readJson } from "../scripts/lib/io.mjs";
const evidence = await loadEvidence();
test("published evidence satisfies schemas, raw capture hashes, and graph invariants", async () => {
  const result = await validateEvidence(evidence);
  assert.equal(evidence.visualizations.length, 3);
  assert.ok(evidence.sources.every(s => s.review.humanReviewedAt === null));
});
test("source values preserve projection ranges, price boundaries, and exact endpoints", () => {
  assert.deepEqual(evidence.observations.map(o => o.amount.value), [415, 945, 58, 176, [325, 580], 20, 0.07]);
  assert.equal(evidence.observations.filter(o => o.classification === "projection").length, 2);
  assert.equal(evidence.metrics.find(m => m.id === "metric-inference-price").unit, "USD / million tokens");
  assert.ok(evidence.metrics.filter(m => m.unit === "TWh / year").every(m => m.coverage === "all_data_centers"));
});
test("broken evidence lineage, duplicate IDs, clipping, and inverted ranges fail closed", () => {
  const broken = structuredClone(evidence); broken.observations[0].evidenceRefs = ["missing-evidence"];
  assert.throws(() => validateGraph(broken), /Unresolved/);
  const duplicate = structuredClone(evidence); duplicate.sources[1].id = duplicate.sources[0].id;
  assert.throws(() => validateGraph(duplicate), /Duplicate ID/);
  const clipped = structuredClone(evidence); clipped.visualizations[0].axisMax = 400;
  assert.throws(() => validateGraph(clipped), /clips/);
  const inverted = structuredClone(evidence); inverted.observations[4].amount.value = [580, 325];
  assert.throws(() => validateGraph(inverted), /Invalid scenario range/);
});
test("missing states never masquerade as zero; conflicts need multiple evidence references", async () => {
  const validate = await createSchemaValidator();
  const sample = structuredClone(evidence.observations[0]);
  for (const state of ["unknown", "not_available", "not_researched", "not_applicable"]) {
    sample.amount = { status: state, value: null, evidenceRefs: [], note: "Explicit gap" };
    validate("observation", sample);
    sample.amount.value = 0;
    assert.throws(() => validate("observation", sample));
  }
  sample.amount = { status: "conflicting", value: 415, evidenceRefs: ["evidence-iea"], note: "Conflict" };
  assert.throws(() => validate("observation", sample));
  sample.amount.evidenceRefs.push("evidence-doe"); validate("observation", sample);
  sample.amount = { status: "known", value: 0, evidenceRefs: ["evidence-iea"], note: "Explicit zero" };
  validate("observation", sample);
});
test("agent checks cannot silently acquire a human review date", () => {
  const data = structuredClone(evidence); data.datasets[0].freshness.lastHumanReviewAt = "2026-11-16T00:00:00Z";
  assert.throws(() => validateGraph(data), /Human review clock mismatch/);
});
test("materialized release files match manifest hashes", async () => {
  const manifest = await readJson("public/data/v1/manifest.json");
  await verifyManifest(manifest);
  const bad = structuredClone(manifest); bad.files[0].sha256 = "0".repeat(64);
  await assert.rejects(verifyManifest(bad), /integrity mismatch/);
});
