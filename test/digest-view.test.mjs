import test from "node:test";
import assert from "node:assert/strict";
import { readJson } from "../scripts/lib/io.mjs";
import {
  endpointRatio,
  comparisonFor,
  formatRatio,
  releaseInventory,
  topicCoverage,
} from "../src/lib/digest-view.js";
const data = {
  ...(await readJson("data/reviewed/evidence.json")),
  sources: await readJson("data/reviewed/sources.json"),
};
test("derived comparisons retain their actual source endpoints and scenario range", () => {
  assert.equal(formatRatio(comparisonFor(data, "chart-global")), "≈2.3×");
  assert.deepEqual(comparisonFor(data, "chart-us").ratio, [
    325 / 176,
    580 / 176,
  ]);
  assert.equal(formatRatio(comparisonFor(data, "chart-price")), "≈286×");
  assert.equal(
    comparisonFor(data, "chart-price").denominator,
    "obs-price-2024-10",
  );
});
test("a missing or zero baseline cannot produce a fabricated comparison", () => {
  for (const invalid of [null, undefined, 0, NaN, Infinity])
    assert.equal(endpointRatio(10, invalid), null);
  assert.equal(endpointRatio(null, 10), null);
  assert.equal(endpointRatio([1, null], 10), null);
  assert.equal(endpointRatio(0, 10), 0);
});
test("inventory keeps estimates separate from projections and never counts metadata as measurements", () => {
  const inventory = releaseInventory(data);
  assert.equal(inventory.total, 7);
  assert.deepEqual(
    inventory.classifications.map((c) => c.count),
    [5, 2, 0],
  );
});
test("research topic counts deduplicate records while preserving overlapping membership", () => {
  const records = [
    { id: "a", topics: ["safety", "privacy"] },
    { id: "a", topics: ["safety"] },
    { id: "b", topics: ["safety"] },
  ];
  assert.deepEqual(
    topicCoverage(records, ["safety", "privacy", "efficiency"]),
    [
      { id: "safety", count: 2 },
      { id: "privacy", count: 1 },
      { id: "efficiency", count: 0 },
    ],
  );
});
