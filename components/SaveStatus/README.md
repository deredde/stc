# SaveStatus

Lo stato dell'autosalvataggio nella testata di una scheda: «Salvo», poi «Salvato · 12:04».

**Cosa passi:** `state` (`saving` · `saved` · `error`), `time` (hh:mm), `savingLabel`, `savedLabel`, `errorLabel`.

**Regole**
- STC salva da solo: nessun bottone Salva. Questo è il solo segno che il salvataggio è avvenuto, oltre al toast per le azioni grandi.
- In errore il testo dice che riprova; se non riesce, compare un `Alert` nella scheda.
