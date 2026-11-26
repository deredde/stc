# EventIslandQueue

Quando arrivano più eventi insieme, dietro all'isola si vedono le pillole in attesa. Il numero dice quanti ne restano.

È `EventIsland` con più eventi in `events`: si impilano in coda.

**Cosa passi:** `events`, `timeout` (di serie 30), `autoOpen` (di serie true), `onExpire`, `onResolve`, `onDismiss`, `position` (di serie fixed), `placement` (di serie top), `label` (di serie Eventi da gestire), `defaultOpen`, `state`.

**Quando usarlo**
- Sempre insieme all'isola: non esiste da sola.
- Ordine: prima gli errori, poi gli avvisi, poi le informazioni; a parità, il più vecchio.

**Quando no**
- Per elenchi da scorrere: lì serve il centro notifiche.

**Regole**
- Si vedono al massimo due livelli dietro, il resto è nel numero.
- Il numero si ferma a +9; il conto esatto è nella lista «Da sistemare».
- Un evento che si risolve da solo (per esempio un pagamento riuscito al secondo tentativo) esce dalla coda senza disturbare.
