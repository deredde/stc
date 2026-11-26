# CompareCards

Per scegliere tra piani o opzioni: si sceglie la card intera, le differenze sono in grassetto.

**Cosa passi:** `options`, `rows`, `value`, `current`, `recommended`, `onChange`, `layout` (di serie cards), `loading`.

**Quando usarlo**
- Scelta del piano, di una spedizione, di un'opzione con più caratteristiche.

**Quando no**
- Più di 4 opzioni: tabella di confronto.
- Opzioni senza differenze da elencare: bastano le ChoiceCards di STC.

**Regole**
- Da 2 a 4 card. Una sola consigliata, ed è l'unica col bottone primario.
- Il piano attuale si vede ma non si sceglie.
- Le righe che cambiano tra le opzioni sono in grassetto; sì e no hanno icona e testo nascosto per i lettori di schermo.
- Sotto i 640 px una card alla volta, con le schede sopra.

**Stati coperti:** Riposo · Hover · Focus · Scelta · Consigliata · Attuale · Mobile a schede · Caricamento.
