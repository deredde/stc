# VerticalStepper

Passi in verticale per le configurazioni con una spiegazione per passo. Il passo attuale mostra i suoi bottoni, gli altri solo il titolo.

**Cosa passi:** `steps` (`{title, description, content, done}`), `current`.

**Regole**
- `content` compare solo nel passo attuale: di solito l'azione primaria e «Lo faccio dopo».
- I passi si possono fare in ordine sparso: `done` per segnare quelli fatti.
