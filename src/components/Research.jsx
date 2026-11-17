import Disclosure from "./Disclosure.jsx";
import { topicCoverage } from "../lib/digest-view.js";
import { useMemo, useState } from "react";
import { ArrowDown, FileText, FlaskConical, Search, X } from "lucide-react";
import {
  filterResearch,
  publicationTypes,
  topicNames,
} from "../lib/discovery-view.js";
import { formatDate, formatPublicationDate } from "../lib/evidence-view.js";
import { ExternalLink, SectionHeading, Tag } from "./Shared.jsx";
export default function Research({ data }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("newest");
  const [expanded, setExpanded] = useState(false);
  const records = useMemo(
    () => filterResearch(data.publications, { query, topic, type, sort }),
    [data.publications, query, topic, type, sort],
  );
  const topics = Object.keys(topicNames).filter((t) =>
    data.publications.some((p) => p.topics.includes(t)),
  );
  const coverage = topicCoverage(
    filterResearch(data.publications, { query, type, sort }),
    topics,
  );
  const maxTopicCount = Math.max(1, ...coverage.map((t) => t.count));
  const types = Object.keys(publicationTypes).filter((t) =>
    data.publications.some((p) => p.publicationType === t),
  );
  const visible = expanded ? records : records.slice(0, 3);
  const latest = data.publications
    .map((p) => p.retrievedAt)
    .sort()
    .at(-1);
  const reports = ["iea", "ai-index", "ilo"].map((id) =>
    data.sources.find((s) => s.id === id),
  );
  const reset = () => {
    setQuery("");
    setTopic("all");
    setType("all");
    setSort("newest");
    setExpanded(false);
  };
  return (
    <section
      id="research"
      className="section divided-section"
      aria-labelledby="research-title"
    >
      <SectionHeading
        number="04"
        eyebrow="RESEARCH & SOLUTIONS"
        title={<span id="research-title">Look for what can get better.</span>}
        description="Follow engineering methods, public-interest research, and specific ways to reduce harm. Discovery is the start of evaluation."
      />
      <div className="research-status">
        <FlaskConical size={18} />
        <p>
          <strong>Metadata only.</strong> Peer review and scientific findings
          are unverified.
        </p>
        <span>Retrieved {formatDate(latest)}</span>
      </div>
      <div className="topic-coverage-heading">
        <h3>Find a field to explore</h3>
        <span>
          Reading-queue coverage · papers can appear in more than one topic
        </span>
      </div>
      <div
        className="topic-coverage"
        role="group"
        aria-label="Research topic coverage"
      >
        {coverage.map((t) => (
          <button
            key={t.id}
            aria-pressed={topic === t.id}
            onClick={() => {
              setTopic(topic === t.id ? "all" : t.id);
              setExpanded(false);
            }}
          >
            <span>
              {topicNames[t.id]}
              <strong>
                {t.count}
                <span className="sr-only"> publications</span>
              </strong>
            </span>
            <span className="topic-coverage-track" aria-hidden="true">
              <i style={{ width: `${(t.count / maxTopicCount) * 100}%` }} />
            </span>
          </button>
        ))}
      </div>
      <div className="research-controls">
        <label className="search-field">
          <Search size={16} />
          <span className="sr-only">Search research</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setExpanded(false);
            }}
            placeholder="Search titles, topics, venues, or DOI…"
          />
        </label>
        <label>
          <span className="sr-only">Research topic</span>
          <select
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              setExpanded(false);
            }}
          >
            <option value="all">All research topics</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {topicNames[t]}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Publication type</span>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setExpanded(false);
            }}
          >
            <option value="all">All publication types</option>
            {types.map((t) => (
              <option value={t} key={t}>
                {publicationTypes[t]}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Sort research</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>
      <div className="results-count" aria-live="polite">
        <span>
          {records.length}{" "}
          {records.length === 1 ? "publication" : "publications"}
          {visible.length < records.length
            ? ` · showing ${visible.length}`
            : ""}
        </span>
        {(query || topic !== "all" || type !== "all") && (
          <button className="text-button" onClick={reset}>
            <X size={12} />
            Clear filters
          </button>
        )}
      </div>
      {records.length ? (
        <div className="research-grid">
          {visible.map((p) => (
            <article className="paper-card" key={p.id}>
              <div className="paper-top">
                <Tag tone="violet">{publicationTypes[p.publicationType]}</Tag>
                <time dateTime={p.publicationDate}>
                  {formatPublicationDate(p)}
                </time>
              </div>
              <h3>
                <ExternalLink href={p.url}>{p.title}</ExternalLink>
              </h3>
              <div className="paper-topics">
                {p.topics.map((t) => (
                  <span key={t}>{topicNames[t]}</span>
                ))}
              </div>
              <div className="paper-footer">
                <span>Metadata only · peer review unverified</span>
                <details>
                  <summary>Record details</summary>
                  <p className="paper-venue">{p.venue}</p>
                  <dl className="metadata">
                    <dt>DOI</dt>
                    <dd>
                      <ExternalLink href={p.url}>{p.doi}</ExternalLink>
                    </dd>
                    <dt>Source date</dt>
                    <dd>{formatPublicationDate(p)}</dd>
                    <dt>Date precision</dt>
                    <dd>{p.publicationDatePrecision}</dd>
                    <dt>Retrieved</dt>
                    <dd>{formatDate(p.retrievedAt)}</dd>
                    <dt>Source</dt>
                    <dd>Crossref REST metadata</dd>
                    <dt>Human review</dt>
                    <dd>Pending</dd>
                  </dl>
                  <p>{p.review.note}</p>
                </details>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={24} />
          <h3>No matching research in this reading queue.</h3>
          <p>
            Try a broader term or clear a filter. No result here does not mean
            no research exists.
          </p>
          <button className="small-button" onClick={reset}>
            Clear filters
          </button>
        </div>
      )}
      {visible.length < records.length && (
        <button className="show-more" onClick={() => setExpanded(true)}>
          Show all {records.length} publications <ArrowDown size={14} />
        </button>
      )}
      <Disclosure
        title="Primary reports & reference research"
        meta={reports.length}
        icon={FileText}
        className="report-disclosure"
      >
        <div className="report-strip">
          <div>
            <FileText size={18} />
            <h3>Primary reports & reference research</h3>
          </div>
          {reports.map((s) => (
            <ExternalLink href={s.url} key={s.id}>
              {s.title}
              <span>
                {s.freshness.sourcePublishedAt
                  ? formatDate(s.freshness.sourcePublishedAt)
                  : "Publication date in source"}{" "}
                · official report
              </span>
            </ExternalLink>
          ))}
        </div>
      </Disclosure>
      <details className="research-disclosure">
        <summary>What inclusion means, and how this queue changes</summary>
        <p>
          Publication types come from Crossref deposits; a journal or conference
          label alone does not verify peer review. Preprints, reports,
          benchmarks, and commentary require their own method and review checks
          and are never treated as equivalent evidence. Bibliographic dates may
          be incomplete; partial dates are displayed at their supplied
          precision. Internal sorting uses the first day of a partial period, as
          recorded in the source note.
        </p>
        <p>
          New scheduled discoveries prepare reviewable changes. They do not
          become definitive findings automatically. Read the paper, inspect the
          method and limitations, check corrections or retractions, and assess
          whether it applies to the actual use case.
        </p>
        <ExternalLink href="https://github.com/egohygiene/ethics/blob/main/DATA_SOURCES.md">
          Discovery and source policy
        </ExternalLink>
      </details>
    </section>
  );
}
