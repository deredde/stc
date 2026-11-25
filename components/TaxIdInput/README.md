# TaxIdInput

Codice fiscale o partita IVA: lunghezza fissa, lettera o cifra di controllo verificata, spunta quando torna.

**Cosa passi:** `kind` (`cf` · `piva`), `value` / `defaultValue`, `onChange`. Per i messaggi: `cfOk`, `pivaOk`. Con `Field` usa `counter` per i 16 caratteri del codice fiscale.

**Regole**
- La partita IVA mostra «IT» prima, ma il valore resta di sole cifre.
- L'errore dice dove guardare: «L'ultima lettera non torna con il resto del codice».
