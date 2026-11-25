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

L'accento non deve sembrare uno stato. Tieni la tinta (H in OKLCH) lontana da quelle degli stati: pericolo e attenzione 20–55, successo 140–160, informazione 240–265. Vanno bene, per esempio: 75–105 (giallo e lime), 185–220 (petrolio, ciano: quello di serie è 205), 280–340 (viola, magenta).

Le luminosità per ruolo restano quelle di `tokens.json`: in chiaro il pieno (`accent-400`) sta intorno a L 0,53 con testo bianco sopra; in scuro intorno a L 0,76 con testo `#111` sopra. Un accento molto chiaro (un giallo) va al contrario: pieno chiaro anche in chiaro, testo scuro sopra (`on-accent`), e niente testo d'accento su fondo chiaro. Ricontrolla sempre il contrasto (vedi sotto).

## Parte B: cosa resta

Tutto ciò che sta nel README e in **Pattern di pagina**: le quattro altezze dei controlli e i loro raggi, il guscio e le sue tre forme, le pagine tipo, gli overlay, gli stati di ogni componente, il movimento, la voce. Se un progetto ha bisogno di qualcosa che non c'è, si aggiunge al sistema con le stesse regole, non si scrive a parte.

## In un progetto di codice (Next.js, Vite, qualunque React)

Il kit `stc-kit.zip` contiene i sorgenti dei componenti (`stc/src`), gli stili (`stc/styles/stc.css`), i token compilati (`stc/stc-tokens.css`), la mappa per Tailwind e shadcn (`stc/stc-tailwind.css`) e lo script che rigenera i token (`tools/token.py`).

1. Copia la cartella `stc/` nel progetto (es. `src/stc/`).
2. Nel CSS globale importa, in quest'ordine: `stc-tokens.css`, `stc.css` e, se usi Tailwind 4, `stc-tailwind.css`.
3. Avvolgi l'app in `<ToastProvider>` e metti il tema sulla radice: `<html data-theme="light">` (il tema lo sceglie ogni persona; al primo accesso parti da `prefers-color-scheme`).
4. Costruisci le pagine dentro `<AppShell sidebar={…}>` con `ListPage`, `DetailPage`, `SettingsPage`; l'accesso con `AuthScreen`; l'app dell'utente con `MemberApp`.
5. Importa i componenti da `stc/src` (`import { Button, Table } from '@/stc/src'`). Non copiarli dentro le pagine: se serve una variante, si aggiunge al sistema.

Con Tailwind: `stc-tailwind.css` espone i token come colori del tema (`bg-surface`, `text-text-secondary`, `border-border-field`, `bg-accent`…) e mappa le variabili di shadcn (`--background`, `--foreground`, `--primary`, `--muted`, `--ring`…) sui token di STC, così i componenti shadcn prendono gli stessi colori. Le misure restano nei componenti di STC: per i controlli usa quelli, non quelli di shadcn.

### Cambiare l'accento nel codice

- Con lo script: in `tools/token.py` cambia `H_ACC` (la tinta) e, se serve, le luminosità della scala `ACCENTO`; poi `python3 tools/token.py`. Riscrive `tokens.json` e `stc-tokens.css` e stampa le coppie di colori sotto il contrasto minimo nei due temi: devono restare solo quelle già note.
- Dalla pagina del design system: modifica i token e salva; il file `tokens.css` compilato si scarica da lì.

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
