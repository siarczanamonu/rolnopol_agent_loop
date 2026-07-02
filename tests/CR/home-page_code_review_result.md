# Code Review – HomePage E2E Tests

## Podsumowanie

Zakres recenzji: pliki `tests/page/HomePage.ts` oraz `tests/e2e/HomePage.spec.ts` dla strony głównej aplikacji Rolnopol (`localhost:3000`).

Ocena ogólna: kod jest czytelny, zgodny z konwencjami POM i używa semantycznych lokatorów. Po przeprowadzonych poprawkach wszystkie 14 testów przechodzi.

## ✅ Mocne strony

- Czysta struktura Page Object Model – logika nawigacji jest enkapsulowana w metodach `HomePage`, a testy operują na wysokim poziomie abstrakcji.
- Poprawne użycie semantycznych lokatorów `getByRole`, `getByByText` i `getByRole('heading')` zamiast kruczych selektorów CSS.
- Testy są poprawne językowo, nazwy opisują zachowanie biznesowe, a struktura Arrange-Act-Assert jest widoczna.
- Brak sztucznych `waitForTimeout()` – synchronizacja opiera się na auto-waiting Playwright oraz bezpośrednich asercjach `toHaveURL`.

## ⚠️ Uwagi / Ryzyka (High)

### 1. Wrażliwe asercje na dynamiczne dane w stopce

Lokalizacja: `tests/e2e/HomePage.spec.ts:146`

```ts
await expect(page.getByText('© 2026 Rolnopol v1.0.113. build by')).toBeVisible();
```

Test zakłada stały ciąg wersji. Jeśli numer builda lub rok się zmieni, test spadnie. Rozwiązanie: rozbić asercję na dwie części (np. sprawdzić fragment "© 2026 Rolnopol" oraz fragment "build by" osobno) lub użyć regexu tolerującego zmianę wersji.

### 2. Nieaktualny seed danych w Page Object

Lokalizacja: `tests/page/HomePage.ts:52-57`

```ts
this.statsCards = {
  activeUsers: page.getByText('318', { exact: true }),
  managedFarms: page.getByText('318', { exact: true }).last(),
  ...
};
```

Wartości liczbowe są zahardcodowane. Jeśli statystyki na stronie będą się zmieniać między wersjami, testy staną się niestabilne. Rozwiązanie: aserować na etykiety (`Active Users`, `Managed Farms`) i/lub użyć atrybutów `data-testid`, o ile są dostępne.

## 🛠️ Sugestie / Usprawnienia (Medium)

### 3. Nadmiar wywołania `goto()` w teście wejścia

Lokalizacja: `tests/e2e/HomePage.spec.ts:67`

W teście `powinna mieć działające przyciski Get Started i Sign In` wywołujemy `homePage.goto()` między kliknięciami, mimo że `beforeEach` już ustawia stronę. To nie jest błąd, ale lekki nadmiar. Można uprościć strukturę testu.

### 4. Brak weryfikacji istniejącej klasy .navbar-brand

Lokalizacja: `tests/page/HomePage.ts:38`

```ts
this.logoLink = page.locator('.navbar-brand');
```

Selektor CSS oparty o klasę jest akceptowalny, ale jeśli zmieni się framework CSS lub zostanie usunięta klasa, test ulegnie stłuczeniu. Alternatywnie można użyć `getByRole('link', { name: 'Rolnopol' })`, który jest bardziej semantyczny i odporne na zmiany stylów.

## 🟢 Rekomendacja

`approve` – po wdrożonych poprawkach selektorów stopki oraz wzorca URL, kod jest stabilny i zgodny z konwencjami. Sugestie w punkcie 1 i 2 warto wdrożyć jako kolejne kroki, ale nie blokująją obecnego stanu.

## Pliki objęte review

- `tests/page/HomePage.ts`
- `tests/e2e/HomePage.spec.ts`
