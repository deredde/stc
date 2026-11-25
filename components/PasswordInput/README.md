# PasswordInput

Password con l'occhio per mostrarla e, quando si crea, la barra della forza e i requisiti che si spuntano mentre scrivi.

**Cosa passi:** `value` / `defaultValue`, `onChange`, `meter` (`true` quando si sceglie una password nuova), `rules` (lista `[controllo, frase]`, di serie `REGOLE_PASSWORD`).

**Regole**
- Per l'accesso basta il campo con l'occhio, senza barra.
- La barra ha quattro gradini e una parola (Debole · Discreta · Buona · Ottima).
