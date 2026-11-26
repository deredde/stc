# ShippingPicker

Le opzioni come schede: quando arriva in giorni veri, quanto costa, e il punto di ritiro quando serve.

**Cosa passi:** `options`, `defaultValue`, `freeFrom`, `subtotal` (di serie 0), `loading`, `lockers`.

**Quando usarlo**
- Ogni pagamento con consegna fisica.

**Quando no**
- Prodotti digitali o servizi: niente spedizione.

**Regole**
- Al massimo quattro opzioni, la più economica prima.
- La data è un giorno vero («Arriva giovedì 28 nov»), non «3–5 giorni lavorativi».
- «Gratis» in verde e in parole, mai «€ 0,00».
- Un'opzione non disponibile resta visibile con il motivo.
- Il ritiro chiede il punto subito sotto, senza aprire finestre. Frecce per muoversi tra le opzioni.

**Stati coperti:** Scelta · Focus · Non disponibile · Gratis · Punto di ritiro · Caricamento.
