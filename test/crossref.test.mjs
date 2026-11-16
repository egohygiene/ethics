import test from "node:test";
import assert from "node:assert/strict";
import {
  canonicalDoi,
  normalizeWork,
  deduplicatePublications,
  discoverResearch,
} from "../scripts/lib/crossref.mjs";
const date = "2026-11-16T00:00:00Z";
const item = {
  DOI: "10.1234/Example",
  title: ["<i>Energy</i> research"],
  type: "journal-article",
  published: { "date-parts": [[2024, 6]] },
};
test("DOI identity and topic merging are independent of URL spelling", () => {
  assert.equal(
    canonicalDoi("https://doi.org/10.1234/EXAMPLE"),
    "10.1234/example",
  );
  const a = normalizeWork(item, "efficiency", date),
    b = normalizeWork({ ...item, DOI: "10.1234/example" }, "environment", date);
  const records = deduplicatePublications([a, b]);
  assert.equal(records.length, 1);
  assert.deepEqual(records[0].topics, ["efficiency", "environment"]);
  assert.deepEqual(a.topics, ["efficiency"]);
  assert.equal(a.publicationDate, "2024-06-01");
  assert.equal(a.peerReview, "unverified");
});
test("malformed metadata and future publications cannot be published", () => {
  assert.equal(normalizeWork({ ...item, DOI: "bad" }, "safety", date), null);
  assert.equal(normalizeWork({ ...item, title: [] }, "safety", date), null);
  assert.equal(
    normalizeWork(
      { ...item, published: { "date-parts": [[2099]] } },
      "safety",
      date,
    ),
    null,
  );
});
test("adapter respects request budget and returns only deduplicated metadata", async () => {
  let calls = 0;
  const fetcher = async () => {
    calls++;
    return { ok: true, json: async () => ({ message: { items: [item] } }) };
  };
  const result = await discoverResearch({ fetcher, checkedAt: date });
  assert.equal(calls, 9);
  assert.equal(result.publications.length, 1);
  assert.equal(result.publications[0].topics.length, 9);
  await assert.rejects(
    discoverResearch({ fetcher, checkedAt: date, maxRequests: 2 }),
    /budget exhausted/,
  );
});
test("upstream failure and invalid JSON shape abort rather than promote partial results", async () => {
  await assert.rejects(
    discoverResearch({
      fetcher: async () => ({ ok: false, status: 403 }),
      checkedAt: date,
    }),
    /HTTP 403/,
  );
  await assert.rejects(
    discoverResearch({
      fetcher: async () => ({ ok: true, json: async () => ({ message: {} }) }),
      checkedAt: date,
    }),
    /no metadata items/,
  );
});
