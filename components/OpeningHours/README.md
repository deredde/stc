# OpeningHours

La settimana con una o due fasce al giorno, la copia sui giorni feriali e i giorni speciali. In cima, come lo vedrà un cliente adesso.

**Cosa passi:** `defaultValue`, `now`.

**Quando usarlo**
- Schede di negozi, studi, sedi; disponibilità di un servizio.

**Quando no**
- Turni di persone: servono i turni, non gli orari.

**Regole**
- Al massimo due fasce al giorno; la seconda si aggiunge con +.
- Chiuso con un interruttore: le fasce restano salvate se si riapre.
- Errori in parole: chiusura prima dell'apertura, fasce che si sovrappongono.
- «Copia su tutti i giorni feriali» da un giorno qualsiasi.
- L'anteprima in cima dice aperto o chiuso e quando cambia, come la vede il cliente.

**Stati coperti:** Aperto · Chiuso · Pausa · Oggi · Errore · Copiato · Chiude a breve.
