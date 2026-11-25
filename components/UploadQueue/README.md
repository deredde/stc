# UploadQueue

La coda dei file che si caricano insieme: uno stato per ogni file e il totale in alto. Per un file solo usa `FileProgress`.

**Cosa passi:** `title` («Carico 3 file»), `total` («2,4 di 4,8 MB»), `files` (`[{ name, status: 'done' | 'uploading' | 'waiting' | 'error', value, error }]`), `doneLabel`, `waitingLabel`.

**Regole:** un file che non passa non ferma gli altri; il suo motivo resta scritto nella riga.
