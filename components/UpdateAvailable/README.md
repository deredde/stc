# UpdateAvailable

Dice che c'è una versione nuova, cosa cambia, e aggiorna senza far perdere il lavoro.

**Cosa passi:** `variant` (di serie toast), `version` (di serie 4.2), `notes`, `state` (di serie ready), `critical`, `seconds` (di serie 60).

**Quando usarlo**
- App web e da scaricare quando esce una versione nuova mentre la persona lavora.

**Quando no**
- Per raccontare le novità a chi non deve aggiornare: Registro delle novità.

**Regole**
- Mai ricaricare da soli, tranne negli aggiornamenti di sicurezza, che danno almeno 30 secondi e lo dicono.
- Il lavoro aperto si salva prima di ricaricare, e lo si dice.
- Al massimo 3 novità nell'elenco breve, il resto nel registro.
- «Più tardi» lo ripropone il giorno dopo.

**Stati coperti:** Disponibile · Novità aperte · Scarica · Pronto · Errore · Importante · Più tardi.
