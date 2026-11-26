import { STC, useState, useEffect, useMemo, useCallback } from './stc.js';
import { useArchivio, carica, ripristinaDemo, sessione, esci } from './data/store.js';
import { useRotta, vai } from './router.js';
import { AzioniCtx, telefono, contiene } from './parts/ui.jsx';
import { nomeCliente, ATTIVI, pacchettoUsabile, segnaliCliente } from './lib/dominio.js';
import { oggi, piuGiorni } from './lib/tempo.js';
import { DrawerAppuntamento } from './parts/DrawerAppuntamento.jsx';
import { DrawerCassa } from './parts/DrawerCassa.jsx';
import { DrawerCliente } from './parts/DrawerCliente.jsx';
import { DialogRicevuta } from './parts/DialogRicevuta.jsx';
import { Oggi } from './pages/Oggi.jsx';
import { Agenda } from './pages/Agenda.jsx';
import { Clienti } from './pages/Clienti.jsx';
import { Cliente } from './pages/Cliente.jsx';
import { Servizi } from './pages/Servizi.jsx';
import { Pacchetti } from './pages/Pacchetti.jsx';
import { Cassa } from './pages/Cassa.jsx';
import { GiftCard } from './pages/GiftCard.jsx';
import { Prodotti } from './pages/Prodotti.jsx';
import { Staff } from './pages/Staff.jsx';
import { Messaggi, daMandare } from './pages/Messaggi.jsx';
import { Report } from './pages/Report.jsx';
import { Impostazioni } from './pages/Impostazioni.jsx';
import { Accesso } from './pages/Accesso.jsx';
import { Prenota } from './pages/Prenota.jsx';

const { AppShell, StatePage, SkeletonLayout, PageBody, Banner, Button, CommandSearch, useToast } = STC;

const PAGINE = {
  oggi: { C: Oggi, scheletro: 'kpi', titolo: 'Oggi' },
  agenda: { C: Agenda, scheletro: 'calendar', titolo: 'Agenda' },
  cassa: { C: Cassa, scheletro: 'table', titolo: 'Cassa' },
  clienti: { C: Clienti, scheletro: 'table', titolo: 'Clienti' },
  cliente: { C: Cliente, scheletro: 'detail', titolo: 'Cliente', voce: 'clienti' },
  pacchetti: { C: Pacchetti, scheletro: 'table', titolo: 'Pacchetti' },
  giftcard: { C: GiftCard, scheletro: 'table', titolo: 'Gift card' },
  messaggi: { C: Messaggi, scheletro: 'list', titolo: 'Promemoria' },
  servizi: { C: Servizi, scheletro: 'table', titolo: 'Servizi' },
  prodotti: { C: Prodotti, scheletro: 'table', titolo: 'Prodotti' },
  staff: { C: Staff, scheletro: 'table', titolo: 'Staff' },
  report: { C: Report, scheletro: 'chart', titolo: 'Report' },
  impostazioni: { C: Impostazioni, scheletro: 'panel', titolo: 'Impostazioni' },
};

function useInRete() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const su = () => setOnline(true), giu = () => setOnline(false);
    window.addEventListener('online', su); window.addEventListener('offline', giu);
    return () => { window.removeEventListener('online', su); window.removeEventListener('offline', giu); };
  }, []);
  return online;
}

export function App() {
  const rotta = useRotta();
  const [utente, setUtente] = useState(sessione);
  useEffect(() => { carica(); }, []);

  // La pagina di prenotazione è pubblica: niente accesso, niente barra del gestionale.
  if (rotta.pagina === 'prenota') return <Prenota />;
  if (!utente) return <Accesso onEntra={setUtente} />;
  return <Gestionale rotta={rotta} onEsci={() => { esci(); setUtente(null); }} />;
}

function Gestionale({ rotta, onEsci }) {
  const archivio = useArchivio();
  const { db, fase } = archivio;
  const toast = useToast();
  const online = useInRete();
  const [tema, setTema] = useState(() => document.documentElement.getAttribute('data-theme') || 'light');
  const [aperto, setAperto] = useState(null); // un overlay alla volta (P8)
  const [cerca, setCerca] = useState(false);
  const [q, setQ] = useState('');
  const [recenti, setRecenti] = useState(() => { try { return JSON.parse(localStorage.getItem('bellezza:recenti')) || []; } catch (e) { return []; } });

  const pagina = PAGINE[rotta.pagina];
  useEffect(() => { document.title = `${pagina?.titolo || 'Pagina'} · ${db?.impostazioni.centro.nome || 'Bellezza'}`; }, [pagina, db?.impostazioni.centro.nome]);

  useEffect(() => {
    const f = e => {
      const t = e.target;
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !(t.closest && t.closest('input, textarea, [contenteditable="true"]'))) { e.preventDefault(); setCerca(true); }
    };
    window.addEventListener('keydown', f);
    return () => window.removeEventListener('keydown', f);
  }, []);

  const cambiaTema = () => {
    const t = tema === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('bellezza:tema', t); } catch (e) {}
    setTema(t);
  };

  const ricorda = useCallback(id => {
    setRecenti(r => {
      const n = [id, ...r.filter(x => x !== id)].slice(0, 6);
      try { localStorage.setItem('bellezza:recenti', JSON.stringify(n)); } catch (e) {}
      return n;
    });
  }, []);

  const azioni = useMemo(() => ({
    nuovoAppuntamento: (preset = {}) => setAperto({ tipo: 'appuntamento', modo: 'nuovo', preset }),
    apriAppuntamento: id => setAperto({ tipo: 'appuntamento', modo: 'vedi', id }),
    modificaAppuntamento: id => setAperto({ tipo: 'appuntamento', modo: 'modifica', id }),
    incassa: (preset = {}) => setAperto({ tipo: 'cassa', preset }),
    nuovoCliente: (preset = {}, dopo) => setAperto({ tipo: 'cliente', preset, dopo }),
    modificaCliente: id => setAperto({ tipo: 'cliente', id }),
    apriRicevuta: id => setAperto({ tipo: 'ricevuta', id }),
    apriCliente: id => { ricorda(id); vai(`cliente/${id}`); },
    chiudi: () => setAperto(null),
    cerca: () => setCerca(true),
  }), [ricorda]);

  const conti = useMemo(() => {
    if (!db) return {};
    const t = oggi();
    return {
      daConfermare: db.appuntamenti.filter(a => a.origine === 'online' && a.stato === 'prenotato' && a.data >= t).length,
      messaggi: db.impostazioni.promemoria.attivo ? daMandare(db).length : 0,
      sottoScorta: db.prodotti.filter(p => p.attivo && p.giacenza <= p.soglia).length,
      inSala: db.appuntamenti.filter(a => a.data === t && a.stato === 'arrivato').length,
    };
  }, [db]);

  const titolare = db?.operatrici[0];
  const sidebar = {
    name: db?.impostazioni.centro.nome || 'Bellezza Studio',
    mark: (db?.impostazioni.centro.nome || 'B')[0],
    active: pagina?.voce || rotta.pagina,
    onNavigate: id => vai(id),
    search: { label: 'Cerca cliente', onClick: () => setCerca(true), shortcut: '/' },
    action: { label: 'Nuovo appuntamento', icon: 'calendar-plus', onClick: () => azioni.nuovoAppuntamento() },
    sections: [
      { title: 'Centro', items: [
        { id: 'oggi', label: 'Oggi', icon: 'layout-dashboard', count: conti.inSala || undefined, countTone: 'primary' },
        { id: 'agenda', label: 'Agenda', icon: 'calendar-days', count: conti.daConfermare || undefined, countTone: 'danger' },
        { id: 'cassa', label: 'Cassa', icon: 'wallet' },
      ] },
      { title: 'Clienti', items: [
        { id: 'clienti', label: 'Clienti', icon: 'users' },
        { id: 'pacchetti', label: 'Pacchetti', icon: 'ticket' },
        { id: 'giftcard', label: 'Gift card', icon: 'gift' },
        { id: 'messaggi', label: 'Promemoria', icon: 'message-circle', count: conti.messaggi || undefined, countTone: 'danger' },
      ] },
      { title: 'Catalogo', items: [
        { id: 'servizi', label: 'Servizi', icon: 'sparkles' },
        { id: 'prodotti', label: 'Prodotti', icon: 'package', dot: conti.sottoScorta > 0 },
      ] },
      { title: 'Gestione', items: [
        { id: 'staff', label: 'Staff', icon: 'contact' },
        { id: 'report', label: 'Report', icon: 'chart-column' },
        { id: 'impostazioni', label: 'Impostazioni', icon: 'settings' },
      ] },
    ],
    user: {
      name: titolare ? `${titolare.nome} ${titolare.cognome}` : 'Titolare',
      role: titolare?.ruolo || 'Titolare',
      menu: [
        { id: 'prenota', label: 'Apri la pagina di prenotazione', icon: 'external-link', onSelect: () => window.open('#/prenota', '_blank') },
        { id: 'tema', label: tema === 'dark' ? 'Passa al tema chiaro' : 'Passa al tema scuro', icon: tema === 'dark' ? 'sun' : 'moon', onSelect: cambiaTema },
        { id: 'esci', label: 'Esci', icon: 'log-out', danger: true, separator: true, onSelect: onEsci },
      ],
    },
    theme: { value: tema, onToggle: cambiaTema },
  };

  const risultati = useMemo(() => {
    if (!db || !q.trim()) return [];
    return db.clienti.filter(c => contiene(q, c.nome, c.cognome, c.telefono, c.email)).slice(0, 8).map(c => {
      const s = segnaliCliente(db, c)[0];
      return { id: c.id, title: nomeCliente(c), meta: <span className="num">{telefono(c.telefono)}</span>, badge: s ? { tone: s.tone, label: s.label } : undefined };
    });
  }, [db, q]);
  const ultimi = useMemo(() => (db ? recenti.map(id => db.clienti.find(c => c.id === id)).filter(Boolean).map(c => ({ id: c.id, title: nomeCliente(c), meta: <span className="num">{telefono(c.telefono)}</span> })) : []), [db, recenti]);

  let corpo;
  if (fase === 'caricamento') corpo = <PageBody><SkeletonLayout kind={pagina?.scheletro || 'table'} label="Carico i dati del centro" /></PageBody>;
  else if (fase === 'errore') corpo = <StatePage kind="error" title="I dati del centro non si sono caricati" text={archivio.errore} action={<div className="riga"><Button onClick={carica} icon="rotate-cw">Riprova</Button><Button onClick={ripristinaDemo}>Ripristina il centro di prova</Button></div>} />;
  else if (!pagina) corpo = <StatePage kind="notfound" title="Questa pagina non c'è" text="Forse l'indirizzo è sbagliato o la pagina è stata spostata." action={<Button onClick={() => vai('oggi')} icon="arrow-left">Torna a Oggi</Button>} />;
  else { const P = pagina.C; corpo = <P db={db} rotta={rotta} />; }

  const banner = !online
    ? <Banner tone="warning" icon="wifi-off" title="Senza rete." action={{ label: 'Riprova', onClick: () => window.location.reload() }}>Puoi continuare a lavorare: i dati sono su questo dispositivo. I messaggi su WhatsApp partono quando torna la connessione.</Banner>
    : archivio.avviso ? <Banner tone="danger" title="Salvataggio non riuscito.">{archivio.avviso}</Banner> : null;

  return (
    <AzioniCtx.Provider value={azioni}>
      <AppShell sidebar={sidebar} banner={banner} mobileTitle={pagina?.titolo}>
        {corpo}
      </AppShell>
      {db && <>
        <DrawerAppuntamento db={db} stato={aperto?.tipo === 'appuntamento' ? aperto : null} onClose={azioni.chiudi} />
        <DrawerCassa db={db} stato={aperto?.tipo === 'cassa' ? aperto : null} onClose={azioni.chiudi} />
        <DrawerCliente db={db} stato={aperto?.tipo === 'cliente' ? aperto : null} onClose={azioni.chiudi} />
        <DialogRicevuta db={db} id={aperto?.tipo === 'ricevuta' ? aperto.id : null} onClose={azioni.chiudi} />
        <CommandSearch
          open={cerca} onClose={() => { setCerca(false); setQ(''); }} query={q} onQuery={setQ}
          results={risultati} recent={ultimi} recentTitle="Aperti di recente" noun="clienti"
          placeholder="Cerca per nome, telefono o email"
          onPick={id => { setCerca(false); setQ(''); azioni.apriCliente(id); }}
          onCreate={testo => { setCerca(false); setQ(''); const [nome, ...resto] = testo.trim().split(/\s+/); azioni.nuovoCliente({ nome, cognome: resto.join(' ') }); }}
          createLabel={t => `Crea «${t}» come nuova cliente`}
          emptyText="Nessuna cliente con questo nome o telefono."
        />
      </>}
    </AzioniCtx.Provider>
  );
}

