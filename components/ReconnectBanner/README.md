# ReconnectBanner

Banner arancio in cima alla pagina quando la connessione cade, con il conto alla rovescia del prossimo tentativo. `StaleBadge` è la pillola neutra che segna dati vecchi.

**Cosa passi:** `ReconnectBanner`: `title`, `seconds`. `StaleBadge`: `label` («Dati delle»), `time` (hh:mm).

**Regole**
- Il banner sparisce da solo quando la rete torna, con il toast «Connessione tornata».
- Offline si mostra l'ultimo dato salvato con `StaleBadge` accanto al titolo della card: non è un errore, è un dato vecchio.
