# TopNav

Barra di navigazione in alto, per prodotti con 3–5 sezioni e senza cambio di sede. Stessa pastiglia della barra laterale.

**Cosa passi:** `brand` (il `Wordmark` o il nome), `items` (`{id, label, icon}`), `active`, `onNavigate(id)`, `right` (ricerca, notifiche, avatar), `label`.

**Regole**
- Con più di 5 sezioni o più sedi usa `Sidebar`.
- Su telefono diventa `BottomNav`.
