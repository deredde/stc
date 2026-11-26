# SlotBooking

Il giorno in una fila che scorre, gli orari liberi divisi tra mattina e pomeriggio, e l'orario tenuto per qualche minuto mentre si conferma.

**Cosa passi:** `days` (di serie 10), `closed`, `full`, `service`, `loading`.

**Quando usarlo**
- Visite, appuntamenti, lezioni, ritiri su prenotazione.

**Quando no**
- Eventi con un solo orario: basta un bottone «Prenota».

**Regole**
- I giorni chiusi restano visibili e spenti; i pieni dicono «Pieno» e portano al primo giorno libero.
- Orari occupati barrati, non nascosti, così si capisce quanto è pieno.
- «Ultimo» solo se è vero.
- Scelto l'orario, lo teniamo 10 minuti e lo diciamo con il conto alla rovescia.
- Il fuso orario sempre scritto.

**Stati coperti:** Giorni · Orari · Ultimo posto · Occupato · Pieno · Chiuso · Tenuto · Prenotato · Caricamento.
