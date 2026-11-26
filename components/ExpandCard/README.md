# ExpandCard

Una scheda nella lista si apre a tutto schermo partendo dal punto in cui si trova, senza cambio di pagina. Si chiude con la X, con Esc o trascinando giù.

**Cosa passi:** `cards`.

**Quando usarlo**
- Racconti e approfondimenti in un'app: corso del giorno, articolo, offerta.

**Quando no**
- Dettagli da confrontare tra loro: meglio una pagina normale.
- Liste fitte di righe piccole.

**Regole**
- La scheda parte esattamente da dove è nella lista e ci torna chiudendo.
- Si chiude con la X, con Esc o trascinando giù oltre 110 px.
- Trascinando la scheda si rimpicciolisce un poco, per far capire che si chiude.
- Il focus va sulla X all'apertura e torna sulla scheda alla chiusura.
- Il testo entra dopo l'apertura, non durante.
- Con movimento ridotto si apre e chiude senza animazione.

**Stati coperti:** Lista · In apertura · Aperta · Trascinata · In chiusura · Testo lungo.
