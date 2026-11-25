# DatePicker

Campo data: si scrive (gg/mm/aaaa) oppure si sceglie dal calendario, che si apre al fuoco.

**Cosa passi:** `value` / `defaultValue` in ISO (`aaaa-mm-gg`), `onChange(iso)`, `min`, `max`, `today` (per le demo), `shortcuts` (Ieri · Oggi · Domani · Svuota), `size`, `width`. Utilità: `formatData`, `leggiData`, `piuGiorni`, `oggiIso`.

**Regole**
- Settimana da lunedì. Oggi ha la pastiglia d'accento, il giorno scelto è pieno, fuori limite è barrato.
- Frecce per muoversi tra i giorni, Invio per scegliere, Esc per chiudere.
- Si accettano anche «20/10/26», «20.10.2026», «20-10-2026».
