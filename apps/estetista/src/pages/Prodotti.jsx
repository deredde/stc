// Prodotti in vendita e magazzino: giacenze, scorta minima, carichi.
import { STC, useState } from '../stc.js';
import { Euro, VuotoFiltri, contiene, scarica, csv } from '../parts/ui.jsx';
import { useModulo } from '../parts/modulo.js';
import { cambia, nuovoId } from '../data/store.js';
import { trova } from '../lib/dominio.js';
import { oggi, piuGiorni, data as fData } from '../lib/tempo.js';
import { euro, centesimi, perCampo } from '../lib/soldi.js';

const { ListPage, Table, Button, IconButton, FilterMenu, Chip, Badge, Menu, EmptyState, Drawer, Dialog, Field, TextInput, MoneyInput, NumberInput, Switch, SaveStatus, StatTile, Alert, useToast } = STC;

const scorta = p => p.giacenza <= 0 ? { tone: 'danger', label: 'Esaurito', icon: 'circle-x', codice: 'esaurito' } : p.giacenza <= p.soglia ? { tone: 'warning', label: 'Da riordinare', icon: 'triangle-alert', codice: 'riordino' } : { tone: 'success', label: 'Disponibile', icon: 'circle-check', codice: 'ok' };

export function Prodotti({ db }) {
  const toast = useToast();
  const [q, setQ] = useState('');
  const [stato, setStato] = useState('');
  const [cat, setCat] = useState('');
  const [aperto, setAperto] = useState(null);
  const [carico, setCarico] = useState(null);
  const [qta, setQta] = useState(6);
  const [notaCarico, setNotaCarico] = useState('');

  const categorie = [...new Set(db.prodotti.map(p => p.categoria))].sort();
  const righe = db.prodotti
    .filter(p => contiene(q, p.nome, p.marca, p.codice))
    .filter(p => !stato || scorta(p).codice === stato)
    .filter(p => !cat || p.categoria === cat)
    .sort((a, b) => a.giacenza - a.soglia - (b.giacenza - b.soglia));
  const valore = db.prodotti.reduce((s, p) => s + Math.max(0, p.giacenza) * p.costo, 0);
  const daOrdinare = db.prodotti.filter(p => p.attivo && p.giacenza <= p.soglia);
  const venduti30 = db.vendite.filter(v => v.stato === 'pagata' && v.data >= piuGiorni(oggi(), -30)).flatMap(v => v.righe).filter(r => r.tipo === 'prodotto').reduce((s, r) => s + r.qta, 0);
  const pc = carico ? trova(db.prodotti, carico) : null;

  const registraCarico = () => {
    const annulla = cambia(d => { trova(d.prodotti, pc.id).giacenza += qta; d.carichi.push({ id: nuovoId('ca'), prodottoId: pc.id, qta, data: oggi(), nota: notaCarico }); });
    toast({ text: `Caricati ${qta} pezzi · ${pc.nome}`, tone: 'success', action: { label: 'Annulla', onClick: annulla } });
    setCarico(null);
  };
  const ordine = () => {
    scarica(`ordine-${oggi()}.csv`, csv([['Prodotto', 'Marca', 'Codice', 'In magazzino', 'Scorta minima', 'Da ordinare'], ...daOrdinare.map(p => [p.nome, p.marca, p.codice, p.giacenza, p.soglia, Math.max(p.soglia * 2 - p.giacenza, 1)])]));
    toast({ text: `Lista d'ordine pronta · ${daOrdinare.length} prodotti`, tone: 'success' });
  };

  return (
    <ListPage
      header={{ title: 'Prodotti', subtitle: `${db.prodotti.filter(p => p.attivo).length} in vendita · ${daOrdinare.length} da riordinare`, actions: <><Button icon="download" onClick={ordine} disabled={!daOrdinare.length}>Lista d'ordine</Button><Button variant="primary" icon="plus" onClick={() => setAperto({})}>Nuovo prodotto</Button></> }}
      search={{ value: q, onChange: setQ, placeholder: 'Cerca per nome, marca o codice a barre' }}
      filters={<>
        <FilterMenu label="Magazzino" value={stato} onChange={setStato} options={[{ value: 'riordino', label: 'Da riordinare', dot: 'warning' }, { value: 'esaurito', label: 'Esauriti', dot: 'danger' }, { value: 'ok', label: 'Disponibili', dot: 'success' }].map(o => ({ ...o, count: db.prodotti.filter(p => scorta(p).codice === o.value).length }))} />
        <FilterMenu label="Categoria" value={cat} onChange={setCat} options={categorie.map(c => ({ value: c, label: c }))} />
      </>}
      chips={stato || cat ? <>{stato && <Chip prefix="Magazzino" onRemove={() => setStato('')}>{{ riordino: 'Da riordinare', esaurito: 'Esauriti', ok: 'Disponibili' }[stato]}</Chip>}{cat && <Chip prefix="Categoria" onRemove={() => setCat('')}>{cat}</Chip>}</> : null}
      onClearFilters={stato || cat ? () => { setStato(''); setCat(''); } : undefined}>
      <div className="griglia-3">
        <StatTile title="Valore del magazzino" value={euro(valore)} icon="package" note="Al prezzo di acquisto" />
        <StatTile title="Venduti negli ultimi 30 giorni" value={`${venduti30} pezzi`} icon="shopping-bag" note="Dalla cassa" />
        <StatTile title="Da riordinare" value={String(daOrdinare.length)} icon="triangle-alert" tone={daOrdinare.length ? 'warning' : undefined} note="Sotto la scorta minima" onClick={() => setStato('riordino')} />
      </div>
      <Table label="Prodotti" rows={righe} rowKey={p => p.id} onRowClick={p => setAperto({ id: p.id })}
        columns={[
          { key: 'nome', label: 'Prodotto', width: 'minmax(0, 2.4fr)', render: p => <div className="colonna" style={{ gap: 2 }}><span className="forte">{p.nome}</span><span className="caption">{p.marca} · <span className="num">{p.codice}</span></span></div> },
          { key: 'cat', label: 'Categoria', width: 'minmax(0, .9fr)', hideOnMobile: true, render: p => p.categoria },
          { key: 'stato', label: 'Magazzino', width: 'minmax(0, 1.2fr)', render: p => { const s = scorta(p); return <Badge tone={s.tone} size="sm" icon={s.icon}>{s.label}</Badge>; } },
          { key: 'giacenza', label: 'Pezzi', width: 'minmax(0, .7fr)', align: 'right', mono: true, render: p => p.giacenza },
          { key: 'soglia', label: 'Minimo', width: 'minmax(0, .7fr)', align: 'right', mono: true, hideOnMobile: true, render: p => p.soglia },
          { key: 'prezzo', label: 'Prezzo', width: 'minmax(0, .9fr)', align: 'right', render: p => <Euro c={p.prezzo} /> },
        ]}
        actions={p => <div className="riga">
          <Button size="row" icon="package-plus" onClick={() => { setCarico(p.id); setQta(Math.max(1, p.soglia * 2 - p.giacenza)); setNotaCarico(''); }}>Carica</Button>
          <Menu items={[
            { id: 'modifica', label: 'Modifica', icon: 'pencil', onSelect: () => setAperto({ id: p.id }) },
            p.attivo ? { id: 'togli', label: 'Togli dalla vendita', icon: 'eye-off', separator: true, onSelect: () => { const a = cambia(d => { trova(d.prodotti, p.id).attivo = false; }); toast({ text: `Tolto dalla vendita · ${p.nome}`, action: { label: 'Annulla', onClick: a } }); } }
              : { id: 'rimetti', label: 'Rimetti in vendita', icon: 'eye', separator: true, onSelect: () => { const a = cambia(d => { trova(d.prodotti, p.id).attivo = true; }); toast({ text: `Di nuovo in vendita · ${p.nome}`, action: { label: 'Annulla', onClick: a } }); } },
          ]} />
        </div>}
        actionsWidth={130}
        empty={db.prodotti.length === 0
          ? <EmptyState illustration="out-of-stock" title="Nessun prodotto in vendita" action={<Button variant="primary" icon="plus" onClick={() => setAperto({})}>Aggiungi il primo</Button>}>Creme, sieri e smalti che vendi alla cassa, con le giacenze.</EmptyState>
          : <VuotoFiltri onAzzera={() => { setStato(''); setCat(''); setQ(''); }} cosa="prodotto" />} />
      <DrawerProdotto db={db} stato={aperto} onClose={() => setAperto(null)} />
      <Dialog open={!!pc} onClose={() => setCarico(null)} icon="package-plus" title={pc ? `Caricare ${pc.nome}?` : ''} description={pc ? `Adesso ne hai ${pc.giacenza}. Dopo il carico saranno ${pc.giacenza + qta}.` : ''}
        footer={<div className="riga riga--fine"><Button variant="tertiary" onClick={() => setCarico(null)}>Annulla</Button><Button variant="primary" icon="package-plus" onClick={registraCarico} disabled={qta < 1}>Carica {qta} pezzi</Button></div>}>
        <div className="colonna">
          <Field label="Pezzi arrivati"><NumberInput value={qta} onChange={setQta} min={1} max={999} /></Field>
          <Field label="Nota" optional><TextInput value={notaCarico} onValue={setNotaCarico} placeholder="Numero d'ordine o fornitore" /></Field>
        </div>
      </Dialog>
    </ListPage>
  );
}

function DrawerProdotto({ db, stato, onClose }) {
  const toast = useToast();
  const open = !!stato;
  const esistente = stato?.id ? trova(db.prodotti, stato.id) : null;
  const vuoto = () => ({ nome: '', marca: '', categoria: 'Viso', prezzo: 0, costo: 0, giacenza: 0, soglia: 3, codice: '', attivo: true });
  const { f, set, salvo, ora } = useModulo({ open, esistente, vuoto, chiave: stato?.id, valido: v => v.nome.trim(), salva: v => cambia(d => Object.assign(trova(d.prodotti, esistente.id), v)) });
  const [tocco, setTocco] = useState(false);
  const errore = !f.nome.trim() ? 'Scrivi il nome del prodotto' : null;
  const carichi = esistente ? db.carichi.filter(c => c.prodottoId === esistente.id).sort((a, b) => b.data.localeCompare(a.data)) : [];
  const margine = f.prezzo && f.costo ? Math.round((f.prezzo - f.costo) / f.prezzo * 100) : null;

  const crea = () => {
    setTocco(true);
    if (errore) return;
    const annulla = cambia(d => { d.prodotti.push({ ...f, id: nuovoId('pr') }); });
    toast({ text: `Prodotto creato · ${f.nome}`, tone: 'success', action: { label: 'Annulla', onClick: annulla } });
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose} title={esistente ? esistente.nome : 'Nuovo prodotto'} subtitle={esistente ? esistente.marca : 'Da vendere alla cassa'}
      headerActions={salvo ? <SaveStatus state={salvo} time={ora} errorLabel="Manca il nome: non salvo" /> : null}
      footer={esistente ? <div className="riga riga--fine"><Button onClick={onClose}>Chiudi</Button></div> : <div className="riga riga--fine"><Button variant="tertiary" onClick={onClose}>Annulla</Button><Button variant="primary" icon="plus" onClick={crea}>Crea prodotto</Button></div>}>
      <div className="colonna colonna--larga">
        <Field label="Nome" error={(tocco || esistente) && errore ? errore : undefined}><TextInput value={f.nome} onValue={v => set({ nome: v })} invalid={(tocco || !!esistente) && !!errore} /></Field>
        <div className="griglia-campi">
          <Field label="Marca" optional><TextInput value={f.marca} onValue={v => set({ marca: v })} /></Field>
          <Field label="Categoria"><TextInput value={f.categoria} onValue={v => set({ categoria: v })} /></Field>
          <Field label="Prezzo di vendita"><MoneyInput key={`p-${open}-${f.id || 'n'}`} defaultValue={perCampo(f.prezzo)} onChange={t => set({ prezzo: centesimi(t) })} /></Field>
          <Field label="Costo d'acquisto" help={margine != null ? `Margine ${margine} %` : undefined}><MoneyInput key={`c-${open}-${f.id || 'n'}`} defaultValue={perCampo(f.costo)} onChange={t => set({ costo: centesimi(t) })} /></Field>
          <Field label="Pezzi in magazzino"><NumberInput value={f.giacenza} onChange={v => set({ giacenza: v })} min={0} max={9999} /></Field>
          <Field label="Scorta minima" help="Sotto questo numero ti avviso"><NumberInput value={f.soglia} onChange={v => set({ soglia: v })} min={0} max={999} /></Field>
        </div>
        <Field label="Codice a barre" optional><TextInput value={f.codice} onValue={v => set({ codice: v.replace(/\D/g, '') })} inputMode="numeric" /></Field>
        <Switch checked={f.attivo} onChange={v => set({ attivo: v })} label="In vendita" />
        {carichi.length > 0 && <div className="colonna"><span className="overline">Ultimi carichi</span>{carichi.slice(0, 5).map(c => <div key={c.id} className="totale-riga"><span><span className="num">{fData(c.data)}</span>{c.nota ? ` · ${c.nota}` : ''}</span><span className="num">+{c.qta}</span></div>)}</div>}
      </div>
    </Drawer>
  );
}
