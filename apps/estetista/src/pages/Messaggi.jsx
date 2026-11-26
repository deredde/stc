// Promemoria e messaggi: cosa c'è da mandare oggi (promemoria, auguri, richiami) e cosa è partito.
import { STC, useState, useMemo } from '../stc.js';
import { useAzioni, telefono } from '../parts/ui.jsx';
import { cambia, nuovoId } from '../data/store.js';
import { vai } from '../router.js';
import { trova, nomeCliente, componi, linkWhatsApp, linkSms, numeriCliente, ATTIVI } from '../lib/dominio.js';
import { oggi, piuGiorni, dataLunga, compleannoTra, adessoOra, data as fData } from '../lib/tempo.js';

const { PageHeader, PageBody, Card, List, ListRow, Button, Menu, Badge, Avatar, EmptyState, Alert, TextLink, Table, Segmented, useToast } = STC;

/** Tutto ciò che aspetta di partire oggi. Serve anche al contatore della barra laterale. */
export function daMandare(db, rif = oggi()) {
  const p = db.impostazioni.promemoria;
  const out = [];
  if (!p.attivo) return out;
  const giorno = piuGiorni(rif, p.anticipo || 1);
  const saltati = new Set(db.messaggi.filter(m => m.saltato).map(m => m.chiave));
  for (const a of db.appuntamenti.filter(a => a.data > rif && a.data <= giorno && ATTIVI.includes(a.stato) && !a.promemoria)) {
    const c = trova(db.clienti, a.clienteId);
    if (!c?.telefono) continue;
    const s = trova(db.servizi, a.servizioId);
    out.push({ chiave: `p-${a.id}`, tipo: 'promemoria', cliente: c, appuntamento: a, titolo: nomeCliente(c), meta: `${s?.nome} · ${dataLunga(a.data)} alle ${a.inizio}`, testo: componi(p.testo, { nome: c.nome, giorno: a.data === piuGiorni(rif, 1) ? 'domani' : dataLunga(a.data), ora: a.inizio, servizio: s?.nome || '', centro: db.impostazioni.centro.nome }) });
  }
  const anno = rif.slice(0, 4);
  if (p.compleanno) for (const c of db.clienti) {
    if (!c.consensoMarketing || !c.telefono) continue;
    const tra = compleannoTra(c.nascita, 0, rif);
    const chiave = `c-${c.id}-${anno}`;
    if (tra === 0 && !db.messaggi.some(m => m.chiave === chiave)) out.push({ chiave, tipo: 'compleanno', cliente: c, titolo: nomeCliente(c), meta: 'Compie gli anni oggi', testo: componi(p.testoCompleanno, { nome: c.nome, centro: db.impostazioni.centro.nome }) });
  }
  if (p.richiamo) for (const c of db.clienti) {
    if (!c.consensoMarketing || !c.telefono) continue;
    const n = numeriCliente(db, c.id, rif);
    if (n.giorniDaUltima == null || n.giorniDaUltima < p.giorniRichiamo || n.prossimo) continue;
    const chiave = `r-${c.id}-${n.ultima}`;
    if (db.messaggi.some(m => m.chiave === chiave)) continue;
    out.push({ chiave, tipo: 'richiamo', cliente: c, titolo: nomeCliente(c), meta: `Ultima visita ${n.giorniDaUltima} giorni fa`, testo: componi(p.testoRichiamo, { nome: c.nome, centro: db.impostazioni.centro.nome }) });
  }
  return out.filter(m => !saltati.has(m.chiave));
}

const TIPI = { promemoria: { label: 'Promemoria', icon: 'bell', tone: 'info' }, compleanno: { label: 'Auguri', icon: 'cake', tone: 'accent' }, richiamo: { label: 'Richiamo', icon: 'repeat', tone: 'warning' }, conferma: { label: 'Conferma', icon: 'calendar-check', tone: 'info' }, manuale: { label: 'Messaggio', icon: 'message-circle', tone: 'neutral' } };

export function Messaggi({ db }) {
  const toast = useToast();
  const azioni = useAzioni();
  const [vista, setVista] = useState('da');
  const [filtro, setFiltro] = useState('tutti');
  const lista = useMemo(() => daMandare(db), [db]);
  const p = db.impostazioni.promemoria;
  const visibili = lista.filter(m => filtro === 'tutti' || m.tipo === filtro);

  const registra = (m, canale, saltato = false) => cambia(d => {
    if (m.appuntamento && !saltato) trova(d.appuntamenti, m.appuntamento.id).promemoria = { inviato: `${oggi()}T${adessoOra()}` };
    d.messaggi.push({ id: nuovoId('ms'), chiave: m.chiave, tipo: m.tipo, clienteId: m.cliente.id, appuntamentoId: m.appuntamento?.id, canale, testo: m.testo, data: oggi(), ora: adessoOra(), saltato });
  });
  const manda = (m, canale = p.canale) => {
    window.open(canale === 'sms' ? linkSms(m.cliente.telefono, m.testo) : linkWhatsApp(m.cliente.telefono, m.testo), '_blank', 'noopener');
    const annulla = registra(m, canale);
    toast({ text: `${TIPI[m.tipo].label} pronto su ${canale === 'sms' ? 'SMS' : 'WhatsApp'} · ${m.titolo}`, tone: 'success', action: { label: 'Annulla', onClick: annulla } });
  };
  const salta = m => {
    const annulla = registra(m, 'nessuno', true);
    toast({ text: `Saltato · ${m.titolo}`, action: { label: 'Annulla', onClick: annulla } });
  };

  const mandati = db.messaggi.filter(m => !m.saltato).sort((a, b) => (b.data + b.ora).localeCompare(a.data + a.ora));

  return (
    <>
      <PageHeader title="Promemoria" subtitle={`${lista.length} messaggi da mandare oggi · ${mandati.filter(m => m.data === oggi()).length} già partiti`}
        actions={<Button icon="settings" onClick={() => vai('impostazioni?sezione=promemoria')}>Testi e regole</Button>}
        tabs={{ value: vista, onChange: setVista, items: [{ id: 'da', label: 'Da mandare', count: lista.length }, { id: 'mandati', label: 'Mandati' }] }} />
      <PageBody>
        {!p.attivo && <Alert tone="neutral" title="I promemoria sono spenti" action={<TextLink onClick={() => vai('impostazioni?sezione=promemoria')}>Accendili</TextLink>}>Le clienti non ricevono più il messaggio prima dell'appuntamento.</Alert>}
        {vista === 'da' ? (
          <Card flush title="Da mandare oggi" action={<Segmented size="card" value={filtro} onChange={setFiltro} label="Tipo" options={[{ value: 'tutti', label: 'Tutti' }, { value: 'promemoria', label: 'Promemoria' }, { value: 'compleanno', label: 'Auguri' }, { value: 'richiamo', label: 'Richiami' }]} />}>
            {visibili.length === 0
              ? <EmptyState illustration="all-done" title="Hai mandato tutto" >I promemoria del giorno dopo, gli auguri e i richiami compaiono qui ogni mattina.</EmptyState>
              : <List label="Messaggi da mandare">
                {visibili.map(m => (
                  <ListRow key={m.chiave} leading={<Avatar name={m.titolo} size={40} />}
                    title={<span className="riga">{m.titolo}<Badge tone={TIPI[m.tipo].tone} size="sm" icon={TIPI[m.tipo].icon}>{TIPI[m.tipo].label}</Badge></span>}
                    meta={<div className="colonna" style={{ gap: 2 }}><span>{m.meta} · <span className="num">{telefono(m.cliente.telefono)}</span></span><span className="caption">{m.testo}</span></div>}
                    trailing={<div className="riga">
                      <Button size="row" icon="message-circle" onClick={() => manda(m)}>Manda</Button>
                      <Menu items={[
                        { id: 'sms', label: 'Manda come SMS', icon: 'smartphone', onSelect: () => manda(m, 'sms') },
                        { id: 'cliente', label: 'Apri la scheda cliente', icon: 'id-card', onSelect: () => azioni.apriCliente(m.cliente.id) },
                        m.appuntamento && { id: 'app', label: 'Apri l\'appuntamento', icon: 'calendar', onSelect: () => azioni.apriAppuntamento(m.appuntamento.id) },
                        { id: 'salta', label: 'Salta per oggi', icon: 'skip-forward', separator: true, onSelect: () => salta(m) },
                      ].filter(Boolean)} />
                    </div>} />
                ))}
              </List>}
          </Card>
        ) : (
          <Table label="Messaggi mandati" rows={mandati.slice(0, 200)} rowKey={m => m.id} onRowClick={m => azioni.apriCliente(m.clienteId)}
            columns={[
              { key: 'quando', label: 'Quando', width: 'minmax(0, 1fr)', render: m => <span className="num">{fData(m.data)} · {m.ora}</span> },
              { key: 'cliente', label: 'Cliente', width: 'minmax(0, 1.6fr)', render: m => nomeCliente(trova(db.clienti, m.clienteId)) },
              { key: 'tipo', label: 'Tipo', width: 'minmax(0, 1fr)', render: m => { const t = TIPI[m.tipo] || TIPI.manuale; return <Badge tone={t.tone} size="sm" icon={t.icon}>{t.label}</Badge>; } },
              { key: 'canale', label: 'Canale', width: 'minmax(0, .8fr)', hideOnMobile: true, render: m => m.canale === 'sms' ? 'SMS' : 'WhatsApp' },
              { key: 'testo', label: 'Testo', width: 'minmax(0, 3fr)', hideOnMobile: true, render: m => <span className="caption">{m.testo}</span> },
            ]}
            empty={<EmptyState illustration="inbox-empty" title="Nessun messaggio mandato ancora">Ogni promemoria, augurio o richiamo che mandi resta scritto qui.</EmptyState>} />
        )}
        <span className="caption">I messaggi si aprono già scritti in WhatsApp (o negli SMS) del dispositivo: tocchi «Invia» e passi al successivo. L'invio automatico, senza tocchi, arriva collegando un servizio di messaggi.</span>
      </PageBody>
    </>
  );
}
