# CardInput

Carta di pagamento in un solo blocco: numero, scadenza e codice. Il circuito si riconosce dalle prime cifre e il numero si controlla appena è completo.

**Cosa passi:** `value` / `defaultValue` (`{number, exp, cvc}`), `onChange`, `invalid`. Per il messaggio d'errore del `Field` usa `cardCheck(valore)`: torna `{brand, complete, number, exp}` con le frasi pronte.

**Regole**
- Mai salvare i dati della carta: il campo li passa al fornitore dei pagamenti.
- Il messaggio dice cosa non va («Il numero della carta non torna: controlla le cifre»), mai «Carta non valida».
- Su telefono la tastiera è numerica (`inputMode="numeric"`).
