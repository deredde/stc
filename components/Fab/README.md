# Fab

Bottone fluttuante in accento per l'azione principale su telefono, e `CtaBar`, la barra in fondo con il totale e il bottone.

**Cosa passi:** `Fab`: `icon`, `label`, `onClick`, `withBottomNav` (sta sopra la `BottomNav`). `CtaBar`: `total` (`{label, value}`), `children` (il bottone), `inline` (`false` per fissarla in fondo allo schermo).

**Regole**
- Il FAB solo dove la barra in basso non ha già l'azione al centro.
- La barra in fondo tiene un solo bottone primario, a tutta larghezza.
