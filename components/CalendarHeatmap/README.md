# CalendarHeatmap

Calendario a intensità (ingressi, attività per giorno): cinque gradini dalla scala d'accento `heat-0` … `heat-4`, settimana da lunedì, scala in fondo.

**Cosa passi:** `values` (un numero per giorno, dal lunedì della prima settimana), `levels` (se i gradini li calcoli tu, da 0 a 4), `cellTitle(valore, indice)`, `lessLabel`, `moreLabel`, `dayLabels`, `label`.

**Regole**
- Sei mesi al massimo; scorre in orizzontale su telefono.
