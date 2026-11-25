# IconButton

Bottone con la sola icona, per comandi che tutti riconoscono (⋮, chiudi, modifica, filtri).

**Cosa passi:** `icon`, `label` (obbligatoria: è il nome per lo screen reader e il tooltip), `variant` (`ghost` di serie · `outline` · `primary` · `accent`), `size` (`row` · `card` · `form` · `header`), `badge` (contatore in alto a destra).

**Regole**
- Se l'icona non è ovvia, usa `Button` con l'etichetta.
- `ghost` nelle righe e nelle testate dei pannelli; `outline` accanto ai campi e nelle barre degli strumenti.
- `badge` solo per un numero che conta (filtri attivi), mai per decorare.
