# Methodology

## Publication process

1. Verify an official source and document access, reuse limits, scope, and refresh policy.
2. Preserve a minimal attributed excerpt or sanitized API response and its original URL/record locator.
3. Normalize values without adding precision. Record units, geography, denominator, reporting period, publication date, retrieval, and limitations.
4. Classify estimates and projections explicitly. Preserve missing or conflicting states.
5. Compare the values with their source; record agent checking separately from human review.
6. Validate schema and cross-record invariants, then deterministically materialize static views and hashes.
7. Review the Git diff and PR before release.

v0.1's report values are transcribed and source-compared by the implementation agent. They have **not received independent human evidence review**. This is shown in the interface and metadata. Research discovery validates metadata only; inclusion is not evidence of efficacy or a scientific endorsement.

## Quantitative views

- Global data-center electricity: IEA 2025 report, 2024 estimate and 2030 Base Case projection; TWh/year, all data centers, global. Rounded source values. No interpolation.
- U.S. data-center electricity: DOE's official summary of Berkeley Lab's 2024 report; 2014 and 2023 estimates and the 2028 projection range; TWh/year, all U.S. data centers. The range is scenario uncertainty, not a confidence interval.
- Inference price: Stanford AI Index 2025, GPT-3.5-equivalent benchmark performance; USD per million tokens and dated endpoints. A price comparison, not an electricity or carbon comparison. Model/market conditions differ.

See the source registry, evidence locators, and exact tables for the authoritative values and qualifications. Never sum global and U.S. totals, compare different reporting periods as shares, or treat data-center totals as AI-only electricity.

## Energy per Accepted Output experiment

The workflow diagram is **Author's hypothesis — conceptual model, not measured results**. Calculator inputs are arbitrary relative units without a model/vendor mapping. All preparation, text, image, generation, retries, postprocessing, and accepted outputs are included in the evaluation boundary.

Compare the same target and preregistered acceptance criteria using comparable model versions, seeds/settings where supported, resolution, duration, hardware, location, concurrency, and measurement boundary. Record attempts, accepted-output rate, preparation/generation/processing energy, elapsed time, human effort, uncertainty, and reproducibility artifacts. Randomize workflow order, repeat trials, report failures and variance, and have acceptance judged blind where possible. Include baseline/idle attribution and separate operational energy from embodied hardware and upstream training allocations.

A workflow saves energy only when avoided generation energy exceeds added planning/preparation energy under a comparable boundary. The formula allows multiple intentional attempts and multiple accepted outputs. One intentional generation is only a special case, not a guaranteed result.

EcoLogits estimates supported API inference impacts using models and infrastructure assumptions; it does not directly meter a closed provider or automatically cover a complete image/video workflow. CodeCarbon estimates emissions/energy for code running on accessible hardware from power estimates and carbon-intensity inputs; hardware coverage, geography, idle allocation, and measurement error matter. Neither proves this hypothesis by itself. Efficiency per output can fall while aggregate demand rises: measure total activity as well as intensity.

## Freshness

Data period, source publication, last successful source check, last material evidence change, retrieval, agent review, human review, and dashboard build are independent. Building the dashboard never refreshes underlying evidence. Scheduled research updates only prepare candidate metadata; they do not refresh the manually transcribed report values.
