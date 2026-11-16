import { useState } from "react";
import { ArrowDown, BookOpen, Search } from "lucide-react";
import { filterResources, topicNames } from "../lib/discovery-view.js";
import { ExternalLink, SectionHeading } from "./Shared.jsx";
export default function Resources({ data }) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const records = filterResources(data.organizations, query);
  const visible = expanded ? records : records.slice(0, 9);
  return (
    <section
      id="resources"
      className="section divided-section"
      aria-labelledby="resources-title"
    >
      <SectionHeading
        number="05"
        eyebrow="RESOURCES & ORGANIZATIONS"
        title={
          <span id="resources-title">Useful places to keep investigating.</span>
        }
        description="Measurement tools, public institutions, standards, and open research. Inclusion is context, not blanket endorsement."
      >
        <label className="search-field resource-search">
          <Search size={16} />
          <span className="sr-only">Search resources</span>
          <input
            type="search"
            placeholder="Find a tool or organization…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setExpanded(false);
            }}
          />
        </label>
      </SectionHeading>
      <div className="results-count" aria-live="polite">
        {records.length} resources
        {visible.length < records.length ? ` · showing ${visible.length}` : ""}
      </div>
      {records.length ? (
        <div className="resource-grid">
          {visible.map((resource) => (
            <article key={resource.id} className="resource-card">
              <div className="resource-card-top">
                <BookOpen size={18} />
                <span>
                  {resource.topics.map((t) => topicNames[t] || t).join(" · ")}
                </span>
              </div>
              <h3>
                <ExternalLink href={resource.url}>
                  {resource.title}
                </ExternalLink>
              </h3>
              <p>{resource.description}</p>
              <details>
                <summary>Access & reuse</summary>
                <p>{resource.accessNotes}</p>
                {resource.akashicUrl && (
                  <ExternalLink href={resource.akashicUrl}>
                    Also curated in Akashic
                  </ExternalLink>
                )}
              </details>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No matching resources.</h3>
          <p>Try a broader topic or tool name.</p>
          <button className="small-button" onClick={() => setQuery("")}>
            Clear search
          </button>
        </div>
      )}
      {visible.length < records.length && (
        <button className="show-more" onClick={() => setExpanded(true)}>
          Show all {records.length} resources <ArrowDown size={14} />
        </button>
      )}
      <div className="akashic-callout">
        <span className="akashic-symbol" aria-hidden="true">
          ✳
        </span>
        <div>
          <h3>Follow the wider constellation.</h3>
          <p>
            Akashic connects AI research with creative practice,
            reproducibility, open knowledge, and tools beyond AI.
          </p>
        </div>
        <ExternalLink href="https://akashic.egohygiene.io">
          Explore Akashic
        </ExternalLink>
      </div>
    </section>
  );
}
