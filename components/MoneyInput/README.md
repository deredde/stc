# MoneyInput

Campo per gli importi: si scrivono solo le cifre, il punto delle migliaia arriva mentre scrivi e i decimali all'uscita dal campo.

**Cosa passi:** `value` / `defaultValue` (testo già formattato, «1.240,00»), `onChange(testo, numero)`, `currency` (di serie «€», `null` per nasconderlo), `decimals` (2), `size`. Va dentro `Field`. Per leggere un numero da un testo: `parseMoney`; per scriverlo: `formatEuro`.

**Regole**
- La valuta sta prima, dentro il campo, in grigio.
- Cifre in mono e allineate a destra, come nelle tabelle.
- Mai bloccare la virgola: chi scrive «12,5» trova «12,50» all'uscita.
