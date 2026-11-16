import { readJson, hash } from "./lib/io.mjs";
import { createSchemaValidator } from "./lib/validate.mjs";
import { canonicalDoi } from "./lib/crossref.mjs";
const candidate = await readJson("data/candidates/research.json");
if (
  candidate.provider !== "crossref" ||
  candidate.schemaVersion !== "1.0.0" ||
  candidate.requests > 18 ||
  candidate.captures.length !== 9
)
  throw Error("Invalid candidate source, version, or request budget");
const validate = await createSchemaValidator();
const dois = new Set();
for (const paper of candidate.publications) {
  validate("publication", paper);
  const doi = canonicalDoi(paper.doi);
  if (dois.has(doi)) throw Error("Duplicate DOI");
  dois.add(doi);
  if (paper.sourceId !== "crossref" || paper.review.humanReviewedAt !== null)
    throw Error("Candidate cannot imply source or human review approval");
}
const expected = hash(
  JSON.stringify(
    candidate.publications.map(({ retrievedAt, review, ...p }) => p),
  ),
);
if (candidate.contentHash !== expected)
  throw Error("Candidate content hash mismatch");
console.log(
  `Validated ${candidate.publications.length} discovery candidates. No records were promoted.`,
);
