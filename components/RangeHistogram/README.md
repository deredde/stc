# RangeHistogram

Due cursori sopra le barre che dicono dove stanno i risultati. Si trascina, si usano le frecce o si scrive la cifra.

**Cosa passi:** `data`, `min` (di serie 0), `max` (di serie 100), `step` (di serie 1), `defaultValue`, `unit` (di serie €), `label` (di serie Prezzo), `countLabel` (di serie prodotti), `loading`.

**Quando usarlo**
- Prezzi, durate, distanze, superfici: numeri con tanti valori diversi.

**Quando no**
- Pochi valori (1–5 stelle, taglie): meglio scelte separate.

**Regole**
- Da 12 a 40 barre; le barre dentro l'intervallo sono piene, le altre grigie.
- I cursori non si incrociano: tra i due resta almeno un passo.
- Frecce: un passo. Pagina su e giù: dieci. Inizio e Fine: agli estremi.
- Le cifre scritte valgono all'uscita dal campo o con Invio; minimo più alto del massimo è un errore detto in parole.
- L'ultimo valore ha il «+»: tutto quello che sta sopra.

**Stati coperti:** Tutto · Ristretto · Trascinamento · Focus · Errore · Caricamento.
