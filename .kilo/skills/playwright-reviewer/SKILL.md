---
name: playwright-reviewer
description: Use when a Playwright spec already works and needs code review. Reviews test quality for readability, maintainability, locator stability, assertion strength, fixture usage, duplication, and flakiness risk, then proposes or applies focused improvements.
allowed-tools: Bash(playwright-cli:*) Bash(npx:*) Bash(npm:*)
---

# Playwright Reviewer

Review working Playwright tests and improve quality without changing intent.

## When to use

Use this skill when:
- A Playwright test already passes.
- The workflow requires code review after implementation and healing.
- The user wants maintainability and flake-risk improvements.

This is not the first implementation step. Run it after the test is green.

## Goal

Raise test quality while preserving behavior and coverage.

## Review checklist

Review the spec for:
- Locator quality: prefer semantic and stable selectors.
- Assertion quality: check meaningful business verification.
- Duplication: repeated setup, repeated steps, repeated expectations.
- Fixture usage: move reusable setup into fixtures or helpers where appropriate.
- Naming: clear `describe` and `test` titles.
- Readability: unnecessary noise, overly long tests, confusing structure.
- Flakiness risk: timing assumptions, race conditions, dynamic UI hazards.
- Project consistency: imports, style, conventions, page object usage.

## Severity model

Classify findings as:
- High: likely flakiness, false positives, false negatives, or wrong behavior.
- Medium: maintainability or readability problem worth fixing now.
- Low: polish or optional cleanup.

## Review output format

Use this structure in the response:

```md
## Review summary
- Overall quality:
- Blocking issues:

## Findings
### High
- ...

### Medium
- ...

### Low
- ...

## Recommended fixes
1. ...
2. ...

## Applied changes
- ...
```

## Rules for applying fixes

- Preserve test intent.
- Prefer small, high-value edits.
- Do not rewrite the whole file unless the current structure is genuinely harmful.
- Re-run the relevant test after meaningful review changes when possible.
- If no meaningful issues exist, say so explicitly.

## Preferred improvements

Common high-value improvements include:
- Replacing brittle selectors.
- Strengthening weak assertions.
- Extracting repeated setup.
- Reducing duplicated steps.
- Making test titles map back to planned scenarios.
- Removing dead code and redundant comments.

## Final standard

A reviewed test should be:
- Green.
- Easy to understand.
- Consistent with repository style.
- Resistant to obvious UI changes and timing noise.

## Related skills

- **playwright-cli** - Use for browsing web pages to understand test context and UI behavior during review
- **test-case-writer** - Create test cases in Markdown before implementation
- **playwright-test-writer** - Convert Markdown plans to Playwright tests
- **playwright-healer** - Fix failing or flaky tests
- **code-review** - General code review for quality and best practices
