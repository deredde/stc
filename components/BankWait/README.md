# BankWait

Quando la banca chiede la conferma nella sua app: cosa fare, quanto tempo resta, e cosa succede se va male.

**Cosa passi:** `state` (di serie wait), `amount` (di serie 8930), `seconds` (di serie 300), `method` (di serie Carta •••• 4242), `bank` (di serie la tua banca).

**Quando usarlo**
- Tra «Paga» e la conferma, quando la banca chiede l'approvazione.

**Quando no**
- Attese brevi senza azione della persona: basta il bottone che carica.

**Regole**
- Dice cosa fare (aprire l'app della banca), quanto manca, e di non chiudere la pagina.
- Le tappe mostrano a che punto si è; il cerchio gira lento, fermo con movimento ridotto.
- «Rimanda la notifica» e «Annulla il pagamento» sempre a portata.
- Rifiutato o scaduto: dice che non è stato addebitato nulla e offre «Riprova» e un altro metodo.
- Approvato: passa da solo alla conferma.

**Stati coperti:** In attesa · Approvato · Rifiutato · Scaduto · Movimento ridotto.
