import { useId, useState } from "react";
import {
  Check,
  Film,
  Image,
  Lightbulb,
  Pause,
  Play,
  RotateCcw,
  SlidersHorizontal,
  TextCursorInput,
  X,
} from "lucide-react";
import { calculateWorkflows, defaultWorkflow } from "../lib/workflow.js";
import { formatValue } from "../lib/evidence-view.js";
import { ExternalLink, SectionHeading, Tag } from "./Shared.jsx";
function Node({ x, y, Icon, lines, tone = "violet", label }) {
  return (
    <g className="workflow-node" transform={`translate(${x} ${y})`}>
      <circle
        r="25"
        fill="var(--surface)"
        stroke={`var(--${tone})`}
        strokeOpacity=".6"
      />
      <circle r="32" fill="none" stroke={`var(--${tone})`} strokeOpacity=".1" />
      <Icon
        x="-10"
        y="-10"
        width="20"
        height="20"
        color={`var(--${tone})`}
        strokeWidth="1.5"
      />
      {lines.map((line, i) => (
        <text
          key={line}
          x="0"
          y={47 + i * 17}
          textAnchor="middle"
          fill="var(--text)"
          fontSize="12"
        >
          {line}
        </text>
      ))}
      {label && (
        <text
          className="node-phase"
          x="0"
          y="-42"
          textAnchor="middle"
          fill="var(--muted)"
          fontSize="10"
        >
          {label}
        </text>
      )}
    </g>
  );
}
function Pipeline({ trial, paused }) {
  const uid = useId().replaceAll(":", "");
  const color = trial ? "amber" : "mint";
  const paths = trial
    ? [
        "M94 65H189",
        "M249 65H344",
        "M400 65H416Q430 65 430 79V187Q430 201 416 201H405",
        "M344 201H249",
        "M189 201H94",
      ]
    : [
        "M94 65H189",
        "M249 65H344",
        "M400 65H416Q430 65 430 79V187Q430 201 416 201H405",
      ];
  return (
    <svg
      viewBox="0 0 440 285"
      className={`pipeline-graph ${paused ? "paused" : ""}`}
      role="img"
      aria-labelledby={`${uid}-title ${uid}-desc`}
    >
      <title id={`${uid}-title`}>
        {trial ? "Repeated trial-and-error" : "Intentional creative pipeline"}
      </title>
      <desc id={`${uid}-desc`}>
        {trial
          ? "Loose prompt, video generation, rejected output, retry, additional video generation, then accepted output. Retries consume additional generation energy."
          : "Still frame, prompt refinement, targeted video generation, then accepted output. Added preparation may reduce costly generation attempts. This graph shows one intentional video generation as a special case; the calculator allows multiple attempts."}{" "}
        Conceptual model, not measured results. Path lengths and node sizes do
        not encode energy amounts.
      </desc>
      <defs>
        <marker
          id={`${uid}-arrow`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={`var(--${color})`} />
        </marker>
      </defs>
      {paths.map((d, i) => (
        <g key={d}>
          <path
            d={d}
            fill="none"
            stroke={`var(--${color})`}
            strokeOpacity=".2"
            strokeWidth="2"
          />
          <path
            className="energy-path"
            d={d}
            fill="none"
            stroke={`var(--${color})`}
            strokeOpacity=".65"
            strokeWidth="1.5"
            strokeDasharray="4 10"
            markerEnd={`url(#${uid}-arrow)`}
            style={{ animationDelay: `${i * -0.8}s` }}
          />
        </g>
      ))}
      {trial ? (
        <>
          <Node
            x={64}
            y={65}
            Icon={TextCursorInput}
            lines={["Loose prompt"]}
            tone="amber"
            label="PREPARATION"
          />
          <Node
            x={219}
            y={65}
            Icon={Film}
            lines={["Video generation"]}
            tone="amber"
            label="GENERATION"
          />
          <Node
            x={374}
            y={65}
            Icon={X}
            lines={["Rejected output"]}
            tone="rose"
          />
          <Node
            x={374}
            y={201}
            Icon={RotateCcw}
            lines={["Retry"]}
            tone="amber"
          />
          <Node
            x={219}
            y={201}
            Icon={Film}
            lines={["Additional", "video generation"]}
            tone="amber"
          />
          <Node
            x={64}
            y={201}
            Icon={Check}
            lines={["Accepted output"]}
            tone="mint"
          />
        </>
      ) : (
        <>
          <Node
            x={64}
            y={65}
            Icon={Image}
            lines={["Still frame"]}
            label="PREPARATION"
          />
          <Node
            x={219}
            y={65}
            Icon={Lightbulb}
            lines={["Prompt refinement"]}
            label="PREPARATION"
          />
          <Node
            x={374}
            y={65}
            Icon={Film}
            lines={["Targeted video", "generation"]}
            tone="mint"
            label="GENERATION"
          />
          <Node
            x={374}
            y={201}
            Icon={Check}
            lines={["Accepted output"]}
            tone="mint"
          />
          <text x="42" y="191" fill="var(--muted)" fontSize="12">
            <tspan x="42">Preparation adds cost.</tspan>
            <tspan x="42" dy="21">
              Avoided retries may offset it.
            </tspan>
          </text>
          <text
            x="42"
            y="249"
            fill="var(--mint)"
            fontSize="10"
            letterSpacing="1"
          >
            ONE-GENERATION SPECIAL CASE
          </text>
        </>
      )}
    </svg>
  );
}
function NumericInput({ name, label, values, setValues, integer = false }) {
  return (
    <label className="numeric-label" htmlFor={`cost-${name}`}>
      <span>{label}</span>
      <input
        id={`cost-${name}`}
        type="number"
        min="0"
        max={integer ? 100 : 10000}
        step={integer ? 1 : 0.1}
        value={values[name]}
        onChange={(event) => {
          const value = Number(event.target.value);
          if (
            Number.isFinite(value) &&
            value >= 0 &&
            (!integer || Number.isInteger(value))
          )
            setValues((v) => ({ ...v, [name]: value }));
        }}
      />
    </label>
  );
}
export default function Workflow() {
  const [paused, setPaused] = useState(false);
  const [values, setValues] = useState({ ...defaultWorkflow });
  const results = calculateWorkflows(values);
  return (
    <section
      id="workflow"
      className="section divided-section"
      aria-labelledby="workflow-title"
    >
      <SectionHeading
        eyebrow="AN ENGINEERING QUESTION"
        title={<span id="workflow-title">Energy per Accepted Output</span>}
        description="Could a more intentional creative workflow use less energy to reach a result worth keeping?"
      />
      <div className="hypothesis-label">
        <Lightbulb size={16} />
        <strong>
          Author's hypothesis — conceptual model, not measured results.
        </strong>
      </div>
      <div className="workflow-panel">
        <div className="workflow-panel-heading">
          <p>Two paths. One creative goal.</p>
          <button
            className="small-button"
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}{" "}
            {paused ? "Resume flow" : "Pause flow"}
          </button>
        </div>
        <div className="pipeline-grid">
          <div className="pipeline intentional">
            <div className="pipeline-title">
              <span>A</span>
              <div>
                <h3>Intentional creative pipeline</h3>
                <p>Invest in preparation. Target the generation.</p>
              </div>
            </div>
            <Pipeline paused={paused} />
          </div>
          <div className="pipeline trial">
            <div className="pipeline-title">
              <span>B</span>
              <div>
                <h3>Repeated trial-and-error</h3>
                <p>Generate. Evaluate. Try again.</p>
              </div>
            </div>
            <Pipeline trial paused={paused} />
          </div>
        </div>
        <p className="workflow-graph-note">
          Preparation and generation have different costs. Relative costs depend
          on the actual tools, settings, and boundary; line lengths and node
          sizes are conceptual.
        </p>
        <div className="formula-grid">
          <div>
            <span>INTENTIONAL WORKFLOW</span>
            <code>
              E_intentional = E_image + E_text
              <br /> + N_intentional × E_video + E_other
            </code>
          </div>
          <div>
            <span>TRIAL-AND-ERROR WORKFLOW</span>
            <code>
              E_trial = E_initial_prompt
              <br /> + N_trial × E_video + E_other_trial
            </code>
          </div>
        </div>
        <div className="workflow-definition">
          <strong>Energy per accepted output</strong>
          <span>=</span>
          <span>Total workflow energy / Number of accepted outputs</span>
        </div>
      </div>
      <div className="workflow-insight">
        <span className="small-dot mint" />
        <p>
          An optimized workflow saves energy only when the avoided generation
          costs exceed added planning and preparation costs, under a comparable
          evaluation boundary.
        </p>
      </div>
      <div className="calculator">
        <div className="calculator-heading">
          <div>
            <Tag tone="violet">
              <SlidersHorizontal size={12} />
              CONCEPTUAL CALCULATOR
            </Tag>
            <h3>Explore the break-even point.</h3>
            <p>
              Arbitrary relative units. No joules, vendor measurements, or
              model-specific estimates.
            </p>
          </div>
          <button
            className="small-button"
            onClick={() => setValues({ ...defaultWorkflow })}
          >
            <RotateCcw size={13} />
            Reset assumptions
          </button>
        </div>
        <div className="attempt-controls">
          {[
            ["intentionalAttempts", "Intentional generation attempts"],
            ["trialAttempts", "Trial-and-error generation attempts"],
          ].map(([name, label]) => (
            <label key={name} htmlFor={name}>
              <span>
                {label}
                <output htmlFor={name}>{values[name]}</output>
              </span>
              <input
                id={name}
                type="range"
                min="1"
                max="12"
                step="1"
                value={values[name]}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [name]: Number(e.target.value) }))
                }
              />
            </label>
          ))}
        </div>
        <details className="assumption-details">
          <summary>Edit all relative costs & accepted-output counts</summary>
          <div className="cost-grid">
            <NumericInput
              name="image"
              label="Image preparation"
              values={values}
              setValues={setValues}
            />
            <NumericInput
              name="text"
              label="Text refinement"
              values={values}
              setValues={setValues}
            />
            <NumericInput
              name="video"
              label="One video generation (both paths)"
              values={values}
              setValues={setValues}
            />
            <NumericInput
              name="otherIntentional"
              label="Other intentional processing"
              values={values}
              setValues={setValues}
            />
            <NumericInput
              name="initialPrompt"
              label="Initial trial prompt"
              values={values}
              setValues={setValues}
            />
            <NumericInput
              name="otherTrial"
              label="Other trial processing"
              values={values}
              setValues={setValues}
            />
            <NumericInput
              name="acceptedIntentional"
              label="Accepted intentional outputs"
              values={values}
              setValues={setValues}
              integer
            />
            <NumericInput
              name="acceptedTrial"
              label="Accepted trial outputs"
              values={values}
              setValues={setValues}
              integer
            />
          </div>
          <p>
            Include measurable preparation, failed attempts, preprocessing,
            postprocessing, and shared overhead. The per-operation terms assume
            comparable generation settings; use measured costs for a real
            experiment. With zero accepted outputs, energy per accepted output
            is undefined.
          </p>
        </details>
        <div className="calculator-results" aria-live="polite">
          <div>
            <p>Intentional path</p>
            <strong>{formatValue(results.intentionalPerAccepted)}</strong>
            <span>relative units / accepted output</span>
            <small>
              Total: {formatValue(results.intentional)} relative units
            </small>
          </div>
          <div>
            <p>Trial-and-error path</p>
            <strong>{formatValue(results.trialPerAccepted)}</strong>
            <span>relative units / accepted output</span>
            <small>Total: {formatValue(results.trial)} relative units</small>
          </div>
          <div className="scenario-result">
            <p>Under these assumptions</p>
            <strong>
              {results.relativeDifference === null
                ? "Undefined"
                : `${(Math.abs(results.relativeDifference) * 100).toFixed(1)}%`}
            </strong>
            <span>
              {results.relativeDifference === null
                ? "An accepted output and nonzero baseline are needed."
                : results.relativeDifference === 0
                  ? "equal per accepted output"
                  : `${results.relativeDifference > 0 ? "lower" : "higher"} per accepted output for the intentional path`}
            </span>
          </div>
        </div>
      </div>
      <details className="research-method">
        <summary>How would we test this in the real world?</summary>
        <div className="method-columns">
          <div>
            <h3>Compare like with like</h3>
            <ul>
              <li>
                Same target outcome and acceptance criteria, ideally evaluated
                blind.
              </li>
              <li>
                Comparable model versions, settings, resolution, and video
                duration.
              </li>
              <li>
                Record hardware, region, concurrency, and baseline/idle
                allocation where known.
              </li>
              <li>
                Measure every preparation, generation, retry, and processing
                step.
              </li>
              <li>
                Report accepted-output rate, elapsed time, and human effort as
                well as energy.
              </li>
              <li>
                Repeat trials; publish uncertainty, failures, reproducibility
                artifacts, and boundaries.
              </li>
            </ul>
          </div>
          <div>
            <h3>Choose the right measurement approach</h3>
            <p>
              <ExternalLink href="https://ecologits.ai/latest/">
                EcoLogits
              </ExternalLink>{" "}
              estimates supported API inference impacts using models and
              infrastructure assumptions. It does not directly meter a closed
              provider or cover every image/video workflow.
            </p>
            <p>
              <ExternalLink href="https://docs.codecarbon.io/latest/">
                CodeCarbon
              </ExternalLink>{" "}
              estimates energy and emissions for code on accessible hardware.
              Power estimation, location, hardware support, and system
              boundaries affect accuracy.
            </p>
            <p>
              Neither tool alone establishes this hypothesis. See the{" "}
              <ExternalLink href="https://github.com/egohygiene/ethics/blob/main/METHODOLOGY.md">
                full experimental protocol
              </ExternalLink>
              .
            </p>
          </div>
        </div>
        <p className="rebound-note">
          <strong>The rebound effect:</strong> lower energy per output can
          encourage more outputs. Efficiency gains do not guarantee lower
          aggregate environmental demand.
        </p>
        <p>
          In the graph's one-generation special case, N_intentional = 1. The
          general model and calculator allow multiple intentional attempts.
          Accepted-output counts can differ; compare rates only within a
          consistent outcome and evaluation boundary.
        </p>
      </details>
    </section>
  );
}
