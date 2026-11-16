export function formatValue(value) {
  if (value === null || value === undefined) return "Not available";
  if (Array.isArray(value)) return value.map(formatValue).join("–");
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(
    value,
  );
}
export const classificationLabel = (value) =>
  ({
    observed_fact: "Observed fact",
    documented_estimate: "Documented estimate",
    projection: "Projection",
    interpretation: "Interpretation",
    authors_perspective: "Author's perspective",
    open_question: "Open question",
  })[value] || value;
export function formatDate(value, fallback = "Not recorded") {
  if (!value) return fallback;
  // Report publication dates are calendar dates, not instants shifted across time zones.
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(value.length === 10 ? { timeZone: "UTC" } : {}),
  }).format(new Date(value.length === 10 ? `${value}T12:00:00Z` : value));
}
export function chartView(data, chart) {
  const dataset = data.datasets.find((d) => d.id === chart.datasetId);
  const metric = data.metrics.find((m) => m.id === dataset.metricId);
  const rows = dataset.observationIds.map((id) =>
    data.observations.find((o) => o.id === id),
  );
  const sources = dataset.sourceIds.map((id) =>
    data.sources.find((s) => s.id === id),
  );
  const evidence = [...new Set(rows.flatMap((row) => row.evidenceRefs))].map(
    (id) => data.evidence.find((e) => e.id === id),
  );
  return { chart, dataset, metric, rows, sources, evidence };
}
export function formatPublicationDate(publication) {
  const precision = publication.publicationDatePrecision;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    ...(precision !== "year" ? { month: "short" } : {}),
    ...(precision === "day" ? { day: "numeric" } : {}),
    timeZone: "UTC",
  }).format(new Date(`${publication.publicationDate}T12:00:00Z`));
}
