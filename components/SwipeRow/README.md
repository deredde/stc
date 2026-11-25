# SwipeRow

Riga che si trascina verso sinistra per scoprire una o due azioni.

**Cosa passi:** `actions` (`{label, icon, tone, onClick}`, `tone`: `success` · `neutral` · `danger` · `accent`), `children` (la riga), `defaultOpen`.

**Regole**
- Al massimo due azioni; le stesse devono esserci nel menu della riga.
- Un trascinamento non apre la riga.
