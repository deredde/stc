# Receipt

La ricevuta da vedere, scaricare, inviare e stampare: chi vende, cosa, quanto, l'IVA e come è stato pagato.

**Cosa passi:** `variant` (di serie ticket), `merchant` (di serie Esempio Srl), `vatId` (di serie IT01234567890), `addr`, `number` (di serie 2026/0418), `date`, `lines`, `vat` (di serie 22), `method` (di serie Carta •••• 4242), `status` (di serie paid).

**Quando usarlo**
- Dopo un pagamento, nello storico ordini, allegata all'email.

**Quando no**
- Come fattura elettronica: quella ha il suo formato. La ricevuta la accompagna.

**Regole**
- Sempre: chi vende con partita IVA, numero, data, righe, imponibile, IVA, totale, metodo di pagamento.
- Cifre in carattere numerico, allineate a destra.
- Rimborso: totale barrato e riga del rimborso con la data.
- In stampa spariscono i bottoni.
- Due formati: scontrino (340) e foglio (640).

**Stati coperti:** Pagata · Rimborsata · Stampa · Scuro.
