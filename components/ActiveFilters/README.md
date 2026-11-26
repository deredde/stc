# ActiveFilters

Sopra i risultati: quanti sono, per cosa, e i filtri come chip da togliere. Si può sempre ripristinare.

**Cosa passi:** `filters`, `total` (di serie 0), `query`, `max` (di serie 4), `zeroHint`.

**Quando usarlo**
- Sopra ogni elenco filtrato, insieme a chip, faccette o ricerca.

**Quando no**
- Senza filtri attivi: si mostra solo il numero dei risultati.

**Regole**
- Ogni chip dice gruppo e valore («Taglia: 42»).
- Oltre quattro chip: «+N altri» li apre tutti.
- Togliere un filtro o tutti mostra «Ripristina» per 6 secondi.
- A zero risultati suggerisce il filtro da togliere e quanti risultati darebbe.
- La ricerca scritta compare tra virgolette, non come chip.

**Stati coperti:** Con filtri · Molti filtri · Aperti tutti · Ripristina · Zero risultati.
