---
name: playwright-healer
description: Use when a Playwright test exists but is failing or flaky. Runs the target test, analyzes the failure, applies focused fixes, and repeats until the test passes or a defined stop condition is reached.
allowed-tools: Bash(playwright-cli:*) Bash(npx:*) Bash(npm:*)
---

# Playwright Healer

Repair failing Playwright tests through controlled iteration.

## When to use

Use this skill when:
- A generated or existing Playwright test fails.
- A selector, assertion, timing issue, or setup problem needs repair.
- The user wants an iterative fix-until-green workflow.

Do not use this skill to perform broad refactors unrelated to the failing behavior.

## Goal

Make the target Playwright test pass with the smallest responsible change.

## Inputs to inspect

Review:
- The failing spec file.
- The original Markdown plan if available.
- Playwright config, fixtures, auth setup, helpers.
- Test output, stack trace, trace viewer hints, screenshots, and error logs if available.

## Iteration loop

Follow this loop strictly:
1. Run only the relevant test or smallest failing subset.
2. Capture the exact failure.
3. Identify the most likely root cause.
4. Apply a focused fix.
5. Re-run the same test.
6. Repeat until green or stop condition is met.

## Allowed fix categories

- Locator improvement.
- Assertion correction when the expectation is wrong.
- Wait strategy improvement using Playwright-native waiting.
- Test data/setup correction.
- Fixture or helper adjustment when the failure is caused there.
- Small structural cleanup required to stabilize the test.

## Disallowed behavior

- No blind retries with no code change.
- No `waitForTimeout()` unless the repo explicitly accepts it and no better option exists.
- No weakening assertions just to get green.
- No changing business intent without stating it explicitly.
- No unrelated refactors while healing.

## Stop conditions

Stop and report clearly when any of these happen:
- The failure is caused by an app defect rather than the test.
- Required test data or environment is unavailable.
- More than 3 focused fix iterations were attempted with no credible progress.
- The expected behavior in code conflicts with the planned behavior.

## Required reporting format

After each healing session, report:
- Target test file and test name.
- Root cause.
- Changes applied.
- Final status: passed | still failing | blocked.
- If blocked, exact next action needed.

## Quality bar

A healed test should be:
- Green for the target scenario.
- No more brittle than before.
- Still aligned with the original intent.
- Readable enough for future maintenance.

## Related skills

- **playwright-cli** - Use for debugging and browsing web pages to understand test failures
- **test-case-writer** - Create test cases in Markdown before implementation
- **playwright-test-writer** - Convert Markdown plans to Playwright tests
- **playwright-reviewer** - Review test quality after implementation
- **code-review** - General code review for quality and best practices
