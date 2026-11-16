# Ethics architecture

Ethics v0.1 is an independently deployed React/Vite application on GitHub Pages, using Node.js 24. No backend, runtime research API, tracker, account, or generative model is needed.

```text
approved source registry → bounded adapters / reviewed excerpts
→ normalized evidence → schema + graph validation
→ deterministic versioned materialized JSON → React + semantic tables
```

## Boundaries

- `data/raw/`: minimal public provider metadata and attributed report excerpts. No full copyrighted reports, private fields, or credentials.
- `data/reviewed/`: canonical source, dataset, metric, observation, evidence, claim, visualization, publication, and organization records. Review mode and human review are explicit.
- `data/candidates/`: scheduled discovery proposals. Never published automatically.
- `schemas/v1/`: JSON Schema Draft 2020-12 interfaces; stable IDs are independent of provider response shapes.
- `public/data/v1/`: disposable materialized release and SHA-256 manifest; never hand-edit.
- `src/components/`: reusable charts, evidence detail, workflow graph, and explorer experiences.
- `scripts/lib/`: pure validation, deduplication, adapter, and hashing functions.

The public JSON version is independent of application version. Breaking changes require a new schema directory and migration. Clients never depend on sibling repository implementation. Akashic is a linked discovery resource; Civics supplies conventions, not runtime infrastructure.

## Decisions

1. **Static-first:** evidence is inspectable in Git and works without provider availability at page load.
2. **Native SVG and CSS:** lightweight, responsive, accessible charts with exact tables; no chart framework.
3. **No moral composite:** coverage and uncertainty are visible, not converted into rankings.
4. **Fail-closed publication:** invalid references, states, hashes, or mismatched chart scopes fail validation.
5. **Discovery is not review:** Crossref refresh prepares candidate metadata in a PR. Promotion requires explicit curation; never turn an abstract or title into a scientific conclusion.
6. **Separate clocks:** source period, publication, retrieval/check, material change, agent review, human review, and build date have distinct meanings.

## Ecosystem study

Reviewed current main on 2026-11-15 (America/New_York; source timestamps are stored in UTC): Civics `bcd391f` (AGENTS, architecture, data/visualization contracts, schemas, UI tokens, bounded adapters, validation and Pages workflows); Akashic `dc21c6a` (epistemology, design, design system, AI constitution, agent guidance, AI/research/creative-resource lists). Adopted semantic dark/light tokens, evidence envelopes, explicit missing states, progressive disclosure, exact-value fallbacks, and reviewable updates. Did not adopt unrelated civic entities or repository-intelligence infrastructure.
