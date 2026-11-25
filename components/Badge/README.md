# Badge

Lo stato di qualcosa in una o due parole: tinta, bordo e icona, mai il solo colore.

**Cosa passi:** `tone` (`success` · `danger` · `warning` · `info` · `neutral` · `accent`), `children`, `icon` (di serie l'icona dello stato in `md`; una stringa per sceglierne un'altra; `false` per toglierla), `size` (`md` 24 · `sm` 22, senza icona, per le tabelle).

**Regole**
- `success` va bene, `danger` blocca, `warning` chiede attenzione, `info` informa, `neutral` è sospeso o archiviato.
- `accent` («Nuovo») è un richiamo, non uno stato.
- Il giallo, l'arancio e il rosso non si usano per decorare: dicono sempre qualcosa.
