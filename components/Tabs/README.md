# Tabs

Tab con il tab scelto in vetro: una pillola di vetro che scivola da un tab all'altro, con dietro due luci dell'accento che scorrono lente (variante «Deriva»). Contatori grigi.

**Cosa passi:** `items` (`id`, `label`, `count`, `disabled`), `value`, `onChange`, `variant` (`page` nella testata · `card` in cima a una tabella), `label`.

**Regole:** i numeri solo per ciò che aspetta un'azione. Al passaggio grigio, l'attivo non reagisce. Frecce destra e sinistra per spostarsi.

**Luce:** la fila ha 30 px d'aria sopra e sotto, recuperati col margine, così la luce non viene mai tagliata; sta sopra ciò che la precede (z-index 2) e lo spazio d'aria non blocca i clic. Con «riduci animazioni» la luce sta ferma. Intensità e lentezza si regolano con `--tg-gi` e `--tg-dur` su `.stc-tabs`.
