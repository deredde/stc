# Menu

Menu di azioni dietro il bottone ⋮ (o un altro attivatore): le azioni che non stanno a vista.

**Cosa passi:** `items` (`id`, `label`, `icon`, `danger`, `separator`, `disabled`, `hint`, `onSelect`), `trigger` (di serie un `IconButton` ⋮ «Altre azioni»), `header` (es. chi sei), `placement`, `width` (240), `onSelect`.

**Regole**
- In una riga di tabella al massimo due azioni a vista; tutto il resto qui.
- L'azione distruttiva va per ultima, separata (`separator`) e in rosso (`danger`).
- Il menu è in vetro, si apre con un piccolo ingrandimento e si chiude con Esc, con il clic fuori o scegliendo. Frecce per muoversi, Invio per scegliere.
- Il clic sul ⋮ non apre la riga che lo contiene.
