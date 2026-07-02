# Plan testów - Strona główna Rolnopol

---

## Scenariusz 1: Poprawne załadowanie strony głównej

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: tests/e2e/HomePage.spec.ts)

**Warunki wstępne:**
- Aplikacja Rolnopol jest uruchomiona pod adresem `http://localhost:3000`

**Kroki:**
1. Przejdź do adresu `http://localhost:3000`
2. Zweryfikuj tytuł strony
3. Zweryfikuj URL strony

**Oczekiwany rezultat:**
- Tytuł strony to "Rolnopol"
- URL strony to `http://localhost:3000/`

---

## Scenariusz 2: Wyświetlanie i poprawność linków nawigacyjnych

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: tests/e2e/HomePage.spec.ts)

**Warunki wstępne:**
- Strona główna jest poprawnie załadowana

**Kroki:**
1. Zweryfikuj widoczność wszystkich linków w menu nawigacyjnym
2. Zweryfikuj adresy URL powiązane z każdym linkiem

**Oczekiwany rezultat:**
- Wszystkie linki nawigacyjne są widoczne i mają poprawne atrybuty href

---

## Scenariusz 3: Wyświetlanie zawartości głównej sekcji

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: tests/e2e/HomePage.spec.ts)

**Warunki wstępne:**
- Strona główna jest poprawnie załadowana

**Kroki:**
1. Zweryfikuj widoczność nagłówka "Welcome to Rolnopol"
2. Zweryfikuj widoczność akapitu z opisem aplikacji
3. Zweryfikuj widoczność statystyk platformy

**Oczekiwany rezultat:**
- Wszystkie elementy treściowe są widoczne

---

## Scenariusz 4: Działanie przycisków akcji (Get Started, Sign In)

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: tests/e2e/HomePage.spec.ts)

**Warunki wstępne:**
- Strona główna jest poprawnie załadowana

**Kroki:**
1. Kliknij przycisk "Get Started Free"
2. Zweryfikuj przekierowanie do `/register.html`
3. Powróć do strony głównej
4. Kliknij przycisk "Sign In"
5. Zweryfikuj przekierowanie do `/login.html`

**Oczekiwany rezultat:**
- Każdy przycisk akcji przekierowuje do odpowiedniej strony

---

## Scenariusz 5: Poprawność linków w stopce

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: tests/e2e/HomePage.spec.ts)

**Warunki wstępne:**
- Strona główna jest poprawnie załadowana

**Kroki:**
1. Zweryfikuj widoczność wszystkich linków w stopce
2. Zweryfikuj adresy URL powiązane z każdym linkiem

**Oczekiwany rezultat:**
- Wszystkie linki w stopce są widoczne i mają poprawne atrybuty href

---

## Scenariusz 6: Responsywność strony (widok mobilny)

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: tests/e2e/HomePage.spec.ts)

**Warunki wstępne:**
- Strona główna jest poprawnie załadowana

**Kroki:**
1. Zmień rozmiar widoku na rozmiar urządzenia mobilnego (375x812)
2. Zweryfikuj widoczność nagłówka powitalnego
3. Zweryfikuj widoczność linku Register

**Oczekiwany rezultat:**
- Strona poprawnie się renderuje w widoku mobilnym
