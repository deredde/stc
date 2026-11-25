# ExpandableTable

Tabella con le righe che si aprono sul dettaglio, i totali in fondo e la densità compatta. Per righe d'ordine, movimenti, voci di fattura.

**Cosa passi:** `columns` (`{key, label, align:'right', mono, width, render}`), `rows`, `rowKey` ('id'), `renderDetail(riga)`, `footer` (`{chiave: valore}`), `density` (`comfortable` · `compact`), `expanded` / `defaultExpanded`, `onExpandedChange`, `label`.

**Regole**
- La freccia apre il dettaglio sotto la riga, non la scheda.
- Totali su fondo incassato, in mono a destra.
- Compatta: righe da 36. Per le liste con selezione e ordinamento resta `Table`.
