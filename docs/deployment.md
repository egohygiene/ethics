# First public deployment

## Current boundary

The implementation branch is reviewable; it is not a public deployment. Do not merge the PR without owner approval. The parent roadmap remains open until the deployed custom domain is verified.

Initial environment observations (2026-11-15, America/New_York): repository metadata reports `has_pages: false`; `GET /repos/egohygiene/ethics/pages` returns 404; `ethics.egohygiene.io` does not resolve; HTTPS could not be established. Civics and Akashic sibling domains return HTTP 200. The root `egohygiene.io` returned 404, so the footer's Ego Hygiene link uses the public GitHub organization.

The available credential also attempted to enable workflow-based Pages with `POST /repos/egohygiene/ethics/pages` after the implementation PR was opened. GitHub rejected it with **HTTP 403, “Resource not accessible by integration.”** No Pages setting changed and no code was deployed. A maintainer with Pages administration access must perform the setup below.

## Maintainer steps

1. Review and approve the implementation PR. Check the committed screenshots, source excerpts and exact tables, evidence limitations, and CI results. Independent human evidence review is still pending; if performed, record reviewer, scope, and actual time rather than replacing agent checks with an implied approval.
2. In **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source. The deployment workflow is `.github/workflows/pages.yml`. It validates evidence, runs unit and production-browser checks, builds, and deploys only `refs/heads/main`. PRs never deploy production.
3. In the authoritative DNS zone for `egohygiene.io`, add **CNAME** host **`ethics`** pointing to **`egohygiene.github.io`**. Use DNS-only mode while GitHub provisions HTTPS if a DNS provider offers HTTP proxying. Do not point the CNAME to a URL with a scheme or path. Verify there is no conflicting record for the same host.
4. In **Settings → Pages → Custom domain**, enter **`ethics.egohygiene.io`**. `public/CNAME` already contains this exact name; Vite uses base `/` for the custom-domain root. Verify domain ownership using GitHub's organization Pages verification if it is not already verified; GitHub supplies the exact TXT token. Never invent that token.
5. Merge the PR only after owner approval. The push to `main` triggers production validation and deployment. If Pages was enabled after the merge, dispatch **Deploy Ethics to Pages** on `main`.
6. Wait for the GitHub Pages certificate and enable **Enforce HTTPS** once available. Inspect the `github-pages` environment and Actions run for the deployed commit and page URL.
7. Verify the public checks below, then complete delivery issue #5 and close roadmap #6 only after all checks pass.

## Verification after deployment

```sh
dig +short CNAME ethics.egohygiene.io
curl --fail --head https://ethics.egohygiene.io/
curl --fail https://ethics.egohygiene.io/data/v1/manifest.json
curl --fail https://ethics.egohygiene.io/data/v1/observatory.json -o /tmp/ethics-public-evidence.json
sha256sum /tmp/ethics-public-evidence.json
```

Confirm the downloaded evidence hash equals `files[].sha256` for `data/v1/observatory.json`. Check that the Pages environment's deployed revision is the approved merge commit, the site loads over HTTPS without certificate errors, the favicon and JSON assets load, all seven section anchors work, and charts, tables, filters, both themes, and the mobile layout remain usable. Check browser requests for unexpected third-party calls. A successful build alone is insufficient.

The CNAME is designed for the custom-domain root. A project-path preview at `egohygiene.github.io/ethics/` requires changing the base and same-origin asset URLs; it is not the release target. Use the local production preview or custom-domain Pages deployment rather than claiming the project path works unchanged.

## Refresh automation

- **Research candidates:** monthly on the first day at 09:19 UTC, plus manual dispatch on `main`. Crossref discovery writes only `data/candidates/research.json`. Material changes are validated and proposed on a unique automation branch in a PR. There is no auto-merge, scientific conclusion generation, or automatic replacement of published reports/reading queue.
- **Link health:** Mondays at 10:41 UTC, plus manual dispatch on `main`. Artifacts retain availability states and blocked publisher destinations. A DOI can be registered while full text is inaccessible. These checks do not update human review or source-data dates.
- **Manual reports:** no report scraping. Compare updated editions, preserve scope and uncertainty, update canonical evidence, run checks, inspect the materialized diff, and open a PR.

The refresh job needs `contents: write` and `pull-requests: write`. In **Settings → Actions → General → Workflow permissions**, allow Actions to create pull requests where organization policy permits. The execution token could not read this setting (HTTP 403), so its current state is unknown. If PR creation is blocked, retain the candidate branch/output and have a maintainer open the review PR; do not bypass policy with an unapproved token.

## Rollback

Revert the approved implementation or data change in a normal PR, run checks, and deploy the reviewed revert from `main`. Git retains prior data snapshots and hashes. Do not silently edit published observations or force-push main.
