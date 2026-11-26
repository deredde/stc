// Cassa: gli incassi del giorno (o del periodo), la chiusura e i rimborsi.
import { STC, useState, useMemo } from '../stc.js';
import { useAzioni, Euro, StatoVendita, CellaCliente, scarica, csv, Tabella } from '../parts/ui.jsx';
import { cambia } from '../data/store.js';
import { trova, nomeCliente, METODI, metodo as fMetodo, rimborsaVendita } from '../lib/dominio.js';
import { oggi, piuGiorni, inizioSettimana, data as fData } from '../lib/tempo.js';
import { euro } from '../lib/soldi.js';

const { PageHeader, PageBody, Table, Card, CardToolbar, Button, Menu, StatTile, DateRangePicker, FilterMenu, EmptyState, ConfirmDialog, Field, TextInput, Pagination, useToast } = STC;

export function Cassa({ db }) {
  const azioni = useAzioni();
  const toast = useToast();
  const t = oggi();
  const [periodo, setPeriodo] = useState({ from: t, to: t });
  const [metodi, setMetodi] = useState([]);
  const [rimborso, setRimborso] = useState(null);
  const [motivo, setMotivo] = useState('');
  const [pagina, setPagina] = useState(1);

  const vendite = useMemo(() => db.vendite
    .filter(v => v.data >= periodo.from && v.data <= periodo.to)
    .filter(v => !metodi.length || metodi.includes(v.metodo))
    .sort((a, b) => (b.data + b.ora).localeCompare(a.data + a.ora)), [db, periodo, metodi]);
  const pagate = vendite.filter(v => v.stato === 'pagata');
  const totale = pagate.reduce((s, v) => s + v.totale, 0);
  const perMetodo = METODI.map(m => ({ ...m, valore: pagate.filter(v => v.metodo === m.value).reduce((s, v) => s + v.totale, 0) }));
  const rimborsate = vendite.filter(v => v.stato === 'rimborsata');
  const r = rimborso ? trova(db.vendite, rimborso) : null;

  const presets = [
    { label: 'Oggi', range: { from: t, to: t } },
    { label: 'Ieri', range: { from: piuGiorni(t, -1), to: piuGiorni(t, -1) } },
    { label: 'Questa settimana', range: { from: inizioSettimana(t), to: t } },
    { label: 'Ultimi 30 giorni', range: { from: piuGiorni(t, -29), to: t } },
    { label: 'Questo mese', range: { from: t.slice(0, 8) + '01', to: t } },
  ];
  const giornoSolo = periodo.from === periodo.to;
  const titolo = giornoSolo ? (periodo.from === t ? 'oggi' : `il ${fData(periodo.from)}`) : `dal ${fData(periodo.from)} al ${fData(periodo.to)}`;

  const conferma = () => {
    const annulla = cambia(d => rimborsaVendita(d, r.id, motivo.trim(), oggi()));
    toast({ text: `Rimborso registrato · ${euro(r.totale)}${r.clienteId ? ` a ${nomeCliente(trova(db.clienti, r.clienteId))}` : ''}`, tone: 'success', action: { label: 'Annulla', onClick: annulla } });
    setRimborso(null); setMotivo('');
  };
  const esporta = () => {
    scarica(`cassa-${periodo.from}-${periodo.to}.csv`, csv([['Ricevuta', 'Data', 'Ora', 'Cliente', 'Cosa', 'Metodo', 'Sconto', 'Totale', 'Stato'], ...vendite.map(v => [v.numero, fData(v.data), v.ora, v.clienteId ? nomeCliente(trova(db.clienti, v.clienteId)) : 'Al banco', v.righe.map(x => `${x.qta}× ${x.nome}`).join(', '), fMetodo(v.metodo).label, euro(v.scontoCent || 0), euro(v.totale), v.stato])]));
    toast({ text: `Esportati ${vendite.length} movimenti`, tone: 'success' });
  };
  const chiusura = () => {
    const c = db.impostazioni.centro;
    const testo = [`Chiusura di cassa · ${c.nome}`, `Periodo: ${titolo}`, '', ...perMetodo.filter(m => m.valore).map(m => `${m.label}: ${euro(m.valore)}`), '', `Totale: ${euro(totale)}`, `Pagamenti: ${pagate.length}`, rimborsate.length ? `Rimborsi: ${rimborsate.length}` : ''].filter(x => x !== null).join('\n');
    scarica(`chiusura-${periodo.from}.txt`, testo, 'text/plain;charset=utf-8');
    toast({ text: 'Chiusura di cassa scaricata', tone: 'success' });
  };

  return (
    <>
      <PageHeader title="Cassa" subtitle={`${euro(totale)} incassati ${titolo} · ${pagate.length} pagamenti`}
        actions={<><Button icon="download" onClick={esporta} disabled={!vendite.length}>Esporta</Button><Button icon="file-check" onClick={chiusura} disabled={!pagate.length}>Chiusura di cassa</Button><Button variant="primary" icon="wallet" onClick={() => azioni.incassa()}>Incassa</Button></>} />
      <PageBody>
        <div className="griglia-4">
          <StatTile title="Totale" value={euro(totale)} icon="wallet" note={`${pagate.length} pagamenti${rimborsate.length ? ` · ${rimborsate.length} rimborsati` : ''}`} />
          {perMetodo.filter(m => db.impostazioni.pagamenti.metodi[m.value]).slice(0, 3).map(m => <StatTile key={m.value} title={m.label} value={euro(m.valore)} icon={m.icon} note={totale ? `${Math.round(m.valore / totale * 100)} % del totale` : 'Nessun incasso'} />)}
        </div>
        <Tabella label="Movimenti di cassa" rows={vendite.slice((pagina - 1) * 25, pagina * 25)} rowKey={v => v.id} onRowClick={v => azioni.apriRicevuta(v.id)}
          toolbar={<CardToolbar start={<DateRangePicker size="card" value={periodo} onChange={x => { if (x) { setPeriodo(x); setPagina(1); } }} presets={presets} today={t} label="Periodo" />} end={<FilterMenu size="card" label="Metodo" multiple value={metodi} onChange={setMetodi} options={[...METODI, { value: 'pacchetto', label: 'Pacchetto' }, { value: 'giftcard', label: 'Gift card' }].map(m => ({ value: m.value, label: m.label }))} />} />}
          columns={[
            { key: 'ora', label: giornoSolo ? 'Ora' : 'Quando', width: 'minmax(0, .9fr)', render: v => <span className="num">{giornoSolo ? v.ora : `${fData(v.data).slice(0, 5)} ${v.ora}`}</span> },
            { key: 'cliente', label: 'Cliente', width: 'minmax(0, 1.8fr)', render: v => v.clienteId ? <CellaCliente db={db} id={v.clienteId} meta={<span className="num">{v.numero}</span>} /> : <span className="testo-tenue">Al banco · <span className="num">{v.numero}</span></span> },
            { key: 'cosa', label: 'Cosa', width: 'minmax(0, 2.2fr)', hideOnMobile: true, render: v => <span className="secondary">{v.righe.map(x => (x.qta > 1 ? `${x.qta}× ` : '') + x.nome).join(', ')}</span> },
            { key: 'metodo', label: 'Metodo', width: 'minmax(0, .9fr)', hideOnMobile: true, render: v => fMetodo(v.metodo).label },
            { key: 'stato', label: 'Stato', width: 'minmax(0, 1fr)', hideOnMobile: true, render: v => <StatoVendita v={v} /> },
            { key: 'totale', label: 'Totale', width: 'minmax(0, .9fr)', align: 'right', render: v => <Euro c={v.totale} className={v.stato === 'rimborsata' ? 'testo-tenue' : ''} /> },
          ]}
          actions={v => <Menu items={[
            { id: 'ricevuta', label: 'Vedi la ricevuta', icon: 'receipt', onSelect: () => azioni.apriRicevuta(v.id) },
            v.clienteId && { id: 'cliente', label: 'Apri la scheda cliente', icon: 'id-card', onSelect: () => azioni.apriCliente(v.clienteId) },
            { id: 'rimborsa', label: 'Rimborsa', icon: 'undo-2', danger: true, separator: true, disabled: v.stato === 'rimborsata', onSelect: () => setRimborso(v.id) },
          ].filter(Boolean)} />}
          empty={<EmptyState illustration="period-empty" title={`Nessun incasso ${titolo}`} action={<Button icon="wallet" onClick={() => azioni.incassa()}>Incassa</Button>}>Gli incassi compaiono qui appena li registri, con la ricevuta.</EmptyState>}
          footer={vendite.length > 25 ? <Pagination page={pagina} pageSize={25} total={vendite.length} noun="movimenti" onChange={setPagina} /> : null} />
      </PageBody>
      <ConfirmDialog open={!!r} onClose={() => setRimborso(null)} onConfirm={conferma} danger icon="undo-2"
        title={r ? `Rimborsare ${euro(r.totale)}?` : ''} description="Il pagamento resta nello storico come rimborsato. I prodotti tornano in magazzino, le sedute tornano nel pacchetto e i punti si tolgono. I soldi li restituisci tu, con lo stesso metodo."
        confirmLabel="Registra il rimborso" cancelLabel="Non rimborsare">
        <Field label="Motivo" optional><TextInput value={motivo} onValue={setMotivo} placeholder="Per esempio: trattamento non riuscito" /></Field>
      </ConfirmDialog>
    </>
  );
}
