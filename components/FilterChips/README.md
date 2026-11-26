# FilterChips

Una riga di chip che si accendono e dicono quanti risultati danno. Scorre se non ci sta.

**Cosa passi:** `options`, `multiple` (di serie true), `value`, `defaultValue`, `onChange`, `allLabel` (di serie Tutti), `total`, `loading`, `label` (di serie Filtra).

**Quando usarlo**
- Elenchi e negozi con una dimensione principale da filtrare: categoria, stato, tipo.
- Sopra la tabella o la griglia, sotto il titolo.

**Quando no**
- Più dimensioni insieme: serve il pannello a faccette.
- Navigazione tra pagine: per quella ci sono le schede.

**Regole**
- «Tutti» sempre per primo; acceso quando nessun altro lo è.
- Il conteggio dice quanti risultati si ottengono, ed è aggiornato.
- A zero: tratteggiato e non cliccabile, ma visibile.
- Scelta multipla: con due o più accesi compare «Azzera».
- Se la riga non ci sta: sfuma ai bordi e compaiono le frecce; su telefono si scorre col dito.

**Stati coperti:** Spento · Acceso · Passaggio · Focus · A zero · Conteggi in arrivo · Scorrimento · Telefono.
