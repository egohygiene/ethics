# Initial research selection

Crossref REST discovery returned 27 deduplicated records on 2026-11-16. The implementation agent screened titles and venue metadata and retained 13 as a reading queue across nine topics. Two data-center computing-security records were off-topic for environmental mitigation and were excluded. General and ambiguous matches were omitted for a smaller, more useful queue. Retention does not certify peer review, methods, findings, venue quality, or efficacy. Independent human review remains pending.

The complete sanitized query captures, selection pool, retrieval clock, and content hash are in `data/raw/crossref-initial.json`; the selected publication IDs are in `data/reviewed/publications.json`. The scheduled refresh writes only `data/candidates/research.json`. It never changes the reading queue or chart evidence automatically.
