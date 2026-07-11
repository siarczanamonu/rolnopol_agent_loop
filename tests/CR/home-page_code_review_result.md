# Code Review – Testy E2E strony głównej Rolnopol

**Data:** 2026-07-11  
**Gałąź/feature:** home-page  
**Pliki poddane audytowi:**
- `tests/config/urls.ts`
- `tests/pages/HomePage.ts`
- `tests/e2e/home-page.spec.ts`
- `test-plans/home-page-test-plan.md`

## Podsumowanie

Implementacja testów E2E dla strony głównej aplikacji Rolnopol z wykorzystaniem wzorca Page Object Model. Testy pokrywają wczytywanie strony, nawigację górną, sekcję hero, karty statystyk, przyciski CTA, stopkę oraz linki zewnętrzne. Kod jest spójny, czytelny i poprawny funkcjonalnie – wszystkie 18 testów przechodzi pomyślnie.

## ✅ Mocne strony

- Prawidłowe zastosowanie wzorca POM – logika strony oddzielona od testów (`HomePage.ts`).
- Centralna konfiguracja URL w `tests/config/urls.ts` – łatwa w utrzymaniu.
- Testy pogrupowane w logiczne bloki `test.describe` (wczytanie, nawigacja, CTA, stopka).
- Czytelne nazewnictwo metod i testów w języku polskim.
- Linki zewnętrzne weryfikowane przez atrybut `href` bez opuszczania aplikacji – dobra praktyka.
- Użycie selektorów roli (`getByRole`) zamiast kruchych selektorów CSS tam, gdzie to możliwe.
- Zgodność z konfiguracją Biome (taby, podwójne cudzysłowy).

## ⚠️ Uwagi i ryzyka

1. **Selektor `.navbar-brand` (HomePage.ts:21)** – używa selektora CSS zamiast roli. Choć stabilny dla tej aplikacji, jest mniej semantyczny niż `getByRole`. Akceptowalne, ponieważ logo zawiera ikonę powodującą konflikt z `exact: true` w `getByRole`.

2. **Selektor `getByText("© 2026 Rolnopol")` (HomePage.ts:77)** – test zakłada konkretny rok (2026) w tekście copyright. Jeśli rok się zmieni w przyszłości (np. 2027), test przestanie działać. Rozważyć użycie regexu `© \d{4} Rolnopol`.

3. **`expectExternalLinkHref` z parametrem `exact` (HomePage.ts:116)** – domyślna wartość `false` jest poprawna, ale semantyka parametru może być niejasna bez dokumentacji. Dodać komentarz opisujący parametr lub rozważyć rozdzielenie na dwie metody.

4. **Globalna zmienna `homePage` (home-page.spec.ts:5)** – zmienna modułowa współdzielona między testami. W środowisku równoległym Playwright każdy worker ma osobny kontekst, ale w przypadku jednego workera i wielu testów sekwencyjnych jest to akceptowalne. Alternatywa: tworzenie instancji w każdym teście osobno.

5. **`parseCountValue` (HomePage.ts:59-67)** – funkcja poprawnie obsługuje formaty liczbowe ("318", "5,9K ha" itd.), ale regex `(\d[\d\s.,]*)` jest zachłanny i może przechwycić nieoczekiwane fragmenty tekstu. Dla aktualnych danych działa poprawnie.

6. **Brak weryfikacji URL z `toHaveURL` w `expectPageLoaded`** – metoda sprawdza tytuł i URL, ale test nawigacyjny Home (4.3) nie używa `expectPageLoaded` po kliknięciu, tylko samego `toHaveURL`. Rozważyć dodanie asercji tytułu po nawigacji powrotnej.

## 🛠️ Sugestie ulepszeń (krótkoterminowe)

1. Zastąpić `getByText("© 2026 Rolnopol")` regexem odpornym na zmianę roku.
2. Rozważyć dodanie JSDoc do metody `expectExternalLinkHref` opisującej parametr `exact`.
3. Dodać test weryfikujący, że statystyki mają poprawne etykiety opisowe (aria-label) – zwiększy to pokrycie dostępności.

## 🛠️ Sugestie ulepszeń (długoterminowe)

1. Rozważyć wyodrębnienie wspólnej klasy bazowej `BasePage` z metodą `goto` i asercjami wspólnymi dla wszystkich stron.
2. Rozważyć dodanie fixture Playwright (`test.extend`) zamiast globalnej zmiennej `homePage` dla lepszej izolacji.
3. Rozważyć dodanie testów responsywności (mobile viewport) dla strony głównej.

## Rekomendacja

**Zatwierdź z drobnymi poprawkami** – kod jest poprawny i stabilny. Zalecam wdrożenie sugestii krótkoterminowych nr 1 (regex copyright) i nr 2 (JSDoc) przed ostatecznym scaleniem.