# TypeToConfirm

Conferma scrivendo il nome, solo per eliminare cose grandi (una sede, tutti i dati): il bottone rosso si attiva con il nome esatto.

**Cosa passi:** `open`, `onClose`, `title` (la domanda), `description` (cosa sparisce, con i numeri), `confirmText` (il nome da scrivere), `confirmLabel`, `onConfirm`, `cancelLabel`, `loading`.

**Regole**
- Il titolo è la domanda («Eliminare Sede Genova?»), il bottone ripete il verbo.
- La frase dice che non si può disfare.
- Per tutto il resto basta `ConfirmDialog`.
