# WeekdayPicker

I sette giorni come pulsanti tondi, per orari e ricorrenze; sotto, la regola scritta in una frase da leggere prima di salvare.

**Cosa passi:** `value` / `defaultValue` (indici da 0 = lunedì a 6 = domenica), `onChange`, `label`, `disabled`. Per la frase: `frasePerGiorni(giorni, ogniQuanteSettimane)`.

**Regole**
- La settimana parte dal lunedì.
- La frase dice anche l'ora e la fine, quando ci sono: «… alle 18:30, fino al 31/03/2027».
