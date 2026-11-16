# Ethics · Ego Hygiene

An open-source, evidence-driven observatory for AI's consequences, benefits, limitations, ethical tensions, and engineering improvements.

**Understand the system. Examine the evidence. Preserve human dignity. Improve what we can.**

React + Vite, Node.js 24, versioned public JSON, independently deployed with GitHub Pages. No backend, ads, trackers, accounts, or runtime generative-AI dependency. Theme preference is stored locally when browser storage is available.

## Run locally

```sh
nvm use
npm ci
npm run dev
```

```sh
npm run check                           # schemas, lineage, raw hashes, tests, production build
npx playwright install --with-deps chromium
npm run test:browser                     # production-preview interaction and accessibility checks
npm run refresh                          # bounded Crossref discovery candidates only
node scripts/validate-candidates.mjs
npm run links                            # live availability report; restrictions remain explicit
```

Use `CHROMIUM_PATH=/usr/bin/chromium npm run test:browser` if a system Chromium is already installed. `npm run preview -- --port 4175` serves a production build for manual review. Node's `--use-env-proxy` is enabled only for network scripts; it respects proxy settings when present and works without them on Actions. Builds and tests use checked-in evidence, not live API calls.

## What v0.1 contains

- Seven responsive sections, six evidence lenses, dark/light themes, keyboard access, and reduced motion.
- Three quantitative SVG views with exact tables, source records, dates, scope, uncertainty, and attribution: IEA global electricity; Berkeley Lab U.S. electricity through DOE's official summary; Stanford AI Index inference price at a fixed benchmark threshold.
- Energy per Accepted Output: two original SVG workflow graphs, general formulas, arbitrary-unit calculator, accepted-output accounting, break-even conditions, experiment protocol, tool limits, and rebound discussion.
- Ten sourced ethical questions; searchable DOI-deduplicated research across nine themes; 15 curated resources with Akashic links.
- Versioned JSON Schema contracts, explicit missing/conflict states, evidence validation, SHA-256 manifest, source-link checks, and reviewable refresh PRs.

**Evidence review:** quantitative values were transcribed and compared with official sources by the implementation agent. Independent human evidence review is pending and is labeled throughout. Research entries are metadata reading candidates, not established findings. Data-center totals are not AI-only energy; API price is not energy; projections are not observations.

## Release status and deployment

**Live:** https://ethics.egohygiene.io

[PR #7](https://github.com/egohygiene/ethics/pull/7) was merged by the maintainer. The first public deployment was verified on 2026-11-15 (America/New_York): the HTTPS site serves the approved merge commit `c1c737b71d7d477119882fc1b08873b7e6666f50`, the downloaded evidence matches its SHA-256 manifest, and live desktop/mobile interactions pass. HTTPS enforcement is enabled, and HTTP requests redirect to HTTPS. Both the [deployment](https://github.com/egohygiene/ethics/actions/runs/43805838083) and [quality](https://github.com/egohygiene/ethics/actions/runs/43805838133) workflows passed.

See the [public verification receipt](docs/qa/public-deployment.md) and [deployment guide](docs/deployment.md) for the exact checks, HTTPS enforcement status, and remaining operational limits. Software publication does not constitute independent human evidence review; that remains pending.

## Documentation

[Architecture](ARCHITECTURE.md) · [Epistemology](EPISTEMOLOGY.md) · [Methodology](METHODOLOGY.md) · [Source registry and access](DATA_SOURCES.md) · [Evidence contracts](docs/data-model.md) · [Deployment](docs/deployment.md) · [QA results](docs/qa/README.md) · [Roadmap](ROADMAP.md) · [Contributor guide](CONTRIBUTING.md)

Existing milestone: [Ethics v0.1](https://github.com/egohygiene/ethics/milestone/1). Existing workstreams: [#1](https://github.com/egohygiene/ethics/issues/1), [#2](https://github.com/egohygiene/ethics/issues/2), [#3](https://github.com/egohygiene/ethics/issues/3), [#4](https://github.com/egohygiene/ethics/issues/4), [#5](https://github.com/egohygiene/ethics/issues/5).

Made with love. ❤️ [Ego Hygiene](https://github.com/egohygiene) · [Civics](https://civics.egohygiene.io) · [Akashic](https://akashic.egohygiene.io)
