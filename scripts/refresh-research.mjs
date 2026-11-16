import { discoverResearch } from "./lib/crossref.mjs";
import { readJson, writeJson } from "./lib/io.mjs";
const candidate = await discoverResearch();
let previous;
try { previous = await readJson("data/candidates/research.json"); } catch (error) { if (error.code !== "ENOENT") throw error; }
// Stable discovery content avoids a new PR just because the refresh clock advanced.
if (previous?.contentHash === candidate.contentHash) console.log(`Crossref checked successfully: ${candidate.publications.length} records; no material metadata change.`);
else {
  await writeJson("data/candidates/research.json", candidate);
  console.log(`Prepared ${candidate.publications.length} DOI-deduplicated candidate records from ${candidate.requests} requests. Published evidence is unchanged; inspect and explicitly curate before promotion.`);
}
