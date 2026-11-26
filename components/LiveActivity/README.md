# LiveActivity

Un ordine che arriva, seguito dalla schermata di blocco: il fattorino si muove sulla barra e i minuti scendono. Si può ridurre a una piccola isola in alto.

**Cosa passi:** `step` (di serie 2), `eta` (di serie 8), `auto` (di serie true), `mode` (di serie lock).

**Quando usarlo**
- Cose che stanno succedendo e finiscono presto: consegne, corse, timer, partite.

**Quando no**
- Notifiche normali o promozioni.
- Attività che durano più di otto ore.

**Regole**
- Una riga per lo stato, una per il dettaglio, un numero grande per il tempo.
- Quattro tappe al massimo sulla barra.
- La forma compatta tiene solo l'icona e il tempo.
- A fine attività resta visibile ancora un po' con l'ora di arrivo, poi sparisce.
- Ogni cambio è annunciato agli screen reader.
- Sopra uno sfondo qualsiasi: vetro scuro con testo chiaro.

**Stati coperti:** In preparazione · In consegna · Consegnato · Isola · Focus.
