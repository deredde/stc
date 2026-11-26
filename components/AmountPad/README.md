# AmountPad

L'importo si scrive come al bancomat, partendo dai centesimi. Grande al centro, con le cifre rapide e i limiti detti prima di sbagliare.

**Cosa passi:** `max` (di serie 100000), `to` (di serie Marco Bianchi), `quick`, `defaultCents` (di serie 0), `balance` (di serie 24350).

**Quando usarlo**
- Inviare o chiedere soldi, ricaricare, dividere un conto su telefono.

**Quando no**
- Moduli su desktop: basta un campo importo.
- Importi con più di due decimali.

**Regole**
- Si parte dai centesimi: 4, 2, 5, 0 fa € 42,50.
- Il tasto cancella toglie l'ultima cifra; tenuto premuto azzera.
- Oltre il massimo il numero trema, vibra e dice qual è il massimo.
- Oltre il saldo lo dice in rosso e il bottone si spegne, con il motivo nel testo.
- Funziona anche con la tastiera del computer.
- Il bottone dice l'importo che si sta per inviare.

**Stati coperti:** Vuoto · Con importo · Oltre il saldo · Oltre il massimo · Premuto · Disattivo.
