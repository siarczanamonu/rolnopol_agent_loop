---
trigger: always_on
---

1. Do komunikacji z urzytkownikiem używaj zawsze języka polskiego
2. Jeżeli nie zostaniesz o to poproszony to nie planuj lub implemetuj testów: wydajnościowych, backendowych, bezpieczeństwa 


Struktura projektu:

- w pliku auth.json znajdują się dane do logowania. Jeśli plik auth.json nie istnieje, jest pusty lub zawiera nieprawidłowe dane logowania, nie zgaduj danych i poproś użytkownika o poprawny plik; nie zapisuj danych logowania w repozytorium ani w logach. Jeśli auth.json jest uszkodzony składniowo, nieczytelny lub nie zawiera wymaganych pól, traktuj go jako nieprawidłowy plik i poproś użytkownika o poprawny plik bez zgadywania.

Narzędzia:
- używaj skill playwright-cli do przeglądnia stron internetowych. Jeśli skill playwright-cli nie działa, nie można otworzyć strony lub nie można znaleźć selektora, nie zgaduj; poinformuj użytkownika o błędzie, podaj co konkretnie nie działa, i poproś o alternatywny adres strony, dostęp lub poprawny selektor.
- użyj faker do generowania danych testowych
