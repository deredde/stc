# LoadState

Cosa mostrare quando il caricamento non finisce bene: annullato o non riuscito. Prende il posto dello scheletro nella stessa forma.

**Cosa passi:** `kind` (`cancelled` · `error`), `title`, `text`, `action` (`{ label, onClick }`).

**Regole**
- `cancelled`: cosa si è fermato e cosa resta salvato («820 clienti su 1.284 sono già salvati»), con il modo per riprendere.
- `error`: cosa non si è caricato e come rimediare. Mai «Errore» da solo.
- Per una pagina intera usa `StatePage`.
