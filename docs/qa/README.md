# v0.1 verification record

Verified locally in the execution environment on 2026-11-15 (America/New_York). This is an implementation/agent review record, not independent human evidence review or public deployment verification.

## Results

| Check | Result |
| --- | --- |
| Node.js | 24.19.0 |
| Canonical evidence | 92 records validated against 11 resource contracts plus shared definitions |
| Discovery candidates | 27 DOI-deduplicated records validated; no automatic promotion |
| Unit/contract tests | 18 passed |
| Production build | Passed; Vite 8.3.8, static HTML/CSS/JS/JSON |
| Production Chromium tests | 7 passed |
| Accessibility | No detected WCAG A/AA violations in axe for desktop dark/light with all evidence details expanded; mobile audit also passed |
| Responsive overflow | No page overflow at 320, 390, 768, 1024, and 1440 CSS pixels |
| Keyboard | Skip link, focus transfer, native controls, section anchors and detail controls exercised |
| Reduced motion | SVG flow animation disabled under prefers-reduced-motion; pause control also exercised |
| Runtime privacy | Observed requests remain on the static origin; no third-party requests or runtime AI |
| Failure recovery | Snapshot loading failure exposes a working retry and repository fallback, with no invented data |
| Source availability | 44 accessible URLs; 6 registered DOIs with publisher destinations restricted or unreachable; no observed broken URL in the final report |
| Public custom domain | Not deployed or verified; hostname did not resolve and GitHub reports Pages disabled |

The browser tests exercise all seven sections, the three charts and exact tables, evidence-lens coverage gaps, all ten perspective topics, nine-theme research filtering and empty states, resource search, theme persistence, calculator changes and zero accepted outputs, hashes, loading retry, keyboard access, reduced motion, and the runtime request boundary. See `test/`, `playwright.config.js`, and [the link-health receipt](link-checks.json). Automated accessibility checks and Chromium coverage do not substitute for independent screen-reader/user testing or Firefox/Safari testing; those have not been performed.

## Rendered screenshots

Captured from a production preview with reduced motion, at 1440 × 1100 desktop and 390 × 844 mobile viewport sizes. The dashboard and workflow captures show whole sections, so their image height differs from the viewport height. Source values and graph assumptions are unchanged by screenshot capture.

- [Desktop, dark](screenshots/desktop-dark.png)
- [Desktop, light](screenshots/desktop-light.png)
- [Mobile, dark](screenshots/mobile-dark.png)
- [Source-backed dashboard](screenshots/desktop-dashboard.png)
- [Desktop workflow hypothesis](screenshots/desktop-workflow.png)
- [Mobile workflow hypothesis](screenshots/mobile-workflow.png)
- [Perspective explorer](screenshots/desktop-perspectives.png)

Reproduce with `npm run build` and `CHROMIUM_PATH=/usr/bin/chromium npm run qa:screenshots`, or omit CHROMIUM_PATH after installing Playwright Chromium.

## Evidence and access limits

- The three quantitative datasets are historical report snapshots: IEA 2025; Berkeley Lab 2024 via DOE; Stanford AI Index 2025. Rebuilding or retrieving a paper today does not change those source periods.
- Report values were source-compared by the implementation agent. Human review remains pending and its timestamps remain null.
- Four evidence dimensions currently have qualitative source-backed explorations but no integrated comparable quantitative series. The interface names those gaps.
- The research queue contains selected bibliographic records. Full methods, findings, venue quality, peer review, and corrections/retractions have not been independently reviewed.
- OpenAlex API access returned HTTP 429; Crossref is the one working automated discovery feed. Six publisher destinations restrict access or could not be reached, though their DOIs are verified in Crossref. No restricted full text is scraped.
- The workflow model uses arbitrary units and is explicitly the author's hypothesis, not measured energy. No universal per-prompt or model-specific energy claim is made.

## Delivery boundary

CI, Pages deployment, monthly candidate PRs, and weekly link-health workflows are implemented. Remote GitHub check results are recorded in the review PR; this file records local checks separately. Pages setup, the ethics DNS CNAME, owner-approved merge, HTTPS provisioning, and public commit/data-hash verification remain required. See [deployment instructions](../deployment.md). Parent roadmap #6 must remain open until the public target is verified.
