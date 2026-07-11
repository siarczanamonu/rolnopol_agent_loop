# Plan testów – Strona Alertów Rolnopol

**Data utworzenia:** 2026-07-11  
**Docelowy URL:** http://localhost:3000/alerts.html  
**Status planu:** ✅ Zaimplementowany  
**Plik testowy:** tests/e2e/alerts-page.spec.ts  
**Page Object:** tests/pages/AlertsPage.ts  
**Konfiguracja URL:** tests/config/urls.ts

## 1. Streszczenie (Executive Summary)

Dokument opisuje testy automatyczne E2E dla strony Alertów aplikacji Rolnopol – systemu zarządzania gospodarstwami rolniczymi. Strona Alertów prezentuje nadchodzące i ostatnie zdarzenia pogodowe, nawadniania, chorób i glebowe, wraz z filtrami (wyszukiwarka, nasilenie, region) oraz przyciskiem odświeżania. Testy obejmują weryfikację elementów nawigacji, baneru, filtrów, sekcji alertów (Today/Tomorrow/Last 7 days), kart alertów oraz stopki.

## 2. Zakres (Scope)

**Zawarte w zakresie:**
- Nawigacja górna (navbar): logo, linki Home, Alerts (aktywny), Documentation, API Explorer, Register, Login
- Baner strony: ikona, tytuł "Rolnopol", podtytuł "Alerts and Notifications"
- Nagłówek sekcji "Alerts" z opisem "Upcoming and recent events"
- Wyszukiwarka alertów (`#searchInput`)
- Filtr nasilenia (`#severityFilter`): All severities, Low, Medium, High, Critical
- Filtr regionu (`#regionSelect`): 16 województw
- Przycisk odświeżania (`#refreshBtn`)
- Sekcja "Tomorrow" z licznikiem `#upcomingCount`
- Sekcja "Today" z licznikiem `#todayCount`
- Sekcja "Last 7 days" z licznikiem `#historyCount`
- Karty alertów: tytuł, kategoria, nasilenie (data-sev), data, komunikat
- Funkcjonalność filtrów: wyszukiwanie tekstem, filtrowanie po nasileniu, filtrowanie po regionie, reset filtrów
- Aktualizacja liczników po zastosowaniu filtrów
- Stopka: link Contact, copyright, linki zewnętrzne (jaktestowac.pl, GitHub)

**Wyłączone z zakresu:**
- API backendowe
- Testy wydajnościowe i bezpieczeństwa
- Logowanie i rejestracja (osobne plany)

## 3. Przegląd ryzyka (Risk Overview)

| Obszar | Ryzyko | Priorytet | Uwagi |
| --- | --- | --- | --- |
| Nawigacja górna (linki) | Krytyczne | Wysoki | Kluczowa dla nawigacji po aplikacji |
| Wyszukiwarka alertów | Wysokie | Wysoki | Główna funkcjonalność filtrowania |
| Filtr nasilenia | Wysokie | Wysoki | Wpływa na widoczność alertów |
| Filtr regionu | Wysokie | Wysoki | Zmienia zestaw alertów |
| Aktualizacja liczników po filtrach | Wysokie | Średni | Spójność UI z danymi |
| Sekcje alertów (Today/Tomorrow/Last 7 days) | Umiarkowane | Średni | Prezentacja danych |
| Karty alertów (treść) | Umiarkowane | Średni | Weryfikacja struktury |
| Przycisk odświeżania | Niskie | Niski | Przeładowuje listy |
| Stopka i linki zewnętrzne | Niewielkie | Niski | Linki do serwisów zewnętrznych |
| Baner strony | Niewielkie | Niski | Treść statyczna |

## 4. Scenariusze testowe

### 4.1 Wczytanie strony alertów i walidacja tytułu

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Krytyczne  
**Warunki wstępne:** Aplikacja działa pod adresem http://localhost:3000/alerts.html  

**Kroki:**
1. Przejdź na stronę http://localhost:3000/alerts.html
2. Sprawdź tytuł strony (page title)

**Oczekiwany rezultat:** Tytuł strony to "Alerts - Rolnopol".  
**Warunki niepowodzenia:** Strona nie ładuje się lub tytuł jest inny niż "Alerts - Rolnopol".

---

### 4.2 Widoczność nawigacji górnej (navbar) z aktywnym linkiem Alerts

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Krytyczne  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

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

### 4.3 Widoczność baneru strony alertów

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Niewielkie  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Sprawdź widoczność tekstu "Rolnopol" w banerze
2. Sprawdź widoczność tekstu "Alerts and Notifications" w banerze

**Oczekiwany rezultat:** Baner zawiera teksty "Rolnopol" oraz "Alerts and Notifications".  
**Warunki niepowodzenia:** Brak tekstu w banerze.

---

### 4.4 Widoczność nagłówka sekcji Alerts z opisem

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Niskie  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Sprawdź widoczność nagłówka "Alerts"
2. Sprawdź widoczność tekstu "Upcoming and recent events"

**Oczekiwany rezultat:** Nagłówek "Alerts" i opis są widoczne.  
**Warunki niepowodzenia:** Brak nagłówka lub opisu.

---

### 4.5 Widoczność filtrów: wyszukiwarka, nasilenie, region, przycisk odświeżania

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Wysokie  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Sprawdź widoczność pola wyszukiwania "Search alerts"
2. Sprawdź widoczność filtru nasilenia "Filter severity"
3. Sprawdź widoczność filtru regionu "Select region"
4. Sprawdź widoczność przycisku odświeżania

**Oczekiwany rezultat:** Wszystkie filtry i przycisk odświeżania są widoczne.  
**Warunki niepowodzenia:** Brak któregoś z elementów filtrów.

---

### 4.6 Weryfikacja opcji filtru nasilenia

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Rozwiń filtr nasilenia
2. Sprawdź dostępne opcje: All severities, Low, Medium, High, Critical

**Oczekiwany rezultat:** Filtr nasilenia zawiera 5 opcji.  
**Warunki niepowodzenia:** Brak którejś z opcji.

---

### 4.7 Weryfikacja liczby województw w filtrze regionu

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Rozwiń filtr regionu
2. Policz dostępne opcje (województwa)

**Oczekiwany rezultat:** Filtr regionu zawiera 16 województw.  
**Warunki niepowodzenia:** Liczba województw jest inna niż 16.

---

### 4.8 Widoczność trzech sekcji alertów z licznikami

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Sprawdź widoczność sekcji "Tomorrow" z licznikiem `#upcomingCount`
2. Sprawdź widoczność sekcji "Today" z licznikiem `#todayCount`
3. Sprawdź widoczność sekcji "Last 7 days" z licznikiem `#historyCount`

**Oczekiwany rezultat:** Wszystkie trzy sekcje z licznikami są widoczne.  
**Warunki niepowodzenia:** Brak którejś z sekcji lub licznika.

---

### 4.9 Widoczność kart alertów w sekcjach

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Sprawdź, czy w sekcjach (Today/Tomorrow/Last 7 days) widoczna jest co najmniej jedna karta alertu

**Oczekiwany rezultat:** Co najmniej jedna karta alertu jest widoczna w sekcjach.  
**Warunki niepowodzenia:** Brak kart alertów.

---

### 4.10 Weryfikacja struktury karty alertu (tytuł, kategoria, nasilenie, data, komunikat)

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Pobierz pierwszą kartę alertu
2. Sprawdź obecność elementu z klasą `alert-title`
3. Sprawdź obecność elementu z klasą `alert-category`
4. Sprawdź obecność badge nasilenia (data-sev)
5. Sprawdź obecność elementu z klasą `date`
6. Sprawdź obecność elementu z klasą `alert-message`

**Oczekiwany rezultat:** Karta alertu zawiera wszystkie wymagane elementy.  
**Warunki niepowodzenia:** Brak któregoś z elementów karty.

---

### 4.11 Wyszukiwanie alertów po tekście – filtrowanie i aktualizacja liczników

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Wysokie  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Pobierz tytuł pierwszej widocznej karty alertu
2. Wpisz ten tytuł w polu wyszukiwania
3. Sprawdź liczbę widocznych kart alertów (nie większa niż przed, nie mniejsza niż 1)
4. Sprawdź, czy suma liczników Today/History/Upcoming równa się liczbie widocznych kart

**Oczekiwany rezultat:** Po wpisaniu frazy karty są filtrowane, liczniki odzwierciedlają przefiltrowane wyniki.  
**Warunki niepowodzenia:** Brak filtrowania lub liczniki nie zostały zaktualizowane.

---

### 4.12 Czyszczenie wyszukiwarki przywraca wszystkie alerty

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Wysokie  
**Warunki wstępne:** Wyszukiwarka zawiera frazę "irrigation" (filtr aktywny).  

**Kroki:**
1. Wyczyść pole wyszukiwania
2. Sprawdź liczbę widocznych kart alertów
3. Sprawdź liczniki sekcji

**Oczekiwany rezultat:** Po wyczyszczeniu wszystkie alerty wracają, liczniki przybierają wartości początkowe.  
**Warunki niepowodzenia:** Alerty nie wracają po wyczyszczeniu.

---

### 4.13 Filtrowanie po nasileniu pierwszej karty – tylko alerty o tym nasileniu widoczne

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Wysokie  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Pobierz nasilenie (data-sev) pierwszej widocznej karty
2. Wybierz to nasilenie w filtrze
3. Sprawdź, czy wszystkie widoczne karty mają to samo nasilenie

**Oczekiwany rezultat:** Widoczne są tylko alerty o wybranym nasileniu.  
**Warunki niepowodzenia:** Widoczne alerty o innym nasileniu.

---

### 4.14 Filtrowanie po nasileniu (High) – warunkowe, jeśli istnieją alerty high

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów. Test pomijany, jeśli brak alertów high.  

**Kroki:**
1. Sprawdź, czy w bieżącym zestawie istnieje alert o nasileniu high
2. Wybierz "High" w filtrze nasilenia
3. Sprawdź, czy wszystkie widoczne karty mają data-sev="high"

**Oczekiwany rezultat:** Widoczne są tylko alerty o nasileniu high.  
**Warunki niepowodzenia:** Widoczne alerty o innym nasileniu.

---

### 4.15 Reset filtru nasilenia do "All severities" przywraca wszystkie alerty

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Wysokie  
**Warunki wstępne:** Filtr nasilenia ustawiony na "High".  

**Kroki:**
1. Zresetuj filtr nasilenia do "All severities"
2. Sprawdź liczbę widocznych kart alertów
3. Sprawdź liczniki sekcji

**Oczekiwany rezultat:** Po resecie wszystkie alerty wracają, liczniki przybierają wartości początkowe.  
**Warunki niepowodzenia:** Alerty nie wracają po resecie.

---

### 4.16 Filtrowanie po regionie (dolnośląskie) – aktualizacja liczników

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Wysokie  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Wybierz "dolnośląskie" w filtrze regionu
2. Sprawdź, czy suma liczników (Today + History + Upcoming) równa się liczbie widocznych kart

**Oczekiwany rezultat:** Po zmianie regionu liczniki są spójne z liczbą widocznych kart.  
**Warunki niepowodzenia:** Brak spójności między licznikami a widocznymi kartami.

---

### 4.17 Reset filtru regionu do mazowieckiego przywraca stan początkowy

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Wysoki  
**Ryzyko:** Wysokie  
**Warunki wstępne:** Region ustawiony na dolnośląskie.  

**Kroki:**
1. Zapamiętaj początkowe wartości liczników (Today, History, Upcoming)
2. Zmień region na dolnośląskie
3. Zresetuj region do mazowieckiego
4. Sprawdź, czy liczniki wracają do wartości początkowych

**Oczekiwany rezultat:** Po resecie liczniki przybierają wartości początkowe.  
**Warunki niepowodzenia:** Liczniki niezgodne ze stanem początkowym.

---

### 4.18 Kombinacja filtrów: wyszukiwarka + nasilenie

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Pobierz nasilenie i tytuł pierwszej widocznej karty
2. Wybierz to nasilenie w filtrze nasilenia
3. Wpisz tytuł w polu wyszukiwania
4. Sprawdź, czy widoczne karty pasują do obu kryteriów

**Oczekiwany rezultat:** Widoczne są tylko karty o wybranym nasileniu i pasujące do frazy.  
**Warunki niepowodzenia:** Karty niepasujące do kryteriów są widoczne.

---

### 4.19 Wyszukiwarka bez wyników – stan pusty

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Wpisz nieistniejącą frazę (np. "zzzznonexistentphrase")
2. Sprawdź, czy brak widocznych kart alertów
3. Sprawdź, czy liczniki (Today, History, Upcoming) wynoszą zero

**Oczekiwany rezultat:** Brak widocznych kart, wszystkie liczniki wynoszą zero.  
**Warunki niepowodzenia:** Widoczne karty pomimo braku dopasowań.

---

### 4.21 Przycisk odświeżania przeładowuje listy alertów

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Niski  
**Ryzyko:** Niskie  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów (region mazowieckie domyślnie).  

**Kroki:**
1. Zapamiętaj liczbę kart alertów
2. Kliknij przycisk odświeżania
3. Sprawdź, czy karty alertów nadal są widoczne

**Oczekiwany rezultat:** Po odświeżeniu karty alertów pozostają widoczne.  
**Warunki niepowodzenia:** Brak kart po odświeżeniu.

---

### 4.22 Nawigacja z poziomu menu górnego – link Home

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Kliknij link "Home"
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL to http://localhost:3000/ (strona główna).  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.23 Nawigacja z poziomu menu górnego – link Documentation

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Kliknij link "Documentation"
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL kończy się na /docs.html.  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.24 Nawigacja z poziomu menu górnego – link API Explorer

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Kliknij link "API Explorer"
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL kończy się na /swagger.html.  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.25 Nawigacja z poziomu menu górnego – link Register

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Kliknij link "Register"
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL kończy się na /register.html.  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.26 Nawigacja z poziomu menu górnego – link Login

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Średni  
**Ryzyko:** Umiarkowane  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Kliknij link "Login"
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL kończy się na /login.html.  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.27 Widoczność stopki z linkiem Contact i tekstem copyright

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Niski  
**Ryzyko:** Niewielkie  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Sprawdź widoczność stopki (contentinfo)
2. Sprawdź widoczność linku "Contact"
3. Sprawdź widoczność tekstu "© 2026 Rolnopol"

**Oczekiwany rezultat:** Stopka, link Contact i tekst copyright są widoczne.  
**Warunki niepowodzenia:** Brak elementów stopki.

---

### 4.28 Nawigacja do strony Contact (ze stopki)

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Niski  
**Ryzyko:** Niewielkie  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Kliknij link "Contact us" w stopce
2. Sprawdź aktualny URL

**Oczekiwany rezultat:** URL kończy się na /contact.html.  
**Warunki niepowodzenia:** URL jest inny.

---

### 4.29 Linki zewnętrzne w stopce (jaktestowac.pl, GitHub)

**Status:** ✅ Zaimplementowany (Automatyczny test E2E: alerts-page.spec.ts)  
**Priorytet:** Niski  
**Ryzyko:** Niewielkie  
**Warunki wstępne:** Użytkownik znajduje się na stronie alertów.  

**Kroki:**
1. Sprawdź atrybut href linku "jaktestowac.pl" – powinien wskazywać na https://jaktestowac.pl
2. Sprawdź atrybut href linku "GitHub Rolnopol repository" – powinien wskazywać na https://github.com/jaktestowac/rolnopol

**Oczekiwany rezultat:** Linki zewnętrzne mają poprawne atrybuty href.  
**Warunki niepowodzenia:** Atrybut href jest pusty lub niepoprawny.

## 5. Uwagi i założenia

- Dane alertów są dynamiczne i zależne od aktualnej daty serwera (pobierane z `GET /api/v1/alerts?date=...&region=...`). Dlatego testy sprawdzają spójność liczników z widocznymi kartami oraz zachowanie filtrów, a nie konkretne wartości liczbowe.
- Domyślny region to mazowieckie (PL-14). Testy filtru regionu sprawdzają zmianę liczników i reset, bez zakładania konkretnych alertów.
- Wszystkie alerty po zastosowaniu filtru są spójne z kryteriami (nasilenie, fraza), a liczniki odzwierciedlają liczbę widocznych kart.
- Linki zewnętrzne w stopce nie są klikane w testach E2E (aby uniknąć opuszczania aplikacji), weryfikowany jest jedynie atrybut `href`.
- Testy uruchamiane są w przeglądarce Google Chrome (zgodnie z konfiguracją playwright.config.ts).
- Filtry działają dynamicznie (event input/change bez przeładowania strony). Po każdej akcji filtry oczekują na stabilizację sieci (`networkidle`).
- Test "filtr High" jest pomijany (`test.skip`), jeśli w bieżącym zestawie danych nie ma alertów o nasileniu high.