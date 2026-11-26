# OrderConfirmed

La pagina dopo il pagamento: conferma chiara, numero da copiare, quando arriva e cosa fare adesso.

**Cosa passi:** `number` (di serie A-20418), `email` (di serie giulia@esempio.it), `eta`, `guest` (di serie true), `lines`, `total`.

**Quando usarlo**
- Subito dopo un pagamento andato a buon fine.

**Quando no**
- Pagamenti ancora in attesa: lì c'è l'attesa della banca (130).

**Regole**
- Il segno di conferma si disegna una volta; con movimento ridotto è fermo.
- Numero d'ordine copiabile e email a cui è arrivata la ricevuta, scritta per intero.
- Le tappe dicono la data di consegna prevista in giorni veri.
- Un solo primario: «Segui l'ordine».
- L'invito a creare l'account solo per gli ospiti, dopo il resto.

**Stati coperti:** Ospite · Con account · Numero copiato · Email lunga · Movimento ridotto.
