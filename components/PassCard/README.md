# PassCard

Tessera digitale su superficie di marca: stato, codice (QR o numero), quanto dura ancora.

**Cosa passi:** `status` (`tone`, `label`), `code` (il QR vero; senza, un disegno di prova), `progress` (`value`, `note`, `time`), `footer`, `dim` e `overlay` (codice scaduto o senza rete).

**Regole:** il codice sta su bianco anche in tema scuro, per leggersi agli scanner. Senza rete il codice resta finché vale, poi si sfoca con la spiegazione sopra.
