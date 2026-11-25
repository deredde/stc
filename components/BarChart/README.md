# BarChart

Colonne a una serie: barre d'inchiostro, quella da notare in accento, griglia leggera e tooltip al passaggio.

**Cosa passi:** `data` (`label`, `value`, `highlight`, `note`), `height` (200), `format`, `ticks`, `label` (titolo per lo screen reader; i dati sono anche in una tabella nascosta).

**Regole:** una sola serie, un solo asse. Una barra in evidenza al massimo: quella che il titolo racconta. Le barre crescono all'ingresso in 300 ms. Per confrontare più serie usa più grafici piccoli.
