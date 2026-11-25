## Dal CDN, in una pagina

STC è un pacchetto di file: i token, il CSS dei componenti, React 18 e il bundle. Copia questo blocco nell'`<head>` e hai tutto in `window.STC`.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/deredde/stc@main/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/deredde/stc@main/components/bundle.css">
<script src="https://cdn.jsdelivr.net/gh/deredde/stc@main/components/lib/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/deredde/stc@main/components/lib/react-dom.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/deredde/stc@main/components/bundle.js"></script>
```

Poi usi i componenti come in qualsiasi app React:

```js
const { Button, Card, Switch } = window.STC;

function App() {
  return (
    <Card title="Notifiche">
      <Switch label="Avvisami per email" defaultChecked />
      <Button variant="primary" icon="check">Salva</Button>
    </Card>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

## Dentro un progetto

1. Copia `tokens.css` e la cartella `components/` nel progetto.
2. Carica i due CSS una volta sola, in cima all'app.
3. Carica `bundle.js` dopo React 18: i componenti sono in `window.STC`. I tipi sono in `components/index.d.ts`.

## Dalla repo

```bash
git clone https://github.com/deredde/stc
```

Dentro trovi il README con tutte le regole, `adattare.md` per cambiare marca e accento, `pattern.md` per le pagine tipo e `default.md` per le regole di partenza.

## Tema chiaro e scuro

Il tema si sceglie con un attributo sulla radice della pagina: `data-theme="light"` (di serie) o `data-theme="dark"`. Tutti i componenti lo seguono da soli.
