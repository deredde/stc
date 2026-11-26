# PersonCard

Per squadre, rubriche, staff e utenti. Dice chi è, se c'è, e come raggiungerla.

**Cosa passi:** `variant` (di serie card), `name`, `role`, `team`, `email`, `phone`, `presence` (di serie online), `until`, `tags`, `src`, `loading`, `me`.

**Quando usarlo**
- Pagine squadra, rubrica, scelta di un referente.

**Quando no**
- Nelle tabelle: lì c'è la cella persona di STC.
- Per i profili completi: è una pagina, non una card.

**Regole**
- Presenza sempre con pallino, testo e, se serve, la data di rientro.
- Al massimo 3 etichette, poi +N. Al massimo 3 azioni, tutte icone con tooltip.
- Un contatto che manca resta visibile ma spento, e il tooltip dice perché.
- La propria card ha l'etichetta «tu».

**Stati coperti:** Online · Occupata · Assente · In ferie fino al · Disattivata · Contatti mancanti · Caricamento.
