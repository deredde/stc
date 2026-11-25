# StatusPath

Lo stato di un documento con un ciclo (preventivo, ordine) come percorso a frecce: passati grigi con la spunta, attuale pieno.

**Cosa passi:** `steps` (testi), `current`, `label`.

**Regole**
- Da 3 a 6 stati, sempre nello stesso ordine in tutto il prodotto.
- Uno stato fuori percorso (annullato, rifiutato) è un `Badge`, non un passo.
