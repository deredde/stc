# ColumnMapper

Abbinamento delle colonne di un file da importare: ogni colonna con un esempio, la freccia, il campo del gestionale e lo stato.

**Cosa passi:** `columns` (`{id, name, example, value}`), `fields` (le opzioni di `Select`, compresa `{value:'skip', label:'Non importare'}`), `onChange(id, campo)`, `sourceLabel`, `targetLabel`, `skipValue`.

**Regole**
- Sta nel passo «Abbina le colonne» di uno `Stepper`.
- Il bottone per andare avanti si attiva quando tutte le colonne sono abbinate o ignorate.
