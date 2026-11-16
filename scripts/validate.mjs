import { readFile } from "node:fs/promises";
import { loadEvidence, validateEvidence } from "./lib/validate.mjs";
const data = await loadEvidence();
const { records } = await validateEvidence(data);
const domain = (await readFile("public/CNAME", "utf8")).trim();
if (domain !== "ethics.egohygiene.io")
  throw new Error("Unexpected Pages custom domain");
console.log(
  `Validated ${records.length} records against 11 v1 resource contracts, source capture integrity, and evidence graph invariants. Human review remains explicit.`,
);
