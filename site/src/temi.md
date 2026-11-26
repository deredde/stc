## Come funziona

Ogni colore di STC è un token. L'accento ha una scala da `accent-50` a `accent-950`, calcolata in OKLCH: luminosità e croma restano, cambia solo la **tinta**. Per questo basta un numero per avere un tema nuovo, chiaro e scuro insieme, con illustrazioni e luci comprese.

Scegli una tinta o un tema pronto qui sopra: cambia la scala e le anteprime dei componenti, il resto del sito resta com'è. Con **Copia tema** hai le variabili pronte da incollare nel tuo progetto.

## Usare un tema pronto

I 30 temi stanno in `temi.css`, nella repo accanto a `tokens.css`. Ognuno è chiaro o scuro e segue la regola **60·30·10**: il 60 va su fondo e neutri, il 30 su testo, bottone primario e struttura, il 10 sull'accento (controlli, voce attiva, grafici, luci delle illustrazioni). I colori di stato restano quelli di STC.

1. Carica `temi.css` dopo `tokens.css`.
2. Metti `data-palette` con l'id del tema sullo stesso elemento di `data-theme`, con il modo del tema: `<html data-theme="light" data-palette="tahini">` oppure `<html data-theme="dark" data-palette="obsidian">`.
3. Per tornare al blu di serie togli `data-palette`.

Scegli un tema qui sopra e premi **Tema**: copi il codice pronto. Per crearne uno nuovo aggiungi i tre colori a `temi.json` e lancia `node scripts/temi.mjs`: le regole sono nel README, alla voce **Temi pronti**.

## Una tinta tua

1. Cambia la tinta (260 è il blu elettrico di STC) nella scala `accent` di `tokens.json`, per chiaro e scuro.
2. Rigenera `tokens.css`, oppure incolla le variabili copiate da qui dopo `tokens.css`.
3. Le regole complete per cambiare marca, superfici e caratteri sono in **Adattare a un progetto**.
