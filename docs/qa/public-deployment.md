# First public deployment verification

**Live site:** https://ethics.egohygiene.io

Verified on 2026-11-15 (America/New_York; exact UTC timestamps are retained in [the machine-readable receipt](public-deployment.json)). This is an agent's deployment and interaction verification, not independent human review of the underlying evidence.

## Approved source and deployment

- The maintainer merged [PR #7](https://github.com/egohygiene/ethics/pull/7).
- First deployed merge revision: `c1c737b71d7d477119882fc1b08873b7e6666f50`.
- [Main quality workflow](https://github.com/egohygiene/ethics/actions/runs/43805838133): passed canonical/candidate validation, 18 unit/contract tests, production build, artifact reproducibility, and seven production-browser tests.
- [Pages workflow](https://github.com/egohygiene/ethics/actions/runs/43805838083): build and deploy jobs succeeded for the same merge revision.
- Public `/build.json` identifies that exact revision, version `0.1.0`, `dirty: false`, built at `2026-11-16T04:44:17.853Z`.

## Public artifacts and integrity

The HTTPS homepage, build record, dataset manifest, observatory JSON, favicon, and observation schema returned HTTP 200. Browser-loaded CSS and JavaScript also loaded successfully. The hostname resolved to GitHub Pages addresses and no TLS errors were observed.

Downloaded `/data/v1/observatory.json`: **119,410 bytes**.

SHA-256, matching the published manifest:

```text
52abed5f5ba391738901cb76e490072220f2547cfe6117e5dd10f8d746f4aefb
```

The published snapshot contains three datasets, seven observations, three quantitative visualizations, ten perspectives, thirteen publications, fifteen curated resources, and thirty-two registered sources. A fresh deployment has not changed the source reporting periods or review status.

## Live browser checks

Chromium checked the public HTTPS origin with normal certificate validation, without disabling HTTPS errors. Verified:

- All seven sections, the three quantitative charts, and exact source-value table.
- Evidence-lens filtering and explicit quantitative coverage gaps.
- The workflow calculator, changed assumptions, reversed comparison, and reset.
- Perspective selection and research search.
- Dark/light theme switching.
- Mobile topic selection, no page overflow at 390 px, and reduced-motion behavior.
- No JavaScript page errors and no unexpected third-party requests.

[Live desktop screenshot](screenshots/live-desktop.png) · [Live mobile screenshot](screenshots/live-mobile.png).

## Operational status

HTTPS is serving successfully and GitHub reports the domain certificate approved. The maintainer enabled **Enforce HTTPS**, and the Pages API confirms `https_enforced: true`. Public GET requests to the homepage, `/index.html`, and `/build.json` each return **HTTP 301** with a matching HTTPS location. The HTTPS build revision and dataset hash were rechecked successfully at `2026-11-16T04:56:46Z`.


Actions-based publication and the custom domain are configured. Visibility into the repository setting allowing refresh PR creation remains unavailable to the integration (HTTP 403); the refresh code is implemented and the bounded discovery adapter was tested, but the first scheduled PR has not been observed. Independent human evidence/content review, Firefox/Safari testing, and an actual measured workflow experiment remain follow-on work.
