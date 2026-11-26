// La pagina pubblica per le clienti (MemberApp): prenotano da sole, vedono e disdicono gli appuntamenti,
// guardano punti e pacchetti. Niente accesso: le riconosce dal numero di telefono.
import { STC, useState, useMemo } from '../stc.js';
import { useArchivio, cambia, nuovoId, carica } from '../data/store.js';
import { Euro, telefono as fTel } from '../parts/ui.jsx';
import { CATEGORIE, ATTIVI, STATI, trova, fine, orariLiberi, motivoChiusura, statoPacchetto, linkWhatsApp, componi } from '../lib/dominio.js';
import { oggi, piuGiorni, daIso, isoDi, giorniTra, inizioSettimana, dataLunga, minuti, adessoOra, GIORNI, GIORNI_BREVI } from '../lib/tempo.js';
import { euro } from '../lib/soldi.js';

const { MemberApp, Card, List, ListRow, Button, IconButton, Chip, DayStrip, Sheet, Field, TextInput, PhoneInput, Textarea, Checkbox, Alert, Badge, EmptyState, Skeleton, PassCard, SegmentedProgress, KeyValue, StatePage, useToast } = STC;

const MIO = 'bellezza:cliente-online';
const soloCifre = t => { const d = String(t || '').replace(/\D/g, ''); return d.length === 12 && d.startsWith('39') ? d.slice(2) : d; };
const leggiMio = () => { try { return localStorage.getItem(MIO) || ''; } catch (e) { return ''; } };
const scriviMio = t => { try { localStorage.setItem(MIO, t); } catch (e) { /* va bene lo stesso */ } };

export function Prenota() {
  const { fase, db } = useArchivio();
  const [tab, setTab] = useState('prenota');
  const [mio, setMio] = useState(leggiMio);
  const [passo, setPasso] = useState({ n: 1 });

  const cliente = db && mio ? db.clienti.find(c => soloCifre(c.telefono) === mio) : null;
  const nome = db?.impostazioni.centro.nome || 'Bellezza Studio';
  const ricordami = t => { const d = soloCifre(t); setMio(d); scriviMio(d); };

  let corpo;
  if (fase === 'caricamento' || !db && fase !== 'errore') corpo = <Card><div className="colonna"><Skeleton width="60%" height={18} /><Skeleton height={56} /><Skeleton height={56} /><Skeleton height={56} /></div></Card>;
  else if (fase === 'errore') corpo = <Card><EmptyState illustration="offline" title="La pagina non si è caricata" action={<Button icon="rotate-cw" onClick={carica}>Riprova</Button>}>Controlla la connessione e riprova.</EmptyState></Card>;
  else if (tab === 'prenota') corpo = <TabPrenota db={db} cliente={cliente} passo={passo} setPasso={setPasso} ricordami={ricordami} vaiAgli={() => setTab('appuntamenti')} />;
  else if (tab === 'appuntamenti') corpo = <TabAppuntamenti db={db} cliente={cliente} mio={mio} ricordami={ricordami} esci={() => { setMio(''); scriviMio(''); }} prenota={() => { setPasso({ n: 1 }); setTab('prenota'); }} />;
  else if (tab === 'tessera') corpo = <TabTessera db={db} cliente={cliente} vaiAgli={() => setTab('appuntamenti')} />;
  else corpo = <TabCentro db={db} />;

  const titoli = { prenota: passo.n === 1 ? 'Prenota' : passo.n === 2 ? 'Scegli quando' : 'Prenotato', appuntamenti: 'I miei appuntamenti', tessera: 'Punti e pacchetti', centro: nome };
  const sotto = { prenota: passo.n === 1 ? (db?.impostazioni.online.messaggio || '') : passo.n === 2 ? trova(db.servizi, passo.servizioId)?.nome : '', appuntamenti: cliente ? `Ciao ${cliente.nome}` : '', tessera: db?.impostazioni.fedelta.nome || '', centro: db?.impostazioni.centro.indirizzo || '' };

  return (
    <MemberApp name={nome} user={cliente ? { name: `${cliente.nome} ${cliente.cognome}`, onClick: () => setTab('appuntamenti') } : undefined}
      title={titoli[tab]} subtitle={sotto[tab]}
      back={tab === 'prenota' && passo.n === 2 ? { label: 'Torna ai servizi', onClick: () => setPasso({ n: 1 }) } : undefined}
      tabs={{ value: tab, onChange: t => { setTab(t); if (t === 'prenota') setPasso({ n: 1 }); }, items: [
        { id: 'prenota', label: 'Prenota', icon: 'calendar-plus' },
        { id: 'appuntamenti', label: 'Appuntamenti', icon: 'calendar-check' },
        { id: 'tessera', label: 'Tessera', icon: 'gem' },
        { id: 'centro', label: 'Il centro', icon: 'map-pin' },
      ] }}>
      {corpo}
    </MemberApp>
  );
}

// ---------- Prenota: servizio → giorno e ora → i tuoi dati → fatto

function TabPrenota({ db, cliente, passo, setPasso, ricordami, vaiAgli }) {
  const o = db.impostazioni.online;
  if (!o.attiva) return <Card><EmptyState illustration="period-empty" title="Le prenotazioni online sono chiuse" action={<Button icon="phone" onClick={() => { location.href = `tel:${db.impostazioni.centro.telefono}`; }}>Chiama il centro</Button>}>Per un appuntamento chiamaci o scrivici su WhatsApp.</EmptyState></Card>;
  if (passo.n === 1) return <SceltaServizio db={db} onScegli={id => setPasso({ n: 2, servizioId: id })} />;
  if (passo.n === 2) return <SceltaOrario db={db} cliente={cliente} servizioId={passo.servizioId} ricordami={ricordami} onFatto={id => setPasso({ n: 3, appuntamentoId: id })} />;
  return <Fatto db={db} id={passo.appuntamentoId} altro={() => setPasso({ n: 1 })} vaiAgli={vaiAgli} />;
}

function SceltaServizio({ db, onScegli }) {
  const servizi = db.servizi.filter(s => s.attivo && s.online);
  const [cat, setCat] = useState('');
  const categorie = CATEGORIE.filter(c => servizi.some(s => s.categoria === c.value));
  const visibili = servizi.filter(s => !cat || s.categoria === cat);
  if (!servizi.length) return <Card><EmptyState illustration="item-not-found" title="Ancora nessun servizio online">Chiamaci per prenotare: ti troviamo un posto.</EmptyState></Card>;
  return (
    <>
      <div className="riga">
        <Chip selected={!cat} onClick={() => setCat('')}>Tutti</Chip>
        {categorie.map(c => <Chip key={c.value} selected={cat === c.value} onClick={() => setCat(c.value)}>{c.label}</Chip>)}
      </div>
      <Card flush>
        <List label="Servizi da prenotare">
          {visibili.map(s => (
            <ListRow key={s.id} onClick={() => onScegli(s.id)} title={s.nome}
              meta={<span>{s.durata} min{s.descrizione ? ` · ${s.descrizione}` : ''}</span>}
              trailing={<Euro c={s.prezzo} />} />
          ))}
        </List>
      </Card>
    </>
  );
}

/** Il primo momento prenotabile, tenendo conto dell'anticipo chiesto dal centro. */
function primoMomento(anticipoOre) {
  const t = oggi();
  const m = minuti(adessoOra()) + anticipoOre * 60;
  return { data: piuGiorni(t, Math.floor(m / 1440)), minuti: m % 1440 };
}

function SceltaOrario({ db, cliente, servizioId, ricordami, onFatto }) {
  const o = db.impostazioni.online;
  const s = trova(db.servizi, servizioId);
  const primo = primoMomento(o.anticipoOre || 0);
  const ultimo = piuGiorni(oggi(), o.giorni || 30);
  const liberi = d => {
    if (d < primo.data || d > ultimo) return [];
    return orariLiberi(db, { servizioId, data: d, adesso: d === primo.data ? primo.minuti : null });
  };
  // Si parte dal primo giorno con un posto libero, così la cliente non vede subito «pieno».
  const [giorno, setGiorno] = useState(() => {
    for (let i = 0; i <= giorniTra(primo.data, ultimo); i++) { const d = piuGiorni(primo.data, i); if (liberi(d).length) return d; }
    return primo.data;
  });
  const [settimana, setSettimana] = useState(() => inizioSettimana(giorno));
  const [ora, setOra] = useState(null);
  const [dati, setDati] = useState(null);
  const delGiorno = useMemo(() => liberi(giorno), [db, giorno]);
  const giorni = Array.from({ length: 7 }, (_, i) => {
    const d = piuGiorni(settimana, i);
    const n = liberi(d).length;
    return { id: d, label: GIORNI_BREVI[i], day: daIso(d).getDate(), dot: n > 0, full: n === 0 };
  });
  const chiuso = motivoChiusura(db.impostazioni, giorno);
  const sposta = n => { const w = piuGiorni(settimana, n * 7); setSettimana(w); setGiorno(w < primo.data ? primo.data : w); setOra(null); };

  return (
    <>
      <Card>
        <div className="colonna">
          <div className="riga riga--larga">
            <span className="card-title">{dataLunga(giorno)}</span>
            <div className="riga">
              <IconButton icon="chevron-left" label="Settimana prima" onClick={() => sposta(-1)} disabled={settimana <= inizioSettimana(primo.data)} />
              <IconButton icon="chevron-right" label="Settimana dopo" onClick={() => sposta(1)} disabled={piuGiorni(settimana, 7) > ultimo} />
            </div>
          </div>
          <DayStrip days={giorni} value={giorno} onChange={d => { setGiorno(d); setOra(null); }} today={oggi()} label="Giorni" />
        </div>
      </Card>
      <Card title="Orari liberi">
        {delGiorno.length
          ? <div className="riga">{delGiorno.map(l => <Chip key={l.ora} selected={ora?.ora === l.ora} onClick={() => setOra(l)}><span className="num">{l.ora}</span></Chip>)}</div>
          : <EmptyState size="sm" illustration="period-empty" title={chiuso || 'Nessun posto libero'}>{giorno < primo.data ? 'Prenota con un po\' più di anticipo.' : 'Prova un altro giorno della settimana.'}</EmptyState>}
      </Card>
      <Button variant="primary" size="header" icon="calendar-check" disabled={!ora} onClick={() => setDati(true)}>{ora ? `Prenota alle ${ora.ora}` : 'Scegli un orario'}</Button>
      <span className="caption">{s.nome} · {s.durata} minuti · {euro(s.prezzo)}. Si paga al centro.</span>
      <SchedaDati open={!!dati} onClose={() => setDati(null)} db={db} cliente={cliente} servizio={s} giorno={giorno} ora={ora} ricordami={ricordami} onFatto={onFatto} />
    </>
  );
}

function SchedaDati({ open, onClose, db, cliente, servizio, giorno, ora, ricordami, onFatto }) {
  const [f, setF] = useState({ nome: cliente?.nome || '', cognome: cliente?.cognome || '', telefono: cliente?.telefono || '', note: '', privacy: !!cliente, marketing: false });
  const [tocco, setTocco] = useState(false);
  const [errore, setErrore] = useState(null);
  const set = p => setF(x => ({ ...x, ...p }));
  const err = {
    nome: !f.nome.trim() && 'Scrivi il tuo nome',
    telefono: soloCifre(f.telefono).length < 9 && 'Scrivi il numero intero: ti mandiamo la conferma',
    privacy: !f.privacy && 'Serve il consenso per prenotare',
  };
  const conferma = () => {
    setTocco(true);
    if (err.nome || err.telefono || err.privacy || !ora) return;
    const tel = soloCifre(f.telefono);
    let nuovoAp = null;
    cambia(d => {
      // Il posto potrebbe essere stato preso nel frattempo: si ricontrolla sui dati di adesso.
      const ancora = orariLiberi(d, { servizioId: servizio.id, data: giorno }).find(l => l.ora === ora.ora);
      if (!ancora) return;
      let c = d.clienti.find(x => soloCifre(x.telefono) === tel);
      if (!c) {
        c = { id: nuovoId('cl'), nome: f.nome.trim(), cognome: f.cognome.trim(), telefono: tel, email: '', nascita: '', sesso: 'F', note: '', tag: [], fonte: 'Prenotazione online', consensoPrivacy: true, consensoMarketing: f.marketing, creato: oggi(), punti: 0, scheda: { pelle: '', allergie: '', farmaci: '', controindicazioni: '', note: '' } };
        d.clienti.push(c);
      }
      nuovoAp = { id: nuovoId('ap'), clienteId: c.id, servizioId: servizio.id, operatriceId: ancora.operatriceId, cabinaId: servizio.cabinaId || '', data: giorno, inizio: ora.ora, durata: servizio.durata, stato: d.impostazioni.online.conferma === 'automatica' ? 'confermato' : 'prenotato', note: f.note.trim(), origine: 'online', prezzo: servizio.prezzo, creato: oggi() };
      d.appuntamenti.push(nuovoAp);
    });
    if (!nuovoAp) { setErrore('Qualcuno ha appena preso questo orario. Scegline un altro.'); return; }
    ricordami(tel);
    onClose();
    onFatto(nuovoAp.id);
  };
  return (
    <Sheet open={open} onClose={onClose} title="I tuoi dati" description={ora ? `${servizio.nome} · ${dataLunga(giorno)} alle ${ora.ora}` : ''}
      footer={<><Button variant="primary" size="header" icon="calendar-check" onClick={conferma}>Conferma la prenotazione</Button><Button variant="tertiary" onClick={onClose}>Cambia orario</Button></>}>
      <div className="colonna">
        {errore && <Alert tone="danger" title="Orario non più libero">{errore}</Alert>}
        {cliente && <Alert tone="info" title={`Bentornata, ${cliente.nome}`}>Abbiamo già i tuoi dati.</Alert>}
        <div className="griglia-campi">
          <Field label="Nome" error={tocco && err.nome || undefined}><TextInput value={f.nome} onValue={v => set({ nome: v })} autoComplete="given-name" invalid={tocco && !!err.nome} /></Field>
          <Field label="Cognome" optional><TextInput value={f.cognome} onValue={v => set({ cognome: v })} autoComplete="family-name" /></Field>
        </div>
        <Field label="Telefono" error={tocco && err.telefono || undefined} help="Ti scriviamo qui per confermare"><PhoneInput value={f.telefono} onChange={v => set({ telefono: v })} /></Field>
        <Field label="Note per il centro" optional><Textarea value={f.note} onValue={v => set({ note: v })} rows={2} placeholder="Per esempio: è la prima volta, ho la pelle sensibile" /></Field>
        {!cliente && <>
          <Field error={tocco && err.privacy || undefined}><Checkbox checked={f.privacy} onChange={v => set({ privacy: v })} label="Acconsento al trattamento dei miei dati" description="Servono per gestire l'appuntamento e la scheda trattamenti." /></Field>
          <Checkbox checked={f.marketing} onChange={v => set({ marketing: v })} label="Voglio ricevere offerte e auguri" description="Puoi cambiare idea quando vuoi." />
        </>}
      </div>
    </Sheet>
  );
}

function Fatto({ db, id, altro, vaiAgli }) {
  const a = trova(db.appuntamenti, id);
  if (!a) return <Card><EmptyState illustration="item-not-found" title="Prenotazione non trovata" action={<Button onClick={altro}>Prenota di nuovo</Button>}>Riprova dalla lista dei servizi.</EmptyState></Card>;
  const s = trova(db.servizi, a.servizioId);
  const op = trova(db.operatrici, a.operatriceId);
  const confermato = a.stato === 'confermato';
  return (
    <>
      <Card>
        <EmptyState illustration="all-done" title={confermato ? 'Ti aspettiamo' : 'Prenotazione ricevuta'}>
          {confermato ? 'L\'appuntamento è confermato. Il giorno prima ti mandiamo un promemoria.' : 'Ti scriviamo noi su WhatsApp per confermare.'}
        </EmptyState>
      </Card>
      <Card title="Il tuo appuntamento">
        <KeyValue items={[
          { label: 'Trattamento', value: s?.nome },
          { label: 'Quando', value: `${dataLunga(a.data)} · ${a.inizio}–${fine(a)}` },
          { label: 'Con', value: op ? op.nome : 'Lo staff' },
          { label: 'Prezzo', value: euro(a.prezzo), mono: true, note: 'Si paga al centro' },
        ]} />
      </Card>
      <Button variant="primary" size="header" icon="calendar-check" onClick={vaiAgli}>Vedi i miei appuntamenti</Button>
      <Button icon="plus" onClick={altro}>Prenota un altro trattamento</Button>
    </>
  );
}

// ---------- I miei appuntamenti

function Riconoscimi({ ricordami, mio }) {
  const [t, setT] = useState('');
  const [tocco, setTocco] = useState(false);
  const ok = soloCifre(t).length >= 9;
  return (
    <Card title="Chi sei?">
      <div className="colonna">
        {mio && <Alert tone="warning" title="Numero non trovato">Non troviamo appuntamenti con il {fTel(mio)}. Prova con il numero che hai dato al centro.</Alert>}
        <Field label="Il tuo telefono" error={tocco && !ok ? 'Scrivi il numero intero' : undefined} help="Lo stesso che hai dato al centro"><PhoneInput value={t} onChange={setT} /></Field>
        <Button variant="primary" icon="search" onClick={() => { setTocco(true); if (ok) ricordami(t); }}>Trova i miei appuntamenti</Button>
      </div>
    </Card>
  );
}

function TabAppuntamenti({ db, cliente, mio, ricordami, esci, prenota }) {
  const toast = useToast();
  const [disdici, setDisdici] = useState(null);
  if (!cliente) return <Riconoscimi ricordami={ricordami} mio={mio} />;
  const t = oggi();
  const miei = db.appuntamenti.filter(a => a.clienteId === cliente.id);
  const prossimi = miei.filter(a => a.data >= t && ATTIVI.includes(a.stato)).sort((a, b) => (a.data + a.inizio).localeCompare(b.data + b.inizio));
  const passati = miei.filter(a => a.stato === 'completato').sort((a, b) => (b.data + b.inizio).localeCompare(a.data + a.inizio)).slice(0, 5);
  const a = disdici ? trova(db.appuntamenti, disdici) : null;
  // Si disdice online fino a 24 ore prima; dopo, si chiama il centro.
  const disdicibile = x => giorniTra(t, x.data) >= 2 || (giorniTra(t, x.data) === 1 && minuti(x.inizio) >= minuti(adessoOra()));
  const conferma = () => {
    const annulla = cambia(d => { const x = trova(d.appuntamenti, a.id); x.stato = 'annullato'; x.annullatoDa = 'cliente'; x.annullato = oggi(); });
    toast({ text: 'Appuntamento disdetto', tone: 'success', action: { label: 'Annulla', onClick: annulla } });
    setDisdici(null);
  };
  const scrivi = x => window.open(linkWhatsApp(db.impostazioni.centro.telefono, componi('Ciao, sono {nome}. Per l\'appuntamento di {giorno} alle {ora}: ', { nome: cliente.nome, giorno: dataLunga(x.data), ora: x.inizio })), '_blank', 'noopener');

  return (
    <>
      <Card title="In programma" flush>
        {prossimi.length === 0
          ? <EmptyState illustration="period-empty" title="Nessun appuntamento in programma" action={<Button variant="primary" icon="calendar-plus" onClick={prenota}>Prenota un trattamento</Button>}>Quando prenoti, lo trovi qui.</EmptyState>
          : <List label="Appuntamenti in programma">{prossimi.map(x => {
            const st = STATI[x.stato];
            return (
              <ListRow key={x.id} title={trova(db.servizi, x.servizioId)?.nome}
                meta={<span>{dataLunga(x.data)} · <span className="num">{x.inizio}</span> · {trova(db.operatrici, x.operatriceId)?.nome}</span>}
                trailing={<div className="riga"><Badge tone={st.tone} icon={st.icon} size="sm">{x.stato === 'prenotato' ? 'Da confermare' : st.label}</Badge>
                  {disdicibile(x)
                    ? <IconButton icon="calendar-x" label="Disdici" onClick={() => setDisdici(x.id)} />
                    : <IconButton icon="message-circle" label="Scrivi al centro" onClick={() => scrivi(x)} />}</div>} />
            );
          })}</List>}
      </Card>
      {passati.length > 0 && <Card title="Gli ultimi trattamenti" flush>
        <List label="Trattamenti fatti">{passati.map(x => <ListRow key={x.id} title={trova(db.servizi, x.servizioId)?.nome} meta={dataLunga(x.data)} trailing={<Button size="row" onClick={prenota}>Prenota di nuovo</Button>} />)}</List>
      </Card>}
      <Button variant="tertiary" icon="log-out" onClick={esci}>Non sono {cliente.nome}</Button>
      <Sheet open={!!a} onClose={() => setDisdici(null)} title="Disdire l'appuntamento?" description={a ? `${trova(db.servizi, a.servizioId)?.nome} · ${dataLunga(a.data)} alle ${a.inizio}` : ''}
        footer={<><Button variant="danger" size="header" icon="calendar-x" onClick={conferma}>Disdici l'appuntamento</Button><Button variant="tertiary" onClick={() => setDisdici(null)}>Non disdire</Button></>}>
        <span className="secondary">Il posto torna libero per le altre clienti. Se vuoi solo cambiare giorno, disdici e prenota di nuovo.</span>
      </Sheet>
    </>
  );
}

// ---------- Punti e pacchetti

function TabTessera({ db, cliente, vaiAgli }) {
  const f = db.impostazioni.fedelta;
  if (!cliente) return <Card><EmptyState illustration="search-start" title="Prima dicci chi sei" action={<Button variant="primary" icon="phone" onClick={vaiAgli}>Scrivi il tuo telefono</Button>}>Con il numero vediamo i tuoi punti e i tuoi pacchetti.</EmptyState></Card>;
  const pacchetti = db.pacchettiClienti.filter(p => p.clienteId === cliente.id && statoPacchetto(p).codice !== 'esaurito');
  const punti = cliente.punti || 0;
  const verso = f.minimoRiscatto ? Math.min(100, Math.round(punti / f.minimoRiscatto * 100)) : 100;
  return (
    <>
      {f.attiva && <PassCard status={{ tone: punti >= f.minimoRiscatto ? 'success' : 'accent', label: punti >= f.minimoRiscatto ? 'Puoi usarli' : f.nome }}
        code={<div className="colonna" style={{ alignItems: 'center', gap: 4 }}><span className="num-kpi">{punti.toLocaleString('it-IT')}</span><span className="caption">punti · valgono {euro(punti * f.valorePunto)}</span></div>}
        progress={punti >= f.minimoRiscatto ? { value: 100, note: 'Dillo alla cassa per usarli come sconto' } : { value: verso, note: `Ancora ${f.minimoRiscatto - punti} punti per usarli`, time: `${f.puntiPerEuro} punto per euro` }}
        footer={<span className="caption">{cliente.nome} {cliente.cognome}</span>} />}
      <Card title="I tuoi pacchetti" flush>
        {pacchetti.length === 0
          ? <EmptyState size="sm" illustration="archive-empty" title="Nessun pacchetto attivo">Chiedi al centro: con un pacchetto le sedute costano meno.</EmptyState>
          : <List label="Pacchetti">{pacchetti.map(p => {
            const st = statoPacchetto(p);
            return <ListRow key={p.id} title={p.nome} meta={<div className="colonna" style={{ gap: 6 }}><SegmentedProgress value={p.usate} total={p.sedute} label={`${p.usate} sedute fatte su ${p.sedute}`} /><span>Ne restano {p.sedute - p.usate} · scade il {dataLunga(p.scadenza)}</span></div>} trailing={<Badge tone={st.tone} icon={st.icon} size="sm">{st.label}</Badge>} />;
          })}</List>}
      </Card>
    </>
  );
}

// ---------- Il centro

function TabCentro({ db }) {
  const c = db.impostazioni.centro;
  const t = oggi();
  const chiusure = (db.impostazioni.chiusure || []).filter(x => x.data >= t && giorniTra(t, x.data) <= 60);
  return (
    <>
      <Card title="Contatti">
        <div className="colonna">
          <KeyValue items={[{ label: 'Indirizzo', value: c.indirizzo }, { label: 'Telefono', value: fTel(c.telefono), mono: true }, { label: 'Email', value: c.email }]} />
          <div className="riga">
            <Button icon="phone" onClick={() => { location.href = `tel:${c.telefono}`; }}>Chiama</Button>
            <Button icon="message-circle" onClick={() => window.open(linkWhatsApp(c.telefono, 'Ciao, '), '_blank', 'noopener')}>WhatsApp</Button>
            <Button icon="map" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.indirizzo)}`, '_blank', 'noopener')}>Mappa</Button>
          </div>
        </div>
      </Card>
      <Card title="Orari">
        <div className="orari">
          {db.impostazioni.orari.map((g, i) => (
            <div key={i} className="riga riga--larga"><span className={i === new Date().getDay() - 1 || (i === 6 && new Date().getDay() === 0) ? 'card-title' : ''}>{GIORNI[i]}</span><span className={g.aperto ? 'num' : 'secondary'}>{g.aperto ? `${g.dalle}–${g.alle}` : 'Chiuso'}</span></div>
          ))}
        </div>
      </Card>
      {chiusure.length > 0 && <Alert tone="neutral" icon="calendar-x" title="Chiusure in arrivo">{chiusure.map(x => `${dataLunga(x.data)} (${x.motivo})`).join(', ')}.</Alert>}
    </>
  );
}
