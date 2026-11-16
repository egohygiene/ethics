# Agent guide for Ethics

Ethics is an evidence observatory, not an endorsement engine. Preserve human dignity and visitor agency. Do not assign people, companies, or technologies an aggregate moral score.

## Evidence rules

- Separate source records, normalized observations, interpretations, hypotheses, and personal philosophy.
- Every quantitative view must expose original records, units, period, scope, methodology, limitations, and an exact-value table.
- Data-center totals are not AI-only measurements. A projection is not an observation. Price is not energy. Exposure is not job loss.
- Missing values are never zero. Preserve known, conflicting, unknown, not_available, not_researched, and not_applicable states.
- Automated or agent review never implies human review. Keep humanReviewedAt null until a named human actually reviews the evidence.
- Never fabricate freshness, measurements, time series, citations, verification, or deployment.
- Automate only the bounded permitted APIs named in the registry. No report scraping, private data, credentials, or runtime AI dependency.

## Ownership and conventions

`data/reviewed/` owns normalized evidence; `data/raw/` owns sanitized API captures and short source excerpts; `data/candidates/` owns unapproved discovery changes. `schemas/v1/` owns public Draft 2020-12 contracts. `scripts/` validates and materializes public versioned JSON. `src/` renders it. `dist/` is untracked build output.

Use Node.js 24, UTF-8, LF, two-space indentation, small pure modules, pinned dependencies, and native platform APIs. Keep deployment independent of sibling repository internals. Link to Akashic rather than copying its catalog.

## Verification

Run `npm run check` and `git diff --check`. For UI changes run `npm run test:browser` with Chromium installed (`npx playwright install --with-deps chromium` in CI, or `CHROMIUM_PATH=/usr/bin/chromium` locally). Exercise keyboard navigation, narrow screens, both themes, reduced motion, exact tables, and empty search results. Live link checks use `npm run links`; blocked links require explicit investigation, not an invented success.

## Delivery

Work on an implementation branch. Update existing issues only with verified progress. Keep roadmap #6 open until the first public custom-domain deployment is verified. Open a PR to main; do not merge without the owner's approval. A build is not a deployment and an agent check is not a human evidence review.
