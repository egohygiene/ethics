// Deterministic presentation transforms. Counts describe this release's inventory,
// never ethical quality; ratios use only the cited, rounded source endpoints.
const numeric = (value) => typeof value === "number" && Number.isFinite(value);
export function endpointRatio(numerator, denominator) {
  if (!numeric(denominator) || denominator <= 0) return null;
  if (Array.isArray(numerator)) {
    if (numerator.length !== 2 || !numerator.every(numeric)) return null;
    return numerator.map((value) => value / denominator);
  }
  return numeric(numerator) ? numerator / denominator : null;
}
export function comparisonFor(data, chartId) {
  const amount = (id) =>
    data.observations.find((row) => row.id === id)?.amount.value;
  const definitions = {
    "chart-global": {
      numerator: "obs-global-2030",
      denominator: "obs-global-2024",
      label: "2030 Base Case / 2024 estimate",
      note: "All data centers · conditional projection",
      precision: 1,
    },
    "chart-us": {
      numerator: "obs-us-2028",
      denominator: "obs-us-2023",
      label: "2028 scenario range / 2023 estimate",
      note: "Scenario range, not a confidence interval",
      precision: 1,
    },
    "chart-price": {
      numerator: "obs-price-2022-11",
      denominator: "obs-price-2024-10",
      label: "Nov 2022 price / Oct 2024 price",
      note: "Same MMLU threshold · price, not energy",
      precision: 0,
    },
  };
  const definition = definitions[chartId];
  if (!definition) return null;
  return {
    ...definition,
    ratio: endpointRatio(
      amount(definition.numerator),
      amount(definition.denominator),
    ),
  };
}
export function formatRatio(comparison) {
  if (comparison?.ratio === null || !comparison) return "Not available";
  const values = Array.isArray(comparison.ratio)
    ? comparison.ratio
    : [comparison.ratio];
  return `≈${values.map((value) => value.toFixed(comparison.precision)).join("–")}×`;
}
export function releaseInventory(data) {
  const classifications = [
    "documented_estimate",
    "projection",
    "observed_fact",
  ];
  return {
    total: data.observations.length,
    sources: data.sources.length,
    charts: data.visualizations.length,
    classifications: classifications.map((id) => ({
      id,
      count: data.observations.filter((row) => row.classification === id)
        .length,
    })),
  };
}
export function topicCoverage(publications, topicIds) {
  // A publication can contribute once to each topic. Overlapping topics are not
  // summed into a count of unique publications.
  return topicIds.map((id) => ({
    id,
    count: new Set(
      publications.filter((p) => p.topics.includes(id)).map((p) => p.id),
    ).size,
  }));
}
