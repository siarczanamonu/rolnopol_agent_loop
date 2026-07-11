# Code Review – Testy strony Alertów (alerts.html)

**Data:** 2026-07-11  
**Recenzowane pliki:**
- `tests/pages/AlertsPage.ts`
- `tests/e2e/alerts-page.spec.ts`
- `test-plans/alerts-page-test-plan.md`

**Cel:** Kompleksowe testy E2E dla strony alertów Rolnopol (filtry, sekcje, nawigacja, stopka).

---

## Podsumowanie

Implementacja obejmuje 29 testów E2E w strukturze Page Object Model, pokrywających wczytanie strony, nawigację, baner, filtry (wyszukiwarka, nasilenie, region), sekcje alertów, karty alertów, kombinacje filtrów, odświeżanie oraz stopkę. Testy są deterministyczne i odporne na zmiany danych czasowych (liczby alertów zależne od daty serwera). Całość przechodzi (29/29).

## Ocena: `request changes` (drobne poprawki)

---

## ✅ Mocne strony

- **Struktura POM zgodna z konwencją** – `AlertsPage` ukrywa selektory za metodami wysokopoziomowymi, asercje w page object (spójne z `HomePage`).
- **Testy niezależne od danych czasowych** – testy filtrów sprawdzają spójność liczników i zachowanie, a nie konkretne wartości, co zapobiega flakiness.
- **Wyraźny układ Arrange–Act–Assert** w testach z komentarzami sekcji.
- **Spójność z `HomePage`** – te same wzorce (`expectNavbarVisible`, `expectFooterVisible`, `clickContactLink`, `expectExternalLinkHref`).
- **Odporność na asynchroniczność** – `goto` czeka na `#todayCount`, a akcje filtrów wywołują `waitForCountsStable`.

---

## ⚠️ Kwestie / ryzyka

1. **Martwy kod w `AlertsPage.ts`** (`getTodayAlertCardsCount`, `getTodayAlertTitles` – linie 81–92) – metody zdefiniowane, ale nieużywane w testach (po refaktoryzacji na testy niezależne od danych). Narusza zasadę YAGNI i zwiększa powierzchnię utrzymania.
2. **`waitForCountsStable` (`AlertsPage.ts:188`)** – używa `waitForLoadState("domcontentloaded")`, co nie gwarantuje stabilności dla dynamicznych aktualizacji DOM przez JS (filtry aktualizują listy bez przeładowania). Testy przechodzą, ale mechanizm jest słaby i może zawodzić przy wolniejszym środowisku.
3. **`expectBannerVisible` (`AlertsPage.ts:39`)** – używa selektora CSS `header.header`, podczas gdy `HomePage` preferuje role-based lokatory (`getByRole`). Rozbieżność stylu selektorów między page objectami.
4. **Test "filtr High" (`alerts-page.spec.ts:120`)** – pętla `for` nie wykonuje asercji, gdy brak kart high. Test przechodzi poprawnie, ale nie weryfikuje, czy jakikolwiek alert high istnieje (słaba asercja).
5. **`clickContactLink` (`AlertsPage.ts:220`)** – używa `name: "Contact us"`, podczas gdy `HomePage.clickContactLink` używa `name: "Contact"`. Niespójność nazw akcesorów między page objectami dla tego samego linku.

---

## 🛠️ Sugestie / ulepszenia

1. **Usunąć nieużywane metody** `getTodayAlertCardsCount` i `getTodayAlertTitles` z `AlertsPage` (zmniejszenie powierzchni utrzymania).
2. **Wzmocnić `waitForCountsStable`** – zastąpić `domcontentloaded` oczekiwaniem na stabilność licznika (np. `await expect(this.page.locator("#todayCount")).toHaveText(/\d/)`), co lepiej odzwierciedla gotowość danych.
3. **Spójność selektora baneru** – rozważyć `getByRole("banner")` w `expectBannerVisible` dla spójności z podejściem role-based w `HomePage`.
4. **Test "filtr High"** – dodać warunek: jeśli `visibleSeverities.length === 0`, pominąć lub oznaczyć test jako `test.skip` z wyjaśnieniem, że brak danych high w bieżącym zestawie.
5. **Spójność `clickContactLink`** – ujednolicić nazwę (`"Contact us"`) w obu page objectach, ew. użyć `exact: false` (domyślne), by dopasować oba warianty.

---

## Krótkoterminowe poprawki (do wdrożenia)

- Usunięcie martwego kodu (pkt 1).
- Wzmocnienie `waitForCountsStable` (pkt 2).
- Spójność selektora baneru (pkt 3).

## Długoterminowe rozważenia

- Wprowadzenie helpera `waitForCount(locator, regex)` w `tests/helpers/` dla spójnego oczekiwania na dynamiczne liczniki we wszystkich page objectach.
- Parametryzacja nazw regionów (wartości `PL-xx`) zamiast etykiet lokalizowanych, aby uniknąć zależności od języka UI.

---

## Lista zmienionych plików

- `tests/pages/AlertsPage.ts` (nowy, 231 linii)
- `tests/e2e/alerts-page.spec.ts` (nowy, 273 linii)
- `test-plans/alerts-page-test-plan.md` (nowy plan testów)

## Podsumowanie statusu

Testy: 29/29 przechodzi. Kod czytelny i spójny z konwencją repo. Lint (biome) czysty.

## Zastosowane poprawki (Etap 5)

1. ✅ Usunięto martwy kod (`getTodayAlertCardsCount`, `getTodayAlertTitles`) z `AlertsPage`.
2. ✅ Wzmocniono `waitForCountsStable` – oczekuje na `networkidle` i widoczność licznika.
3. ✅ Spójność baneru – zmieniono selektor na `getByRole("banner")` (role-based).
4. ✅ Test "filtr High" – dodano `test.skip`, gdy brak alertów high w bieżącym zestawie.
5. ✅ Usunięto nieużywaną zmienną `beforeTotal` w teście regionu (lint).
6. ✅ Formatowanie biome – auto-fix zastosowany.
7. ✅ Dodano asercje `length > 0` przed dostępem do `[0]` we wszystkich testach zależnych od danych.
8. ✅ Test refresh – dodano `waitFor` na pierwszą kartę z timeoutem 10s dla stabilności.