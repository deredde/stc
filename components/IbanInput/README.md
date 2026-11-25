# IbanInput

IBAN in maiuscolo e a gruppi di quattro mentre scrivi; il controllo del codice dice subito se c'è una cifra sbagliata.

**Cosa passi:** `value` / `defaultValue` (senza spazi), `onChange(iban)`. Per il messaggio: `ibanOk(iban)`.

**Regole**
- L'IBAN italiano ha 27 caratteri: prima di arrivarci non si segna l'errore.
- Il messaggio d'errore suggerisce la causa più frequente: una cifra scambiata.
