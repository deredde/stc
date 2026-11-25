# Combobox

Ricerca con i suggerimenti sotto: la parte trovata è evidenziata, frecce e Invio per scegliere, in fondo «Crea …» con il testo già scritto.

**Cosa passi:** `options` (`{value, label, description, icon}`), `value` / `defaultValue` (il testo), `onChange(testo)`, `onSelect(opzione)`, `onCreate(testo)` e `createLabel`, `avatars` (le persone con l'avatar), `max` (6), `placeholder`, `label`.

**Regole**
- Per scegliere tra tante cose (clienti, prodotti). Fino a 15 opzioni basta `Select` con la ricerca.
- La riga «Crea» c'è solo se l'utente può davvero creare.
