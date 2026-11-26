# PromoBar

Una striscia in cima alla pagina per un'offerta a tempo: cosa, fino a quando, il codice da copiare e dove andare.

**Cosa passi:** `tone` (di serie accent), `badge`, `text`, `short`, `code`, `seconds`, `cta`, `onDismiss`, `dismissible` (di serie true), `endedText`.

**Quando usarlo**
- Offerte vere a tempo, sconti stagionali, spedizione gratis per un giorno.
- In cima a tutte le pagine pubbliche e al negozio.

**Quando no**
- Avvisi di servizio o problemi: per quelli c'è il Banner di STC.
- Urgenza finta: se l'offerta non finisce davvero, niente conto alla rovescia.

**Regole**
- Una sola barra per pagina, alta 44, sopra l'intestazione.
- Al massimo: etichetta, una frase, il timer, un codice e un link. Su telefono la frase corta.
- Il codice si copia con un tocco e dice «Codice copiato».
- Sotto l'ora compare «Ultima ora»; allo zero la barra dice che è finita e toglie codice e link.
- Chiusa, non torna per 24 ore.

**Stati coperti:** Attiva · Ultima ora · Codice copiato · Finita · Chiusa · Telefono · Movimento ridotto.
