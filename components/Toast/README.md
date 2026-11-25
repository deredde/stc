# Toast

Messaggio breve dopo un'azione, che sparisce da solo: 4 secondi, 8 quando c'è un'azione («Annulla»).

**Cosa passi:** metti `ToastProvider` intorno all'app (`placement` `auto` di serie: in alto su desktop, in basso sotto i 600 px; oppure `top` · `bottom`), poi `const toast = useToast()` e `toast({ text, tone, action, duration })`. `Toast` da solo serve per le anteprime.

**Regole**
- Dice cosa è successo, al passato: «Pagamento registrato · Giulia Ferri».
- «Annulla» solo quando l'azione si può davvero disfare.
- La barra in fondo conta il tempo che resta. Al massimo tre toast insieme.
- Gli errori che bloccano il lavoro non vanno nel toast: vanno vicino a dove servono (`Field`, `Alert`).
