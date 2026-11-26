# RollingStat

Le cifre girano come un contachilometri quando il valore cambia: si vede subito che il numero è salito e di quanto.

Le cifre che girano sono `Roller` (`value`, `decimals`, `prefix`, `suffix`), usabile anche da solo.

**Cosa passi:** `label` (di serie Incasso di oggi), `value` (di serie 12840.5), `decimals` (di serie 2), `prefix` (di serie € ), `live` (di serie true).

**Quando usarlo**
- Numeri che cambiano davanti agli occhi: incassi, contatori, punteggi, saldi.

**Quando no**
- Tabelle con tanti numeri: troppo movimento.
- Numeri che si leggono una volta sola.

**Regole**
- Cifre a larghezza fissa, così il numero non balla.
- Ogni cifra gira per meno di un secondo.
- La variazione accanto dice di quanto e in che verso, con freccia e segno.
- Lo screen reader legge solo il valore finale, non le cifre che girano.
- Con movimento ridotto il numero cambia di colpo.

**Stati coperti:** Fermo · In salita · In discesa · Più cifre.
