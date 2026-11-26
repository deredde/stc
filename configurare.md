# Configurare STC: le domande iniziali

Quando qualcuno inizia un progetto con STC, l'AI fa **sei domande**, tutte in un messaggio solo, prima di disegnare la prima schermata. Le risposte diventano la configurazione del progetto: tema, modo chiaro o scuro, quanta marca, quali componenti. Così si parte giusti e non si rifà il lavoro dopo.

Questo file serve alle AI (lo richiama `CLAUDE.md`), ma si può leggere anche da persone.

## Quando farle

- **Sì:** all'inizio di un progetto nuovo, quando non esiste ancora una configurazione (`stc-config.md` nel progetto, o una sezione «Configurazione STC» nelle istruzioni del progetto).
- **Solo quelle che mancano:** se la persona ha già detto qualcosa (per esempio «un gestionale per palestre, tema scuro»), non chiederlo di nuovo. Chiedi il resto.
- **No:** se la configurazione c'è già, se la persona chiede solo una cosa piccola (una domanda, una correzione), o se dice «fai tu», «parti», «di serie». In quel caso usa le risposte di serie (segnate qui sotto) e dillo in una riga.
- **Mai a metà lavoro.** Se la configurazione cambia dopo, si aggiorna il file e si va avanti.

## Come farle

- Tutte e sei insieme, numerate, con le opzioni a lettere. La persona deve poter rispondere da telefono con una riga sola, tipo «1a 2c 3 tahini 4a 5b 6 Palestra Nord».
- Ogni domanda ha la sua **risposta di serie**, segnata. Chi non risponde a una domanda prende quella.
- Una riga di spiegazione per domanda al massimo. Niente gergo: «tema», «colori», «telefono», non «palette» o «breakpoint».
- In italiano e del tu, come STC. Se la persona scrive in un'altra lingua, fai le domande nella sua lingua e aggiungi «L'interfaccia la scrivo in italiano?».
- Non chiedere ciò che STC ha già deciso (la parte B di `adattare.md`): forma dei bottoni, misure, movimento, testi, stati. Non sono scelte del progetto.

## Le sei domande

Puoi copiarle così, adattando solo il saluto:

```
Prima di iniziare, sei domande veloci per impostare STC.
Rispondi anche solo con le lettere (es. «1a 2c 3a 4c 5b»). Dove non rispondi, uso quella di serie (★).

1. Cosa costruisci? (anche più di una)
   a) Un gestionale o un pannello di lavoro ★
   b) Un'app per i clienti, sul telefono
   c) Un sito pubblico o una landing
   d) Un negozio con carrello e pagamento
   e) Un servizio in abbonamento (piani, prove, fatture)
   f) Un assistente AI o funzioni AI
   In una riga: cosa fa e per chi.

2. Dove si usa soprattutto?
   a) Computer ★   b) Telefono   c) Tutti e due allo stesso modo

3. Che colori?
   a) STC di serie: neutro con il blu elettrico ★
   b) Un tema pronto: dimmi il nome (chiari: Tahini, Sage, Butter, Linen…; scuri: Obsidian, Nocturne, Forest, Graphite…)
   c) I miei colori: un fondo, un colore principale e un colore di richiamo
   d) Solo il mio colore di richiamo, il resto di serie

4. Chiaro o scuro?
   a) Si parte chiaro, con l'interruttore per lo scuro ★
   b) Si parte scuro, con l'interruttore per il chiaro
   c) Solo chiaro   d) Solo scuro

5. Quanta marca?
   a) Sobria: neutro, il colore solo dove serve
   b) Di serie: la superficie di marca nei posti previsti ★
   c) Espressiva: più superfici di marca e vetro, sempre nelle regole di STC

6. Nome e logo?
   Il nome del prodotto, e se hai un logo (file SVG) o no. Se hai dei caratteri tuoi, dimmeli; se no uso quelli di STC.
```

## Cosa vuol dire ogni risposta

### 1. Cosa costruisci → da dove partire

| Risposta | Si parte da | Leggi |
|---|---|---|
| a) Gestionale ★ | `AppShell` con `ListPage`, `DetailPage`, `SettingsPage`; `Table` con `TableToolbar` e `FilterChips`; `Drawer` per lavorare | `pattern.md` › Elenco, Scheda, Impostazioni |
| b) App per i clienti | `MemberApp`, `PassCard`, `BottomNav`, `Sheet`; tra i complessi `HomeWidgets`, `Stories`, `AppIntro` | `pattern.md` › App per l'utente finale |
| c) Sito pubblico | le sezioni (`BentoGrid`, `FeatureTabs`, `VersusTable`, `Changelog`, `Newsletter`); `CookieConsent`; il prodotto si mostra con `Screen` | README › Componenti complessi |
| d) Negozio | `ProductCard`, `CartDrawer`, `OnePageCheckout`, `ShippingPicker`, `PromoCode`, `OrderSummary`, `OrderConfirmed` | README › Componenti complessi › Checkout |
| e) Abbonamento | `PlanPicker`, `UsageMeter`, `PaymentMethod`, `UpgradeCard`, `TrialBanner`, `OnboardingChecklist` | `pattern.md` › Piano e fatturazione |
| f) AI | `AssistantPanel`, `StreamingAnswer`, `ReasoningStatus`, `SummaryTop` | README › Componenti complessi › AI |

L'accesso è sempre `AuthScreen`. La riga «cosa fa e per chi» decide le sezioni della barra laterale (una icona Lucide per sezione) e i testi d'esempio: niente «Lorem ipsum».

### 2. Dove si usa

- **a) Computer ★:** il guscio completo con la barra laterale; `Drawer` per lavorare, `Dialog` per confermare. Il telefono funziona lo stesso (il guscio si adatta da solo), ma si disegna prima per il computer.
- **b) Telefono:** si disegna prima per il telefono: `MobileHeader`, `BottomNav`, `Sheet` al posto dei drawer, `ActionSheet` per le conferme, controlli alti 44.
- **c) Tutti e due:** ogni schermata va controllata sulle due misure, sotto e sopra i 1024 px.

### 3. Colori → il tema

- **a) STC di serie ★:** nessun attributo. Si carica solo `tokens.css`.
- **b) Tema pronto:** si carica `temi.css` dopo `tokens.css` e si mette `data-palette="<id>"` sulla radice. Ogni tema pronto è **o chiaro o scuro**: il modo lo decide il tema, non la domanda 4 (vedi sotto). Elenco in fondo a questo file e in README › Temi pronti.
- **c) I miei colori:** si crea un tema nuovo 60·30·10 (`main` il fondo, `second` testo e struttura, `accent` il richiamo) seguendo README › Temi pronti › Un tema nuovo, con i controlli di contrasto. Se il colore di richiamo è rosso o verde, Nota STC M2.
- **d) Solo il richiamo:** si cambia solo la scala `accent-*` (e i token `ill-*`) come dice `adattare.md` › Scegliere l'accento. Stessa attenzione a M2.

### 4. Chiaro o scuro

- **a) Chiaro con interruttore ★** e **b) Scuro con interruttore:** `data-theme="light"` o `"dark"` sulla radice; l'interruttore sta in fondo alla barra laterale (chi sei, con il cambio di tema). Al primo accesso si può seguire il sistema (`prefers-color-scheme`); poi decide la persona (D11).
- **c) Solo chiaro** o **d) Solo scuro:** si toglie l'interruttore. È una scelta del progetto, non una deroga, ma dillo in una riga: chi lavora molte ore o con poca luce di solito vuole poter scegliere.
- **Con un tema pronto (3b):** il tema scelto vale per il suo modo. Per l'altro modo proponi un tema pronto dell'altro gruppo con un richiamo vicino (per esempio `butter` chiaro con `espresso` scuro, tutti e due con il blu), oppure STC di serie. Se la persona vuole un solo modo, vale 4c o 4d.

### 5. Quanta marca

- **a) Sobria:** la superficie di marca (`brand-ink`) solo nella testata della barra laterale e nell'accesso. Illustrazioni nei vuoti come sempre, ma in misura `sm` dove possibile. Niente trame.
- **b) Di serie ★:** come dice V6: testata della barra, accesso, tessera dell'app, un numero in evidenza. Una trama per superficie.
- **c) Espressiva:** in più `HeroHeader` sul cruscotto, `BrandPanel` nell'accesso con trama e bagliore, `GlassPillNav` nei siti pubblici. **Resta** una superficie di marca per schermata (V6) e un solo primario (P1): se la persona chiede di più, Nota STC.

### 6. Nome, logo e caratteri

- **Logo:** prop `logo` di `Sidebar`, `AuthScreen`, `MemberApp`. Senza logo, il nome con `Wordmark` e la tessera `AppMark` con l'iniziale. Il logo di STC non si usa come logo del progetto (V7).
- **Caratteri:** di serie Inter, Space Grotesk per i titoli e JetBrains Mono per i numeri. Caratteri propri vanno nei tre ruoli di `type.families` (V3, `adattare.md`): uno per i titoli, uno per il testo, un mono per i numeri.

## Dopo le risposte

1. **Riassumi** in un blocco breve cosa hai capito, e parti. Non chiedere conferma del riassunto: chi vuole cambiare qualcosa lo dice.
2. **Scrivi la configurazione** nel progetto, in `stc-config.md` alla radice. Se non puoi scrivere file (per esempio in una chat), mettila nel messaggio e suggerisci di incollarla nelle istruzioni del progetto.
3. **Usala sempre:** prima di ogni schermata rileggi `stc-config.md`. Le regole di STC valgono lo stesso: la configurazione sceglie tra ciò che STC prevede, non lo sostituisce.

### Modello di `stc-config.md`

```md
# Configurazione STC

- Prodotto: <cosa fa e per chi>
- Tipo: gestionale · app clienti · sito · negozio · abbonamento · AI
- Schermi: computer · telefono · tutti e due
- Tema: STC di serie · data-palette="<id>" · tema nuovo (main #…, second #…, accent #…) · solo accento #…
- Modo: parte chiaro con interruttore · parte scuro con interruttore · solo chiaro · solo scuro
- Tema per l'altro modo: <id o «STC di serie»>
- Marca: sobria · di serie · espressiva
- Nome: <nome> · Logo: <file o «Wordmark»> · Caratteri: <di serie o titoli / testo / numeri>
- Sezioni della barra: <nome e icona Lucide di ognuna>

## Nel codice
<html data-theme="light" data-palette="tahini">
CSS: tokens.css, temi.css, components/bundle.css

## Deroghe
<codice regola, dove, perché>
```

## Temi pronti

Per la domanda 3b. Il nome dice i tre colori: fondo · principale · richiamo.

| Chiari | | Scuri | |
|---|---|---|---|
| `tahini` | Crema, blu notte, mandarino | `anthracite` | Grigio antracite, sabbia, ciano |
| `pomelo` | Rosa, verde notte, giallo | `nocturne` | Blu notte, lavanda, giallo |
| `horchata` | Crema, verde loden, rosso | `obsidian` | Nero, osso, arancio |
| `placid` | Menta, blu, rosa acceso | `forest` | Verde bosco, salvia, corallo |
| `oat` | Avena, caffè, verde matcha | `aubergine` | Melanzana, quarzo rosa, lime |
| `porcelain` | Porcellana, prugna, zafferano | `teal` | Petrolio scuro, verde acqua, arancio |
| `sage` | Salvia, verde scuro, corallo | `espresso` | Caffè, latte, blu |
| `butter` | Burro, cacao, blu cobalto | `inknavy` | Blu inchiostro, ghiaccio, magenta |
| `linen` | Lino, grafite, viola | `olive` | Oliva scuro, kaki, viola |
| `peach` | Pesca, vino, verde laguna | `oxblood` | Bordeaux scuro, sabbia rosa, menta |
| `cloud` | Azzurro nuvola, blu notte, arancio | `graphite` | Grafite, perla, lime acido |
| `lilac` | Lilla, melanzana, giada | `storm` | Blu tempesta, cielo, ambra |
| `dune` | Sabbia, ruggine, turchese | `moss` | Muschio, lichene, fucsia |
| `stone` | Pietra, petrolio, rosa acceso | `plum` | Prugna, lilla, acqua |
| `vanilla` | Vaniglia, bordeaux, oro | `cosmic` | Blu cosmo, pietra di luna, rosso brace |

I colori esatti sono in `temi.json`. I colori di stato (errore, successo, attenzione) restano quelli di STC in ogni tema.
