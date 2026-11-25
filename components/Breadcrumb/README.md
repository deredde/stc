# Breadcrumb

Percorso per le schede a più livelli, al posto di «‹ Indietro». L'ultimo livello non si clicca.

**Cosa passi:** `items` (testi o `{label, onClick, href}`), `max` (4: oltre, i livelli in mezzo diventano «…»), `label`.

**Regole**
- Sta sopra il titolo, dentro `RichPageHeader` (`crumbs`).
- Su telefono usa `BackLink` o la freccia di `MobileHeader`.
