import { ArrowRight, Network } from "lucide-react";

const spotlights = [
  {
    id: "org-ecologits",
    mark: "E",
    role: "Inference impact estimates",
    tone: "mint",
  },
  {
    id: "org-codecarbon",
    mark: "C",
    role: "Measure compute emissions",
    tone: "mint",
  },
  {
    id: "org-ai-energy-score",
    logo: "/organization-marks/huggingface.svg",
    mark: "HF",
    role: "Model energy benchmarks",
    tone: "amber",
  },
  {
    id: "org-mit-risk",
    mark: "MIT",
    role: "Map and mitigate AI risks",
    tone: "blue",
  },
  {
    id: "org-nist",
    mark: "N",
    role: "Risk management standards",
    tone: "blue",
  },
  {
    id: "org-c2pa",
    mark: "C2",
    role: "Content provenance",
    tone: "violet",
  },
  {
    id: "org-osi",
    logo: "/organization-marks/opensource-initiative.svg",
    mark: "OSI",
    role: "Open-source AI governance",
    tone: "mint",
  },
  {
    id: "org-promptfoo",
    mark: "P",
    role: "Safety and red-teaming",
    tone: "rose",
  },
];

export default function OrganizationWall({ organizations }) {
  const byId = new Map(organizations.map((entry) => [entry.id, entry]));
  const visible = spotlights
    .map((spotlight) => ({ ...spotlight, organization: byId.get(spotlight.id) }))
    .filter((entry) => entry.organization);

  if (visible.length === 0) return null;

  return (
    <div className="organization-constellation" aria-labelledby="organization-wall-title">
      <div className="organization-constellation-header">
        <div>
          <p className="eyebrow"><span /> PEOPLE WORKING ON THE PROBLEMS</p>
          <h3 id="organization-wall-title">The work is already happening.</h3>
          <p>
            Research, measurement, standards, and practical tools are helping
            make AI systems safer and more accountable.
          </p>
        </div>
        <a href="#resource-directory">
          Browse all resources <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
      <div className="organization-wall">
        {visible.map(({ organization, mark, logo, role, tone }) => (
          <a
            key={organization.id}
            className="organization-tile"
            data-tone={tone}
            href={organization.url}
            aria-label={`Visit ${organization.title}: ${role}`}
          >
            <span className="organization-mark" aria-hidden="true">
              {logo ? (
                <img
                  src={logo}
                  width="28"
                  height="28"
                  alt=""
                  loading="lazy"
                  className="organization-logo"
                />
              ) : mark}
            </span>
            <span className="organization-name">{organization.title}</span>
            <span className="organization-role">{role}</span>
          </a>
        ))}
      </div>
      <p className="organization-constellation-note">
        Independent directory, not sponsorship or endorsement. Some identity
        tiles use typographic placeholders rather than official marks.
        Explore each organization's methods, limitations, and work.
      </p>
    </div>
  );
}
