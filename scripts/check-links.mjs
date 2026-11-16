import { loadEvidence } from "./lib/validate.mjs";
import { writeJson } from "./lib/io.mjs";
const data = await loadEvidence();
const urls = [
  ...new Set([
    ...data.sources.map((s) => s.url),
    ...data.evidence.map((e) => e.url),
    ...data.organizations.flatMap((o) => [o.url, o.akashicUrl].filter(Boolean)),
    ...data.publications.map((p) => p.url),
    "https://civics.egohygiene.io",
    "https://akashic.egohygiene.io",
    "https://github.com/egohygiene",
  ]),
].map((u) => {
  const url = new URL(u);
  if (url.protocol !== "https:") throw Error(`Non-HTTPS source: ${u}`);
  url.hash = "";
  return url.href;
});
let requestCount = 0;
async function request(url, options = {}) {
  if (++requestCount > 100) throw Error("Link-check request budget exceeded");
  return fetch(url, {
    headers: {
      "User-Agent":
        "EgoHygieneEthics/0.1 (bounded link health check; https://github.com/egohygiene/ethics)",
      ...options.headers,
    },
    signal: AbortSignal.timeout(15000),
    ...options,
  });
}
async function check(url) {
  const result = {
    url,
    checkedAt: new Date().toISOString(),
    state: "unverified",
    httpStatus: null,
    resolvedUrl: null,
    note: "",
  };
  try {
    let response = await request(url, { method: "HEAD" });
    if ([405, 503].includes(response.status))
      response = await request(url, { headers: { Range: "bytes=0-1023" } });
    result.httpStatus = response.status;
    result.resolvedUrl = response.url;
    result.state = response.ok
      ? "accessible"
      : [400, 404, 410].includes(response.status)
        ? "broken"
        : "restricted_or_unverified";
    result.note = response.ok
      ? "HTTP availability only; not content, scientific, or license verification."
      : "HTTP access failure. A restriction is not proof that a source or paper is invalid.";
    await response.body?.cancel();
  } catch (error) {
    result.note = `Availability could not be established: ${error.name}. No source freshness updated.`;
  }
  if (url.startsWith("https://doi.org/") && result.state !== "accessible") {
    try {
      const doi = decodeURIComponent(url.slice("https://doi.org/".length));
      const registry = await request(
        `https://api.crossref.org/works/${encodeURIComponent(doi)}`,
      );
      if (registry.ok) {
        const body = await registry.json();
        if (body.message?.DOI?.toLowerCase() === doi.toLowerCase()) {
          result.state = "identifier_verified_publisher_restricted";
          result.note =
            "DOI verified in Crossref; publisher destination restricts access or could not be reached. Full text and findings are not verified.";
        }
      } else await registry.body?.cancel();
    } catch {
      result.note += " DOI registry check could not be completed.";
    }
  }
  return result;
}
const results = [];
let cursor = 0;
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (cursor < urls.length) {
      const index = cursor++;
      results[index] = await check(urls[index]);
    }
  }),
);
const counts = Object.fromEntries(
  [...new Set(results.map((r) => r.state))].map((state) => [
    state,
    results.filter((r) => r.state === state).length,
  ]),
);
const report = {
  checkedAt: new Date().toISOString(),
  requests: requestCount,
  counts,
  note: "Bounded link health and DOI-registration checks only. No report scraping, truth review, or automatic publication of new evidence. Restricted/unverified responses are retained explicitly.",
  results,
};
const reportIndex = process.argv.indexOf("--report");
const reportPath =
  reportIndex >= 0 ? process.argv[reportIndex + 1] : ".cache/link-checks.json";
if (!reportPath) throw Error("--report requires a path");
await writeJson(reportPath, report);
console.log(
  JSON.stringify({ report: reportPath, requests: requestCount, counts }),
);
for (const r of results.filter((r) => r.state !== "accessible"))
  console.log(`${r.state}: ${r.url} (HTTP ${r.httpStatus ?? "unknown"})`);
if (
  results.some((r) => r.state === "broken") ||
  (process.argv.includes("--strict") &&
    results.some((r) => r.state !== "accessible"))
)
  process.exitCode = 1;
