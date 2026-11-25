# RadioCards

Scelta singola fatta di card: tutta la card si clicca, la scelta prende il bordo primario. Per piani, metodi, opzioni con una spiegazione o un prezzo.

**Cosa passi:** `options` (`{value, title, description, side, sideNote, badge, icon, disabled}`), `value` / `defaultValue`, `onChange`, `label`, `columns` (per affiancarle).

**Regole**
- Il prezzo sta a destra (`side`), in mono; `sideNote` sotto in piccolo.
- Una card disabilitata dice perché nella descrizione.
- Da 2 a 5 card. Di più: `Select` o `RadioGroup`.
