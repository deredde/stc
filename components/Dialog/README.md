# Dialog

Dialog al centro per confermare o per un modulo breve: icona in una tessera, titolo, frase, campi, comandi.

**Cosa passi:** `open`, `onClose`, `title`, `description`, `icon` e `tone` (la tessera), `children` (il corpo), `footer` (i bottoni), `size` (`confirm` 420 · `wide` 760 · `grid` 900), `dismissible`. `ConfirmDialog` è la conferma già pronta: `onConfirm`, `confirmLabel`, `danger`, `loading`.

**Regole**
- Il titolo è la domanda («Spedire comunque l'ordine?»), il bottone il verbo («Spedisci comunque»).
- Si chiude con Esc e con il clic sul velo; il fuoco va al primo campo e torna dove era.
- Più di due campi o qualcosa da consultare: usa `Drawer`.
