# SwipeStack

Per decidere in fretta su una cosa alla volta: trascina a destra per tenere, a sinistra per scartare. Si può tornare indietro.

**Cosa passi:** `items`, `render`, `onDecide`, `leftLabel` (di serie Scarta), `rightLabel` (di serie Tieni), `empty`.

**Quando usarlo**
- Selezioni rapide a due esiti: candidature, foto da tenere, proposte da approvare.
- Soprattutto su mobile.

**Quando no**
- Decisioni con più di due esiti o che non si possono annullare.
- Quando serve confrontare: meglio una lista.

**Regole**
- Soglia di 110 px: sotto la card torna al suo posto.
- Mai solo il gesto: sempre anche i bottoni e le frecce.
- Si vedono al massimo 3 card; si annulla solo l'ultima scelta.
- Dentro la card niente link o bottoni: si apre il dettaglio da fuori.

**Stati coperti:** Riposo · Trascinamento con timbro · Uscita · Annulla · Vuota · Focus.
