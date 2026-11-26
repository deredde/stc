# ListDetail

L'elenco a sinistra e il dettaglio a destra, con il bordo da trascinare. Su telefono uno alla volta.

**Cosa passi:** `items`, `render`, `min` (di serie 220), `max` (di serie 480), `start` (di serie 300), `height` (di serie 420), `loading`, `empty`.

**Quando usarlo**
- Posta, ticket, ordini, schede clienti: quando si passa da una voce all'altra spesso.

**Quando no**
- Voci che hanno bisogno di tutta la pagina per essere lette.

**Regole**
- L'elenco va da 220 a 480 px; la larghezza scelta resta.
- Il bordo si muove con il mouse e con le frecce, e dice la larghezza.
- Le righe lunghe si tagliano con i puntini; il titolo intero è nel dettaglio.
- Su telefono: elenco, poi dettaglio con il bottone indietro.

**Stati coperti:** Voce scelta · Non letto · Trascinamento · Caricamento · Vuoto · Testo lungo · Telefono.
