import { useState } from "react";
import { ArrowDown, ArrowRight, Check, Network } from "lucide-react";
import { dimensions } from "../data/dimensions.js";
import { dimensionIcons, SectionHeading } from "./Shared.jsx";
import { formatValue } from "../lib/evidence-view.js";
function Constellation() {
  return (
    <div className="constellation" aria-hidden="true">
      <div className="orbit-label orbit-label-top">
        SYSTEMS, NOT SIMPLIFICATIONS
      </div>
      <svg viewBox="0 0 440 350" fill="none">
        <defs>
          <radialGradient id="cosmic-glow">
            <stop stopColor="currentColor" stopOpacity=".1" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="228" cy="175" r="150" fill="url(#cosmic-glow)" />
        <g className="orbital-lines" stroke="currentColor">
          <ellipse
            cx="228"
            cy="175"
            rx="147"
            ry="65"
            transform="rotate(-30 228 175)"
          />
          <ellipse
            cx="228"
            cy="175"
            rx="147"
            ry="65"
            transform="rotate(30 228 175)"
          />
          <ellipse
            cx="228"
            cy="175"
            rx="147"
            ry="65"
            transform="rotate(90 228 175)"
          />
          <circle cx="228" cy="175" r="99" strokeDasharray="2 7" />
        </g>
        <g
          className="constellation-spokes"
          stroke="currentColor"
          strokeDasharray="3 5"
        >
          <path d="M228 175 139 72M228 175 316 72M228 175 375 175M228 175 315 278M228 175 139 278M228 175 81 175" />
        </g>
        <g className="constellation-dots">
          {[
            [139, 72],
            [316, 72],
            [375, 175],
            [315, 278],
            [139, 278],
            [81, 175],
          ].map(([x, y], i) => (
            <g key={x + ":" + y}>
              <circle
                cx={x}
                cy={y}
                r="13"
                fill="var(--bg)"
                stroke={i % 2 ? "var(--mint)" : "var(--violet)"}
                strokeOpacity=".5"
              />
              <circle
                cx={x}
                cy={y}
                r="4"
                fill={i % 2 ? "var(--mint)" : "var(--violet)"}
              />
            </g>
          ))}
        </g>
        <circle
          cx="228"
          cy="175"
          r="35"
          fill="var(--surface)"
          stroke="var(--violet)"
          strokeOpacity=".45"
        />
        <circle
          cx="228"
          cy="175"
          r="27"
          stroke="var(--violet)"
          strokeOpacity=".18"
        />
        <text
          x="228"
          y="180"
          textAnchor="middle"
          fill="var(--text)"
          fontSize="12"
          letterSpacing="1"
        >
          ETHICS
        </text>
        <g fill="var(--muted)" fontSize="9" letterSpacing=".5">
          <text x="139" y="45" textAnchor="middle">
            PEOPLE
          </text>
          <text x="316" y="45" textAnchor="middle">
            PLANET
          </text>
          <text x="415" y="179" textAnchor="middle">
            POWER
          </text>
          <text x="315" y="310" textAnchor="middle">
            PROGRESS
          </text>
          <text x="139" y="310" textAnchor="middle">
            PURPOSE
          </text>
          <text x="36" y="179" textAnchor="middle">
            PRACTICE
          </text>
        </g>
      </svg>
      <div className="orbit-caption">
        Connected questions. Different kinds of evidence.
      </div>
    </div>
  );
}
export default function Overview({ data, onDimension }) {
  const [selected, setSelected] = useState("environment");
  const lens = dimensions.find((d) => d.id === selected);
  const value = (id) =>
    formatValue(data.observations.find((o) => o.id === id)?.amount.value);
  return (
    <section id="overview" aria-labelledby="overview-title">
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span /> AN EVIDENCE-DRIVEN AI ETHICS OBSERVATORY
          </p>
          <h1 id="overview-title">
            AI is not one
            <br />
            <em>ethical question.</em>
          </h1>
          <p className="hero-description">
            Explore the evidence, people, systems, and tradeoffs shaping our
            technological future.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#dashboard">
              Explore the evidence <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="text-link" href="#perspectives">
              Find a perspective <ArrowDown size={14} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-principles">
            <span>
              <Check size={12} />
              Source-linked
            </span>
            <span>
              <Check size={12} />
              Open to revision
            </span>
            <span>
              <Check size={12} />
              Human-centered
            </span>
          </div>
        </div>
        <Constellation />
      </div>
      <div className="overview-note">
        <Network size={16} />
        <p>
          Understand the system. Examine the evidence. Preserve human dignity.
          Improve what we can.
        </p>
        <span>OUR GUIDING PRINCIPLE</span>
      </div>
      <div className="snapshot-grid">
        <a
          href="#chart-global"
          onClick={() => onDimension("all")}
          className="snapshot"
        >
          <p>
            <span className="small-dot mint" />
            THE PHYSICAL FOOTPRINT
          </p>
          <div className="snapshot-value">
            {value("obs-global-2024")}
            <span>TWh</span>
          </div>
          <h3>Global data-center electricity, 2024</h3>
          <p>IEA estimate · all data centers, including non-AI</p>
          <span className="snapshot-link">
            Examine the scope <ArrowUpRightInline />
          </span>
        </a>
        <a
          href="#chart-us"
          onClick={() => onDimension("all")}
          className="snapshot"
        >
          <p>
            <span className="small-dot blue" />
            THE UNCERTAINTY
          </p>
          <div className="snapshot-value">
            {value("obs-us-2028")}
            <span>TWh</span>
          </div>
          <h3>U.S. data-center projection, 2028</h3>
          <p>Berkeley Lab via DOE · scenario range</p>
          <span className="snapshot-link">
            Understand the range <ArrowUpRightInline />
          </span>
        </a>
        <a
          href="#chart-price"
          onClick={() => onDimension("all")}
          className="snapshot"
        >
          <p>
            <span className="small-dot violet" />
            THE ENGINEERING CHANGE
          </p>
          <div className="snapshot-value price-value">
            ${value("obs-price-2022-11")}
            <span>→</span>${value("obs-price-2024-10")}
          </div>
          <h3>Price at a fixed benchmark threshold</h3>
          <p>AI Index · USD/million tokens · Nov 2022–Oct 2024</p>
          <span className="snapshot-link">
            Inspect the comparison <ArrowUpRightInline />
          </span>
        </a>
      </div>
      <div className="section dimensions-section">
        <SectionHeading
          number="01"
          eyebrow="SIX CONNECTED LENSES"
          title="A system worth understanding."
          description="Each lens reveals something different. None tells the whole story."
        />
        <div className="dimension-grid">
          {dimensions.map((d) => {
            const Icon = dimensionIcons[d.icon];
            return (
              <button
                key={d.id}
                className={`dimension-card ${d.color} ${selected === d.id ? "selected" : ""}`}
                aria-pressed={selected === d.id}
                aria-controls="lens-detail"
                onClick={() => setSelected(d.id)}
              >
                <span className="dimension-card-top">
                  <span className="dimension-icon">
                    <Icon size={19} />
                  </span>
                  <ArrowRight size={14} />
                </span>
                <h3>{d.title}</h3>
                <p>{d.description}</p>
              </button>
            );
          })}
        </div>
        <div
          id="lens-detail"
          className={`lens-detail ${lens.color}`}
          aria-live="polite"
        >
          <div className="lens-detail-head">
            <h3>{lens.title}</h3>
            <a
              className="text-link"
              href="#dashboard"
              onClick={() => onDimension(lens.id)}
            >
              Explore this lens <ArrowRight size={14} />
            </a>
          </div>
          <div className="lens-columns">
            <div>
              <h4>What can be measured</h4>
              <p>{lens.measurable}</p>
            </div>
            <div>
              <h4>What remains uncertain</h4>
              <p>{lens.uncertain}</p>
            </div>
            <div>
              <h4>What can improve</h4>
              <p>{lens.improving}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function ArrowUpRightInline() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}
