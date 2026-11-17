import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CircleHelp,
  Compass,
  Layers3,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { ExternalLink, SectionHeading, Tag } from "./Shared.jsx";
import Disclosure from "./Disclosure.jsx";
export default function Perspectives({ data }) {
  const [selected, setSelected] = useState(data.perspectives[0].id);
  const topic = data.perspectives.find((t) => t.id === selected);
  return (
    <section
      id="perspectives"
      className="section divided-section"
      aria-labelledby="perspectives-title"
    >
      <SectionHeading
        number="03"
        eyebrow="PERSPECTIVES"
        title={
          <span id="perspectives-title">One question. More than one lens.</span>
        }
        description="Choose a question, scan the values, then open the evidence and competing perspectives."
      />
      <div className="mobile-topic-select">
        <label htmlFor="perspective-topic">Choose an ethical question</label>
        <select
          id="perspective-topic"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {data.perspectives.map((t) => (
            <option value={t.id} key={t.id}>
              {t.title}
            </option>
          ))}
        </select>
      </div>
      <div className="perspectives-layout">
        <div className="topic-list" role="group" aria-label="Ethical questions">
          {data.perspectives.map((t, i) => (
            <button
              key={t.id}
              aria-pressed={selected === t.id}
              aria-controls="perspective-detail"
              onClick={() => setSelected(t.id)}
              className={selected === t.id ? "selected" : ""}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {t.title}
              <ArrowRight size={13} />
            </button>
          ))}
        </div>
        <article
          id="perspective-detail"
          className="perspective-detail"
          aria-live="polite"
        >
          <div className="perspective-eyebrow">
            <Scale size={18} />
            <Tag tone="violet">INTERPRETIVE SYNTHESIS</Tag>
            <span>Human review pending</span>
          </div>
          <h3>{topic.question}</h3>
          <div
            className="question-map"
            aria-label="Linked material for this question"
          >
            <div>
              <BookOpen size={17} />
              <strong>{topic.sourceIds.length}</strong>
              <span>linked sources</span>
            </div>
            <div>
              <Scale size={17} />
              <strong>{topic.values.length}</strong>
              <span>ethical values</span>
            </div>
            <div>
              <Compass size={17} />
              <strong>{topic.interventions.length}</strong>
              <span>possible interventions</span>
            </div>
          </div>
          <div className="ethical-values">
            <span>Values at stake</span>
            {topic.values.map((value) => (
              <Tag key={value}>{value}</Tag>
            ))}
          </div>
          <div key={topic.id} className="perspective-folds">
            <Disclosure
              title="Evidence & its limits"
              description="What is established — and what is not"
              icon={ShieldCheck}
            >
              <div className="evidence-boundaries">
                <div>
                  <span className="boundary-label">
                    <span className="small-dot mint" />
                    WHAT THE EVIDENCE ESTABLISHES
                  </span>
                  <p>{topic.established}</p>
                </div>
                <div>
                  <span className="boundary-label">
                    <span className="small-dot amber" />
                    WHAT IT DOES NOT ESTABLISH
                  </span>
                  <p>{topic.notEstablished}</p>
                </div>
              </div>
            </Disclosure>
            <Disclosure
              title="Competing perspectives"
              description={topic.perspectives.map((p) => p.title).join(" · ")}
              icon={Scale}
            >
              <div className="competing-perspectives">
                {topic.perspectives.map((p, i) => (
                  <div key={p.title}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <h4>{p.title}</h4>
                    <p>{p.argument}</p>
                  </div>
                ))}
              </div>
            </Disclosure>
            <Disclosure
              title="Uncertainty & possible interventions"
              description="Open questions and practical ways forward"
              icon={CircleHelp}
            >
              <div className="uncertainty-block">
                <CircleHelp size={16} />
                <div>
                  <h4>What remains open</h4>
                  <p>{topic.uncertainty}</p>
                </div>
              </div>
              <h4 className="perspective-subhead">
                Interventions worth investigating
              </h4>
              <ul className="intervention-list">
                {topic.interventions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Disclosure>
            <Disclosure
              title="Primary sources"
              meta={topic.sourceIds.length}
              icon={Layers3}
            >
              <div className="perspective-sources">
                <div className="inline-links">
                  {topic.sourceIds.map((id) => {
                    const source = data.sources.find((s) => s.id === id);
                    return (
                      <ExternalLink key={id} href={source.url}>
                        {source.title}
                      </ExternalLink>
                    );
                  })}
                </div>
                {topic.evidenceRefs.length > 0 && (
                  <p>
                    Related evidence records: {topic.evidenceRefs.join(", ")}.{" "}
                    <a href="/data/v1/observatory.json">
                      Inspect source lineage ↗
                    </a>
                  </p>
                )}
              </div>
            </Disclosure>
          </div>
        </article>
      </div>
    </section>
  );
}
