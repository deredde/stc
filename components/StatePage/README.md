# StatePage

Una pagina che non può mostrare il suo contenuto: dice cosa succede e cosa fare. Di serie ha l'illustrazione grande, animata.

**Cosa passi:** `kind` (`empty` · `error` · `offline` · `forbidden` · `notfound` · `loading`), `title` e `text` (di serie una frase già scritta), `action`, `illustration` (di serie scelta dal tipo; `false` torna all'icona), `animated` (`true` di serie).

**Illustrazione di serie per tipo:** `empty` → `folder-empty` · `error` → `page-error` · `offline` → `offline` · `forbidden` → `access-denied` · `notfound` → `not-found-404`.

**Regole:** mai «Errore 500» o «Qualcosa è andato storto»: dì cosa non si è caricato e cosa fare. `loading` disegna lo scheletro della pagina, non una rotella.
