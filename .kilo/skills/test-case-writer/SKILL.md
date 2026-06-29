---
name: test-case-writer
description: Use when the user wants to create or update Playwright test cases before implementation. Produces structured Markdown test scenarios, coverage notes, assumptions, and acceptance criteria for one feature or flow.
allowed-tools: Bash(playwright-cli:*) Bash(npx:*) Bash(npm:*)
---

# Test Case Writer

Create Playwright-oriented test cases in Markdown before any automated test code is written.

## When to use

Use this skill when:
- The user asks to create test cases first.
- A new feature or user flow needs test coverage planning.
- Existing Playwright tests are missing a planning artifact.
- Test implementation should be based on explicit scenarios and acceptance criteria.

Do not write `.spec.ts` files in this step unless the user explicitly overrides the workflow.

## Goal

Produce a concise but implementation-ready test plan that can be consumed by a Playwright generator skill.

## Inputs to inspect

Review these sources when available:
- Product requirements, tickets, user stories, bug reports.
- Existing Playwright config, fixtures, auth helpers, and page objects.
- Existing test plans in `specs/`, `docs/qa/`, or `tests/`.
- Existing app behavior from source code or UI text.

If information is missing, state assumptions explicitly.

## Output location

Write the result to a Markdown file in one of these preferred locations:
- `specs/<feature-name>.md`
- `docs/qa/<feature-name>.md`

Prefer `specs/` unless the repository already uses another convention.

## Required output structure

Use this structure:

```md
# <Feature or flow name>

## Scope
- In scope:
- Out of scope:

## Assumptions
- ...

## Preconditions
- ...

## Test data
- ...

## Scenarios
### TC01 - <short title>
- Priority: High | Medium | Low
- Type: Happy path | Validation | Edge case | Negative | Regression
- Steps:
  1. ...
  2. ...
- Expected result:
  - ...

### TC02 - ...

## Coverage notes
- ...

## Automation notes
- Stable selectors to prefer:
- Network or async risks:
- Reusable setup opportunities:
```

## Writing rules

- Group cases by business flow.
- Prefer high-signal scenarios over exhaustive duplication.
- Include happy path, validation, negative path, and one realistic edge case when relevant.
- Mark scenarios that are bad automation candidates.
- Add notes about selectors, fixtures, mocking, auth, and setup reuse when discoverable.
- Keep wording deterministic and testable.
- Avoid vague expectations such as “works correctly”.

## Quality bar

Before finishing, verify:
- The plan is sufficient to implement Playwright tests without re-discovering the feature.
- Preconditions and expected results are concrete.
- The scenarios are not redundant.
- The file is readable by another agent with no extra context.

## Handoff

At the end of the file, add a short handoff section:

```md
## Handoff to automation
- Recommended file name: `<feature>.spec.ts`
- Suggested describe blocks:
- Suggested fixtures or helpers:
- Must-have assertions:
```

## Related skills

- **playwright-cli** - Use for browsing web pages to discover app behavior, UI elements, and selectors before writing test cases
- **playwright-test-writer** - Convert Markdown plans to Playwright tests
- **playwright-healer** - Fix failing or flaky tests
- **playwright-reviewer** - Review test quality after implementation
- **code-review** - General code review for quality and best practices
