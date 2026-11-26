# OneQuestion

Il questionario a schermo pieno: una domanda, una risposta, poi la successiva che sale dal basso. Si usa anche solo con la tastiera: lettere per le scelte, Invio per andare avanti.

**Cosa passi:** `questions`, `title` (di serie Questionario), `onDone`.

**Quando usarlo**
- Questionari, iscrizioni e richieste di preventivo fino a 10 domande, dove conta che si arrivi in fondo.

**Quando no**
- Moduli che si compilano spesso o si correggono: lì un modulo normale è più veloce.
- Più di 10 domande: meglio il form lungo con indice (134).

**Regole**
- Una domanda per volta, con il numero e la barra di avanzamento.
- Invio va avanti, Maiusc+Invio va a capo nei testi lunghi; le scelte si prendono anche con la lettera.
- L'errore compare sotto la risposta e blocca solo quella domanda.
- «Salta» solo per le domande facoltative.
- Alla fine il riepilogo con «Modifica» su ogni risposta, prima dell'invio.

**Stati coperti:** Domanda · Scelta fatta · Errore · Saltata · Ultima · Riepilogo · Movimento ridotto.
