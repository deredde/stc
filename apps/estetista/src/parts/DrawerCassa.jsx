// Cassa: chi compra, il carrello, sconti, punti, gift card, il metodo e «Incassa» (pattern Cassa e vendita).
import { STC, useState, useEffect, useMemo } from '../stc.js';
import { cambia, nuovoId } from '../data/store.js';
import { useAzioni, Euro, telefono } from './ui.jsx';
import { trova, nomeCliente, conto, registraVendita, pacchettiPer, METODI, statoGift, codiceGift } from '../lib/dominio.js';
import { oggi, adessoOra, data as fData } from '../lib/tempo.js';
import { euro, centesimi } from '../lib/soldi.js';

const { Drawer, Field, Select, Combobox, Segmented, MoneyInput, NumberInput, TextInput, Button, IconButton, Switch, QuantitySelector, Alert, Avatar, Checkbox, TextLink, List, ListRow, EmptyState, useToast } = STC;

const TIPI = [{ value: 'servizio', label: 'Servizio' }, { value: 'prodotto', label: 'Prodotto' }, { value: 'pacchetto', label: 'Pacchetto' }, { value: 'giftcard', label: 'Gift card' }];

export function DrawerCassa({ db, stato, onClose }) {
  const toast = useToast();
  const azioni = useAzioni();
  const open = !!stato;
  const imp = db.impostazioni;
  const fed = imp.fedelta;
  const metodi = METODI.filter(m => imp.pagamenti.metodi[m.value]);

  const [clienteId, setClienteId] = useState('');
  const [testoCliente, setTestoCliente] = useState('');
  const [righe, setRighe] = useState([]);
  const [appIds, setAppIds] = useState([]);
  const [tipo, setTipo] = useState('servizio');
  const [scelta, setScelta] = useState('');
  const [giftValore, setGiftValore] = useState('50,00');
  const [giftPer, setGiftPer] = useState('');
  const [scontoTipo, setScontoTipo] = useState('%');
  const [scontoValore, setScontoValore] = useState(0);
  const [scontoEuro, setScontoEuro] = useState('');
  const [usaPunti, setUsaPunti] = useState(false);
  const [codice, setCodice] = useState('');
  const [gift, setGift] = useState(null);
  const [erroreGift, setErroreGift] = useState('');
  const [metodo, setMetodo] = useState(metodi[0]?.value || 'carta');
  const [lavoro, setLavoro] = useState(false);

  const rigaServizio = (s, a, pc) => ({ k: nuovoId('r'), tipo: 'servizio', refId: s.id, nome: s.nome, qta: 1, prezzo: a?.prezzo ?? s.prezzo, operatriceId: a?.operatriceId || s.operatrici?.[0] || '', ...(pc ? { gratis: true, pacchettoClienteId: pc.id } : {}) });

  useEffect(() => {
    if (!open) return;
    const p = stato.preset || {};
    const ids = p.appuntamenti || [];
    setClienteId(p.clienteId || '');
    setTestoCliente(p.clienteId ? nomeCliente(trova(db.clienti, p.clienteId)) : '');
    setAppIds(ids);
    setRighe(ids.map(id => {
      const a = trova(db.appuntamenti, id), s = trova(db.servizi, a.servizioId);
      const pc = a.pacchettoClienteId ? trova(db.pacchettiClienti, a.pacchettoClienteId) : null;
      return rigaServizio(s, a, pc && pc.usate < pc.sedute ? pc : null);
    }).concat(p.righe || []));
    setScontoValore(0); setScontoEuro(''); setUsaPunti(false); setCodice(''); setGift(null); setErroreGift(''); setScelta(''); setTipo(p.tipo || 'servizio'); setGiftPer('');
    setMetodo(metodi[0]?.value || 'carta');
  }, [stato]);

  const cliente = trova(db.clienti, clienteId);
  // Appuntamenti di oggi della cliente ancora da incassare: si aggiungono con un tocco.
  const daIncassare = useMemo(() => clienteId ? db.appuntamenti.filter(a => a.clienteId === clienteId && a.data <= oggi() && a.data >= oggi() && ['arrivato', 'confermato', 'prenotato', 'completato'].includes(a.stato) && !a.venditaId && !appIds.includes(a.id)) : [], [db, clienteId, appIds]);

  const opzioni = useMemo(() => {
    if (tipo === 'servizio') return db.servizi.filter(s => s.attivo).map(s => ({ value: s.id, label: s.nome, description: euro(s.prezzo) }));
    if (tipo === 'prodotto') return db.prodotti.filter(p => p.attivo).map(p => ({ value: p.id, label: p.nome, description: `${euro(p.prezzo)} · ${p.giacenza > 0 ? `${p.giacenza} in magazzino` : 'Esaurito'}`, disabled: p.giacenza <= 0 }));
    if (tipo === 'pacchetto') return db.pacchetti.filter(p => p.attivo).map(p => ({ value: p.id, label: p.nome, description: `${euro(p.prezzo)} · valido ${p.validitaMesi} mesi` }));
    return [];
  }, [db, tipo]);

  const aggiungi = v => {
    if (tipo === 'servizio') {
      const s = trova(db.servizi, v);
      const pc = clienteId ? pacchettiPer(db, clienteId, s.id).find(p => !righe.some(r => r.pacchettoClienteId === p.id)) : null;
      setRighe(r => [...r, rigaServizio(s, null, pc)]);
    }
    if (tipo === 'prodotto') {
      const p = trova(db.prodotti, v);
      const gia = righe.find(r => r.tipo === 'prodotto' && r.refId === v);
      if (gia) setRighe(r => r.map(x => x === gia ? { ...x, qta: Math.min(p.giacenza, x.qta + 1) } : x));
      else setRighe(r => [...r, { k: nuovoId('r'), tipo: 'prodotto', refId: p.id, nome: p.nome, qta: 1, prezzo: p.prezzo, operatriceId: '' }]);
    }
    if (tipo === 'pacchetto') {
      const p = trova(db.pacchetti, v);
      setRighe(r => [...r, { k: nuovoId('r'), tipo: 'pacchetto', refId: p.id, nome: p.nome, qta: 1, prezzo: p.prezzo, operatriceId: '' }]);
    }
    setScelta('');
  };
  const aggiungiGift = () => {
    const c = centesimi(giftValore);
    if (c <= 0) return;
    setRighe(r => [...r, { k: nuovoId('r'), tipo: 'giftcard', refId: null, nome: `Gift card ${euro(c)}${giftPer ? ` per ${giftPer}` : ''}`, qta: 1, prezzo: c, beneficiario: giftPer, codice: codiceGift() }]);
    setGiftPer('');
  };
  const aggiorna = (k, patch) => setRighe(r => r.map(x => x.k === k ? { ...x, ...patch } : x));
  const togli = k => setRighe(r => r.filter(x => x.k !== k));

  const applicaGift = () => {
    const g = db.giftcard.find(x => x.codice.toUpperCase() === codice.trim().toUpperCase());
    if (!g) { setErroreGift('Questo codice non c\'è. Controlla le lettere: il codice inizia con GC-.'); setGift(null); return; }
    const s = statoGift(g);
    if (g.residuo <= 0 || g.scadenza < oggi()) { setErroreGift(`Questa gift card è ${s.label.toLowerCase()}: non ha più credito da usare.`); setGift(null); return; }
    setErroreGift(''); setGift(g);
  };

  const puntiDisponibili = cliente?.punti || 0;
  const puoUsarePunti = fed.attiva && cliente && puntiDisponibili >= fed.minimoRiscatto;
  const sconto = scontoTipo === '%' ? { tipo: '%', valore: scontoValore || 0 } : { tipo: '€', valore: centesimi(scontoEuro) };
  const c = conto({ righe, sconto, gift: gift?.residuo || 0, punti: usaPunti ? puntiDisponibili : 0 }, fed);
  const vendeGiftOPacchetto = righe.some(r => r.tipo === 'pacchetto');
  const mancaCliente = vendeGiftOPacchetto && !cliente;

  const incassa = () => {
    if (!righe.length || mancaCliente) return;
    setLavoro(true);
    let vendita;
    const annulla = cambia(d => {
      vendita = registraVendita(d, {
        data: oggi(), ora: adessoOra(), clienteId: clienteId || null, metodo: c.totale === 0 ? (righe.every(r => r.gratis) ? 'pacchetto' : 'giftcard') : metodo,
        righe: righe.map(({ k, ...r }) => r), sconto: sconto.valore ? sconto : null, ...c,
        giftcardId: gift?.id || null, appuntamenti: appIds,
      }, nuovoId);
    });
    setLavoro(false);
    toast({ text: `Pagamento registrato · ${cliente ? nomeCliente(cliente) : euro(c.totale)}`, tone: 'success', action: { label: 'Annulla', onClick: annulla } });
    azioni.apriRicevuta(vendita.id);
  };

  const opzioniClienti = useMemo(() => db.clienti.map(x => ({ value: x.id, label: nomeCliente(x), description: telefono(x.telefono) })), [db.clienti]);

  return (
    <Drawer open={open} onClose={onClose} width={520} title="Incassa" subtitle={cliente ? `${nomeCliente(cliente)}${fed.attiva ? ` · ${puntiDisponibili} punti` : ''}` : 'Scegli la cliente o vendi al banco'}
      footer={<div className="colonna">
        <div className="totale-riga totale-riga--grande"><span>Totale</span><span className="amount">{euro(c.totale)}</span></div>
        {c.puntiGuadagnati > 0 && cliente && <span className="caption destra">{nomeCliente(cliente)} guadagna <span className="num">{c.puntiGuadagnati}</span> punti</span>}
        <Button variant="primary" size="header" full icon="wallet" onClick={incassa} disabled={!righe.length || mancaCliente} loading={lavoro}>{lavoro ? 'Incasso…' : `Incassa ${euro(c.totale)}`}</Button>
      </div>}>
      <div className="colonna colonna--larga">
        {cliente ? (
          <ListRow leading={<Avatar name={nomeCliente(cliente)} size={40} />} title={nomeCliente(cliente)} meta={<span className="num">{telefono(cliente.telefono)}</span>}
            trailing={<TextLink onClick={() => { setClienteId(''); setTestoCliente(''); setUsaPunti(false); }}>Cambia</TextLink>} />
        ) : (
          <Field label="Cliente" optional help="Lasciala vuota per una vendita al banco senza scheda.">
            <Combobox options={opzioniClienti} value={testoCliente} onChange={setTestoCliente} onSelect={o => { setClienteId(o.value); setTestoCliente(o.label); }} placeholder="Cerca per nome o telefono" icon="search" avatars />
          </Field>
        )}
        {mancaCliente && <Alert tone="warning" title="Scegli la cliente">Un pacchetto va sempre intestato a qualcuno, così le sedute si scalano dalla sua scheda.</Alert>}

        {daIncassare.length > 0 && (
          <div className="blocco-tenue colonna">
            <span className="overline">Da incassare oggi</span>
            {daIncassare.map(a => {
              const s = trova(db.servizi, a.servizioId);
              return <Checkbox key={a.id} checked={false} onChange={() => { setAppIds(x => [...x, a.id]); const pc = a.pacchettoClienteId ? trova(db.pacchettiClienti, a.pacchettoClienteId) : null; setRighe(r => [...r, rigaServizio(s, a, pc && pc.usate < pc.sedute ? pc : null)]); }} label={`${s.nome} · ${a.inizio}`} description={euro(a.prezzo ?? s.prezzo)} />;
            })}
          </div>
        )}

        {righe.length === 0
          ? <EmptyState size="sm" illustration="cart-empty" illustrationSize="sm" title="Il conto è vuoto">Aggiungi un servizio, un prodotto, un pacchetto o una gift card.</EmptyState>
          : <List label="Cosa paga">
            {righe.map(r => {
              const pcs = r.tipo === 'servizio' && clienteId ? pacchettiPer(db, clienteId, r.refId).filter(p => p.id === r.pacchettoClienteId || !righe.some(x => x.pacchettoClienteId === p.id)) : [];
              const pc = trova(db.pacchettiClienti, r.pacchettoClienteId);
              const prod = r.tipo === 'prodotto' ? trova(db.prodotti, r.refId) : null;
              return (
                <ListRow key={r.k} icon={{ servizio: 'sparkles', prodotto: 'package', pacchetto: 'ticket', giftcard: 'gift' }[r.tipo]} title={r.nome}
                  meta={<div className="colonna" style={{ gap: 'var(--sp-1)' }}>
                    {r.tipo === 'servizio' && <span>{trova(db.operatrici, r.operatriceId)?.nome || 'Operatrice da scegliere'}</span>}
                    {pcs.length > 0 && <Switch size="sm" checked={!!r.gratis} onChange={v => aggiorna(r.k, v ? { gratis: true, pacchettoClienteId: pcs[0].id } : { gratis: false, pacchettoClienteId: null })} label={pc ? `Da «${pc.nome}» · restano ${pc.sedute - pc.usate - 1} dopo questa` : `Usa il pacchetto «${pcs[0].nome}»`} />}
                    {prod && <QuantitySelector value={r.qta} min={1} max={Math.max(1, prod.giacenza)} onChange={v => aggiorna(r.k, { qta: v })} label={`Quantità di ${r.nome}`} />}
                  </div>}
                  trailing={<div className="riga">{r.gratis ? <span className="secondary">Incluso</span> : <Euro c={r.prezzo * r.qta} />}<IconButton icon="x" label={`Togli ${r.nome}`} size="row" onClick={() => togli(r.k)} /></div>} />
              );
            })}
          </List>}

        <div className="colonna">
          <span className="overline">Aggiungi al conto</span>
          <Segmented options={TIPI} value={tipo} onChange={v => { setTipo(v); setScelta(''); }} full size="card" label="Cosa aggiungi" />
          {tipo === 'giftcard'
            ? <div className="griglia-campi">
              <Field label="Valore"><MoneyInput value={giftValore} onChange={t => setGiftValore(t)} /></Field>
              <Field label="Per chi" optional><TextInput value={giftPer} onValue={setGiftPer} placeholder="Nome di chi la riceve" /></Field>
              <div className="span-2"><Button icon="gift" onClick={aggiungiGift} disabled={centesimi(giftValore) <= 0}>Aggiungi gift card</Button></div>
            </div>
            : <Select options={opzioni} value={scelta} onChange={aggiungi} placeholder={`Scegli ${tipo === 'servizio' ? 'il servizio' : tipo === 'prodotto' ? 'il prodotto' : 'il pacchetto'}`} searchable />}
        </div>

        <hr className="divisore" />
        <div className="griglia-campi">
          <Field label="Sconto">
            <div className="riga" style={{ flexWrap: 'nowrap' }}>
              <Segmented options={[{ value: '%', label: '%' }, { value: '€', label: '€' }]} value={scontoTipo} onChange={setScontoTipo} label="Tipo di sconto" />
              {scontoTipo === '%'
                ? <NumberInput value={scontoValore} onChange={setScontoValore} min={0} max={100} unit="%" stepper={false} />
                : <MoneyInput value={scontoEuro} onChange={t => setScontoEuro(t)} placeholder="0,00" />}
            </div>
          </Field>
          <Field label="Gift card da usare" optional error={erroreGift || undefined} help={gift ? `Credito ${euro(gift.residuo)} · scade il ${fData(gift.scadenza)}` : undefined}>
            <div className="riga" style={{ flexWrap: 'nowrap' }}>
              <TextInput value={codice} onValue={v => { setCodice(v.toUpperCase()); setGift(null); setErroreGift(''); }} placeholder="GC-…" invalid={!!erroreGift} />
              <Button size="form" onClick={applicaGift} disabled={!codice.trim()}>Usa</Button>
            </div>
          </Field>
        </div>
        {fed.attiva && cliente && (
          puoUsarePunti
            ? <Switch checked={usaPunti} onChange={setUsaPunti} label={`Usa i punti ${fed.nome}: ${puntiDisponibili} punti valgono ${euro(puntiDisponibili * fed.valorePunto)}`} />
            : <span className="caption">{fed.nome}: <span className="num">{puntiDisponibili}</span> punti. Si usano da <span className="num">{fed.minimoRiscatto}</span>.</span>
        )}
        {c.totale > 0 && metodi.length > 0 && (
          <Field label="Come paga">
            <Segmented options={metodi.map(m => ({ value: m.value, label: m.label, icon: m.icon }))} value={metodo} onChange={setMetodo} full label="Metodo di pagamento" />
          </Field>
        )}
        <div className="colonna" style={{ gap: 'var(--sp-1-5)' }}>
          <div className="totale-riga"><span className="testo-tenue">Subtotale</span><Euro c={c.subtotale} /></div>
          {c.scontoCent > 0 && <div className="totale-riga sconto"><span>Sconto{sconto.tipo === '%' ? ` ${sconto.valore} %` : ''}</span><Euro c={-c.scontoCent} /></div>}
          {c.puntiValore > 0 && <div className="totale-riga sconto"><span>Punti usati · <span className="num">{c.puntiUsati}</span></span><Euro c={-c.puntiValore} /></div>}
          {c.giftUsato > 0 && <div className="totale-riga sconto"><span>Gift card <span className="num">{gift.codice}</span></span><Euro c={-c.giftUsato} /></div>}
        </div>
      </div>
    </Drawer>
  );
}

