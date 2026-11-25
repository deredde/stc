# RichPageHeader

Testata di pagina ricca: percorso sopra, titolo con badge, sottotitolo, azioni, e sotto a scelta i numeri, lo stato a passi, gli strumenti del periodo o i tab.

**Cosa passi:** `crumbs`, `title`, `subtitle`, `badge`, `avatar`, `actions`, `toolbar` (periodo, confronto: la testata dei report), `status` (`{steps, current}` di `StatusPath`), `steps` (le props di `Stepper`), `stats` (`{label, value}` di `HeaderStats`), `tabs` (le props di `Tabs`).

**Regole**
- Una sola azione primaria; il resto nel menu ⋮.
- Per le testate semplici resta `PageHeader`.
- I numeri (`stats`) sono 3 o 4, in mono; l'avatar delle aziende è quadrato (`className="stc-avatar--square"`).
