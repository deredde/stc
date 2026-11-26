# Adattare STC a un progetto

STC si divide in due parti. La **parte A** è la marca e cambia a ogni progetto. La **parte B** è tutto il resto (navigazione, gerarchie, componenti, stati, movimento, testi) e resta com'è.

## Parte A: cosa cambia

| Cosa | Dove | Note |
|---|---|---|
| L'accento | la scala `accent-50` … `accent-950` nei due temi | 11 gradini per ruolo (vedi README, Colore). Il resto dei semantici la segue da solo. |
| La superficie di marca | `brand-ink`, `brand-accent`, `brand-glow` | `brand-ink` resta molto scuro (testo `on-brand` sopra a 17:1). |
| I caratteri | `type.families`: `display`, `text`, `num` | Tre ruoli fissi: display solo per titoli e marca, testo per tutto, mono per i numeri. |
| Il nome e il logo | prop `name` o `logo` di `Sidebar`, `AuthScreen`, `MemberApp`; `mark` per la tessera | Senza logo il nome si scrive con `Wordmark`. |
| Le icone delle sezioni | le voci della barra laterale | Una per concetto, da Lucide. |
| I neutri (raramente) | `neutral-*` | Grafite appena calda di serie. Un neutro freddo va bene per marche fredde: stessi gradini di luminosità. |

### Scegliere l'accento

L'accento non deve sembrare uno stato. Tieni la tinta (H in OKLCH) lontana da quelle degli stati: pericolo e attenzione 20–55, successo 140–160, informazione 240–265. Vanno bene, per esempio: 75–105 (giallo e lime), 185–220 (petrolio, ciano), 280–340 (viola, magenta). Quello di serie è il blu elettrico (tinta 260, `#0267F3` in chiaro e `#83B2FF` in scuro): coincide con la tinta di informazione, che resta blu e si riconosce da icona e parola, come ogni stato.

Le luminosità per ruolo restano quelle di `tokens.json`: in chiaro il pieno (`accent-400`) sta intorno a L 0,53–0,56 con testo bianco sopra; in scuro intorno a L 0,76 con testo `#111` sopra. Un accento molto chiaro (un giallo) va al contrario: pieno chiaro anche in chiaro, testo scuro sopra (`on-accent`), e niente testo d'accento su fondo chiaro. Ricontrolla sempre il contrasto (vedi sotto).

### Partire da un tema pronto

Se il progetto non ha già una marca, parti da uno dei 30 temi di `temi.css` (README, Temi pronti): basta `data-palette` accanto a `data-theme`. Se la marca c'è, aggiungi a `temi.json` un tema con i suoi tre colori 60·30·10 e rigenera `temi.css` con `node scripts/temi.mjs`.

## Parte B: cosa resta

Tutto ciò che sta nel README e in **Pattern di pagina**: le quattro altezze dei controlli e i loro raggi, il guscio e le sue tre forme, le pagine tipo, gli overlay, gli stati di ogni componente, il movimento, la voce. Se un progetto ha bisogno di qualcosa che non c'è, si aggiunge al sistema con le stesse regole, non si scrive a parte.

## In un progetto di codice (Next.js, Vite, qualunque React)

Tutto ciò che serve è in questa repo: `tokens.css` (i token compilati, chiaro e scuro), `components/bundle.css` (gli stili), `components/bundle.js` (i componenti come `window.STC`) e `components/index.d.ts` (i tipi).

1. Copia `tokens.css` (e `temi.css` se usi un tema pronto) e la cartella `components/` nel progetto (es. `public/stc/`).
2. Carica, in quest'ordine: `tokens.css`, `components/bundle.css`, poi React 18 o 19 e `components/bundle.js` (come nella prova veloce del README).
3. Avvolgi l'app in `<ToastProvider>` e metti il tema sulla radice: `<html data-theme="light">` (il tema lo sceglie ogni persona; al primo accesso parti da `prefers-color-scheme`).
4. Costruisci le pagine dentro `<AppShell sidebar={…}>` con `ListPage`, `DetailPage`, `SettingsPage`; l'accesso con `AuthScreen`; l'app dell'utente con `MemberApp`.
5. Prendi i componenti da `window.STC` (`const { Button, Table } = window.STC`), con i tipi da `components/index.d.ts`. Non copiarli dentro le pagine: se serve una variante, si aggiunge al sistema.

Con Tailwind o shadcn: usa i token di `tokens.css` come colori del tema (`var(--surface)`, `var(--text-secondary)`, `var(--accent)`…) e lascia ai componenti di STC le misure: per i controlli usa quelli di STC, non quelli di shadcn.

### Cambiare l'accento nel codice

- In `tokens.json` cambia la tinta (H in OKLCH) e, se serve, le luminosità della scala `accent-*`, nei due temi; poi riporta i valori in `tokens.css`. Cambia anche i token `ill-*` con la stessa tinta.
- Ricontrolla il contrasto nei due temi (vedi sopra): le coppie sotto il minimo devono restare solo quelle già note.

## In una chat di design o di codice

Passa il link di questo design system e dì cosa cambia della parte A. Un esempio da copiare:

```
Usa il design system STC come base: <link del design system>.
Leggi prima il README del design system, poi «Adattare STC a un progetto» e «Pattern di pagina».
Il progetto: un gestionale per <cosa fa, per chi>.
Parte A (marca), cambia solo questo:
- accento: <colore o tinta OKLCH>, rigenera la scala accent-* con i ruoli di STC e controlla il contrasto nei due temi;
- superficie di marca: brand-ink <valore>, brand-accent dall'accento;
- caratteri: display <famiglia>, testo <famiglia>, numeri <famiglia mono>;
- nome: <nome> (logo: <file o «nessuno, usa Wordmark»>).
Parte B: tieni tutto com'è (guscio, pagine tipo, componenti, stati, movimento, testi in italiano).
Le sezioni della barra laterale sono: <elenco con l'icona Lucide di ognuna>.
Se una schermata chiede qualcosa che STC non ha, dimmelo prima di inventarlo.
```
