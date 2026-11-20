import { Feather, Heart } from "lucide-react";
import Disclosure from "./Disclosure.jsx";
import { ExternalLink, SectionHeading, Tag } from "./Shared.jsx";
export default function AuthorPerspective() {
  return (
    <section
      id="author"
      className="section divided-section"
      aria-labelledby="author-title"
    >
      <SectionHeading
        number="07"
        eyebrow="AUTHOR'S PERSPECTIVE"
        title={
          <span id="author-title">
            Creative freedom. Human dignity. Room to change.
          </span>
        }
      />
      <div className="author-card">
        <Feather size={25} />
        <div>
          <Tag tone="violet">
            PERSONAL PHILOSOPHY · NOT AN EMPIRICAL FINDING
          </Tag>
          <p className="author-lead">
            A word can become a world. Through sound, poetry, characters, and
            images, art lets us experience meaning—not merely define it.
            Creative tools can help more people explore that possibility.
          </p>
          <div className="author-values">
            <Tag>Creative freedom</Tag>
            <Tag>Respect for craft</Tag>
            <Tag>Consent & accountability</Tag>
          </div>
          <Disclosure
            title="Read the author's perspective"
            description="Personal philosophy, its responsibilities, and room to revise"
          >
            <p>
              This author's creative practice often begins with a single word.
              A song becomes a place to explore its layers through metaphor,
              sound design, and playful characters. The point isn't to instruct
              a listener what to believe; it's to invite resonance and leave
              room for their own interpretation.
            </p>
            <p>
              AI-assisted tools can remove execution barriers and make that
              exploration possible through new layers of abstraction. That
              possibility coexists with respect for manual craft, human
              authorship, consent, and artistic labor. Neither traditional nor
              AI-assisted creation is inherently superior.
            </p>
            <p>
              Creative freedom also comes with responsibility. Improving a
              technology must include serious attention to the people harmed by
              its present implementation. Compassion and accountability are
              compatible with engineering progress.
            </p>
            <div className="author-commitment">
              <Heart size={16} />
              <p>
                This observatory is open to evidence that challenges its
                author's perspective. Personal values do not get to rewrite
                measured facts.
              </p>
            </div>
            <ExternalLink href="https://github.com/egohygiene/ethics/blob/main/EPISTEMOLOGY.md">
              Read our epistemic commitments
            </ExternalLink>
          </Disclosure>
        </div>
      </div>
    </section>
  );
}
