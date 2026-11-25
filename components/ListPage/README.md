# ListPage

Pagina di elenco: testata, barra con ricerca e filtri, filtri applicati con «Azzera», la tabella che riempie il resto.

**Cosa passi:** `header` (props di `PageHeader`), `search` (`value`, `onChange`, `placeholder`, `shortcut`), `filters` (`FilterMenu`, `DateRangePicker`), `chips` (`Chip` con `onRemove`), `onClearFilters`, `count` («37 clienti»), `banner`, `children` (di solito `Table`).

**Regole:** ricerca larga 360 a sinistra, i filtri accanto. La riga dei filtri applicati compare solo se ce n'è almeno uno. Su telefono la ricerca prende la larghezza e i filtri scorrono.
