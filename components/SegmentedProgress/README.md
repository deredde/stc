# SegmentedProgress

Avanzamento a segmenti per le cose che si contano (documenti caricati, passi fatti) e `StackedProgress`, la barra impilata per le parti di un totale, con la legenda.

**Cosa passi:** `SegmentedProgress`: `value`, `total`, `label`, `showValue`. `StackedProgress`: `parts` (`{label, value, color}`), `label`, `total`, `legend`, `format`.

**Regole**
- Segmenti fino a 10; oltre usa `ProgressBar`.
- Impilata: al massimo 4 parti.
