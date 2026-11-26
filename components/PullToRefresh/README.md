# PullToRefresh

Su telefono si tira giù la lista dall'alto: la freccia gira, a metà dice «Rilascia», poi aggiorna e le notizie nuove entrano in cima evidenziate.

**Cosa passi:** `items`, `fresh`, `fail` (di serie false), `height` (di serie 520).

**Quando usarlo**
- Liste che cambiano spesso su telefono: notizie, messaggi, ordini.

**Quando no**
- Desktop come unico modo: serve sempre anche il bottone «Aggiorna».
- Pagine che si aggiornano da sole in tempo reale.

**Regole**
- Parte solo se la lista è già in cima.
- Soglia a 72 px: prima dice «Tira», dopo «Rilascia», con una vibrazione.
- Il tiro rallenta man mano, come un elastico; massimo 130 px.
- Le notizie nuove entrano in cima con un colore che sfuma in due secondi.
- Senza rete lo dice, tiene le notizie vecchie e offre «Riprova».
- C'è sempre il bottone in alto per chi non può trascinare.

**Stati coperti:** Riposo · Tirando · Pronto · Aggiornamento · Aggiornato · Nuove · Senza rete.
