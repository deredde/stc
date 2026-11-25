# FormSection

Sezione di un modulo lungo: titolo e spiegazione a sinistra (280), campi a destra. Con `FormRow` i campi si affiancano con larghezze fisse; con `ErrorSummary` gli errori si elencano anche in cima, come link.

**Cosa passi:** `FormSection`: `title`, `description`, `children`. `FormRow`: `columns` (colonne CSS, «110px 1fr 90px»), `children`. `ErrorSummary`: `errors` (`{label, message, target}` dove `target` è l'id del campo, oppure `onClick`), `title`.

**Regole**
- Le sezioni sono separate da una linea; sotto i 760 px il titolo va sopra i campi.
- Il riepilogo degli errori compare solo dopo «Salva», e prende il fuoco.
