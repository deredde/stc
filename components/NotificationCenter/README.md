# NotificationCenter

Pannello delle notifiche dalla campanella: pallino d'accento sulle nuove, gruppi per giorno, ore in mono, icona per tipo.

**Cosa passi:** `items` (`{id, icon, tone, text, time, isNew, group, onClick}`), `tabs`, `tab`, `onTabChange`, `onMarkAllRead`, `footer`, `emptyText`. Va dentro un `Popover` aperto da `IconButton` con `badge`.

**Regole**
- Il testo dice chi e cosa, con il nome in grassetto.
- In fondo, il link alle preferenze (`NotificationMatrix`).
