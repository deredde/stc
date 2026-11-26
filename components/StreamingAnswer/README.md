# StreamingAnswer

La risposta di un assistente che compare mentre viene scritta, con le fonti numerate, il bottone per fermarla e le azioni alla fine.

**Cosa passi:** `question`, `answer`, `sources`, `state` (di serie live).

**Quando usarlo**
- Ogni risposta scritta da un modello, in chat o in un pannello.

**Quando no**
- Testi brevi e sicuri (etichette, conferme): non serve l'effetto di scrittura.

**Regole**
- Il cursore lampeggia solo mentre scrive; con movimento ridotto il testo compare tutto insieme.
- «Ferma» sempre visibile durante la scrittura; fermata, lo dice e offre «Continua».
- Le fonti sono numerate nel testo e sotto; il numero porta alla fonte.
- Le azioni (copia, rigenera, utile) solo a risposta finita.
- L'errore dice che la domanda è salva e offre «Riprova».
- Sempre la nota: può contenere errori.

**Stati coperti:** Cerca · Scrive · Interrotta · Finita · Errore · Copiata · Giudicata.
