# Illustration

Piccole illustrazioni per stati vuoti, esiti e messaggi: una luce soffusa del colore del tema, la forma in vetro smerigliato e un solo bollino pieno che dice cosa succede.

**Cosa passi:** `name` (uno dei 66 nomi di `STC.ILLUSTRAZIONI`, per esempio `search-empty`, `doc-not-found`, `mail-recovery`), `size` (`md` 120 di serie · `sm` 88 · `xs` 56 · `lg` 160 · oppure un numero in px), `animated` (`true` di serie · `"hover"` solo al passaggio del mouse sul contenitore · `false` ferma), `label` solo se l'illustrazione porta un'informazione che il testo accanto non dice (di norma è decorativa e resta nascosta ai lettori di schermo).

**Dentro EmptyState:** passa `illustration="<nome>"` al posto di `icon`. In `size="lg"` prende la misura `md`, in `sm` la misura `sm`; `illustrationSize` la cambia.

**Misure:** `md` 120 per pagine vuote, card grandi e schermate di esito; `sm` 88 per drawer, pannelli e tab; `xs` 56 per tendine, righe di tabella e accanto al testo. Mai più larga del titolo che l'accompagna.

**Movimento:** il bollino entra con un piccolo rimbalzo, la luce respira ogni 6 s, il vetro sale e scende di 2 px, e ognuna ha un gesto suo (la lente oscilla, la campanella suona, le righe di invio scorrono). Tutto in CSS; con `prefers-reduced-motion` resta ferma. Nelle liste lunghe o nelle griglie usa `animated="hover"`.

**Colore:** viene tutto dai token `accent`, `on-accent` e `ill-*` (luce, vetro, righe, ombra). Quando un progetto cambia l'accento, cambia anche `ill-glow`, `ill-glow-2` (stessa tinta, +35) e i quattro `rgba` di `ill-line`, `ill-fold`, `ill-edge`, `ill-shadow` (lo stesso colore dell'accento con la loro trasparenza).

**Regole:** un'illustrazione per vuoto, sempre con titolo e frase accanto (le regole dei testi stanno in EmptyState). Il bollino dice il caso: `?` non trovato, `+` primo uso, spunta esito riuscito, croce errore, `!` attenzione, lucchetto sicurezza, orologio attesa o scadenza. Non ricolorarle a mano e non usarle come icone nei bottoni. Fuori da React: `STC.illustrationSvg(nome, px)` restituisce l'SVG come testo.
