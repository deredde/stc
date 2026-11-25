# FileList

Elenco dei documenti di una scheda: il tipo del file sulla sagoma, il nome, peso, data e chi l'ha caricato.

**Cosa passi:** `files` (`{id, name, ext, meta}`), `onOpen(id)`, `onDownload(id)`, `menu(file)` (le voci del menu ⋮), `downloadLabel`.

**Regole**
- Sta in una card `flush` con il bottone «Carica»; per caricare usa `FileDrop`.
- `meta` in mono: «248 KB · 18/11/2026 · Chiara Marino».
