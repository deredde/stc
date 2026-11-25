# Stepper

Passi in orizzontale per un percorso a tappe: fatto = pieno con la spunta, attuale = anello con l'alone d'accento, errore = triangolo.

**Cosa passi:** `steps` (`{label, sub, error}`), `current` (indice), `error` (indice del passo con l'errore), `onStepClick(i)` (rende cliccabili i passi fatti), `label`.

**Regole**
- Da 3 a 6 passi, etichette di una o due parole.
- `sub` sotto il passo fatto dice cosa è stato scelto («Giulia Ferri»).
- Su telefono resta solo l'etichetta del passo attuale; per il telefono vedi anche `MobileSteps`.
