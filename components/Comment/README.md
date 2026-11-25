# Comment

Note interne e commenti su una scheda, con le risposte rientrate e le menzioni. Sotto, `CommentComposer` per scriverne una nuova.

**Cosa passi:** `Comment`: `author`, `avatar`, `time`, `children`, `actions` (`{label, onClick}`), `reply`. `Mention`: il nome citato. `CommentComposer`: `placeholder`, `submitLabel`, `onSubmit(testo)`, `tools` (bottoni icona), `value` / `defaultValue`, `onChange`.

**Regole**
- Il bottone dice cosa fa: «Aggiungi la nota».
- Ctrl/⌘ + Invio invia.
