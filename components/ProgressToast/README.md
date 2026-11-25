# ProgressToast

Un toast che resta finché il lavoro non finisce: import, export, invii a molti. Sempre scuro, come gli altri toast.

**Cosa passi:** `title` («Importo 1.284 clienti»), `value` (0–100), `text`, `onHide`, `hideLabel`.

**Regole**
- Per lavori oltre i 10 s che non bloccano la pagina. Alla fine diventa un toast normale: «Importati 1.284 clienti».
- Nascosto, torna come pillola nella testata finché il lavoro non finisce.
