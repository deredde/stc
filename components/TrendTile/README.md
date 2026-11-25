# TrendTile

Tessera numerica con la variazione e la linea piccola, oppure con l'obiettivo e la barra.

**Cosa passi:** `title`, `value`, `delta` (per `Delta`), `flat`, `data` (i punti della `Sparkline`), `note` («rispetto a ottobre»), `goal` (`{value, max, of}`: la barra e «/ 25.000»), `accent`.

**Regole**
- La linea è in accento solo se il numero sale.
- Le tessere stanno in una griglia da 3 o 4, con la stessa altezza.
- Senza andamento resta `StatTile`.
