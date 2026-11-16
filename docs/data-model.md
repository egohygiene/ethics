# Version-one evidence contracts

All canonical contracts use JSON Schema Draft 2020-12 under `schemas/v1/`. The build publishes identical schema files under `/schemas/v1/` and static JSON under `/data/v1/`. Canonical records are in `data/reviewed/`; materialized public copies are generated, never independently edited.

| Resource | Role |
| --- | --- |
| source | Stable publisher identity, URL, access mode, terms, update policy, source health and review clocks |
| dataset | Named collection, metric, observation membership, methodology, scope limitations and freshness |
| observation | Period-specific numeric value or source scenario range; metric, dataset, source and evidence references |
| metric | Units, geography, denominator, scope and AI-only versus all-data-center coverage |
| evidence | Source excerpt or record locator, original URL, publication/retrieval dates, raw capture and review |
| claim | Explicitly classified statement, supporting evidence, source references and limitations |
| visualization | Deterministic transform ID/version, dataset, display scale, maximum and linked claims |
| publication | DOI identity, title, venue, original publication type, date precision, topics, retrieval and metadata review |
| organization | Curated resource, topics, access notes, source IDs and optional Akashic context |
| perspective | Editorial synthesis with evidence boundaries, competing considerations, values, uncertainties, interventions and primary references |
| dataset-manifest | Release files, SHA-256 hashes, byte counts, record counts, source attribution and limitations |

```text
Source → Evidence ← Claim
  ↓          ↓
Dataset → Observation → Metric
  ↓
Visualization → SVG + exact-value table + provenance

Source → Publication / Organization / Perspective
```

## Availability envelope

```json
{"status":"not_researched","value":null,"evidenceRefs":[],"note":"No relevant source review has been performed."}
```

`known` requires a non-null value and evidence; `conflicting` requires at least two evidence references. `unknown`, `not_available`, `not_researched`, and `not_applicable` require null. A known zero remains zero. A conflicting range cannot be silently collapsed into a point estimate. The current projection range is a single source's scenario range, not conflicting evidence and not a confidence interval.

## Review and freshness

Review states are `agent_checked`, `metadata_checked`, `needs_review`, and `human_reviewed`. Only an actual human review can supply `humanReviewedAt`. Source period, publication date, successful source check, material data change, agent review, human review, retrieval, and software build are independent clocks. Bibliographic partial dates retain `publicationDatePrecision`; internal sorting does not imply a known exact day.

## Cross-record validation

`npm run validate` checks schemas, unique IDs, typed references, dataset/metric/observation membership, evidence/source lineage, raw excerpt hashes, ordered ranges, chart clipping, DOI duplicates, automation permission, and review-clock consistency. Materialization verifies output hashes and lengths. Tests reject malformed states, broken references, invalid ranges and source failures.

Charts are disposable views of evidence, not a second store of facts. All three v0.1 transforms preserve source endpoints on a zero-baseline linear axis. The U.S. view renders both scenario endpoints without an invented midpoint. Chart filters select entire compatible datasets; their exact tables and provenance remain bound to those same records. SVG titles/descriptions, direct labels, pattern/text projection cues, and semantic tables preserve meaning without color or hover.

The conceptual workflow is outside the observed-data graph: arbitrary calculator assumptions cannot become published measurements. Its pure calculator module includes all named terms and divides by actual assumed accepted-output counts; zero accepted outputs produces an undefined rate.

The manifest’s `evidenceAsOf` is the latest stored evidence/review clock, not the materialization run time. `generator.codeSha256` fingerprints the materializer, I/O, and validation code. `/build.json` separately records the software build date, Git revision, and local dirty state. `SOURCE_DATE_EPOCH` allows reproducible software builds; it never refreshes source data.
