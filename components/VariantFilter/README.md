# VariantFilter

Cerchi di colore con il nome sotto e una griglia di taglie. Quello che manca è barrato e lo dice.

**Cosa passi:** `colors`, `sizes`, `defaultColors`, `defaultSizes`, `onlyAvailable` (di serie false).

**Quando usarlo**
- Abbigliamento, scarpe, arredo: dove colore e misura decidono l'acquisto.

**Quando no**
- Colori che non sono un vero filtro (grafici, etichette).

**Regole**
- Il colore ha sempre il nome scritto sotto: mai solo il cerchio.
- Il segno di scelta si adatta al colore: chiaro sugli scuri, scuro sui chiari.
- Esaurito: barrato, non cliccabile, il motivo nel suggerimento. «Solo disponibili» li nasconde.
- Taglie con 3 pezzi o meno: «Ultimi N».
- Al massimo 12 colori; oltre si raggruppano per famiglia.

**Stati coperti:** Scelto · Passaggio · Focus · Esaurito · Ultimi pezzi · Solo disponibili.
