---
name: playwright-test-writer
description: Use when a Markdown test plan already exists and the user wants a Playwright test implementation in TypeScript. Converts planned scenarios into maintainable Playwright specs using the project's fixtures, conventions, and stable locators.
allowed-tools: Bash(playwright-cli:*) Bash(npx:*) Bash(npm:*)
---

# Playwright Test Writer

Generate Playwright test code from an existing Markdown plan.

## When to use

Use this skill when:
- A plan file already exists in `specs/` or equivalent.
- The user wants a `.spec.ts` implementation.
- A repo has Playwright configured and needs new tests aligned with local conventions.

Do not skip the planning artifact unless the user explicitly tells you to.

## Goal

Create maintainable, readable, and deterministic Playwright tests in TypeScript.

## Inputs to inspect

Review, in this order when available:
1. The Markdown plan file.
2. `playwright.config.*`
3. Existing tests in `tests/`, `e2e/`, or `playwright/`
4. Shared fixtures, auth setup, test data builders, page objects, utilities.
5. Existing selector strategy in the project.

Mirror repository conventions instead of inventing a new style.

## Output location

Write the test in the repository's existing test location. Prefer the convention already present.

Examples:
- `tests/<feature>.spec.ts`
- `e2e/<feature>.spec.ts`

## Implementation rules

- Implement only scenarios that are clearly in scope from the plan.
- Use `test.describe()` to group by business flow.
- Use reusable setup through fixtures or helpers when repeated setup appears more than once.
- Prefer semantic locators: `getByRole`, `getByLabel`, `getByText` with care, or project-approved test ids.
- Avoid brittle selectors, arbitrary `waitForTimeout`, and overuse of `nth()`.
- Use assertions for business outcomes, not only visibility checks.
- Keep each test independent unless the suite convention explicitly uses serial dependencies.
- Reuse existing auth/session mechanisms.
- Add minimal comments only where the intent is not obvious.

## Required workflow

1. Read the plan.
2. Inspect project conventions.
3. Create the spec file.
4. Ensure names map clearly from test cases to test titles.
5. Leave no placeholder TODOs.

## Test writing checklist

For every scenario, ensure:
- Clear title derived from the test case.
- Stable setup.
- Action steps reflect the plan.
- Assertions verify the expected result.
- Cleanup is handled implicitly or via fixtures.

## Output expectations

Produce code that:
- Compiles in the current repository style.
- Uses existing imports and helpers where possible.
- Is ready to run without manual rewrites.

## Final note to include in response

## Related skills

- **playwright-cli** - Use for browsing web pages to discover app behavior, UI elements, and selectors when test details are unclear
- **test-case-writer** - Create test cases in Markdown before implementation
- **playwright-healer** - Fix failing or flaky tests
- **playwright-reviewer** - Review test quality after implementation
- **code-review** - General code review for quality and best practices

## Summary

- Which plan file was used.
- Which spec file was created.
- Any assumptions or missing app details that may affect execution.
