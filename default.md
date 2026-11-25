# Regole di default

Cosa succede appena installi STC o Lumen, prima di qualunque scelta del progetto. Ogni regola qui è già nel codice: se non scrivi niente, esce così. Si cambia solo con un motivo, e il motivo si scrive nel progetto.

Valgono per tutti e due i sistemi. Dove STC e Lumen fanno in modo diverso, c'è una riga per ciascuno.

## 1. Movimento

- **Le illustrazioni si muovono sempre.** Il bollino entra, la luce respira, il vetro galleggia, un gesto per tema. Per fermarne una serve dirlo.
  - STC: `<Illustration animated />` è il default; `animated={false}` la ferma, `animated="hover"` la muove solo al passaggio.
  - Lumen: `<div data-ill="nome">` si muove da solo; `data-play="false"` la ferma, `data-play="hover"` la muove solo al passaggio. `Lumen.ill.render(nome, misura)` restituisce l'SVG già animato.
- **I loader sono animati e hanno i loro tempi:** sotto 300 ms niente, da 300 ms lo scheletro della forma vera (o la rotella dentro il bottone), da 2 s la frase, da 10 s «Ci vuole più del solito» con «Riprova».
- **Le transizioni sono accese:** tendine, dialog, drawer e fogli entrano ed escono animati; tab e pastiglie scivolano da una voce all'altra.
- **Con «riduci animazioni» tutto si ferma**, ma resta leggibile. È l'unico interruttore che spegne il movimento senza chiederlo.
- Unica eccezione: in una lista che ripete la stessa illustrazione piccola (56) su ogni riga, fermala.

## 2. La variante di serie di ogni componente

| Componente | Di serie | Quando cambiarla |
|---|---|---|
| Bottone | Secondario. Il primario solo per l'azione per cui esiste la vista (uno per vista) | `danger` solo per ciò che non si disfa |
| Stato vuoto | Con illustrazione animata (`folder-empty` se non ne scegli una) | Un'icona solo dentro spazi più bassi di 120 px |
| Pagina di stato (vuoto, errore, offline, 404, accesso negato) | Illustrazione grande animata scelta dal tipo | Mai: si cambia il testo, non il disegno |
| Tabella senza righe | Stato vuoto con illustrazione già messo | Passa il tuo vuoto quando sai cosa manca («Nessun cliente ancora») |
| Toast | In alto su desktop, in basso sul telefono, 4 s (8 s con un'azione) | Mai |
| Tab | Sezioni di una pagina: Tabs. Filtri o viste: Segmented | — |
| Tab scelto | Pillola di vetro con due luci del colore del brand che scorrono lente dietro (variante «Deriva»). La luce non viene mai tagliata né coperta | Mai. Con «riduci animazioni» la luce sta ferma |
| Dialog | Misura conferma (420 STC, 480 Lumen) | `wide` solo per moduli |
| Campi | Etichetta sopra, formato automatico (date, importi, IBAN, telefono) | — |
| Illustrazione | Misura M 120 | S 88 in drawer e fogli, XS 56 in righe e tendine |
| Tema | STC chiaro, Lumen scuro | Lo sceglie la persona dal suo interruttore; il sistema parte sempre dal suo tema |

## 3. Quale componente tra quelli simili

- **Confermare** ciò che non si disfa: Dialog (STC) o Modal (Lumen) su desktop, foglio d'azione sul telefono.
- **Disfare** ciò che si può disfare: si fa subito e il Toast offre «Annulla». Niente conferma.
- **Lavorare su una cosa** senza lasciare la pagina: Drawer su desktop, Sheet sul telefono.
- **Creare poco** (fino a sei campi): Drawer o Sheet. **Creare tanto:** percorso a passi (Wizard).
- **Scegliere** tra 2 e 4 opzioni brevi: Segmented. Da 5 in su: Select. Scelte che contano (piano, metodo di pagamento): carte di selezione.
- **Aspettare:** lo scheletro della forma vera. La rotella sta solo dentro bottoni e righe. Mai una rotella sola a schermo intero.
- **Messaggi:** Toast per l'esito di ciò che hai appena fatto, Alert per ciò che blocca questa pagina, Banner per ciò che riguarda tutta l'app.

## 4. Aspetto di partenza

- **STC:** tema chiaro, accento petrolio (tinta 205), superfici neutre, Inter per l'interfaccia, Space Grotesk solo per i titoli di pagina e la marca, JetBrains Mono per i numeri, densità da gestionale.
- **Lumen:** tema scuro, cremisi `#C0202C` come primario da cui si calcola tutto, radice `.ds.ds-backdrop` con la luce del brand dietro, vetro per carte e navigazione, Inter per testo e titoli.
- Icone a tratto in stile Lucide in tutti e due. Niente emoji nell'interfaccia.
- La luce del brand (Lumen) e la superficie di marca (STC) si usano una volta per schermata.

## 5. Stati obbligatori

Ogni pagina nasce con cinque stati già disegnati: **caricamento** (scheletro), **vuoto** (illustrazione animata, frase, un'azione), **errore** (cosa è successo e «Riprova»), **offline** (banner, i dati già caricati restano leggibili), **pieno**. Una pagina bianca o una rotella a schermo intero sono un errore.

## 6. Comportamenti

- **Si salva da solo:** campi, interruttori e scelte valgono subito, con un Toast che lo conferma. «Salva» compare solo quando si crea qualcosa di nuovo o in un modulo lungo (SaveBar).
- **Gli overlay escono animati** e restano montati il tempo dell'uscita. Il fuoco resta dentro e torna a chi li ha aperti.
- **Il fuoco si vede da tastiera** (anello di 2 px). Tutto ciò che si clicca ha la manina.
- **Niente controlli nativi a vista:** tendine, calendari, orari, caselle e interruttori sono quelli del sistema.

## 7. Lingua e formati

- Italiano, del tu, frasi brevi, dalla parte di chi usa il prodotto.
- Bottoni con il verbo di ciò che succede («Registra pagamento», «Prenota»). Mai «OK», «Invia», «Conferma» da soli.
- Date `gg/mm/aaaa`, ore `18:30` a 24 ore, importi `€ 1.240,00`, settimana da lunedì.
- Errori: cosa non va e come rimediare. Mai «Errore» da solo.

## Nel codice

| | STC | Lumen |
|---|---|---|
| Dove stanno i default | `STC.DEFAULTS` | `Lumen.DEFAULTS` |
| Illustrazioni animate | `Illustration`, `EmptyState`, `StatePage` | `data-ill`, `Lumen.ill.render` |
| Vuoto con illustrazione di serie | `EmptyState` senza `icon` né `illustration`, `Table` senza `empty` | `.ds-empty__art` lasciato vuoto |
| Toast | `ToastProvider` con `placement="auto"` di serie | posizione nelle ricette CSS |
| Tema | chiaro senza attributo | scuro senza attributo |
