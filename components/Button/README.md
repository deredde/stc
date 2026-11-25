# Button

Il bottone: un verbo che dice cosa succede, in frase («Registra pagamento»), mai «OK» o «Invia».

**Quando:** ogni azione che cambia qualcosa. Per andare da un'altra parte usa un link o una voce di navigazione.

**Cosa passi:** `variant` (`primary` · `secondary` di serie · `tertiary` · `accent` · `danger`), `size` (`row` 30 · `card` 32 · `form` 40 di serie · `header` 44), `icon` e `iconRight` (nomi Lucide), `loading`, `full`, e tutti gli attributi di `<button>`.

**Regole**
- Un solo `primary` per vista: l'azione per cui la pagina esiste. In chiaro è nero, in scuro prende l'accento.
- `accent` è un richiamo («Nuovo», l'azione della barra laterale): mai per dire che qualcosa è andato bene.
- `danger` solo per ciò che non si disfa; di solito lo apre una conferma (`ConfirmDialog`).
- In una fila il primario va per ultimo, a destra. Annulla è `tertiary`.
- `loading` blocca il bottone e mostra la rotella: scrivi l'etichetta al gerundio («Registro…»).
- La misura segue il posto: `row` nelle righe di tabella, `card` dentro le card e le barre degli strumenti, `form` nei moduli, `header` nella testata. Al tocco tutto sale a 44.
