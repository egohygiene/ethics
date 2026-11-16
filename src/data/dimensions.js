export const dimensions = [
  {
    id: "environment",
    title: "Energy & Environment",
    short: "Environment",
    icon: "leaf",
    color: "mint",
    description: "The physical footprint behind the digital.",
    measurable:
      "Electricity, water, emissions, hardware, and local infrastructure impacts.",
    uncertain:
      "AI-only attribution, local water stress, and future demand under different growth paths.",
    improving:
      "More efficient inference, grid-aware siting, transparent reporting, and lower-impact cooling.",
    sources: ["iea", "doe", "epa-egrid", "usgs-water"],
  },
  {
    id: "accountability",
    title: "Corporate Accountability",
    short: "Accountability",
    icon: "building",
    color: "blue",
    description: "Disclosure is a starting point. Conduct matters.",
    measurable:
      "Published disclosures, documented policies, audit scope, and incident response.",
    uncertain:
      "Undisclosed practices and the gap between corporate commitments and independently verified conduct.",
    improving:
      "Independent audits, enforceable duties, public reporting, and meaningful avenues for remedy.",
    sources: ["fmti", "oecd", "nist"],
  },
  {
    id: "safety",
    title: "Safety & Human Impact",
    short: "Human impact",
    icon: "shield",
    color: "rose",
    description: "Examine harms and benefits in their actual context.",
    measurable:
      "Documented incidents, evaluated vulnerabilities, device authorizations, and task-specific outcomes.",
    uncertain:
      "Underreporting, population-level net effects, external validity, and long-term impacts.",
    improving:
      "Risk testing, accessible design, independent evaluation, monitoring, and human oversight.",
    sources: ["aiid", "avid", "mit-risk", "fda"],
  },
  {
    id: "creativity",
    title: "Creativity, Labor & Access",
    short: "Creativity & labor",
    icon: "palette",
    color: "amber",
    description: "Creative freedom and human labor both have value.",
    measurable:
      "Task exposure, adoption, compensation arrangements, training-data terms, and accessibility outcomes.",
    uncertain:
      "Future employment, context-specific productivity, authorship boundaries, and contested consent.",
    improving:
      "Licensing, artist choice, labor participation, accessible tools, and provenance standards.",
    sources: ["copyright", "ilo", "c2pa"],
  },
  {
    id: "technology",
    title: "Technology & Engineering",
    short: "Engineering",
    icon: "cpu",
    color: "violet",
    description: "Better systems are a practical ethical intervention.",
    measurable:
      "Task-level benchmarks, API prices, hardware power, model settings, and deployment boundaries.",
    uncertain:
      "Transfer from benchmark to use, hidden provider infrastructure, and end-to-end life-cycle costs.",
    improving:
      "Efficient models, local inference where suitable, quantization, measurement, and reproducible tests.",
    sources: ["ai-index", "ai-energy-score", "ecologits", "codecarbon"],
  },
  {
    id: "society",
    title: "Ethics, Philosophy & Society",
    short: "Ethics & society",
    icon: "orbit",
    color: "violet",
    description: "Different values can inform a shared investigation.",
    measurable:
      "Specific policy outcomes and carefully designed surveys; values themselves are not a moral score.",
    uncertain:
      "How to distribute responsibility, resolve competing rights, and govern systemic effects fairly.",
    improving:
      "Public participation, clearer accountability, pluralism, psychological flexibility, and room to revise.",
    sources: ["nist", "oecd", "osi", "akashic-research"],
  },
];
