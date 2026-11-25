# Sidebar

La barra laterale del gestionale: testata di marca con contesto, ricerca e azione principale; le sezioni con le voci; chi sei in fondo.

**Cosa passi:** `name` (o `logo`), `mark` (la lettera della barra chiusa), `status`, `switcher` (`value`, `options`, `onChange`, `title`, `note`: il cambio di sede, azienda o cantiere), `search` (`label`, `onClick`, `shortcut`), `action` (`label`, `icon`, `onClick`), `sections` (`title`, `items`: `id`, `label`, `icon`, `count`, `countTone`, `dot`, `href`), `active`, `onNavigate`, `user` (`name`, `role`, `menu`), `theme` (`value`, `onToggle`), `collapsed`, `onExpand`.

**Regole**
- Aperta 240 da 1280 px; chiusa a icone 64 tra 1024 e 1279 (il clic sulla tessera la apre sopra la pagina); sotto i 1024 diventa testata e barra in basso (`AppShell`).
- La voce attiva ha la pastiglia d'accento al 10 % con la barretta a sinistra, che scivola da una voce all'altra in 220 ms.
- Le sezioni dividono ciò che cambia con il contesto (la sede) da ciò che vale per tutto.
- I contatori solo su ciò che aspetta qualcuno; da chiusa diventano un pallino.
- L'azione principale (accento pieno) è quella che si fa più spesso in tutto il gestionale.
