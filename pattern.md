# Pattern di pagina

Come si mettono insieme i componenti. Ogni pattern viene da una pagina vera di un gestionale.

## Elenco

`ListPage` dentro `AppShell`. Dall'alto:

1. **Testata:** il nome («Clienti»), sotto quanti sono e quanti chiedono attenzione («1.284 clienti · 37 da seguire»); a destra «Esporta» (secondario) e «Nuovo …» (primario).
2. **Barra:** ricerca larga 360 a sinistra («Cerca per nome, codice o telefono», con «/»), poi i `FilterMenu` (stato a scelta multipla con i conteggi e il pallino di colore, sede, tipo) e un `DateRangePicker` se conta il tempo.
3. **Filtri applicati:** una riga di `Chip` con la ×, «Azzera», e a destra il numero dei risultati. Compare solo se c'è almeno un filtro.
4. **Tabella** su card che riempie il resto, con `CardToolbar` se servono dei tab («Tutti · In scadenza 23 · Bloccati 12»), `Pagination` in fondo.

Regole: la prima colonna dice cos'è la riga (avatar, nome, codice sotto); lo stato è un `Badge` `sm`; date e importi in mono a destra; al massimo due azioni a vista, il resto nel ⋮; il clic sulla riga apre la scheda. Con la selezione multipla compare la `SelectionBar` scura in basso con le azioni sulle righe scelte («Invia un'email», «Sposta di sede», «Esporta»). Vuoti: senza dati, `EmptyState` con l'azione che crea il primo; con dei filtri, «Nessun risultato con questi filtri» e «Azzera i filtri». Caricamento: righe scheletro, non una rotella.

Su telefono la ricerca prende la larghezza, i filtri scorrono in orizzontale (o vanno in un `Sheet` «Filtri»), la tabella tiene le colonne essenziali (`hideOnMobile` sulle altre).

## Scheda di dettaglio

`DetailPage`. In testata: «‹ Clienti» per tornare, avatar 56, nome in display, lo stato accanto (`Badge`), una riga di dati (codice in mono, da quando, dove), a destra al massimo due bottoni e il ⋮; sotto i tab con i contatori di ciò che aspetta.

Nel corpo, colonna principale: prima ciò che blocca (un `Alert` con l'azione che lo risolve), poi i numeri (`StatTile` in fila da 3), poi le liste (piani, ordini, documenti) in card con «Tutti i …». Colonna laterale da 360: contatti (`KeyValue`), note, chi l'ha seguito. Si modifica in un `Drawer` («Modifica»), non sulla scheda.

## Creare qualcosa

- **Breve** (fino a 6–8 campi): `Drawer` «Nuovo …» con i campi, il riepilogo in fondo e il bottone che crea. Il fuoco va al primo campo. Il clic fuori non chiude se ci sono modifiche: chiedi conferma.
- **Lungo o a passi** (un percorso a passi, come un checkout): pagina intera con i passi in testata, «Indietro» e «Continua»; l'ultimo passo dice cosa succede («Attiva l'abbonamento»).
- **Dalla ricerca:** quando la ricerca globale non trova niente offre «Crea "…" come nuovo …» con il testo già scritto.
- Dopo la creazione: toast al passato e la scheda appena creata.

## Confermare e disfare

- Si disfa con il toast («Annulla») tutto ciò che si può disfare: niente dialog per quelle azioni.
- Si conferma con `ConfirmDialog` solo ciò che non si disfa o che tocca soldi e accessi: titolo-domanda, conseguenza, bottone con il verbo, `danger` se distrugge.
- Un'eccezione a una regola (aprire comunque, spedire comunque) chiede il motivo in un campo facoltativo e resta registrata a nome di chi la fa.

## Impostazioni

`SettingsPage`: le sezioni a sinistra (220) con il pallino rosso su ciò che va sistemato; a destra titolo della sezione 20/600, una riga di spiegazione, i comandi. Le regole sono `SettingRow` (si salvano subito, con un toast); i dati sono card con campi che si salvano all'uscita dal campo. Chi non ha il permesso non vede la sezione (non la vede disabilitata).

## Calendario

`WeekCalendar` su card che riempie la pagina. Sopra: frecce e «Oggi», il periodo in 18/600, a destra il filtro (sala, persona) e il `Segmented` Giorno · Settimana · Mese. L'evento in corso è pieno d'accento, i passati grigi, gli annullati tratteggiati. Il clic su un evento apre un `Drawer` con i dettagli e le azioni; il clic su uno spazio vuoto propone «Nuovo … alle 10:00». Su telefono: una striscia di giorni in alto e la lista del giorno.

## Report

Testata con il periodo (`DateRangePicker` con le scorciatoie) ed «Esporta». Prima la fila di `StatTile` (3 o 4), poi i grafici in card: uno per domanda, una serie per grafico, la barra da notare in accento, il titolo dice cosa si guarda. Le classifiche con `BarList`. Sotto, le tabelle di dettaglio. Ogni numero dice da dove viene (nota della tessera o `Popover` «Come si calcola»).

## Cassa e vendita

Un `Drawer` largo 520 o una pagina a due colonne: chi compra in cima (con «Cambia»), il carrello come lista con prezzi in mono, sconti in verde con il segno meno, il metodo di pagamento con `Segmented`, in fondo il totale in `amount` 24/500 e il bottone primario alto 44 con il verbo («Incassa»). Senza rete la vendita si registra lo stesso e parte appena torna la connessione (lo dice un `Banner`).

## Ricerca globale

`CommandSearch` da ogni pagina con «/» o dal campo nella barra laterale. Vuota mostra gli ultimi aperti; scrivendo, i risultati con la parte trovata evidenziata e lo stato di ognuno; senza risultati, la proposta di crearlo. ↑↓ e Invio. Su telefono a schermo intero.

## Messaggi: dove va cosa

| Cosa | Dove |
|---|---|
| Esito di un'azione appena fatta | `Toast` in alto al centro (in basso su telefono), 4 secondi |
| Qualcosa che blocca questa scheda o questo modulo | `Alert` in cima alla scheda o sopra i campi |
| Un campo sbagliato | errore sotto il campo (`Field`) |
| Qualcosa che riguarda tutto il gestionale (rete, nuova versione) | `Banner` in cima alla pagina |
| Qualcosa che succede mentre si è altrove | numero nel titolo della scheda del browser («(1) Prodotto · Cassa»), notifica di sistema, pallino rosso sulla voce della barra |

## Stati di sistema

- **Senza rete:** `Banner` «Senza rete.» con «Riprova»; le modifiche restano e partono al ritorno; ciò che non si può fare senza rete è disabilitato con il motivo nel tooltip.
- **Nuova versione:** `Banner` informativo con «Aggiorna».
- **Sessione scaduta:** `AuthScreen` «Sei uscito per sicurezza» con l'email già scritta; dopo l'accesso si torna dove si era.
- **Senza permesso:** `StatePage kind="forbidden"`; nella barra la voce non compare.
- **Pagina inesistente:** `StatePage kind="notfound"` con «Torna a …».
- **Caricamento di una pagina:** `StatePage kind="loading"` o lo scheletro della pagina vera.

## App per l'utente finale

`MemberApp` su telefono. Accesso e attivazione con le schermate di marca (`AuthScreen`). La prima schermata mostra la cosa che si usa sempre (`PassCard`: stato, codice, quanto vale ancora), sopra di essa un avviso se c'è da fare qualcosa (pagare, caricare un documento) con il bottone. Poi le info in una lista. Quattro voci in basso. Le conferme e le scelte in un `Sheet`. Le pagine interne hanno la freccia indietro e il titolo in 17/600. Senza rete il codice resta valido per un tempo e poi si sfoca con la spiegazione sopra.

## Telefono e tablet

- Sotto 1024 px il guscio diventa testata da 56 e barra in basso da 72 con l'azione principale in accento al centro e «Menu» che apre tutte le sezioni (con chi sei, il cambio di contesto e «Esci»).
- Le testate semplici spariscono (il titolo è nella testata del guscio); restano quelle delle schede, con i tab che scorrono.
- I drawer occupano lo schermo; i dialog impilano i bottoni a tutta larghezza; le tendine e i filtri diventano `Sheet` quando sono lunghi.
- Al tocco ogni controllo è alto 44.

## Procedura a passi (wizard)

`WizardPage`: testata con briciole, titolo e chiusura; `Stepper` sotto la testata (su telefono `MobileSteps`); a destra un riepilogo che si aggiorna; in fondo una barra fissa con «Indietro» a sinistra e il passo, «Continua» a destra. Da tre a cinque passi. I passi fatti si possono riaprire. Un errore si mostra sul passo (`Stepper` con lo stato «error») e nel modulo con `ErrorSummary`. Chiudere a metà chiede conferma solo se c'è qualcosa da perdere. Per l'avvio di un account nuovo, invece del wizard, `OnboardingChecklist` sul cruscotto.

## Piano e fatturazione

Impostazioni › Piano: in cima il piano attuale con `UsageMeter` (cosa è usato e quanto manca), poi `PaymentMethod` e le fatture in una tabella. Cambiare piano apre `PlanPicker` (mensile/annuale, il piano consigliato in evidenza, il piano attuale disabilitato). Un limite raggiunto mostra `UpgradeCard` nel punto in cui serve, mai un dialog che blocca. Disdire chiede `TypeToConfirm` solo se si perdono dati.

## Squadra e permessi

Elenco delle persone con `AvatarGroup` nella testata e invito con «Invita» (`Dialog` con email e ruolo). Il ruolo si apre in una scheda con `CheckboxTree` per i permessi (gruppo parziale = «misto»). Togliere qualcuno: `Popconfirm` se si può rifare, `TypeToConfirm` se si perdono i suoi dati.

## Importare dati

Tre passi con `Stepper`: carica il file (`FileList` con il trascinamento), abbina le colonne (`ColumnMapper`, una colonna da abbinare blocca «Continua»), controlla e conferma. L'import lungo va avanti in background con `StackedProgress` e una notifica nel `NotificationCenter` alla fine.

## Preferenze di notifica

`NotificationMatrix`: eventi in righe con una riga di spiegazione, canali in colonne (nell'app, email, SMS). Si salva da sola con un toast; i canali a pagamento dicono il limite del piano sotto la tabella.

## Integrazioni

`IntegrationGrid` di `IntegrationCard`: quelle collegate prima, con il badge «Collegato», poi le altre in ordine d'uso. «Collega» apre la procedura del servizio; «Impostazioni» apre un `Drawer`. Scollegare usa `Popconfirm` e dice cosa smette di funzionare.

