---
name: playwright-delivery-loop-pl
description: Użyj, gdy użytkownik chce przeprowadzić pełny workflow Playwright w Kilo Code: najpierw przygotować przypadki testowe w Markdown, potem napisać test w TypeScript, poprawiać test aż będzie zielony, zrobić code review, wdrożyć poprawki po review i wykonać końcową walidację.
allowed-tools: Bash(playwright-cli:*) Bash(npx:*) Bash(npm:*)
---

# Playwright Delivery Loop PL

Ten skill orkiestruje pełny proces dostarczania testu Playwright od planu do finalnego uruchomienia.

## Kiedy używać

Użyj tego skilla, gdy:
- użytkownik chce jedną komendą przejść cały proces test automation,
- oczekiwany schemat pracy to: przypadki testowe -> implementacja testu -> naprawy aż do green -> code review -> poprawki po review -> finalny rerun,
- repozytorium używa Playwright albo wyraźnie zmierza w tym kierunku.

To jest skill orkiestrujący. Ma prowadzić proces etapami i delegować logikę do mniejszych skilli, zamiast robić wszystko w jednym niekontrolowanym przebiegu.

## Oczekiwane skille pomocnicze

Jeżeli są dostępne, korzystaj z nich w tej kolejności:
- `test-case-writer`
- `playwright-test-writer`
- `playwright-healer`
- `playwright-reviewer`

Jeżeli któregoś skilla brakuje, wykonaj dany etap według zasad z tego pliku i jawnie odnotuj fallback.

## Cel

Dostarczyć działający, zreviewowany i zwalidowany test Playwright wraz z artefaktem planowania oraz czytelną historią zmian.

## Reguły nadrzędne

- Nie pomijaj etapów.
- Nie zmieniaj kolejności etapów bez wyraźnej prośby użytkownika.
- Nie zaczynaj implementacji testu bez planu w Markdown.
- Nie kończ procesu bez końcowego uruchomienia po poprawkach z review.
- Preferuj konwencje repozytorium nad własne preferencje.
- Zachowuj intencję biznesową testu podczas każdej poprawki.
- Rób najmniejszą odpowiedzialną zmianę, która rozwiązuje problem.
- Każdy etap ma zostawić audytowalny ślad.

## Obowiązkowa kolejność faz

1. Planowanie
2. Implementacja
3. Pętla naprawcza
4. Review
5. Poprawki po review
6. Finalna walidacja

## Faza 1 - Planowanie

Cel: najpierw powstają przypadki testowe lub plan testów w Markdown.

### Działania

- Przeczytaj wymagania, ticket, opis flow, kod aplikacji oraz istniejące testy.
- Sprawdź istniejące fixtures, helpery, auth setup i strukturę testów.
- Utwórz lub zaktualizuj plan w `specs/` albo w istniejącej lokalizacji dokumentacji QA.
- Jeżeli istnieje `seed.spec.ts`, potraktuj go jako źródło kontekstu uruchomieniowego oraz przykład stylu testów. Planner i generator Playwright korzystają z seed testu jako wzorca i kontekstu środowiska. [web:11]

### Wymagania dla planu

Plan ma zawierać:
- zakres,
- założenia,
- preconditions,
- dane testowe,
- scenariusze,
- oczekiwane rezultaty,
- notatki automatyzacyjne,
- handoff do implementacji.

### Reguły planowania

- Uwzględnij happy path, walidację, negatywne ścieżki i sensowny edge case, jeśli mają wartość.
- Nie duplikuj scenariuszy o tej samej wartości.
- Oczekiwane rezultaty mają być mierzalne i testowalne.
- Nie używaj pustych sformułowań typu „powinno działać poprawnie”.
- Jeżeli czegoś brakuje, wpisz jawne założenia.

### Kryterium wyjścia

Nie przechodź dalej, dopóki:
- istnieje plan w Markdown,
- scenariusze są konkretne,
- da się na ich podstawie napisać test bez ponownego odkrywania funkcjonalności.

## Faza 2 - Implementacja

Cel: napisać test Playwright w TypeScript na podstawie planu.

### Działania

- Przeczytaj plan z `specs/`.
- Przeczytaj `playwright.config.*`, fixtures, auth setup, helpery, page objecty i istniejące testy.
- Utwórz lub zaktualizuj docelowy plik `.spec.ts` zgodnie z konwencją repo.
- Powiąż nazwy testów z nazwami przypadków testowych.

### Reguły implementacji

- Preferuj `getByRole`, `getByLabel` i inne semantyczne lokatory.
- Jeśli zespół używa `data-testid`, stosuj je konsekwentnie.
- Unikaj kruchych selektorów CSS opartych o strukturę DOM.
- Nie używaj `nth()` bez wyraźnego uzasadnienia.
- Nie używaj `waitForTimeout()` jako standardowego rozwiązania.
- Używaj fixtures i helperów zamiast kopiowania logowania lub setupu.
- Asercje mają potwierdzać efekt biznesowy, a nie wyłącznie widoczność elementu.
- Nie zostawiaj TODO, placeholderów ani pseudokodu.

### Dodatkowe zasady zespołowe

- Jeżeli setup powtarza się drugi raz, rozważ ekstrakcję do fixture lub helpera.
- Jeżeli test jest długi, rozbij logikę na czytelne sekcje, ale bez nadmiaru komentarzy.
- Nazwa `describe` ma odpowiadać flow biznesowemu.
- Nazwa `test` ma odpowiadać konkretnemu przypadkowi testowemu.

### Kryterium wyjścia

Nie przechodź dalej, dopóki:
- istnieje uruchamialny plik `.spec.ts`,
- implementacja odpowiada planowi,
- test nie zawiera oczywistych antywzorców.

## Faza 3 - Pętla naprawcza

Cel: doprowadzić test do stanu green albo jednoznacznie wykazać blokadę.

### Pętla działania

1. Uruchom tylko najwęższy sensowny scope, czyli pojedynczy test albo najmniejszy failing subset.
2. Zbierz dokładny błąd.
3. Ustal najbardziej prawdopodobną przyczynę źródłową.
4. Wprowadź najmniejszą odpowiedzialną poprawkę.
5. Uruchom ponownie dokładnie ten sam scope.
6. Powtarzaj do skutku albo do warunku stopu.

### Reguły napraw

- Po każdym heal uruchamiaj tylko najwęższy scope potrzebny do weryfikacji zmiany.
- Nie osłabiaj asercji tylko po to, by test przeszedł.
- Nie dodawaj ślepych retry bez zrozumienia problemu.
- Nie maskuj problemu `waitForTimeout()` jeśli istnieje lepszy mechanizm Playwright.
- Nie zmieniaj intencji testu bez jawnego powodu i odnotowania tego.
- Jeżeli problem leży w aplikacji, zgłoś to zamiast naginać test.

### Warunki stopu

Przerwij pętlę i zgłoś blokadę, gdy:
- problem wynika z defektu aplikacji,
- brakuje środowiska, danych lub uprawnień,
- plan i rzeczywiste zachowanie systemu są sprzeczne,
- wykonano 3 ukierunkowane iteracje bez realnego postępu.

### Kryterium wyjścia

- test jest green, albo
- blokada jest opisana precyzyjnie wraz z następnym krokiem.

## Faza 4 - Review

Cel: zrobić jakościowy code review działającego testu.

### Sprawdź obowiązkowo

- jakość lokatorów,
- siłę asercji,
- duplikację kroków i setupu,
- użycie fixtures i helperów,
- nazewnictwo,
- czytelność,
- ryzyko flaky testów,
- zgodność z konwencją repo,
- czy po review nie trzeba uprościć zbyt skomplikowanego testu.

### Model priorytetów

- Wysoki: ryzyko flaky, false positive, false negative, zła semantyka testu.
- Średni: problem maintainability albo czytelności, który warto poprawić teraz.
- Niski: kosmetyka, która nie zwiększa istotnie ryzyka.

### Reguły review

- Jeżeli test już jest dobry, napisz to wprost.
- Nie twórz sztucznych uwag tylko po to, by review coś znalazł.
- Koncentruj się na zmianach o wysokiej wartości.

## Faza 5 - Poprawki po review

Cel: wdrożyć zasadne poprawki z review bez zmiany intencji testu.

### Reguły wdrażania poprawek

- Najpierw popraw błędy wysokiego priorytetu.
- Potem wdrażaj średnie, jeśli dają realną wartość teraz.
- Niskie poprawki rób tylko wtedy, gdy są tanie i bezpieczne.
- Nie rób niepowiązanego refaktoru przy okazji.
- Po zmianach zachowaj mapowanie testu do planu.
- Po review nie ruszaj semantyki testu bez jawnego powodu.

### Kryterium wyjścia

- zaakceptowane uwagi z review są wdrożone,
- zakres testu i intencja biznesowa pozostały takie same.

## Faza 6 - Finalna walidacja

Cel: potwierdzić, że poprawki po review nie zepsuły testu.

### Działania

- Uruchom ponownie właściwy test lub najmniejszy dotknięty scope.
- Potwierdź, że test przechodzi.
- Zgłoś wynik końcowy.

### Kryterium wyjścia

- końcowy rerun jest green, albo
- dokładnie wiadomo, co zostało zepsute przez poprawki.

## Wymagany format odpowiedzi końcowej

Użyj tej struktury:

```md
## Podsumowanie dostarczenia
- Funkcja lub flow:
- Plik planu:
- Plik testu:
- Seed test:
- Status końcowy:

## Zrealizowane fazy
- Planowanie:
- Implementacja:
- Pętla naprawcza:
- Review:
- Poprawki po review:
- Finalna walidacja:

## Najważniejsze zmiany
1. ...
2. ...
3. ...

## Ryzyka i założenia
- ...

## Następny krok
- ...
```

## Zalecane konwencje projektowe

Jeżeli repo nie narzuca inaczej, preferuj:
- plan w `specs/<feature>.md`,
- seed test w `tests/seed.spec.ts`,
- test docelowy w `tests/<feature>.spec.ts`.

Playwright dokumentuje, że planner tworzy plan w Markdown, generator przekształca ten plan w testy, a healer naprawia failing testy; całość może działać sekwencyjnie albo w agentic loop. [web:11]

## Przykładowy styl polecenia użytkownika

- „Przygotuj przypadki testowe dla resetu hasła, napisz test w Playwright, poprawiaj go aż przejdzie, zrób review, wdroż poprawki i uruchom test końcowo jeszcze raz.”
- „Uruchom pełny workflow dla checkout jako gość z użyciem seed testu `tests/seed.spec.ts`.”

## Standard końcowy

Proces uznaj za wykonany poprawnie tylko wtedy, gdy powstanie:
- plan w Markdown,
- test Playwright,
- wynik green albo precyzyjnie opisana blokada,
- review z realnymi wnioskami lub jasnym brakiem uwag,
- końcowy rerun po poprawkach.

## Related skills

- **playwright-cli** - Używaj do przeglądania stron internetowych w trakcie testowania: odkrywanie zachowań aplikacji, elementów UI, selektorów oraz debugowanie
- **test-case-writer** - Tworzenie przypadków testowych w Markdown przed implementacją
- **playwright-test-writer** - Konwersja planów Markdown na testy Playwright
- **playwright-healer** - Naprawa failing lub flaky testów
- **playwright-reviewer** - Code review dla jakości testów
- **code-review** - Ogólny code review dla jakości kodu
