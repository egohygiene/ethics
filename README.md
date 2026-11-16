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

This implementation is proposed on `feat/ethics-v0.1` for review against `main`. It has not been merged or deployed. The intended address is **https://ethics.egohygiene.io**; this is a target, not a verified live deployment.

At initial delivery, GitHub reported `has_pages: false`, the Pages endpoint returned 404, and the target hostname did not resolve. Follow the exact steps in [the deployment guide](docs/deployment.md). Approval and merge remain with the maintainer. Keep [roadmap #6](https://github.com/egohygiene/ethics/issues/6) open until HTTPS, the deployed commit, data integrity, and the custom domain are verified.

## Documentation

[Architecture](ARCHITECTURE.md) · [Epistemology](EPISTEMOLOGY.md) · [Methodology](METHODOLOGY.md) · [Source registry and access](DATA_SOURCES.md) · [Evidence contracts](docs/data-model.md) · [Deployment](docs/deployment.md) · [QA results](docs/qa/README.md) · [Roadmap](ROADMAP.md) · [Contributor guide](CONTRIBUTING.md)

Existing milestone: [Ethics v0.1](https://github.com/egohygiene/ethics/milestone/1). Existing workstreams: [#1](https://github.com/egohygiene/ethics/issues/1), [#2](https://github.com/egohygiene/ethics/issues/2), [#3](https://github.com/egohygiene/ethics/issues/3), [#4](https://github.com/egohygiene/ethics/issues/4), [#5](https://github.com/egohygiene/ethics/issues/5).

Made with love. ❤️ [Ego Hygiene](https://github.com/egohygiene) · [Civics](https://civics.egohygiene.io) · [Akashic](https://akashic.egohygiene.io)
