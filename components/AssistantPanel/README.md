# AssistantPanel

L'assistente di lato, che sa cosa stai guardando. Parte con tre suggerimenti, risponde scrivendo e si ferma quando vuoi.

**Cosa passi:** `context` (di serie Fatture di novembre), `suggestions`, `defaultMessages`.

**Quando usarlo**
- App con dati propri dove una domanda in parole fa prima dei filtri.

**Quando no**
- Come unico modo per fare un'azione: ogni cosa resta possibile anche senza assistente.

**Regole**
- Largo fino a 400 px, di lato; su telefono a tutto schermo.
- Il contesto («Sta guardando: …») si vede e si toglie.
- Tre suggerimenti al massimo, legati alla pagina.
- Invio invia, Maiusc+Invio va a capo; durante la risposta il bottone diventa «Ferma».
- Non fa azioni senza chiedere conferma, e lo dice all'inizio.

**Stati coperti:** Vuoto · Suggerimenti · Scrive · Fermato · Conversazione · Senza contesto.
