# CommandSearch

Ricerca globale, da ogni pagina con «/»: ultimi aperti quando è vuota, risultati evidenziati, «Crea» quando non trova niente.

**Cosa passi:** `open`, `onClose`, `query`, `onQuery`, `recent` e `results` (`id`, `title`, `meta`, `initials` o `icon`, `badge`), `onPick(id)`, `onCreate(testo)`, `createLabel`, `placeholder`, `noun`, `hint`, `emptyText`.

**Regole:** larga 640, a 96 px dall'alto. La parte trovata è evidenziata con la tinta dell'accento. ↑↓ per muoversi, Invio per aprire, Esc per chiudere. Su telefono occupa lo schermo con la freccia indietro.
