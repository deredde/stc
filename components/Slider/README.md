# Slider

Cursore per un valore o un intervallo: il valore sta sopra, in mono, non in un fumetto.

**Cosa passi:** `min`, `max`, `step`, `value` / `defaultValue` (numero, o `[da, a]` per l'intervallo), `onChange`, `label`, `format(v)` per il testo del valore, `ticks` (valori da scrivere sotto), `showValue`.

**Regole**
- Le frecce della tastiera spostano di un passo, Pagina su e giù di un decimo, Home e Fine agli estremi.
- Quando il valore esatto conta (un prezzo da fattura) affianca un campo numerico.
