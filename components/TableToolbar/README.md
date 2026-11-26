# TableToolbar

Ricerca, filtri, vista e strumenti sopra una tabella. Quando selezioni delle righe diventa la barra delle azioni.

**Cosa passi:** `rows`, `loading`.

**Quando usarlo**
- Sopra ogni tabella con più di 20 righe o con azioni su più righe.

**Quando no**
- Tabelle corte di sola lettura: basta il titolo.

**Regole**
- Ordine fisso: ricerca, filtri, spazio, vista e strumenti.
- Con righe scelte la barra cambia colore e mostra numero, azioni e «Annulla»; l'azione che distrugge è rossa e chiede conferma.
- Strumenti solo con icona e nome nel suggerimento.
- Sotto 860 px: ricerca larga, chip sotto che scorrono, strumenti nel menu «Altre azioni».
- Nessun risultato: dice perché e offre «Togli i filtri».

**Stati coperti:** Normale · Con filtro · Righe scelte · Tutte scelte · Parziale · Vista a schede · Compatta · Vuoto · Caricamento.
