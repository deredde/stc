# TreeView

Albero di categorie o cartelle: rientro di 20 per livello, conteggio in mono a destra. Con `CheckboxTree` diventa l'elenco dei permessi a gruppi, con il gruppo «a metà» se non tutto è scelto.

**Cosa passi:** `TreeView`: `nodes` (`{id, label, icon, count, children}`), `expanded` / `defaultExpanded`, `onExpandedChange`, `selected` / `defaultSelected`, `onSelect`. `CheckboxTree`: `groups` (`{id, label, items:[{id, label}]}`), `value` / `defaultValue`, `onChange`, `title`.

**Regole**
- Al massimo 4 livelli.
- Frecce destra e sinistra aprono e chiudono la voce.
