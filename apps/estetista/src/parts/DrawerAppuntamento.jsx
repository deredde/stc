// Fissare, vedere e spostare un appuntamento, senza lasciare la pagina (C3).
import { STC, useState, useEffect, useMemo } from '../stc.js';
import { cambia, nuovoId } from '../data/store.js';
import { useAzioni, Euro, StatoAppuntamento, TagOperatrice, telefono } from './ui.jsx';
import { trova, nomeCliente, controllaAppuntamento, orariLiberi, pacchettiPer, fine, CATEGORIE, componi, linkWhatsApp, ATTIVI } from '../lib/dominio.js';
import { oggi, adessoOra, minuti, dataLunga, data as fData } from '../lib/tempo.js';
import { euro } from '../lib/soldi.js';

const { Drawer, Field, Select, Combobox, DatePicker, TimePicker, NumberInput, Textarea, Checkbox, Alert, Button, KeyValue, Chip, Menu, Badge, TextLink, Skeleton, Segmented, useToast } = STC;

const ORIGINI = [{ value: 'banco', label: 'Al banco' }, { value: 'telefono', label: 'Al telefono' }, { value: 'online', label: 'Online' }];

export function DrawerAppuntamento({ db, stato, onClose }) {
  const [modo, setModo] = useState(null);
  const [id, setId] = useState(null);
  useEffect(() => {
    if (stato) { setModo(stato.modo); setId(stato.id || null); }
  }, [stato]);
  const open = !!stato;
  const app = id ? trova(db.appuntamenti, id) : null;

  if (modo === 'vedi' && app) return <Vedi db={db} app={app} open={open} onClose={onClose} onModifica={() => setModo('modifica')} />;
  return <Modulo db={db} open={open} onClose={onClose} app={modo === 'modifica' ? app : null} preset={stato?.preset || {}} chiave={JSON.stringify(stato)} onCreato={nid => { setId(nid); setModo('vedi'); }} onSpostato={() => setModo('vedi')} />;
}

function Modulo({ db, open, onClose, app, preset, chiave, onCreato, onSpostato }) {
  const toast = useToast();
  const azioni = useAzioni();
  const vuoto = () => {
    const base = app || {};
    return {
      clienteId: base.clienteId || preset.clienteId || '',
      servizioId: base.servizioId || preset.servizioId || '',
      operatriceId: base.operatriceId || preset.operatriceId || '',
      cabinaId: base.cabinaId || '',
      data: base.data || preset.data || oggi(),
      inizio: base.inizio || preset.inizio || '',
      durata: base.durata || 0,
      note: base.note || '',
      origine: base.origine || 'banco',
      pacchettoClienteId: base.pacchettoClienteId || '',
    };
  };
  const [f, setF] = useState(vuoto);
  const [testoCliente, setTestoCliente] = useState('');
  const [tocco, setTocco] = useState(false);
  useEffect(() => {
    if (!open) return;
    const v = vuoto();
    setF(v);
    setTestoCliente(v.clienteId ? nomeCliente(trova(db.clienti, v.clienteId)) : '');
    setTocco(false);
  }, [chiave, open]);

  const set = patch => setF(x => ({ ...x, ...patch }));
  const serv = trova(db.servizi, f.servizioId);
  const scegliServizio = v => {
    const s = trova(db.servizi, v);
    const patch = { servizioId: v, durata: s?.durata || f.durata, cabinaId: s?.cabinaId || f.cabinaId, pacchettoClienteId: '' };
    if (s && f.operatriceId && s.operatrici?.length && !s.operatrici.includes(f.operatriceId)) patch.operatriceId = '';
    set(patch);
  };

  // La seduta da pacchetto si propone da sola quando la cliente ne ha uno per questo servizio.
  const pacchetti = useMemo(() => (f.clienteId && f.servizioId ? pacchettiPer(db, f.clienteId, f.servizioId) : []), [db, f.clienteId, f.servizioId]);
  useEffect(() => { if (!app && pacchetti.length && !f.pacchettoClienteId) set({ pacchettoClienteId: pacchetti[0].id }); }, [pacchetti.length]);

  const bozza = { ...f, id: app?.id, durata: f.durata || serv?.durata || 0 };
  const problemi = controllaAppuntamento(db, bozza);
  const bloccante = problemi.find(p => p.bloccante);
  const liberi = useMemo(() => f.servizioId && f.data
    ? orariLiberi({ ...db, appuntamenti: db.appuntamenti.filter(a => a.id !== app?.id) }, { servizioId: f.servizioId, data: f.data, operatriceId: f.operatriceId || undefined, adesso: f.data === oggi() ? minuti(adessoOra()) : null })
    : [], [db, f.servizioId, f.data, f.operatriceId, app?.id]);

  const mancano = [];
  if (!f.clienteId) mancano.push('cliente');
  if (!f.servizioId) mancano.push('servizio');
  if (!f.inizio) mancano.push('ora');
  const cliente = trova(db.clienti, f.clienteId);
  const operatrici = db.operatrici.filter(o => o.attiva !== false);
  const opzioniOp = [{ value: '', label: 'La prima libera' }, ...operatrici.map(o => ({ value: o.id, label: `${o.nome} ${o.cognome}`, description: serv?.operatrici?.length && !serv.operatrici.includes(o.id) ? 'Di solito non fa questo servizio' : o.ruolo }))];
  const opzioniServ = db.servizi.filter(s => s.attivo || s.id === f.servizioId).map(s => ({ value: s.id, label: s.nome, description: `${CATEGORIE.find(c => c.value === s.categoria)?.label} · ${s.durata} min · ${euro(s.prezzo)}` }));

  const salva = () => {
    setTocco(true);
    if (mancano.length || bloccante) return;
    const opId = f.operatriceId || liberi.find(l => l.ora === f.inizio)?.operatriceId || '';
    const dati = { ...bozza, operatriceId: opId, prezzo: serv.prezzo };
    if (app) {
      const annulla = cambia(db2 => Object.assign(trova(db2.appuntamenti, app.id), dati));
      toast({ text: `Appuntamento spostato · ${nomeCliente(cliente)}`, tone: 'success', action: { label: 'Annulla', onClick: annulla } });
      onSpostato();
      return;
    }
    const nid = nuovoId('ap');
    const annulla = cambia(db2 => { db2.appuntamenti.push({ ...dati, id: nid, stato: 'prenotato', creato: oggi() }); });
    toast({ text: `Appuntamento fissato · ${nomeCliente(cliente)}`, tone: 'success', action: { label: 'Annulla', onClick: () => { annulla(); onClose(); } } });
    onCreato(nid);
  };

  const opzioniClienti = useMemo(() => db.clienti.map(c => ({ value: c.id, label: nomeCliente(c), description: telefono(c.telefono) })), [db.clienti]);

  return (
    <Drawer open={open} onClose={onClose} title={app ? 'Sposta appuntamento' : 'Nuovo appuntamento'} subtitle={app ? `${nomeCliente(cliente)} · ${trova(db.servizi, app.servizioId)?.nome}` : 'Scegli cliente, servizio e orario'}
      footer={<div className="riga riga--fine">
        <Button variant="tertiary" onClick={onClose}>Annulla</Button>
        <Button variant="primary" icon={app ? 'calendar-clock' : 'calendar-check'} onClick={salva} disabled={!!bloccante}>{app ? 'Sposta appuntamento' : 'Prenota'}</Button>
      </div>}>
      <div className="colonna colonna--larga">
        {tocco && mancano.length > 0 && <Alert tone="danger" title={`Manca ${mancano.join(', ')}`}>Completa i campi segnati per fissare l'appuntamento.</Alert>}
        <Field label="Cliente" error={tocco && !f.clienteId ? 'Scegli una cliente o creane una nuova' : undefined}>
          <Combobox options={opzioniClienti} value={testoCliente} onChange={t => { setTestoCliente(t); if (f.clienteId) set({ clienteId: '' }); }}
            onSelect={o => { setTestoCliente(o.label); set({ clienteId: o.value }); }}
            onCreate={t => { const [nome, ...r] = t.trim().split(/\s+/); azioni.nuovoCliente({ nome, cognome: r.join(' ') }, nid => azioni.nuovoAppuntamento({ ...f, clienteId: nid })); }}
            createLabel={t => `Crea «${t}» come nuova cliente`} placeholder="Cerca per nome o telefono" icon="search" avatars />
        </Field>
        {cliente && (cliente.scheda?.allergie || cliente.scheda?.controindicazioni) && (
          <Alert tone="warning" icon="triangle-alert" title="Da sapere prima del trattamento">
            {[cliente.scheda.allergie && `Allergie: ${cliente.scheda.allergie}.`, cliente.scheda.controindicazioni].filter(Boolean).join(' ')}
          </Alert>
        )}
        <Field label="Servizio" error={tocco && !f.servizioId ? 'Scegli il servizio' : undefined}>
          <Select options={opzioniServ} value={f.servizioId} onChange={scegliServizio} placeholder="Scegli il servizio" searchable invalid={tocco && !f.servizioId} />
        </Field>
        {pacchetti.length > 0 && (
          <Checkbox checked={!!f.pacchettoClienteId} onChange={v => set({ pacchettoClienteId: v ? pacchetti[0].id : '' })}
            label={`Scala una seduta da «${pacchetti[0].nome}»`} description={`Restano ${pacchetti[0].sedute - pacchetti[0].usate} sedute di ${pacchetti[0].sedute}, valido fino al ${fData(pacchetti[0].scadenza)}. Alla cassa non si paga.`} />
        )}
        <div className="griglia-campi">
          <Field label="Giorno"><DatePicker value={f.data} onChange={v => set({ data: v })} /></Field>
          <Field label="Ora" error={tocco && !f.inizio ? 'Scegli l\'ora' : undefined}>
            <TimePicker value={f.inizio} onChange={v => set({ inizio: v })} step={db.impostazioni.agenda.passo} from={db.impostazioni.agenda.dalle} to={db.impostazioni.agenda.alle} placeholder="09:30" />
          </Field>
        </div>
        {f.servizioId && (
          <div className="colonna">
            <span className="overline">{liberi.length ? `Orari liberi · ${dataLunga(f.data)}` : 'Nessun orario libero'}</span>
            {liberi.length
              ? <div className="riga">{liberi.slice(0, 16).map(l => <Chip key={l.ora} selected={f.inizio === l.ora} onClick={() => set({ inizio: l.ora, operatriceId: f.operatriceId || l.operatriceId })}><span className="num">{l.ora}</span></Chip>)}</div>
              : <span className="secondary">Prova un altro giorno o un'altra operatrice.</span>}
          </div>
        )}
        <div className="griglia-campi">
          <Field label="Operatrice"><Select options={opzioniOp} value={f.operatriceId} onChange={v => set({ operatriceId: v })} /></Field>
          <Field label="Durata"><NumberInput value={f.durata || serv?.durata || 30} onChange={v => set({ durata: v })} min={5} max={480} step={5} unit="min" stepLabel="di 5 minuti" /></Field>
          <Field label="Cabina"><Select options={[{ value: '', label: 'Nessuna' }, ...db.cabine.map(c => ({ value: c.id, label: c.nome }))]} value={f.cabinaId} onChange={v => set({ cabinaId: v })} /></Field>
          <Field label="Come ha prenotato"><Select options={ORIGINI} value={f.origine} onChange={v => set({ origine: v })} /></Field>
        </div>
        {problemi.map((p, i) => <Alert key={i} tone={p.bloccante ? 'danger' : 'warning'} title={p.bloccante ? 'Così non si può fissare' : 'Da controllare'}>{p.testo}</Alert>)}
        <Field label="Note per l'operatrice" optional><Textarea value={f.note} onValue={v => set({ note: v })} rows={3} placeholder="Per esempio: pelle sensibile sul collo" /></Field>
        {serv && <div className="blocco-tenue totale-riga"><span>{serv.nome} · <span className="num">{f.inizio || '--:--'}–{f.inizio ? fine({ inizio: f.inizio, durata: bozza.durata }) : '--:--'}</span></span>{f.pacchettoClienteId ? <span className="secondary">Da pacchetto</span> : <Euro c={serv.prezzo} />}</div>}
      </div>
    </Drawer>
  );
}

function Vedi({ db, app, open, onClose, onModifica }) {
  const toast = useToast();
  const azioni = useAzioni();
  const cli = trova(db.clienti, app.clienteId);
  const serv = trova(db.servizi, app.servizioId);
  const op = trova(db.operatrici, app.operatriceId);
  const cab = trova(db.cabine, app.cabinaId);
  const pc = trova(db.pacchettiClienti, app.pacchettoClienteId);
  const centro = db.impostazioni.centro.nome;
  const oggiIso = oggi();

  const stato = (nuovo, testo) => {
    const annulla = cambia(d => { trova(d.appuntamenti, app.id).stato = nuovo; });
    toast({ text: `${testo} · ${nomeCliente(cli)}`, tone: nuovo === 'assente' ? 'neutral' : 'success', action: { label: 'Annulla', onClick: annulla } });
  };
  const testoMsg = componi(app.stato === 'prenotato' && app.data > oggiIso ? db.impostazioni.promemoria.testoConferma : db.impostazioni.promemoria.testo, {
    nome: cli?.nome || '', giorno: app.data === oggiIso ? 'oggi' : dataLunga(app.data), ora: app.inizio, servizio: serv?.nome || '', centro,
  });
  const manda = () => {
    window.open(linkWhatsApp(cli?.telefono, testoMsg), '_blank', 'noopener');
    cambia(d => {
      const a = trova(d.appuntamenti, app.id);
      a.promemoria = { inviato: new Date().toISOString().slice(0, 16) };
      d.messaggi.push({ id: nuovoId('ms'), tipo: 'promemoria', clienteId: app.clienteId, appuntamentoId: app.id, canale: 'whatsapp', testo: testoMsg, data: oggiIso, ora: adessoOra() });
    });
    toast({ text: `Messaggio pronto su WhatsApp · ${nomeCliente(cli)}`, tone: 'success' });
  };
  const incassa = () => azioni.incassa({ clienteId: app.clienteId, appuntamenti: [app.id] });

  // Un solo primario: l'azione che serve adesso per questo stato (P1).
  let primario = null, secondario = null;
  const attivo = ATTIVI.includes(app.stato);
  if (attivo && app.data === oggiIso && app.stato !== 'arrivato') primario = <Button variant="primary" icon="armchair" onClick={() => stato('arrivato', 'In sala')}>Segna arrivata</Button>;
  else if (app.stato === 'arrivato') primario = <Button variant="primary" icon="wallet" onClick={incassa}>Completa e incassa</Button>;
  else if (app.stato === 'prenotato') primario = <Button variant="primary" icon="calendar-check" onClick={() => stato('confermato', 'Appuntamento confermato')}>Conferma</Button>;
  else if (app.stato === 'completato' && !app.venditaId) primario = <Button variant="primary" icon="wallet" onClick={incassa}>Incassa</Button>;
  else if (app.stato === 'completato') secondario = <Button icon="receipt" onClick={() => azioni.apriRicevuta(app.venditaId)}>Vedi ricevuta</Button>;
  else if (app.stato === 'annullato' || app.stato === 'assente') secondario = <Button icon="calendar-plus" onClick={() => azioni.nuovoAppuntamento({ clienteId: app.clienteId, servizioId: app.servizioId, operatriceId: app.operatriceId })}>Prenota di nuovo</Button>;
  if (attivo && !secondario) secondario = <Button icon="message-circle" onClick={manda} disabled={!cli?.telefono}>{app.promemoria ? 'Riscrivi su WhatsApp' : 'Scrivi su WhatsApp'}</Button>;

  const voci = [
    attivo && { id: 'sposta', label: 'Sposta', icon: 'calendar-clock', onSelect: onModifica },
    attivo && app.stato === 'prenotato' && app.data === oggiIso && { id: 'conferma', label: 'Segna confermato', icon: 'calendar-check', onSelect: () => stato('confermato', 'Appuntamento confermato') },
    attivo && app.stato !== 'arrivato' && app.data <= oggiIso && { id: 'arrivata', label: 'Segna arrivata', icon: 'armchair', onSelect: () => stato('arrivato', 'In sala') },
    attivo && { id: 'completa', label: 'Segna completato senza incassare', icon: 'circle-check', onSelect: () => stato('completato', 'Appuntamento completato') },
    { id: 'cliente', label: 'Apri la scheda cliente', icon: 'id-card', onSelect: () => { onClose(); azioni.apriCliente(app.clienteId); } },
    (app.stato === 'annullato' || app.stato === 'assente') && { id: 'ripristina', label: 'Rimetti in agenda', icon: 'undo-2', onSelect: () => stato('prenotato', 'Rimesso in agenda') },
    attivo && { id: 'assente', label: 'Non si è presentata', icon: 'user-x', separator: true, onSelect: () => stato('assente', 'Segnata come non presentata') },
    attivo && { id: 'annulla', label: 'Annulla appuntamento', icon: 'calendar-x', danger: true, onSelect: () => stato('annullato', 'Appuntamento annullato') },
  ].filter(Boolean);

  return (
    <Drawer open={open} onClose={onClose} title={serv?.nome || 'Appuntamento'} subtitle={`${dataLunga(app.data)} · ${app.inizio}–${fine(app)}`}
      footer={<div className="riga riga--larga">
        <Menu items={voci} placement="top-start" />
        <div className="riga">{secondario}{primario}</div>
      </div>}>
      <div className="colonna colonna--larga">
        <div className="riga">
          <StatoAppuntamento stato={app.stato} size="md" />
          {app.origine === 'online' && <Badge tone="accent" icon="globe" size="md">Prenotato online</Badge>}
          {app.promemoria && <Badge tone="neutral" icon="message-circle-check" size="md">Promemoria mandato</Badge>}
        </div>
        {app.origine === 'online' && app.stato === 'prenotato' && <Alert tone="info" title="Da confermare" action={<TextLink onClick={() => stato('confermato', 'Appuntamento confermato')}>Conferma ora</TextLink>}>La cliente ha prenotato dalla pagina online e aspetta la tua conferma.</Alert>}
        {cli && (cli.scheda?.allergie || cli.scheda?.controindicazioni) && (
          <Alert tone="warning" icon="triangle-alert" title="Da sapere prima del trattamento">
            {[cli.scheda.allergie && `Allergie: ${cli.scheda.allergie}.`, cli.scheda.controindicazioni].filter(Boolean).join(' ')}
          </Alert>
        )}
        <KeyValue items={[
          { label: 'Cliente', value: cli ? <TextLink onClick={() => { onClose(); azioni.apriCliente(cli.id); }}>{nomeCliente(cli)}</TextLink> : 'Cliente cancellata' },
          { label: 'Telefono', value: cli?.telefono ? telefono(cli.telefono) : '—', mono: true },
          { label: 'Operatrice', value: <TagOperatrice op={op} /> },
          { label: 'Cabina', value: cab?.nome || '—' },
          { label: 'Orario', value: `${fData(app.data)} · ${app.inizio}–${fine(app)}`, mono: true },
          { label: 'Prezzo', value: pc ? `Seduta da «${pc.nome}» (${pc.usate}/${pc.sedute})` : <Euro c={app.prezzo ?? serv?.prezzo} /> },
        ]} />
        {app.note && <div className="blocco-tenue"><span className="overline">Note</span><p className="testo-lungo">{app.note}</p></div>}
        {cli?.note && <div className="blocco-tenue"><span className="overline">Note sulla cliente</span><p className="testo-lungo">{cli.note}</p></div>}
      </div>
    </Drawer>
  );
}
