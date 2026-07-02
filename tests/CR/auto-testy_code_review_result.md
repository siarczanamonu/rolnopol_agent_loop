# Code Review - testy strony logowania Rolnopol

**Gałąź:** auto-testy  
**Przejrzane pliki:** `tests/page/LoginPage.ts`, `tests/e2e/Login.spec.ts`, `tests/config/urls.ts`, `test-plans/login.md`  
**Data:** 2026-07-02  

---

## Podsumowanie

Zaimplementowano pełny zestaw testów E2E dla strony logowania (`/login.html`) w modelu Page Object Model. Testy obejmują ładowanie strony, nawigację, formularz logowania, linki pomocnicze, stopkę oraz responsywność. Wszystkie 13 testów przechodzi.

---

## ✅ Mocne strony

- POM (`LoginPage.ts`) jest spójny z istniejącym wzorcem z `HomePage.ts` (takie same typy, struktura, nazewnictwo).
- Testy używają wyłącznie Page Objectu — brak surowych lokatorów w pliku `.spec.ts`.
- Adresy URL skonfigurowane w jednym miejscu (`tests/config/urls.ts`).
- Nazwy testów są opisowe i mają zwięzłą strukturę Arrange-Act-Assert.
- Dodano oznaczenie wymaganego atrybutu pól formularza, co ma wartość jako test strukturalny.

---

## ⚠️ Obawy i ryzyka

1. **Słaba weryfikacja logiki formularza logowania**
   - Testy wysyłania pustego formularza (`login('', '')`) i nieprawidłowego emaila weryfikują tylko URL strony po `click()` na przycisku Login. Jeśli formularz ma JS walidację lub wyświetla komunikaty, te testy ich nie sprawdzają.
   - **Ryzyko:** Regres w walidacji po stronie klienta nie zostanie wykryta.

2. **Duplikacja lokatorów stopki między `LoginPage.ts` a `HomePage.ts`**
   - Oba pliki definiują te same lokatory stopki. Przy dodaniu kolejnych stron duplikacja się pogłębi.
   - **Ryzyko:** Utrzymanie stanie się trudniejsze.

3. **Niejasności w planie testów (`test-plans/login.md`)**
   - Scenariusz 7 był oznaczony jako zaimplementowany, ale kod testu dot. nie istnieje. Zastąpiono go testem atrybutu `required`, ale w planie nie odzwierciedlono tej zmiany w sposób jasny (scenariusz 7 zmienił tytuł/opis, ale numeracja została zachowana).

4. **Brak weryfikacji `type` pól formularza**
   - Pole Email może mieć `type="text"` zamiast `type="email"`. Test nie weryfikuje semantyki, co jest istotne dla dostępności i walidacji na urządzeniach mobilnych.

5. **Test responsywności sprawdza tylko widoczność, nie interakcję**
   - Po zmianie rozmiaru widoku sprawdzane jest czy pola i nagłówek są widoczne, ale nie czy przycisk `Login` można kliknąć bez przesunięcia widoku.

---

## 🛠️ Sugestie i propozycje poprawki

### Krótkoterminowe

1. **Wymaga weryfikacji przez UAT** — Jeśli aplikacja ma backendowe logowanie, należy dodać testy z poprawnymi danymi (jeśli bezpieczne), aby zweryfikować pełny przepływ.
2. **Ujednolic lokatory stopki** — Wyciągnij wspólny moduł `SharedComponents.ts` w `tests/page/` i wykorzystaj go w `LoginPage` oraz `HomePage`.
3. **Aktualizuj plan testów** — Zrewiduj numery i tytuły scenariuszy, aby odzwierciedlały rzeczywistość (np. Scenariusz 7a zamiast zmiany numeracji 7).

### Długoterminowe

1. **Wzorzec Base Page** — Wspólne elementy (nawigacja, stopka) umieść w klasie bazowej, aby uniknąć duplikacji.
2. **Dodaj testy API** — Jeśli istnieje endpoint logowania, dodaj testy API weryfikujące 200/401/400.

---

## Rekomendacja

`comment` — Kod jest gotowy do użycia, ale warto zaimplementować sugestie krótkoterminowe przed scaleniem, szczególnie wyciągnięcie wspólnych lokatorów stopki i uregulowanie planu testów.
