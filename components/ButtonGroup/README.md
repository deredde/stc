# ButtonGroup

Bottoni attaccati per azioni vicine (precedente e successivo) e `ToggleGroup` per scegliere un'opzione o più; `ButtonCount` aggiunge il contatore dentro un bottone.

**Cosa passi:** `ButtonGroup`: `children`, `label`. `ToggleGroup`: `options` (`{value, label, icon, text}`: con l'icona e senza `text` resta solo l'icona), `value` / `defaultValue`, `onChange`, `multiple`, `size`, `label`. `ButtonCount`: `value`.

**Regole**
- Il premuto usa `surface-active`, non il primario.
- Per cambiare vista o periodo resta `Segmented`.
