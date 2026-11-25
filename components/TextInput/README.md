# TextInput

Campo di testo con i sei stati: a riposo, passaggio, fuoco, compilato, errore, disabilitato.

**Cosa passi:** `size` (`card` 32 · `form` 40 · `header` 44), `icon`, `prefix` (es. «+39», separato da una linea), `suffix` (unità: «€»), `numeric` (cifre in mono a destra), `invalid`, `onValue(testo)`, e gli attributi di `<input>`.

**Regole:** al fuoco il bordo diventa d'inchiostro (accento in scuro) con un alone dell'accento. I numeri, gli importi e la loro unità stanno nella famiglia mono. Dentro un `Field` l'errore arriva da lì.
