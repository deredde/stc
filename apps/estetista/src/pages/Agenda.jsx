// Agenda: il giorno per operatrice, la settimana, o la lista. Su telefono la striscia dei giorni (pattern Calendario).
import { STC, useState, useMemo } from '../stc.js';
import { useAzioni, StatoAppuntamento, TagOperatrice, CellaCliente, Euro, useTelefono, contiene, Tabella } from '../parts/ui.jsx';
import { useRotta, vai } from '../router.js';
import { trova, nomeCliente, fine, ATTIVI, STATI, motivoChiusura, turno } from '../lib/dominio.js';
import { oggi, piuGiorni, inizioSettimana, giornoSett, minuti, adessoOra, daIso, GIORNI_BREVI, MESI, dataLunga, data as fData } from '../lib/tempo.js';

const { PageHeader, PageBody, Card, WeekCalendar, Segmented, Button, IconButton, FilterMenu, DayStrip, List, ListRow, EmptyState, Table, Badge, SearchInput, Alert, Pagination } = STC;

/** Corsie per gli eventi che si sovrappongono nella stessa colonna. */
export function corsie(eventi) {
  const perCol = new Map();
  for (const e of eventi) { if (!perCol.has(e.day)) perCol.set(e.day, []); perCol.get(e.day).push(e); }
  for (const lista of perCol.values()) {
    lista.sort((a, b) => a.start.localeCompare(b.start));
    let gruppo = [], fineGruppo = -1;
    const chiudi = () => { const n = Math.max(...gruppo.map(e => e.lane + 1)); gruppo.forEach(e => { e.lanes = n; }); };
    for (const e of lista) {
      const s = minuti(e.start), f = minuti(e.end);
      if (gruppo.length && s >= fineGruppo) { chiudi(); gruppo = []; fineGruppo = -1; }
      const occupate = new Set(gruppo.filter(g => minuti(g.end) > s).map(g => g.lane));
      let l = 0; while (occupate.has(l)) l++;
      e.lane = l; gruppo.push(e); fineGruppo = Math.max(fineGruppo, f);
    }
    if (gruppo.length) chiudi();
  }
  for (const e of eventi) if (e.lanes === 1) { delete e.lane; delete e.lanes; }
  return eventi;
}

function evento(db, a, day, t, adesso) {
  const cli = trova(db.clienti, a.clienteId), s = trova(db.servizi, a.servizioId), op = trova(db.operatrici, a.operatriceId);
  let status = 'default';
  if (a.stato === 'annullato' || a.stato === 'assente') status = 'cancelled';
  else if (a.stato === 'arrivato' || (a.data === t && ATTIVI.includes(a.stato) && minuti(a.inizio) <= adesso && minuti(fine(a)) > adesso)) status = 'live';
  else if (a.stato === 'completato' || a.data < t || (a.data === t && minuti(fine(a)) <= adesso)) status = 'past';
  const note = a.origine === 'online' && a.stato === 'prenotato' ? { text: 'Da confermare', tone: 'info' } : a.stato === 'assente' ? { text: 'Non presentata', tone: 'danger' } : (cli?.scheda?.allergie ? { text: `Allergia: ${cli.scheda.allergie}`, tone: 'danger' } : undefined);
  return { id: a.id, day, start: a.inizio, end: fine(a), title: nomeCliente(cli), subtitle: `${s?.nome || ''}${op ? ' · ' + op.nome : ''}`, status, note };
}

export function Agenda({ db }) {
  const azioni = useAzioni();
  const rotta = useRotta();
  const telefono = useTelefono(900);
  const t = oggi();
  const [giorno, setGiorno] = useState(rotta.query.giorno || t);
  const [vista, setVista] = useState(rotta.query.vista || 'giorno');
  const [ops, setOps] = useState([]);
  const [stati, setStati] = useState([]);
  const [q, setQ] = useState('');
  const [pagina, setPagina] = useState(1);
  const adesso = minuti(adessoOra());
  const { agenda } = db.impostazioni;

  const operatrici = db.operatrici.filter(o => o.attiva !== false && (!ops.length || ops.includes(o.id)));
  const lunedi = inizioSettimana(giorno);
  const sposta = n => setGiorno(g => piuGiorni(g, vista === 'giorno' || telefono ? n : n * 7));
  const filtra = a => (!ops.length || ops.includes(a.operatriceId)) && (!stati.length || stati.includes(a.stato));

  const periodo = vista === 'giorno' || telefono
    ? dataLunga(giorno).replace(/^./, s => s.toUpperCase())
    : (() => { const a = daIso(lunedi), b = daIso(piuGiorni(lunedi, 6)); return a.getMonth() === b.getMonth() ? `${a.getDate()}–${b.getDate()} ${MESI[b.getMonth()]} ${b.getFullYear()}` : `${a.getDate()} ${MESI[a.getMonth()].slice(0, 3)} – ${b.getDate()} ${MESI[b.getMonth()].slice(0, 3)} ${b.getFullYear()}`; })();

  const giornoVista = useMemo(() => {
    const chiuso = motivoChiusura(db.impostazioni, giorno);
    const days = operatrici.map(o => ({ label: o.nome, num: turno(db, o, giorno) ? `${turno(db, o, giorno).dalle}–${turno(db, o, giorno).alle}` : 'Non lavora', today: false, closed: !!chiuso || !turno(db, o, giorno) }));
    const events = db.appuntamenti.filter(a => a.data === giorno && filtra(a)).map(a => {
      const i = operatrici.findIndex(o => o.id === a.operatriceId);
      return i < 0 ? null : evento(db, a, i, t, adesso);
    }).filter(Boolean);
    return { days, events: corsie(events), chiuso };
  }, [db, giorno, ops, stati]);

  const settimanaVista = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => { const d = piuGiorni(lunedi, i); return { label: GIORNI_BREVI[i], num: daIso(d).getDate(), today: d === t, closed: !!motivoChiusura(db.impostazioni, d) }; });
    const events = db.appuntamenti.filter(a => a.data >= lunedi && a.data <= piuGiorni(lunedi, 6) && filtra(a)).map(a => evento(db, a, giornoSett(a.data), t, adesso));
    return { days, events: corsie(events) };
  }, [db, lunedi, ops, stati]);

  const lista = useMemo(() => db.appuntamenti
    .filter(a => a.data >= lunedi && a.data <= piuGiorni(lunedi, 6) && filtra(a))
    .filter(a => { const c = trova(db.clienti, a.clienteId); return contiene(q, c?.nome, c?.cognome, trova(db.servizi, a.servizioId)?.nome); })
    .sort((a, b) => (a.data + a.inizio).localeCompare(b.data + b.inizio)), [db, lunedi, ops, stati, q]);

  const delGiorno = db.appuntamenti.filter(a => a.data === giorno && filtra(a)).sort((a, b) => a.inizio.localeCompare(b.inizio));
  const conti = Object.fromEntries(Object.keys(STATI).map(k => [k, db.appuntamenti.filter(a => a.data >= lunedi && a.data <= piuGiorni(lunedi, 6) && a.stato === k).length]));
  const daConfermare = db.appuntamenti.filter(a => a.origine === 'online' && a.stato === 'prenotato' && a.data >= t).length;

  const barra = (
    <div className="agenda-barra">
      <IconButton icon="chevron-left" label={vista === 'giorno' ? 'Giorno prima' : 'Settimana prima'} variant="outline" size="card" onClick={() => sposta(-1)} />
      <IconButton icon="chevron-right" label={vista === 'giorno' ? 'Giorno dopo' : 'Settimana dopo'} variant="outline" size="card" onClick={() => sposta(1)} />
      <Button size="card" onClick={() => setGiorno(t)} disabled={giorno === t}>Oggi</Button>
      <span className="agenda-periodo">{periodo}</span>
      <span className="agenda-spazio" />
      <FilterMenu label="Operatrice" multiple size="card" value={ops} onChange={setOps} options={db.operatrici.filter(o => o.attiva !== false).map(o => ({ value: o.id, label: `${o.nome} ${o.cognome}` }))} />
      <FilterMenu label="Stato" multiple size="card" value={stati} onChange={setStati} options={Object.entries(STATI).map(([k, s]) => ({ value: k, label: s.label, count: conti[k], dot: s.tone === 'neutral' ? 'neutral' : s.tone }))} />
      {!telefono && <Segmented size="card" value={vista} onChange={setVista} label="Vista" options={[{ value: 'giorno', label: 'Giorno' }, { value: 'settimana', label: 'Settimana' }, { value: 'lista', label: 'Lista' }]} />}
    </div>
  );

  const apriVuoto = () => azioni.nuovoAppuntamento({ data: giorno });

  return (
    <>
      <PageHeader title="Agenda" subtitle={`${db.appuntamenti.filter(a => a.data === giorno && a.stato !== 'annullato').length} appuntamenti il ${fData(giorno)}${daConfermare ? ` · ${daConfermare} online da confermare` : ''}`}
        actions={<Button variant="primary" icon="calendar-plus" onClick={apriVuoto}>Nuovo appuntamento</Button>} />
      <PageBody>
        {telefono ? (
          <Card>
            <div className="colonna">
              {barra}
              <DayStrip value={giorno} onChange={setGiorno} today={t} label="Giorni della settimana"
                days={Array.from({ length: 7 }, (_, i) => { const d = piuGiorni(lunedi, i); const quanti = db.appuntamenti.filter(a => a.data === d && ATTIVI.includes(a.stato)).length; return { id: d, label: GIORNI_BREVI[i], day: daIso(d).getDate(), dot: quanti > 0, full: quanti > 12 }; })} />
              {motivoChiusura(db.impostazioni, giorno) && <Alert tone="neutral" icon="store" title={motivoChiusura(db.impostazioni, giorno)}>Il centro è chiuso: non si prenota.</Alert>}
              {delGiorno.length === 0
                ? <EmptyState illustration="today-empty" title="Nessun appuntamento in questo giorno" action={<Button icon="calendar-plus" onClick={apriVuoto}>Fissa un appuntamento</Button>}>Gli appuntamenti del giorno compaiono qui.</EmptyState>
                : <List label="Appuntamenti del giorno">{delGiorno.map(a => <ListRow key={a.id} onClick={() => azioni.apriAppuntamento(a.id)} leading={<span className="num">{a.inizio}</span>} title={nomeCliente(trova(db.clienti, a.clienteId))} meta={`${trova(db.servizi, a.servizioId)?.nome} · ${trova(db.operatrici, a.operatriceId)?.nome || ''}`} trailing={<StatoAppuntamento stato={a.stato} />} />)}</List>}
            </div>
          </Card>
        ) : vista === 'lista' ? (
          <Tabella label="Appuntamenti della settimana" rows={lista.slice((pagina - 1) * 25, pagina * 25)} rowKey={a => a.id} onRowClick={a => azioni.apriAppuntamento(a.id)}
            toolbar={<div className="colonna" style={{ width: '100%' }}>{barra}<SearchInput size="card" value={q} onChange={v => { setQ(v); setPagina(1); }} placeholder="Cerca cliente o servizio" width={320} /></div>}
            columns={[
              { key: 'quando', label: 'Quando', width: 'minmax(0, 1.1fr)', render: a => <span className="num">{fData(a.data).slice(0, 5)} · {a.inizio}</span> },
              { key: 'cliente', label: 'Cliente', width: 'minmax(0, 2fr)', render: a => <CellaCliente db={db} id={a.clienteId} /> },
              { key: 'servizio', label: 'Servizio', width: 'minmax(0, 1.8fr)', hideOnMobile: true, render: a => trova(db.servizi, a.servizioId)?.nome },
              { key: 'op', label: 'Operatrice', width: 'minmax(0, 1fr)', hideOnMobile: true, render: a => <TagOperatrice op={trova(db.operatrici, a.operatriceId)} /> },
              { key: 'stato', label: 'Stato', width: 'minmax(0, 1.2fr)', render: a => <StatoAppuntamento stato={a.stato} /> },
              { key: 'prezzo', label: 'Prezzo', width: 'minmax(0, .8fr)', align: 'right', hideOnMobile: true, render: a => a.pacchettoClienteId ? <span className="secondary">Pacchetto</span> : <Euro c={a.prezzo} /> },
            ]}
            empty={<EmptyState illustration="period-empty" title="Nessun appuntamento in questa settimana" action={<Button icon="calendar-plus" onClick={apriVuoto}>Fissa un appuntamento</Button>}>Cambia settimana o togli i filtri.</EmptyState>}
            footer={lista.length > 25 ? <Pagination page={pagina} pageSize={25} total={lista.length} noun="appuntamenti" onChange={setPagina} /> : null} />
        ) : (
          <Card padding="sm">
            <div className="colonna">
              {barra}
              {vista === 'giorno' && giornoVista.chiuso && <Alert tone="neutral" icon="store" title={giornoVista.chiuso}>Il centro è chiuso questo giorno: non si prenota.</Alert>}
              {vista === 'giorno' && operatrici.length === 0
                ? <EmptyState title="Nessuna operatrice scelta" action={<Button onClick={() => setOps([])}>Mostra tutte</Button>}>Togli il filtro per vedere le colonne.</EmptyState>
                : <WeekCalendar label={vista === 'giorno' ? `Agenda del ${fData(giorno)} per operatrice` : 'Agenda della settimana'}
                  days={vista === 'giorno' ? giornoVista.days : settimanaVista.days} events={vista === 'giorno' ? giornoVista.events : settimanaVista.events}
                  from={agenda.dalle} to={agenda.alle} hourHeight={vista === 'giorno' ? 64 : 52}
                  now={vista === 'settimana' && t >= lunedi && t <= piuGiorni(lunedi, 6) ? { day: giornoSett(t), time: adessoOra() } : undefined}
                  onEventClick={e => azioni.apriAppuntamento(e.id)} />}
            </div>
          </Card>
        )}
      </PageBody>
    </>
  );
}
