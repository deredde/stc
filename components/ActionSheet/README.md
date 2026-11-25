# ActionSheet

Foglio di azioni su telefono, al posto del menu ⋮: in testa di chi si parla, l'azione che non si disfa in rosso per ultima, «Annulla» separato.

**Cosa passi:** `open`, `onClose`, `title`, `subtitle`, `items` (`{id, label, icon, danger}`), `onSelect(id)`, `cancelLabel`, `inline` (dentro un contenitore, per le anteprime).

**Regole**
- Da 2 a 6 azioni. Per un modulo usa `Sheet`.
- Si chiude con il velo, con Esc e con «Annulla».
