<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/Logo/logo-scuro.svg">
    <img src="assets/Logo/logo-chiaro.svg" alt="STC · Standard Template Construct" width="220">
  </picture>
</p>

# STC · Standard Template Construct

Design system neutro per gestionali e per le app che li accompagnano: token, oltre 160 componenti React, illustrazioni animate, loader, logo e regole di scrittura. Tema chiaro e scuro, in italiano.

## Cosa c'è

| Percorso | Contenuto |
| --- | --- |
| `tokens.json` · `tokens.css` | Tutti i valori (colori OKLCH, tipografia, spazi, raggi, ombre, movimento), chiaro e scuro |
| `components/bundle.js` · `bundle.css` | I componenti React come `window.STC`, con gli stili |
| `components/index.d.ts` | I tipi di ogni componente |
| `components/<Nome>/` | Scheda (`README.md`) e anteprima (`preview.html`) di ogni componente |
| `assets/Logo/` | Il logo in SVG: colonna, breve, riga, simbolo, favicon |
| `adattare.md` · `pattern.md` · `default.md` | Adattare STC a un progetto, pattern di pagina, regole di default |

## Prova veloce

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/bundle.css">
<script src="components/lib/react.production.min.js"></script>
<script src="components/lib/react-dom.production.min.js"></script>
<script src="components/bundle.js"></script>

<div id="app" data-theme="light"></div>
<script>
  const { Button } = window.STC;
  ReactDOM.createRoot(document.getElementById('app'))
    .render(React.createElement(Button, { variant: 'primary' }, 'Nuovo cliente'));
</script>
```

---

## Guida

STC (Standard Template Construct) è il design system di base per gestionali e per le app che li accompagnano: navigazione, gerarchie, componenti, stati, movimento e testi sono già decisi. Ogni progetto cambia la marca (accento, superficie di marca, caratteri, logo) e tiene tutto il resto. Nasce da un gestionale vero e ne porta le regole, rese neutre.

Leggi questo file per intero prima di disegnare o scrivere codice. Le altre sezioni: **Adattare STC a un progetto** (`adattare.md`), **Pattern di pagina** (`pattern.md`) e **Regole di default** (`default.md`), cioè come si parte appena installato. Ogni componente ha la sua scheda in `components/<Nome>/README.md`.

## Come si usa

- Se non scrivi niente vale quanto dice **Regole di default**: illustrazioni animate, vuoti e pagine di stato con l'illustrazione, toast in alto su desktop e in basso sul telefono, tema chiaro. I valori sono in `STC.DEFAULTS`.
- I valori stanno in `tokens.json` (e, compilati, in `tokens.css`). Nei componenti non scrivere mai un colore, un raggio o una durata a mano: usa il token.
- I componenti React stanno in `components/bundle.js` come `window.STC` (React 18 o 19 sulla pagina), con gli stili in `components/bundle.css` e i tipi in `components/index.d.ts`. In un progetto vero si copiano i sorgenti dal kit (vedi `adattare.md`).
- Le classi hanno il prefisso `stc-`. Il tema si sceglie con `data-theme="light"` o `data-theme="dark"` su qualunque contenitore; senza attributo vale il chiaro.
- Quando una regola qui non basta, guarda come lo fa il componente più vicino e fai lo stesso. Non inventare varianti nuove: aggiungile al sistema.

## Principi

1. **Una cosa sola chiede attenzione per volta.** Un solo bottone `primary` per vista. Il richiamo (`accent`) segna ciò che è nuovo o la voce attiva, mai lo stato di qualcosa.
2. **Lo stato si legge senza colore.** Ogni stato ha tinta, bordo, icona e una parola (`Badge`, `Alert`). Verde, rosso, arancio e blu non si usano per decorare.
3. **I numeri sono numeri.** Importi, orari, date, codici e conteggi in `--font-num` con cifre tabulari; un numero e la sua unità restano insieme («€ 1.240,00», «07:42»).
4. **Si salva da solo.** Campi, interruttori e scelte valgono subito, con un toast che lo conferma. «Salva» o «Crea» compare solo quando si crea qualcosa di nuovo.
5. **Niente controlli nativi a vista.** Tendine, calendari, ore, caselle e interruttori sono disegnati sul sistema e funzionano da tastiera.
6. **Al massimo due azioni a vista per riga**, il resto nel menu ⋮. I contatori solo su ciò che aspetta un'azione.
7. **Si lavora senza lasciare la pagina.** Conferme nel `Dialog`, lavoro nel `Drawer`, scelte rapide nel `Sheet` su telefono.
8. **Ogni pagina ha un vuoto, un caricamento e un errore** disegnati: nessuna pagina bianca, nessuna rotella a schermo intero.

## Voce e testi

Si scrive in italiano, dalla parte di chi usa il prodotto, con frasi brevi. Si dà del tu.

- **Bottoni:** il verbo di ciò che succede, in frase: «Registra pagamento», «Nuovo cliente», «Spedisci comunque». Mai «OK», «Sì», «Invia», «Conferma» da soli.
- **Titoli di pagina:** il nome della sezione («Clienti»). Sotto, una riga di contesto: quanti sono, di quale sede («1.284 clienti · 37 da seguire»).
- **Dialog:** il titolo è la domanda («Spedire comunque l'ordine?»), la frase dice la conseguenza («La spedizione resta registrata a tuo nome»).
- **Errori:** cosa non va e come rimediare, senza scuse: «Manca la parte dopo la @», «Ti restano 2 tentativi», «Questa pagina non si è caricata. Riprova tra qualche secondo». Mai «Errore» da solo o «Qualcosa è andato storto».
- **Toast:** cosa è successo, al passato, con il nome di chi riguarda: «Pagamento registrato · Giulia Ferri». «Annulla» solo se si può disfare.
- **Vuoti:** cosa non c'è e dove comparirà: «Nessun ingresso oggi. I passaggi al cancello compaiono qui».
- **Etichette dei campi:** in frase, senza due punti; si segna «(facoltativo)», non l'obbligatorio.
- **Formati:** date `gg/mm/aaaa`, ore `hh:mm` a 24 ore, importi «€ 1.240,00» (euro prima, virgola per i decimali, punto per le migliaia), settimana da lunedì.
- Niente punti esclamativi, niente emoji, niente maiuscole per enfasi. Le micro-etichette maiuscole (`overline`) sono solo per i gruppi.

## Colore

L'accento di serie è un **blu elettrico**: `#0267F3` in chiaro (testo bianco sopra, 5:1) e `#83B2FF` in scuro (testo scuro sopra, 8,8:1), tinta 260 in OKLCH. Le luci delle illustrazioni ne prendono la tinta, chiare e leggere, con una seconda luce azzurra.

Due temi, gli stessi nomi. Le scale si leggono per **ruolo**, non per luminosità, così un componente scritto una volta funziona nei due temi:

| Gradini | Ruolo |
|---|---|
| 50–300 | tinte vicine alla superficie: fondi, riempimenti leggeri, bordi delle tinte |
| 400 | il colore pieno |
| 500 | il pieno al passaggio del mouse |
| 600–950 | il colore come inchiostro: testo e icone sulle tinte |

Le scale sono `accent-*` (la marca: si cambia per progetto), `neutral-*` (grafite appena calda, da `neutral-0` a `neutral-950`), e gli stati `success-*`, `danger-*`, `warning-*`, `info-*`. Nei componenti usa i **semantici**, non le scale:

- **Superfici:** `page-bg` dietro tutto; `surface` per card, tabelle, testate e barra laterale; `surface-raised` per ciò che sta sopra (menu, dialog, drawer); `surface-sunken` per le aree incassate (testata delle tabelle); `surface-hover` e `surface-active` per passaggio e pressione. In scuro le card salgono di luminosità: `page-bg` è il nero di marca, mai `#000`.
- **Testo:** `text-primary` (17:1), `text-secondary` (9:1), `text-tertiary` per didascalie e intestazioni di colonna (6,5:1), `text-placeholder` (4,7:1), `text-disabled` (non porta informazioni).
- **Bordi:** `border` per card e pannelli, `border-strong`, `border-field` e `border-field-hover` per campi e bottoni secondari, `divider` tra le righe.
- **Primario:** `primary` è inchiostro in chiaro e accento in scuro, con `on-primary` sopra; `primary-hover`, `primary-pressed`.
- **Controlli:** `control` con `on-control` sopra, blu nei due temi: caselle, radio e interruttori accesi, slider, barre di avanzamento e misuratori, passi fatti, giorno scelto, carte scelte. Il nero resta al bottone primario e al testo.
- **Richiamo:** `accent` (pieno, con `on-accent`), `accent-tint` con `accent-tint-fg` (icone degli stati vuoti, evidenziazione nella ricerca), `accent-line` (linea del tab, barretta della voce attiva), `accent-wash` e `accent-wash-strong` (la pastiglia al 10 % della voce attiva, del tab, dell'opzione scelta, di oggi nel calendario), `nav-active-icon`.
- **Stati:** per ognuno `-fg` (inchiostro), `-bg` (fondo), `-bd` (bordo), `-solid` (pieno). `success` va bene, `danger` blocca, `warning` chiede attenzione (arancio: l'accento non è mai uno stato), `info` informa, `neutral-fg/bg/bd` per sospeso, archiviato, da pagare.
- **Campi:** `field-bg`, `field-bg-disabled`; al fuoco bordo `focus-color` e alone `field-focus-halo`.
- **Sempre scuri:** `toast-bg` con `toast-fg`, `toast-muted`, `toast-action` per toast, tooltip e barra di selezione.
- **Vetro:** `glass-bg`, `glass-bd`, `shadow-glass`, con sfocatura 22 px e saturazione 1,8: per tendine, menu e calendari. Abbastanza pieno da leggere tutto.
- **Grafici:** `viz-ink` per le barre, `viz-line` (accento) per linee e barra in evidenza, `viz-wash` per aree e giorni chiusi. Una serie per grafico; la barra da notare prende `accent`.
- **Più serie:** `viz-1`…`viz-5` in quest'ordine, quando un grafico ne ha davvero più di una (barre impilate, ciambella, confronto). Oltre cinque si raggruppa in «Altro» con `viz-5`. La serie da guardare è sempre `viz-1`.
- **Intensità:** `heat-0` (vuoto) … `heat-4` (pieno) per le mappe di calore (`CalendarHeatmap`, `HourHeatmap`, `HeatScale`). Sempre con la legenda «Meno … Di più» e il valore nel tooltip.

### Superfici di marca

Uguali nei due temi, sempre scure: `brand-ink` (fondo), `on-brand` (17:1), `on-brand-muted` (8:1), `on-brand-faint`, `brand-accent` (l'accento chiaro, con testo `brand-ink` sopra), `brand-glow` (bagliore sfocato), `brand-line` e `brand-dot` (trame), `brand-glass-bg/bd/hover`. Si usano solo per: testata della barra laterale, schermate di accesso, tessera digitale dell'app, un numero in evidenza. Tre trame: griglia a punti (passo 16), zigrinatura (righe a 45° ogni 10 px), grana. Una per superficie, sempre con un bagliore dell'accento.

## Tipografia

Tre famiglie, ognuna con un compito:

- `--font-display` (Space Grotesk 700): solo titolo di pagina, titolo della testata mobile, nome del prodotto, schermate di marca. Mai nel corpo, mai sui numeri.
- `--font-text` (Inter 400–700): tutta l'interfaccia.
- `--font-num` (JetBrains Mono 400–600): importi, orari, date, codici, conteggi, con la loro unità.

Scala (classi in `tokens.css`): `page-title` 28/700 display · `page-title-m` 18/700 · `section-title` 20/600 · `card-title` 16/600 (il drawer usa 18) · `lead` 16/400 · `body` 14/400 · `button` 14/600 (13 per i bottoni da 30 e 32) · `secondary` 13/400 · `label` 13/500 in `text-secondary` · `caption` 12/400 · `overline` 11/600 maiuscolo +0,08em in `text-tertiary` · `counter` 10/600. Numeri: `num-xl` 36/500 · `num-kpi` 30/500 · `amount` 24/500 · `num` 14/500 · `code` 12/500. Il titolo grande di marca è `display-brand` 48/700, solo nelle schermate di marca.

## Spazi, raggi, misure

- Griglia da 4 con 2 e 6: `sp-0-5` 2 · `sp-1` 4 · `sp-1-5` 6 · `sp-2` 8 · `sp-3` 12 · `sp-4` 16 · `sp-5` 20 · `sp-6` 24 · `sp-8` 32 · `sp-10` 40 · `sp-12` 48 · `sp-16` 64.
- **Quattro altezze di controllo, ognuna col suo raggio:** `ctrl-row` 30 / `r-6` dentro le righe di tabella; `ctrl-card` 32 / `r-8` dentro card e barre degli strumenti; `ctrl-form` 40 / `r-10` nei moduli; `ctrl-header` 44 / `r-12` nella testata della pagina. Al tocco (`pointer: coarse`) tutti salgono a 44.
- Raggi: `r-8` per opzioni, voci di menu, eventi; `r-12` per tendine, menu, avvisi, toast; `r-16` per card, tabelle, dialog; `r-20` per i fogli dal basso; 18 per i drawer; `r-full` per badge, chip, interruttori, pastiglie.
- Pagina desktop: testata alta `header-h` 76 con 32 ai lati; corpo con 24 sopra e 32 ai lati (20/32/24 nelle liste); 24 tra le card. Telefono: 16 ovunque.
- Larghezze: barra laterale `sidebar-w` 240 (chiusa `sidebar-rail-w` 64); dialog `ov-confirm` 420, `ov-wide` 760, `ov-grid` 900; drawer `ov-drawer` 520; ricerca globale `ov-search` 640; colonna laterale della scheda 360; ricerca della lista 360.

## Elevazione e ombre

Tre livelli e due casi: `shadow-sm` per card e tabelle a riposo e per il segmento scelto; `shadow-md` per la card cliccabile in hover e il tooltip; `shadow-lg` per dialog, toast e fogli; `shadow-glass` per il vetro; `shadow-drawer` per il drawer staccato dai bordi. In scuro l'ombra non basta: separa il bordo `border`. Livelli: `z-sticky` 10, `z-sidebar` 20, `z-overlay` 100, `z-popover` 150, `z-toast` 200, `z-tooltip` 300.

## Movimento

Cinque durate e una curva, come Ordinoo: `dur-instant` 80 ms (hover e pressione), `dur-fast` 140 ms (interruttori, chip, segmentati), `dur-fade` 180 ms (entrata di tendine, dialog, toast), `dur-normal` 220 ms (linea dei tab e pastiglia della barra che scivolano; uscita dei drawer), `dur-slow` 300 ms (crescita delle barre dei grafici), `dur-drawer` 240 ms (entrata di drawer e fogli). Curva `ease` per tutto, `ease-enter` per gli overlay che entrano.

- Tendine e menu: entrano con opacità e scala da 0,96 (e 6 px dall'alto), escono a 0,97.
- Dialog: scala e opacità. Drawer: 28 px da destra. Fogli: dal basso. Toast: 12 px dall'alto.
- Ogni overlay esce animato: resta montato il tempo dell'uscita.
- Linea dei tab e pastiglia della barra laterale **scivolano** da una voce all'altra; non si rimontano.
- Card cliccabili: si sollevano di 2 px con `shadow-md` in 180 ms. Bottoni premuti: mezzo pixel in giù. Selettore quantità: scala 0,92.
- Scheletri: un riflesso che scorre ogni 1,4 s. Barre dei grafici: crescono dalla base.
- Con `prefers-reduced-motion` non si anima niente.

## Stati dei componenti

| | Passaggio | Fuoco da tastiera | Premuto | Disabilitato |
|---|---|---|---|---|
| Bottone primario | `primary-hover` | anello `focus-color` 2 px staccato 2 px | `primary-pressed`, giù di 0,5 px | fondo `surface-active`, testo `text-disabled` |
| Bottone secondario | `surface-hover` + `border-field-hover` | anello | `surface-active` | bordo `border`, testo `text-disabled` |
| Bottone terziario e icona | `surface-hover` | anello | `surface-active` | testo `text-disabled` |
| Campo | bordo `border-field-hover` | bordo `focus-color` + `field-focus-halo` | — | `field-bg-disabled`, bordo `border` |
| Campo con errore | resta `danger-solid` | alone `danger-bg` | — | — |
| Riga di tabella e di lista | `surface-hover` | anello | `surface-active` | — |
| Voce di menu e opzione | `glass-hover` (dentro il vetro) | la stessa, con le frecce | — | testo `text-disabled` |
| Opzione scelta | `accent-wash-strong` | — | — | — |
| Tab | `surface-hover` (l'attivo non reagisce) | anello | `accent-wash-strong` | — |
| Voce della barra laterale | `surface-hover`, testo `text-primary` | anello | `accent-wash-strong` | — |

Il fuoco si vede solo da tastiera (`:focus-visible`). I campi mostrano il fuoco con il bordo e l'alone, non con l'anello. Tutto ciò che si clicca ha il cursore a mano; ciò che è disabilitato ha `not-allowed`.

## Layout e navigazione

- **Il guscio** (`AppShell`): da 1280 px barra laterale aperta (240); 1024–1279 barra a icone (64), che si apre sopra la pagina toccando la tessera; sotto 1024 testata da 56 (`MobileHeader`) e barra in basso da 72 (`BottomNav`) con «Menu» che apre tutte le sezioni in un foglio. Si adatta alla larghezza del contenitore.
- **La barra laterale** ha tre parti: la testata di marca (nome o logo, cambio di contesto, ricerca globale con «/», l'azione che si fa più spesso in accento pieno); le sezioni (prima quelle che cambiano con il contesto, poi quelle che valgono per tutto, con una micro-etichetta); chi sei in fondo, con il cambio di tema.
- **La pagina** ha una testata (`PageHeader`: titolo, contesto, al massimo tre comandi a destra con il primario per ultimo) e un corpo che scorre. Le pagine tipo sono tre: elenco (`ListPage`), scheda (`DetailPage`), impostazioni (`SettingsPage`); vedi `pattern.md`.
- **Overlay:** `Dialog` per confermare o per un modulo di due campi; `Drawer` per lavorare su qualcosa senza lasciare la pagina; `Sheet` su telefono per filtri e scelte; `Popover` per tendine e spiegazioni brevi; `CommandSearch` per cercare da ovunque. Uno solo per volta, più le tendine dentro. Esc e il clic sul velo chiudono quello in cima; il fuoco entra nel pannello e torna dove era.
- **Il contesto** (sede, azienda, cantiere) si cambia dalla testata della barra o, su telefono, toccando il titolo; un toast conferma «Ora sei a Sede Torino».

## Componenti per piattaforme SaaS

Oltre ai componenti di base, STC ha i pezzi che tornano in ogni gestionale. Ognuno ha la sua scheda con l'anteprima.

- **Input con formato:** `MoneyInput` (euro all'italiana, legge il numero), `NumberInput` (con − e +, unità), `PhoneInput` (prefisso), `CardInput` (circuito, scadenza, CVC, controllo di Luhn), `IbanInput`, `TaxIdInput` (codice fiscale e partita IVA con controllo), `OtpInput`, `PasswordInput` (forza e regole), `CopyField`. Le funzioni di controllo (`luhn`, `ibanOk`, `cfOk`, `pivaOk`) e di formato (`formatEuro`, `formatNumero`, `parseMoney`) sono esportate.
- **Scelte:** `Combobox` (cerca e crea), `MultiSelect`, `TagInput`, `Slider` (anche intervallo), `WeekdayPicker`, `ColorSwatches`, `InlineEdit`, `RadioCards`, `CheckboxCards`, `TileSelect`, `PlanPicker`, `ChoiceChips`, `ToggleGroup`, `IconSegmented`.
- **Passi e moduli lunghi:** `Stepper`, `VerticalStepper`, `MobileSteps`, `WizardPage`, `OnboardingChecklist`, `ColumnMapper` (import), `FormSection` e `FormRow`, `ErrorSummary`, `SaveBar`.
- **Testate:** `RichPageHeader` (briciole, avatar, stato, azioni, numeri, tab), `HeroHeader` (cruscotto, su superficie di marca), `CompactHeader` (appiccicata quando si scorre), `SectionHeader`, `MobileLargeTitle`, `Breadcrumb`, `HeaderStats`, `StatusPath`.
- **Navigazione:** `TopNav`, `PillTabs`, `VerticalTabs`, `Accordion`, `TreeView`, `CheckboxTree`, `NotificationCenter`, `CoachMark`.
- **Dati e collaborazione:** `TrendTile`, `Delta`, `UsageMeter`, `Timeline`, `Comment` e `CommentComposer` con `Mention`, `AvatarGroup`, `Tag`, `Kanban`, `FileList`, `HoverCard`, `ExpandableTable`, `NotificationMatrix`, `IntegrationCard`, `PaymentMethod`, `UpgradeCard`.
- **Grafici:** `LineChart` (con confronto), `AreaChart`, `DonutChart`, `StackedBarChart`, `ComboChart` (due assi), `FunnelChart`, `Sparkline`, `ProgressRing`, `CalendarHeatmap`, `HourHeatmap`. Ognuno ha la tabella per lo screen reader.
- **Azioni:** `SplitButton`, `ButtonGroup`, `ButtonCount`, `Popconfirm`, `TypeToConfirm` (per cancellare cose grandi), `SegmentedProgress`, `StackedProgress`.
- **Telefono:** `ActionSheet`, `SwipeRow`, `Fab`, `CtaBar`, `PinPad`, `DayStrip`.

## Caricamento

Ogni attesa ha la sua forma, con l'accento e un velo di vetro leggero. Una regola di tempo vale per tutti: sotto 300 ms non si mostra niente; a 300 ms compare lo scheletro o la rotella nel controllo; a 2 s si aggiunge la frase su cosa arriva; a 10 s «Ci vuole più del solito» con Riprova o Continua in background.

- **Piccoli:** `LoaderSpinner` (arco d'accento su traccia tenue, 14–24), `Button loading` (la rotella prende il posto dell'icona, la larghezza non cambia), `TypingDots`, `SaveStatus` («Salvo», poi «Salvato · 12:04»). Nei campi in verifica e negli interruttori in salvataggio la rotella sta a destra o dentro il pallino.
- **Dentro la pagina:** `Loader` (tessera di vetro da 64 con bagliore e frase, per card e pannelli), `LoadingPill` e `LoadMore`, `RefreshOverlay` (dati vecchi velati mentre si aggiornano), `RouteProgress` (linea da 3 px tra una sezione e l'altra).
- **Scheletri:** `SkeletonLayout` ricalca le pagine tipo: `table`, `kpi`, `detail`, `chart`, `calendar`, `list`, `panel`. Per un blocco singolo `Skeleton`, per una riga `SkeletonRow`.
- **Avanzamento:** `ProgressBar`, `ProgressRing`, `ProgressSteps` (lavori in più fasi), `FileProgress` e `UploadQueue`, `ProgressToast` (lavori lunghi in background), `DocumentLoader` (PDF, fatture, report).
- **Schermi di marca:** `BootScreen` per avvio, accesso e cambio di sede, su `brand-ink` con trama e bagliore; `PendingCard` per pagamenti e invii che non vanno interrotti.
- **Quando qualcosa non va:** `ReconnectBanner` (rete persa, conto alla rovescia), `StaleBadge` (dati vecchi con l'ora), `LoadState` (annullato o non caricato, al posto dello scheletro).

Mai una rotella sola a schermo intero: le schermate intere sono `BootScreen` o lo scheletro della pagina.

## Illustrazioni

Gli stati vuoti, gli esiti e i messaggi hanno un'illustrazione piccola (`Illustration`, 66 casi in 10 gruppi): una luce soffusa del colore del tema, la forma in vetro smerigliato, righe al posto del testo e un solo bollino pieno che dice il caso (`?` non trovato, `+` primo uso, spunta riuscito, croce errore, `!` attenzione, lucchetto sicurezza, orologio attesa).

- **Dove:** in `EmptyState` con `illustration="<nome>"` al posto di `icon`; da sola nelle schermate di esito (email inviata, password aggiornata, pagamento registrato).
- **Misure:** `md` 120 per pagine e card grandi, `sm` 88 per drawer e pannelli, `xs` 56 accanto al testo. Mai più larga del titolo che l'accompagna.
- **Movimento:** il bollino entra con un rimbalzo, la luce respira, il vetro galleggia di 2 px, e ognuna ha un gesto suo. Nelle griglie e nelle liste solo al passaggio (`animated="hover"`). Ferma con `prefers-reduced-motion`.
- **Colore:** dai token `accent`, `on-accent` e `ill-*`. Se cambi l'accento, cambia anche i token `ill-*` (stessa tinta).

Le icone tonde dei vuoti restano per i vuoti piccoli dentro le card, dove un'illustrazione sarebbe troppo.

## Logo

Il logo di STC è l'**Esagono** con **STC in Michroma**, in colonna: il simbolo sopra, la sigla sotto e, sotto ancora, «Standard Template Construct». Il simbolo è una base esagonale in vetro con tre tracce che arrivano da fuori a 120° e un nodo esagonale pieno al centro: richiama il nome, progetti antichi e una macchina che costruisce da un modello. È disegnato come le illustrazioni, con la luce chiara del tema dietro, il vetro smerigliato e un solo pezzo pieno in `accent`. La sigla è in Michroma (Google Fonts, licenza OFL), largo e squadrato; il nome per esteso in JetBrains Mono. Nei file il testo è già in tracciati: non serve installare i caratteri.

- **Logo in colonna:** `logo-chiaro`, `logo-scuro` da 120 px di larghezza in su (copertine, schermate di avvio, presentazioni). Sotto i 120 px usa `logo-breve`, senza il nome per esteso.
- **In riga:** `logo-riga` (simbolo e STC affiancati) nelle testate e nella barra laterale.
- **Solo simbolo:** in vetro (`simbolo-chiaro`, `simbolo-scuro`) da 64 px in su; piatto tra 32 e 48 px; `simbolo-piccolo`, con tratti più grossi, a 24 e 16 px. Sotto i 64 px il vetro sfocato si impasta.
- **Un colore:** `simbolo-mono-nero` e `simbolo-mono-bianco` per stampa, timbri e fondi fotografici.
- **Favicon:** `favicon.svg` passa da sola tra chiaro e scuro.
- **Spazio libero:** attorno al logo almeno un quarto del lato del simbolo. Non si ruota, non si deforma, non si ricompone con un altro carattere e non si ricolora fuori dalla tinta dell'accento.

Il logo è di STC. Un progetto costruito su STC mette il suo logo al posto di `Wordmark` (prop `logo` di `Sidebar`, `AuthScreen`, `MemberApp`). I file sono nel gruppo **Logo** delle risorse.

## Iconografia

Solo Lucide, tratto 1,5 su 24, colore dal testo (`Icon`). Misure: 14 nei badge e nei controlli da 30, 16 nei controlli da 32 e nei menu, 18 di serie, 20 nelle barre in basso, 24 negli stati vuoti. Un concetto, un'icona: la barra laterale fa da àncora e la stessa icona torna ovunque per lo stesso concetto (lo stesso pacchetto nella barra, nel menu e nella scheda). Le icone di stato sono fisse: `circle-check` successo, `octagon-x` blocco, `triangle-alert` attenzione, `info` informazione, `circle-pause` sospeso. Niente emoji. STC contiene già tutta la raccolta Lucide (2.322 icone, versione 1.70.0, licenza ISC): si cercano nella scheda `Icon` e si chiamano con il nome di lucide.dev (`<Icon name="chart-pie" />`). Un'icona non si disegna mai a mano.

Per i progetti senza logo il nome del prodotto si scrive con `Wordmark` in carattere display, e la tessera `AppMark` porta l'iniziale in `brand-accent` su `brand-ink`. Il logo di STC è nella sezione Logo.

## Accessibilità

- Ogni testo sta sopra 4,5:1 sulle superfici che il suo token nomina, nei due temi; icone, bordi che contano e anello di fuoco sopra 3:1. Eccezione voluta: `border-field-hover` (bordo delle caselle vuote) è 2,1:1 in chiaro e 2,5:1 in scuro; le caselle hanno sempre un'etichetta accanto.
- Tutto si usa da tastiera: Tab tra i comandi, frecce nelle liste, nei tab, nei segmentati e nel calendario, Invio per scegliere, Esc per chiudere. Il fuoco resta dentro dialog e drawer.
- I bottoni a sola icona hanno sempre `label`. Gli stati non sono mai solo colore. I grafici hanno una tabella nascosta con i dati.
- La casella in una riga di tabella sceglie la riga e non la apre; il ⋮ non apre la riga.

## Cosa non fare

- Due bottoni `primary` nella stessa vista; l'accento usato per dire «tutto bene».
- Colori, raggi, ombre o durate scritti a mano nei componenti.
- `<select>`, `<input type="date">` o caselle native a vista.
- Un «Salva» in fondo alle impostazioni.
- Spinner a pagina intera; pagine bianche mentre carica o se c'è un errore.
- Card dentro card con bordo; più di due azioni a vista in una riga.
- Testi in maiuscolo per enfasi, emoji, punti esclamativi, «Errore» senza spiegazione.
