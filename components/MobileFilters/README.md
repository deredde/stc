# MobileFilters

Un bottone «Filtri» con il numero e un foglio dal basso. Il bottone in fondo dice quanti risultati vedrai prima di confermare.

**Cosa passi:** `groups`, `sorts`, `total` (di serie 0), `defaultOpen` (di serie false), `defaultValue`, `items`.

**Quando usarlo**
- Ogni elenco filtrabile su telefono; anche su computer sotto i 720 px.

**Quando no**
- Un solo filtro: basta la riga di chip.

**Regole**
- Il bottone «Filtri» porta il numero dei filtri applicati; «Ordina» sta accanto, separato.
- Nel foglio le scelte sono una bozza: valgono solo con «Mostra N risultati». «Annulla» e il velo le buttano.
- Il bottone in fondo conta i risultati mentre scegli; a zero lo dice e si spegne.
- Il foglio arriva all'86% dello schermo, la maniglia in cima, il fondo resta sopra la tastiera e la barra di sistema.
- Esc chiude.

**Stati coperti:** Chiuso · Con filtri · Aperto · Conteggio · Zero risultati · Azzera · Movimento ridotto.
