# EventIsland

Una pillola scura in alto che si allarga quando un evento chiede una decisione. Dice cosa è successo, perché, e dà l'azione giusta. Se nessuno risponde, l'evento non si perde: finisce in «Da sistemare».

**Cosa passi:** `events`, `timeout` (di serie 30), `autoOpen` (di serie true), `onExpire`, `onResolve`, `onDismiss`, `position` (di serie fixed), `placement` (di serie top), `label` (di serie Eventi da gestire), `defaultOpen`, `state`.

**Quando usarlo**
- Eventi che arrivano mentre la persona fa altro e chiedono una decisione breve: un pagamento rifiutato, un accesso da autorizzare, una richiesta da confermare.
- Al massimo due azioni: quella giusta (piena) e «Dopo» o l'alternativa.
- Quando serve sapere chi o cosa: avatar o icona, nome, e una riga che dice il perché.

**Quando no**
- Conferme di azioni appena fatte: per quelle c'è il Toast.
- Errori di un modulo: vanno sotto il campo.
- Avvisi che riguardano tutta la pagina: Banner.

**Regole**
- Una sola isola per app, in alto al centro; su mobile sopra la barra in basso se in alto c'è il notch.
- Larga 360 aperta e 236 chiusa; sotto i 384 px prende tutta la larghezza meno 12 per lato.
- Si apre da sola dopo 450 ms solo per eventi di tono errore o attenzione; Esc la chiude, Tab resta dentro mentre è aperta.
- Il timer si ferma mentre un'azione è in corso. Allo scadere niente sparisce: l'evento va in «Da sistemare» e lo si dice.
- Non copre mai un dialog: sotto un overlay aspetta.

**Stati coperti:** Chiusa · Aperta · Hover · Focus · In corso · Risolta · Scaduta · Senza timer · Coda · Movimento ridotto.
