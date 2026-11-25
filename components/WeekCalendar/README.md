# WeekCalendar

Settimana a ore: giorni in colonna, oggi evidenziato, la linea di adesso, giorni chiusi tratteggiati.

**Cosa passi:** `days` (`label`, `num`, `today`, `closed`), `events` (`id`, `day`, `start`, `end`, `title`, `subtitle`, `status`: `default` · `live` · `past` · `cancelled`, `note` (`text`, `tone`), `lane` / `lanes` per gli eventi sovrapposti), `from` e `to` (ore), `hourHeight` (48), `now`, `selected`, `onEventClick`.

**Regole:** l'evento in corso è pieno d'accento; quelli passati incassati e grigi; gli annullati tratteggiati in rosso e barrati, con «Annullata». Una sostituzione si scrive in blu sotto il titolo.
