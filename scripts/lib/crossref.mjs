import { hash } from "./io.mjs";
export const RESEARCH_QUERIES = [
  ["efficiency", "energy efficient large language model inference"],
  ["safety", "artificial intelligence safety red teaming"],
  ["privacy", "differential privacy machine learning"],
  ["interpretability", "mechanistic interpretability language models"],
  ["provenance", "content provenance artificial intelligence copyright"],
  ["accessibility", "artificial intelligence assistive technology accessibility"],
  ["creative-collaboration", "human AI creative collaboration"],
  ["environment", "data center water energy environmental mitigation"],
  ["public-interest", "public interest artificial intelligence governance"],
];
export function canonicalDoi(doi) {
  return String(doi || "").trim().toLowerCase().replace(/^https?:\/\/(?:dx\.)?doi\.org\//, "");
}
export function normalizeWork(item, topic, retrievedAt) {
  const doi = canonicalDoi(item.DOI);
  const title = item.title?.[0]?.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  const parts = (item["published-print"] || item["published-online"] || item.published)?.["date-parts"]?.[0];
  if (!/^10\.\d{4,9}\/\S+$/i.test(doi) || !title || !parts?.[0]) return null;
  const publicationDate = [parts[0], String(parts[1] || 1).padStart(2, "0"), String(parts[2] || 1).padStart(2, "0")].join("-");
  if (publicationDate > retrievedAt.slice(0, 10) || !Number.isFinite(Date.parse(publicationDate))) return null;
  const allowed = ["journal-article", "proceedings-article", "posted-content", "report", "book-chapter"];
  return {
    schemaVersion: "1.0.0", id: `paper-${hash(doi).slice(0, 16)}`, kind: "publication", title, doi,
    url: `https://doi.org/${doi}`, sourceId: "crossref", publicationDate,
    publicationType: allowed.includes(item.type) ? item.type : "other",
    venue: item["container-title"]?.[0]?.replace(/<[^>]*>/g, "") || "Venue not supplied",
    topics: [topic], retrievedAt, peerReview: "unverified",
    review: { status: "metadata_checked", checkedAt: retrievedAt, humanReviewedAt: null,
      note: "Crossref bibliographic metadata only. Peer review, full text, findings, and topical relevance require human assessment. Partial dates use the first day of the supplied period." },
  };
}
export function deduplicatePublications(records) {
  const unique = new Map();
  for (const record of records.filter(Boolean)) {
    const key = canonicalDoi(record.doi);
    const previous = unique.get(key);
    if (previous) previous.topics = [...new Set([...previous.topics, ...record.topics])].sort();
    else unique.set(key, structuredClone(record));
  }
  return [...unique.values()].sort((a, b) => b.publicationDate.localeCompare(a.publicationDate) || a.id.localeCompare(b.id));
}
export async function discoverResearch({ fetcher = fetch, checkedAt = new Date().toISOString(), rows = 3, maxRequests = 18 } = {}) {
  const captures = [];
  let requests = 0;
  for (const [topic, query] of RESEARCH_QUERIES) {
    const url = new URL("https://api.crossref.org/works");
    url.searchParams.set("query.title", query);
    url.searchParams.set("rows", String(rows));
    url.searchParams.set("filter", `from-pub-date:2022-01-01,until-pub-date:${checkedAt.slice(0, 10)}`);
    url.searchParams.set("select", "DOI,title,type,published,published-print,published-online,container-title");
    let response;
    for (let attempt = 0; attempt < 2; attempt++) {
      if (++requests > maxRequests) throw new Error("Crossref request budget exhausted; no partial refresh may be promoted.");
      response = await fetcher(url, { headers: { Accept: "application/json", "User-Agent": "EgoHygieneEthics/0.1 (https://github.com/egohygiene/ethics)" }, signal: AbortSignal.timeout(20000) });
      if (response.ok) break;
      if (![429, 500, 502, 503, 504].includes(response.status) || attempt === 1) throw new Error(`Crossref HTTP ${response.status}; previous published evidence preserved.`);
      const delay = Math.min(5000, Math.max(1000, Number(response.headers.get("retry-after") || 1) * 1000));
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    const body = await response.json();
    if (!Array.isArray(body.message?.items)) throw new Error("Crossref response has no metadata items.");
    // Only bibliographic fields selected above are retained. No abstracts, contacts, or auth.
    captures.push({ topic, query, requestUrl: url.href, items: body.message.items });
  }
  const publications = deduplicatePublications(captures.flatMap(capture => capture.items.map(item => normalizeWork(item, capture.topic, checkedAt))));
  return { schemaVersion: "1.0.0", provider: "crossref", checkedAt, requests, captures, publications, contentHash: hash(JSON.stringify(publications.map(({ retrievedAt, review, ...p }) => p))) };
}
