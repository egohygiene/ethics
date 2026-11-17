import { Database, ShieldCheck, Info } from "lucide-react";
import { classificationLabel, formatDate } from "../lib/evidence-view.js";
import { ExternalLink, SectionHeading, Tag } from "./Shared.jsx";
import Disclosure from "./Disclosure.jsx";
const definitions = {
  observed_fact: "A directly documented record, within its stated scope.",
  documented_estimate:
    "A source's estimate or modeled quantity, not a universal direct measurement.",
  projection: "A conditional future scenario, not an observed outcome.",
  interpretation: "Reasoning from evidence, with limitations and alternatives.",
  authors_perspective: "A personal value or experience, not empirical proof.",
  open_question: "An unresolved question with an identified evidence gap.",
};
export default function Methodology({ data }) {
  return (
    <section
      id="methodology"
      className="section divided-section"
      aria-labelledby="methodology-title"
    >
      <SectionHeading
        number="06"
        eyebrow="METHODOLOGY"
        title={<span id="methodology-title">Follow the evidence.</span>}
        description="A clear path from original source to the chart in front of you."
      />
      <div className="method-flow" aria-label="Evidence pipeline">
        {[
          "Approved sources",
          "Adapters & review",
          "Normalized evidence",
          "Validation",
          "Published views",
        ].map((step, i) => (
          <span key={step}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            {step}
            {i < 4 && <span aria-hidden="true">→</span>}
          </span>
        ))}
      </div>
      <div className="method-brief">
        <ShieldCheck size={20} />
        <p>
          <strong>Human evidence review is pending.</strong> Data-center totals
          include non-AI workloads. Price is not energy. Projections remain
          conditional.
        </p>
      </div>
      <div className="methodology-folds">
        <Disclosure
          title="What the evidence labels mean"
          description="Facts, estimates, projections, interpretation, personal values, and open questions"
          icon={ShieldCheck}
          meta="6 labels"
        >
          <dl className="claim-definitions">
            {Object.entries(definitions).map(([key, value]) => (
              <div key={key}>
                <dt>
                  <Tag
                    tone={
                      key === "projection"
                        ? "amber"
                        : key === "authors_perspective"
                          ? "violet"
                          : "neutral"
                    }
                  >
                    {classificationLabel(key)}
                  </Tag>
                </dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </Disclosure>
        <Disclosure
          title="Dates, freshness & software build"
          description="A fresh build does not make historical evidence new"
          icon={Database}
        >
          <dl className="clock-definitions">
            <dt>Source data period</dt>
            <dd>
              When the underlying activity occurred, or the scenario year.
            </dd>
            <dt>Source publication</dt>
            <dd>When the publisher released that report or record.</dd>
            <dt>Last source check</dt>
            <dd>
              When availability or source content was checked successfully.
            </dd>
            <dt>Last material data change</dt>
            <dd>When the evidence represented here materially changed.</dd>
            <dt>Last agent review</dt>
            <dd>
              When the implementation agent compared the record with its source.
            </dd>
            <dt>Last human review</dt>
            <dd>Pending. No independent human evidence review is claimed.</dd>
            <dt>Dashboard build</dt>
            <dd>
              <time dateTime={__BUILD_DATE__}>
                {formatDate(__BUILD_DATE__)}
              </time>{" "}
              · software build only
            </dd>
            <dt>Software revision</dt>
            <dd>
              <ExternalLink
                href={`https://github.com/egohygiene/ethics/commit/${__BUILD_REVISION__}`}
              >
                {__BUILD_REVISION__.slice(0, 7)}
              </ExternalLink>
              {__BUILD_DIRTY__ ? " · local changes present" : ""} ·{" "}
              <a href="/build.json">build record</a>
            </dd>
          </dl>
          <p className="small-note">
            Exact dataset clocks are in each chart's provenance. Publication
            dates retain their original calendar date.
          </p>
        </Disclosure>
        <Disclosure
          title="Evidence boundaries & missing data"
          description="What these measurements cannot establish"
          icon={Info}
        >
          <div className="methodology-principles">
            <h3>Our evidence boundaries</h3>
            <p>
              All-data-center electricity is not AI-only electricity. A scenario
              range is not a confidence interval. API price is not energy.
              Occupational exposure is not observed job loss. A device
              authorization is not proof of net population benefit. More
              transparency is not a complete account of ethical conduct.
            </p>
            <p>
              Missing, conflicting, unknown, unavailable, unresearched, and
              inapplicable data remain explicit. We do not assign moral scores
              or infer private motives.
            </p>
          </div>
        </Disclosure>
      </div>
      <details className="source-registry">
        <summary>
          Inspect the full source registry · {data.sources.length} sources &
          resources
        </summary>
        <p>
          Only Crossref is an automated integration in v0.1. All report values
          require manual source comparison; reference resources are linked, not
          ingested.
        </p>
        <div className="table-wrap">
          <table>
            <caption>Source access, provenance, and update policies</caption>
            <thead>
              <tr>
                <th scope="col">Stable source / publisher</th>
                <th scope="col">Access mode</th>
                <th scope="col">Last successful check</th>
                <th scope="col">Access & reuse notes</th>
              </tr>
            </thead>
            <tbody>
              {data.sources.map((s) => (
                <tr key={s.id}>
                  <th scope="row">
                    <ExternalLink href={s.url}>{s.title}</ExternalLink>
                    <small>
                      {s.id} · {s.publisher}
                    </small>
                  </th>
                  <td>{s.accessMode.replaceAll("_", " ")}</td>
                  <td>
                    {formatDate(s.freshness.lastCheckedAt)}
                    <small>{s.availability}</small>
                  </td>
                  <td>
                    {s.accessNotes}
                    <small>{s.licenseNotes}</small>
                    <small>{s.updatePolicy}</small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <div className="inline-links method-links">
        <ExternalLink href="https://github.com/egohygiene/ethics/blob/main/METHODOLOGY.md">
          Full methodology
        </ExternalLink>
        <ExternalLink href="https://github.com/egohygiene/ethics/blob/main/DATA_SOURCES.md">
          Source policies
        </ExternalLink>
        <ExternalLink href="/data/v1/manifest.json">
          Dataset manifest
        </ExternalLink>
        <ExternalLink href="https://github.com/egohygiene/ethics/issues/new">
          Suggest a correction
        </ExternalLink>
      </div>
    </section>
  );
}
