# OrderSummary

Articoli, subtotale, sconto, spedizione, totale e la quota di IVA. Su telefono si chiude in una riga con il totale.

**Cosa passi:** `lines`, `shipping` (di serie 0), `discount`, `vat` (di serie 22), `freeFrom`, `collapsible`, `loading`, `title` (di serie Riepilogo), `children`, `editable`.

**Quando usarlo**
- Accanto al pagamento, nel carrello, nella conferma.

**Quando no**
- Come fattura: per quella c'è la ricevuta (129).

**Regole**
- Ordine fisso: articoli, subtotale, sconto, spedizione, totale, «di cui IVA».
- Gli importi si ricalcolano sempre sul server: il riepilogo mostra, non decide.
- Prezzo barrato solo se lo sconto è vero; quantità sul bollino della miniatura.
- Nomi lunghi su due righe al massimo.
- Sotto 900 px: chiuso in una riga con il totale, si apre sopra il modulo.

**Stati coperti:** Aperto · Chiuso · Con sconto · Verso gratis · Gratis · Caricamento.
