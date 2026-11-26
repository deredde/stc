// Impostazioni (pattern Impostazioni): le regole si salvano subito con un toast, i dati all'uscita dal campo.
import { STC, useState, useEffect } from '../stc.js';
import { scarica } from '../parts/ui.jsx';
import { cambia, nuovoId, esporta, importa, ripristinaDemo, svuota } from '../data/store.js';
import { vai } from '../router.js';
import { METODI } from '../lib/dominio.js';
import { oggi, GIORNI, dataLunga } from '../lib/tempo.js';
import { euro } from '../lib/soldi.js';

const { SettingsPage, SettingRow, Card, Field, TextInput, TaxIdInput, PhoneInput, Textarea, Select, Segmented, NumberInput, Switch, TimeRangePicker, DatePicker, Button, IconButton, CopyField, FileDrop, TypeToConfirm, ConfirmDialog, Alert, List, ListRow, EmptyState, useToast } = STC;

const SEZIONI = [
  { id: 'centro', label: 'Il centro', sotto: 'Nome, dati fiscali e contatti. Compaiono sulle ricevute e sulla pagina di prenotazione.' },
  { id: 'orari', label: 'Orari e chiusure', sotto: 'Quando è aperto il centro. Nei giorni chiusi non si prenota, né al banco né online.' },
  { id: 'agenda', label: 'Agenda e cabine', sotto: 'Come si divide la giornata in agenda e quali cabine hai.' },
  { id: 'promemoria', label: 'Promemoria', sotto: 'I messaggi che partono verso le clienti: prima dell\'appuntamento, per il compleanno, per richiamarle.' },
  { id: 'fedelta', label: 'Fedeltà', sotto: 'La tessera punti: quanto si guadagna e quanto vale ogni punto.' },
  { id: 'pagamenti', label: 'Pagamenti', sotto: 'Come possono pagare le clienti alla cassa.' },
  { id: 'online', label: 'Prenotazione online', sotto: 'La pagina dove le clienti prenotano da sole, dal telefono.' },
  { id: 'dati', label: 'Accesso e dati', sotto: 'Chi entra nel gestionale, il backup e il ripristino.' },
];

/** Un campo di testo che si salva quando lo lasci (pattern Impostazioni). */
function CampoSalvato({ valore, onSalva, children }) {
  const [v, setV] = useState(valore ?? '');
  useEffect(() => { setV(valore ?? ''); }, [valore]);
  return <div onBlur={() => { if ((v ?? '') !== (valore ?? '')) onSalva(v); }}>{children(v, setV)}</div>;
}

export function Impostazioni({ db, rotta }) {
  const toast = useToast();
  const sezione = SEZIONI.some(s => s.id === rotta.query.sezione) ? rotta.query.sezione : 'centro';
  const imp = db.impostazioni;
  const sez = SEZIONI.find(s => s.id === sezione);

  /** Ogni modifica passa da qui: salva, conferma con un toast e permette di tornare indietro (C2). */
  const salva = (fn, testo = 'Salvato') => {
    const annulla = cambia(d => fn(d.impostazioni, d));
    toast({ text: testo, tone: 'success', action: { label: 'Annulla', onClick: annulla } });
  };

  const daSistemare = {
    centro: !imp.centro.piva || !imp.centro.telefono,
    pagamenti: !Object.values(imp.pagamenti.metodi).some(Boolean),
  };

  const corpo = {
    centro: <SezCentro imp={imp} salva={salva} />,
    orari: <SezOrari imp={imp} salva={salva} />,
    agenda: <SezAgenda db={db} imp={imp} salva={salva} />,
    promemoria: <SezPromemoria imp={imp} salva={salva} />,
    fedelta: <SezFedelta imp={imp} salva={salva} />,
    pagamenti: <SezPagamenti imp={imp} salva={salva} />,
    online: <SezOnline db={db} imp={imp} salva={salva} />,
    dati: <SezDati db={db} imp={imp} salva={salva} toast={toast} />,
  }[sezione];

  return (
    <SettingsPage header={{ title: 'Impostazioni', subtitle: imp.centro.nome }}
      nav={{ items: SEZIONI.map(s => ({ id: s.id, label: s.label, alert: !!daSistemare[s.id] })), value: sezione, onChange: id => vai(`impostazioni?sezione=${id}`) }}
      title={sez.label} subtitle={sez.sotto}>
      <div className="colonna colonna--larga">{corpo}</div>
    </SettingsPage>
  );
}

function SezCentro({ imp, salva }) {
  const c = imp.centro;
  const campo = (k, label, extra = {}) => (
    <Field label={label} optional={extra.optional} help={extra.help} className={extra.largo ? 'largo-2' : undefined}>
      <CampoSalvato valore={c[k]} onSalva={v => salva(i => { i.centro[k] = typeof v === 'string' ? v.trim() : v; }, `${label} salvato`)}>
        {(v, set) => extra.tel ? <PhoneInput value={v} onChange={set} /> : extra.piva ? <TaxIdInput kind="piva" value={v} onChange={set} /> : <TextInput value={v} onValue={set} type={extra.type} />}
      </CampoSalvato>
    </Field>
  );
  return (
    <>
      {(!c.piva || !c.telefono) && <Alert tone="warning" title="Mancano dei dati">{!c.piva ? 'Scrivi la partita IVA: va sulle ricevute.' : 'Scrivi il telefono: le clienti lo vedono sulla pagina di prenotazione.'}</Alert>}
      <Card title="Dati del centro">
        <div className="griglia-campi">
          {campo('nome', 'Nome del centro', { help: 'Come lo conoscono le clienti' })}
          {campo('ragione', 'Ragione sociale')}
          {campo('piva', 'Partita IVA', { piva: true })}
          {campo('indirizzo', 'Indirizzo')}
          {campo('telefono', 'Telefono', { tel: true })}
          {campo('email', 'Email', { type: 'email' })}
          {campo('sito', 'Sito', { optional: true })}
        </div>
      </Card>
    </>
  );
}

function SezOrari({ imp, salva }) {
  const [nuova, setNuova] = useState({ data: '', motivo: '' });
  const giorno = (i, patch) => salva(x => { Object.assign(x.orari[i], patch); }, `Orari del ${GIORNI[i].toLowerCase()} aggiornati`);
  const chiusure = [...(imp.chiusure || [])].sort((a, b) => a.data.localeCompare(b.data));
  const prossime = chiusure.filter(c => c.data >= oggi());
  const aggiungi = () => {
    if (!nuova.data) return;
    salva(x => { x.chiusure = [...(x.chiusure || []).filter(c => c.data !== nuova.data), { data: nuova.data, motivo: nuova.motivo.trim() || 'Chiusura straordinaria' }]; }, `Chiusura aggiunta · ${dataLunga(nuova.data)}`);
    setNuova({ data: '', motivo: '' });
  };
  return (
    <>
      <Card title="Orari della settimana">
        <div className="colonna">
          {imp.orari.map((g, i) => (
            <div key={i} className="riga riga--larga" style={{ flexWrap: 'nowrap' }}>
              <Switch checked={g.aperto} onChange={v => giorno(i, { aperto: v })} label={GIORNI[i]} />
              {g.aperto ? <TimeRangePicker size="card" value={{ from: g.dalle, to: g.alle }} onChange={v => v && giorno(i, { dalle: v.from, alle: v.to })} from={6} to={23} width={200} /> : <span className="secondary">Chiuso</span>}
            </div>
          ))}
        </div>
      </Card>
      <Card title="Chiusure straordinarie" action={<span className="caption">Ferie, feste, ponti</span>}>
        <div className="colonna">
          {prossime.length === 0
            ? <EmptyState size="sm" illustration="period-empty" title="Nessuna chiusura in programma">Aggiungi i giorni di ferie: l'agenda e la pagina online li bloccano.</EmptyState>
            : <List label="Chiusure in programma">{prossime.map(c => (
              <ListRow key={c.data} title={c.motivo} meta={dataLunga(c.data)}
                trailing={<IconButton icon="trash-2" label={`Togli la chiusura del ${dataLunga(c.data)}`} onClick={() => salva(x => { x.chiusure = x.chiusure.filter(y => y.data !== c.data); }, `Chiusura tolta · ${dataLunga(c.data)}`)} />} />
            ))}</List>}
          <div className="griglia-campi">
            <Field label="Giorno"><DatePicker value={nuova.data} onChange={v => setNuova(n => ({ ...n, data: v }))} min={oggi()} /></Field>
            <Field label="Motivo" optional><TextInput value={nuova.motivo} onValue={v => setNuova(n => ({ ...n, motivo: v }))} placeholder="Per esempio: ferie" /></Field>
          </div>
          <div><Button icon="calendar-x" onClick={aggiungi} disabled={!nuova.data}>Aggiungi la chiusura</Button></div>
        </div>
      </Card>
    </>
  );
}

function SezAgenda({ db, imp, salva }) {
  const a = imp.agenda;
  const ore = Array.from({ length: 18 }, (_, i) => i + 6).map(h => ({ value: String(h), label: `${String(h).padStart(2, '0')}:00` }));
  const usate = id => db.appuntamenti.some(x => x.cabinaId === id && x.data >= oggi()) || db.servizi.some(s => s.cabinaId === id);
  return (
    <>
      <Card title="La giornata in agenda">
        <div className="griglia-campi">
          <Field label="Passo dell'agenda" help="Ogni quanto si può iniziare un trattamento">
            <Select options={[10, 15, 20, 30].map(n => ({ value: String(n), label: `${n} minuti` }))} value={String(a.passo)} onChange={v => salva(x => { x.agenda.passo = Number(v); }, 'Passo dell\'agenda aggiornato')} />
          </Field>
          <Field label="Pausa tra due clienti" help="Per riordinare la cabina">
            <Select options={[0, 5, 10, 15].map(n => ({ value: String(n), label: n ? `${n} minuti` : 'Nessuna' }))} value={String(a.pausa || 0)} onChange={v => salva(x => { x.agenda.pausa = Number(v); }, 'Pausa aggiornata')} />
          </Field>
          <Field label="L'agenda mostra dalle"><Select options={ore} value={String(a.dalle)} onChange={v => salva(x => { x.agenda.dalle = Number(v); }, 'Agenda aggiornata')} /></Field>
          <Field label="Alle"><Select options={ore} value={String(a.alle)} onChange={v => salva(x => { x.agenda.alle = Number(v); }, 'Agenda aggiornata')} /></Field>
        </div>
      </Card>
      <Card title="Cabine e postazioni" action={<Button size="card" icon="plus" onClick={() => salva((x, d) => { d.cabine.push({ id: nuovoId('cab'), nome: `Cabina ${d.cabine.length + 1}` }); }, 'Cabina aggiunta')}>Aggiungi cabina</Button>}>
        <div className="colonna">
          {db.cabine.map(c => (
            <div key={c.id} className="riga riga--larga" style={{ flexWrap: 'nowrap' }}>
              <div style={{ flex: 1 }}>
                <CampoSalvato valore={c.nome} onSalva={v => v.trim() && salva((x, d) => { d.cabine.find(y => y.id === c.id).nome = v.trim(); }, 'Nome della cabina salvato')}>
                  {(v, set) => <TextInput value={v} onValue={set} aria-label={`Nome di ${c.nome}`} />}
                </CampoSalvato>
              </div>
              <IconButton icon="trash-2" label={usate(c.id) ? `${c.nome} è usata da servizi o appuntamenti` : `Togli ${c.nome}`} disabled={usate(c.id)}
                onClick={() => salva((x, d) => { d.cabine = d.cabine.filter(y => y.id !== c.id); }, `Tolta · ${c.nome}`)} />
            </div>
          ))}
          <span className="caption">Una cabina usata da un servizio o da un appuntamento futuro non si toglie: prima sposta il servizio su un'altra.</span>
        </div>
      </Card>
    </>
  );
}

function Testo({ valore, onSalva, help }) {
  return (
    <Field label="Testo del messaggio" help={help}>
      <CampoSalvato valore={valore} onSalva={onSalva}>{(v, set) => <Textarea value={v} onValue={set} rows={3} />}</CampoSalvato>
    </Field>
  );
}

function SezPromemoria({ imp, salva }) {
  const p = imp.promemoria;
  const set = (patch, testo) => salva(x => { Object.assign(x.promemoria, patch); }, testo);
  return (
    <>
      <SettingRow title="Manda il promemoria prima dell'appuntamento" description="Ogni mattina trovi in Promemoria i messaggi pronti per le clienti dei giorni dopo." checked={p.attivo} onChange={v => set({ attivo: v }, v ? 'Promemoria accesi' : 'Promemoria spenti')} />
      {p.attivo && <Card title="Il promemoria">
        <div className="colonna">
          <div className="griglia-campi">
            <Field label="Quando"><Select options={[{ value: '1', label: 'Il giorno prima' }, { value: '2', label: 'Due giorni prima' }, { value: '3', label: 'Tre giorni prima' }]} value={String(p.anticipo)} onChange={v => set({ anticipo: Number(v) }, 'Anticipo aggiornato')} /></Field>
            <Field label="Con"><Segmented size="form" full value={p.canale} onChange={v => set({ canale: v }, `Promemoria su ${v === 'sms' ? 'SMS' : 'WhatsApp'}`)} options={[{ value: 'whatsapp', label: 'WhatsApp' }, { value: 'sms', label: 'SMS' }]} label="Canale" /></Field>
          </div>
          <Testo valore={p.testo} onSalva={v => set({ testo: v }, 'Testo del promemoria salvato')} help="Puoi usare {nome}, {giorno}, {ora}, {servizio}, {centro}" />
        </div>
      </Card>}
      <SettingRow title="Conferma l'appuntamento appena lo fissi" description="Nella scheda dell'appuntamento compare il messaggio di conferma da mandare." checked={p.conferma} onChange={v => set({ conferma: v }, v ? 'Conferme accese' : 'Conferme spente')} />
      {p.conferma && <Card><Testo valore={p.testoConferma} onSalva={v => set({ testoConferma: v }, 'Testo della conferma salvato')} help="Puoi usare {nome}, {giorno}, {ora}, {servizio}, {centro}" /></Card>}
      <SettingRow title="Fai gli auguri di compleanno" description="Solo alle clienti che hanno dato il consenso ai messaggi promozionali." checked={p.compleanno} onChange={v => set({ compleanno: v }, v ? 'Auguri accesi' : 'Auguri spenti')} />
      {p.compleanno && <Card><Testo valore={p.testoCompleanno} onSalva={v => set({ testoCompleanno: v }, 'Testo degli auguri salvato')} help="Puoi usare {nome}, {centro}" /></Card>}
      <SettingRow title="Richiama chi non viene da tempo" description="Propone un messaggio alle clienti senza appuntamenti fissati dopo l'ultima visita." checked={p.richiamo} onChange={v => set({ richiamo: v }, v ? 'Richiami accesi' : 'Richiami spenti')} />
      {p.richiamo && <Card>
        <div className="colonna">
          <Field label="Dopo quanti giorni dall'ultima visita"><NumberInput value={p.giorniRichiamo} onChange={v => v && set({ giorniRichiamo: v }, 'Giorni del richiamo aggiornati')} min={15} max={365} step={5} unit="giorni" stepLabel="di 5 giorni" /></Field>
          <Testo valore={p.testoRichiamo} onSalva={v => set({ testoRichiamo: v }, 'Testo del richiamo salvato')} help="Puoi usare {nome}, {centro}" />
        </div>
      </Card>}
    </>
  );
}

function SezFedelta({ imp, salva }) {
  const f = imp.fedelta;
  const set = (patch, testo) => salva(x => { Object.assign(x.fedelta, patch); }, testo);
  return (
    <>
      <SettingRow title="Dai i punti a ogni pagamento" description="Le clienti accumulano punti e li usano come sconto alla cassa." checked={f.attiva} onChange={v => set({ attiva: v }, v ? 'Tessera punti accesa' : 'Tessera punti spenta')} />
      {f.attiva && <Card title="Come funziona la tessera">
        <div className="colonna">
          <div className="griglia-campi">
            <Field label="Nome della tessera">
              <CampoSalvato valore={f.nome} onSalva={v => v.trim() && set({ nome: v.trim() }, 'Nome della tessera salvato')}>{(v, s) => <TextInput value={v} onValue={s} />}</CampoSalvato>
            </Field>
            <Field label="Punti per ogni euro speso"><NumberInput value={f.puntiPerEuro} onChange={v => v && set({ puntiPerEuro: v }, 'Punti per euro aggiornati')} min={1} max={10} /></Field>
            <Field label="Valore di un punto" help="In centesimi di sconto"><NumberInput value={f.valorePunto} onChange={v => v && set({ valorePunto: v }, 'Valore del punto aggiornato')} min={1} max={100} unit="cent" /></Field>
            <Field label="Punti minimi per usarli"><NumberInput value={f.minimoRiscatto} onChange={v => v != null && set({ minimoRiscatto: v }, 'Minimo aggiornato')} min={0} max={5000} step={50} stepLabel="di 50 punti" /></Field>
          </div>
          <Alert tone="info" icon="sparkles" title="Per esempio">Chi spende {euro(10000)} guadagna {100 * f.puntiPerEuro} punti, che valgono {euro(100 * f.puntiPerEuro * f.valorePunto)} di sconto. Si possono usare da {f.minimoRiscatto} punti in su.</Alert>
        </div>
      </Card>}
    </>
  );
}

function SezPagamenti({ imp, salva }) {
  const m = imp.pagamenti.metodi;
  const accesi = Object.values(m).filter(Boolean).length;
  return (
    <>
      {accesi === 0 && <Alert tone="danger" title="Nessun metodo di pagamento acceso">Accendine almeno uno: senza, la cassa non incassa.</Alert>}
      {METODI.map(x => (
        <SettingRow key={x.value} title={`Accetta ${x.label.toLowerCase()}`} description={{ carta: 'Bancomat e carte di credito, con il tuo POS.', contanti: 'In cassa calcola il resto da dare.', satispay: 'Dall\'app della cliente al tuo profilo Satispay.', bonifico: 'Utile per i pacchetti più costosi.' }[x.value]}
          checked={!!m[x.value]} disabled={m[x.value] && accesi === 1} onChange={v => salva(i => { i.pagamenti.metodi[x.value] = v; }, `${x.label} ${v ? 'acceso' : 'spento'}`)} />
      ))}
      <Card title="Ricevute">
        <div className="griglia-campi">
          <Field label="IVA di serie sui servizi"><Select options={[{ value: '22', label: '22 %' }, { value: '10', label: '10 %' }, { value: '4', label: '4 %' }, { value: '0', label: 'Esente' }]} value={String(imp.pagamenti.iva)} onChange={v => salva(i => { i.pagamenti.iva = Number(v); }, 'IVA aggiornata')} /></Field>
          <Field label="Ultima ricevuta"><TextInput value={`${new Date().getFullYear()}/${String(imp.numeroRicevuta || 0).padStart(4, '0')}`} readOnly /></Field>
        </div>
      </Card>
      <span className="caption">Le ricevute del gestionale non sono documenti fiscali: lo scontrino o la fattura li fa il registratore telematico o il tuo programma di fatturazione.</span>
    </>
  );
}

function SezOnline({ db, imp, salva }) {
  const o = imp.online;
  const set = (patch, testo) => salva(x => { Object.assign(x.online, patch); }, testo);
  const link = `${location.origin}${location.pathname}#/prenota`;
  const online = db.servizi.filter(s => s.attivo && s.online).length;
  return (
    <>
      <SettingRow title="Fai prenotare le clienti da sole" description="Dalla pagina online scelgono servizio, giorno e ora tra gli spazi liberi." checked={o.attiva} onChange={v => set({ attiva: v }, v ? 'Prenotazione online accesa' : 'Prenotazione online spenta')} />
      {o.attiva && <>
        <Card title="Il link da condividere" action={<Button size="card" icon="external-link" onClick={() => window.open(link, '_blank', 'noopener')}>Apri la pagina</Button>}>
          <div className="colonna">
            <CopyField value={link} copyLabel="Copia il link" copiedLabel="Link copiato" />
            <span className="caption">Mettilo nella bio di Instagram, su Google e nella risposta automatica di WhatsApp.</span>
          </div>
        </Card>
        <Card title="Regole">
          <div className="colonna">
            <div className="griglia-campi">
              <Field label="Prenotano con almeno" help="Prima dell'appuntamento"><Select options={[1, 2, 4, 12, 24, 48].map(n => ({ value: String(n), label: n < 24 ? `${n} ${n === 1 ? 'ora' : 'ore'}` : `${n / 24} ${n === 24 ? 'giorno' : 'giorni'}` }))} value={String(o.anticipoOre)} onChange={v => set({ anticipoOre: Number(v) }, 'Anticipo aggiornato')} /></Field>
              <Field label="Fino a" help="Quanto avanti si vede l'agenda"><Select options={[14, 30, 60, 90].map(n => ({ value: String(n), label: `${n} giorni` }))} value={String(o.giorni)} onChange={v => set({ giorni: Number(v) }, 'Giorni aggiornati')} /></Field>
            </div>
            <Field label="Gli appuntamenti online">
              <Segmented size="form" full value={o.conferma} onChange={v => set({ conferma: v }, v === 'manuale' ? 'Li confermi tu' : 'Si confermano da soli')} label="Conferma" options={[{ value: 'manuale', label: 'Li confermo io' }, { value: 'automatica', label: 'Si confermano da soli' }]} />
            </Field>
            <Field label="Frase in cima alla pagina">
              <CampoSalvato valore={o.messaggio} onSalva={v => set({ messaggio: v.trim() }, 'Frase salvata')}>{(v, s) => <Textarea value={v} onValue={s} rows={2} />}</CampoSalvato>
            </Field>
          </div>
        </Card>
        <Alert tone="neutral" icon="sparkles" title={`${online} servizi prenotabili online`} action={<Button size="card" onClick={() => vai('servizi')}>Vai ai servizi</Button>}>Scegli quali mostrare dalla scheda di ogni servizio.</Alert>
      </>}
    </>
  );
}

function SezDati({ db, imp, salva, toast }) {
  const [demo, setDemo] = useState(false);
  const [vuoto, setVuoto] = useState(false);
  const [errore, setErrore] = useState(null);
  const backup = () => {
    scarica(`backup-${imp.centro.nome.toLowerCase().replace(/\W+/g, '-')}-${oggi()}.json`, esporta(), 'application/json');
    toast({ text: 'Backup scaricato', tone: 'success' });
  };
  const carica = async files => {
    const f = files[0];
    if (!f) return;
    const e = importa(await f.text());
    setErrore(e);
    if (!e) toast({ text: `Backup caricato · ${f.name}`, tone: 'success' });
  };
  return (
    <>
      <Card title="Accesso">
        <div className="colonna">
          <Field label="Email per entrare" help="La password del centro di prova è «bellezza»">
            <CampoSalvato valore={imp.accesso.email} onSalva={v => v.includes('@') && salva(i => { i.accesso.email = v.trim().toLowerCase(); }, 'Email di accesso salvata')}>{(v, s) => <TextInput type="email" value={v} onValue={s} autoComplete="email" />}</CampoSalvato>
          </Field>
          <span className="caption">I dati restano su questo dispositivo. Per usare il gestionale da più dispositivi, con una password per ogni operatrice, serve collegarlo a un server.</span>
        </div>
      </Card>
      <Card title="Backup">
        <div className="colonna">
          <div className="riga"><Button icon="download" onClick={backup}>Scarica il backup</Button><span className="caption">{db.clienti.length} clienti · {db.appuntamenti.length} appuntamenti · {db.vendite.length} pagamenti</span></div>
          {errore && <Alert tone="danger" title="Backup non caricato">{errore}</Alert>}
          <FileDrop title="Carica un backup" text="Il file .json scaricato da qui. Prende il posto dei dati di adesso." accept=".json,application/json" onFiles={carica} icon="upload" chooseLabel="Scegli il file" />
        </div>
      </Card>
      <Card title="Ripartire da capo">
        <div className="colonna">
          <div className="riga riga--larga"><span className="secondary">Rimetti i dati di prova di Bellezza Studio, per provare senza paura.</span><Button icon="rotate-ccw" onClick={() => setDemo(true)}>Ripristina il centro di prova</Button></div>
          <div className="divisore" />
          <div className="riga riga--larga"><span className="secondary">Tieni servizi, staff e impostazioni, togli clienti, appuntamenti e pagamenti.</span><Button variant="danger" icon="trash-2" onClick={() => setVuoto(true)}>Svuota l'archivio</Button></div>
        </div>
      </Card>
      <ConfirmDialog open={demo} onClose={() => setDemo(false)} danger icon="rotate-ccw" title="Ripristinare il centro di prova?"
        description="I dati di adesso lasciano il posto a quelli di prova. Scarica prima il backup, se ti servono." confirmLabel="Ripristina" cancelLabel="Non ripristinare"
        onConfirm={() => { ripristinaDemo(); setDemo(false); toast({ text: 'Centro di prova ripristinato', tone: 'success' }); }} />
      <TypeToConfirm open={vuoto} onClose={() => setVuoto(false)} title="Svuotare l'archivio?" confirmText={imp.centro.nome} confirmLabel="Svuota l'archivio" cancelLabel="Non svuotare"
        description={`Spariscono ${db.clienti.length} clienti, ${db.appuntamenti.length} appuntamenti e ${db.vendite.length} pagamenti. Non si può disfare.`}
        onConfirm={() => { svuota(); setVuoto(false); toast({ text: 'Archivio svuotato' }); }} />
    </>
  );
}
