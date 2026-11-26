# PaymentCard3D

La carta segue il puntatore con un riflesso, si gira per il retro. I dati si mostrano solo a richiesta.

**Cosa passi:** `holder` (di serie GIULIA FERRI), `last4` (di serie 4821), `number` (di serie 5355 8120 6634 4821), `exp` (di serie 09/29), `cvc` (di serie 318), `network` (di serie mastercard), `finish` (di serie ink), `kind` (di serie Virtuale), `state` (di serie active), `loading`, `tilt` (di serie true).

**Quando usarlo**
- Gestione delle carte nel conto, wallet, schermata della carta virtuale.

**Quando no**
- Per scegliere un metodo nel checkout: PaymentMethod di STC, più piccolo.

**Regole**
- Numero intero e CVC solo dopo «Mostra i dati», e mai se bloccata o scaduta.
- L'inclinazione è al massimo 9° e si spegne col movimento ridotto e sul retro.
- Proporzione fissa 1,586 come le carte vere; larga al massimo 360.
- Bloccata o scaduta: velo con icona e frase, non solo il grigio.

**Stati coperti:** Attiva · Hover 3D · Dati mostrati · Retro · Bloccata · Scaduta · Caricamento.
