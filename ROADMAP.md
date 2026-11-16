# Ethics roadmap

The authoritative first-release work is milestone [#1](https://github.com/egohygiene/ethics/milestone/1) and roadmap [#6](https://github.com/egohygiene/ethics/issues/6). Do not recreate them.

1. [Foundation #1](https://github.com/egohygiene/ethics/issues/1): independent React/Vite shell, design tokens, navigation, documentation, theme and accessibility.
2. [Data #2](https://github.com/egohygiene/ethics/issues/2): versioned contracts, verified source inventory, bounded discovery adapter, validation and materialization.
3. [Dashboard #3](https://github.com/egohygiene/ethics/issues/3): six evidence dimensions, three source-backed quantitative views, conceptual workflow graph and calculator.
4. [Perspectives #4](https://github.com/egohygiene/ethics/issues/4): ten ethical questions, searchable research, curated resources and author perspective.
5. [Delivery #5](https://github.com/egohygiene/ethics/issues/5): CI, reviewable refresh PRs, Pages, QA and release instructions.

The parent remains open until custom-domain deployment is verified. PR approval and merge belong to the maintainer. Follow-on work: independent human source review, additional official data adapters, measured workflow experiments, broader geographic coverage, richer evidence on water/labor/accessibility, and longitudinal disclosures with comparable methods. No placeholder metrics will stand in for these gaps.

## Implementation checkpoint

The functioning first-release implementation is in [PR #7](https://github.com/egohygiene/ethics/pull/7), targeting main. Foundation, evidence contracts/adapters, dashboard/workflow explorer, and perspectives/research/resources have passed local and GitHub CI checks. The owner has not approved a merge and no deployment is claimed.

Delivery remains open: the available GitHub integration cannot enable Pages (HTTP 403); a maintainer must enable Actions-based Pages and configure the custom domain, then add the DNS CNAME, approve and merge the PR, provision HTTPS, and verify the deployed commit and dataset hash. Independent human evidence review remains pending. See [the deployment guide](docs/deployment.md). Keep #5 and #6 open until their remaining acceptance conditions are verified.
