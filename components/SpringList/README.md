# SpringList

Si prende una riga dalla maniglia e si trascina: le altre si spostano con un piccolo rimbalzo. Con la tastiera si fa lo stesso, e ogni spostamento viene detto ad alta voce.

**Cosa passi:** `items`, `rowH` (di serie 60).

**Quando usarlo**
- Liste corte dove l'ordine conta: esercizi di una scheda, priorità, tappe di un percorso.

**Quando no**
- Liste di più di 30 righe: meglio un campo «posizione» o lo spostamento in cima e in fondo.
- Ordini che il sistema decide da solo (per data, per nome).

**Regole**
- Si prende solo dalla maniglia, così lo scorrimento della pagina resta libero.
- La riga presa si alza e segue il dito; le altre si spostano con una molla breve.
- Tastiera: Spazio prende e lascia, frecce spostano, Esc rimette dov'era.
- Ogni spostamento è annunciato: «Squat spostato in posizione 3 di 5».
- Vibrazione leggera quando la riga cambia posto, dove il telefono la consente.
- Con movimento ridotto le righe saltano al posto nuovo senza rimbalzo.

**Stati coperti:** Riposo · Hover · Presa col dito · Presa da tastiera · Focus · Testo lungo.
