import { Info, SearchCheck } from "lucide-react";
import { dimensions } from "../data/dimensions.js";
import EvidenceChart from "./EvidenceChart.jsx";
import { ExternalLink, SectionHeading } from "./Shared.jsx";
export default function Dashboard({ data, dimension, setDimension }) {
  const charts = data.visualizations.filter(
    (c) => dimension === "all" || c.dimension === dimension,
  );
  const lens = dimensions.find((d) => d.id === dimension);
  return (
    <section
      id="dashboard"
      className="section divided-section"
      aria-labelledby="dashboard-title"
    >
      <SectionHeading
        number="02"
        eyebrow="DATA DASHBOARD"
        title={<span id="dashboard-title">Evidence before conclusions.</span>}
        description="A small, inspectable starting point. Source estimates, projections, and limitations stay visible."
      />
      <div className="dashboard-toolbar">
        <label htmlFor="dimension-filter">Evidence lens</label>
        <select
          id="dimension-filter"
          value={dimension}
          onChange={(e) => setDimension(e.target.value)}
        >
          <option value="all">All evidence lenses</option>
          {dimensions.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title}
            </option>
          ))}
        </select>
        <span>
          {charts.length} quantitative {charts.length === 1 ? "view" : "views"}
        </span>
      </div>
      {charts.length ? (
        <div className="chart-grid">
          {charts.map((chart) => (
            <EvidenceChart key={chart.id} data={data} chart={chart} />
          ))}
        </div>
      ) : (
        <div className="evidence-gap">
          <SearchCheck size={26} />
          <h3>There is more to investigate here.</h3>
          <p>
            No comparable quantitative series has been integrated for{" "}
            {lens.title.toLowerCase()} in v0.1. That is a coverage gap, not
            evidence of zero impact.
          </p>
          <p>
            <strong>What could be measured:</strong> {lens.measurable}
          </p>
          <div className="inline-links">
            {lens.sources.map((id) => {
              const s = data.sources.find((s) => s.id === id);
              return (
                <ExternalLink href={s.url} key={id}>
                  {s.title}
                </ExternalLink>
              );
            })}
          </div>
          <a className="text-link" href="#perspectives">
            Investigate the ethical questions →
          </a>
        </div>
      )}
      <div className="data-review-note">
        <Info size={15} />
        <p>
          Source-compared by the implementation agent. Independent human
          evidence review is pending. Source periods and publication dates are
          historical; a fresh build does not mean fresh data.
        </p>
        <a href="#methodology">How we know ↗</a>
      </div>
    </section>
  );
}
