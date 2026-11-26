# AddressMap

Si scrive la via e si sceglie tra i suggerimenti. Poi la mappa conferma il punto, e il segnaposto si sposta sull'ingresso se serve.

**Cosa passi:** `defaultPicked`, `outOfZone`.

**Quando usarlo**
- Consegne, prenotazioni a domicilio, registrazione di sedi.

**Quando no**
- Indirizzi di fatturazione: bastano i campi, la mappa non serve.

**Regole**
- I suggerimenti partono dalla terza lettera; frecce e Invio per scegliere.
- Sempre «Non lo trovi? Scrivilo a mano» in fondo all'elenco.
- Il segnaposto si trascina o si sposta con le frecce quando la mappa ha il focus.
- Scala, interno e citofono sono facoltativi e stanno sotto la mappa.
- Fuori zona: lo dice subito con l'alternativa, prima di qualsiasi pagamento.

**Stati coperti:** Vuoto · Suggerimenti · Nessun risultato · A mano · Scelto · Segnaposto spostato · Fuori zona.
