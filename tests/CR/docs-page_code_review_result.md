# Code Review – Strona Dokumentacji Rolnopol

**Data przeglądu:** 2026-07-11  
**Przeglądane pliki:**
- `tests/pages/DocsPage.ts` (Page Object)
- `tests/e2e/docs-page.spec.ts` (testy E2E)
- `test-plans/docs-page-test-plan.md` (plan testów)

**Cel:** Testy E2E dla strony dokumentacji (http://localhost:3000/docs.html) w wzorcu Page Object Model.

---

## Podsumowanie (High-level summary)

Implementacja dodaje 26 testów E2E pokrywających wczytanie strony, nawigację górną, baner, spis treści (sidebar), 10 sekcji dokumentacji, karty encji, karty ról, listy, konta demo, tabelę marketplace, nawigację kotwiczą, nawigację z menu górnego oraz stopkę. Page Object `DocsPage` hermetyzuje selektory i udostępnia metody wysokopoziomowe. Kod jest zgodny z konwencjami projektu (taby, TypeScript,Arrange-Act-Assert, `test.describe`). Wszystkie 26 testów przechodzi pomyślnie.

**Rekomendacja:** ✅ Zatwierdź z drobnymi poprawkami (request changes – niski priorytet)

---

## Ocena ryzyka (Risk assessment)

- **Poprawność:** Wysoka – testy weryfikują rzeczywiste elementy DOM.
- **Utrzymywalność:** Dobra – POM odseparowuje selektory; kilka metod jest zbyt długich lub redundantnych.
- **Stabilność:** Dobra – testy są deterministyczne (strona statyczna, brak networkidle).
- **Bezpieczeństwo:** Brak ryzyk – nie ma danych wrażliwych.

---

## Mocne strony (Strengths)

✅ Spójna struktura POM – metody akcji zaczynają się od `click*`, asercje od `expect*`, bez surowych selektorów w testach.  
✅ Użycie stabilnych selektorów `data-testid` dla linków sidebar i baneru (`docs-header`).  
✅ Pełne pokrycie scenariuszy z planu testów (26/26).  
✅ Czytelne grupowanie `test.describe` i polskie nazwy testów opisujące zachowanie.  
✅ Arrange-Act-Assert z komentarzami w testach z akcją.  
✅ Spójne z istniejącymi Page Objects (HomePage, AlertsPage) – `expectFooterVisible`, `clickContactLink`, `expectExternalLinkHref`.

---

## Uwagi i ryzyka (Concerns / risks)

⚠️ **`expectHashInUrl` (DocsPage.ts:185-188)** – wyrażenie `expectedHash.replace("#", "#")` jest pustą operacją (no-op). Kod sugeruje eskapowanie znaków regex, ale tego nie robi. Należy uprościć do `new RegExp(\`${expectedHash}$\`)` lub użyć `toHaveURL(\`${URLS.documentation}${expectedHash}\`)`.

⚠️ **`expectSectionInViewport` (DocsPage.ts:191-195)** – nazwa metody deklaruje weryfikację, że sekcja jest w viewport, ale implementacja wywołuje `toBeVisible()` + `isVisible()`, co sprawdza tylko widoczność DOM, nie pozycję w viewport. To redundantne i wprowadza w błąd. Należy użyć `toBeInViewport()` (Playwright ≥1.49) lub zmienić nazwę na `expectSectionVisible`.

⚠️ **Redundancja w `expectSectionInViewport`** – `toBeVisible()` (asercja) i `isVisible()` (boolean) sprawdzają to samo; drugie wywołanie jest zbędne.

⚠️ **`expectNavbarVisible` (DocsPage.ts:21-35)** – używa surowego selektora CSS `.navbar-brand`. Choć spójne z HomePage/AlertsPage, preferowane są lokatory oparte na rolach. Akceptowalne jako konwencja projektu.

⚠️ **Długa linia (DocsPage.ts:94)** – `const cards = this.page.locator("#entities .entity-card, #entities .entity-card-custom");` przekracza standardową szerokość. Należy zawinąć dla czytelności.

⚠️ **`expectRoleCardVisible` (DocsPage.ts:104-114)** – hardkoduje liczbę uprawnień (6). Lekko sprzęga test z danymi; akceptowalne, ale można sparametryzować.

---

## Sugestie ulepszeń (Suggestions / improvements)

### Krótkoterminowe (Short-term)

🛠️ **S1:** Uprość `expectHashInUrl`:
```ts
async expectHashInUrl(expectedHash: string): Promise<void> {
	await expect(this.page).toHaveURL(new RegExp(`${expectedHash}$`));
}
```

🛠️ **S2:** Zmień `expectSectionInViewport` na użycie `toBeInViewport()` i usuń redundancję:
```ts
async expectSectionInViewport(sectionId: string): Promise<void> {
	await expect(this.page.locator(`#${sectionId}`)).toBeInViewport();
}
```

🛠️ **S3:** Zawiń długą linię 94 dla czytelności:
```ts
const cards = this.page.locator(
	"#entities .entity-card, #entities .entity-card-custom",
);
```

### Długoterminowe (Long-term)

🛠️ Rozważ ekstrakcję współdzielonych metod (navbar, footer, linki zewnętrzne) do klasy bazowej `BasePage`, z której dziedziczyłyby HomePage, AlertsPage i DocsPage – eliminuje duplikację między page objectami. Poza zakresem bieżącego zadania.

---

## Checklist

| Kryterium | Status | Uwagi |
| --- | --- | --- |
| Poprawność | ✅ | Testy pokrywają DOM; 26/26 przechodzi |
| Edge cases | ✅ | Nawigacja kotwicza, stan pusty n/a |
| Utrzymywalność | ⚠️ | Dwie metody wymagają uproszczenia |
| Testy | ✅ | Deterministyczne, szybkie (<3s) |
| Bezpieczeństwo | ✅ | Brak sekretów/danych wrażliwych |
| Wydajność | ✅ | Brak pętli O(N²); strona statyczna |
| Styl/konwencje | ⚠️ | Jedna długa linia; reszta zgodna |
| Dokumentacja | ✅ | Plan testów kompletny i zaktualizowany |

---

## Rekomendacja końcowa

**Request changes (niski priorytet)** – zastosować S1, S2, S3 przed scalen. Pozostałe uwagi są opcjonalne. Po poprawkach kod jest gotowy do zatwierdzenia.