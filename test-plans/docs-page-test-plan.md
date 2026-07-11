# Plan testów – Strona Dokumentacji Rolnopol

**Data utworzenia:** 2026-07-11  
**Docelowy URL:** http://localhost:3000/docs.html  
**Status planu:** ✅ Zaimplementowany  
**Plik testowy:** tests/e2e/docs-page.spec.ts  
**Page Object:** tests/pages/DocsPage.ts  
**Konfiguracja URL:** tests/config/urls.ts

## 1. Streszczenie (Executive Summary)

Dokument opisuje testy automatyczne E2E dla strony Dokumentacji aplikacji Rolnopol – systemu zarządzania gospodarstwami rolniczymi. Strona Dokumentacji prezentuje przewodnik po systemie oraz referencję API w układzie dwukolumnowym: lewa kolumna zawiera spis treści (sidebar z nawigacją kotwiczną), prawa kolumna zawiera sekcje dokumentacji (System Overview, Main Data Entities, User Types & Permissions, Main Features, Key User Flows, API Basics, Testing Tips, Demo Accounts, Asset–Finance–Marketplace Flow, End-to-End Scenarios). Testy obejmują weryfikację nawigacji górnej, baneru, spisu treści, sekcji dokumentacji, kart encji, kart ról, list funkcji i przepływów, kart kont demo, tabeli podsumowującej, nawigacji kotwicznej (klik w sidebar → scroll + aktywny link), stopki i linków zewnętrznych.

## 2. Zakres (Scope)

**Zawarte w zakresie:**
- Nawigacja górna (navbar): logo Rolnopol, linki Home, Alerts, Documentation (aktywny), API Explorer, Register, Login
- Baner strony: ikona, tytuł "Documentation", podtytuł "Rolnopol System Guide & API Reference"
- Spis treści (sidebar `.docs-nav`): 10 linków kotwiczych z `data-testid` (nav-overview ... nav-e2e-scenarios)
- Sekcja "System Overview" (`#overview`): nagłówek, akapit opisu, separator
- Sekcja "Main Data Entities" (`#entities`): 7 kart encji (User, Field, Animal, Staff, Assignment, FinancialAccount, MarketplaceOffer)
- Sekcja "User Types & Permissions" (`#user-roles`): karta roli "User" z listą uprawnień
- Sekcja "Main Features" (`#features`): lista 6 funkcji systemu
- Sekcja "Key User Flows" (`#user-flows`): 5 kart przepływów (Registration & Login, Marketplace Trading, Resource & Farm Management, Financial Operations, System Health Check)
- Sekcja "API Basics" (`#api-basics`): lista 4 punktów o API
- Sekcja "Testing Tips" (`#testing-tips`): lista 7 wskazówek testowych
- Sekcja "Demo Accounts" (`#demo-accounts`): 3 karty kont demo
- Sekcja "Asset–Finance–Marketplace Flow" (`#asset-finance-marketplace-flow`): nagłówki h3, listy, tabela podsumowująca (3 wiersze, 6 kolumn)
- Sekcja "End-to-End Scenarios" (`#e2e-scenarios`): 3 karty scenariuszy E2E
- Nawigacja kotwicza: klik w link sidebar → zmiana hash URL, scroll do sekcji, aktualizacja aktywnego linku
- Stopka: link Contact, copyright, linki zewnętrzne (jaktestowac.pl, GitHub Rolnopol repository)

**Wyłączone z zakresu:**
- API backendowe
- Testy wydajnościowe i bezpieczeństwa
- Logowanie i rejestracja (osobne plany)
- Testowanie treści merytorycznej dokumentacji (poprawność opisów)

## 3. Przegląd ryzyka (Risk Overview)

| Obszar | Ryzyko | Priorytet | Uwagi |
| --- | --- | --- | --- |
| Nawigacja górna (linki) | Krytyczne | Wysoki | Kluczowa dla nawigacji po aplikacji |
| Nawigacja kotwicza (sidebar → sekcje) | Wysokie | Wysoki | Główna funkcjonalność strony dokumentacji |
| Spis treści (10 linków) | Wysokie | Wysoki | Struktura nawigacji sidebar |
| Sekcje dokumentacji (10 sekcji) | Wysokie | Wysoki | Główna treść strony |
| Karty encji (7) | Umiarkowane | Średni | Struktura danych systemu |
| Karty przepływów (5) | Umiarkowane | Średni | Opisy kluczowych procesów |
| Karty kont demo (3) | Umiarkowane | Średni | Informacje testowe |
| Tabela podsumowująca | Umiarkowane | Średni | Struktura reguł marketplace |
| Listy funkcji / API / wskazówek | Niskie | Niski | Treść statyczna |
| Stopka i linki zewnętrzne | Niewielkie | Niski | Linki do serwisów zewnętrznych |
| Baner strony | Niewielkie | Niski | Treść statyczna |

## 4. Scenariusze testowe

### 4.1 Wczytanie strony dokumentacji i walidacja tytułu

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Krytyczne  
**Warunki wstępne:** Aplikacja działa pod adresem http://localhost:3000/docs.html  

**Kroki:**
1. Przejdź na stronę http://localhost:3000/docs.html
2. Sprawdź tytuł strony (page title)
3. Sprawdź URL strony

**Oczekiwany rezultat:** Tytuł strony to "Documentation - Rolnopol", URL to http://localhost:3000/docs.html.  
**Warunki niepowodzenia:** Strona nie ładuje się lub tytuł/URL jest inny.

---

### 4.2 Widoczność nawigacji górnej (navbar)

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Krytyczne  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Sprawdź widoczność logo "Rolnopol"
2. Sprawdź widoczność linku "Home"
3. Sprawdź widoczność linku "Alerts"
4. Sprawdź widoczność linku "Documentation"
5. Sprawdź widoczność linku "API Explorer"
6. Sprawdź widoczność linku "Register"
7. Sprawdź widoczność linku "Login"

**Oczekiwany rezultat:** Wszystkie linki nawigacyjne oraz logo są widoczne.  
**Warunki niepowodzenia:** Brak jednego z elementów nawigacji.

---

### 4.3 Widoczność baneru strony dokumentacji

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Niewielkie  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Sprawdź widoczność baneru (role=banner)
2. Sprawdź widoczność tekstu "Documentation"
3. Sprawdź widoczność podtytułu "Rolnopol System Guide & API Reference"

**Oczekiwany rezultat:** Baner zawiera tytuł "Documentation" oraz podtytuł "Rolnopol System Guide & API Reference".  
**Warunki niepowodzenia:** Brak tekstu w banerze.

---

### 4.4 Widoczność spisu treści (sidebar) z 10 linkami kotwicowymi

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Wysokie  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Sprawdź widoczność nagłówka "Contents" w sidebarze
2. Sprawdź liczbę linków w spisie treści (`.docs-nav a`)
3. Sprawdź, czy każdy link ma poprawny atrybut href (kotwica do sekcji)

**Oczekiwany rezultat:** Spis treści zawiera 10 linków, każdy wskazuje na odpowiednią sekcję (#overview, #entities, ...).  
**Warunki niepowodzenia:** Brak linków lub niepoprawne atrybuty href.

---

### 4.5 Widoczność wszystkich 10 sekcji dokumentacji

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Wysokie  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Sprawdź widoczność sekcji #overview z nagłówkiem "System Overview"
2. Sprawdź widoczność sekcji #entities z nagłówkiem "Main Data Entities"
3. Sprawdź widoczność sekcji #user-roles z nagłówkiem "User Types & Permissions"
4. Sprawdź widoczność sekcji #features z nagłówkiem "Main Features"
5. Sprawdź widoczność sekcji #user-flows z nagłówkiem "Key User Flows"
6. Sprawdź widoczność sekcji #api-basics z nagłówkiem "API Basics"
7. Sprawdź widoczność sekcji #testing-tips z nagłówkiem "Testing Tips"
8. Sprawdź widoczność sekcji #demo-accounts z nagłówkiem "Demo Accounts"
9. Sprawdź widoczność sekcji #asset-finance-marketplace-flow z nagłówkiem "Asset–Finance–Marketplace Flow"
10. Sprawdź widoczność sekcji #e2e-scenarios z nagłówkiem "End-to-End Scenarios"

**Oczekiwany rezultat:** Wszystkie 10 sekcji jest widocznych z poprawnymi nagłówkami.  
**Warunki niepowodzenia:** Brak którejś z sekcji lub nagłówka.

---

### 4.6 Weryfikacja sekcji Main Data Entities – 7 kart encji

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Pobierz wszystkie karty encji w sekcji #entities
2. Sprawdź liczbę kart (oczekiwane 7)
3. Sprawdź nazwy encji: User, Field, Animal, Staff, Assignment, FinancialAccount, MarketplaceOffer

**Oczekiwany rezultat:** Sekcja zawiera 7 kart encji z poprawnymi nazwami.  
**Warunki niepowodzenia:** Liczba kart jest inna lub brak którejś encji.

---

### 4.7 Weryfikacja sekcji User Types & Permissions – karta roli User

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Sprawdź widoczność karty roli "User" w sekcji #user-roles
2. Sprawdź widoczność opisu roli
3. Sprawdź widoczność listy uprawnień (co najmniej 5 pozycji)

**Oczekiwany rezultat:** Karta roli User jest widoczna z opisem i listą uprawnień.  
**Warunki niepowodzenia:** Brak karty roli lub listy uprawnień.

---

### 4.8 Weryfikacja sekcji Main Features – lista 6 funkcji

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Niski  
**Ryzyko:** Niskie  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Pobierz listę funkcji w sekcji #features
2. Sprawdź liczbę pozycji (oczekiwane 6)

**Oczekiwany rezultat:** Sekcja zawiera 6 funkcji systemu.  
**Warunki niepowodzenia:** Liczba funkcji jest inna niż 6.

---

### 4.9 Weryfikacja sekcji Key User Flows – 5 kart przepływów

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Pobierz wszystkie karty przepływów w sekcji #user-flows
2. Sprawdź nazwy: Registration & Login, Marketplace Trading, Resource & Farm Management, Financial Operations, System Health Check

**Oczekiwany rezultat:** Sekcja zawiera 5 kart przepływów z poprawnymi nazwami.  
**Warunki niepowodzenia:** Brak którejś z kart przepływów.

---

### 4.10 Weryfikacja sekcji API Basics – lista punktów

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Niski  
**Ryzyko:** Niskie  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Pobierz listę w sekcji #api-basics
2. Sprawdź liczbę pozycji (oczekiwane 4)

**Oczekiwany rezultat:** Sekcja zawiera 4 punkty o API.  
**Warunki niepowodzenia:** Liczba punktów jest inna niż 4.

---

### 4.11 Weryfikacja sekcji Testing Tips – lista wskazówek

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Niski  
**Ryzyko:** Niskie  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Pobierz listę w sekcji #testing-tips
2. Sprawdź liczbę pozycji (oczekiwane 7)

**Oczekiwany rezultat:** Sekcja zawiera 7 wskazówek testowych.  
**Warunki niepowodzenia:** Liczba wskazówek jest inna niż 7.

---

### 4.12 Weryfikacja sekcji Demo Accounts – 3 karty kont demo

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Pobierz wszystkie karty kont demo w sekcji #demo-accounts
2. Sprawdź liczbę kart (oczekiwane 3)
3. Sprawdź, czy każda karta ma nagłówek i opis

**Oczekiwany rezultat:** Sekcja zawiera 3 karty kont demo z nagłówkami i opisami.  
**Warunki niepowodzenia:** Liczba kart jest inna lub brak nagłówka/opisu.

---

### 4.13 Weryfikacja sekcji Asset–Finance–Marketplace Flow – nagłówki h3 i tabela

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Sprawdź widoczność nagłówków h3 w sekcji (Overview, Entities, ..., Summary Table)
2. Sprawdź widoczność tabeli
3. Sprawdź liczbę wierszy w tabeli (oczekiwane 3 wiersze danych)
4. Sprawdź nagłówki kolumn tabeli (6 kolumn)

**Oczekiwany rezultat:** Sekcja zawiera nagłówki h3 oraz tabelę z 3 wierszami i 6 kolumnami.  
**Warunki niepowodzenia:** Brak nagłówków lub tabela ma inną strukturę.

---

### 4.14 Weryfikacja sekcji End-to-End Scenarios – 3 karty scenariuszy

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Pobierz wszystkie karty scenariuszy w sekcji #e2e-scenarios
2. Sprawdź nazwy: Register and Set Up Farm, Sell a Field on the Marketplace, Attempt to Buy with Insufficient Funds

**Oczekiwany rezultat:** Sekcja zawiera 3 karty scenariuszy E2E z poprawnymi nazwami.  
**Warunki niepowodzenia:** Brak którejś z kart scenariuszy.

---

### 4.15 Nawigacja kotwicza – klik w link sidebar przewija do sekcji

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Wysokie  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Kliknij link "Main Data Entities" w sidebarze (data-testid=nav-entities)
2. Sprawdź, czy URL zawiera hash #entities
3. Sprawdź, czy sekcja #entities jest widoczna w oknie (w viewport)

**Oczekiwany rezultat:** Po kliknięciu URL zawiera #entities, sekcja jest przewinięta do widoku.  
**Warunki niepowodzenia:** Brak zmiany hash lub sekcja nie jest widoczna.

---

### 4.16 Nawigacja kotwicza – aktywny link sidebar aktualizuje się po scrollu

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Wysokie  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Kliknij link "Main Features" w sidebarze (data-testid=nav-features)
2. Sprawdź, czy link "Main Features" ma klasę "active"

**Oczekiwany rezultat:** Po kliknięciu kliknięty link otrzymuje klasę active.  
**Warunki niepowodzenia:** Kliknięty link nie ma klasy active.

---

### 4.17 Nawigacja kotwicza – każdy link sidebar prowadzi do właściwej sekcji

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Wysokie  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Dla każdego z 10 linków sidebar kliknij link
2. Sprawdź, czy URL hash odpowiada href linku
3. Sprawdź, czy odpowiednia sekcja jest widoczna w viewport

**Oczekiwany rezultat:** Każdy link przewija do właściwej sekcji i aktualizuje hash URL.  
**Warunki niepowodzenia:** Link nie przewija do sekcji lub hash jest niepoprawny.

---

### 4.18 Nawigacja z poziomu menu górnego – link Home

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Kliknij link "Home"
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL to http://localhost:3000/ (strona główna).  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.19 Nawigacja z poziomu menu górnego – link Alerts

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Kliknij link "Alerts"
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL kończy się na /alerts.html.  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.20 Nawigacja z poziomu menu górnego – link API Explorer

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Kliknij link "API Explorer"
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL kończy się na /swagger.html.  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.21 Nawigacja z poziomu menu górnego – link Register

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Kliknij link "Register"
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL kończy się na /register.html.  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.22 Nawigacja z poziomu menu górnego – link Login

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Kliknij link "Login"
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL kończy się na /login.html.  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.23 Widoczność stopki z linkiem Contact i tekstem copyright

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Niski  
**Ryzyko:** Niewielkie  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Sprawdź widoczność stopki (contentinfo)
2. Sprawdź widoczność linku "Contact"
3. Sprawdź widoczność tekstu "© 2026 Rolnopol"

**Oczekiwany rezultat:** Stopka, link Contact i tekst copyright są widoczne.  
**Warunki niepowodzenia:** Brak elementów stopki.

---

### 4.24 Nawigacja do strony Contact (ze stopki)

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Niski  
**Ryzyko:** Niewielkie  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Kliknij link "Contact us" w stopce
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL kończy się na /contact.html.  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.25 Linki zewnętrzne w stopce (jaktestowac.pl, GitHub)

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: docs-page.spec.ts)  
**Priorytet:** Niski  
**Ryzyko:** Niewielkie  
**Warunki wstępne:** Użytkownik znajduje się na stronie dokumentacji.  

**Kroki:**
1. Sprawdź atrybut href linku "jaktestowac.pl" – powinien wskazywać na https://jaktestowac.pl
2. Sprawdź atrybut href linku "GitHub Rolnopol repository" – powinien wskazywać na https://github.com/jaktestowac/rolnopol

**Oczekiwany rezultat:** Linki zewnętrzne mają poprawne atrybuty href.  
**Warunki niepowodzenia:** Atrybut href jest pusty lub niepoprawny.

## 5. Uwagi i założenia

- Strona dokumentacji jest w pełni statyczna (treść ładowana z HTML, bez zapytań API). Nie wymaga oczekiwania na `networkidle`.
- Linki sidebar mają atrybuty `data-testid` w formacie `nav-<sekcja>` (np. `nav-overview`, `nav-entities`), używane jako stabilne selektory.
- Nawigacja kotwicza powoduje zmianę `window.location.hash` oraz scroll do sekcji; aktywny link w sidebarze otrzymuje klasę `active`.
- Sekcje mają ID zgodne z href linków sidebar (np. `#overview` → sekcja `#overview`).
- Tabela w sekcji Asset–Finance–Marketplace Flow ma 3 wiersze danych (Create Offer, Buy Offer, Cancel Offer) i 6 kolumn.
- Linki zewnętrzne w stopce nie są klikane w testach E2E (aby uniknąć opuszczania aplikacji), weryfikowany jest jedynie atrybut `href`.
- Testy uruchamiane są w przeglądarce Google Chrome (zgodnie z konfiguracją playwright.config.ts).
- W nawigacji górnej link "Documentation" wskazuje na bieżącą stronę (/docs.html).