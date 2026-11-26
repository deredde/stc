# CookieConsent

Chiede il permesso senza trucchi: rifiutare è facile quanto accettare, e si può scegliere per categoria.

**Cosa passi:** `variant` (di serie bar), `cats`, `defaultView` (di serie main), `onSave`, `policyHref` (di serie #), `state`.

**Quando usarlo**
- Siti pubblici con cookie che non sono necessari: statistiche, pubblicità, video esterni.

**Quando no**
- Dentro l'app per chi ha già accettato: le preferenze stanno nelle impostazioni.
- Se usi solo cookie necessari: non serve chiedere.

**Regole**
- «Rifiuta tutti» e «Accetta tutti» hanno lo stesso peso e lo stesso stile: nessun primario.
- Niente casella già spuntata oltre ai necessari, che sono bloccati e lo dicono.
- Non copre i contenuti principali e non blocca la pagina, salvo dove la legge lo chiede (variante finestra).
- Dopo la scelta resta un bottone tondo in basso a sinistra per riaprirla.
- La scelta vale 6 mesi; poi si richiede.

**Stati coperti:** Prima scelta · Per categoria · Dettaglio aperto · Salvataggio · Salvate · Riaperta.
