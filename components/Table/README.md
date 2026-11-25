# Table

La tabella vive su una card: testata incassata, righe da 56, hover, ordinamento, selezione con le caselle che non aprono la riga.

**Cosa passi:** `columns` (`key`, `label`, `width` CSS grid, `align`, `sortable`, `render`, `mono`, `hideOnMobile`), `rows`, `rowKey`, `onRowClick`, `selectable` / `selected` / `onSelect`, `sort` / `onSort`, `actions(riga)` e `actionsWidth`, `toolbar` (`CardToolbar`), `footer` (`Pagination`), `empty` (di serie un vuoto con l'illustrazione `folder-empty`; passa il tuo quando sai cosa manca), `loading`, `rowTone`, `density`, `maxHeight`. Celle pronte: `CellPerson`. Sopra le righe scelte: `SelectionBar`.

**Regole**
- Al massimo due azioni a vista per riga, il resto nel menu ⋮; le azioni non aprono la riga.
- Numeri, date e codici in mono; importi allineati a destra.
- La prima colonna è la più larga e dice cos'è la riga (avatar, nome, codice sotto).
- Le intestazioni ordinabili mostrano la freccia appena, piena al passaggio.
- La testata resta in cima mentre si scorre.
- Senza righe non resta mai bianca: di serie compare il vuoto con l'illustrazione. Scrivi il tuo titolo appena sai cosa manca («Nessun cliente ancora»).
