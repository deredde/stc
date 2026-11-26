// Lo staff: chi lavora, quando, cosa fa e quanto ha prodotto nel mese.
import { STC, useState, useMemo } from '../stc.js';
import { Euro, TagOperatrice } from '../parts/ui.jsx';
import { useModulo } from '../parts/modulo.js';
import { cambia, nuovoId } from '../data/store.js';
import { trova, report } from '../lib/dominio.js';
import { oggi, piuGiorni, GIORNI, GIORNI_BREVI } from '../lib/tempo.js';
import { euro } from '../lib/soldi.js';

const { PageHeader, PageBody, Table, Button, Menu, Badge, Avatar, CellPerson, EmptyState, Drawer, Field, TextInput, PhoneInput, NumberInput, MultiSelect, Switch, TimeRangePicker, ColorSwatches, SaveStatus, Alert, useToast } = STC;

const COLORI = [
  { value: 'viz-1', label: 'Fucsia', color: 'viz-1' },
  { value: 'viz-2', label: 'Grafite', color: 'viz-2' },
  { value: 'viz-3', label: 'Rosa', color: 'viz-3' },
  { value: 'viz-4', label: 'Grigio', color: 'viz-4' },
  { value: 'viz-5', label: 'Perla', color: 'viz-5' },
];

export const giorniLavoro = o => {
  const g = o.orari.map((x, i) => x.lavora ? i : -1).filter(i => i >= 0);
  if (!g.length) return 'Nessun giorno';
  const stessi = g.every(i => o.orari[i].dalle === o.orari[g[0]].dalle && o.orari[i].alle === o.orari[g[0]].alle);
  const consecutivi = g.every((v, i) => i === 0 || v === g[i - 1] + 1);
  const giorni = consecutivi && g.length > 2 ? `${GIORNI_BREVI[g[0]]}–${GIORNI_BREVI[g[g.length - 1]]}` : g.map(i => GIORNI_BREVI[i]).join(', ');
  return stessi ? `${giorni} · ${o.orari[g[0]].dalle}–${o.orari[g[0]].alle}` : `${giorni} · orari diversi`;
};

export function Staff({ db }) {
  const toast = useToast();
  const [aperto, setAperto] = useState(null);
  const t = oggi();
  const mese = t.slice(0, 8) + '01';
  const r = useMemo(() => report(db, mese, t), [db]);

  return (
    <>
      <PageHeader title="Staff" subtitle={`${db.operatrici.filter(o => o.attiva !== false).length} operatrici · numeri del mese in corso`} actions={<Button variant="primary" icon="user-plus" onClick={() => setAperto({})}>Nuova operatrice</Button>} />
      <PageBody>
        <Table label="Operatrici" rows={db.operatrici} rowKey={o => o.id} onRowClick={o => setAperto({ id: o.id })}
          columns={[
            { key: 'nome', label: 'Operatrice', width: 'minmax(0, 2fr)', render: o => <CellPerson avatar={<Avatar name={`${o.nome} ${o.cognome}`} size={32} />} name={`${o.nome} ${o.cognome}`} meta={o.ruolo} /> },
            { key: 'colore', label: 'In agenda', width: 'minmax(0, .9fr)', hideOnMobile: true, render: o => <TagOperatrice op={o} /> },
            { key: 'orari', label: 'Quando lavora', width: 'minmax(0, 1.8fr)', hideOnMobile: true, render: o => <span className="secondary">{giorniLavoro(o)}</span> },
            { key: 'oggi', label: 'Oggi', width: 'minmax(0, .7fr)', align: 'right', mono: true, hideOnMobile: true, render: o => db.appuntamenti.filter(a => a.data === t && a.operatriceId === o.id && a.stato !== 'annullato').length },
            { key: 'mese', label: 'Trattamenti del mese', width: 'minmax(0, 1fr)', align: 'right', mono: true, render: o => r.perOperatrice.get(o.id)?.servizi || 0 },
            { key: 'incasso', label: 'Incasso del mese', width: 'minmax(0, 1fr)', align: 'right', render: o => <Euro c={r.perOperatrice.get(o.id)?.valore || 0} /> },
            { key: 'prov', label: 'Provvigione', width: 'minmax(0, 1fr)', align: 'right', hideOnMobile: true, render: o => o.provvigione ? <span className="num">{euro(Math.round((r.perOperatrice.get(o.id)?.valore || 0) * o.provvigione / 100))}</span> : <span className="testo-tenue">—</span> },
            { key: 'stato', label: 'Stato', width: 'minmax(0, .9fr)', render: o => o.attiva !== false ? <Badge tone="success" size="sm">Attiva</Badge> : <Badge tone="neutral" size="sm">Non attiva</Badge> },
          ]}
          actions={o => <Menu items={[
            { id: 'modifica', label: 'Modifica orari e servizi', icon: 'pencil', onSelect: () => setAperto({ id: o.id }) },
            o.attiva !== false
              ? { id: 'spegni', label: 'Segna come non attiva', icon: 'user-x', separator: true, onSelect: () => { const a = cambia(d => { trova(d.operatrici, o.id).attiva = false; }); toast({ text: `Non attiva · ${o.nome}. Non compare più in agenda.`, action: { label: 'Annulla', onClick: a } }); } }
              : { id: 'accendi', label: 'Rimetti attiva', icon: 'user-check', separator: true, onSelect: () => { const a = cambia(d => { trova(d.operatrici, o.id).attiva = true; }); toast({ text: `Di nuovo attiva · ${o.nome}`, action: { label: 'Annulla', onClick: a } }); } },
          ]} />}
          empty={<EmptyState illustration="clients-first" title="Nessuna operatrice" action={<Button variant="primary" icon="user-plus" onClick={() => setAperto({})}>Aggiungi la prima</Button>}>Le operatrici sono le colonne dell'agenda.</EmptyState>} />
      </PageBody>
      <DrawerOperatrice db={db} stato={aperto} onClose={() => setAperto(null)} />
    </>
  );
}

function DrawerOperatrice({ db, stato, onClose }) {
  const toast = useToast();
  const open = !!stato;
  const esistente = stato?.id ? trova(db.operatrici, stato.id) : null;
  const vuoto = () => ({ nome: '', cognome: '', ruolo: 'Estetista', colore: 'viz-3', telefono: '', email: '', orari: Array.from({ length: 7 }, (_, i) => ({ lavora: i > 0 && i < 6, dalle: '09:00', alle: '18:00' })), provvigione: 0, attiva: true });
  const { f, set, salvo, ora } = useModulo({ open, esistente, vuoto, chiave: stato?.id, valido: v => v.nome.trim(), salva: v => cambia(d => Object.assign(trova(d.operatrici, esistente.id), v)) });
  const [tocco, setTocco] = useState(false);
  const servizi = esistente ? db.servizi.filter(s => s.operatrici?.includes(esistente.id)).map(s => s.id) : [];
  const errore = !f.nome.trim() ? 'Scrivi il nome' : null;

  const giorno = (i, patch) => set(x => ({ orari: x.orari.map((g, j) => j === i ? { ...g, ...patch } : g) }));
  const servizi$ = v => {
    if (!esistente) return;
    cambia(d => { for (const s of d.servizi) { const ha = s.operatrici?.includes(esistente.id); const vuole = v.includes(s.id); if (ha && !vuole) s.operatrici = s.operatrici.filter(x => x !== esistente.id); if (!ha && vuole) s.operatrici = [...(s.operatrici || []), esistente.id]; } });
    toast({ text: `Servizi aggiornati · ${esistente.nome}`, tone: 'success' });
  };
  const crea = () => {
    setTocco(true);
    if (errore) return;
    const annulla = cambia(d => { d.operatrici.push({ ...f, id: nuovoId('op') }); });
    toast({ text: `Operatrice aggiunta · ${f.nome}`, tone: 'success', action: { label: 'Annulla', onClick: annulla } });
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose} width={560} title={esistente ? `${esistente.nome} ${esistente.cognome}` : 'Nuova operatrice'} subtitle={esistente ? esistente.ruolo : 'Compare come colonna in agenda'}
      headerActions={salvo ? <SaveStatus state={salvo} time={ora} errorLabel="Manca il nome: non salvo" /> : null}
      footer={esistente ? <div className="riga riga--fine"><Button onClick={onClose}>Chiudi</Button></div> : <div className="riga riga--fine"><Button variant="tertiary" onClick={onClose}>Annulla</Button><Button variant="primary" icon="user-plus" onClick={crea}>Aggiungi operatrice</Button></div>}>
      <div className="colonna colonna--larga">
        <div className="griglia-campi">
          <Field label="Nome" error={(tocco || esistente) && errore ? errore : undefined}><TextInput value={f.nome} onValue={v => set({ nome: v })} invalid={(tocco || !!esistente) && !!errore} /></Field>
          <Field label="Cognome" optional><TextInput value={f.cognome} onValue={v => set({ cognome: v })} /></Field>
          <Field label="Ruolo"><TextInput value={f.ruolo} onValue={v => set({ ruolo: v })} /></Field>
          <Field label="Provvigione" help="Sull'incassato dei suoi trattamenti"><NumberInput value={f.provvigione} onChange={v => set({ provvigione: v })} min={0} max={100} unit="%" stepper={false} /></Field>
          <Field label="Telefono" optional><PhoneInput value={f.telefono} onChange={v => set({ telefono: v })} /></Field>
          <Field label="Email" optional><TextInput type="email" value={f.email} onValue={v => set({ email: v })} /></Field>
        </div>
        <ColorSwatches label="Colore in agenda" options={COLORI} value={f.colore} onChange={v => set({ colore: v })} />
        {esistente && <Field label="Servizi che fa" help="Si salva subito."><MultiSelect options={db.servizi.filter(s => s.attivo).map(s => ({ value: s.id, label: s.nome }))} value={servizi} onChange={servizi$} placeholder="Scegli i servizi" searchable /></Field>}
        <div className="colonna">
          <span className="overline">Quando lavora</span>
          {f.orari.map((g, i) => (
            <div key={i} className="riga riga--larga" style={{ flexWrap: 'nowrap' }}>
              <Switch checked={g.lavora} onChange={v => giorno(i, { lavora: v })} label={GIORNI[i]} />
              {g.lavora ? <TimeRangePicker size="card" value={{ from: g.dalle, to: g.alle }} onChange={v => v && giorno(i, { dalle: v.from, alle: v.to })} from={7} to={22} width={200} /> : <span className="secondary">Riposo</span>}
            </div>
          ))}
        </div>
        <Switch checked={f.attiva !== false} onChange={v => set({ attiva: v })} label="Attiva in agenda" />
        {f.attiva === false && <Alert tone="neutral" title="Non compare in agenda">Gli appuntamenti già fissati con lei restano: spostali su un'altra operatrice.</Alert>}
      </div>
    </Drawer>
  );
}
