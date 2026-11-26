// La giornata del centro: chi arriva, cosa c'è da fare, quanto si è incassato.
import { STC, useMemo } from '../stc.js';
import { useAzioni, Euro, StatoAppuntamento, TagOperatrice } from '../parts/ui.jsx';
import { cambia } from '../data/store.js';
import { vai } from '../router.js';
import { trova, nomeCliente, fine, ATTIVI, statoPacchetto } from '../lib/dominio.js';
import { oggi, piuGiorni, inizioSettimana, dataLunga, adessoOra, minuti, eta, compleannoTra, giorniTra, data as fData } from '../lib/tempo.js';
import { euro } from '../lib/soldi.js';
import { daMandare } from './Messaggi.jsx';

const { PageHeader, PageBody, StatTile, Card, List, ListRow, Button, Alert, TextLink, EmptyState, Avatar, Badge, Delta, IconButton, useToast } = STC;

export function Oggi({ db }) {
  const azioni = useAzioni();
  const toast = useToast();
  const t = oggi();
  const adesso = minuti(adessoOra());

  const n = useMemo(() => {
    const app = db.appuntamenti.filter(a => a.data === t && a.stato !== 'annullato').sort((a, b) => a.inizio.localeCompare(b.inizio));
    const incassi = db.vendite.filter(v => v.data === t && v.stato === 'pagata');
    const settimana = inizioSettimana(t);
    const inc = (da, a) => db.vendite.filter(v => v.stato === 'pagata' && v.data >= da && v.data <= a).reduce((s, v) => s + v.totale, 0);
    const giorniPassati = giorniTra(settimana, t);
    const questa = inc(settimana, t), scorsa = inc(piuGiorni(settimana, -7), piuGiorni(settimana, -7 + giorniPassati));
    const prossimo = app.find(a => ATTIVI.includes(a.stato) && a.stato !== 'arrivato' && minuti(a.inizio) >= adesso - 10);
    const inSala = app.filter(a => a.stato === 'arrivato');
    const daIncassare = app.filter(a => (a.stato === 'completato' && !a.venditaId) || (a.stato === 'arrivato' && minuti(a.inizio) + a.durata <= adesso));
    const online = db.appuntamenti.filter(a => a.origine === 'online' && a.stato === 'prenotato' && a.data >= t);
    const scorte = db.prodotti.filter(p => p.attivo && p.giacenza <= p.soglia);
    const compleanni = db.clienti.map(c => ({ c, tra: compleannoTra(c.nascita, 7, t) })).filter(x => x.tra != null).sort((a, b) => a.tra - b.tra);
    const inScadenza = db.pacchettiClienti.filter(p => ['scadenza', 'ultima'].includes(statoPacchetto(p, t).codice)).slice(0, 5);
    return { app, incassi, questa, scorsa, prossimo, inSala, daIncassare, online, scorte, compleanni, inScadenza, messaggi: daMandare(db) };
  }, [db, t]);

  const incassato = n.incassi.reduce((s, v) => s + v.totale, 0);
  const fatti = n.app.filter(a => a.stato === 'completato').length;
  const delta = n.scorsa ? Math.round((n.questa - n.scorsa) / n.scorsa * 100) : null;

  const segnaArrivata = a => {
    const annulla = cambia(d => { trova(d.appuntamenti, a.id).stato = 'arrivato'; });
    toast({ text: `In sala · ${nomeCliente(trova(db.clienti, a.clienteId))}`, tone: 'success', action: { label: 'Annulla', onClick: annulla } });
  };

  return (
    <>
      <PageHeader title="Oggi" subtitle={`${dataLunga(t).replace(/^./, s => s.toUpperCase())} · ${n.app.length} appuntamenti · ${n.inSala.length} in sala`}
        actions={<><Button icon="wallet" onClick={() => azioni.incassa()}>Incassa</Button><Button variant="primary" icon="calendar-plus" onClick={() => azioni.nuovoAppuntamento()}>Nuovo appuntamento</Button></>} />
      <PageBody>
        {n.online.length > 0 && <Alert tone="info" icon="globe" title={`${n.online.length} ${n.online.length === 1 ? 'prenotazione online da confermare' : 'prenotazioni online da confermare'}`} action={<TextLink onClick={() => azioni.apriAppuntamento(n.online[0].id)}>Apri la prima</TextLink>}>Le clienti aspettano la tua conferma. Le trovi anche in Agenda con il segno «Da confermare».</Alert>}
        {n.daIncassare.length > 0 && <Alert tone="warning" icon="wallet" title={`${n.daIncassare.length} ${n.daIncassare.length === 1 ? 'trattamento finito da incassare' : 'trattamenti finiti da incassare'}`} action={<TextLink onClick={() => azioni.incassa({ clienteId: n.daIncassare[0].clienteId, appuntamenti: [n.daIncassare[0].id] })}>Incassa {nomeCliente(trova(db.clienti, n.daIncassare[0].clienteId))}</TextLink>}>Chiudi il conto prima che la cliente vada via.</Alert>}

        <div className="griglia-4">
          <StatTile title="Incassato oggi" value={euro(incassato)} icon="wallet" note={`${n.incassi.length} ${n.incassi.length === 1 ? 'pagamento' : 'pagamenti'}`} onClick={() => vai('cassa')} />
          <StatTile title="Appuntamenti" value={`${fatti} di ${n.app.length}`} icon="calendar-days" note={`${n.app.filter(a => ATTIVI.includes(a.stato)).length} ancora da fare`} onClick={() => vai('agenda')} />
          <StatTile title="Prossima cliente" value={n.prossimo ? n.prossimo.inizio : '—'} icon="clock" note={n.prossimo ? `${nomeCliente(trova(db.clienti, n.prossimo.clienteId))} · ${trova(db.servizi, n.prossimo.servizioId)?.nome}` : 'Per oggi hai finito'} onClick={n.prossimo ? () => azioni.apriAppuntamento(n.prossimo.id) : undefined} />
          <StatTile title="Questa settimana" value={euro(n.questa)} icon="trending-up" note={delta == null ? 'Nessun confronto con la scorsa' : <span className="riga"><Delta value={delta} suffix=" %" /> rispetto allo stesso punto della scorsa</span>} onClick={() => vai('report')} />
        </div>

        <div className="griglia-3" style={{ alignItems: 'start' }}>
          <div className="largo-2">
            <Card flush title="Agenda di oggi" action={<TextLink onClick={() => vai('agenda')}>Tutta l'agenda</TextLink>}>
              {n.app.length === 0
                ? <EmptyState illustration="today-empty" title="Nessun appuntamento oggi" action={<Button variant="secondary" icon="calendar-plus" onClick={() => azioni.nuovoAppuntamento()}>Fissa un appuntamento</Button>}>Gli appuntamenti di oggi compaiono qui, in ordine di orario.</EmptyState>
                : <List label="Appuntamenti di oggi">
                  {n.app.map(a => {
                    const cli = trova(db.clienti, a.clienteId), s = trova(db.servizi, a.servizioId), op = trova(db.operatrici, a.operatriceId);
                    let azione = null;
                    if (['prenotato', 'confermato'].includes(a.stato)) azione = <Button size="row" icon="armchair" onClick={e => { e.stopPropagation(); segnaArrivata(a); }}>Arrivata</Button>;
                    else if (a.stato === 'arrivato' || (a.stato === 'completato' && !a.venditaId)) azione = <Button size="row" icon="wallet" onClick={e => { e.stopPropagation(); azioni.incassa({ clienteId: a.clienteId, appuntamenti: [a.id] }); }}>Incassa</Button>;
                    return (
                      <ListRow key={a.id} onClick={() => azioni.apriAppuntamento(a.id)}
                        leading={<span className="num" style={{ minWidth: 44 }}>{a.inizio}</span>}
                        title={<span className="riga">{nomeCliente(cli)}{(cli?.scheda?.allergie || cli?.scheda?.controindicazioni) && <Badge tone="warning" size="sm" icon="triangle-alert">Allergie</Badge>}</span>}
                        meta={<span className="riga">{s?.nome} · <span className="num">{a.inizio}–{fine(a)}</span> · <TagOperatrice op={op} /></span>}
                        trailing={<div className="riga"><StatoAppuntamento stato={a.stato} />{azione}</div>} />
                    );
                  })}
                </List>}
            </Card>
          </div>
          <div className="colonna colonna--larga">
            <Card flush title="Compleanni questa settimana" action={n.compleanni.length > 0 && <TextLink onClick={() => vai('messaggi')}>Manda gli auguri</TextLink>}>
              {n.compleanni.length === 0
                ? <EmptyState size="sm" icon="cake" title="Nessun compleanno nei prossimi 7 giorni" />
                : <List>{n.compleanni.slice(0, 5).map(({ c, tra }) => <ListRow key={c.id} leading={<Avatar name={nomeCliente(c)} size={32} />} title={nomeCliente(c)} meta={tra === 0 ? `Oggi compie ${eta(c.nascita, t)} anni` : `Tra ${tra} ${tra === 1 ? 'giorno' : 'giorni'} · il ${fData(c.nascita).slice(0, 5)}`} onClick={() => azioni.apriCliente(c.id)} chevron />)}</List>}
            </Card>
            <Card flush title="Pacchetti quasi finiti" action={<TextLink onClick={() => vai('pacchetti')}>Tutti i pacchetti</TextLink>}>
              {n.inScadenza.length === 0
                ? <EmptyState size="sm" icon="ticket" title="Nessun pacchetto in scadenza" />
                : <List>{n.inScadenza.map(p => { const s = statoPacchetto(p, t); return <ListRow key={p.id} icon="ticket" title={nomeCliente(trova(db.clienti, p.clienteId))} meta={`${p.nome} · ${p.usate}/${p.sedute} · scade il ${fData(p.scadenza)}`} trailing={<Badge tone={s.tone} size="sm" icon={s.icon}>{s.label}</Badge>} onClick={() => azioni.apriCliente(p.clienteId)} />; })}</List>}
            </Card>
            {(n.scorte.length > 0 || n.messaggi.length > 0) && (
              <Card flush title="Da sistemare">
                <List>
                  {n.messaggi.length > 0 && <ListRow icon="message-circle" title={`${n.messaggi.length} messaggi da mandare`} meta="Promemoria, auguri e richiami" onClick={() => vai('messaggi')} chevron />}
                  {n.scorte.length > 0 && <ListRow icon="package" tone="warning" title={`${n.scorte.length} prodotti da riordinare`} meta={n.scorte.slice(0, 2).map(p => p.nome).join(', ')} onClick={() => vai('prodotti')} chevron />}
                </List>
              </Card>
            )}
          </div>
        </div>
      </PageBody>
    </>
  );
}
