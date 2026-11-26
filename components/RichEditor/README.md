# RichEditor

Il testo con la formattazione che serve davvero: grassetto, titoli, citazioni, elenchi e collegamenti. Con il conteggio e le scorciatoie.

**Cosa passi:** `defaultHtml` (di serie ), `placeholder` (di serie Scrivi qui…), `max` (di serie 1000), `readOnly`, `minHeight` (di serie 180).

**Quando usarlo**
- Descrizioni, note, commenti lunghi, messaggi con un minimo di struttura.

**Quando no**
- Testi brevi di una riga: basta un campo.
- Documenti veri con tabelle e immagini: serve un editor di documenti.

**Regole**
- Al massimo 8 comandi: grassetto, corsivo, sottolineato, titolo, citazione, due elenchi, collegamento.
- Il bottone attivo resta acceso dove c'è il cursore.
- Il collegamento chiede di selezionare prima il testo e controlla l'indirizzo.
- Il contatore conta i caratteri visibili; oltre il limite lo dice in rosso e con il numero.
- Si incolla senza stili: si tiene solo la struttura.

**Stati coperti:** Vuoto · Focus · Formattato · Collegamento · Oltre il limite · Solo lettura.
