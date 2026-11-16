import test from "node:test";
import assert from "node:assert/strict";
import { readJson } from "../scripts/lib/io.mjs";
import {
  filterResearch,
  filterResources,
  topicNames,
} from "../src/lib/discovery-view.js";
const papers = await readJson("data/reviewed/publications.json");
const content = await readJson("data/reviewed/evidence.json");
const perspectives = await readJson("data/reviewed/perspectives.json");
test("research filters intersect type, topic, and case-insensitive text without mutating inputs", () => {
  const original = JSON.stringify(papers);
  const selected = filterResearch(papers, {
    query: "storellm",
    topic: "efficiency",
    type: "proceedings-article",
  });
  assert.equal(selected.length, 1);
  assert.equal(selected[0].doi, "10.1145/3679240.3734604");
  assert.equal(
    filterResearch(papers, { query: "no-matching-paper-999" }).length,
    0,
  );
  assert.equal(JSON.stringify(papers), original);
  assert.ok(
    filterResearch(papers, { sort: "oldest" })[0].publicationDate <=
      filterResearch(papers)[0].publicationDate,
  );
});
test("reading queue covers all nine requested research themes without claiming peer review", () => {
  for (const topic of Object.keys(topicNames))
    assert.ok(
      papers.some((p) => p.topics.includes(topic)),
      topic,
    );
  assert.ok(
    papers.every(
      (p) => p.peerReview === "unverified" && p.review.humanReviewedAt === null,
    ),
  );
});
test("resources support useful search and all ten perspectives retain distinct evidence boundaries", () => {
  assert.equal(filterResources(content.organizations, "codecarbon").length, 1);
  assert.equal(perspectives.length, 10);
  assert.ok(
    perspectives.every(
      (p) =>
        p.established &&
        p.notEstablished &&
        p.perspectives.length >= 2 &&
        p.uncertainty &&
        p.interventions.length &&
        p.sourceIds.length,
    ),
  );
});
