# DetailPage

Pagina di dettaglio: indietro, avatar e titolo con lo stato, comandi, tab; sotto, colonna principale e colonna laterale da 360.

**Cosa passi:** `header` (props di `PageHeader` con `back`, `avatar`, `badge`, `tabs`), `children` (la colonna principale), `aside` (la colonna laterale).

**Regole:** in cima alla colonna principale ciò che blocca (un `Alert`), poi i numeri (`StatTile`), poi le liste. La colonna laterale per contatti, note e dati che si consultano. Su telefono le colonne si impilano.
