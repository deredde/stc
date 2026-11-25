## Prendi la repo

```bash
git clone https://github.com/deredde/stc
```

Dentro trovi il README con tutte le regole, `adattare.md` per cambiare marca e accento, `pattern.md` per le pagine tipo e `default.md` per le regole di partenza.

## Mettilo nel progetto

1. Copia `tokens.css` e la cartella `components/` nel progetto.
2. Carica i due CSS una volta sola, in cima all'app.
3. Carica React 18 (è in `components/lib/`) e poi `bundle.js`: i componenti sono in `window.STC`. I tipi sono in `components/index.d.ts`.

```html
<link rel="stylesheet" href="stc/tokens.css">
<link rel="stylesheet" href="stc/components/bundle.css">
<script src="stc/components/lib/react.production.min.js"></script>
<script src="stc/components/lib/react-dom.production.min.js"></script>
<script src="stc/components/bundle.js"></script>
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

## Tema chiaro e scuro

Il tema si sceglie con un attributo sulla radice della pagina: `data-theme="light"` (di serie) o `data-theme="dark"`. Tutti i componenti lo seguono da soli.
