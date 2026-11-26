# ChatForm

Le stesse domande di un modulo, ma come una chat: l'assistente chiede, tu rispondi scrivendo o con i bottoni rapidi. Ogni risposta si può correggere.

**Cosa passi:** `steps`, `bot` (di serie Assistente), `onDone`.

**Quando usarlo**
- Contatti, prime richieste e assistenza, dove il tono conta più della velocità.

**Quando no**
- Dati lunghi o delicati (documenti, pagamenti): lì serve un modulo vero.
- Quando chi compila deve vedere tutte le domande prima di iniziare.

**Regole**
- Al massimo sei domande; le scelte diventano bottoni rapidi sotto, mai un elenco da scrivere.
- Il segnale «sta scrivendo» dura meno di un secondo; con movimento ridotto non c'è.
- Ogni risposta ha «Modifica»; dopo la modifica si riprende da dove si era.
- Prima di inviare, il riepilogo con tutte le risposte e un solo bottone primario.

**Stati coperti:** Sta scrivendo · Domanda · Risposte rapide · Errore · Modifica · Riepilogo · Inviato.
