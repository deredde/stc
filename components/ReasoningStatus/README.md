# ReasoningStatus

Mentre l'assistente lavora, i passi in ordine con quello in corso. Alla fine si chiude in una riga: «Ragionato per 5 secondi».

**Cosa passi:** `steps`, `autoplay` (di serie true), `defaultOpen` (di serie true), `failAt`.

**Quando usarlo**
- Risposte che richiedono più di 3 secondi: ricerca, calcoli, più fonti.

**Quando no**
- Risposte immediate: basta il cursore che scrive.

**Regole**
- Passi brevi e veri, scritti in prima persona («Cerco nei documenti»).
- Il passo in corso brilla; con movimento ridotto è fermo e grigio.
- Il tempo scorre in secondi; finito, la riga dice quanto è durato e si chiude da sola.
- Un passo con problemi lo dice e prosegue, senza fermare tutto.
- Le fonti di un passo si aprono a richiesta.

**Stati coperti:** In corso · Fatto · Avviso · Da fare · Chiuso · Aperto.
