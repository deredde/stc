# WizardPage

Pagina a passi per creare cose lunghe (un abbonamento, un preventivo): passi in testata, riepilogo a destra che si aggiorna, «Indietro» e «Continua» fissi in fondo.

**Cosa passi:** `title`, `crumbs`, `steps` e `current` (come `Stepper`), `onStepClick`, `onClose` e `closeLabel`, `children` (il passo), `aside` (il riepilogo), `onBack`, `onNext`, `nextLabel`, `nextDisabled`, `nextLoading`, `footerNote`.

**Regole**
- L'ultimo bottone dice cosa succede: «Attiva l'abbonamento», non «Fine».
- La × chiede conferma se c'è qualcosa di scritto.
- Sotto i 760 px il riepilogo va sotto il passo.
