# Sito di STC

Landing e documentazione di STC, generate dai file di questa repo. Nessuna copia a mano: README, anteprime e token dei componenti diventano pagine a ogni build.

```bash
cd site
npm ci
npm run build      # crea site/dist
```

Apri `site/dist/index.html` con un server statico (per esempio `npx serve dist`).

## Da dove vengono le pagine

| Nella repo | Nel sito |
| --- | --- |
| `components/<Nome>/README.md` | Frase, «Cosa passi», regole |
| `components/<Nome>/preview.html` | Riquadro live, gruppo nell'indice, scheda Codice (in JSX) |
| `tokens.css` | Temi, e `hue.css` per cambiare la tinta dell'accento al volo |
| `README.md`, `default.md`, `pattern.md`, `adattare.md` | Pagine della guida |
| `assets/Logo/*.svg` | Logo |

La build si ferma se un componente non ha `README.md` o `preview.html`.

## Struttura

- `build.mjs`: il generatore, senza framework.
- `src/index.html`, `src/docs.html`: le due pagine.
- `src/assets/`: stile del sito (`site.css`), landing animata (`landing.js`), documentazione (`docs.js`), riquadri (`frame.js`).

## Pubblicazione (Cloudflare Pages)

Comando di build `cd site && npm ci && npm run build`, cartella di uscita `site/dist`.
