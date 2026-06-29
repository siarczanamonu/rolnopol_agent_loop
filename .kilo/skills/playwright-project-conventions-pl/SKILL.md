---
name: playwright-project-conventions-pl
description: Użyj, gdy trzeba zastosować lokalne zasady projektu dla testów Playwright w Kilo Code. Ten skill opisuje konwencje repozytorium: ścieżki, nazewnictwo, fixtures, auth setup, selektory, retry policy, uruchamianie testów i reguły jakości.
---

# Playwright Project Conventions PL

Ten skill przechowuje lokalne standardy projektu dla testów Playwright i ma być używany jako kontekst pomocniczy dla planowania, implementacji, healingu i review.

## Kiedy używać

Użyj tego skilla, gdy:
- agent ma pisać lub poprawiać testy Playwright w tym repozytorium,
- trzeba narzucić lokalne reguły nazewnictwa i struktury,
- workflow korzysta z innych skilli, ale potrzebuje wspólnego źródła zasad projektowych.

## Cel

Zapewnić spójność wszystkich testów Playwright w projekcie bez powtarzania tych samych instrukcji w każdym skillu.

## Jak korzystać z tego skilla

- Traktuj ten plik jako źródło prawdy dla konwencji projektowych.
- Jeżeli lokalny kod repozytorium mówi inaczej niż ten plik, priorytet ma rzeczywista konwencja istniejącego kodu.
- Jeżeli ten plik jest nieuzupełniony, agent ma wykryć konwencję z repo i zaproponować aktualizację tego skilla.

## Struktura katalogów

Jeżeli repo nie narzuca inaczej, preferuj:
- `tests/` dla testów Playwright,
- `tests/seed.spec.ts` jako seed test dla agentów Playwright,
- `tests/fixtures/` dla fixtures,
- `tests/helpers/` dla helperów,
- `tests/page-objects/` dla page objectów, jeśli projekt ich używa,
- `specs/` dla planów testów w Markdown.

## Nazewnictwo plików

- Plany testów: `specs/<feature>.md`
- Testy Playwright: `tests/<feature>.spec.ts`
- Helpery: `tests/helpers/<area>.ts`
- Fixtures: `tests/fixtures/<fixture-name>.ts`
- Page objecty: `tests/page-objects/<page>.ts`

Nazwy plików powinny być krótkie, w kebab-case i odzwierciedlać flow biznesowy, nie nazwę taska w Jirze.

## Nazewnictwo w kodzie

- `describe()` ma opisywać flow lub moduł biznesowy.
- `test()` ma opisywać konkretny przypadek testowy i oczekiwany rezultat.
- Helpery nazywaj czasownikami, np. `loginAsUser`, `completeCheckout`, `openProfileSettings`.
- Nazwy zmiennych mają opisywać intencję, nie technikę.

## Seed test

Jeżeli istnieje `seed.spec.ts`, traktuj go jako wzorzec stylu, setupu i dostępnych fixtures. Playwright dokumentuje, że planner i generator mogą używać seed testu jako przykładu generowanych testów lub jako wskazanego pliku referencyjnego w promptcie. [web:11]

## Lokatory

Preferowana kolejność:
1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()` lub `getByText()` tylko gdy mają sens semantyczny
4. `getByTestId()` jeśli projekt opiera się na `data-testid`

Reguły:
- Unikaj selektorów opartych o strukturę DOM.
- Unikaj długich CSS selectorów.
- Nie używaj `nth()` bez komentarza albo wyraźnego powodu.
- Jeżeli lokator jest niestabilny, zaproponuj lepszy kontrakt selektorów zamiast obchodzić problem.

## Asercje

- Asercja ma potwierdzać efekt biznesowy.
- Nie ograniczaj testu do `toBeVisible()` jeśli można zweryfikować komunikat, stan, URL, request, zapis danych albo zmianę UI.
- Unikaj nadmiarowych asercji, które nie zwiększają wiarygodności testu.
- Jeżeli test ma jeden główny cel, asercje poboczne nie mogą zaciemniać intencji.

## Fixtures i setup

- Gdy setup powtarza się więcej niż raz, wynieś go do fixture lub helpera.
- Nie kopiuj logowania między testami, jeśli projekt ma wspólny mechanizm auth.
- Korzystaj z istniejących fixture zanim dodasz nowe.
- Nie twórz page objectów dla pojedynczej, trywialnej interakcji, jeśli projekt ich realnie nie używa.

## Auth i dane testowe

- Preferuj istniejący auth setup projektu, masz je w pliku `auth.json` 
- Nie hardcoduj wrażliwych danych.
- Dane testowe powinny być jawne i lokalne dla scenariusza albo budowane helperem.
- Jeżeli środowisko wymaga specjalnych kont, odnotuj to w planie i w odpowiedzi końcowej.
- Do generowania danych testowych używaj faker lub innego narzędzia, które projekt już stosuje.

## Waiting strategy

- Preferuj natywne mechanizmy Playwright: oczekiwanie na stan elementu, URL, request, response, load state.
- `waitForTimeout()` traktuj jako ostateczność i wymagaj uzasadnienia.
- Nie dodawaj sztucznych opóźnień, żeby ukryć problem z synchronizacją.

## Retry policy

- Nie dodawaj retry na poziomie testu bez wyraźnej potrzeby.
- Retry nie może maskować flaky logiki.
- Najpierw napraw przyczynę niestabilności, dopiero potem rozważ retry, jeśli projekt i CI tego wymagają.

## Healing workflow

Podczas napraw:
- uruchamiaj najwęższy możliwy scope,
- zapisuj przyczynę źródłową,
- rób najmniejszą odpowiedzialną poprawkę,
- nie osłabiaj asercji bez powodu,
- po 3 iteracjach bez postępu zgłaszaj blokadę.

## Code review

W review sprawdzaj obowiązkowo:
- stabilność lokatorów,
- sensowność asercji,
- czytelność,
- duplikację,
- użycie fixtures,
- zgodność z konwencją repo,
- ryzyko flaky testów.

Priorytety:
- Wysoki: realne ryzyko błędnego testu lub niestabilności.
- Średni: maintainability i czytelność.
- Niski: kosmetyka.

## Uruchamianie testów

Jeżeli repo nie definiuje inaczej, preferuj:
- pojedynczy test podczas napraw,
- minimalny subset podczas walidacji zmiany,
- pełniejszy scope dopiero na końcu, jeśli jest potrzebny.

Najpierw weryfikuj zmianę lokalnie na najmniejszym zakresie, potem rozszerzaj uruchomienie tylko wtedy, gdy ma to uzasadnienie.

## Antywzorce

Nie rób tego:
- nie pisz testów bez planu, jeśli workflow wymaga planu,
- nie duplikuj logowania i setupu,
- nie używaj przypadkowych selectorów CSS,
- nie maskuj problemów timeoutami,
- nie zmieniaj semantyki testu po review bez jawnego powodu,
- nie zostawiaj TODO w gotowym teście,
- nie dodawaj page objectów tylko dlatego, że „tak wypada”.

## Co warto uzupełnić ręcznie dla konkretnego repo

Uzupełnij poniższe pola po wdrożeniu skilla:

```md
## Lokalne ustawienia projektu
- Główna ścieżka testów:
- Główna komenda uruchomienia testu:
- Komenda uruchomienia pojedynczego testu:
- Konwencja fixtures:
- Konwencja auth setup:
- Czy używamy data-testid:
- Czy używamy page objectów:
- Czy CI ma retry:
- Najczęstsze flaky obszary:
```

## Zastosowanie w innych skillach

Ten skill powinien być używany jako kontekst pomocniczy przez:
- `test-case-writer`
- `playwright-test-writer`
- `playwright-healer`
- `playwright-reviewer`
- `playwright-delivery-loop-pl`

## Podstawa narzędziowa

- używaj playwright-cli do przegladania stron www i aplikacji webowych.
- zainstalowałem faker do generowania danych testowych.