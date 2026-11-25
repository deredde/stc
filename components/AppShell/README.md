# AppShell

Il guscio del gestionale: barra laterale e pagina, che si adatta alla larghezza del contenitore.

**Cosa passi:** `sidebar` (le props di `Sidebar`), `children` (la pagina), `layout` (`auto` di serie · `desktop` · `rail` · `mobile`), `mobileNav` (voci della barra in basso; di serie le prime due voci, l'azione e «Menu»), `onMobileNav`, `mobileTitle`, `banner`. `useShellLayout()` dice alla pagina in che forma è.

**Regole**
- Da 1280 barra aperta; 1024–1279 barra a icone; sotto 1024 testata da 56, barra in basso e «Menu» che apre tutte le sezioni in un foglio.
- La barra laterale è una sola per tutta l'app: non rimontarla a ogni pagina, così la pastiglia scivola.
- Il cambio di contesto (sede) su telefono si apre toccando il titolo.
