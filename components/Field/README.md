# Field

Il contenitore di ogni campo: etichetta sopra in frase, aiuto o errore sotto, contatore a destra.

**Cosa passi:** `label`, `help`, `error`, `optional` (aggiunge «(facoltativo)»), `required`, `counter` (`value`, `max`), `disabled`, `inline`, e il controllo come figlio. `Field` collega da solo etichetta, aiuto ed errore al controllo.

**Regole**
- Etichetta in frase, senza due punti: «Data di nascita».
- L'errore dice come rimediare: «Manca la parte dopo la @», non «Campo non valido».
- Si segna il facoltativo, non l'obbligatorio.
- Si salva subito, senza «Salva», tranne quando si crea qualcosa di nuovo.
