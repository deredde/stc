# PromoCode

Un link discreto che apre il campo. Il codice si controlla e, se non va, dice perché.

**Cosa passi:** `codes`, `subtotal` (di serie 8400), `defaultOpen`, `defaultApplied`, `onApply`.

**Quando usarlo**
- Nel riepilogo del pagamento, sotto gli articoli.

**Quando no**
- In grande in cima alla pagina: chi non ha un codice va a cercarne uno e non torna.

**Regole**
- Chiuso di partenza, come link «Hai un codice sconto?».
- Il codice diventa maiuscolo mentre si scrive e perde gli spazi.
- Errori in parole: non esiste, è scaduto (con la data), vale da un minimo (con quanto manca).
- Applicato: riquadro verde con quanto si risparmia e «Togli»; lo sconto compare nel riepilogo.
- Un solo codice per ordine.

**Stati coperti:** Chiuso · Aperto · Controllo · Non valido · Scaduto · Minimo non raggiunto · Applicato.
