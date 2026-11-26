// Elenco delle clienti (pattern Elenco): ricerca, filtri, tabella, selezione.
import { STC, useState, useMemo } from '../stc.js';
import { useAzioni, Euro, CellaCliente, VuotoFiltri, contiene, scarica, csv, telefono, Tabella } from '../parts/ui.jsx';
import { nomeCliente, numeriCliente, segnaliCliente, linkWhatsApp } from '../lib/dominio.js';
import { data as fData, oggi } from '../lib/tempo.js';
import { euro } from '../lib/soldi.js';
import { FONTI } from '../parts/DrawerCliente.jsx';

const { ListPage, Table, Button, IconButton, FilterMenu, Chip, Badge, Menu, Pagination, EmptyState, SelectionBar, Tooltip, useToast } = STC;

const SEGNALI = [
  { value: 'nuova', label: 'Nuove', dot: 'info' },
  { value: 'abituale', label: 'Abituali', dot: 'success' },
  { value: 'richiamare', label: 'Da richiamare', dot: 'warning' },
  { value: 'assenze', label: 'Con assenze', dot: 'danger' },
  { value: 'pacchetto', label: 'Con un pacchetto attivo', dot: 'neutral' },
];

export function Clienti({ db }) {
  const azioni = useAzioni();
  const toast = useToast();
  const [q, setQ] = useState('');
  const [segnali, setSegnali] = useState([]);
  const [fonte, setFonte] = useState('');
  const [etichetta, setEtichetta] = useState('');
  const [sort, setSort] = useState({ key: 'nome', dir: 'asc' });
  const [pagina, setPagina] = useState(1);
  const [scelte, setScelte] = useState([]);
  const PER = 20;

  const righe = useMemo(() => db.clienti.map(c => {
    const n = numeriCliente(db, c.id);
    const s = segnaliCliente(db, c);
    if (n.pacchetti.length) s.push({ codice: 'pacchetto', tone: 'neutral', label: 'Pacchetto' });
    return { c, n, s };
  }), [db]);
  const etichette = useMemo(() => [...new Set(db.clienti.flatMap(c => c.tag || []))].sort(), [db.clienti]);

  const filtrate = righe
    .filter(({ c }) => contiene(q, c.nome, c.cognome, c.telefono, c.email, (c.tag || []).join(' ')))
    .filter(({ s }) => !segnali.length || segnali.some(v => s.some(x => x.codice === v)))
    .filter(({ c }) => !fonte || c.fonte === fonte)
    .filter(({ c }) => !etichetta || (c.tag || []).includes(etichetta));
  const dir = sort.dir === 'asc' ? 1 : -1;
  const chiave = { nome: r => nomeCliente(r.c).toLowerCase(), ultima: r => r.n.ultima || '', visite: r => r.n.visite, speso: r => r.n.speso, punti: r => r.c.punti || 0 }[sort.key] || (r => 0);
  filtrate.sort((a, b) => (chiave(a) > chiave(b) ? 1 : chiave(a) < chiave(b) ? -1 : 0) * dir);
  const visibili = filtrate.slice((pagina - 1) * PER, pagina * PER);
  const filtri = segnali.length + (fonte ? 1 : 0) + (etichetta ? 1 : 0);
  const azzera = () => { setSegnali([]); setFonte(''); setEtichetta(''); setQ(''); setPagina(1); };
  const daSeguire = righe.filter(r => r.s.some(x => x.codice === 'richiamare')).length;

  const esporta = lista => {
    scarica(`clienti-${oggi()}.csv`, csv([['Nome', 'Cognome', 'Telefono', 'Email', 'Nascita', 'Cliente dal', 'Visite', 'Ultima visita', 'Speso', 'Punti', 'Consenso offerte'], ...lista.map(({ c, n }) => [c.nome, c.cognome, c.telefono, c.email, fData(c.nascita), fData(c.creato), n.visite, fData(n.ultima), euro(n.speso), c.punti || 0, c.consensoMarketing ? 'sì' : 'no'])]));
    toast({ text: `Esportate ${lista.length} clienti`, tone: 'success' });
  };

  return (
    <ListPage
      header={{ title: 'Clienti', subtitle: `${db.clienti.length} clienti · ${daSeguire} da richiamare`, actions: <><Button icon="download" onClick={() => esporta(filtrate)}>Esporta</Button><Button variant="primary" icon="user-plus" onClick={() => azioni.nuovoCliente()}>Nuova cliente</Button></> }}
      search={{ value: q, onChange: v => { setQ(v); setPagina(1); }, placeholder: 'Cerca per nome, telefono o email' }}
      filters={<>
        <FilterMenu label="Segnali" multiple value={segnali} onChange={v => { setSegnali(v); setPagina(1); }} options={SEGNALI.map(o => ({ ...o, count: righe.filter(r => r.s.some(x => x.codice === o.value)).length }))} />
        <FilterMenu label="Come ci ha conosciuto" value={fonte} onChange={v => { setFonte(v); setPagina(1); }} options={FONTI.map(o => ({ ...o, count: db.clienti.filter(c => c.fonte === o.value).length }))} />
        {etichette.length > 0 && <FilterMenu label="Etichetta" value={etichetta} onChange={v => { setEtichetta(v); setPagina(1); }} options={etichette.map(e => ({ value: e, label: e, count: db.clienti.filter(c => (c.tag || []).includes(e)).length }))} />}
      </>}
      chips={filtri ? <>
        {segnali.length > 0 && <Chip prefix="Segnali" onRemove={() => setSegnali([])}>{segnali.length === 1 ? SEGNALI.find(s => s.value === segnali[0]).label : `${segnali.length} scelti`}</Chip>}
        {fonte && <Chip prefix="Fonte" onRemove={() => setFonte('')}>{fonte}</Chip>}
        {etichetta && <Chip prefix="Etichetta" onRemove={() => setEtichetta('')}>{etichetta}</Chip>}
      </> : null}
      onClearFilters={filtri ? azzera : undefined}
      count={filtri || q ? `${filtrate.length} clienti` : undefined}>
      {scelte.length > 0 && (
        <SelectionBar count={scelte.length} noun={scelte.length === 1 ? 'cliente scelta' : 'clienti scelte'} onClear={() => setScelte([])}>
          <Button size="card" icon="download" onClick={() => esporta(righe.filter(r => scelte.includes(r.c.id)))}>Esporta</Button>
        </SelectionBar>
      )}
      <Tabella label="Clienti" rows={visibili} rowKey={r => r.c.id} onRowClick={r => azioni.apriCliente(r.c.id)}
        selectable selected={scelte} onSelect={setScelte} sort={sort} onSort={s => { setSort(s); setPagina(1); }}
        columns={[
          { key: 'nome', label: 'Cliente', width: 'minmax(0, 2.2fr)', sortable: true, render: r => <CellaCliente db={db} id={r.c.id} /> },
          { key: 'segnali', hideOnMobile: true, label: 'Segnali', width: 'minmax(0, 1.6fr)', render: r => <div className="riga">{r.s.slice(0, 2).map(s => <Badge key={s.codice} tone={s.tone} size="sm">{s.label}</Badge>)}{(r.c.tag || []).includes('VIP') && <Badge tone="accent" size="sm" icon="star">VIP</Badge>}</div> },
          { key: 'ultima', label: 'Ultima visita', width: 'minmax(0, 1fr)', align: 'right', sortable: true, hideOnMobile: true, render: r => r.n.ultima ? <span className="num">{fData(r.n.ultima)}</span> : <span className="testo-tenue">Mai</span> },
          { key: 'visite', label: 'Visite', width: 'minmax(0, .7fr)', align: 'right', sortable: true, hideOnMobile: true, mono: true, render: r => r.n.visite },
          { key: 'speso', label: 'Speso', width: 'minmax(0, 1fr)', align: 'right', sortable: true, hideOnMobile: true, render: r => <Euro c={r.n.speso} /> },
          { key: 'punti', label: 'Punti', width: 'minmax(0, .7fr)', align: 'right', sortable: true, hideOnMobile: true, mono: true, render: r => r.c.punti || 0 },
        ]}
        actions={r => <div className="riga">
          <IconButton icon="calendar-plus" label={`Nuovo appuntamento per ${nomeCliente(r.c)}`} size="row" onClick={() => azioni.nuovoAppuntamento({ clienteId: r.c.id })} />
          <Menu items={[
            { id: 'apri', label: 'Apri la scheda', icon: 'id-card', onSelect: () => azioni.apriCliente(r.c.id) },
            { id: 'wa', label: 'Scrivi su WhatsApp', icon: 'message-circle', disabled: !r.c.telefono, onSelect: () => window.open(linkWhatsApp(r.c.telefono, `Ciao ${r.c.nome}, `), '_blank', 'noopener') },
            { id: 'incassa', label: 'Incassa', icon: 'wallet', onSelect: () => azioni.incassa({ clienteId: r.c.id }) },
            { id: 'modifica', label: 'Modifica', icon: 'pencil', onSelect: () => azioni.modificaCliente(r.c.id) },
          ]} />
        </div>}
        actionsWidth={88}
        empty={db.clienti.length === 0
          ? <EmptyState illustration="clients-first" title="Nessuna cliente ancora" action={<Button variant="primary" icon="user-plus" onClick={() => azioni.nuovoCliente()}>Crea la prima cliente</Button>}>Le clienti che crei, o che prenotano online, compaiono qui.</EmptyState>
          : q && !filtri ? <EmptyState illustration="search-empty" title={`Nessuna cliente per «${q}»`} action={<Button icon="user-plus" onClick={() => { const [nome, ...r] = q.trim().split(/\s+/); azioni.nuovoCliente({ nome, cognome: r.join(' ') }); }}>Crea «{q}» come nuova cliente</Button>}>Controlla come è scritto o cerca per telefono.</EmptyState>
          : <VuotoFiltri onAzzera={azzera} cosa="cliente" />}
        footer={filtrate.length > PER ? <Pagination page={pagina} pageSize={PER} total={filtrate.length} noun="clienti" onChange={setPagina} /> : null} />
    </ListPage>
  );
}
