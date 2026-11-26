// Scheda della cliente (pattern Scheda di dettaglio).
import { STC, useState, useMemo } from '../stc.js';
import { useAzioni, Euro, StatoAppuntamento, StatoPacchetto, StatoVendita, TagOperatrice, telefono, Tabella } from '../parts/ui.jsx';
import { cambia, nuovoId } from '../data/store.js';
import { vai } from '../router.js';
import { trova, nomeCliente, numeriCliente, segnaliCliente, fine, linkWhatsApp, metodo as fMetodo, ATTIVI, STATI } from '../lib/dominio.js';
import { oggi, data as fData, eta, MESI, daIso, adessoOra } from '../lib/tempo.js';
import { euro } from '../lib/soldi.js';

const { DetailPage, StatePage, Avatar, Badge, Button, IconButton, Menu, Card, KeyValue, StatTile, Alert, TextLink, List, ListRow, EmptyState, Table, Timeline, SegmentedProgress, BarList, Field, TextInput, Textarea, Select, ConfirmDialog, Tag, useToast } = STC;

export function Cliente({ db, rotta }) {
  const c = trova(db.clienti, rotta.id);
  if (!c) return <StatePage kind="notfound" title="Questa cliente non c'è più" text="Forse è stata cancellata. La trovi nell'elenco se c'è ancora." action={<Button icon="arrow-left" onClick={() => vai('clienti')}>Torna a Clienti</Button>} />;
  return <Scheda db={db} c={c} key={c.id} />;
}

function Scheda({ db, c }) {
  const azioni = useAzioni();
  const toast = useToast();
  const [tab, setTab] = useState('panoramica');
  const [nota, setNota] = useState('');
  const [elimina, setElimina] = useState(false);
  const n = useMemo(() => numeriCliente(db, c.id), [db, c]);

  const nome = nomeCliente(c);
  const segnali = segnaliCliente(db, c);
  const app = db.appuntamenti.filter(a => a.clienteId === c.id).sort((a, b) => (b.data + b.inizio).localeCompare(a.data + a.inizio));
  const vendite = db.vendite.filter(v => v.clienteId === c.id).sort((a, b) => (b.data + b.ora).localeCompare(a.data + a.ora));
  const pacchetti = db.pacchettiClienti.filter(p => p.clienteId === c.id).sort((a, b) => b.acquistato.localeCompare(a.acquistato));
  const note = db.note.filter(x => x.clienteId === c.id).sort((a, b) => b.data.localeCompare(a.data));
  const gift = db.giftcard.filter(g => g.acquirenteId === c.id);
  const fed = db.impostazioni.fedelta;

  const preferiti = useMemo(() => {
    const m = new Map();
    for (const a of app.filter(a => a.stato === 'completato')) m.set(a.servizioId, (m.get(a.servizioId) || 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([id, v], i) => ({ label: trova(db.servizi, id)?.nome || 'Servizio tolto', value: v, highlight: i === 0 }));
  }, [db, c.id]);

  const salvaScheda = (k, v) => {
    if ((c.scheda?.[k] || '') === v) return;
    cambia(d => { const x = trova(d.clienti, c.id); x.scheda = { ...x.scheda, [k]: v }; });
    toast({ text: `Scheda tecnica aggiornata · ${nome}`, tone: 'success' });
  };
  const aggiungiNota = () => {
    if (!nota.trim()) return;
    const annulla = cambia(d => { d.note.push({ id: nuovoId('nt'), clienteId: c.id, testo: nota.trim(), data: oggi(), ora: adessoOra(), autore: db.operatrici[0]?.nome || 'Titolare' }); });
    setNota('');
    toast({ text: 'Nota aggiunta', tone: 'success', action: { label: 'Annulla', onClick: annulla } });
  };
  const cancella = () => {
    const annulla = cambia(d => {
      d.clienti = d.clienti.filter(x => x.id !== c.id);
      d.appuntamenti = d.appuntamenti.filter(a => !(a.clienteId === c.id && ATTIVI.includes(a.stato)));
    });
    setElimina(false);
    vai('clienti');
    toast({ text: `Cliente eliminata · ${nome}`, tone: 'neutral', action: { label: 'Annulla', onClick: () => { annulla(); vai(`cliente/${c.id}`); } } });
  };

  const scrivi = () => window.open(linkWhatsApp(c.telefono, `Ciao ${c.nome}, `), '_blank', 'noopener');

  const storico = useMemo(() => {
    const voci = [
      ...app.map(a => ({ quando: a.data + a.inizio, id: a.id, icon: STATI[a.stato].icon, tone: STATI[a.stato].tone === 'neutral' ? undefined : STATI[a.stato].tone, text: <><b>{trova(db.servizi, a.servizioId)?.nome}</b> · {STATI[a.stato].label.toLowerCase()}</>, meta: `${fData(a.data)} · ${a.inizio} · ${trova(db.operatrici, a.operatriceId)?.nome || ''}` })),
      ...vendite.map(v => ({ quando: v.data + v.ora + 'z', id: v.id, icon: 'wallet', tone: v.stato === 'rimborsata' ? 'warning' : 'success', text: <><b>{euro(v.totale)}</b> · {v.stato === 'rimborsata' ? 'rimborsato' : `pagato con ${fMetodo(v.metodo).label.toLowerCase()}`}</>, meta: `${fData(v.data)} · ${v.ora} · ricevuta ${v.numero}`, note: v.rimborso?.motivo })),
      ...db.messaggi.filter(m => m.clienteId === c.id).map(m => ({ quando: m.data + m.ora, id: m.id, icon: 'message-circle', text: <><b>Messaggio</b> · {m.tipo}</>, meta: `${fData(m.data)} · ${m.ora} · ${m.canale}` })),
      ...note.map(x => ({ quando: x.data + (x.ora || '00:00'), id: x.id, icon: 'sticky-note', text: <><b>{x.autore}</b> ha scritto una nota</>, meta: fData(x.data), note: x.testo })),
      { quando: c.creato + '00:00', id: 'creata', icon: 'user-plus', text: <><b>Scheda creata</b> · {c.fonte?.toLowerCase()}</>, meta: fData(c.creato) },
    ].sort((a, b) => b.quando.localeCompare(a.quando));
    const gruppi = new Map();
    for (const v of voci.slice(0, 80)) {
      const d = daIso(v.quando.slice(0, 10));
      const k = `${MESI[d.getMonth()].replace(/^./, s => s.toUpperCase())} ${d.getFullYear()}`;
      if (!gruppi.has(k)) gruppi.set(k, []);
      gruppi.get(k).push(v);
    }
    return [...gruppi.entries()].map(([label, items]) => ({ label, items }));
  }, [db, c.id]);

  const allergie = [c.scheda?.allergie && `Allergie: ${c.scheda.allergie}.`, c.scheda?.farmaci && `Farmaci: ${c.scheda.farmaci}.`, c.scheda?.controindicazioni].filter(Boolean).join(' ');

  const panoramica = (
    <>
      {allergie && <Alert tone="warning" icon="triangle-alert" title="Da sapere prima di ogni trattamento" action={<TextLink onClick={() => setTab('scheda')}>Scheda tecnica</TextLink>}>{allergie}</Alert>}
      {!c.consensoPrivacy && <Alert tone="danger" title="Manca il consenso al trattamento dei dati" action={<TextLink onClick={() => azioni.modificaCliente(c.id)}>Aggiungilo</TextLink>}>Senza consenso non puoi tenere allergie e farmaci nella scheda.</Alert>}
      <div className="griglia-3">
        <StatTile title="Speso in tutto" value={euro(n.speso)} icon="wallet" note={`Scontrino medio ${euro(n.scontrinoMedio)}`} />
        <StatTile title="Visite" value={String(n.visite)} icon="calendar-check" note={n.ultima ? `Ultima il ${fData(n.ultima)}${n.giorniDaUltima ? `, ${n.giorniDaUltima} giorni fa` : ''}` : 'Ancora nessuna'} />
        <StatTile title={fed.attiva ? fed.nome : 'Punti'} value={`${c.punti || 0} punti`} icon="star" note={fed.attiva ? (c.punti >= fed.minimoRiscatto ? `Valgono ${euro(c.punti * fed.valorePunto)} alla cassa` : `Si usano da ${fed.minimoRiscatto} punti`) : 'Programma fedeltà spento'} />
      </div>
      <Card flush title="Prossimi appuntamenti" action={<TextLink onClick={() => setTab('appuntamenti')}>Tutti gli appuntamenti</TextLink>}>
        {n.futuri.length === 0
          ? <EmptyState size="sm" icon="calendar" title="Nessun appuntamento in programma" action={<Button size="card" icon="calendar-plus" onClick={() => azioni.nuovoAppuntamento({ clienteId: c.id })}>Fissa il prossimo</Button>} />
          : <List>{n.futuri.slice(0, 4).map(a => <ListRow key={a.id} icon="calendar" title={trova(db.servizi, a.servizioId)?.nome} meta={<span><span className="num">{fData(a.data)} · {a.inizio}</span> · {trova(db.operatrici, a.operatriceId)?.nome}</span>} trailing={<StatoAppuntamento stato={a.stato} />} onClick={() => azioni.apriAppuntamento(a.id)} />)}</List>}
      </Card>
      <Card flush title="Pacchetti attivi" action={<TextLink onClick={() => setTab('pacchetti')}>Tutti i pacchetti</TextLink>}>
        {n.pacchetti.length === 0
          ? <EmptyState size="sm" icon="ticket" title="Nessun pacchetto attivo" action={<Button size="card" icon="ticket" onClick={() => azioni.incassa({ clienteId: c.id })}>Vendi un pacchetto</Button>} />
          : <List>{n.pacchetti.map(p => <ListRow key={p.id} icon="ticket" title={p.nome} meta={<div className="colonna" style={{ gap: 'var(--sp-1)' }}><SegmentedProgress value={p.usate} total={p.sedute} label={`${p.usate} sedute fatte di ${p.sedute}`} showValue /><span>Scade il <span className="num">{fData(p.scadenza)}</span></span></div>} trailing={<StatoPacchetto pc={p} />} />)}</List>}
      </Card>
      {preferiti.length > 0 && <Card title="Servizi che sceglie di più"><BarList data={preferiti} label="Servizi più scelti" format={v => `${v} volte`} /></Card>}
    </>
  );

  const tabelle = {
    appuntamenti: (
      <Tabella label="Appuntamenti" rows={app} rowKey={a => a.id} onRowClick={a => azioni.apriAppuntamento(a.id)}
        columns={[
          { key: 'quando', label: 'Quando', width: 'minmax(0, 1.2fr)', render: a => <span className="num">{fData(a.data)} · {a.inizio}</span> },
          { key: 'servizio', label: 'Servizio', width: 'minmax(0, 2fr)', render: a => trova(db.servizi, a.servizioId)?.nome },
          { key: 'op', label: 'Operatrice', width: 'minmax(0, 1fr)', hideOnMobile: true, render: a => <TagOperatrice op={trova(db.operatrici, a.operatriceId)} /> },
          { key: 'stato', label: 'Stato', width: 'minmax(0, 1.2fr)', render: a => <StatoAppuntamento stato={a.stato} /> },
        ]}
        empty={<EmptyState illustration="history-empty" title="Nessun appuntamento ancora" action={<Button icon="calendar-plus" onClick={() => azioni.nuovoAppuntamento({ clienteId: c.id })}>Fissa un appuntamento</Button>}>Gli appuntamenti fatti e da fare compaiono qui.</EmptyState>} />
    ),
    pacchetti: (
      <Tabella label="Pacchetti" rows={pacchetti} rowKey={p => p.id}
        columns={[
          { key: 'nome', label: 'Pacchetto', width: 'minmax(0, 2fr)', render: p => p.nome },
          { key: 'sedute', label: 'Sedute', width: 'minmax(0, 1.4fr)', render: p => <SegmentedProgress value={p.usate} total={p.sedute} label={`${p.usate} di ${p.sedute}`} showValue /> },
          { key: 'acq', label: 'Comprato', width: 'minmax(0, 1fr)', align: 'right', hideOnMobile: true, render: p => <span className="num">{fData(p.acquistato)}</span> },
          { key: 'scad', hideOnMobile: true, label: 'Scade', width: 'minmax(0, 1fr)', align: 'right', render: p => <span className="num">{fData(p.scadenza)}</span> },
          { key: 'stato', label: 'Stato', width: 'minmax(0, 1fr)', render: p => <StatoPacchetto pc={p} /> },
        ]}
        toolbar={<div className="riga riga--fine" style={{ width: '100%' }}><Button size="card" icon="ticket" onClick={() => azioni.incassa({ clienteId: c.id })}>Vendi un pacchetto</Button></div>}
        empty={<EmptyState illustration="orders-first" title="Nessun pacchetto comprato" action={<Button icon="ticket" onClick={() => azioni.incassa({ clienteId: c.id })}>Vendi un pacchetto</Button>}>I pacchetti di sedute che compra compaiono qui, con le sedute che restano.</EmptyState>} />
    ),
    pagamenti: (
      <Tabella label="Pagamenti" rows={vendite} rowKey={v => v.id} onRowClick={v => azioni.apriRicevuta(v.id)}
        columns={[
          { key: 'data', label: 'Data', width: 'minmax(0, 1fr)', render: v => <span className="num">{fData(v.data)}</span> },
          { key: 'cosa', label: 'Cosa', width: 'minmax(0, 2.4fr)', render: v => v.righe.map(r => r.nome).join(', ') },
          { key: 'metodo', label: 'Metodo', width: 'minmax(0, 1fr)', hideOnMobile: true, render: v => fMetodo(v.metodo).label },
          { key: 'stato', label: 'Stato', width: 'minmax(0, 1fr)', hideOnMobile: true, render: v => <StatoVendita v={v} /> },
          { key: 'totale', label: 'Totale', width: 'minmax(0, 1fr)', align: 'right', render: v => <Euro c={v.totale} /> },
        ]}
        empty={<EmptyState illustration="invoices-first" title="Nessun pagamento ancora" action={<Button icon="wallet" onClick={() => azioni.incassa({ clienteId: c.id })}>Incassa</Button>}>Ogni incasso compare qui con la sua ricevuta.</EmptyState>} />
    ),
  };

  const scheda = (
    <Card title="Scheda tecnica" action={<span className="caption">Si salva quando esci dal campo</span>}>
      <div className="griglia-campi">
        <Field label="Tipo di pelle"><Select options={['Normale', 'Secca', 'Grassa', 'Mista', 'Sensibile'].map(v => ({ value: v, label: v }))} value={c.scheda?.pelle || 'Normale'} onChange={v => salvaScheda('pelle', v)} /></Field>
        <Field label="Allergie" optional><TextInput defaultValue={c.scheda?.allergie} key={'a' + c.id} onBlur={e => salvaScheda('allergie', e.target.value.trim())} placeholder="Nichel, lattice…" /></Field>
        <Field label="Farmaci" optional><TextInput defaultValue={c.scheda?.farmaci} key={'f' + c.id} onBlur={e => salvaScheda('farmaci', e.target.value.trim())} /></Field>
        <Field label="Controindicazioni" optional><TextInput defaultValue={c.scheda?.controindicazioni} key={'c' + c.id} onBlur={e => salvaScheda('controindicazioni', e.target.value.trim())} /></Field>
        <Field label="Note sui trattamenti" optional className="span-2"><Textarea defaultValue={c.scheda?.note} key={'n' + c.id} rows={4} onBlur={e => salvaScheda('note', e.target.value.trim())} placeholder="Prodotti usati, reazioni, risultati, cosa proporre la prossima volta" /></Field>
      </div>
    </Card>
  );

  const corpo = tab === 'panoramica' ? panoramica : tab === 'scheda' ? scheda : tab === 'storico'
    ? <Card title="Storico">{storico.length ? <Timeline groups={storico} /> : <EmptyState illustration="history-empty" title="Ancora niente nello storico" />}</Card>
    : tabelle[tab];

  return (
    <>
      <DetailPage
        header={{
          back: { label: 'Clienti', onClick: () => vai('clienti') },
          avatar: <Avatar name={nome} size={56} />,
          title: nome,
          badge: segnali[0] ? <Badge tone={segnali[0].tone}>{segnali[0].label}</Badge> : (c.tag || []).includes('VIP') ? <Badge tone="accent" icon="star">VIP</Badge> : null,
          subtitle: <>{c.telefono && <span className="num">{telefono(c.telefono)}</span>}{c.telefono && ' · '}cliente dal <span className="num">{fData(c.creato)}</span>{c.nascita ? ` · ${eta(c.nascita)} anni` : ''}</>,
          actions: <>
            <Button icon="message-circle" onClick={scrivi} disabled={!c.telefono}>Scrivi</Button>
            <Button variant="primary" icon="calendar-plus" onClick={() => azioni.nuovoAppuntamento({ clienteId: c.id })}>Nuovo appuntamento</Button>
            <Menu items={[
              { id: 'modifica', label: 'Modifica', icon: 'pencil', onSelect: () => azioni.modificaCliente(c.id) },
              { id: 'incassa', label: 'Incassa', icon: 'wallet', onSelect: () => azioni.incassa({ clienteId: c.id }) },
              { id: 'gift', label: 'Vendi una gift card', icon: 'gift', onSelect: () => azioni.incassa({ clienteId: c.id, tipo: 'giftcard' }) },
              { id: 'elimina', label: 'Elimina cliente', icon: 'trash-2', danger: true, separator: true, onSelect: () => setElimina(true) },
            ]} />
          </>,
          tabs: { value: tab, onChange: setTab, items: [
            { id: 'panoramica', label: 'Panoramica' },
            { id: 'appuntamenti', label: 'Appuntamenti', count: n.futuri.length || undefined },
            { id: 'pacchetti', label: 'Pacchetti', count: n.pacchetti.length || undefined },
            { id: 'pagamenti', label: 'Pagamenti' },
            { id: 'scheda', label: 'Scheda tecnica' },
            { id: 'storico', label: 'Storico' },
          ] },
        }}
        aside={<>
          <Card title="Contatti" action={<TextLink onClick={() => azioni.modificaCliente(c.id)}>Modifica</TextLink>}>
            <KeyValue items={[
              { label: 'Telefono', value: c.telefono ? telefono(c.telefono) : '—', mono: true },
              { label: 'Email', value: c.email || '—' },
              { label: 'Compleanno', value: c.nascita ? fData(c.nascita) : '—', mono: true },
              { label: 'Ci ha conosciuto', value: c.fonte || '—' },
              { label: 'Offerte e auguri', value: c.consensoMarketing ? 'Sì, ha dato il consenso' : 'No, solo promemoria' },
            ]} />
            {(c.tag || []).length > 0 && <div className="riga" style={{ marginTop: 'var(--sp-3)' }}>{c.tag.map(t => <Tag key={t}>{t}</Tag>)}</div>}
          </Card>
          <Card title="Note">
            <div className="colonna">
              {c.note && <p className="testo-lungo">{c.note}</p>}
              {note.map(x => <div key={x.id} className="blocco-tenue"><p className="testo-lungo">{x.testo}</p><span className="caption">{x.autore} · <span className="num">{fData(x.data)}</span></span></div>)}
              <Textarea value={nota} onValue={setNota} rows={2} placeholder="Scrivi una nota per il team" />
              <div className="riga riga--fine"><Button size="card" icon="plus" onClick={aggiungiNota} disabled={!nota.trim()}>Aggiungi nota</Button></div>
            </div>
          </Card>
          {gift.length > 0 && <Card flush title="Gift card regalate"><List>{gift.map(g => <ListRow key={g.id} icon="gift" title={<span className="num">{g.codice}</span>} meta={`${g.beneficiario || 'Senza nome'} · credito ${euro(g.residuo)}`} onClick={() => vai('giftcard')} chevron />)}</List></Card>}
        </>}>
        {corpo}
      </DetailPage>
      <ConfirmDialog open={elimina} onClose={() => setElimina(false)} onConfirm={cancella} danger icon="trash-2"
        title={`Eliminare ${nome}?`} description={`Spariscono la scheda, le note e ${n.futuri.length} appuntamenti in programma. I pagamenti restano nella cassa senza nome.`} confirmLabel="Elimina cliente" cancelLabel="Tieni la cliente" />
    </>
  );
}
