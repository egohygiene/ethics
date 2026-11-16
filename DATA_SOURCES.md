# Source registry and access policy

The canonical registry is [`data/reviewed/sources.json`](data/reviewed/sources.json), materialized at [`public/data/v1/observatory.json`](public/data/v1/observatory.json). IDs are stable across URL changes. Every record includes publisher, access mode, retrieval health, update policy, license/access notes, review state, and independent freshness clocks.

## Actual integrations

| Integration | Access | Published use | Refresh |
| --- | --- | --- | --- |
| IEA Energy and AI (2025) | Manually reviewed official HTML | 2024 estimate 415 TWh; 2030 Base Case 945 TWh | Manual source comparison and PR |
| DOE summary of Berkeley Lab (2024) | Manually reviewed official HTML | U.S. 2014 58 TWh; 2023 176 TWh; 2028 range 325–580 TWh | Manual source comparison and PR |
| Stanford AI Index (2025) | Manually reviewed official PDF, printed p.64 / PDF p.65, figure 1.3.22 | $20 and $0.07 per million tokens, 3:1 input/output weighting, fixed MMLU threshold | Manual source comparison and PR |
| Crossref REST | Public no-auth API; bibliographic facts only | 13 agent-screened reading-queue entries from 27 deduplicated discoveries | Monthly bounded candidate PR; no automatic promotion |

All three quantitative snapshots have been source-compared by the implementation agent. Independent human evidence review is pending; no human review timestamp has been invented. Raw files retain short attributed report excerpts or sanitized API metadata, not whole third-party reports. Source URLs and exact locators accompany the charts. Underlying report dates are historical even when this app is rebuilt today.

OpenAlex's first API query returned HTTP 429 in this environment. It is registered as a reference, not a functioning feed. The Berkeley Lab report's historical download URL returned a zero-body HTTP 202 redirect; the accessible DOE official summary is the quantitative evidence. CodeCarbon's `/en/latest/` URL returned 404; its verified documentation is `/latest/`. C2PA Tool's old repository path returned 404; the registry uses its verified official documentation. These are access observations, not judgments about source quality.

## Full inventory

Reference-only means no data ingestion is enabled, even if an upstream API or download exists. An HTTP link check never grants automation or redistribution permission.

| Stable ID | Source | Mode | Access / licensing boundary |
| --- | --- | --- | --- |
| `iea` | [IEA · Energy and AI](https://www.iea.org/reports/energy-and-ai) | manual_report | CC BY 4.0 for this report, subject to IEA terms and third-party exclusions. Attribute IEA (2025), Energy and AI. |
| `berkeley-lab` | [Berkeley Lab publications](https://eta-publications.lbl.gov/) | reference_only | Item-specific rights; no full reports redistributed. |
| `doe` | [DOE · U.S. data-center energy report summary](https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers) | manual_report | Official U.S. government factual summary; check third-party exceptions. Only short attributed evidence excerpts retained. |
| `eia` | [EIA Open Data](https://www.eia.gov/opendata/) | reference_only | U.S. government data; review dataset-specific attribution and API conditions. |
| `epa-egrid` | [EPA eGRID](https://www.epa.gov/egrid) | reference_only | U.S. government data with dataset-specific notes. No workbook redistributed. |
| `usgs-water` | [USGS Water Use](https://www.usgs.gov/mission-areas/water-resources/science/water-use-united-states) | reference_only | U.S. government data; check each dataset’s terms and method. |
| `ecologits` | [EcoLogits](https://ecologits.ai/latest/) | reference_only | Project documentation and code have separate terms; inspect linked repository license before reuse. |
| `codecarbon` | [CodeCarbon](https://docs.codecarbon.io/latest/) | reference_only | MIT-licensed software; documentation and input data may have separate terms. |
| `ai-energy-score` | [AI Energy Score](https://huggingface.github.io/AIEnergyScore/) | reference_only | Benchmark code/data have specific licenses; inspect each release. No dataset mirrored. |
| `mlcommons` | [MLCommons](https://mlcommons.org/) | reference_only | Benchmark-specific terms and rules apply. Link only. |
| `green-software` | [Green Software Foundation](https://greensoftware.foundation/) | reference_only | Resource-specific licenses; link only. |
| `epoch` | [Epoch AI data](https://epoch.ai/data) | reference_only | Dataset-specific terms; do not assume every dataset is freely redistributable. |
| `ai-index` | [Stanford AI Index 2025](https://hai.stanford.edu/ai-index/2025-ai-index-report) | manual_report | Report reuse and underlying third-party data have separate terms. Only two attributed factual endpoints and a short excerpt retained. |
| `openalex` | [OpenAlex](https://openalex.org/) | reference_only | OpenAlex metadata is CC0; API budgets/authentication policies apply. |
| `mit-risk` | [MIT AI Risk Repository](https://airisk.mit.edu/) | reference_only | Repository-specific licensing and taxonomy limitations apply. Link only. |
| `fmti` | [Foundation Model Transparency Index](https://crfm.stanford.edu/fmti/December-2025/index.html) | reference_only | Report and underlying data terms vary; link only. |
| `oecd` | [OECD AI Policy Observatory](https://oecd.ai/en/) | reference_only | OECD dataset-specific terms; no dataset mirrored. |
| `aiid` | [AI Incident Database](https://incidentdatabase.ai/) | reference_only | Incident reports and database exports have specific terms. No reports copied. |
| `avid` | [AVID](https://avidml.org/) | reference_only | Database and report-specific terms; link only. |
| `nist` | [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) | reference_only | U.S. government framework; preserve attribution and third-party exceptions. |
| `copyright` | [Copyright and Artificial Intelligence](https://www.copyright.gov/ai/) | reference_only | Official U.S. government reports and guidance; linked submissions may have third-party copyright. |
| `ilo` | [Generative AI and Jobs: refined occupational exposure index](https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure) | reference_only | ILO publication-specific license and terms; link only. |
| `osi` | [Open Source AI Definition](https://opensource.org/ai) | reference_only | Definition and site-specific licenses; inspect linked terms. |
| `c2pa` | [Coalition for Content Provenance and Authenticity](https://c2pa.org/) | reference_only | Specification and implementation licenses differ; link only. |
| `fda` | [FDA AI-enabled medical devices](https://www.fda.gov/medical-devices/artificial-intelligence-enabled-medical-devices/list-artificial-intelligence-enabled-medical-devices) | reference_only | U.S. government list with scope notes; no device database mirrored. |
| `crossref` | [Crossref REST API](https://www.crossref.org/documentation/retrieve-metadata/rest-api/) | automated_dataset | Bibliographic facts are available for reuse through the public REST API; abstracts and full text have separate rights and are not retained. |
| `akashic-ai` | [Akashic · Artificial Intelligence](https://github.com/egohygiene/akashic/blob/main/lists/artificial-intelligence/README.md) | reference_only | Curated link collection; destination resources have their own terms. |
| `akashic-research` | [Akashic · Research](https://github.com/egohygiene/akashic/blob/main/lists/research/README.md) | reference_only | Curated link collection; destination resources have their own terms. |
| `akashic-creative` | [Akashic · Creative Resources](https://github.com/egohygiene/akashic/blob/main/lists/creative-resources/README.md) | reference_only | Curated link collection; each asset/tool has separate terms. |
| `promptfoo` | [Promptfoo](https://www.promptfoo.dev/) | reference_only | Software and services have separate license/access terms. |
| `c2pa-tool` | [C2PA Tool](https://opensource.contentauthenticity.org/docs/sdk-repos/c2patool/) | reference_only | Implementation-specific software licenses; inspect repository release. |
| `osf` | [Open Science Framework](https://osf.io/) | reference_only | Project content and platform terms differ; hosted features may require accounts. |

## Refresh and promotion

Run `npm run refresh` on Node.js 24. This makes nine sequential Crossref queries with three results per topic, up to 18 total requests including bounded retries. No abstracts, full text, private contacts, keys, or personal search history are collected. Provider response fields are normalized into repository-owned publication records; DOI matching is case-insensitive. Partial or failed requests never replace published data. Materially unchanged metadata produces no new candidate file.

Review `data/candidates/research.json`, inspect the linked papers and publication types, document selection, and explicitly update `data/reviewed/publications.json`. Run the checks and examine the Git diff. Scheduled workflows open a PR only; they do not turn new titles into established findings. Report values are refreshed separately through direct source comparison. Preserve agent and human review clocks distinctly.

## Inspectable artifacts

- `data/raw/evidence-*.json`: short source excerpts, locators, retrieval clock, and SHA-256 integrity.
- `data/raw/crossref-initial.json`: selected-field initial API responses and discovery query URLs.
- `docs/qa/source-access.json`: one-time availability checks, including blocked and redirected routes.
- `docs/qa/research-selection.md`: initial metadata screening and exclusions.
- `public/data/v1/manifest.json`: release inventory, per-file hashes, attribution, and limitations.

Reference resources such as incident databases, FDA listings, water-use records, and transparency reports are not synthesized into invented counts or efficacy claims. Geography, selection bias, method changes, access limits, and incomplete coverage matter.
