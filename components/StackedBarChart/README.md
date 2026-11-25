# StackedBarChart

Barre impilate per confrontare parti nel tempo (per sede, per canale): fino a 3 serie, 2 px d'aria tra i pezzi, il totale sopra in mono.

**Cosa passi:** `categories`, `series` (`{name, values, color}`), `height`, `format`, `label`, `showTotals`.

**Regole**
- La legenda sopra, con `ChartHeader`.
- Più di 3 serie si leggono male: raggruppa.
