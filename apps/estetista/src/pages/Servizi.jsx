// Il listino dei servizi: durata, prezzo, chi li fa, se si prenotano online.
import { STC, useState, useMemo } from '../stc.js';
import { useAzioni, Euro, TagCategoria, VuotoFiltri, contiene } from '../parts/ui.jsx';
import { useModulo } from '../parts/modulo.js';
import { cambia, nuovoId } from '../data/store.js';
import { trova, CATEGORIE, categoria } from '../lib/dominio.js';
import { oggi, piuGiorni } from '../lib/tempo.js';
import { euro, centesimi, perCampo } from '../lib/soldi.js';

const { ListPage, Table, Button, FilterMenu, Chip, Badge, Menu, EmptyState, Drawer, Field, TextInput, Textarea, Select, MoneyInput, NumberInput, MultiSelect, Switch, SaveStatus, Alert, AvatarGroup, Avatar, useToast } = STC;

export function Servizi({ db }) {
  const azioni = useAzioni();
  const toast = useToast();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState([]);
  const [vis, setVis] = useState('');
  const [aperto, setAperto] = useState(null);
  const [sort, setSort] = useState({ key: 'categoria', dir: 'asc' });

  const quanti = useMemo(() => {
    const da = piuGiorni(oggi(), -90), m = new Map();
    for (const a of db.appuntamenti) if (a.stato === 'completato' && a.data >= da) m.set(a.servizioId, (m.get(a.servizioId) || 0) + 1);
    return m;
  }, [db]);

  const righe = db.servizi
    .filter(s => contiene(q, s.nome, s.descrizione, categoria(s.categoria).label))
    .filter(s => !cat.length || cat.includes(s.categoria))
    .filter(s => !vis || (vis === 'attivi' ? s.attivo : vis === 'online' ? s.attivo && s.online : !s.attivo));
  const dir = sort.dir === 'asc' ? 1 : -1;
  const k = { nome: s => s.nome, categoria: s => CATEGORIE.findIndex(c => c.value === s.categoria) * 1000 + s.prezzo / 100, durata: s => s.durata, prezzo: s => s.prezzo, fatti: s => quanti.get(s.id) || 0 }[sort.key];
  righe.sort((a, b) => (k(a) > k(b) ? 1 : k(a) < k(b) ? -1 : 0) * dir);
  const filtri = cat.length + (vis ? 1 : 0);
  const azzera = () => { setCat([]); setVis(''); setQ(''); };

  const attiva = (s, v) => {
    const annulla = cambia(d => { trova(d.servizi, s.id).attivo = v; });
    toast({ text: `${v ? 'Servizio rimesso nel listino' : 'Servizio tolto dal listino'} · ${s.nome}`, tone: 'success', action: { label: 'Annulla', onClick: annulla } });
  };
  const duplica = s => {
    const id = nuovoId('sv');
    const annulla = cambia(d => { d.servizi.push({ ...structuredClone(s), id, nome: `${s.nome} (copia)` }); });
    toast({ text: `Servizio duplicato · ${s.nome}`, tone: 'success', action: { label: 'Annulla', onClick: annulla } });
    setAperto({ id });
  };

  return (
    <ListPage
      header={{ title: 'Servizi', subtitle: `${db.servizi.filter(s => s.attivo).length} nel listino · ${db.servizi.filter(s => s.attivo && s.online).length} prenotabili online`, actions: <Button variant="primary" icon="plus" onClick={() => setAperto({})}>Nuovo servizio</Button> }}
      search={{ value: q, onChange: setQ, placeholder: 'Cerca un servizio' }}
      filters={<>
        <FilterMenu label="Categoria" multiple value={cat} onChange={setCat} options={CATEGORIE.map(c => ({ value: c.value, label: c.label, count: db.servizi.filter(s => s.categoria === c.value).length }))} />
        <FilterMenu label="Visibilità" value={vis} onChange={setVis} options={[{ value: 'attivi', label: 'Nel listino' }, { value: 'online', label: 'Prenotabili online' }, { value: 'spenti', label: 'Tolti dal listino' }]} />
      </>}
      chips={filtri ? <>{cat.length > 0 && <Chip prefix="Categoria" onRemove={() => setCat([])}>{cat.length === 1 ? categoria(cat[0]).label : `${cat.length} scelte`}</Chip>}{vis && <Chip prefix="Visibilità" onRemove={() => setVis('')}>{{ attivi: 'Nel listino', online: 'Online', spenti: 'Tolti' }[vis]}</Chip>}</> : null}
      onClearFilters={filtri ? azzera : undefined} count={filtri || q ? `${righe.length} servizi` : undefined}>
      <Table label="Servizi" rows={righe} rowKey={s => s.id} onRowClick={s => setAperto({ id: s.id })} sort={sort} onSort={setSort}
        columns={[
          { key: 'nome', label: 'Servizio', width: 'minmax(0, 2.4fr)', sortable: true, render: s => <div className="colonna" style={{ gap: 2 }}><span className="forte">{s.nome}</span>{s.descrizione && <span className="caption">{s.descrizione}</span>}</div> },
          { key: 'categoria', label: 'Categoria', width: 'minmax(0, 1.2fr)', sortable: true, hideOnMobile: true, render: s => <TagCategoria v={s.categoria} /> },
          { key: 'chi', label: 'Chi lo fa', width: 'minmax(0, 1.2fr)', hideOnMobile: true, render: s => s.operatrici?.length ? <span className="secondary">{s.operatrici.map(id => trova(db.operatrici, id)?.nome).filter(Boolean).join(', ')}</span> : <span className="secondary">Tutte</span> },
          { key: 'stato', label: 'Stato', width: 'minmax(0, 1.1fr)', render: s => !s.attivo ? <Badge tone="neutral" size="sm" icon="eye-off">Tolto</Badge> : s.online ? <Badge tone="accent" size="sm" icon="globe">Online</Badge> : <Badge tone="neutral" size="sm" icon="store">Solo al banco</Badge> },
          { key: 'fatti', label: 'Ultimi 90 gg', width: 'minmax(0, .9fr)', align: 'right', sortable: true, hideOnMobile: true, mono: true, render: s => quanti.get(s.id) || 0 },
          { key: 'durata', label: 'Durata', width: 'minmax(0, .8fr)', align: 'right', sortable: true, render: s => <span className="num">{s.durata} min</span> },
          { key: 'prezzo', label: 'Prezzo', width: 'minmax(0, .9fr)', align: 'right', sortable: true, render: s => <Euro c={s.prezzo} /> },
        ]}
        actions={s => <Menu items={[
          { id: 'prenota', label: 'Prenota questo servizio', icon: 'calendar-plus', disabled: !s.attivo, onSelect: () => azioni.nuovoAppuntamento({ servizioId: s.id }) },
          { id: 'modifica', label: 'Modifica', icon: 'pencil', onSelect: () => setAperto({ id: s.id }) },
          { id: 'duplica', label: 'Duplica', icon: 'copy', onSelect: () => duplica(s) },
          s.attivo ? { id: 'togli', label: 'Togli dal listino', icon: 'eye-off', separator: true, onSelect: () => attiva(s, false) } : { id: 'rimetti', label: 'Rimetti nel listino', icon: 'eye', separator: true, onSelect: () => attiva(s, true) },
        ]} />}
        empty={db.servizi.length === 0
          ? <EmptyState illustration="item-not-found" title="Il listino è vuoto" action={<Button variant="primary" icon="plus" onClick={() => setAperto({})}>Crea il primo servizio</Button>}>I servizi che crei si possono prenotare in agenda e online.</EmptyState>
          : <VuotoFiltri onAzzera={azzera} cosa="servizio" />} />
      <DrawerServizio db={db} stato={aperto} onClose={() => setAperto(null)} />
    </ListPage>
  );
}

function DrawerServizio({ db, stato, onClose }) {
  const toast = useToast();
  const open = !!stato;
  const esistente = stato?.id ? trova(db.servizi, stato.id) : null;
  const vuoto = () => ({ nome: '', categoria: 'viso', durata: 30, prezzo: 0, iva: db.impostazioni.pagamenti.iva, descrizione: '', operatrici: [], cabinaId: '', online: true, attivo: true });
  const { f, set, salvo, ora } = useModulo({ open, esistente, vuoto, chiave: stato?.id, valido: v => v.nome.trim() && v.durata > 0, salva: v => cambia(d => Object.assign(trova(d.servizi, esistente.id), v)) });
  const [tocco, setTocco] = useState(false);
  const errore = !f.nome.trim() ? 'Scrivi il nome del servizio' : null;

  const crea = () => {
    setTocco(true);
    if (errore) return;
    const annulla = cambia(d => { d.servizi.push({ ...f, id: nuovoId('sv') }); });
    toast({ text: `Servizio creato · ${f.nome}`, tone: 'success', action: { label: 'Annulla', onClick: annulla } });
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose} title={esistente ? esistente.nome : 'Nuovo servizio'} subtitle={esistente ? 'Le modifiche valgono subito, anche per gli appuntamenti nuovi' : 'Nome, durata e prezzo bastano per iniziare'}
      headerActions={salvo ? <SaveStatus state={salvo} time={ora} errorLabel="Manca il nome: non salvo" /> : null}
      footer={esistente ? <div className="riga riga--fine"><Button onClick={onClose}>Chiudi</Button></div> : <div className="riga riga--fine"><Button variant="tertiary" onClick={onClose}>Annulla</Button><Button variant="primary" icon="plus" onClick={crea}>Crea servizio</Button></div>}>
      <div className="colonna colonna--larga">
        <Field label="Nome" error={(tocco || esistente) && errore ? errore : undefined}><TextInput value={f.nome} onValue={v => set({ nome: v })} autoFocus={!esistente} placeholder="Per esempio Pulizia viso" invalid={(tocco || !!esistente) && !!errore} /></Field>
        <div className="griglia-campi">
          <Field label="Categoria"><Select options={CATEGORIE.map(c => ({ value: c.value, label: c.label, icon: c.icon }))} value={f.categoria} onChange={v => set({ categoria: v })} /></Field>
          <Field label="Cabina di solito"><Select options={[{ value: '', label: 'Nessuna' }, ...db.cabine.map(c => ({ value: c.id, label: c.nome }))]} value={f.cabinaId || ''} onChange={v => set({ cabinaId: v })} /></Field>
          <Field label="Durata"><NumberInput value={f.durata} onChange={v => set({ durata: v })} min={5} max={480} step={5} unit="min" stepLabel="di 5 minuti" /></Field>
          <Field label="Prezzo"><MoneyInput key={`${open}-${f.id || 'nuovo'}`} defaultValue={perCampo(f.prezzo)} onChange={t => set({ prezzo: centesimi(t) })} /></Field>
        </div>
        <Field label="Chi lo fa" help="Lascia vuoto se lo fanno tutte."><MultiSelect options={db.operatrici.map(o => ({ value: o.id, label: `${o.nome} ${o.cognome}`, description: o.ruolo }))} value={f.operatrici} onChange={v => set({ operatrici: v })} placeholder="Tutte le operatrici" /></Field>
        <Field label="Descrizione" optional help="Si legge nella pagina di prenotazione."><Textarea value={f.descrizione} onValue={v => set({ descrizione: v })} rows={3} /></Field>
        <Switch checked={f.online} onChange={v => set({ online: v })} label="Prenotabile online" />
        <Switch checked={f.attivo} onChange={v => set({ attivo: v })} label="Nel listino" />
        {!f.attivo && <Alert tone="neutral" title="Servizio tolto dal listino">Non si prenota più, ma resta nello storico delle clienti e nei report.</Alert>}
      </div>
    </Drawer>
  );
}
