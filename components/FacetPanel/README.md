# FacetPanel

I filtri di un catalogo per gruppi: caselle con i conteggi, prezzo, voto, interruttori. Ogni gruppo si chiude e dice quanti filtri ha.

**Cosa passi:** `facets`, `defaultValue`, `total` (di serie 0), `loading`, `sticky`, `onChange`.

**Quando usarlo**
- Cataloghi e archivi con tre o più dimensioni da combinare.

**Quando no**
- Una sola dimensione: bastano i chip.
- Su telefono: lo stesso contenuto va nel foglio dal basso (100).

**Regole**
- Larghezza da 240 a 300 px, a sinistra dei risultati; può restare fermo mentre scorri.
- Si applica subito, senza bottone; il numero dei risultati in cima si aggiorna e lo dice.
- Gruppi aperti di partenza: al massimo tre. Il numero accanto al gruppo conta i filtri attivi.
- Più di 5 voci: «Mostra altri N». Più di 8: ricerca dentro il gruppo.
- Voci a zero: grigie e non cliccabili, ma restano al loro posto.

**Stati coperti:** Aperto · Chiuso · Con filtri · Ricerca nel gruppo · Nessuna voce · Errore intervallo · Aggiornamento · Caricamento.
