# Plan testów – Strona główna Rolnopol

**Data utworzenia:** 2026-07-11  
**Docelowy URL:** http://localhost:3000/  
**Status planu:** ✅ Zaimplementowany  
**Plik testowy:** tests/e2e/home-page.spec.ts  
**Page Object:** tests/pages/HomePage.ts  
**Konfiguracja URL:** tests/config/urls.ts

## 1. Streszczenie (Executive Summary)

Dokument opisuje testy automatyczne E2E dla strony głównej aplikacji Rolnopol – systemu zarządzania gospodarstwami rolniczymi. Strona główna prezentuje statystyki platformy, nawigację oraz przyciski CTA kierujące do rejestracji/logowania. Testy obejmują weryfikację elementów nawigacji, sekcji hero, kart statystyk, sekcji CTA oraz stopki.

## 2. Zakres (Scope)

**Zawarte w zakresie:**
- Nawigacja górna (navbar): logo, linki Home, Alerts, Documentation, API Explorer, Register, Login
- Sekcja hero (banner): tytuł, podtytuł
- Karty statystyk: Active Users, Managed Farms, Total Area, Total Staff, Stock Animals
- Sekcja CTA: przyciski "Get Started Free" i "Sign In"
- Stopka: linki Contact, jaktestowac.pl, GitHub, YouTube, LinkedIn, AI_Testers
- Nawigacja z poziomu strony głównej do podstron (Login, Register, Contact, Alerts, Documentation, API Explorer)
- Walidacja pól tekstowych statystyk (wartości liczbowe)

**Wyłączone z zakresu:**
- Funkcjonalność logowania i rejestracji (osobne plany)
- API backendowe
- Testy wydajnościowe i bezpieczeństwa

## 3. Przegląd ryzyka (Risk Overview)

| Obszar                          | Ryzyko   | Priorytet | Uwagi                                      |
| ------------------------------- | -------- | --------- | ------------------------------------------ |
| Nawigacja górna (linki)          | Krytyczne| Wysoki    | Kluczowa dla nawigacji po aplikacji        |
| Przyciski CTA (Get Started/Sign In) | Krytyczne| Wysoki    | Główny cel konwersji użytkownika            |
| Karty statystyk                 | Umiarkowane| Średni   | Wartości prezentacyjne, mogą się zmieniać  |
| Stopka i linki zewnętrzne       | Niewielkie| Niski     | Linki do serwisów zewnętrznych             |
| Sekcja hero (tytuł/tekst)       | Niewielkie| Niski     | Treść statyczna                            |

## 4. Scenariusze testowe

### 4.1 Wczytanie strony głównej i walidacja tytułu

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: home-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Krytyczne  
**Warunki wstępne:** Aplikacja działa pod adresem http://localhost:3000/  

**Kroki:**
1. Przejdź na stronę http://localhost:3000/
2. Sprawdź tytuł strony (page title)

**Oczekiwany rezultat:** Tytuł strony to "Rolnopol".  
**Warunki niepowodzenia:** Strona nie ładuje się lub tytuł jest inny niż "Rolnopol".

---

### 4.2 Widoczność nawigacji górnej (navbar)

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: home-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Krytyczne  
**Warunki wstępne:** Użytkownik znajduje się na stronie głównej.  

**Kroki:**
1. Sprawdź widoczność linku "Home"
2. Sprawdź widoczność linku "Alerts"
3. Sprawdź widoczność linku "Documentation"
4. Sprawdź widoczność linku "API Explorer"
5. Sprawdź widoczność linku "Register"
6. Sprawdź widoczność linku "Login"
7. Sprawdź widoczność logo "Rolnopol"

**Oczekiwany rezultat:** Wszystkie linki nawigacyjne oraz logo są widoczne.  
**Warunki niepowodzenia:** Brak jednego z elementów nawigacji.

---

### 4.3 Nawigacja z poziomu menu górnego – link Home

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: home-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie głównej.  

**Kroki:**
1. Kliknij link "Home"
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL to http://localhost:3000/ (strona główna).  
**Warunki niepowodzenia:** URL jest inny lub strona nie ładuje się.

---

### 4.4 Nawigacja do strony Alerts

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: home-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie głównej.  

**Kroki:**
1. Kliknij link "Alerts"
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL kończy się na /alerts.html.  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.5 Nawigacja do strony Documentation

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: home-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie głównej.  

**Kroki:**
1. Kliknij link "Documentation"
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL kończy się na /docs.html.  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.6 Nawigacja do strony API Explorer

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: home-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie głównej.  

**Kroki:**
1. Kliknij link "API Explorer"
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL kończy się na /swagger.html.  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.7 Nawigacja do strony Register (z poziomu navbar)

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: home-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Krytyczne  
**Warunki wstępne:** Użytkownik znajduje się na stronie głównej.  

**Kroki:**
1. Kliknij link "Register"
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL kończy się na /register.html.  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.8 Nawigacja do strony Login (z poziomu navbar)

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: home-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Krytyczne  
**Warunki wstępne:** Użytkownik znajduje się na stronie głównej.  

**Kroki:**
1. Kliknij link "Login"
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL kończy się na /login.html.  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.9 Widoczność sekcji hero (banner)

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: home-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Niewielkie  
**Warunki wstępne:** Użytkownik znajduje się na stronie głównej.  

**Kroki:**
1. Sprawdź widoczność nagłówka "Welcome to Rolnopol"
2. Sprawdź widoczność tekstu "Futuristic Farm & Resource Management"
3. Sprawdź tekst opisu zawierający "Manage your farms"

**Oczekiwany rezultat:** Nagłówek i podtytuł są widoczne z poprawną treścią.  
**Warunki niepowodzenia:** Brak nagłówka lub niepoprawna treść.

---

### 4.10 Widoczność kart statystyk

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: home-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie głównej.  

**Kroki:**
1. Sprawdź widoczność karty "Active Users"
2. Sprawdź widoczność karty "Managed Farms"
3. Sprawdź widoczność karty "Total Area (ha)"
4. Sprawdź widoczność karty "Total Staff"
5. Sprawdź widoczność karty "Stock Animals"

**Oczekiwany rezultat:** Wszystkie pięć kart statystyk jest widocznych z etykietami.  
**Warunki niepowodzenia:** Brak jednej z kart.

---

### 4.11 Wartości statystyk są liczbami dodatnimi

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: home-page.spec.ts)  
**Priorytet:** Niski  
**Ryzyko:** Niewielkie  
**Warunki wstępne:** Użytkownik znajduje się na stronie głównej.  

**Kroki:**
1. Pobierz wartość karty "Active Users" i sprawdź czy jest większa niż 0
2. Pobierz wartość karty "Managed Farms" i sprawdź czy jest większa niż 0
3. Pobierz wartość karty "Total Staff" i sprawdź czy jest większa niż 0

**Oczekiwany rezultat:** Każda wartość statystyki jest liczbą większą niż 0.  
**Warunki niepowodzenia:** Wartość jest zerowa, pusta lub nieliczbowa.

---

### 4.12 Widoczność przycisków CTA

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: home-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Krytyczne  
**Warunki wstępne:** Użytkownik znajduje się na stronie głównej.  

**Kroki:**
1. Sprawdź widoczność przycisku "Get Started Free"
2. Sprawdź widoczność przycisku "Sign In"

**Oczekiwany rezultat:** Oba przyciski są widoczne.  
**Warunki niepowodzenia:** Brak któregoś z przycisków.

---

### 4.13 Nawigacja przez przycisk CTA "Get Started Free"

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: home-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Krytyczne  
**Warunki wstępne:** Użytkownik znajduje się na stronie głównej.  

**Kroki:**
1. Kliknij przycisk "Get Started Free"
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL kończy się na /register.html.  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.14 Nawigacja przez przycisk CTA "Sign In"

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: home-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Krytyczne  
**Warunki wstępne:** Użytkownik znajduje się na stronie głównej.  

**Kroki:**
1. Kliknij przycisk "Sign In"
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL kończy się na /login.html.  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.15 Widoczność stopki i linku Contact

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: home-page.spec.ts)  
**Priorytet:** Niski  
**Ryzyko:** Niewielkie  
**Warunki wstępne:** Użytkownik znajduje się na stronie głównej.  

**Kroki:**
1. Sprawdź widoczność linku "Contact" w stopce
2. Sprawdź widoczność tekstu "© 2026 Rolnopol"

**Oczekiwany rezultat:** Link Contact i tekst copyright są widoczne.  
**Warunki niepowodzenia:** Brak elementów stopki.

---

### 4.16 Nawigacja do strony Contact (ze stopki)

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: home-page.spec.ts)  
**Priorytet:** Niski  
**Ryzyko:** Niewielkie  
**Warunki wstępne:** Użytkownik znajduje się na stronie głównej.  

**Kroki:**
1. Kliknij link "Contact" w stopce
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL kończy się na /contact.html.  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.17 Linki zewnętrzne w stopce (jaktestowac.pl, GitHub)

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: home-page.spec.ts)  
**Priorytet:** Niski  
**Ryzyko:** Niewielkie  
**Warunki wstępne:** Użytkownik znajduje się na stronie głównej.  

**Kroki:**
1. Sprawdź atrybut href linku "jaktestowac.pl" – powinien wskazywać na https://jaktestowac.pl
2. Sprawdź atrybut href linku "GitHub Rolnopol repository" – powinien wskazywać na https://github.com/jaktestowac/rolnopol

**Oczekiwany rezultat:** Linki zewnętrzne mają poprawne atrybuty href.  
**Warunki niepowodzenia:** Atrybut href jest pusty lub niepoprawny.

## 5. Uwagi i założenia

- Wartości statystyk (liczba użytkowników, farmy, obszar) mogą się dynamicznie zmieniać w czasie, dlatego testy sprawdzają jedynie czy wartości są liczbami dodatnimi, a nie konkretne liczby.
- Linki zewnętrzne w stopce nie są klikane w testach E2E (aby uniknąć opuszczania aplikacji), weryfikowane jest jedynie atrybut `href`.
- Testy uruchamiane są w przeglądarce Google Chrome (zgodnie z konfiguracją playwright.config.ts).