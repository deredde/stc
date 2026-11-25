# NumberInput

Numero con i bottoni − e +, l'unità dentro il campo e il valore che si aggiusta al passo quando esci.

**Cosa passi:** `value` / `defaultValue` (numero), `onChange(numero)`, `min`, `max`, `step`, `unit` («min», «kg», «%»), `stepper` (`false` per il campo senza bottoni, per esempio le percentuali), `stepLabel` (per lo screen reader: «di 15 minuti»).

**Regole**
- Le frecce su e giù della tastiera spostano di un passo.
- Per il carrello resta `QuantitySelector`.
- La percentuale è `NumberInput` con `unit="%"`, `stepper={false}`, `max={100}`.
