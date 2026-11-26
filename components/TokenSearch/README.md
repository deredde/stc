# TokenSearch

Si scrive «stato:» e si sceglie il valore: ogni filtro diventa un gettone dentro il campo. Va tutto da tastiera.

**Cosa passi:** `fields`, `defaultTokens`, `placeholder`, `es`, `onChange`.

**Quando usarlo**
- Archivi grandi usati ogni giorno da chi lavora: fatture, ticket, ordini.
- Quando i filtri sono tanti e chi usa l'app li conosce.

**Quando no**
- Siti pubblici e utenti occasionali: meglio chip e faccette, visibili.

**Regole**
- Campi da 2 a 8, con nome corto e senza spazi (stato:, cliente:).
- Il menu suggerisce prima i campi, poi i valori; il testo libero diventa «Testo».
- Un campo che non esiste lo dice e suggerisce quelli giusti.
- Backspace a campo vuoto: il primo evidenzia l'ultimo gettone, il secondo lo toglie.
- Sotto il menu i tasti scritti; su telefono spariscono.

**Stati coperti:** Vuota · Suggerimenti campi · Suggerimenti valori · Testo libero · Campo sbagliato · Gettone evidenziato · Focus.
