# TimePicker

Ora: si scrive («930» diventa 09:30) o si sceglie da una lista a passi di 15 minuti. `TimeRangePicker` per le fasce.

**Cosa passi:** `TimePicker`: `value` (`hh:mm`), `onChange`, `step` (15), `from` (5) e `to` (24) in ore, `size`, `width`. `TimeRangePicker`: `value` `{ from, to }`, `onChange`, stesse opzioni. Utilità: `leggiOra`.

**Regole:** la seconda colonna della fascia accetta solo ore dopo la prima. Orari sempre in mono.
