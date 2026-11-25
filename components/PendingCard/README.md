# PendingCard

Un'azione importante in corso che non va interrotta: un pagamento o un invio.

**Cosa passi:** `kind` (`payment` · `email`), `amount` (per il pagamento, «€ 1.240,00»), `title`, `text`.

**Regole**
- `payment`: card di vetro sopra la pagina, l'importo in vista, «Non chiudere la pagina». Niente Annulla.
- `email`: l'aeroplanino nella tessera di vetro; alla fine si passa all'illustrazione «Email inviata».
- In un `Dialog` in attesa la rotella sta nel bottone di conferma (`Button loading`), Annulla si spegne, Esc e il velo non chiudono.
