# TransactionList

Movimenti raggruppati per giorno, con il totale del giorno. Una riga si apre per il dettaglio e le azioni.

**Cosa passi:** `groups`, `loading`, `empty`, `variant` (di serie card).

**Quando usarlo**
- Estratti conto, pagamenti, storico ordini e rimborsi.

**Quando no**
- Quando servono filtri e colonne: DataTable.

**Regole**
- Entrate in verde con +, uscite senza colore con −; importi in mono a destra.
- Stato a vista solo se non è «Pagato»: sempre badge con icona.
- Un pagamento rifiutato è barrato e non entra nel totale del giorno.
- Una riga aperta alla volta. Nel dettaglio al massimo tre azioni: Ricevuta, Chiedi rimborso o Riprova.

**Stati coperti:** Pagato · In attesa · Rifiutato · Rimborsato · Programmato · Aperta · Vuoto · Caricamento.
