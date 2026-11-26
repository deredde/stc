# ProductCard

Per negozi e cataloghi. Al passaggio mostra il secondo scatto, i colori si scelgono sulla card, il carrello risponde subito.

**Cosa passi:** `variant` (di serie grid), `name`, `brand`, `price`, `was`, `image`, `image2`, `imageTone`, `colors`, `rating`, `reviews`, `stock` (di serie in), `badge`, `loading`, `onAdd`.

**Quando usarlo**
- Elenchi di prodotti in griglia (da 2 su mobile a 4 su desktop) o a lista nelle ricerche.
- Quando si compra dalla lista: aggiungi al carrello senza aprire la scheda.

**Quando no**
- Per servizi o abbonamenti: Card confronto o PricingTable.

**Regole**
- Bottone Aggiungi secondario: il primario della pagina resta il carrello o il checkout.
- Dopo l'aggiunta il bottone diventa quantità con «Nel carrello»; a zero torna Aggiungi.
- Colori: al massimo 5 pallini, poi +N. Il colore scelto cambia l'immagine.
- Sconto calcolato dal prezzo pieno, mai scritto a mano. Esaurito: niente sconto a vista, immagine in grigio, Avvisami.
- Preferito e colori sono bottoni veri, raggiungibili da tastiera.

**Stati coperti:** Riposo · Hover con secondo scatto · Preferito · Aggiungo… · Nel carrello · Ultimi pezzi · Esaurito · Senza voto · Caricamento.
