# SearchArea

Sposti la mappa e compare «Cerca in quest'area». Oppure si accende la ricerca automatica mentre sposti.

**Cosa passi:** `height` (di serie 380), `auto` (di serie false), `state`.

**Quando usarlo**
- Ricerche su mappa: sedi, case, ristoranti, corsi vicini.

**Quando no**
- Mappe che mostrano un solo indirizzo.

**Regole**
- Non si ricerca da soli a ogni spostamento: compare il bottone, salvo «Cerca mentre sposto».
- Il bottone sta in alto al centro, sopra la mappa; durante la ricerca diventa «Cerco…».
- Il numero dei risultati sta in basso a sinistra; a zero propone di tornare alla zona di prima.
- Mappa usabile da tastiera: frecce per spostarla, Tab per i segnaposto.
- Il segnaposto scelto cambia colore e passa sopra gli altri.

**Stati coperti:** Ferma · Spostata · Ricerca · Automatica · Segnaposto scelto · Vuota · Focus.
