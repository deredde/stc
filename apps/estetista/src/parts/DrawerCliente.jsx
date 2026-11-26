// Nuova cliente (con «Crea cliente») o modifica (si salva da sola, P5).
import { STC, useState, useEffect, useRef } from '../stc.js';
import { cambia, nuovoId } from '../data/store.js';
import { useAzioni } from './ui.jsx';
import { trova, nomeCliente } from '../lib/dominio.js';
import { oggi, adessoOra } from '../lib/tempo.js';

const { Drawer, Field, TextInput, PhoneInput, DatePicker, Select, TagInput, Textarea, Checkbox, Button, Alert, SaveStatus, useToast } = STC;

export const FONTI = ['Passaparola', 'Instagram', 'Google', 'Facebook', 'Passaggio davanti al centro', 'Regalo', 'Altro'].map(v => ({ value: v, label: v }));
const PELLI = ['Normale', 'Secca', 'Grassa', 'Mista', 'Sensibile'].map(v => ({ value: v, label: v }));
const vuota = p => ({ nome: '', cognome: '', telefono: '', email: '', nascita: '', fonte: 'Passaparola', tag: [], note: '', consensoPrivacy: false, consensoMarketing: false, scheda: { pelle: 'Normale', allergie: '', farmaci: '', controindicazioni: '', note: '' }, ...p });

export function DrawerCliente({ db, stato, onClose }) {
  const toast = useToast();
  const azioni = useAzioni();
  const open = !!stato;
  const esistente = stato?.id ? trova(db.clienti, stato.id) : null;
  const [f, setF] = useState(vuota());
  const [tocco, setTocco] = useState(false);
  const [salvo, setSalvo] = useState(null);
  const timer = useRef();

  useEffect(() => {
    if (!open) return;
    setF(esistente ? structuredClone(esistente) : vuota(stato.preset));
    setTocco(false); setSalvo(null);
  }, [stato]);

  const errori = {
    nome: !f.nome.trim() && 'Scrivi il nome',
    telefono: f.telefono && f.telefono.replace(/\D/g, '').length < 9 && 'Il numero sembra corto: controlla le cifre',
    email: f.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email) && (f.email.includes('@') ? 'Manca la parte dopo il punto, per esempio .it' : 'Manca la @'),
    consenso: !f.consensoPrivacy && 'Serve il consenso al trattamento dei dati per salvare la scheda',
  };
  const doppione = !esistente && f.telefono && db.clienti.find(c => c.telefono && c.telefono.replace(/\D/g, '') === f.telefono.replace(/\D/g, ''));

  // In modifica ogni campo vale subito: si salva mezzo secondo dopo l'ultimo tasto.
  const set = patch => {
    setF(x => {
      const n = { ...x, ...patch };
      if (esistente) {
        clearTimeout(timer.current);
        setSalvo('saving');
        timer.current = setTimeout(() => {
          if (!n.nome.trim()) { setSalvo('error'); return; }
          cambia(d => Object.assign(trova(d.clienti, esistente.id), n));
          setSalvo('saved');
        }, 500);
      }
      return n;
    });
  };
  const setScheda = patch => set({ scheda: { ...f.scheda, ...patch } });

  const crea = () => {
    setTocco(true);
    if (errori.nome || errori.telefono || errori.email || errori.consenso) return;
    const id = nuovoId('cl');
    const annulla = cambia(d => { d.clienti.push({ ...f, id, creato: oggi(), punti: 0 }); });
    toast({ text: `Cliente creata · ${nomeCliente(f)}`, tone: 'success', action: { label: 'Annulla', onClick: annulla } });
    if (stato.dopo) stato.dopo(id);
    else { onClose(); azioni.apriCliente(id); }
  };

  const err = k => (tocco || esistente) && errori[k] ? errori[k] : undefined;

  return (
    <Drawer open={open} onClose={onClose} title={esistente ? 'Modifica cliente' : 'Nuova cliente'} subtitle={esistente ? nomeCliente(esistente) : 'Bastano nome e telefono: il resto lo completi dopo'}
      headerActions={esistente && salvo ? <SaveStatus state={salvo} time={adessoOra()} errorLabel="Il nome non può restare vuoto" /> : null}
      dismissible={esistente ? true : !(f.nome || f.telefono)}
      footer={esistente ? <div className="riga riga--fine"><Button onClick={onClose}>Chiudi</Button></div> : <div className="riga riga--fine"><Button variant="tertiary" onClick={onClose}>Annulla</Button><Button variant="primary" icon="user-plus" onClick={crea}>Crea cliente</Button></div>}>
      <div className="colonna colonna--larga">
        {doppione && <Alert tone="warning" title="C'è già una cliente con questo numero" action={<Button size="card" onClick={() => { onClose(); azioni.apriCliente(doppione.id); }}>Apri {nomeCliente(doppione)}</Button>}>Controlla di non creare un doppione.</Alert>}
        <div className="griglia-campi">
          <Field label="Nome" error={err('nome')}><TextInput value={f.nome} onValue={v => set({ nome: v })} autoFocus invalid={!!err('nome')} /></Field>
          <Field label="Cognome" optional><TextInput value={f.cognome} onValue={v => set({ cognome: v })} /></Field>
          <Field label="Telefono" error={err('telefono')} help="Per i promemoria su WhatsApp"><PhoneInput value={f.telefono} onChange={v => set({ telefono: v })} /></Field>
          <Field label="Email" optional error={err('email')}><TextInput type="email" value={f.email} onValue={v => set({ email: v })} invalid={!!err('email')} /></Field>
          <Field label="Data di nascita" optional help="Per gli auguri di compleanno"><DatePicker value={f.nascita} onChange={v => set({ nascita: v })} max={oggi()} /></Field>
          <Field label="Come ci ha conosciuto"><Select options={FONTI} value={f.fonte} onChange={v => set({ fonte: v })} /></Field>
        </div>
        <Field label="Etichette" optional help="Per esempio VIP, sposa, studentessa. Invio per aggiungerne una."><TagInput value={f.tag} onChange={v => set({ tag: v })} placeholder="Scrivi e premi Invio" /></Field>
        <div className="colonna">
          <span className="overline">Scheda tecnica</span>
          <div className="griglia-campi">
            <Field label="Tipo di pelle"><Select options={PELLI} value={f.scheda.pelle} onChange={v => setScheda({ pelle: v })} /></Field>
            <Field label="Allergie" optional><TextInput value={f.scheda.allergie} onValue={v => setScheda({ allergie: v })} placeholder="Nichel, lattice…" /></Field>
            <Field label="Farmaci" optional><TextInput value={f.scheda.farmaci} onValue={v => setScheda({ farmaci: v })} /></Field>
            <Field label="Controindicazioni" optional><TextInput value={f.scheda.controindicazioni} onValue={v => setScheda({ controindicazioni: v })} /></Field>
          </div>
        </div>
        <Field label="Note" optional><Textarea value={f.note} onValue={v => set({ note: v })} rows={3} placeholder="Preferenze, abitudini, cosa ricordare" /></Field>
        <div className="colonna">
          <Checkbox checked={f.consensoPrivacy} onChange={v => set({ consensoPrivacy: v })} label="Consenso al trattamento dei dati" description="Obbligatorio per la scheda e i dati sanitari (allergie, farmaci)." />
          {err('consenso') && !esistente && <span className="caption" role="alert">{errori.consenso}</span>}
          <Checkbox checked={f.consensoMarketing} onChange={v => set({ consensoMarketing: v })} label="Consenso a offerte e auguri" description="Senza, riceve solo i promemoria degli appuntamenti." />
        </div>
      </div>
    </Drawer>
  );
}
