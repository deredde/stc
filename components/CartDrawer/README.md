# CartDrawer

Si apre da destra senza lasciare la pagina: quantità, togli con «Annulla», quanto manca alla spedizione gratis, e il bottone per pagare.

**Cosa passi:** `lines`, `freeFrom` (di serie 5000), `shipping` (di serie 590), `defaultOpen` (di serie true), `cross`.

**Quando usarlo**
- Negozi: dopo «Aggiungi al carrello» e dall'icona della borsa.

**Quando no**
- Acquisti di un solo articolo: si va diretti al pagamento.

**Regole**
- Largo 420 px, staccato dai bordi; su telefono prende tutto lo schermo.
- La quantità cambia subito e il prezzo della riga lo mostra; il massimo è la disponibilità, detta in parole.
- «Togli» non chiede conferma: mostra «Annulla» per 6 secondi.
- Barra verso la spedizione gratis solo se esiste una soglia; raggiunta, lo dice.
- Al massimo due suggerimenti, sotto gli articoli. Esc e il velo chiudono.

**Stati coperti:** Aperto · Chiuso · Quantità · Ultimi pezzi · Tolto con Annulla · Soglia raggiunta · Vuoto.
