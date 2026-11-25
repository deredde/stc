# PhoneInput

Telefono con il prefisso in una tendina dentro il campo; il numero si divide da solo a gruppi (347 902 1188).

**Cosa passi:** `value` / `defaultValue` (solo cifre), `onChange(cifre)`, `prefix` / `defaultPrefix` («+39»), `onPrefixChange`, `prefixes` (lista `{value, label}`, di serie `PREFISSI`).

**Regole**
- La spunta verde compare quando il numero ha la lunghezza giusta per il paese.
- Il prefisso non si scrive nel numero.
