export const topicNames = {
  efficiency: "Efficient models & inference",
  safety: "Safety engineering",
  privacy: "Privacy & data governance",
  interpretability: "Interpretability",
  provenance: "Copyright & provenance",
  accessibility: "Accessibility",
  "creative-collaboration": "Creative collaboration",
  environment: "Environmental mitigation",
  "public-interest": "Public-interest research",
};
export const publicationTypes = {
  "journal-article": "Journal article",
  "proceedings-article": "Conference proceedings",
  "posted-content": "Posted content / possible preprint",
  report: "Report",
  "book-chapter": "Book chapter",
  other: "Other publication",
};
export function filterResearch(
  records,
  { query = "", topic = "all", type = "all", sort = "newest" } = {},
) {
  const needle = query.trim().toLowerCase();
  return records
    .filter(
      (p) =>
        (topic === "all" || p.topics.includes(topic)) &&
        (type === "all" || p.publicationType === type) &&
        (!needle ||
          [p.title, p.venue, p.doi, ...p.topics.map((t) => topicNames[t] || t)]
            .join(" ")
            .toLowerCase()
            .includes(needle)),
    )
    .sort((a, b) =>
      sort === "oldest"
        ? a.publicationDate.localeCompare(b.publicationDate) ||
          a.id.localeCompare(b.id)
        : b.publicationDate.localeCompare(a.publicationDate) ||
          a.id.localeCompare(b.id),
    );
}
export function filterResources(records, query = "") {
  const needle = query.trim().toLowerCase();
  return records.filter(
    (r) =>
      !needle ||
      [r.title, r.description, ...r.topics.map((t) => topicNames[t] || t)]
        .join(" ")
        .toLowerCase()
        .includes(needle),
  );
}
