# Kanban

Bacheca a colonne: colonne incassate, card su superficie. La card trascinata ruota di 2° con l'ombra grande; dove cade compare la zona tratteggiata.

**Cosa passi:** `columns` (`{id, title, count, cards:[{id, title, meta, badge:{tone, label}, person}]}`), `onAdd(colonna)`, `onCardClick(id)`, `dragging` (id della card trascinata), `dropColumn`.

**Regole**
- Il trascinamento lo gestisce la pagina; la bacheca mostra gli stati.
- Su telefono le colonne scorrono in orizzontale.
