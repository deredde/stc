# PaymentMethod

Il metodo di pagamento salvato, nella pagina dell'abbonamento: la sagoma della carta, le ultime cifre, la scadenza.

**Cosa passi:** `brand` («Visa»), `last4`, `exp`, `onChange`, `changeLabel`.

**Regole**
- Mai il numero intero: solo le ultime 4 cifre.
- Per cambiarla si apre `CardInput` in un `Dialog`.
