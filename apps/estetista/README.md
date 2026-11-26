# Bellezza · gestionale per centri estetici

Un gestionale completo per un centro estetico, costruito con STC e con l'accento fucsia tenue. Funziona nel browser, anche da telefono, e parte con un centro di prova già pieno di dati.

## Provarlo

```bash
cd apps/estetista
npm install
npm run dev
```

Entra con `giulia@bellezzastudio.it` e la password `bellezza`. La pagina per le clienti è su `#/prenota`, senza accesso.

`npm run build` prepara la cartella `dist/`, da caricare su qualunque hosting statico. `npm test` controlla le regole di agenda, cassa, pacchetti e report.

## Cosa c'è

| Schermata | Cosa fa |
|---|---|
| Oggi | Incassato, appuntamenti, prossima cliente, prenotazioni da confermare, compleanni, pacchetti in scadenza |
| Agenda | Giorno con una colonna per operatrice, settimana, elenco. Controlla orari, turni, cabine, abilitazioni e doppioni |
| Clienti e scheda | Ricerca, filtri, segnali (nuova, abituale, da richiamare, assenze), scheda tecnica con allergie e controindicazioni, storico, note |
| Cassa | Servizi, prodotti, pacchetti e gift card nello stesso conto; sconti, punti, sedute da pacchetto, quattro metodi, ricevuta, rimborsi, chiusura di cassa |
| Pacchetti | Catalogo e pacchetti venduti, sedute scalate in automatico, scadenze, proroghe |
| Gift card | Vendita, codice, saldo, uso alla cassa |
| Promemoria | Messaggi pronti su WhatsApp o SMS: promemoria, auguri, richiami di chi non torna |
| Servizi e prodotti | Listino con durate, prezzi, chi li fa e se si prenotano online; magazzino con scorte e lista da ordinare |
| Staff | Orari per operatrice, servizi, colore in agenda, provvigioni del mese |
| Report | Incasso con il confronto, servizi, categorie, metodi, staff; esportazione CSV |
| Impostazioni | Centro, orari e chiusure, agenda e cabine, testi dei messaggi, fedeltà, pagamenti, prenotazione online, backup |
| Prenotazione online | App per le clienti: servizio, giorno, orario libero, conferma; i miei appuntamenti con disdetta; punti e pacchetti; contatti |

## Come è fatto

- **Vite + React** di STC (`window.STC`). `npm run stc` copia token, componenti e React in `public/stc`.
- **Tema:** `scripts/tema-fucsia.mjs` genera `src/tema-fucsia.css` (tinta 338, croma al 78 %) e controlla il contrasto prima di scriverlo.
- **Dati:** tutto in `src/data/store.js`, oggi su `localStorage`. È l'unico file da cambiare per passare a un server.
- **Regole:** `src/lib/dominio.js` (agenda, conto, vendite, rimborsi, pacchetti, report) e `src/lib/tempo.js`, `src/lib/soldi.js` per date e euro. Gli importi sono in centesimi.

## Cosa manca per andare in produzione

- Un server con accesso vero e più dispositivi (consigliato: Supabase).
- Pagamenti online e caparre dalla pagina di prenotazione (consigliato: Stripe, oppure SumUp se in negozio usate già il loro POS).
- Invio automatico dei messaggi (WhatsApp Business API o un servizio SMS). Oggi il messaggio si apre già scritto e si invia con un tocco.
- Scontrino fiscale: le ricevute sono documenti non fiscali, lo scontrino lo fa il registratore telematico.

## Aggiunte da portare in STC

- `Receipt` ha i bottoni senza callback: qui sono collegati da fuori. Servono `onPdf`, `onSend`, `onPrint` (P9).
- Le classi della scala tipografica citate nel README (`num`, `amount`, `caption`…) non sono in `tokens.css`: qui stanno in `src/app.css`.
