# FilterMenu

Bottone di filtro della barra sopra una lista: apre una tendina a scelta singola o multipla.

**Cosa passi:** `label`, `options` (`value`, `label`, `count`, `dot`), `value` (stringa, o elenco con `multiple`), `onChange`, `multiple`, `note` (una riga in fondo), `allLabel` («Tutti»).

**Regole**
- Attivo: bordo d'inchiostro, fondo grigio e, se multiplo, il numero dei valori scelti.
- Accanto a ogni voce il numero di risultati, se lo sai.
- Ogni filtro attivo compare anche come `Chip` da togliere sotto la barra.
- Un bottone con la freccia apre sempre una tendina: un interruttore non ha la freccia (usa `Chip` o `Switch`).
