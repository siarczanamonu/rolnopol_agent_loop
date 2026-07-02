# Plan testów - Strona logowania Rolnopol

---

## Scenariusz 1: Poprawne załadowanie strony logowania

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: tests/e2e/Login.spec.ts)

**Warunki wstępne:**
- Aplikacja Rolnopol jest uruchomiona pod adresem `http://localhost:3000`

**Kroki:**
1. Przejdź do adresu `http://localhost:3000/login.html`
2. Zweryfikuj tytuł strony
3. Zweryfikuj URL strony

**Oczekiwany rezultat:**
- Tytuł strony to "Login - Rolnopol"
- URL strony to `http://localhost:3000/login.html`

---

## Scenariusz 2: Wyświetlanie i poprawność linków nawigacyjnych

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: tests/e2e/Login.spec.ts)

**Warunki wstępne:**
- Strona logowania jest poprawnie załadowana

**Kroki:**
1. Zweryfikuj widoczność wszystkich linków w menu nawigacyjnym
2. Zweryfikuj adresy URL powiązane z każdym linkiem

**Oczekiwany rezultat:**
- Wszystkie linki nawigacyjne są widoczne i mają poprawne atrybuty href

---

## Scenariusz 3: Wyświetlanie zawartości sekcji logowania

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: tests/e2e/Login.spec.ts)

**Warunki wstępne:**
- Strona logowania jest poprawnie załadowana

**Kroki:**
1. Zweryfikuj widoczność logo Rolnopol w banerze
2. Zweryfikuj widoczność nagłówka "Login to Your User Account"
3. Zweryfikuj widoczność pola Email z placeholderem "Enter your email"
4. Zweryfikuj widoczność pola Password z placeholderem "Enter your password"
5. Zweryfikuj widoczność przycisku "Login"

**Oczekiwany rezultat:**
- Wszystkie elementy formularza logowania są widoczne

---

## Scenariusz 4: Działanie linków pomocniczych (Register here, Back to Home)

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: tests/e2e/Login.spec.ts)

**Warunki wstępne:**
- Strona logowania jest poprawnie załadowana

**Kroki:**
1. Kliknij link "Register here"
2. Zweryfikuj przekierowanie do `/register.html`
3. Powróć do strony logowania
4. Kliknij link "Back to Home"
5. Zweryfikuj przekierowanie do strony głównej (`/`)

**Oczekiwany rezultat:**
- Link "Register here" przekierowuje do `/register.html`
- Link "Back to Home" przekierowuje do `/`

---

## Scenariusz 5: Walidacja formularza - wysłanie pustych pól

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: tests/e2e/Login.spec.ts)

**Warunki wstępne:**
- Strona logowania jest poprawnie załadowana

**Kroki:**
1. Kliknij przycisk "Login" bez wpisywania danych w pola Email i Password
2. Zweryfikuj reakcję formularza (błędy walidacji lub brak wysłania)

**Oczekiwany rezultat:**
- Formularz nie wysyła się lub wyświetla komunikaty walidacyjne

---

## Scenariusz 6: Walidacja formularza - nieprawidłowy format email

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: tests/e2e/Login.spec.ts)

**Warunki wstępne:**
- Strona logowania jest poprawnie załadowana

**Kroki:**
1. Wpisz w pole Email wartość "nieprawidlowyemail" (bez znaku @)
2. Wpisz w pole Password dowolną wartość
3. Kliknij przycisk "Login"
4. Zweryfikuj reakcję formularza

**Oczekiwany rezultat:**
- Formularz nie wysyła się lub wyświetla komunikat o nieprawidłowym formacie email

---

## Scenariusz 7: Atrybuty pól formularza

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: tests/e2e/Login.spec.ts)

**Warunki wstępne:**
- Strona logowania jest poprawnie załadowana

**Kroki:**
1. Zweryfikuj atrybut `required` pola Email
2. Zweryfikuj atrybut `required` pola Password
3. Zweryfikuj atrybut `type="email"` pola Email

**Oczekiwany rezultat:**
- Oba pola mają atrybut `required`
- Pole Email ma atrybut `type="email"`

---

## Scenariusz 8: Poprawność linków w stopce

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: tests/e2e/Login.spec.ts)

**Warunki wstępne:**
- Strona logowania jest poprawnie załadowana

**Kroki:**
1. Zweryfikuj widoczność wszystkich linków w stopce
2. Zweryfikuj adresy URL powiązane z każdym linkiem

**Oczekiwany rezultat:**
- Wszystkie linki w stopce są widoczne i mają poprawne atrybuty href

---

## Scenariusz 9: Responsywność strony (widok mobilny)

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: tests/e2e/Login.spec.ts)

**Warunki wstępne:**
- Strona logowania jest poprawnie załadowana

**Kroki:**
1. Zmień rozmiar widoku na rozmiar urządzenia mobilnego (375x812)
2. Zweryfikuj widoczność nagłówka "Login to Your User Account"
3. Zweryfikuj widoczność pól formularza
4. Zweryfikuj widoczność przycisku "Login"

**Oczekiwany rezultat:**
- Strona poprawnie się renderuje w widoku mobilnym, wszystkie elementy formularza są widoczne

---

## Scenariusz 10: Informacja o wersji i autorze w stopce

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: tests/e2e/Login.spec.ts)

**Warunki wstępne:**
- Strona logowania jest poprawnie załadowana

**Kroki:**
1. Zweryfikuj widoczność informacji o wersji w stopce

**Oczekiwany rezultat:**
- Stopka zawiera tekst w formacie "© 2026 Rolnopol v1.0.xxx. build by"
