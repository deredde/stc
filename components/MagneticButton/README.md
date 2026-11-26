# MagneticButton

Il bottone si fa attirare dal puntatore quando gli passa vicino, e il testo lo segue ancora un po' di più. Quando il puntatore va via torna al suo posto con una molla.

**Cosa passi:** `children` (di serie Inizia ora), `icon` (di serie arrow-right), `strength` (di serie 0.35), `radius` (di serie 90), `round`, `variant` (di serie primary), `onClick`.

**Quando usarlo**
- Una sola chiamata all'azione in una pagina di presentazione o in un'intestazione.

**Quando no**
- Moduli, tabelle e barre di strumenti: un bottone che si muove distrae.
- Più di un bottone magnetico nella stessa vista.

**Regole**
- Si attiva a 90 px dal bordo; lo spostamento è un terzo della distanza.
- Solo col mouse: al tocco è un bottone normale.
- Premendo si stringe un poco.
- Il bersaglio del clic resta grande come il bottone.
- Con movimento ridotto è fermo.

**Stati coperti:** Riposo · Attratto · Premuto · Focus.
