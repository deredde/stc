# STC · istruzioni per le AI

<!-- CLAUDE.md e AGENTS.md sono lo stesso file: se ne cambi uno, copia uno sull'altro. Lo controlla scripts/guida-ai.mjs. -->

Questa repo è **STC (Standard Template Construct)**, un design system per gestionali e per le app che li accompagnano: token, oltre 250 componenti React, illustrazioni animate, loader, logo e regole di scrittura. Se ti hanno dato questa repo, chi ti scrive vuole costruire **con STC**. Il tuo compito è aiutarlo a farlo bene: con meno errori possibili rispetto a come STC è pensato.

## 1. Cosa leggere, in quest'ordine

1. **`regole.md`**, sempre e per intero. Tutte le regole con un codice (P1, D4, C3…), il perché e cosa fare invece. È il riferimento per ogni segnalazione.
2. **`README.md`**, la guida completa: principi, voce, colore, tipografia, misure, movimento, stati, layout, caricamento, illustrazioni, logo.
3. **`default.md`**: come STC si comporta se nessuno sceglie niente. I valori sono in `STC.DEFAULTS`.
4. **`pattern.md`** quando costruisci una pagina (elenco, scheda, impostazioni, wizard, report…).
5. **`adattare.md`** quando il progetto cambia la marca o porta STC in un progetto di codice.
6. **`componenti.md`** per trovare il componente giusto. Prima di usarne uno, leggi la sua scheda `components/<Nome>/README.md`; le props esatte stanno in `components/index.d.ts`.

Non inventare props, componenti o token: se non li trovi in `index.d.ts` o in `tokens.css`, non esistono.

## 2. Come costruisci

- Parti dalla pagina tipo più vicina (`ListPage`, `DetailPage`, `SettingsPage`, `WizardPage`, dentro `AppShell`) e dal suo pattern in `pattern.md`.
- Usa i componenti di STC così come sono. Niente controlli nativi, niente `div` cliccabili, niente copie dei componenti nelle pagine.
- Solo token: nessun colore, raggio, ombra, spazio o durata scritto a mano. I semantici (`text-secondary`, `surface`), non le scale.
- Ogni pagina che scrivi ha i cinque stati: caricamento, vuoto, errore, offline, pieno. Anche se non te li chiedono.
- I testi seguono la voce di STC: italiano, del tu, frasi brevi, bottoni con il verbo, formati italiani.
- Tutti e due i temi devono funzionare. STC parte in chiaro.

## 3. Quando una richiesta va contro STC

Questo è il punto più importante. Chi usa STC spesso chiede cose che sembrano piccole ma rompono il sistema: un secondo bottone primario, un «Salva» in fondo alle impostazioni, un colore scritto a mano, una rotella a pagina intera, un `<select>` nativo. Il tuo lavoro è accorgertene **prima** di scrivere il codice.

### Cosa fai

1. **Riconosci.** Prima di eseguire, confronta la richiesta con `regole.md`. Se va contro una regola, non eseguire in silenzio e non correggere in silenzio.
2. **Segnala, con il perché.** Scrivi una nota breve, sempre con questa forma:

   > **Nota STC · P1 · Un solo bottone primario per vista**
   > Mi chiedi due bottoni primari nella testata. In STC il primario dice «questa pagina serve a questo»: con due, nessuno dei due si nota più e chi usa il gestionale deve fermarsi a leggere.
   > **In STC si fa così:** «Nuovo cliente» primario, «Esporta» secondario.
   > Lo faccio così? Se preferisci due primari, dimmelo e li metto.

   Il perché è obbligatorio. Non basta dire «STC non lo prevede»: spiega cosa succede a chi usa il prodotto se si fa in quel modo, e perché STC ha scelto diversamente. Prendi il perché da `regole.md` e adattalo al caso concreto.
3. **Proponi la via STC** e, se il resto della richiesta è chiaro, vai avanti con tutto ciò che non dipende da quel punto.
4. **Se la persona insiste, fallo.** Quando, dopo la nota, dice in modo esplicito che lo vuole lo stesso («sì, due primari», «fallo comunque», «lo so, va bene così»), esegui. Non ripetere la spiegazione, non discutere ancora.
5. **Segna la deroga.** Nel codice, accanto al punto, un commento:

   ```jsx
   {/* deroga STC P1: due primari nella testata, chiesto da chi usa il progetto */}
   ```

   Se il progetto ha un file `DEROGHE.md` (o lo chiede), aggiungi una riga: codice, dove, perché. Così chi arriva dopo sa che è voluto e non un errore.

### Casi particolari

- **Se la richiesta lo dice già** («so che va contro STC, ma voglio…»): fallo subito, con il perché in una riga e la deroga segnata. Non serve chiedere di nuovo.
- **Regole rigide** (segnate così in `regole.md`: contrasto, tastiera, fuoco, stato senza colore, riduci animazioni): la nota dice chiaramente che il danno tocca persone che poi non riescono a usare il prodotto. Se insiste, fallo lo stesso.
- **Una deroga vale per quel punto.** Non estenderla al resto del progetto e non dedurne una regola nuova. Se la persona vuole cambiare la regola per tutto il progetto, scrivila nel progetto (es. nelle sue istruzioni o in `DEROGHE.md`) e da lì in poi seguila senza più segnalarla.
- **Più problemi nella stessa richiesta:** una nota sola, un punto per regola, in ordine di gravità.
- **Non segnalare la marca.** Cambiare accento, superficie di marca, caratteri, logo e nome è previsto (M1): non è una deroga. Segui `adattare.md` e segnala solo se rompe qualcosa (un accento rosso o verde, M2; un contrasto basso, A1).
- **Se non sei sicuro** che sia contro STC, fai la versione STC e dillo in una riga («L'ho messo in un Drawer, come fa STC per i moduli brevi»).
- **Se STC non ha quello che serve:** dillo, proponi il componente più vicino. Se va costruito, costruiscilo con le regole di STC (token, prefisso `stc-`, stati, tastiera, due temi) e segnalalo come aggiunta, così si può portare nel sistema (P9).
- **Errori trovati nel codice esistente** del progetto: segnalali con la stessa forma, ma correggili solo se te lo chiedono o se stai già lavorando su quel pezzo.

### Il tono

Una nota STC è un consiglio da collega esperto, non un rifiuto. Breve, concreta, sul caso specifico, in italiano e del tu. La decisione finale è di chi ti scrive.

## 4. Prima di consegnare

Ricontrolla quello che hai scritto:

- Un solo primario per vista (P1). L'accento non fa da stato (P2).
- Stati con parola e icona, non solo colore (P3). Numeri in mono (P4).
- Niente «Salva» dove si salva da solo (P5). Niente controlli nativi (P6).
- Al massimo due azioni per riga (P7). L'overlay giusto (C1–C6).
- I cinque stati della pagina (S1). Scheletri, non rotelle a pagina intera (S2).
- Testi: verbi nei bottoni, errori che dicono come rimediare, formati italiani (T1–T6).
- Solo token, le altezze giuste, solo icone Lucide (V1, V2, V5).
- Tastiera, fuoco, contrasto, `label` sui bottoni a icona (A1, A2, D10).
- Ogni deroga ha il suo commento `deroga STC`.

## 5. La repo

| Percorso | Cosa c'è |
|---|---|
| `regole.md` | Le regole con il perché, una per codice |
| `componenti.md` | Indice dei componenti per gruppo, con le regole che li riguardano (generato) |
| `README.md` · `default.md` · `pattern.md` · `adattare.md` | La guida completa |
| `tokens.json` · `tokens.css` | Tutti i valori, chiaro e scuro |
| `temi.json` · `temi.css` | 30 temi pronti 60·30·10 (`data-palette`, vedi README, Temi pronti); si rigenera con `node scripts/temi.mjs` |
| `components/bundle.js` · `bundle.css` · `index.d.ts` | I componenti React come `window.STC`, gli stili, i tipi |
| `components/<Nome>/` | Scheda (`README.md`) e anteprima (`preview.html`) di ogni componente |
| `assets/Logo/` | Il logo di STC |
| `site/` | Il sito di STC (non serve per costruire) |
| `scripts/guida-ai.mjs` | Tiene allineata questa guida: `node scripts/guida-ai.mjs` |

Se modifichi STC stesso (non un progetto costruito con STC): dopo aver toccato componenti o regole lancia `node scripts/guida-ai.mjs --scrivi` per rigenerare `componenti.md`, e tieni `CLAUDE.md` e `AGENTS.md` identici. Ogni regola nuova va in `regole.md` con Regola, Perché, Invece e Fonte.
