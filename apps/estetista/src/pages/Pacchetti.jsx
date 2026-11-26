// Pacchetti: quelli venduti alle clienti (con le sedute che restano) e il catalogo da vendere.
import { STC, useState, useMemo } from '../stc.js';
import { useAzioni, Euro, StatoPacchetto, CellaCliente, VuotoFiltri, contiene } from '../parts/ui.jsx';
import { useModulo } from '../parts/modulo.js';
import { cambia, nuovoId } from '../data/store.js';
import { trova, nomeCliente, statoPacchetto } from '../lib/dominio.js';
import { oggi, piuMesi, data as fData } from '../lib/tempo.js';
import { euro, centesimi, perCampo } from '../lib/soldi.js';

const { PageHeader, PageBody, Tabs, Table, Card, CardToolbar, SearchInput, FilterMenu, Button, Menu, Badge, EmptyState, SegmentedProgress, Drawer, Field, TextInput, Textarea, Select, MoneyInput, NumberInput, Switch, SaveStatus, Alert, StatTile, useToast } = STC;

const STATI_PC = [
  { value: 'attivo', label: 'Attivi', dot: 'success' },
  { value: 'ultima', label: 'Ultima seduta', dot: 'warning' },
  { value: 'scadenza', label: 'In scadenza', dot: 'warning' },
  { value: 'scaduto', label: 'Scaduti', dot: 'danger' },
  { value: 'esaurito', label: 'Esauriti', dot: 'neutral' },
];

export function Pacchetti({ db }) {
  const azioni = useAzioni();
  const toast = useToast();
  const [tab, setTab] = useState('venduti');
  const [q, setQ] = useState('');
  const [stati, setStati] = useState(['attivo', 'ultima', 'scadenza']);
  const [aperto, setAperto] = useState(null);
  const t = oggi();

  const venduti = useMemo(() => db.pacchettiClienti.map(p => ({ p, s: statoPacchetto(p, t) }))
    .filter(({ p }) => contiene(q, p.nome, nomeCliente(trova(db.clienti, p.clienteId))))
    .filter(({ s }) => !stati.length || stati.includes(s.codice))
    .sort((a, b) => a.p.scadenza.localeCompare(b.p.scadenza)), [db, q, stati]);

  const attivi = db.pacchettiClienti.filter(p => ['attivo', 'ultima', 'scadenza'].includes(statoPacchetto(p, t).codice));
  const sedute = attivi.reduce((s, p) => s + p.sedute - p.usate, 0);
  const valore = attivi.reduce((s, p) => s + Math.round((p.prezzo || 0) * (p.sedute - p.usate) / p.sedute), 0);

  const prolunga = p => {
    const annulla = cambia(d => { const x = trova(d.pacchettiClienti, p.id); x.scadenza = piuMesi(x.scadenza < t ? t : x.scadenza, 1); });
    toast({ text: `Scadenza spostata di un mese · ${nomeCliente(trova(db.clienti, p.clienteId))}`, tone: 'success', action: { label: 'Annulla', onClick: annulla } });
  };
  const seduta = (p, n) => {
    const annulla = cambia(d => { const x = trova(d.pacchettiClienti, p.id); x.usate = Math.max(0, Math.min(x.sedute, x.usate + n)); });
    toast({ text: n > 0 ? 'Seduta scalata a mano' : 'Seduta restituita', tone: 'success', action: { label: 'Annulla', onClick: annulla } });
  };

  return (
    <>
      <PageHeader title="Pacchetti" subtitle={`${attivi.length} pacchetti attivi · ${sedute} sedute ancora da fare`}
        actions={<><Button icon="plus" onClick={() => { setTab('catalogo'); setAperto({}); }}>Nuovo pacchetto</Button><Button variant="primary" icon="ticket" onClick={() => azioni.incassa({ tipo: 'pacchetto' })}>Vendi un pacchetto</Button></>}
        tabs={{ value: tab, onChange: setTab, items: [{ id: 'venduti', label: 'Venduti', count: attivi.length }, { id: 'catalogo', label: 'Catalogo' }] }} />
      <PageBody>
        {tab === 'venduti' ? (
          <>
            <div className="griglia-3">
              <StatTile title="Sedute da fare" value={String(sedute)} icon="calendar-clock" note="Sui pacchetti ancora validi" />
              <StatTile title="Valore ancora da godere" value={euro(valore)} icon="wallet" note="Già incassato, sedute non ancora fatte" />
              <StatTile title="In scadenza entro 30 giorni" value={String(db.pacchettiClienti.filter(p => statoPacchetto(p, t).codice === 'scadenza').length)} icon="clock" tone="warning" note="Ricordalo alle clienti" onClick={() => setStati(['scadenza'])} />
            </div>
            <Table label="Pacchetti venduti" rows={venduti} rowKey={r => r.p.id} onRowClick={r => azioni.apriCliente(r.p.clienteId)}
              toolbar={<CardToolbar start={<SearchInput size="card" value={q} onChange={setQ} placeholder="Cerca cliente o pacchetto" width={300} />} end={<FilterMenu size="card" label="Stato" multiple value={stati} onChange={setStati} options={STATI_PC.map(o => ({ ...o, count: db.pacchettiClienti.filter(p => statoPacchetto(p, t).codice === o.value).length }))} />} />}
              columns={[
                { key: 'cliente', label: 'Cliente', width: 'minmax(0, 1.8fr)', render: r => <CellaCliente db={db} id={r.p.clienteId} /> },
                { key: 'nome', label: 'Pacchetto', width: 'minmax(0, 1.8fr)', hideOnMobile: true, render: r => r.p.nome },
                { key: 'sedute', label: 'Sedute fatte', width: 'minmax(0, 1.5fr)', render: r => <SegmentedProgress value={r.p.usate} total={r.p.sedute} label={`${r.p.usate} di ${r.p.sedute}`} showValue /> },
                { key: 'scade', label: 'Scade', width: 'minmax(0, .9fr)', align: 'right', render: r => <span className="num">{fData(r.p.scadenza)}</span> },
                { key: 'stato', label: 'Stato', width: 'minmax(0, 1.1fr)', render: r => <StatoPacchetto pc={r.p} /> },
              ]}
              actions={r => <Menu items={[
                { id: 'prenota', label: 'Prenota una seduta', icon: 'calendar-plus', disabled: r.s.codice === 'esaurito', onSelect: () => azioni.nuovoAppuntamento({ clienteId: r.p.clienteId, servizioId: r.p.servizioId }) },
                { id: 'prolunga', label: 'Sposta la scadenza di un mese', icon: 'calendar-range', onSelect: () => prolunga(r.p) },
                { id: 'scala', label: 'Scala una seduta a mano', icon: 'minus', disabled: r.p.usate >= r.p.sedute, onSelect: () => seduta(r.p, 1) },
                { id: 'rendi', label: 'Restituisci una seduta', icon: 'plus', disabled: r.p.usate <= 0, onSelect: () => seduta(r.p, -1) },
              ]} />}
              empty={db.pacchettiClienti.length === 0
                ? <EmptyState illustration="orders-first" title="Nessun pacchetto venduto ancora" action={<Button variant="primary" icon="ticket" onClick={() => azioni.incassa({ tipo: 'pacchetto' })}>Vendi il primo</Button>}>Quando vendi un pacchetto dalla cassa, compare qui con le sedute che restano.</EmptyState>
                : <VuotoFiltri onAzzera={() => { setStati([]); setQ(''); }} cosa="pacchetto" />} />
          </>
        ) : (
          <Table label="Catalogo dei pacchetti" rows={db.pacchetti} rowKey={p => p.id} onRowClick={p => setAperto({ id: p.id })}
            columns={[
              { key: 'nome', label: 'Pacchetto', width: 'minmax(0, 2.2fr)', render: p => <div className="colonna" style={{ gap: 2 }}><span className="forte">{p.nome}</span>{p.descrizione && <span className="caption">{p.descrizione}</span>}</div> },
              { key: 'servizio', label: 'Servizio', width: 'minmax(0, 1.6fr)', hideOnMobile: true, render: p => trova(db.servizi, p.servizioId)?.nome || 'Servizio tolto' },
              { key: 'sedute', label: 'Sedute', width: 'minmax(0, .7fr)', align: 'right', mono: true, render: p => p.sedute },
              { key: 'validita', label: 'Validità', width: 'minmax(0, .9fr)', align: 'right', hideOnMobile: true, render: p => <span className="num">{p.validitaMesi} mesi</span> },
              { key: 'risparmio', label: 'Risparmio', width: 'minmax(0, 1fr)', align: 'right', hideOnMobile: true, render: p => { const s = trova(db.servizi, p.servizioId); const r = s ? s.prezzo * p.sedute - p.prezzo : 0; return r > 0 ? <span className="num sconto">−{euro(r).replace('€ ', '€ ')}</span> : <span className="testo-tenue">—</span>; } },
              { key: 'prezzo', label: 'Prezzo', width: 'minmax(0, .9fr)', align: 'right', render: p => <Euro c={p.prezzo} /> },
              { key: 'stato', label: 'Stato', width: 'minmax(0, .9fr)', render: p => p.attivo ? <Badge tone="success" size="sm">In vendita</Badge> : <Badge tone="neutral" size="sm" icon="eye-off">Tolto</Badge> },
            ]}
            empty={<EmptyState illustration="item-not-found" title="Nessun pacchetto nel catalogo" action={<Button variant="primary" icon="plus" onClick={() => setAperto({})}>Crea il primo pacchetto</Button>}>Un pacchetto è un numero di sedute di un servizio a un prezzo bloccato.</EmptyState>} />
        )}
      </PageBody>
      <DrawerPacchetto db={db} stato={aperto} onClose={() => setAperto(null)} />
    </>
  );
}

function DrawerPacchetto({ db, stato, onClose }) {
  const toast = useToast();
  const open = !!stato;
  const esistente = stato?.id ? trova(db.pacchetti, stato.id) : null;
  const vuoto = () => ({ nome: '', servizioId: db.servizi[0]?.id || '', sedute: 5, prezzo: 0, validitaMesi: 6, descrizione: '', attivo: true });
  const { f, set, salvo, ora } = useModulo({ open, esistente, vuoto, chiave: stato?.id, valido: v => v.nome.trim() && v.servizioId, salva: v => cambia(d => Object.assign(trova(d.pacchetti, esistente.id), v)) });
  const [tocco, setTocco] = useState(false);
  const s = trova(db.servizi, f.servizioId);
  const pieno = s ? s.prezzo * f.sedute : 0;
  const errore = !f.nome.trim() ? 'Scrivi il nome del pacchetto' : null;

  const crea = () => {
    setTocco(true);
    if (errore) return;
    const annulla = cambia(d => { d.pacchetti.push({ ...f, id: nuovoId('pk') }); });
    toast({ text: `Pacchetto creato · ${f.nome}`, tone: 'success', action: { label: 'Annulla', onClick: annulla } });
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose} title={esistente ? esistente.nome : 'Nuovo pacchetto'} subtitle="Sedute di un servizio a prezzo bloccato"
      headerActions={salvo ? <SaveStatus state={salvo} time={ora} errorLabel="Manca il nome: non salvo" /> : null}
      footer={esistente ? <div className="riga riga--fine"><Button onClick={onClose}>Chiudi</Button></div> : <div className="riga riga--fine"><Button variant="tertiary" onClick={onClose}>Annulla</Button><Button variant="primary" icon="plus" onClick={crea}>Crea pacchetto</Button></div>}>
      <div className="colonna colonna--larga">
        <Field label="Nome" error={(tocco || esistente) && errore ? errore : undefined}><TextInput value={f.nome} onValue={v => set({ nome: v })} placeholder="Per esempio Pressoterapia · 10 sedute" invalid={(tocco || !!esistente) && !!errore} /></Field>
        <Field label="Servizio"><Select options={db.servizi.filter(x => x.attivo).map(x => ({ value: x.id, label: x.nome, description: euro(x.prezzo) }))} value={f.servizioId} onChange={v => set({ servizioId: v })} searchable /></Field>
        <div className="griglia-campi">
          <Field label="Sedute"><NumberInput value={f.sedute} onChange={v => set({ sedute: v })} min={2} max={50} /></Field>
          <Field label="Valido per"><NumberInput value={f.validitaMesi} onChange={v => set({ validitaMesi: v })} min={1} max={36} unit="mesi" /></Field>
          <Field label="Prezzo del pacchetto" className="span-2" help={pieno ? `Le sedute singole costerebbero ${euro(pieno)}${f.prezzo && f.prezzo < pieno ? `: la cliente risparmia ${euro(pieno - f.prezzo)}` : ''}.` : undefined}>
            <MoneyInput key={`${open}-${f.id || 'nuovo'}`} defaultValue={perCampo(f.prezzo)} onChange={t => set({ prezzo: centesimi(t) })} />
          </Field>
        </div>
        <Field label="Descrizione" optional><Textarea value={f.descrizione} onValue={v => set({ descrizione: v })} rows={3} /></Field>
        <Switch checked={f.attivo} onChange={v => set({ attivo: v })} label="In vendita" />
        {esistente && <Alert tone="info" title="I pacchetti già venduti non cambiano">Sedute, prezzo e scadenza restano quelli del giorno della vendita.</Alert>}
      </div>
    </Drawer>
  );
}
