# LineChart

Linee nel tempo con il confronto: periodo attuale in `viz-line` con l'area leggera, periodo prima tratteggiato. Tooltip scuro con data e valori in mono; tabella nascosta per lo screen reader.

**Cosa passi:** `data` (`{label, value, prev, tip}`), `compare`, `area`, `height`, `format` (le etichette), `tooltipFormat`, `max`, `yTicks`, `xTicks` (indici), `label`, `currentLabel`, `prevLabel`. Sopra: `ChartHeader` (`label`, `value`, `delta`, `legend`) e `ChartLegend`.

**Regole**
- Il punto finale è segnato.
- Una o due serie; di più: `StackedBarChart`.
