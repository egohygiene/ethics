import { useId } from "react";
import { FileText, Info } from "lucide-react";
import {
  chartView,
  formatValue,
  formatDate,
  classificationLabel,
} from "../lib/evidence-view.js";
import { ExternalLink, Tag } from "./Shared.jsx";
import { comparisonFor, formatRatio } from "../lib/digest-view.js";
export default function EvidenceChart({ data, chart }) {
  const { dataset, metric, rows, sources, evidence } = chartView(data, chart);
  const uid = useId().replaceAll(":", "");
  const width = 440,
    left = 74,
    plot = 306,
    height = rows.length * 61 + 44;
  const scale = (v) => left + (v / chart.axisMax) * plot;
  const comparison = comparisonFor(data, chart.id);
  const isPrice = metric.id === "metric-inference-price";
  return (
    <article
      id={chart.id}
      className={`evidence-chart ${isPrice ? "price-chart" : ""}`}
      aria-labelledby={`${uid}-heading`}
    >
      <div className="chart-top">
        <Tag tone={isPrice ? "violet" : "mint"}>
          {isPrice ? "ENGINEERING" : "ENERGY & ENVIRONMENT"}
        </Tag>
        <span className="chart-edition">
          {isPrice
            ? "AI INDEX · 2025"
            : chart.id === "chart-us"
              ? "BERKELEY LAB · 2024"
              : "IEA · 2025"}
        </span>
      </div>
      <h3 id={`${uid}-heading`}>{chart.title}</h3>
      <p className="chart-scope">
        {metric.coverage === "all_data_centers"
          ? "All data centers, including non-AI workloads"
          : "Fixed MMLU threshold · selected API endpoints"}
      </p>
      <div className="chart-unit">{metric.unit}</div>
      <svg
        className="quantitative-chart"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby={`${uid}-title`}
        aria-describedby={`${uid}-desc`}
      >
        <title id={`${uid}-title`}>{metric.title}</title>
        <desc id={`${uid}-desc`}>
          {rows
            .map(
              (row) =>
                `${row.label}: ${formatValue(row.amount.value)} ${metric.unit}, ${classificationLabel(row.classification)}.`,
            )
            .join(" ")}{" "}
          Exact values and full source details follow.
        </desc>
        <defs>
          <pattern
            id={`${uid}-pattern`}
            patternUnits="userSpaceOnUse"
            width="7"
            height="7"
            patternTransform="rotate(35)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="7"
              stroke="currentColor"
              strokeWidth="2"
              opacity=".6"
            />
          </pattern>
        </defs>
        {[0, 0.5, 1].map((t) => (
          <g key={t}>
            <line
              x1={left + t * plot}
              y1="12"
              x2={left + t * plot}
              y2={height - 26}
              stroke="var(--line)"
              strokeDasharray={t ? "3 5" : undefined}
            />
            <text
              x={left + t * plot}
              y={height - 6}
              className="axis-label"
              textAnchor="middle"
            >
              {formatValue(t * chart.axisMax)}
            </text>
          </g>
        ))}
        {rows.map((row, i) => {
          const amount = row.amount.value;
          const range = Array.isArray(amount);
          const y = 22 + i * 61;
          const upper = range ? amount[1] : amount;
          const lower = range ? amount[0] : amount;
          const projected = row.classification === "projection";
          return (
            <g
              key={row.id}
              className={projected ? "projected-row" : "estimate-row"}
            >
              <title>
                {row.label}: {formatValue(amount)} {metric.unit};{" "}
                {classificationLabel(row.classification)}
              </title>
              <text
                x={left - 12}
                y={y + 15}
                textAnchor="end"
                className="bar-label"
              >
                {row.label}
              </text>
              {amount === null ? (
                <text x={left + 8} y={y + 15} className="bar-label">
                  {row.amount.status.replaceAll("_", " ")}
                </text>
              ) : (
                <>
                  <rect
                    x={left}
                    y={y}
                    width={lower > 0 ? Math.max(1, scale(lower) - left) : 0}
                    height="24"
                    rx="3"
                    fill={projected ? `url(#${uid}-pattern)` : "currentColor"}
                    opacity={projected ? 1 : 0.8}
                  />
                  {range && (
                    <>
                      <line
                        x1={scale(lower)}
                        y1={y + 12}
                        x2={scale(upper)}
                        y2={y + 12}
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1={scale(upper)}
                        y1={y + 5}
                        x2={scale(upper)}
                        y2={y + 19}
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </>
                  )}
                  <text
                    x={left + Math.min(plot - 2, scale(upper) - left)}
                    y={y + 41}
                    textAnchor="end"
                    className="value-label"
                  >
                    {formatValue(amount)}
                    {projected ? " · projected" : ""}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
      {comparison && (
        <div className="chart-comparison">
          <strong>{formatRatio(comparison)}</strong>
          <span>
            {comparison.label}
            <small>Derived from rounded source endpoints</small>
          </span>
        </div>
      )}
      <p className="chart-takeaway">{chart.takeaway}</p>
      <div className="chart-source-line">
        <FileText size={13} />
        <ExternalLink href={evidence[0].url}>
          {sources[0].publisher}
        </ExternalLink>
      </div>
      <details className="evidence-details">
        <summary>Exact values & provenance</summary>
        <div className="table-wrap">
          <table>
            <caption>
              {metric.title} — {metric.unit}
            </caption>
            <thead>
              <tr>
                <th scope="col">Period</th>
                <th scope="col">Value</th>
                <th scope="col">Evidence type</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <th scope="row">{row.label}</th>
                  <td>{formatValue(row.amount.value)}</td>
                  <td>{classificationLabel(row.classification)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <dl className="metadata">
          <dt>Geography</dt>
          <dd>{metric.geography}</dd>
          <dt>Denominator</dt>
          <dd>{metric.denominator}</dd>
          <dt>Data period</dt>
          <dd>{dataset.freshness.sourceDataPeriod}</dd>
          <dt>Source publication</dt>
          <dd>{formatDate(dataset.freshness.sourcePublishedAt)}</dd>
          <dt>Last source check</dt>
          <dd>{formatDate(dataset.freshness.lastCheckedAt)}</dd>
          <dt>Material data change</dt>
          <dd>{formatDate(dataset.freshness.lastMaterialChangeAt)}</dd>
          <dt>Agent source check</dt>
          <dd>{formatDate(dataset.freshness.lastAgentReviewAt)}</dd>
          <dt>Human review</dt>
          <dd>
            {formatDate(
              dataset.freshness.lastHumanReviewAt,
              "Pending independent human review",
            )}
          </dd>
          {comparison && (
            <>
              <dt>Derived ratio</dt>
              <dd>
                {comparison.numerator} / {comparison.denominator};
                source-endpoint-ratio v1. Rounded for display; not a new
                measurement.
              </dd>
            </>
          )}
          <dt>Transform</dt>
          <dd>
            {chart.transformId} v{chart.transformVersion}; source endpoints only
          </dd>
        </dl>
        <p>{dataset.methodology}</p>
        {rows.map((row) => (
          <p key={row.id}>
            <strong>{row.label}:</strong> {row.uncertainty}
          </p>
        ))}
        {evidence.map((e) => (
          <blockquote key={e.id}>
            <p>“{e.excerpt}”</p>
            <cite>
              <ExternalLink href={e.url}>{e.locator}</ExternalLink>
            </cite>
          </blockquote>
        ))}
        <p className="limitation-note">
          <Info size={14} />
          {metric.limitations.join(" ")}
        </p>
        <ExternalLink href="/data/v1/observatory.json">
          Inspect versioned JSON
        </ExternalLink>
      </details>
    </article>
  );
}
