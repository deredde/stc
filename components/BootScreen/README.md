# BootScreen

Schermata di marca per i passaggi grandi: avvio dell'app, accesso, cambio di sede. Superficie `brand-ink` con trama e bagliore, mai una rotella sola.

**Cosa passi:** `kind` (`boot` · `signin` · `switch`), `fill` (a tutto schermo, fissa), e per tipo:
- `boot`: `mark` (iniziale), `name`, `value` (0–100), `step` (la frase del passo).
- `signin`: `initials`, `name` o `title`, `detail` («Amministrazione · Sede Torino»).
- `switch`: `from`, `to`, `title`.

**Regole**
- Solo all'apertura dell'app, dopo l'accesso e al cambio di contesto. Dentro l'app si usano scheletri e loader di sezione.
- La barra avanza per passi veri, con una frase per passo. Dopo il cambio di sede, il toast «Ora sei a Sede Torino».
