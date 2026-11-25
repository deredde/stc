# PlanPicker

Tabella dei piani: tre colonne, prezzo in mono, il consigliato con il bordo primario e l'unico bottone primario. Il piano attuale ha il bottone spento.

**Cosa passi:** `plans` (`{id, name, description, price, priceYearly, features, recommended, current, cta}`), `period` / `defaultPeriod` (`month` · `year`), `onPeriodChange`, `onChoose(id, periodo)`, `yearlyLabel`, `monthlyLabel`, `currency`.

**Regole**
- Con `priceYearly` il prezzo mostrato è al mese, sotto quanto si paga all'anno.
- Un solo piano `recommended`.
- IVA: dilla una volta, sotto la tabella.
