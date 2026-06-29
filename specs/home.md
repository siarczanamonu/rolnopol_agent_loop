# Plan testów: Strona domowa Rolnopol

## Cel
Zweryfikować, że strona domowa (`/`) aplikacji Rolnopol dostępnej pod `http://localhost:3000/` dla gościa (bez uwierzytelnienia):
- zwraca poprawny status HTTP i typ treści,
- renderuje kluczowe elementy marki (tytuł strony, nagłówek brandu, tagline),
- prezentuje baner hero z nagłówkiem „Welcome to Rolnopol" (H2) i opisem,
- prezentuje sekcję kluczowych statystyk farm intelligence,
- udostępnia działające linki nawigacyjne w nagłówku (`Register`, `Login`) oraz w treści (`Sign In`),
- nie zwraca błędu serwera (5xx).

## Zakres
- Funkcja: landing page `/` w roli gościa.
- Poza zakresem: logika rejestracji, logowania, dashboard, inne podstrony, sekcja `Advanced Farm Intelligence` (ukryta przez feature flag w domyślnej konfiguracji).

## Założenia
- Aplikacja jest dostępna pod `http://localhost:3000/` (baseURL z `playwright.config.ts`).
- Przeglądarka: Google Chrome (projekt `Google Chrome` w configu).
- Strona renderuje zawartość SSR/HTML, więc testy nie wymagają dodatkowego stanu.
- Statystyki są prezentowane z etykietami tekstowymi (lokalizacja nie jest częścią tego planu).
- W nagłówku dostępne są linki `Register` i `Login` prowadzące do `/register.html` i `/login.html`.
- W sekcji hero dostępny jest dodatkowy link `Sign In` prowadzący do `/login.html`.
- Sekcja „Advanced Farm Intelligence" istnieje w DOM (nagłówek H3), ale jest ukryta przez feature flag `homeStatsSectionEnabled` ustawiony na `false` — ta sekcja nie jest częścią planu.
- Nagłówek H1 brandu to „Rolnopol" w banerze; nagłówek hero „Welcome to Rolnopol" jest oznaczony jako `h2`.

## Preconditions
- Serwer deweloperski działa i odpowiada HTTP 200 na `GET /`.
- Brak aktywnej sesji zalogowanego użytkownika.
- Brak specjalnych nagłówków/cookies.

## Dane testowe
- Brak danych wrażliwych. Wykorzystywane są wyłącznie publiczne elementy strony.

## Scenariusze

### HP-01: URL strony to `http://localhost:3000/`
- Kroki:
  1. `GET /`
- Oczekiwany rezultat: aktualny URL to dokładnie `http://localhost:3000/`. Status 200 i `Content-Type: text/html` są weryfikowane we `beforeEach`.

### HP-02: Tytuł strony to „Rolnopol"
- Kroki:
  1. `GET /`
- Oczekiwany rezultat: `page.title()` jest dokładnie „Rolnopol".

### HP-03: Nagłówek hero „Welcome to Rolnopol" (H2) jest widoczny
- Kroki:
  1. `GET /`
- Oczekiwany rezultat: istnieje nagłówek `h2` z dokładnym tekstem „Welcome to Rolnopol" i jest widoczny.

### HP-04: Tagline „Futuristic Farm & Resource Management" jest widoczny
- Kroki:
  1. `GET /`
- Oczekiwany rezultat: tekst tagline jest widoczny na stronie.

### HP-05: Sekcja kluczowych statystyk farm intelligence jest widoczna
- Kroki:
  1. `GET /`
- Oczekiwany rezultat: widoczne są etykiety: `Active Users`, `Managed Farms`, `Total Area (ha)`, `Total Staff`, `Stock Animals`.

### HP-06: Link „Register" w nagłówku prowadzi do `/register.html`
- Kroki:
  1. `GET /`
  2. Kliknij pierwszy link „Register" w nawigacji.
- Oczekiwany rezultat: URL po nawigacji kończy się na `/register.html`, brak błędu serwera.

### HP-07: Link „Login" w nagłówku prowadzi do `/login.html`
- Kroki:
  1. `GET /`
  2. Kliknij pierwszy link „Login" w nawigacji.
- Oczekiwany rezultat: URL po nawigacji kończy się na `/login.html`, brak błędu serwera.

### HP-08: Link „Sign In" w sekcji hero prowadzi do `/login.html`
- Kroki:
  1. `GET /`
  2. Kliknij link „Sign In" w sekcji hero (CTA).
- Oczekiwany rezultat: URL po nawigacji kończy się na `/login.html`, brak błędu serwera.

### HP-09: Link „Contact" w stopce prowadzi do `/contact.html`
- Kroki:
  1. `GET /`
  2. Kliknij link „Contact" w stopce.
- Oczekiwany rezultat: URL po nawigacji kończy się na `/contact.html`, brak błędu serwera.

## Notatki automatyzacyjne
- Bazowy URL: `http://localhost:3000` (z `playwright.config.ts`).
- Test uruchamiany w projekcie `Google Chrome`.
- `beforeEach` wykonuje `page.goto('/')` i asercję statusu `200`.
- Lokatory preferowane: `getByRole('heading', { level: 1/2, name: '...' })`, `getByRole('link', { name: '...' })`, `getByText('...')` dla etykiet statystyk.
- Linki nawigacyjne w nagłówku wybierane przez `.first()` (nagłówek ma wyższy priorytet w drzewie dostępności niż ewentualne duplikaty).
- Asercje URL sprawdzane wyraźnie (porównanie końcówki), bez wyrażeń regularnych tam, gdzie nie są potrzebne.
- Brak użycia `waitForTimeout()` — asercje są implicit / auto-retrying.
- Brak twardych retry — konfiguracja pozwala na `retries: 2` tylko na CI.

## Handoff do implementacji
- Plik testu: `tests/home.spec.ts`.
- Konwencja mapowania: nazwy `test()` odpowiadają identyfikatorom HP-01…HP-09.
- `describe('Home page')` jako kontener dla wszystkich przypadków.
- Współdzielony `beforeEach` nawigujący na `/` i sprawdzający status 200 — eliminuje duplikację nawigacji.
- Nie dodawać `seed.spec.ts` — projekt nie ma takiej konwencji.
- Usunąć `tests/_probe.spec.ts` — to artefakt debugowania, nie test docelowy.
