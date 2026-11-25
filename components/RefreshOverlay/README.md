# RefreshOverlay

Avvolge un contenuto che si sta aggiornando: i dati vecchi restano visibili, velati, con una pillola di vetro «Aggiorno» in alto.

**Cosa passi:** `loading`, `label` («Aggiorno i numeri»), `children`.

**Regole**
- Quando cambi filtro, periodo o sede e i dati esistono già. Così la pagina non si svuota.
- Per il primo caricamento usa lo scheletro.
