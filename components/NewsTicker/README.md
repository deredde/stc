# NewsTicker

Le ultime notizie che scorrono in una riga. Si ferma al passaggio, si mette in pausa, e col movimento ridotto diventa una notizia alla volta con le frecce.

**Cosa passi:** `items`, `label` (di serie Ultime), `tone` (di serie ink), `speed` (di serie 40), `loading`.

**Quando usarlo**
- Portali, intranet, pagine di eventi: notizie brevi che cambiano spesso.

**Quando no**
- Per un avviso importante: si perde mentre scorre. Usa un Banner fermo.

**Regole**
- Sempre col bottone pausa: nulla si muove per più di 5 secondi senza poterlo fermare.
- Si ferma al passaggio del mouse e quando una notizia prende il focus.
- Ogni notizia è un link, al massimo 90 caratteri; «Live» solo per le dirette.
- Col movimento ridotto non scorre: una notizia alla volta con le frecce.

**Stati coperti:** Scorre · In pausa · Ferma al passaggio · Focus · Movimento ridotto · Caricamento.
