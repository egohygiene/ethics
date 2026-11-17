import { useId } from "react";
import { classificationLabel, formatValue } from "../lib/evidence-view.js";
import { releaseInventory } from "../lib/digest-view.js";
export function SnapshotBars({ rows, max, unit, title }) {
  const uid = useId();
  return (
    <svg
      className="snapshot-bars"
      viewBox={`0 0 340 ${rows.length * 34 + 14}`}
      role="img"
      aria-labelledby={`${uid}-title`}
      aria-describedby={`${uid}-desc`}
    >
      <title id={`${uid}-title`}>{title}</title>
      <desc id={`${uid}-desc`}>
        {rows
          .map(
            (r) =>
              `${r.label}: ${formatValue(r.amount.value)} ${unit}; ${classificationLabel(r.classification)}.`,
          )
          .join(" ")}{" "}
        Bars start at zero; ranges retain both endpoints.
      </desc>
      <defs>
        <pattern
          id={`${uid}-stripe`}
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(35)"
        >
          <line y2="5" stroke="currentColor" strokeWidth="1.5" />
        </pattern>
      </defs>
      {rows.map((row, i) => {
        const value = row.amount.value;
        const range = Array.isArray(value);
        const low = range ? value[0] : value;
        const high = range ? value[1] : value;
        const x = (n) => 80 + (n / max) * 164;
        const y = 8 + i * 34;
        const projected = row.classification === "projection";
        return (
          <g
            key={row.id}
            className={projected ? "snapshot-projection" : "snapshot-estimate"}
          >
            <text x="0" y={y + 12}>
              {row.label}
            </text>
            <line
              x1="80"
              x2="244"
              y1={y + 7}
              y2={y + 7}
              className="mini-track"
            />
            {value !== null && (
              <>
                <rect
                  x="80"
                  y={y}
                  width={Math.max(0, x(low) - 80)}
                  height="14"
                  rx="3"
                  fill={projected ? `url(#${uid}-stripe)` : "currentColor"}
                />
                {range && (
                  <path
                    d={`M${x(low)} ${y + 7}H${x(high)}m0 -6v12`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                )}
                <text
                  className="mini-value"
                  x="337"
                  y={y + 12}
                  textAnchor="end"
                >
                  {formatValue(value)}
                </text>
              </>
            )}
            {value === null && (
              <text className="mini-value" x="337" y={y + 12} textAnchor="end">
                {row.amount.status.replaceAll("_", " ")}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
export function ReleaseCoverage({ data }) {
  const inventory = releaseInventory(data);
  return (
    <div
      className="release-coverage"
      aria-label="This release's evidence inventory"
    >
      <div className="coverage-total">
        <strong>{inventory.total}</strong>
        <span>published data points</span>
      </div>
      <div className="coverage-composition">
        <div className="coverage-track" aria-hidden="true">
          {inventory.classifications
            .filter((c) => c.count > 0)
            .map((c) => (
              <span
                key={c.id}
                className={c.id}
                style={{ width: `${(c.count / inventory.total) * 100}%` }}
              />
            ))}
        </div>
        <div className="coverage-legend">
          {inventory.classifications
            .filter((c) => c.count > 0)
            .map((c) => (
              <span key={c.id}>
                <i className={c.id} />
                <strong>{c.count}</strong>{" "}
                {classificationLabel(c.id).toLowerCase()}
                {c.count !== 1 ? "s" : ""}
              </span>
            ))}
        </div>
      </div>
      <div className="coverage-caption">
        <strong>{inventory.charts} sourced charts</strong>
        <span>Release inventory, not evidence strength.</span>
      </div>
    </div>
  );
}
export function ScenarioBars({ results }) {
  const uid = useId();
  const values = [
    {
      label: "Intentional",
      value: results.intentionalPerAccepted,
      tone: "var(--mint)",
    },
    {
      label: "Trial-and-error",
      value: results.trialPerAccepted,
      tone: "var(--amber)",
    },
  ];
  const max = Math.max(1, ...values.map((v) => v.value ?? 0));
  return (
    <figure className="scenario-figure">
      <figcaption>
        Compare your assumptions{" "}
        <span>Illustrative relative units per accepted output</span>
      </figcaption>
      <svg
        viewBox="0 0 600 100"
        role="img"
        aria-labelledby={`${uid}-title`}
        aria-describedby={`${uid}-desc`}
      >
        <title id={`${uid}-title`}>Conceptual workflow comparison</title>
        <desc id={`${uid}-desc`}>
          {values
            .map(
              (v) =>
                `${v.label}: ${v.value === null ? "undefined, no accepted outputs" : formatValue(v.value) + " relative units per accepted output"}`,
            )
            .join(". ")}
          . These are assumptions, not measurements.
        </desc>
        {values.map((v, i) => (
          <g key={v.label}>
            <text x="0" y={24 + i * 49} className="scenario-label">
              {v.label}
            </text>
            <rect
              x="125"
              y={8 + i * 49}
              width="360"
              height="22"
              rx="5"
              fill="var(--raised)"
            />
            {v.value !== null && (
              <rect
                x="125"
                y={8 + i * 49}
                width={(v.value / max) * 360}
                height="22"
                rx="5"
                fill={v.tone}
              />
            )}
            <text
              x="598"
              y={24 + i * 49}
              textAnchor="end"
              className="scenario-number"
            >
              {v.value === null ? "Undefined" : formatValue(v.value)}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
