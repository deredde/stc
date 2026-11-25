# Loader

Il loader di sezione: una tessera di vetro da 64 con il bagliore dell'accento, la rotella e una frase su cosa sta arrivando.

**Cosa passi:** `label` (cosa carichi: «Carico i movimenti»), `detail`, `size` (`md` 64 · `sm` 48), `slow` (dopo 10 s), `slowLabel`, `slowDetail`, `onRetry`, `onBackground`.

**Regole**
- Dentro card, pannelli e drawer quando il contenuto non ha una forma prevedibile. Se la forma si conosce usa `SkeletonLayout`.
- La frase compare dopo 2 s; dopo 10 s passa a `slow`: «Ci vuole più del solito», con Riprova e Continua in background.
- Mai a pagina intera: per la pagina c'è `StatePage kind="loading"` o lo scheletro.
