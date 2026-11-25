# EmptyState

Cosa manca, perché, e l'azione che lo risolve. Di serie ha l'illustrazione animata.

**Cosa passi:** `title`, `children` (una frase), `action`, `size` (`sm` dentro una card · `lg` per una sezione vuota), `tone` (`accent` di serie · `neutral`), `illustration` (il nome di un'illustrazione; di serie `folder-empty`), `illustrationSize` (di serie `md` in `lg`, `sm` in `sm`), `animated` (`true` di serie · `"hover"` · `false`), `icon` (solo per gli spazi bassi, sotto i 120 px).

**Regole:** il titolo dice cosa non c'è («Nessun ingresso oggi»), la frase dove comparirà o come si crea. Un solo bottone, quello che riempie il vuoto. Con dei filtri attivi, l'azione è «Azzera i filtri».

**Di serie (regole di default):** senza `icon` né `illustration` il vuoto mostra `folder-empty`, animata. Scegli il nome dal caso (vedi Illustration), non dall'aspetto: `search-empty` per le ricerche, `filter-empty` per i filtri, `clients-first` per il primo cliente. L'icona tonda resta solo per i vuoti dentro spazi bassi, dove l'illustrazione non entra.
