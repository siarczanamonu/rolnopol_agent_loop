# Kilo Code + Playwright skills bundle

Ten pakiet zawiera gotowe skille do workflow Playwright w Kilo Code.

## Struktura docelowa repo

```text
.kilo/
└── skills/
    ├── code-review/
    │   └── SKILL.md
    ├── test-case-writer/
    │   └── SKILL.md
    ├── playwright-test-writer/
    │   └── SKILL.md
    ├── playwright-healer/
    │   └── SKILL.md
    ├── playwright-reviewer/
    │   └── SKILL.md
    ├── playwright-delivery-loop/
    │   └── SKILL.md
    ├── playwright-delivery-loop-pl/
    │   └── SKILL.md
    └── playwright-project-conventions-pl/
        └── SKILL.md
```

## Opis skilli

- `code-review` – wspomaga przegląd kodu pod kątem jakości, zgodności z konwencjami i potencjalnych ulepszeń.
- `test-case-writer` – tworzy przypadki testowe w formacie Markdown przed implementacją.
- `playwright-test-writer` – implementuje testy Playwright w TypeScript na podstawie planu testów.
- `playwright-healer` – naprawia istniejące, ale nieprzechodzące lub niestabilne testy Playwright.
- `playwright-reviewer` – przeprowadza code review gotowych specyfikacji Playwright.
- `playwright-delivery-loop` – ogólny workflow Playwright od planu po wdrożenie.
- `playwright-delivery-loop-pl` – polski, bardziej restrykcyjny wariant workflow Playwright.
- `playwright-project-conventions-pl` – wspólne źródło zasad projektu dla testów Playwright.

## Rekomendowany sposób użycia

1. Skopiuj katalog `.kilo/` do repozytorium.
2. Uzupełnij `playwright-project-conventions-pl/SKILL.md` o lokalne komendy i zasady.
3. Jeśli używasz agentów Playwright, dodaj lub utrzymuj `tests/seed.spec.ts`.
4. Rozpocznij nową sesję w Kilo Code po dodaniu lub zmianie skilli.
5. Wywołuj głównie `playwright-delivery-loop-pl`, a pozostałe skille traktuj jako wyspecjalizowane moduły.

## Uwagi

- Angielski `playwright-delivery-loop` może zostać jako wariant bardziej ogólny.
- Polski `playwright-delivery-loop-pl` jest bardziej restrykcyjny i lepiej nadaje się do codziennej pracy zespołowej.
- `playwright-project-conventions-pl` powinien być traktowany jako wspólne źródło zasad dla całego procesu.
