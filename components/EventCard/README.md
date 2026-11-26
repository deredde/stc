# EventCard

Per corsi, webinar, incontri e prenotazioni. La data è il primo colpo d'occhio, poi posti e iscrizione.

**Cosa passi:** `variant` (di serie card), `date`, `time`, `title`, `place`, `online`, `people`, `seats`, `capacity`, `status` (di serie open), `image`, `onJoin`, `onLeave`, `loading`.

**Quando usarlo**
- Ogni cosa con una data e dei posti: corsi, eventi, appuntamenti, webinar.
- Compatta nelle agende e nelle colonne laterali; con copertina nelle pagine pubbliche.

**Quando no**
- Per il calendario intero: Calendar e Agenda di STC.
- Per eventi senza iscrizione: basta una riga di Timeline.

**Regole**
- Un solo bottone d'azione, che cambia con lo stato: Iscriviti, Iscritto · annulla, Lista d'attesa, Rivedi. Annullato non ha azione.
- «Ultimi posti» da 5 in giù, «Completo» a zero: sempre badge con icona, mai solo colore.
- Al massimo 3 avatar, poi il numero. Titolo al massimo 2 righe.
- L'iscrizione carica sul bottone stesso, la card non si blocca.

**Stati coperti:** Aperto · Ultimi posti · Completo · Iscritto · In corso · Concluso · Annullato · Online · Caricamento.
