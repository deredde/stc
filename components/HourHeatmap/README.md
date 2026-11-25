# HourHeatmap

Mappa giorno × ora (quando c'è più gente, quando arrivano gli ordini): stessi gradini del calendario, ore in mono ogni due.

**Cosa passi:** `rows` (`{label, values}`), `columns` (le ore), `cellTitle(riga, colonna, valore)`, `lessLabel`, `moreLabel`, `label`.

**Regole**
- I gradini si calcolano sul valore più alto della mappa.
