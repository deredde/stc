# Componenti di STC

<!-- File generato da scripts/guida-ai.mjs --scrivi: non modificarlo a mano. -->

Tutti i 259 componenti, per gruppo, con cosa sono e le regole di `regole.md` che li riguardano. Prima di usarne uno leggi la sua scheda (`components/<Nome>/README.md`); le props stanno in `components/index.d.ts`.

## Layout

| Componente | Cos'è | Regole |
|---|---|---|
| [`AppShell`](components/AppShell/README.md) | Il guscio del gestionale: barra laterale e pagina, che si adatta alla larghezza del contenitore. | C7 |
| [`AuthScreen`](components/AuthScreen/README.md) | Accesso, attivazione, password: superficie di marca, titolo e frase, il modulo su vetro. | C7 |
| [`DetailPage`](components/DetailPage/README.md) | Pagina di dettaglio: indietro, avatar e titolo con lo stato, comandi, tab; sotto, colonna principale e colonna laterale da 360. | C7 |
| [`ListPage`](components/ListPage/README.md) | Pagina di elenco: testata, barra con ricerca e filtri, filtri applicati con «Azzera», la tabella che riempie il resto. | C7 |
| [`MemberApp`](components/MemberApp/README.md) | L'app per l'utente finale, su telefono: marchio e avatar in cima, titolo, card una sotto l'altra, la barra a quattro voci. | C7 |
| [`PassCard`](components/PassCard/README.md) | Tessera digitale su superficie di marca: stato, codice (QR o numero), quanto dura ancora. | — |
| [`SettingsPage`](components/SettingsPage/README.md) | Impostazioni: elenco delle sezioni a sinistra, la sezione a destra con titolo, una riga di spiegazione e i comandi. | C7 |
| [`StatePage`](components/StatePage/README.md) | Una pagina che non può mostrare il suo contenuto: dice cosa succede e cosa fare. Di serie ha l'illustrazione grande, animata. | D1 · S4 |
| [`WizardPage`](components/WizardPage/README.md) | Pagina a passi per creare cose lunghe (un abbonamento, un preventivo): passi in testata, riepilogo a destra che si aggiorna, «Indietro» e «Continua» fissi in fondo. | C3 · C7 |

## Testate

| Componente | Cos'è | Regole |
|---|---|---|
| [`CompactHeader`](components/CompactHeader/README.md) | Testata compatta da 56 che resta in alto: compare allo scroll al posto della testata grande. | — |
| [`HeaderStats`](components/HeaderStats/README.md) | Tre o quattro numeri sotto il titolo di una scheda (azienda, commessa), separati da linee. | — |
| [`HeroHeader`](components/HeroHeader/README.md) | Testata di benvenuto della home: superficie di marca con la griglia a punti e il bagliore, la frase che dice cosa c'è da fare oggi, le azioni rapide. | — |
| [`RichPageHeader`](components/RichPageHeader/README.md) | Testata di pagina ricca: percorso sopra, titolo con badge, sottotitolo, azioni, e sotto a scelta i numeri, lo stato a passi, gli strumenti del periodo o i tab. | — |
| [`SectionHeader`](components/SectionHeader/README.md) | Testata di una sezione dentro la pagina: titolo con una riga di spiegazione e le azioni piccole a destra. In versione card con il contatore e il link «Tutti …». | — |
| [`StatusPath`](components/StatusPath/README.md) | Lo stato di un documento con un ciclo (preventivo, ordine) come percorso a frecce: passati grigi con la spunta, attuale pieno. | — |

## Navigazione

| Componente | Cos'è | Regole |
|---|---|---|
| [`Accordion`](components/Accordion/README.md) | Fisarmonica: ogni voce ha un titolo e sotto il riassunto di cosa c'è dentro, che si legge anche da chiusa. | — |
| [`AppTabBar`](components/AppTabBar/README.md) | Barra dell'app per l'utente finale: la voce attiva ha l'icona in una pastiglia piena d'accento. | — |
| [`BottomNav`](components/BottomNav/README.md) | Barra in basso del gestionale su telefono: quattro voci, quella al centro piena d'accento. | — |
| [`Breadcrumb`](components/Breadcrumb/README.md) | Percorso per le schede a più livelli, al posto di «‹ Indietro». L'ultimo livello non si clicca. | — |
| [`CoachMark`](components/CoachMark/README.md) | Giro guidato: un fumetto scuro alla volta, con la cosa nuova illuminata. | — |
| [`CommandSearch`](components/CommandSearch/README.md) | Ricerca globale, da ogni pagina con «/»: ultimi aperti quando è vuota, risultati evidenziati, «Crea» quando non trova niente. | — |
| [`DocTabs`](components/DocTabs/README.md) | Più documenti aperti come schede: si fissano, si spostano, si chiudono. Chiede prima di perdere le modifiche. | — |
| [`GlassPillNav`](components/GlassPillNav/README.md) | In cima è una barra normale; quando scorri si stringe in una pillola di vetro sospesa. | — |
| [`IconSegmented`](components/IconSegmented/README.md) | Segmentato con le icone, per cambiare vista (griglia, lista, mappa). | — |
| [`ListDetail`](components/ListDetail/README.md) | L'elenco a sinistra e il dettaglio a destra, con il bordo da trascinare. Su telefono uno alla volta. | — |
| [`MegaMenu`](components/MegaMenu/README.md) | Un menu largo per i siti con tante pagine: colonne di link e una novità in evidenza. Su telefono diventa una fisarmonica. | — |
| [`MobileHeader`](components/MobileHeader/README.md) | Testata da 56 su telefono: tessera del prodotto, titolo della pagina e il contesto sotto. | — |
| [`NotificationCenter`](components/NotificationCenter/README.md) | Pannello delle notifiche dalla campanella: pallino d'accento sulle nuove, gruppi per giorno, ore in mono, icona per tipo. | — |
| [`PageHeader`](components/PageHeader/README.md) | La testata della pagina: titolo, una riga di contesto, al massimo tre comandi a destra. | — |
| [`PageToc`](components/PageToc/README.md) | Le sezioni di una pagina lunga, con la barra che segue dove sei e quanto manca alla fine. | — |
| [`Pagination`](components/Pagination/README.md) | Piede delle tabelle: «1–6 di 1.284 clienti» e le due frecce. | — |
| [`PillTabs`](components/PillTabs/README.md) | Tab a pastiglia per i filtri rapidi di una lista, con il conteggio. | — |
| [`SettingsNav`](components/SettingsNav/README.md) | Elenco delle sezioni delle impostazioni, a sinistra, largo 220. | — |
| [`Sidebar`](components/Sidebar/README.md) | La barra laterale del gestionale: testata di marca con contesto, ricerca e azione principale; le sezioni con le voci; chi sei in fondo. | — |
| [`Tabs`](components/Tabs/README.md) | Tab con il tab scelto in vetro: una pillola di vetro che scivola da un tab all'altro, con dietro due luci dell'accento che scorrono lente (variante «Deriva»). Contatori grigi. | D5 · C5 |
| [`TopNav`](components/TopNav/README.md) | Barra di navigazione in alto, per prodotti con 3–5 sezioni e senza cambio di sede. Stessa pastiglia della barra laterale. | — |
| [`TreeView`](components/TreeView/README.md) | Albero di categorie o cartelle: rientro di 20 per livello, conteggio in mono a destra. Con `CheckboxTree` diventa l'elenco dei permessi a gruppi, con il gruppo «a metà» se non tutto è scelto. | — |
| [`TwoLevelSidebar`](components/TwoLevelSidebar/README.md) | Le aree a sinistra come icone; accanto il pannello con le voci dell'area scelta, che si chiude. | — |
| [`VerticalTabs`](components/VerticalTabs/README.md) | Tab verticali con la barretta d'accento, per dialog larghi e drawer con molte sezioni. | — |

## Azioni

| Componente | Cos'è | Regole |
|---|---|---|
| [`Button`](components/Button/README.md) | Il bottone: un verbo che dice cosa succede, in frase («Registra pagamento»), mai «OK» o «Invia». **Quando:** ogni azione che cambia qualcosa. Per andare da un'altra parte usa un link o una voce di navigazione. | P1 · D4 · S2 |
| [`ButtonGroup`](components/ButtonGroup/README.md) | Bottoni attaccati per azioni vicine (precedente e successivo) e `ToggleGroup` per scegliere un'opzione o più; `ButtonCount` aggiunge il contatore dentro un bottone. | — |
| [`IconButton`](components/IconButton/README.md) | Bottone con la sola icona, per comandi che tutti riconoscono (⋮, chiudi, modifica, filtri). | — |
| [`Menu`](components/Menu/README.md) | Menu di azioni dietro il bottone ⋮ (o un altro attivatore): le azioni che non stanno a vista. | — |
| [`SplitButton`](components/SplitButton/README.md) | Bottone diviso: l'azione principale a sinistra, le varianti nel menu a destra. | — |
| [`TextLink`](components/TextLink/README.md) | Link d'azione nel testo e nelle card: «Apri», «Tutti gli ordini», «Azzera». | — |

## Form

| Componente | Cos'è | Regole |
|---|---|---|
| [`AddressMap`](components/AddressMap/README.md) | Si scrive la via e si sceglie tra i suggerimenti. Poi la mappa conferma il punto, e il segnaposto si sposta sull'ingresso se serve. | — |
| [`CardInput`](components/CardInput/README.md) | Carta di pagamento in un solo blocco: numero, scadenza e codice. Il circuito si riconosce dalle prime cifre e il numero si controlla appena è completo. | — |
| [`ChatForm`](components/ChatForm/README.md) | Le stesse domande di un modulo, ma come una chat: l'assistente chiede, tu rispondi scrivendo o con i bottoni rapidi. Ogni risposta si può correggere. | — |
| [`Checkbox`](components/Checkbox/README.md) | Casella per scelte indipendenti; anche tre stati («alcuni scelti») in testa alle tabelle. | P6 |
| [`CheckboxCards`](components/CheckboxCards/README.md) | Scelta multipla fatta di card, per aggiungere moduli o servizi. Sotto, il totale che cambia mentre scegli. | — |
| [`ChoiceChips`](components/ChoiceChips/README.md) | Chip di scelta, una sola o più di una: bordo e testo primari con la spunta, non un fondo colorato. | — |
| [`ColorSwatches`](components/ColorSwatches/README.md) | Scelta di un colore tra i campioni della palette, per sale, categorie, calendari. | — |
| [`Combobox`](components/Combobox/README.md) | Ricerca con i suggerimenti sotto: la parte trovata è evidenziata, frecce e Invio per scegliere, in fondo «Crea …» con il testo già scritto. | — |
| [`CopyField`](components/CopyField/README.md) | Campo di sola lettura con il bottone «Copia», che diventa «Copiata» per un secondo e mezzo. | — |
| [`Field`](components/Field/README.md) | Il contenitore di ogni campo: etichetta sopra in frase, aiuto o errore sotto, contatore a destra. | D9 |
| [`FileDrop`](components/FileDrop/README.md) | Zona dove trascinare un file, con «Scegli file» e, su telefono, «Scatta foto». | — |
| [`FilterMenu`](components/FilterMenu/README.md) | Bottone di filtro della barra sopra una lista: apre una tendina a scelta singola o multipla. | — |
| [`FormSection`](components/FormSection/README.md) | Sezione di un modulo lungo: titolo e spiegazione a sinistra (280), campi a destra. Con `FormRow` i campi si affiancano con larghezze fisse; con `ErrorSummary` gli errori si elencano anche in cima, come link. | — |
| [`IbanInput`](components/IbanInput/README.md) | IBAN in maiuscolo e a gruppi di quattro mentre scrivi; il controllo del codice dice subito se c'è una cifra sbagliata. | D9 |
| [`ImageCrop`](components/ImageCrop/README.md) | Si trascina la foto dentro la cornice, si ingrandisce e si ruota. Le anteprime mostrano come apparirà nelle misure vere. | — |
| [`InlineEdit`](components/InlineEdit/README.md) | Testo che si modifica sul posto: la matita compare al passaggio, Invio salva, Esc annulla. | — |
| [`LongForm`](components/LongForm/README.md) | Per i moduli con tante sezioni: l'indice a sinistra dice dove sei, cosa manca e dove ci sono errori. Si salva da solo mentre scrivi. | — |
| [`MentionInput`](components/MentionInput/README.md) | Nel commento si scrive @ per citare una persona e # per un argomento. Le persone citate ricevono l'avviso. | — |
| [`MoneyInput`](components/MoneyInput/README.md) | Campo per gli importi: si scrivono solo le cifre, il punto delle migliaia arriva mentre scrivi e i decimali all'uscita dal campo. | D9 |
| [`MultiSelect`](components/MultiSelect/README.md) | Scelta di più voci da una lista: le scelte diventano chip dentro il campo e Backspace su un campo vuoto toglie l'ultima. | — |
| [`NumberInput`](components/NumberInput/README.md) | Numero con i bottoni − e +, l'unità dentro il campo e il valore che si aggiusta al passo quando esci. | — |
| [`OneQuestion`](components/OneQuestion/README.md) | Il questionario a schermo pieno: una domanda, una risposta, poi la successiva che sale dal basso. Si usa anche solo con la tastiera: lettere per le scelte, Invio per andare avanti. | — |
| [`OpeningHours`](components/OpeningHours/README.md) | La settimana con una o due fasce al giorno, la copia sui giorni feriali e i giorni speciali. In cima, come lo vedrà un cliente adesso. | — |
| [`OtpInput`](components/OtpInput/README.md) | Codice a più cifre (di solito 6) in caselle separate: si passa da sola alla successiva e l'incolla riempie tutto. | — |
| [`PasswordInput`](components/PasswordInput/README.md) | Password con l'occhio per mostrarla e, quando si crea, la barra della forza e i requisiti che si spuntano mentre scrivi. | — |
| [`PhoneInput`](components/PhoneInput/README.md) | Telefono con il prefisso in una tendina dentro il campo; il numero si divide da solo a gruppi (347 902 1188). | D9 |
| [`PlanPicker`](components/PlanPicker/README.md) | Tabella dei piani: tre colonne, prezzo in mono, il consigliato con il bordo primario e l'unico bottone primario. Il piano attuale ha il bottone spento. | C4 |
| [`QuantitySelector`](components/QuantitySelector/README.md) | Selettore quantità: meno, il numero, più. | — |
| [`RadioCards`](components/RadioCards/README.md) | Scelta singola fatta di card: tutta la card si clicca, la scelta prende il bordo primario. Per piani, metodi, opzioni con una spiegazione o un prezzo. | C4 |
| [`RadioGroup`](components/RadioGroup/README.md) | Scelta di una sola voce tra poche, tutte a vista. | — |
| [`Recurrence`](components/Recurrence/README.md) | Ogni quanto si ripete, in quali giorni e fino a quando. Sotto, la frase in italiano e le prossime date vere. | — |
| [`RepeatRows`](components/RepeatRows/README.md) | Un elenco di righe uguali da aggiungere, duplicare, spostare e togliere: le voci di un preventivo, i partecipanti, i contatti. | — |
| [`RichEditor`](components/RichEditor/README.md) | Il testo con la formattazione che serve davvero: grassetto, titoli, citazioni, elenchi e collegamenti. Con il conteggio e le scorciatoie. | — |
| [`SearchInput`](components/SearchInput/README.md) | Ricerca: della pagina (44) o dentro una card (32), con la × per svuotare. | — |
| [`Segmented`](components/Segmented/README.md) | Scelta tra 2–4 viste o modi: Oggi · Settimana · Mese. | C4 · C5 |
| [`Select`](components/Select/README.md) | Tendina di scelta singola, disegnata: tastiera, ricerca oltre le 8 voci, vetro. | P6 · C4 |
| [`SettingRow`](components/SettingRow/README.md) | Una regola che si accende o si spegne, in una card: titolo, una riga di spiegazione, l'interruttore. | P5 |
| [`SignaturePad`](components/SignaturePad/README.md) | Si firma col dito o col mouse, oppure si scrive il nome. Con la casella di conferma e il timbro di data e ora. | — |
| [`Slider`](components/Slider/README.md) | Cursore per un valore o un intervallo: il valore sta sopra, in mono, non in un fumetto. | — |
| [`SlotBooking`](components/SlotBooking/README.md) | Il giorno in una fila che scorre, gli orari liberi divisi tra mattina e pomeriggio, e l'orario tenuto per qualche minuto mentre si conferma. | — |
| [`Switch`](components/Switch/README.md) | Interruttore: accende o spegne una regola che vale subito. | P6 |
| [`TagInput`](components/TagInput/README.md) | Etichette libere: si scrive e si preme Invio (o la virgola). Backspace su un campo vuoto toglie l'ultima. | — |
| [`TaxIdInput`](components/TaxIdInput/README.md) | Codice fiscale o partita IVA: lunghezza fissa, lettera o cifra di controllo verificata, spunta quando torna. | D9 |
| [`Textarea`](components/Textarea/README.md) | Testo su più righe, con lo stesso guscio dei campi. | — |
| [`TextInput`](components/TextInput/README.md) | Campo di testo con i sei stati: a riposo, passaggio, fuoco, compilato, errore, disabilitato. | D9 |
| [`TileSelect`](components/TileSelect/README.md) | Tessere con icona per scegliere un tipo all'inizio di un percorso (che attività hai, che cosa vuoi creare). | C4 |
| [`WeekdayPicker`](components/WeekdayPicker/README.md) | I sette giorni come pulsanti tondi, per orari e ricorrenze; sotto, la regola scritta in una frase da leggere prima di salvare. | — |

## Date e ore

| Componente | Cos'è | Regole |
|---|---|---|
| [`DatePicker`](components/DatePicker/README.md) | Campo data: si scrive (gg/mm/aaaa) oppure si sceglie dal calendario, che si apre al fuoco. | P6 · D9 |
| [`DateRangePicker`](components/DateRangePicker/README.md) | Periodo: scorciatoie in alto, due clic sul calendario, «Applica». Il bottone mostra il periodo scelto. | — |
| [`TimePicker`](components/TimePicker/README.md) | Ora: si scrive («930» diventa 09:30) o si sceglie da una lista a passi di 15 minuti. `TimeRangePicker` per le fasce. | P6 |

## Passi

| Componente | Cos'è | Regole |
|---|---|---|
| [`ColumnMapper`](components/ColumnMapper/README.md) | Abbinamento delle colonne di un file da importare: ogni colonna con un esempio, la freccia, il campo del gestionale e lo stato. | — |
| [`MobileSteps`](components/MobileSteps/README.md) | I passi su telefono: «Passo 3 di 4» con la barra a segmenti e il nome del passo. | — |
| [`OnboardingChecklist`](components/OnboardingChecklist/README.md) | I primi passi dopo l'iscrizione, in una card in cima alla home finché non sono finiti. | — |
| [`Stepper`](components/Stepper/README.md) | Passi in orizzontale per un percorso a tappe: fatto = pieno con la spunta, attuale = anello con l'alone d'accento, errore = triangolo. | C3 |
| [`VerticalStepper`](components/VerticalStepper/README.md) | Passi in verticale per le configurazioni con una spiegazione per passo. Il passo attuale mostra i suoi bottoni, gli altri solo il titolo. | — |

## Overlay

| Componente | Cos'è | Regole |
|---|---|---|
| [`Dialog`](components/Dialog/README.md) | Dialog al centro per confermare o per un modulo breve: icona in una tessera, titolo, frase, campi, comandi. | P8 · D6 |
| [`Drawer`](components/Drawer/README.md) | Pannello che entra da destra, staccato dai bordi: si lavora senza lasciare la pagina. | P8 · D6 · C3 |
| [`Popover`](components/Popover/README.md) | Pannello ancorato in vetro: la base di tendine, menu e calendari, utile anche per spiegazioni brevi. | — |
| [`Sheet`](components/Sheet/README.md) | Foglio dal basso, su telefono: filtri, menu, scelte veloci. | P8 · C3 |

## Dati

| Componente | Cos'è | Regole |
|---|---|---|
| [`AvatarGroup`](components/AvatarGroup/README.md) | Avatar sovrapposti di 8 con il bordo della superficie; oltre il massimo, «+N». | — |
| [`BarChart`](components/BarChart/README.md) | Colonne a una serie: barre d'inchiostro, quella da notare in accento, griglia leggera e tooltip al passaggio. | — |
| [`BarList`](components/BarList/README.md) | Barre orizzontali in classifica: etichetta, barra, valore. | — |
| [`Card`](components/Card/README.md) | Il contenitore di ciò che sta nella pagina: bianco su fondo grigio, angoli da 16, ombra appena. | — |
| [`ClusterMap`](components/ClusterMap/README.md) | Tanti punti diventano gruppi con il numero. Toccando un gruppo la mappa si avvicina e i punti si separano. | — |
| [`Comment`](components/Comment/README.md) | Note interne e commenti su una scheda, con le risposte rientrate e le menzioni. Sotto, `CommentComposer` per scriverne una nuova. | — |
| [`Delta`](components/Delta/README.md) | Variazione rispetto a prima: una pastiglia con la freccia e il segno, mai solo il colore. | — |
| [`ExpandableTable`](components/ExpandableTable/README.md) | Tabella con le righe che si aprono sul dettaglio, i totali in fondo e la densità compatta. Per righe d'ordine, movimenti, voci di fattura. | — |
| [`FileList`](components/FileList/README.md) | Elenco dei documenti di una scheda: il tipo del file sulla sagoma, il nome, peso, data e chi l'ha caricato. | — |
| [`Gallery`](components/Gallery/README.md) | Le immagini a colonne con le proporzioni vere. Il visore si apre a tutto schermo: frecce, miniature, zoom e scorrimento col dito. | — |
| [`Gantt`](components/Gantt/README.md) | Le attività di un progetto sul tempo: si spostano e si allungano trascinando, con le dipendenze disegnate e i ritardi in evidenza. | — |
| [`GroupedTable`](components/GroupedTable/README.md) | Righe raggruppate con il subtotale e la quota sul totale, gruppi che si chiudono e il totale generale in fondo. | — |
| [`HoverCard`](components/HoverCard/README.md) | Scheda al passaggio sopra un nome sottolineato a puntini: chi è, due dati, al massimo due azioni. | — |
| [`IntegrationCard`](components/IntegrationCard/README.md) | Card di un'integrazione: logo, cosa fa in una frase, stato. Le card stanno in `IntegrationGrid`. | — |
| [`Kanban`](components/Kanban/README.md) | Bacheca a colonne: colonne incassate, card su superficie. La card trascinata ruota di 2° con l'ombra grande; dove cade compare la zona tratteggiata. | — |
| [`KeyValue`](components/KeyValue/README.md) | Coppie etichetta e valore: i dati di una scheda. | V4 |
| [`List`](components/List/README.md) | Lista di righe dentro una card: icona o avatar, titolo, una riga sotto, qualcosa a destra. | — |
| [`MonthCalendar`](components/MonthCalendar/README.md) | Il mese intero con gli eventi nelle caselle, e a fianco il giorno scelto per esteso. Su telefono le caselle diventano punti. | — |
| [`NotificationMatrix`](components/NotificationMatrix/README.md) | Preferenze di notifica: matrice evento × canale con interruttori piccoli; ogni evento dice quando arriva. | — |
| [`OrgChart`](components/OrgChart/README.md) | Chi fa cosa e chi risponde a chi. I gruppi si chiudono, la ricerca apre il ramo giusto e lo evidenzia. | — |
| [`PaymentMethod`](components/PaymentMethod/README.md) | Il metodo di pagamento salvato, nella pagina dell'abbonamento: la sagoma della carta, le ultime cifre, la scadenza. | — |
| [`PdfNotes`](components/PdfNotes/README.md) | Il documento da leggere con tre strumenti: selezionare, evidenziare e lasciare una nota in un punto preciso del foglio. | — |
| [`PersonAgenda`](components/PersonAgenda/README.md) | Una colonna per persona e le ore in verticale: chi è libero, chi è occupato, dove ci sono sovrapposizioni. Si fissa un appuntamento toccando lo spazio libero. | — |
| [`SheetGrid`](components/SheetGrid/README.md) | Una tabella che si usa come un foglio di calcolo: frecce, scrivi per riempire, formule semplici e la somma delle celle scelte in fondo. | — |
| [`StatTile`](components/StatTile/README.md) | Tessera KPI: un numero che conta, il suo nome e una riga di contesto. | — |
| [`Table`](components/Table/README.md) | La tabella vive su una card: testata incassata, righe da 56, hover, ordinamento, selezione con le caselle che non aprono la riga. | P4 · P7 · S4 · A3 |
| [`Timeline`](components/Timeline/README.md) | Storico e attività di una scheda: icona per tipo nella tessera del tono giusto, chi in grassetto, ora e luogo in mono. | — |
| [`TrendTile`](components/TrendTile/README.md) | Tessera numerica con la variazione e la linea piccola, oppure con l'obiettivo e la barra. | — |
| [`UsageMeter`](components/UsageMeter/README.md) | Consumo di un limite del piano (utenti, sedi, SMS, spazio): barra primaria, dall'80 % arancio con la frase che dice cosa succede, al 100 % rossa. | — |
| [`VersionDiff`](components/VersionDiff/README.md) | Cosa è cambiato tra due versioni di un testo, parola per parola: in linea o affiancato, con il passaggio da una modifica all'altra. | — |
| [`WeekCalendar`](components/WeekCalendar/README.md) | Settimana a ore: giorni in colonna, oggi evidenziato, la linea di adesso, giorni chiusi tratteggiati. | — |
| [`Whiteboard`](components/Whiteboard/README.md) | Note da spostare liberamente, collegate tra loro, su un fondo che si trascina e si ingrandisce. Si vede anche chi sta lavorando insieme a te. | — |

## Grafici

| Componente | Cos'è | Regole |
|---|---|---|
| [`AreaChart`](components/AreaChart/README.md) | Area per una serie sola nel tempo (ingressi, ordini al giorno): area `viz-wash`, linea `viz-line`, griglia tenue. | — |
| [`CalendarHeatmap`](components/CalendarHeatmap/README.md) | Calendario a intensità (ingressi, attività per giorno): cinque gradini dalla scala d'accento `heat-0` … `heat-4`, settimana da lunedì, scala in fondo. | — |
| [`ComboChart`](components/ComboChart/README.md) | Barre e linea insieme: il volume in `viz-ink` con la scala a sinistra, il tasso in accento con la sua scala a destra. | — |
| [`DonutChart`](components/DonutChart/README.md) | Ciambella per le parti di un totale: al massimo 5 parti dai token `viz-1` … `viz-5`, ordinate dalla più grande. Totale al centro; la legenda è anche la tabella dei valori. | — |
| [`FunnelChart`](components/FunnelChart/README.md) | Imbuto: barre orizzontali in proporzione e, a destra, quanti restano rispetto al passo prima. L'ultimo passo è in accento. | — |
| [`HourHeatmap`](components/HourHeatmap/README.md) | Mappa giorno × ora (quando c'è più gente, quando arrivano gli ordini): stessi gradini del calendario, ore in mono ogni due. | — |
| [`LineChart`](components/LineChart/README.md) | Linee nel tempo con il confronto: periodo attuale in `viz-line` con l'area leggera, periodo prima tratteggiato. Tooltip scuro con data e valori in mono; tabella nascosta per lo screen reader. | — |
| [`ProgressRing`](components/ProgressRing/README.md) | Anello di avanzamento: primario su `surface-active`, estremità tonde, valore al centro in mono. Piccolo (40) accanto a un testo che dice cosa sta succedendo. | — |
| [`Sparkline`](components/Sparkline/README.md) | Linea piccola senza assi né etichette, in tabella o accanto a un numero; il valore sempre accanto, in mono. | — |
| [`StackedBarChart`](components/StackedBarChart/README.md) | Barre impilate per confrontare parti nel tempo (per sede, per canale): fino a 3 serie, 2 px d'aria tra i pezzi, il totale sopra in mono. | — |

## Stato

| Componente | Cos'è | Regole |
|---|---|---|
| [`Alert`](components/Alert/README.md) | Avviso dentro la pagina: un titolo, una frase, al massimo un'azione. | P2 · P3 · D7 · C6 |
| [`Avatar`](components/Avatar/README.md) | Le iniziali (o la foto) di una persona in un cerchio. | — |
| [`Badge`](components/Badge/README.md) | Lo stato di qualcosa in una o due parole: tinta, bordo e icona, mai il solo colore. | P2 · P3 |
| [`Banner`](components/Banner/README.md) | Fascia in cima alla pagina per ciò che riguarda tutto il gestionale: rete assente, nuova versione, account sospeso. | D7 · C6 |
| [`Chip`](components/Chip/README.md) | Scelte rapide sopra una lista e filtri applicati da togliere. | — |
| [`Count`](components/Count/README.md) | Contatore: un numero in una pastiglia, solo su ciò che aspetta un'azione. | — |
| [`EmptyState`](components/EmptyState/README.md) | Cosa manca, perché, e l'azione che lo risolve. Di serie ha l'illustrazione animata. | D1 · S4 |
| [`Illustration`](components/Illustration/README.md) | Piccole illustrazioni per stati vuoti, esiti e messaggi: una luce soffusa del colore del tema, la forma in vetro smerigliato e un solo bollino pieno che dice cosa succede. | D1 |
| [`Popconfirm`](components/Popconfirm/README.md) | Conferma sul posto, vicino al bottone, per azioni piccole che non si disfano. Vetro come le tendine. | — |
| [`ProgressBar`](components/ProgressBar/README.md) | Barra di avanzamento sottile; `FileProgress` è la riga del file che si carica. | — |
| [`SaveBar`](components/SaveBar/README.md) | Barra scura «non ancora creato», in cima alla pagina finché il nuovo elemento non è salvato. | P5 |
| [`SegmentedProgress`](components/SegmentedProgress/README.md) | Avanzamento a segmenti per le cose che si contano (documenti caricati, passi fatti) e `StackedProgress`, la barra impilata per le parti di un totale, con la legenda. | — |
| [`Skeleton`](components/Skeleton/README.md) | Blocchi grigi che scintillano al posto del contenuto mentre arriva. | S2 |
| [`Tag`](components/Tag/README.md) | Etichetta di categoria, squadrata (raggio 6) per non confondersi con i `Badge` tondi degli stati. Il colore è solo il pallino. | — |
| [`Toast`](components/Toast/README.md) | Messaggio breve dopo un'azione, che sparisce da solo: 4 secondi, 8 quando c'è un'azione («Annulla»). | C2 · C6 |
| [`Tooltip`](components/Tooltip/README.md) | Etichetta scura che compare dopo 400 ms al passaggio o al fuoco. | — |
| [`TypeToConfirm`](components/TypeToConfirm/README.md) | Conferma scrivendo il nome, solo per eliminare cose grandi (una sede, tutti i dati): il bottone rosso si attiva con il nome esatto. | C1 |
| [`UpgradeCard`](components/UpgradeCard/README.md) | Invito al piano superiore quando tocchi un limite, mai a caso: superficie di marca, cosa sblocca, quanto costa. In versione `compact` sulle voci chiuse. | — |

## Caricamento

| Componente | Cos'è | Regole |
|---|---|---|
| [`BootScreen`](components/BootScreen/README.md) | Schermata di marca per i passaggi grandi: avvio dell'app, accesso, cambio di sede. Superficie `brand-ink` con trama e bagliore, mai una rotella sola. | S2 |
| [`DocumentLoader`](components/DocumentLoader/README.md) | Un foglio con una luce che lo scorre dall'alto in basso, mentre si prepara un documento. | — |
| [`Loader`](components/Loader/README.md) | Il loader di sezione: una tessera di vetro da 64 con il bagliore dell'accento, la rotella e una frase su cosa sta arrivando. | — |
| [`LoaderSpinner`](components/LoaderSpinner/README.md) | La rotella dei loader: arco d'accento su una traccia tenue. È il pezzo da cui partono tutti gli altri loader. | — |
| [`LoadingPill`](components/LoadingPill/README.md) | Pillola di vetro con la rotella e una frase breve. `LoadMore` è la stessa pillola in fondo alle liste lunghe. | — |
| [`LoadState`](components/LoadState/README.md) | Cosa mostrare quando il caricamento non finisce bene: annullato o non riuscito. Prende il posto dello scheletro nella stessa forma. | — |
| [`PendingCard`](components/PendingCard/README.md) | Un'azione importante in corso che non va interrotta: un pagamento o un invio. | — |
| [`ProgressSteps`](components/ProgressSteps/README.md) | Un lavoro lungo in più fasi: fatto con la spunta, in corso con la rotella, il resto in attesa. | — |
| [`ProgressToast`](components/ProgressToast/README.md) | Un toast che resta finché il lavoro non finisce: import, export, invii a molti. Sempre scuro, come gli altri toast. | — |
| [`ReconnectBanner`](components/ReconnectBanner/README.md) | Banner arancio in cima alla pagina quando la connessione cade, con il conto alla rovescia del prossimo tentativo. `StaleBadge` è la pillola neutra che segna dati vecchi. | — |
| [`RefreshOverlay`](components/RefreshOverlay/README.md) | Avvolge un contenuto che si sta aggiornando: i dati vecchi restano visibili, velati, con una pillola di vetro «Aggiorno» in alto. | — |
| [`RouteProgress`](components/RouteProgress/README.md) | Linea da 3 px in cima alla pagina, con il bagliore dell'accento, mentre si passa da una sezione all'altra. | — |
| [`SaveStatus`](components/SaveStatus/README.md) | Lo stato dell'autosalvataggio nella testata di una scheda: «Salvo», poi «Salvato · 12:04». | — |
| [`SkeletonLayout`](components/SkeletonLayout/README.md) | Scheletri composti che ricalcano le pagine tipo, con il riflesso ogni 1,4 s e una punta d'accento. | S2 |
| [`TypingDots`](components/TypingDots/README.md) | Tre punti d'accento in una nuvola di vetro, per «sta scrivendo» nei commenti e nelle risposte generate. | — |
| [`UploadQueue`](components/UploadQueue/README.md) | La coda dei file che si caricano insieme: uno stato per ogni file e il totale in alto. Per un file solo usa `FileProgress`. | — |

## Mobile

| Componente | Cos'è | Regole |
|---|---|---|
| [`ActionSheet`](components/ActionSheet/README.md) | Foglio di azioni su telefono, al posto del menu ⋮: in testa di chi si parla, l'azione che non si disfa in rosso per ultima, «Annulla» separato. | C1 |
| [`AmountPad`](components/AmountPad/README.md) | L'importo si scrive come al bancomat, partendo dai centesimi. Grande al centro, con le cifre rapide e i limiti detti prima di sbagliare. | — |
| [`AppIntro`](components/AppIntro/README.md) | Tre schermate al primo avvio, che si scorrono col dito. Ogni immagine ha piccoli elementi che galleggiano; l'ultima offre di iniziare o di entrare. | — |
| [`DayStrip`](components/DayStrip/README.md) | Striscia dei giorni, il calendario su telefono: sette giorni, oggi in accento, il pallino dove c'è qualcosa. | — |
| [`ExpandCard`](components/ExpandCard/README.md) | Una scheda nella lista si apre a tutto schermo partendo dal punto in cui si trova, senza cambio di pagina. Si chiude con la X, con Esc o trascinando giù. | — |
| [`Fab`](components/Fab/README.md) | Bottone fluttuante in accento per l'azione principale su telefono, e `CtaBar`, la barra in fondo con il totale e il bottone. | — |
| [`HomeWidgets`](components/HomeWidgets/README.md) | Riquadri piccoli, medi e grandi con le informazioni del giorno. Tenendo premuto si entra in modifica: i widget tremano e si possono togliere. | — |
| [`LiveActivity`](components/LiveActivity/README.md) | Un ordine che arriva, seguito dalla schermata di blocco: il fattorino si muove sulla barra e i minuti scendono. Si può ridurre a una piccola isola in alto. | — |
| [`MobileLargeTitle`](components/MobileLargeTitle/README.md) | Titolo grande su telefono nelle sezioni principali dell'app; allo scroll resta la barra da 52 con il titolo piccolo. | — |
| [`PinPad`](components/PinPad/README.md) | Tastierino PIN per la cassa condivisa: chi sei, i pallini, tasti tondi da 72 con le cifre in mono. | — |
| [`Scanner`](components/Scanner/README.md) | La fotocamera a tutto schermo con un mirino al centro. La riga scorre mentre cerca, gli angoli diventano verdi e si stringono quando trova, poi sale il foglio col risultato. | — |
| [`Stories`](components/Stories/README.md) | Schermate brevi una dopo l'altra, con le barre che si riempiono in alto. Si tocca a destra per andare avanti, a sinistra per tornare, si tiene premuto per fermare. | — |
| [`SwipeRow`](components/SwipeRow/README.md) | Riga che si trascina verso sinistra per scoprire una o due azioni. | — |

## Marca

| Componente | Cos'è | Regole |
|---|---|---|
| [`BrandPanel`](components/BrandPanel/README.md) | Superficie di marca, scura nei due temi: trama leggera e un bagliore dell'accento. | — |
| [`Icon`](components/Icon/README.md) | Le icone di STC: tutta la raccolta Lucide (2.322 icone, versione 1.70.0), tratto 1,5 su 24, colore dal testo. | V5 |
| [`Wordmark`](components/Wordmark/README.md) | Il nome del prodotto in carattere display, per i progetti che non hanno ancora un logo; `AppMark` è la tessera con l'iniziale. | V7 |

## Card

| Componente | Cos'è | Regole |
|---|---|---|
| [`ArticleCard`](components/ArticleCard/README.md) | Per blog, guide, notizie e centro assistenza. Tutta la card è un link, il salvataggio è un bottone a parte. | — |
| [`CodeSnippet`](components/CodeSnippet/README.md) | Per documentazione e guide per sviluppatori: più linguaggi, copia con conferma, righe evidenziate. | — |
| [`CompareCards`](components/CompareCards/README.md) | Per scegliere tra piani o opzioni: si sceglie la card intera, le differenze sono in grassetto. | — |
| [`EventCard`](components/EventCard/README.md) | Per corsi, webinar, incontri e prenotazioni. La data è il primo colpo d'occhio, poi posti e iscrizione. | — |
| [`PaymentCard3D`](components/PaymentCard3D/README.md) | La carta segue il puntatore con un riflesso, si gira per il retro. I dati si mostrano solo a richiesta. | — |
| [`PersonCard`](components/PersonCard/README.md) | Per squadre, rubriche, staff e utenti. Dice chi è, se c'è, e come raggiungerla. | — |
| [`ProductCard`](components/ProductCard/README.md) | Per negozi e cataloghi. Al passaggio mostra il secondo scatto, i colori si scelgono sulla card, il carrello risponde subito. | — |
| [`SwipeStack`](components/SwipeStack/README.md) | Per decidere in fretta su una cosa alla volta: trascina a destra per tenere, a sinistra per scartare. Si può tornare indietro. | — |
| [`TestimonialCard`](components/TestimonialCard/README.md) | Per le pagine pubbliche: cosa dice un cliente, chi è, e se c'è, il video. | — |
| [`TransactionList`](components/TransactionList/README.md) | Movimenti raggruppati per giorno, con il totale del giorno. Una riga si apre per il dettaglio e le azioni. | — |

## Sezioni

| Componente | Cos'è | Regole |
|---|---|---|
| [`BentoGrid`](components/BentoGrid/README.md) | Le funzioni principali in riquadri di misure diverse: il più importante è il più grande. Ogni riquadro può portare a una pagina. | — |
| [`Changelog`](components/Changelog/README.md) | Le versioni in ordine, con etichette che si filtrano e le voci da leggere in evidenza. | — |
| [`FeatureTabs`](components/FeatureTabs/README.md) | Un elenco di funzioni a sinistra e la schermata a destra. Va avanti da solo, si ferma quando ci passi sopra. | — |
| [`IntegrationOrbit`](components/IntegrationOrbit/README.md) | Il prodotto al centro e i servizi che ruotano intorno. A fianco l'elenco vero, leggibile e navigabile. | — |
| [`Newsletter`](components/Newsletter/README.md) | Un campo, un bottone, cosa arriva e ogni quanto. Controlla l'email prima di inviare. | — |
| [`StickyScroll`](components/StickyScroll/README.md) | Il testo scorre a sinistra, la schermata resta ferma a destra e cambia al passo giusto. | — |
| [`VersusTable`](components/VersusTable/README.md) | Una tabella onesta con la nostra colonna in evidenza. Valori sì, no, in parte e testo. | — |

## Banner

| Componente | Cos'è | Regole |
|---|---|---|
| [`AnnouncePill`](components/AnnouncePill/README.md) | La piccola pillola sopra il titolo di una pagina pubblica che porta alla novità del momento. | — |
| [`AppInvite`](components/AppInvite/README.md) | Su telefono una riga in cima per aprire o scaricare l'app; su computer una card col codice da inquadrare. | — |
| [`CookieConsent`](components/CookieConsent/README.md) | Chiede il permesso senza trucchi: rifiutare è facile quanto accettare, e si può scegliere per categoria. | — |
| [`NewsTicker`](components/NewsTicker/README.md) | Le ultime notizie che scorrono in una riga. Si ferma al passaggio, si mette in pausa, e col movimento ridotto diventa una notizia alla volta con le frecce. | — |
| [`NpsSurvey`](components/NpsSurvey/README.md) | La domanda «lo consiglieresti?» con la scala da 0 a 10. Dopo il voto una domanda diversa per chi è scontento e per chi è contento. | — |
| [`PromoBar`](components/PromoBar/README.md) | Una striscia in cima alla pagina per un'offerta a tempo: cosa, fino a quando, il codice da copiare e dove andare. | — |
| [`SandboxMode`](components/SandboxMode/README.md) | Quando si lavora su dati di prova, tutta l'app lo dice con una fascia a strisce e una cornice. Così nessuno confonde la prova col vero. | — |
| [`TrialBanner`](components/TrialBanner/README.md) | Dice quanti giorni di prova restano, con i giorni come tacche. Il tono sale man mano che la fine si avvicina. | — |
| [`UpdateAvailable`](components/UpdateAvailable/README.md) | Dice che c'è una versione nuova, cosa cambia, e aggiorna senza far perdere il lavoro. | — |

## Filtri

| Componente | Cos'è | Regole |
|---|---|---|
| [`ActiveFilters`](components/ActiveFilters/README.md) | Sopra i risultati: quanti sono, per cosa, e i filtri come chip da togliere. Si può sempre ripristinare. | — |
| [`FacetPanel`](components/FacetPanel/README.md) | I filtri di un catalogo per gruppi: caselle con i conteggi, prezzo, voto, interruttori. Ogni gruppo si chiude e dice quanti filtri ha. | — |
| [`FilterChips`](components/FilterChips/README.md) | Una riga di chip che si accendono e dicono quanti risultati danno. Scorre se non ci sta. | — |
| [`MobileFilters`](components/MobileFilters/README.md) | Un bottone «Filtri» con il numero e un foglio dal basso. Il bottone in fondo dice quanti risultati vedrai prima di confermare. | — |
| [`QuickKeys`](components/QuickKeys/README.md) | I filtri che si usano di più hanno un numero: si premono senza mouse. Lo zero torna a tutto, la barra porta alla ricerca. | — |
| [`RangeHistogram`](components/RangeHistogram/README.md) | Due cursori sopra le barre che dicono dove stanno i risultati. Si trascina, si usano le frecce o si scrive la cifra. | — |
| [`SearchArea`](components/SearchArea/README.md) | Sposti la mappa e compare «Cerca in quest'area». Oppure si accende la ricerca automatica mentre sposti. | — |
| [`TableToolbar`](components/TableToolbar/README.md) | Ricerca, filtri, vista e strumenti sopra una tabella. Quando selezioni delle righe diventa la barra delle azioni. | — |
| [`TokenSearch`](components/TokenSearch/README.md) | Si scrive «stato:» e si sceglie il valore: ogni filtro diventa un gettone dentro il campo. Va tutto da tastiera. | — |
| [`VariantFilter`](components/VariantFilter/README.md) | Cerchi di colore con il nome sotto e una griglia di taglie. Quello che manca è barrato e lo dice. | — |

## Checkout

| Componente | Cos'è | Regole |
|---|---|---|
| [`BankWait`](components/BankWait/README.md) | Quando la banca chiede la conferma nella sua app: cosa fare, quanto tempo resta, e cosa succede se va male. | — |
| [`CartDrawer`](components/CartDrawer/README.md) | Si apre da destra senza lasciare la pagina: quantità, togli con «Annulla», quanto manca alla spedizione gratis, e il bottone per pagare. | — |
| [`CrossSell`](components/CrossSell/README.md) | Due o tre articoli che servono davvero con quello che hai scelto. Si aggiungono con un tocco e si tolgono allo stesso modo. | — |
| [`ExpressPay`](components/ExpressPay/README.md) | I portafogli digitali in cima al pagamento, con un divisore prima della carta. Sono pulsanti scuri di serie. | — |
| [`Installments`](components/Installments/README.md) | Le opzioni affiancate con la rata al mese, il piano con le date e il costo totale detto chiaro. | — |
| [`OnePageCheckout`](components/OnePageCheckout/README.md) | Contatto, indirizzo, spedizione e carta in una pagina sola, con il riepilogo sempre visibile. Premi «Paga» senza compilare per vedere gli errori. | — |
| [`OrderConfirmed`](components/OrderConfirmed/README.md) | La pagina dopo il pagamento: conferma chiara, numero da copiare, quando arriva e cosa fare adesso. | — |
| [`OrderSummary`](components/OrderSummary/README.md) | Articoli, subtotale, sconto, spedizione, totale e la quota di IVA. Su telefono si chiude in una riga con il totale. | — |
| [`PromoCode`](components/PromoCode/README.md) | Un link discreto che apre il campo. Il codice si controlla e, se non va, dice perché. | — |
| [`Receipt`](components/Receipt/README.md) | La ricevuta da vedere, scaricare, inviare e stampare: chi vende, cosa, quanto, l'IVA e come è stato pagato. | — |
| [`ShippingPicker`](components/ShippingPicker/README.md) | Le opzioni come schede: quando arriva in giorni veri, quanto costa, e il punto di ritiro quando serve. | — |
| [`TipPicker`](components/TipPicker/README.md) | Tre importi pronti, «Nessuna» con lo stesso peso, e «Altro» per scrivere la cifra. Vale anche per le donazioni. | — |

## Interazioni

| Componente | Cos'è | Regole |
|---|---|---|
| [`Celebration`](components/Celebration/README.md) | Quando si arriva a un obiettivo: la coppa entra con uno scatto, partono i coriandoli e il numero conta fino al valore. Si può condividere o rivedere. | — |
| [`Dock`](components/Dock/README.md) | Una fila di icone che si ingrandiscono vicino al puntatore, come una lente. Il pallino dice che l'app è aperta, l'icona salta mentre si avvia. | — |
| [`EventIsland`](components/EventIsland/README.md) | Una pillola scura in alto che si allarga quando un evento chiede una decisione. Dice cosa è successo, perché, e dà l'azione giusta. Se nessuno risponde, l'evento non si perde: finisce in «Da sistemare». | — |
| [`EventIslandQueue`](components/EventIslandQueue/README.md) | Quando arrivano più eventi insieme, dietro all'isola si vedono le pillole in attesa. Il numero dice quanti ne restano. | — |
| [`LassoSelect`](components/LassoSelect/README.md) | Si trascina sul fondo per disegnare un rettangolo: tutto quello che tocca si seleziona. Con le scorciatoie di sempre, e una barra che dice quanti e quanto pesano. | — |
| [`MagneticButton`](components/MagneticButton/README.md) | Il bottone si fa attirare dal puntatore quando gli passa vicino, e il testo lo segue ancora un po' di più. Quando il puntatore va via torna al suo posto con una molla. | — |
| [`PullToRefresh`](components/PullToRefresh/README.md) | Su telefono si tira giù la lista dall'alto: la freccia gira, a metà dice «Rilascia», poi aggiorna e le notizie nuove entrano in cima evidenziate. | — |
| [`RollingStat`](components/RollingStat/README.md) | Le cifre girano come un contachilometri quando il valore cambia: si vede subito che il numero è salito e di quanto. | — |
| [`SpringList`](components/SpringList/README.md) | Si prende una riga dalla maniglia e si trascina: le altre si spostano con un piccolo rimbalzo. Con la tastiera si fa lo stesso, e ogni spostamento viene detto ad alta voce. | — |
| [`TimelineZoom`](components/TimelineZoom/README.md) | Un anno intero su una riga. Con la rotella o le dita ci si avvicina fino alla settimana; gli eventi vicini si raccolgono in un numero che, toccato, si apre. | — |
| [`UndoHistory`](components/UndoHistory/README.md) | Ogni modifica è un passo nella cronologia a fianco: si torna indietro con Ctrl+Z o toccando un passo, e si vede cosa si perderebbe cambiando qualcosa dal passato. | — |

## AI

| Componente | Cos'è | Regole |
|---|---|---|
| [`AssistantPanel`](components/AssistantPanel/README.md) | L'assistente di lato, che sa cosa stai guardando. Parte con tre suggerimenti, risponde scrivendo e si ferma quando vuoi. | — |
| [`ReasoningStatus`](components/ReasoningStatus/README.md) | Mentre l'assistente lavora, i passi in ordine con quello in corso. Alla fine si chiude in una riga: «Ragionato per 5 secondi». | — |
| [`StreamingAnswer`](components/StreamingAnswer/README.md) | La risposta di un assistente che compare mentre viene scritta, con le fonti numerate, il bottone per fermarla e le azioni alla fine. | — |
| [`SummaryTop`](components/SummaryTop/README.md) | Tre punti in cima a un documento lungo, fatti con l'AI e detti come tali. Con le sezioni da cui vengono e l'avviso quando il documento cambia. | — |
