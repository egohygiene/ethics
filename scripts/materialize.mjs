import { cp, mkdir, readFile } from "node:fs/promises";
import {
  loadEvidence,
  validateEvidence,
  verifyManifest,
} from "./lib/validate.mjs";
import { hash, jsonBytes, writeJson } from "./lib/io.mjs";
const data = await loadEvidence();
await validateEvidence(data);
const view = { ...data, releaseVersion: "0.1.0" };
await writeJson("public/data/v1/observatory.json", view);
const bytes = jsonBytes(view);
const clocks = Object.values(data)
  .filter(Array.isArray)
  .flat()
  .flatMap((r) => [
    r.retrievedAt,
    r.review?.checkedAt,
    r.freshness?.lastMaterialChangeAt,
  ])
  .filter(Boolean);
const generatorFiles = [
  "scripts/materialize.mjs",
  "scripts/lib/io.mjs",
  "scripts/lib/validate.mjs",
];
const generatorCode = (
  await Promise.all(generatorFiles.map((file) => readFile(file, "utf8")))
).join("\n");
const manifest = {
  schemaVersion: "1.0.0",
  id: "ethics-v01-manifest",
  kind: "dataset-manifest",
  releaseVersion: "0.1.0",
  schemaDirectory: "schemas/v1",
  evidenceAsOf: clocks.sort().at(-1),
  generator: {
    id: "ethics-materialize",
    version: "1.0.0",
    codeSha256: hash(generatorCode),
  },
  files: [
    {
      path: "data/v1/observatory.json",
      sha256: hash(bytes),
      bytes: Buffer.byteLength(bytes),
    },
  ],
  recordCounts: Object.fromEntries(
    Object.entries(data)
      .filter(([, value]) => Array.isArray(value))
      .map(([key, value]) => [key, value.length]),
  ),
  sourceAttributions: data.sources.map(({ id, title, url, licenseNotes }) => ({
    id,
    title,
    url,
    licenseNotes,
  })),
  limitations: [
    "Selected evidence, not a comprehensive assessment of AI.",
    "Report values are manually transcribed and agent checked; independent human evidence review is pending.",
    "Data-center totals include non-AI activity. Projections are conditional; API price is not energy.",
    "Research metadata is a reading queue, not validated findings. Scheduled discovery changes remain candidates.",
  ],
};
await writeJson("public/data/v1/manifest.json", manifest);
await verifyManifest(manifest);
await mkdir("public/schemas/v1", { recursive: true });
await cp("schemas/v1", "public/schemas/v1", { recursive: true });
console.log(
  `Materialized ${data.visualizations.length} source-backed chart definitions and a verified SHA-256 release manifest. Source clocks preserved.`,
);
