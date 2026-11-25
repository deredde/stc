# OtpInput

Codice a più cifre (di solito 6) in caselle separate: si passa da sola alla successiva e l'incolla riempie tutto.

**Cosa passi:** `length` (6), `value` / `defaultValue`, `onChange`, `onComplete(codice)`, `label`, `disabled`.

**Regole**
- Sopra: dove è arrivato il codice («Ti abbiamo scritto al 347 ••• 1188»). Sotto: quando chiederne un altro.
- Il codice si controlla da solo all'ultima cifra, senza bottone.
