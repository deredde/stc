# Recurrence

Ogni quanto si ripete, in quali giorni e fino a quando. Sotto, la frase in italiano e le prossime date vere.

**Cosa passi:** `defaultFreq` (di serie week), `defaultDays`, `start`.

**Quando usarlo**
- Eventi, lezioni, promemoria, pagamenti ricorrenti.

**Quando no**
- Regole irregolari («il secondo martedì tranne agosto»): meglio scegliere le date.

**Regole**
- La frase riassunto dice la regola in parole («Ogni lunedì e giovedì, 10 volte»).
- Sempre le prossime cinque date, calcolate davvero.
- Settimana senza giorni: errore, nessuna data.
- Mese il 29, 30 o 31: si avvisa che nei mesi corti si usa l'ultimo giorno.
- Finisce: mai, in una data, dopo un numero di volte.

**Stati coperti:** Mai · Giorno · Settimana · Mese · Fine data · Fine volte · Errore.
