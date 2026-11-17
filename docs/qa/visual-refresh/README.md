# Visual digest upgrade

This refresh makes the existing evidence easier to scan: larger labels, source-linked mini charts, direct data comparisons, interactive topic bars, and longer explanations behind native disclosures that start closed.

## Presentation and evidence

- The overview contains three zero-baseline mini charts using the same original observations as the main dashboard. Estimate/projection patterns, periods, values and scope remain explicit. No intermediate time-series points are invented.
- Larger main charts expose an additional deterministic transform, `source-endpoint-ratio v1`. Global electricity uses `obs-global-2030 / obs-global-2024` (approximately 2.3×); the U.S. range uses both endpoints of `obs-us-2028 / obs-us-2023` (approximately 1.8–3.3×); the price ratio uses `obs-price-2022-11 / obs-price-2024-10` (approximately 286×). Values are derived from rounded report endpoints, not new measurements. Missing or zero denominators produce an unavailable comparison.
- Release coverage describes the seven published records: five documented estimates and two projections. These counts describe this release's inventory, not evidence quality or moral worth.
- Research topic bars count distinct publication IDs in the reading queue after search/type filters. Selecting a topic filters the cards; a paper can belong to several topics. Counts are not efficacy or peer-review measures. The visible metadata/unverified-review labels remain.
- The workflow comparison responds to the existing arbitrary-unit calculator. It retains an explicit conceptual-model disclaimer, complete cost accounting, undefined zero-output states, and visible rebound/break-even caveats.
- Full source tables, methodology, dates, author perspective, resource descriptions, competing perspectives, uncertainty, and equations remain available in closed native `details` controls. Essential scope and review-state notes remain visible. Keyboard operation and reduced motion are preserved.

The published source data is byte-identical to the previous release. Observatory SHA-256:

```text
52abed5f5ba391738901cb76e490072220f2547cfe6117e5dd10f8d746f4aefb
```

Source/review clocks, seven observations, and the pending independent human evidence review retain their existing meanings. UI summaries are implemented as small deterministic transforms in `src/lib/digest-view.js`; raw evidence is not rewritten.

## Verification

- `npm run check`: canonical and candidate validation, **22 passing unit/contract tests**, production build.
- `CHROMIUM_PATH=/usr/bin/chromium npm run test:browser`: **9 passing production-browser tests**.
- Axe detects no WCAG A/AA violations in desktop dark/light with details expanded, or mobile.
- No page overflow at 320, 390, 768, 1024 and 1440 CSS pixels. Closed disclosures, keyboard expansion, topic-bar filtering, scenario changes/reset, zero accepted outputs, themes, reduced motion and exact-value tables are exercised.
- No published JSON/schema diff; source capture and manifest checks continue to pass. `git diff --check` passes.

A default-layout comparison at equal viewport sizes found 79 → 51 visible paragraph elements. At 390 × 1000 the default page height changed from 18,290 → 14,752 CSS pixels (about 19% shorter), despite larger type and graphs. Desktop page height is approximately unchanged because the quantitative charts are larger. These are layout measurements, not a user-outcome study; inputs and results are in [layout-comparison.json](layout-comparison.json).

## Captured production views

[Desktop](desktop.png) · [Light theme](light.png) · [Mobile](mobile.png) · [Dashboard](dashboard.png) · [Perspectives](perspectives.png) · [Research topic bars](research.png) · [Workflow](workflow.png) · [Mobile perspectives](mobile-perspectives.png) · [Mobile workflow](mobile-workflow.png)
