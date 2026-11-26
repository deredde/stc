# Scanner

La fotocamera a tutto schermo con un mirino al centro. La riga scorre mentre cerca, gli angoli diventano verdi e si stringono quando trova, poi sale il foglio col risultato.

**Cosa passi:** `state` (di serie search), `autoDetect` (di serie true).

**Quando usarlo**
- Leggere QR, codici a barre, biglietti, tessere.

**Quando no**
- Desktop senza fotocamera: serve il campo per scrivere il codice.

**Regole**
- Scrivere il codice a mano e scegliere una foto sono sempre possibili.
- Il messaggio sotto il mirino dice cosa fare: inquadra, avvicinati.
- Trovato: angoli verdi, vibrazione, poi il foglio col risultato.
- Il foglio ha sempre «Leggi un altro codice».
- Senza permesso spiega perché serve e offre l'alternativa.
- La torcia è un interruttore con stato visibile.

**Stati coperti:** Cerca · Troppo lontano · Trovato · Risultato · Torcia · Permesso negato.
