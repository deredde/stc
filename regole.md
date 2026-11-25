# Regole di STC, con il perché

Tutte le regole di STC in un posto solo. Ognuna ha un codice, la regola, **perché** STC la vuole così e cosa fare **invece** quando una richiesta va contro.

Questo file serve soprattutto alle AI che costruiscono con STC (vedi `CLAUDE.md` e `AGENTS.md`), ma vale per tutti. Quando una richiesta va contro una regola, si cita il codice e si spiega il perché. Se chi chiede insiste, si fa, e si segna la deroga.

- **Fonte** dice dove la regola è scritta per intero.
- Le regole segnate **rigida** toccano accessibilità o leggibilità: una deroga lì fa danni a chi usa il prodotto, non solo all'aspetto. Si possono derogare lo stesso, ma l'avviso va dato con più chiarezza.
- La **marca** (accento, superficie di marca, caratteri, logo, nome) si cambia liberamente: non è una deroga. Vedi M1.

Codici: **P** principi · **D** di serie e comportamenti · **C** quale componente · **S** stati · **T** testi e formati · **V** aspetto · **A** accessibilità · **M** marca e codice.

---

## P · Principi

### P1 · Un solo bottone primario per vista
- **Regola:** un solo `Button variant="primary"` per vista: l'azione per cui la pagina esiste. Le altre sono secondarie, Annulla è terziario.
- **Perché:** il primario dice «la pagina serve a questo». Con due primari nessuno dei due si nota più, e chi usa il gestionale deve fermarsi a leggere invece di capire a colpo d'occhio. In chiaro il primario è nero apposta: è il punto più pesante della pagina, e deve essere uno.
- **Invece:** scegli l'azione principale; le altre in `secondary`, quelle rare nel menu ⋮. In una fila il primario va per ultimo, a destra.
- **Fonte:** README › Principi 1 · `components/Button/README.md`

### P2 · L'accento è un richiamo, non uno stato
- **Regola:** `accent` segna ciò che è nuovo, la voce attiva, l'azione della barra laterale. Mai per dire «va bene», «attivo», «pagato».
- **Perché:** se l'accento dice anche «tutto ok», la persona non sa più se il blu significa «guarda qui» o «è andato bene». Gli stati hanno i loro colori, icone e parole (P3). Tenere separati i due linguaggi rende la pagina leggibile.
- **Invece:** per un esito usa `Badge` o `Alert` con `tone="success"`; per «nuovo» o «attivo» l'accento va bene.
- **Fonte:** README › Principi 1 · README › Colore

### P3 · Lo stato si legge senza colore · rigida
- **Regola:** ogni stato ha tinta, bordo, icona e una parola (`Badge`, `Alert`). Verde, rosso, arancio e blu non si usano per decorare.
- **Perché:** una persona su dodici distingue male rosso e verde, e al sole o su un monitor vecchio i colori si confondono per tutti. Se lo stato è solo un pallino colorato, qualcuno lo legge sbagliato. E se i colori di stato decorano, smettono di avvisare.
- **Invece:** `Badge tone="danger"` con la parola («Bloccato»); per decorare usa i neutri o l'accento.
- **Fonte:** README › Principi 2 · README › Accessibilità

### P4 · I numeri sono numeri
- **Regola:** importi, orari, date, codici e conteggi in `--font-num` con cifre tabulari. Il numero e la sua unità restano insieme («€ 1.240,00», «07:42»).
- **Perché:** in colonna le cifre tabulari si allineano e si confrontano a occhio. In un gestionale si leggono numeri tutto il giorno: un importo che balla o che va a capo staccato dall'euro si legge male e si sbaglia.
- **Invece:** usa le classi `num`, `amount`, `num-kpi` o la prop `mono` delle colonne di `Table`; date e importi a destra.
- **Fonte:** README › Principi 3 · README › Tipografia

### P5 · Si salva da solo
- **Regola:** campi, interruttori e scelte valgono subito, con un toast che lo conferma. «Salva» o «Crea» compare solo quando si crea qualcosa di nuovo o in un modulo lungo (`SaveBar`).
- **Perché:** con un «Salva» in fondo, chi cambia un'impostazione e chiude la pagina perde la modifica senza accorgersene. È l'errore più comune nei gestionali. Il salvataggio immediato col toast toglie il dubbio «l'ho salvato?».
- **Invece:** `SettingRow` per le impostazioni; campi che salvano all'uscita; `SaveBar` solo per moduli lunghi.
- **Fonte:** README › Principi 4 · `default.md` §6

### P6 · Niente controlli nativi a vista
- **Regola:** niente `<select>`, `<input type="date">`, `<input type="time">`, caselle o interruttori del browser. Si usano `Select`, `DatePicker`, `TimePicker`, `Checkbox`, `Switch`.
- **Perché:** i controlli nativi cambiano aspetto in ogni browser e sistema, non seguono il tema scuro, non leggono i formati italiani (gg/mm/aaaa, 24 ore) e rompono il ritmo delle quattro altezze. Quelli di STC funzionano da tastiera come i nativi, con lo stesso aspetto ovunque.
- **Invece:** il componente STC equivalente.
- **Fonte:** README › Principi 5 · `default.md` §6

### P7 · Al massimo due azioni a vista per riga
- **Regola:** in una riga di tabella o di lista al massimo due azioni visibili, il resto nel menu ⋮. I contatori solo su ciò che aspetta un'azione.
- **Perché:** dieci righe con quattro bottoni fanno quaranta bottoni: la tabella diventa un muro e i dati spariscono. I contatori ovunque abituano a ignorarli, e quello che conta si perde.
- **Invece:** le due azioni più frequenti a vista, le altre in `actions` con il ⋮. Contatori solo dove c'è da fare.
- **Fonte:** README › Principi 6 · `components/Table/README.md`

### P8 · Si lavora senza lasciare la pagina
- **Regola:** conferme nel `Dialog`, lavoro su una cosa nel `Drawer`, scelte rapide nel `Sheet` su telefono. Uno solo per volta.
- **Perché:** cambiare pagina fa perdere il punto, i filtri e lo scorrimento della lista. Chi lavora su cento righe al giorno non deve ricostruire dov'era ogni volta. Due overlay uno sopra l'altro confondono: non si sa più cosa chiude Esc.
- **Invece:** vedi C1–C4.
- **Fonte:** README › Principi 7 · README › Layout e navigazione

### P9 · Non inventare varianti
- **Regola:** prima di creare qualcosa, cerca il componente esistente. Se manca una variante, si aggiunge al sistema con le sue regole, non si scrive a parte nella pagina.
- **Perché:** ogni variante scritta a mano è un pezzo che non segue il tema, non ha gli stati, non si aggiorna con STC. Dopo dieci varianti così il prodotto non è più coerente, e nessuno sa quale sia quella giusta.
- **Invece:** usa il componente più vicino (vedi `componenti.md`). Se davvero manca, costruiscilo con i token, il prefisso `stc-`, i cinque stati (S1) e i quattro stati d'interazione, e dillo.
- **Fonte:** README › Come si usa · `adattare.md` › Parte B

---

## D · Di serie e comportamenti

### D1 · Le illustrazioni si muovono sempre
- **Regola:** `Illustration`, `EmptyState` e `StatePage` sono animati di serie. Si fermano solo se lo si chiede (`animated={false}`), o con «riduci animazioni».
- **Perché:** un vuoto fermo sembra un errore o una pagina rotta. Il movimento leggero dice «è tutto a posto, qui non c'è ancora niente» e dà carattere a STC senza disturbare: un gesto per tema, lento.
- **Invece:** lasciale animate. Nelle griglie e nelle liste usa `animated="hover"`. In una lista che ripete la stessa illustrazione da 56 su ogni riga, fermala.
- **Fonte:** `default.md` §1

### D2 · Con «riduci animazioni» si ferma tutto · rigida
- **Regola:** con `prefers-reduced-motion` non si anima niente, ma tutto resta leggibile.
- **Perché:** per chi ha disturbi vestibolari il movimento provoca nausea e vertigini. È l'unico interruttore che spegne il movimento senza chiederlo, ed è un obbligo di accessibilità.
- **Invece:** non scrivere animazioni che ignorano la preferenza. Usa i token di durata, che la rispettano già.
- **Fonte:** `default.md` §1 · README › Movimento

### D3 · Le transizioni sono accese e gli overlay escono animati
- **Regola:** tendine, dialog, drawer e fogli entrano ed escono animati e restano montati il tempo dell'uscita. Linea dei tab e pastiglia della barra scivolano, non si rimontano. Durate e curve solo dai token (`dur-*`, `ease`, `ease-enter`).
- **Perché:** un pannello che sparisce di colpo fa perdere il filo: la persona non vede da dove è venuto né dove è andato. Durate uguali ovunque fanno sembrare il prodotto un pezzo solo.
- **Invece:** usa i componenti STC, che lo fanno già; nel CSS solo `var(--dur-*)`.
- **Fonte:** `default.md` §1 · README › Movimento

### D4 · Il bottone di serie è secondario
- **Regola:** `Button` senza `variant` è `secondary`. `danger` solo per ciò che non si disfa.
- **Perché:** se il primario fosse il default, ogni bottone scritto in fretta diventerebbe primario e P1 salterebbe da solo. `danger` rosso su un'azione che si può disfare spaventa per niente e abitua a ignorare il rosso.
- **Invece:** scrivi `primary` solo sull'azione della vista. Per ciò che si disfa, toast con «Annulla» (C2).
- **Fonte:** `default.md` §2 · `components/Button/README.md`

### D5 · Il tab scelto è la pillola di vetro con la luce
- **Regola:** `Tabs` ha il tab scelto in vetro con due luci chiare del colore del brand che scorrono lente dietro (variante «Deriva»). La luce non viene mai tagliata né coperta. Non si cambia.
- **Perché:** è il segno visivo di STC: richiama le illustrazioni e il logo, e rende evidente dove sei senza un colore pieno che pesi. Se un contenitore taglia la luce (`overflow: hidden` troppo stretto) sembra un difetto.
- **Invece:** lascia lo spazio d'aria della fila (30 px sopra e sotto, già recuperato col margine). Regola intensità e lentezza con `--tg-gi` e `--tg-dur`, non togliere il vetro.
- **Fonte:** `default.md` §2 · `components/Tabs/README.md`

### D6 · Dialog di serie in misura conferma
- **Regola:** `Dialog` è largo 420 (`confirm`). `wide` solo per i moduli.
- **Perché:** un dialog di conferma largo diventa una pagina: la domanda si perde in mezzo allo spazio. Stretto si legge in un colpo solo: domanda, conseguenza, bottone.
- **Invece:** testo lungo o tanti campi vanno in un `Drawer` (C3).
- **Fonte:** `default.md` §2

### D7 · Toast in alto su desktop, in basso sul telefono
- **Regola:** `ToastProvider` con `placement="auto"`: in alto al centro su desktop, in basso sul telefono. 4 s, 8 s se ha un'azione. Non si cambia.
- **Perché:** su desktop l'occhio sta in alto, dove c'è la testata; sul telefono il pollice e lo sguardo stanno in basso. Quattro secondi bastano a leggere una riga; con «Annulla» serve più tempo per decidere.
- **Invece:** lascia il default. Per un messaggio che deve restare usa `Alert` o `Banner` (C6).
- **Fonte:** `default.md` §2 · README › Pattern › Messaggi

### D8 · Le misure dell'illustrazione seguono il posto
- **Regola:** `md` 120 in pagine e card grandi, `sm` 88 in drawer e fogli, `xs` 56 in righe e tendine. Mai più larga del titolo che l'accompagna.
- **Perché:** un'illustrazione grande in un drawer ruba lo spazio al lavoro; una piccola in una pagina vuota sembra persa. La misura dice quanto conta il vuoto.
- **Invece:** scegli la misura dal contenitore, non dal gusto.
- **Fonte:** `default.md` §2 · README › Illustrazioni

### D9 · Campi con l'etichetta sopra e il formato automatico
- **Regola:** etichetta sopra il campo, in frase, senza due punti. Date, importi, IBAN, telefono, codice fiscale con i loro input (`MoneyInput`, `IbanInput`, `PhoneInput`, `TaxIdInput`, `DatePicker`).
- **Perché:** l'etichetta sopra si legge anche quando il campo è pieno, e regge le traduzioni lunghe. Il formato automatico evita gli errori di battitura che poi bloccano una fattura o un pagamento.
- **Invece:** `Field` con `label`; mai un placeholder al posto dell'etichetta; l'input col formato invece di `TextInput`.
- **Fonte:** `default.md` §2 · README › Voce e testi

### D10 · Il fuoco si vede e il puntatore è la mano · rigida
- **Regola:** l'anello di fuoco da 2 px si vede da tastiera (`:focus-visible`). Tutto ciò che si clicca ha la manina, ciò che è disabilitato `not-allowed`. Il fuoco resta dentro gli overlay e torna a chi li ha aperti.
- **Perché:** chi usa la tastiera (e chi lavora veloce in un gestionale) senza anello non sa dove si trova. Togliere `outline` è il modo più rapido di rendere un'app inutilizzabile per qualcuno.
- **Invece:** non scrivere `outline: none` senza sostituto. Usa gli overlay di STC, che gestiscono il fuoco.
- **Fonte:** `default.md` §6 · README › Stati dei componenti

### D11 · Il tema parte chiaro e lo sceglie la persona
- **Regola:** STC parte in chiaro (senza attributo vale `light`). Il tema si cambia con `data-theme` e lo sceglie ogni persona dal suo interruttore; al primo accesso si può partire da `prefers-color-scheme`.
- **Perché:** il chiaro è il tema di lavoro per chi passa la giornata su tabelle e moduli. Il tema è una preferenza della persona, non del progetto: forzarne uno toglie una scelta che serve (luce, vista, abitudine).
- **Invece:** tutti e due i temi devono funzionare. Non scrivere colori che valgono solo in uno (V1).
- **Fonte:** `default.md` §2 e §4

---

## C · Quale componente

### C1 · Confermare solo ciò che non si disfa
- **Regola:** `ConfirmDialog` (o `ActionSheet` sul telefono) solo per ciò che non si disfa o tocca soldi e accessi. Per cancellare cose grandi `TypeToConfirm`.
- **Perché:** se ogni azione chiede «Sei sicuro?», le persone imparano a cliccare «Sì» senza leggere, e la conferma non protegge più niente proprio quando serve.
- **Invece:** per ciò che si disfa, C2.
- **Fonte:** `default.md` §3 · `pattern.md` › Confermare e disfare

### C2 · Disfare con il toast, non chiedere prima
- **Regola:** ciò che si può disfare si fa subito, e il `Toast` offre «Annulla».
- **Perché:** è più veloce (niente clic in più) e più sicuro: si vede il risultato e si torna indietro se serve. La conferma prima chiede di immaginare l'effetto, l'annulla dopo lo mostra.
- **Invece:** `useToast` con un'azione «Annulla» di 8 s.
- **Fonte:** `default.md` §3

### C3 · Drawer per lavorare, Sheet sul telefono
- **Regola:** lavorare su una cosa senza lasciare la pagina, o creare poco (fino a sei campi): `Drawer` su desktop, `Sheet` sul telefono. Creare tanto: percorso a passi (`WizardPage`).
- **Perché:** il drawer tiene la lista visibile accanto: si lavora su una riga e si passa alla successiva. Un dialog con dodici campi copre tutto e non si legge; una pagina nuova fa perdere il punto (P8).
- **Invece:** `Drawer` «Nuovo …»; da 3 a 5 passi, `WizardPage` con `Stepper`.
- **Fonte:** `default.md` §3 · `pattern.md` › Creare qualcosa

### C4 · Segmented, Select o carte, secondo le opzioni
- **Regola:** da 2 a 4 opzioni brevi: `Segmented`. Da 5 in su: `Select`. Scelte che contano (piano, metodo di pagamento): `RadioCards`, `TileSelect`, `PlanPicker`.
- **Perché:** con poche opzioni vederle tutte è più rapido che aprire una tendina. Con tante, una fila di segmenti non entra e non si legge. Le scelte importanti meritano spazio per spiegare la differenza.
- **Invece:** conta le opzioni e scegli il componente.
- **Fonte:** `default.md` §3

### C5 · Tabs per le sezioni, Segmented per i filtri
- **Regola:** sezioni di una pagina: `Tabs`. Filtri o viste dello stesso contenuto: `Segmented`.
- **Perché:** i tab dicono «qui c'è un'altra parte della scheda»; il segmentato dice «stessi dati, visti in un altro modo». Mescolarli fa credere di aver cambiato pagina quando si è solo filtrato.
- **Invece:** Giorno · Settimana · Mese è un `Segmented`; Panoramica · Ordini · Documenti sono `Tabs`.
- **Fonte:** `default.md` §2

### C6 · Toast, Alert o Banner, secondo cosa riguarda
- **Regola:** `Toast` per l'esito di ciò che hai appena fatto. `Alert` per ciò che blocca questa pagina o questo modulo. `Banner` per ciò che riguarda tutta l'app (rete, nuova versione). Errore di un campo: sotto il campo.
- **Perché:** il posto del messaggio dice quanto è largo il problema. Un errore di rete in un toast sparisce in 4 secondi e la persona continua a lavorare senza saperlo; un esito banale in un banner occupa la pagina per niente.
- **Invece:** vedi la tabella «Messaggi: dove va cosa» in `pattern.md`.
- **Fonte:** `default.md` §3 · `pattern.md` › Messaggi

### C7 · Le pagine tipo e il guscio
- **Regola:** le pagine si costruiscono dentro `AppShell` con `ListPage`, `DetailPage`, `SettingsPage`, `WizardPage`; l'accesso con `AuthScreen`; l'app per l'utente finale con `MemberApp`.
- **Perché:** le pagine tipo hanno già testata, spazi, stati e versione telefono decisi. Rifarle a mano vuol dire rifare (e sbagliare) decine di dettagli che STC ha già risolto.
- **Invece:** parti sempre dalla pagina tipo più vicina e segui il pattern in `pattern.md`.
- **Fonte:** `adattare.md` › In un progetto di codice · `pattern.md`

---

## S · Stati

### S1 · Ogni pagina ha cinque stati
- **Regola:** caricamento (scheletro), vuoto (illustrazione animata, frase, un'azione), errore (cosa è successo e «Riprova»), offline (banner, i dati già caricati restano leggibili), pieno.
- **Perché:** la versione «piena» è quella che si vede in demo; le altre sono quelle che si vedono davvero il primo giorno, con la rete lenta o quando qualcosa va storto. Una pagina bianca sembra rotta e fa chiamare l'assistenza.
- **Invece:** quando scrivi una pagina, scrivi tutti e cinque gli stati, anche se non li chiedono.
- **Fonte:** `default.md` §5 · README › Principi 8

### S2 · Mai una rotella sola a schermo intero
- **Regola:** si aspetta con lo scheletro della forma vera (`SkeletonLayout`, `Skeleton`). La rotella sta solo dentro bottoni e righe. Le schermate intere sono `BootScreen` o lo scheletro della pagina.
- **Perché:** lo scheletro dice cosa sta arrivando e dove, e fa sembrare l'attesa più breve. Una rotella sola non dice niente: non si sa se sta caricando o se si è bloccato.
- **Invece:** `SkeletonLayout` con la forma della pagina (`table`, `detail`, `kpi`…); `Button loading` per le azioni.
- **Fonte:** `default.md` §3 e §5 · README › Caricamento

### S3 · I tempi dell'attesa
- **Regola:** sotto 300 ms niente; da 300 ms lo scheletro o la rotella nel controllo; da 2 s la frase su cosa arriva; da 10 s «Ci vuole più del solito» con «Riprova».
- **Perché:** sotto 300 ms un loader lampeggia e basta, e fa sembrare lento ciò che è veloce. Oltre 10 s la persona pensa che sia bloccato: va detto e va data una via d'uscita.
- **Invece:** i loader di STC hanno già questi tempi (`STC.DEFAULTS.waits`): non abbassarli.
- **Fonte:** `default.md` §1 · README › Caricamento

### S4 · I vuoti con l'illustrazione, le pagine di stato col loro disegno
- **Regola:** `EmptyState` senza `icon` né `illustration` prende `folder-empty` animata; `Table` senza `empty` ha già il suo vuoto. `StatePage` (vuoto, errore, offline, 404, accesso negato) ha l'illustrazione grande scelta dal tipo: si cambia il testo, non il disegno. L'icona tonda solo negli spazi sotto i 120 px.
- **Perché:** il disegno di una pagina di stato è il modo in cui la persona riconosce il caso al volo («ah, è il 404»). Se ogni progetto lo cambia, il segnale si perde. Scegli l'illustrazione dal caso, non dall'aspetto.
- **Invece:** passa titolo e frase tuoi; per i vuoti scegli il nome giusto (`search-empty`, `filter-empty`, `clients-first`).
- **Fonte:** `default.md` §2 · `components/EmptyState/README.md`

---

## T · Testi e formati

### T1 · Italiano, del tu, frasi brevi
- **Regola:** si scrive in italiano, si dà del tu, frasi brevi, dalla parte di chi usa il prodotto.
- **Perché:** chi usa un gestionale legge di corsa, tra un cliente e l'altro. Frasi brevi e dirette si capiscono al primo colpo; il lei e il gergo tecnico mettono distanza e rallentano.
- **Invece:** «Il pagamento è registrato», non «L'operazione di registrazione è stata completata con successo».
- **Fonte:** `default.md` §7 · README › Voce e testi

### T2 · Bottoni con il verbo di ciò che succede
- **Regola:** «Registra pagamento», «Nuovo cliente», «Spedisci comunque». Mai «OK», «Sì», «Invia», «Conferma» da soli.
- **Perché:** «OK» non dice cosa succede quando lo premi. Con il verbo la persona sa cosa fa il bottone senza leggere il resto, e non preme quello sbagliato.
- **Invece:** il verbo più l'oggetto; al gerundio quando carica («Registro…»).
- **Fonte:** `default.md` §7 · README › Voce e testi

### T3 · Errori che dicono come rimediare
- **Regola:** cosa non va e come rimediare, senza scuse. Mai «Errore» da solo o «Qualcosa è andato storto».
- **Perché:** un errore che non dice cosa fare lascia la persona bloccata e la manda all'assistenza. «Manca la parte dopo la @» si risolve in un secondo.
- **Invece:** «Questa pagina non si è caricata. Riprova tra qualche secondo».
- **Fonte:** `default.md` §7 · README › Voce e testi

### T4 · Date, ore e importi all'italiana
- **Regola:** date `gg/mm/aaaa`, ore `18:30` a 24 ore, importi `€ 1.240,00` (euro prima, virgola per i decimali, punto per le migliaia), settimana da lunedì.
- **Perché:** sono i formati che le persone usano già. «03/04» letto all'americana è un altro giorno: in un gestionale vuol dire una scadenza sbagliata.
- **Invece:** `formatEuro`, `formatNumero` e gli input di STC, che formattano già.
- **Fonte:** `default.md` §7

### T5 · Titoli, dialog, toast e vuoti
- **Regola:** titolo di pagina = nome della sezione con una riga di contesto sotto. Dialog: il titolo è la domanda, la frase la conseguenza. Toast al passato con il nome di chi riguarda. Vuoti: cosa non c'è e dove comparirà.
- **Perché:** ogni testo risponde alla domanda che la persona si fa in quel punto: dove sono, cosa succede se premo, è andato?, perché è vuoto?
- **Invece:** «Spedire comunque l'ordine?» · «Pagamento registrato · Giulia Ferri» · «Nessun ingresso oggi. I passaggi al cancello compaiono qui».
- **Fonte:** README › Voce e testi

### T6 · Niente emoji, esclamativi o maiuscole per enfasi
- **Regola:** niente emoji nell'interfaccia, niente punti esclamativi, niente MAIUSCOLE per enfasi. Le micro-etichette maiuscole (`overline`) solo per i gruppi.
- **Perché:** un gestionale è uno strumento di lavoro: il tono è calmo e preciso. Le emoji cambiano aspetto da un sistema all'altro e i lettori di schermo le leggono per esteso. Il maiuscolo si legge peggio e sembra un grido.
- **Invece:** le icone Lucide (V5); l'enfasi con il peso del carattere.
- **Fonte:** `default.md` §4 · README › Voce e testi

---

## V · Aspetto

### V1 · Solo token, niente valori a mano
- **Regola:** nei componenti non si scrive mai un colore, un raggio, un'ombra, uno spazio o una durata a mano: si usa il token (`var(--surface)`, `var(--r-12)`, `var(--dur-fast)`). E i semantici, non le scale (`text-secondary`, non `neutral-600`).
- **Perché:** un colore scritto a mano non cambia con il tema scuro, non cambia quando il progetto cambia l'accento e non ha il contrasto controllato. Il semantico funziona nei due temi, la scala no.
- **Invece:** cerca il token in `tokens.css` o nel README › Colore. Se non c'è, chiedi se aggiungerlo.
- **Fonte:** README › Come si usa · README › Colore

### V2 · Quattro altezze di controllo, ognuna col suo raggio
- **Regola:** 30 / `r-6` nelle righe di tabella; 32 / `r-8` dentro card e barre degli strumenti; 40 / `r-10` nei moduli; 44 / `r-12` nella testata. Al tocco tutto sale a 44.
- **Perché:** l'altezza dice dove sei: in una riga i controlli sono piccoli per non pesare, in testata grandi perché sono le azioni della pagina. Altezze inventate rompono l'allineamento con i vicini. 44 al tocco è la misura minima per il dito.
- **Invece:** la prop `size` (`row` · `card` · `form` · `header`).
- **Fonte:** README › Spazi, raggi, misure

### V3 · Tre caratteri, ognuno col suo compito
- **Regola:** `--font-display` solo per titoli di pagina, marca e schermate di marca, mai nel corpo né sui numeri. `--font-text` per tutta l'interfaccia. `--font-num` per i numeri.
- **Perché:** il display ha personalità ma è faticoso da leggere a lungo; usato ovunque toglie forza ai titoli. Tre ruoli fissi tengono la gerarchia chiara.
- **Invece:** le classi della scala (`page-title`, `card-title`, `body`…).
- **Fonte:** README › Tipografia · `default.md` §4

### V4 · Niente card dentro card con bordo
- **Regola:** non si mette una card con bordo dentro un'altra card con bordo.
- **Perché:** bordi dentro bordi fanno righe doppie e livelli che non si capiscono. La gerarchia si dà con lo spazio, i titoli e `surface-sunken`.
- **Invece:** dentro una card usa sezioni, divisori (`divider`) o `KeyValue`.
- **Fonte:** README › Cosa non fare

### V5 · Solo icone Lucide, un concetto un'icona
- **Regola:** solo Lucide (già tutte in STC, `<Icon name="…" />`), tratto 1,5. La stessa icona per lo stesso concetto ovunque; le icone di stato sono fisse. Un'icona non si disegna a mano.
- **Perché:** icone di famiglie diverse hanno spessori e stili diversi e si vede. La stessa icona per lo stesso concetto fa da àncora: la barra laterale insegna cosa vuol dire, il resto la ripete.
- **Invece:** cerca il nome su lucide.dev o nella scheda `Icon`.
- **Fonte:** README › Iconografia · `default.md` §4

### V6 · La superficie di marca una volta per schermata
- **Regola:** `brand-ink` e le sue trame solo per testata della barra laterale, schermate di accesso, tessera dell'app, un numero in evidenza. Una per schermata.
- **Perché:** la superficie scura di marca è il momento forte della pagina. Ripetuta perde forza e fa sembrare tutto pubblicità.
- **Invece:** il resto su `surface` e `page-bg`.
- **Fonte:** `default.md` §4 · README › Superfici di marca

### V7 · Il logo di STC non si tocca
- **Regola:** il logo di STC non si ruota, non si deforma, non si ricompone con un altro carattere, non si ricolora fuori dalla tinta dell'accento. Rispetta le misure minime di ogni versione.
- **Perché:** il vetro sotto i 64 px si impasta; un logo ricomposto non è più il logo. Un progetto costruito su STC non deve usare il logo di STC come suo.
- **Invece:** il progetto mette il suo logo con la prop `logo`, o il nome con `Wordmark` (M1).
- **Fonte:** README › Logo

---

## A · Accessibilità

### A1 · Contrasto minimo · rigida
- **Regola:** testo sopra 4,5:1, icone, bordi che contano e anello di fuoco sopra 3:1, nei due temi.
- **Perché:** sotto questi valori una parte delle persone non legge, e nessuno legge al sole o su un monitor scadente. In Europa l'accessibilità è anche un obbligo di legge per molti prodotti digitali.
- **Invece:** usa i semantici di testo sulle superfici che nominano. Quando cambi l'accento, ricontrolla il contrasto (`adattare.md`).
- **Fonte:** README › Accessibilità

### A2 · Tutto da tastiera · rigida
- **Regola:** Tab tra i comandi, frecce in liste, tab, segmentati e calendario, Invio per scegliere, Esc per chiudere. I bottoni a sola icona hanno `label`. I grafici hanno la tabella nascosta con i dati.
- **Perché:** chi non usa il mouse (per scelta, velocità o disabilità) deve poter fare tutto. Un bottone a sola icona senza `label` per un lettore di schermo è «bottone», e basta.
- **Invece:** i componenti di STC lo fanno già: non sostituirli con `div` cliccabili.
- **Fonte:** README › Accessibilità

### A3 · Selezione e apertura separate
- **Regola:** la casella in una riga di tabella sceglie la riga e non la apre; il ⋮ non apre la riga; il clic sul resto della riga la apre.
- **Perché:** se scegliere apre la scheda, chi vuole selezionare dieci righe finisce dieci volte in un'altra pagina.
- **Invece:** `Table` con `selectable` e `onRowClick`: è già così.
- **Fonte:** README › Accessibilità · `components/Table/README.md`

---

## M · Marca e codice

### M1 · La marca cambia, il resto resta
- **Regola:** ogni progetto cambia la **parte A** (accento, superficie di marca, caratteri, nome e logo, icone delle sezioni, raramente i neutri) e tiene la **parte B** (navigazione, gerarchie, componenti, stati, movimento, testi).
- **Perché:** la parte A è ciò che rende un prodotto riconoscibile; la parte B è ciò che lo rende facile da usare, ed è stata decisa su un gestionale vero. Cambiare la A è normale e non è una deroga; cambiare la B è una deroga.
- **Invece:** per la A segui `adattare.md`. Per la B, le regole di questo file.
- **Fonte:** `adattare.md`

### M2 · L'accento lontano dalle tinte degli stati
- **Regola:** la tinta dell'accento (H in OKLCH) sta lontana da quelle degli stati: pericolo e attenzione 20–55, successo 140–160. Rigenera tutta la scala `accent-*` con i ruoli di STC e cambia anche i token `ill-*`.
- **Perché:** un accento rosso o verde si confonde con un errore o con un successo, e P2 salta. Una scala fatta a mano rompe i ruoli (il 400 pieno, il 600+ come inchiostro) e il contrasto.
- **Invece:** scegli in 75–105, 185–220 o 280–340 (il blu di serie, 260, è un'eccezione accettata: l'informazione si riconosce da icona e parola). Cambia la scala in `tokens.json` e `tokens.css` nei due temi e ricontrolla il contrasto.
- **Fonte:** `adattare.md` › Scegliere l'accento

### M3 · Si importano i componenti, non si copiano nelle pagine
- **Regola:** i componenti si usano da `window.STC` con i tipi di `components/index.d.ts`. Non si copiano dentro le pagine, non si sovrascrivono le classi `stc-` dal CSS del progetto.
- **Perché:** una copia nella pagina non riceve più le correzioni di STC e diverge in silenzio. Sovrascrivere `stc-` da fuori rompe il componente al primo aggiornamento.
- **Invece:** se serve una variante, si aggiunge al sistema (P9). Con Tailwind o shadcn usa i token di `tokens.css` e i controlli di STC.
- **Fonte:** `adattare.md` › In un progetto di codice
