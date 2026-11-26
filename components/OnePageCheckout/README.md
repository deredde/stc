# OnePageCheckout

Contatto, indirizzo, spedizione e carta in una pagina sola, con il riepilogo sempre visibile. Premi «Paga» senza compilare per vedere gli errori.

**Cosa passi:** `lines`, `shippingOptions`, `lockers`.

**Quando usarlo**
- Negozi e pagamenti di servizi: tutto il necessario in una schermata, senza passi.

**Quando no**
- Acquisti con tante scelte per articolo (configuratori): meglio a passi.
- Abbonamenti B2B con dati di fatturazione lunghi.

**Regole**
- Ordine fisso: pagamento veloce, contatto, indirizzo, spedizione, carta, bottone «Paga» con l'importo.
- Riepilogo a destra che resta fermo; sotto 900 px diventa una riga «Mostra il riepilogo» in cima con il totale.
- Errori: riquadro in cima con l'elenco cliccabile, più l'errore sotto ogni campo. Il focus va al riquadro.
- Il bottone dice sempre l'importo finale; un solo primario.
- Gli errori spariscono mentre si corregge, non dopo un nuovo invio.

**Stati coperti:** Vuoto · Errori · Codice applicato · Punto di ritiro · Attesa della banca · Telefono.
