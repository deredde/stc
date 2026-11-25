# MultiSelect

Scelta di più voci da una lista: le scelte diventano chip dentro il campo e Backspace su un campo vuoto toglie l'ultima.

**Cosa passi:** `options` (`{value, label, description}`), `value` / `defaultValue` (lista), `onChange`, `placeholder`, `searchable`, `label`.

**Regole**
- Oltre 3 o 4 scelte il campo va a capo: lascialo crescere, non tagliare.
- Per i filtri di una lista resta `FilterMenu`.
