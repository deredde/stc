# Select

Tendina di scelta singola, disegnata: tastiera, ricerca oltre le 8 voci, vetro.

**Cosa passi:** `options` (`value`, `label`, `description`, `icon`, `disabled`), `value` / `defaultValue`, `onChange`, `placeholder`, `size`, `searchable`, `width`, `label` (se non c'è un `Field`).

**Regole**
- Per 3–15 scelte. Due o tre scelte che si vedono tutte: `Segmented` o `RadioGroup`. Più di 15 con ricerca: va bene, la ricerca si accende da sola.
- La voce scelta ha la pastiglia d'accento al 10 % e la spunta.
- Frecce per muoversi, Invio per scegliere, Esc o clic fuori per chiudere.
