# SandboxMode

Quando si lavora su dati di prova, tutta l'app lo dice con una fascia a strisce e una cornice. Così nessuno confonde la prova col vero.

**Cosa passi:** `variant` (di serie band), `active` (di serie true), `label` (di serie Modalità di prova), `note`, `onToggle`, `children`.

**Quando usarlo**
- Prodotti con un ambiente di prova: pagamenti, invii, integrazioni.
- Anche nelle anteprime di una versione nuova.

**Quando no**
- Per dire che un singolo dato è di esempio: basta un badge.

**Regole**
- Sempre visibile in tutte le pagine finché è attiva, non si chiude.
- Strisce e testo insieme: non basta il colore.
- Il cambio tra prova e veri chiede un attimo e lo mostra; i dati delle due modalità non si mescolano.
- Nelle email e nei PDF generati in prova compare «Prova» in alto.

**Stati coperti:** Prova attiva · Cambio in corso · Dati veri · Cornice.
