# Alert

Avviso dentro la pagina: un titolo, una frase, al massimo un'azione.

**Cosa passi:** `tone` (`success` · `danger` · `warning` · `info` · `neutral`), `title`, `children` (la frase), `action` (di solito un `TextLink`), `icon`, `onClose`.

**Regole**
- Il titolo dice cosa succede («Ordine bloccato»), la frase perché e cosa fare.
- Sta in cima a ciò che riguarda (la scheda, il modulo), non in fondo.
- Per ciò che riguarda tutto il gestionale usa `Banner`; per un esito che passa usa `Toast`.
