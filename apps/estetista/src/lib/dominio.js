// Le regole del centro estetico, senza interfaccia: si provano con `npm test`.
import { minuti, ora, giornoSett, piuGiorni, giorniTra, oggi as oggiIso, daIso } from './tempo.js';

export const CATEGORIE = [
  { value: 'viso', label: 'Viso', icon: 'sparkles' },
  { value: 'corpo', label: 'Corpo', icon: 'person-standing' },
  { value: 'mani-piedi', label: 'Mani e piedi', icon: 'hand' },
  { value: 'epilazione', label: 'Epilazione', icon: 'feather' },
  { value: 'ciglia', label: 'Ciglia e sopracciglia', icon: 'eye' },
  { value: 'massaggi', label: 'Massaggi', icon: 'flower-2' },
  { value: 'trucco', label: 'Trucco', icon: 'palette' },
];
export const categoria = v => CATEGORIE.find(c => c.value === v) || { value: v, label: v, icon: 'tag' };

export const METODI = [
  { value: 'carta', label: 'Carta', icon: 'credit-card' },
  { value: 'contanti', label: 'Contanti', icon: 'banknote' },
  { value: 'satispay', label: 'Satispay', icon: 'smartphone' },
  { value: 'bonifico', label: 'Bonifico', icon: 'landmark' },
];
export const metodo = v => METODI.find(m => m.value === v) || ({ pacchetto: { value: v, label: 'Pacchetto', icon: 'ticket' }, giftcard: { value: v, label: 'Gift card', icon: 'gift' } }[v] || { value: v, label: v || 'Nessuno', icon: 'wallet' });

export const STATI = {
  prenotato: { tone: 'neutral', label: 'Prenotato', icon: 'calendar' },
  confermato: { tone: 'info', label: 'Confermato', icon: 'calendar-check' },
  arrivato: { tone: 'warning', label: 'In sala', icon: 'armchair' },
  completato: { tone: 'success', label: 'Completato', icon: 'circle-check' },
  annullato: { tone: 'neutral', label: 'Annullato', icon: 'calendar-x' },
  assente: { tone: 'danger', label: 'Non presentata', icon: 'user-x' },
};
export const ATTIVI = ['prenotato', 'confermato', 'arrivato'];

export const nomeCliente = c => (c ? `${c.nome} ${c.cognome}`.trim() : 'Cliente di passaggio');
export const trova = (lista, id) => lista.find(x => x.id === id);
export const fine = a => ora(minuti(a.inizio) + a.durata);

const sovrapposti = (a1, d1, a2, d2) => a1 < a2 + d2 && a2 < a1 + d1;

/** Orario del centro in un giorno: null se chiuso (giorno della settimana o chiusura straordinaria). */
export function orarioCentro(imp, data) {
  const chiusura = (imp.chiusure || []).find(c => c.data === data);
  if (chiusura) return null;
  const o = imp.orari[giornoSett(data)];
  return o && o.aperto ? o : null;
}
export function motivoChiusura(imp, data) {
  const c = (imp.chiusure || []).find(c => c.data === data);
  if (c) return c.motivo || 'Chiusura straordinaria';
  return orarioCentro(imp, data) ? null : 'Giorno di chiusura';
}

/** Orario di lavoro di un'operatrice in un giorno, già stretto dentro l'orario del centro. */
export function turno(db, operatrice, data) {
  const c = orarioCentro(db.impostazioni, data);
  const t = operatrice?.orari?.[giornoSett(data)];
  if (!c || !t || !t.lavora) return null;
  const da = Math.max(minuti(c.dalle), minuti(t.dalle)), a = Math.min(minuti(c.alle), minuti(t.alle));
  return a > da ? { dalle: ora(da), alle: ora(a) } : null;
}

/**
 * Cosa non va in una prenotazione. Restituisce una lista di problemi:
 * { tipo, bloccante, testo }. Bloccante = non si può salvare senza cambiarla.
 */
export function controllaAppuntamento(db, b) {
  const out = [];
  if (!b.data || !b.inizio || !b.durata) return out;
  const da = minuti(b.inizio), dur = b.durata + (db.impostazioni.agenda?.pausa || 0);
  const chiuso = motivoChiusura(db.impostazioni, b.data);
  if (chiuso) out.push({ tipo: 'chiuso', bloccante: true, testo: `${chiuso}: il centro è chiuso quel giorno. Scegli un altro giorno.` });
  const c = orarioCentro(db.impostazioni, b.data);
  if (c && (da < minuti(c.dalle) || da + b.durata > minuti(c.alle)))
    out.push({ tipo: 'orario', bloccante: true, testo: `Fuori orario: il centro è aperto dalle ${c.dalle} alle ${c.alle}.` });
  const op = trova(db.operatrici, b.operatriceId);
  if (op && c) {
    const t = turno(db, op, b.data);
    if (!t) out.push({ tipo: 'turno', bloccante: false, testo: `${op.nome} non lavora quel giorno. Scegli un'altra operatrice o un altro giorno.` });
    else if (da < minuti(t.dalle) || da + b.durata > minuti(t.alle))
      out.push({ tipo: 'turno', bloccante: false, testo: `${op.nome} quel giorno lavora dalle ${t.dalle} alle ${t.alle}.` });
  }
  const serv = trova(db.servizi, b.servizioId);
  if (op && serv && serv.operatrici?.length && !serv.operatrici.includes(op.id))
    out.push({ tipo: 'abilitazione', bloccante: false, testo: `${op.nome} di solito non fa «${serv.nome}».` });
  const stessoGiorno = db.appuntamenti.filter(a => a.data === b.data && a.id !== b.id && ATTIVI.concat('completato').includes(a.stato));
  for (const a of stessoGiorno) {
    if (!sovrapposti(da, dur, minuti(a.inizio), a.durata + (db.impostazioni.agenda?.pausa || 0))) continue;
    const cli = trova(db.clienti, a.clienteId);
    if (b.operatriceId && a.operatriceId === b.operatriceId)
      out.push({ tipo: 'operatrice', bloccante: true, testo: `${op?.nome || 'L\'operatrice'} è già occupata dalle ${a.inizio} alle ${fine(a)} con ${nomeCliente(cli)}.` });
    else if (b.cabinaId && a.cabinaId === b.cabinaId)
      out.push({ tipo: 'cabina', bloccante: true, testo: `${trova(db.cabine, b.cabinaId)?.nome || 'La cabina'} è già occupata dalle ${a.inizio} alle ${fine(a)}.` });
    else if (b.clienteId && a.clienteId === b.clienteId)
      out.push({ tipo: 'cliente', bloccante: false, testo: `${nomeCliente(cli)} ha già un appuntamento dalle ${a.inizio} alle ${fine(a)}.` });
  }
  return out;
}

/** Gli orari liberi di un giorno per un servizio. Se non scegli l'operatrice, prende la prima libera. */
export function orariLiberi(db, { servizioId, data, operatriceId, adesso }) {
  const serv = trova(db.servizi, servizioId);
  if (!serv || !orarioCentro(db.impostazioni, data)) return [];
  const passo = db.impostazioni.agenda?.passo || 15;
  const ops = db.operatrici.filter(o => o.attiva !== false && (operatriceId ? o.id === operatriceId : (!serv.operatrici?.length || serv.operatrici.includes(o.id))));
  const out = new Map();
  for (const op of ops) {
    const t = turno(db, op, data);
    if (!t) continue;
    for (let m = minuti(t.dalle); m + serv.durata <= minuti(t.alle); m += passo) {
      if (adesso != null && m < adesso) continue;
      if (out.has(m)) continue;
      const prob = controllaAppuntamento(db, { data, inizio: ora(m), durata: serv.durata, operatriceId: op.id, servizioId, cabinaId: serv.cabinaId });
      if (!prob.some(p => p.bloccante)) out.set(m, op.id);
    }
  }
  return [...out.entries()].sort((a, b) => a[0] - b[0]).map(([m, opId]) => ({ ora: ora(m), operatriceId: opId }));
}

// ---------- pacchetti

export function statoPacchetto(pc, rif = oggiIso()) {
  const restano = pc.sedute - pc.usate;
  if (restano <= 0) return { tone: 'neutral', label: 'Esaurito', icon: 'circle-check', codice: 'esaurito' };
  if (pc.scadenza < rif) return { tone: 'danger', label: 'Scaduto', icon: 'calendar-x', codice: 'scaduto' };
  if (giorniTra(rif, pc.scadenza) <= 30) return { tone: 'warning', label: 'In scadenza', icon: 'clock', codice: 'scadenza' };
  if (restano === 1) return { tone: 'warning', label: 'Ultima seduta', icon: 'hourglass', codice: 'ultima' };
  return { tone: 'success', label: 'Attivo', icon: 'circle-check', codice: 'attivo' };
}
export const pacchettoUsabile = (pc, rif = oggiIso()) => pc.usate < pc.sedute && pc.scadenza >= rif;
export const pacchettiPer = (db, clienteId, servizioId, rif = oggiIso()) =>
  db.pacchettiClienti.filter(p => p.clienteId === clienteId && (!servizioId || p.servizioId === servizioId) && pacchettoUsabile(p, rif))
    .sort((a, b) => a.scadenza.localeCompare(b.scadenza));

// ---------- gift card

export function statoGift(g, rif = oggiIso()) {
  if (g.residuo <= 0) return { tone: 'neutral', label: 'Usata', icon: 'circle-check' };
  if (g.scadenza < rif) return { tone: 'danger', label: 'Scaduta', icon: 'calendar-x' };
  if (g.residuo < g.valore) return { tone: 'info', label: 'Usata in parte', icon: 'circle-dot' };
  return { tone: 'success', label: 'Da usare', icon: 'gift' };
}
export const codiceGift = () => 'GC-' + Array.from({ length: 6 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join('');

// ---------- cassa

/**
 * Il conto di una vendita. righe: {prezzo, qta, gratis?}; sconto: {tipo:'%'|'€', valore};
 * gift: importo disponibile sulla gift card; punti: punti da usare.
 */
export function conto({ righe, sconto, gift = 0, punti = 0 }, fed) {
  const subtotale = righe.reduce((s, r) => s + (r.gratis ? 0 : r.prezzo * r.qta), 0);
  let scontoCent = 0;
  if (sconto?.valore > 0) scontoCent = sconto.tipo === '%' ? Math.round(subtotale * Math.min(100, sconto.valore) / 100) : Math.min(subtotale, Math.round(sconto.valore));
  let resto = subtotale - scontoCent;
  const valorePunto = fed?.attiva ? fed.valorePunto : 0;
  const puntiMax = valorePunto ? Math.floor(resto / valorePunto) : 0;
  const puntiUsati = Math.max(0, Math.min(punti, puntiMax));
  const puntiValore = puntiUsati * valorePunto;
  resto -= puntiValore;
  const giftUsato = Math.max(0, Math.min(gift, resto));
  const totale = resto - giftUsato;
  // I punti si guadagnano su quello che si paga davvero, non su gift card e punti.
  const puntiGuadagnati = fed?.attiva ? Math.floor(totale / 100 * fed.puntiPerEuro) : 0;
  return { subtotale, scontoCent, puntiUsati, puntiValore, giftUsato, totale, puntiGuadagnati };
}

/** Applica una vendita al database: magazzino, pacchetti, gift card, punti, appuntamento. Muta db. */
export function registraVendita(db, v, nuovoId) {
  const numero = (db.impostazioni.numeroRicevuta || 0) + 1;
  db.impostazioni.numeroRicevuta = numero;
  const vendita = { ...v, id: v.id || nuovoId('v'), numero: `${v.data.slice(0, 4)}/${String(numero).padStart(4, '0')}`, stato: 'pagata' };
  for (const r of vendita.righe) {
    if (r.tipo === 'prodotto') {
      const p = trova(db.prodotti, r.refId);
      if (p) p.giacenza -= r.qta;
    }
    if (r.tipo === 'pacchetto') {
      const p = trova(db.pacchetti, r.refId);
      for (let i = 0; i < r.qta; i++) {
        const pc = { id: nuovoId('pc'), clienteId: vendita.clienteId, pacchettoId: p.id, nome: p.nome, servizioId: p.servizioId, sedute: p.sedute, usate: 0, acquistato: vendita.data, scadenza: piuGiorni(vendita.data, Math.round(p.validitaMesi * 30.4)), venditaId: vendita.id, prezzo: r.prezzo };
        db.pacchettiClienti.push(pc);
        r.pacchettoClienteId = pc.id;
      }
    }
    if (r.tipo === 'giftcard') {
      for (let i = 0; i < r.qta; i++) {
        const g = { id: nuovoId('gc'), codice: r.codice || codiceGift(), valore: r.prezzo, residuo: r.prezzo, emessa: vendita.data, scadenza: piuGiorni(vendita.data, 365), acquirenteId: vendita.clienteId, beneficiario: r.beneficiario || '', venditaId: vendita.id, movimenti: [] };
        db.giftcard.push(g);
        r.giftcardId = g.id;
        r.codice = g.codice;
      }
    }
    if (r.tipo === 'servizio' && r.pacchettoClienteId) {
      const pc = trova(db.pacchettiClienti, r.pacchettoClienteId);
      if (pc) pc.usate += r.qta;
    }
  }
  if (vendita.giftcardId && vendita.giftUsato) {
    const g = trova(db.giftcard, vendita.giftcardId);
    if (g) { g.residuo -= vendita.giftUsato; g.movimenti.push({ data: vendita.data, importo: vendita.giftUsato, venditaId: vendita.id }); }
  }
  const cli = trova(db.clienti, vendita.clienteId);
  if (cli) cli.punti = Math.max(0, (cli.punti || 0) - (vendita.puntiUsati || 0) + (vendita.puntiGuadagnati || 0));
  for (const id of vendita.appuntamenti || []) {
    const a = trova(db.appuntamenti, id);
    if (a) { a.stato = 'completato'; a.venditaId = vendita.id; }
  }
  db.vendite.push(vendita);
  return vendita;
}

/** Rimborso: rimette a posto magazzino, punti, gift card e sedute. Muta db. */
export function rimborsaVendita(db, id, motivo, data) {
  const v = trova(db.vendite, id);
  if (!v || v.stato === 'rimborsata') return;
  v.stato = 'rimborsata';
  v.rimborso = { data, motivo };
  for (const r of v.righe) {
    if (r.tipo === 'prodotto') { const p = trova(db.prodotti, r.refId); if (p) p.giacenza += r.qta; }
    if (r.tipo === 'servizio' && r.pacchettoClienteId) { const pc = trova(db.pacchettiClienti, r.pacchettoClienteId); if (pc) pc.usate = Math.max(0, pc.usate - r.qta); }
    if (r.tipo === 'pacchetto' && r.pacchettoClienteId) db.pacchettiClienti = db.pacchettiClienti.filter(p => p.id !== r.pacchettoClienteId);
    if (r.tipo === 'giftcard' && r.giftcardId) { const g = trova(db.giftcard, r.giftcardId); if (g) g.residuo = 0; }
  }
  if (v.giftcardId && v.giftUsato) { const g = trova(db.giftcard, v.giftcardId); if (g) g.residuo += v.giftUsato; }
  const cli = trova(db.clienti, v.clienteId);
  if (cli) cli.punti = Math.max(0, (cli.punti || 0) + (v.puntiUsati || 0) - (v.puntiGuadagnati || 0));
}

// ---------- clienti

export function numeriCliente(db, id, rif = oggiIso()) {
  const app = db.appuntamenti.filter(a => a.clienteId === id);
  const fatti = app.filter(a => a.stato === 'completato').sort((a, b) => (b.data + b.inizio).localeCompare(a.data + a.inizio));
  const futuri = app.filter(a => ATTIVI.includes(a.stato) && a.data >= rif).sort((a, b) => (a.data + a.inizio).localeCompare(b.data + b.inizio));
  const vendite = db.vendite.filter(v => v.clienteId === id && v.stato === 'pagata');
  const speso = vendite.reduce((s, v) => s + v.totale, 0);
  const assenze = app.filter(a => a.stato === 'assente').length;
  const ultima = fatti[0]?.data || null;
  return {
    speso, visite: fatti.length, assenze, ultima, prossimo: futuri[0] || null, futuri,
    giorniDaUltima: ultima ? giorniTra(ultima, rif) : null,
    scontrinoMedio: vendite.length ? Math.round(speso / vendite.length) : 0,
    pacchetti: db.pacchettiClienti.filter(p => p.clienteId === id && pacchettoUsabile(p, rif)),
  };
}

/** Le etichette che il gestionale dà da solo: Nuova, Abituale, Da richiamare. */
export function segnaliCliente(db, c, rif = oggiIso()) {
  const n = numeriCliente(db, c.id, rif);
  const out = [];
  if (giorniTra(c.creato, rif) <= 30) out.push({ codice: 'nuova', tone: 'info', label: 'Nuova' });
  if (n.visite >= 8) out.push({ codice: 'abituale', tone: 'success', label: 'Abituale' });
  const g = db.impostazioni.promemoria?.giorniRichiamo || 60;
  if (n.giorniDaUltima != null && n.giorniDaUltima > g && !n.prossimo) out.push({ codice: 'richiamare', tone: 'warning', label: 'Da richiamare' });
  if (n.assenze >= 2) out.push({ codice: 'assenze', tone: 'danger', label: `${n.assenze} assenze` });
  return out;
}

// ---------- messaggi

export function componi(testo, valori) {
  return testo.replace(/\{(\w+)\}/g, (m, k) => (valori[k] ?? m));
}
export function linkWhatsApp(telefono, testo) {
  const n = String(telefono || '').replace(/\D/g, '');
  const num = n.startsWith('39') || n.length > 10 ? n : '39' + n;
  return `https://wa.me/${num}?text=${encodeURIComponent(testo)}`;
}
export const linkSms = (telefono, testo) => `sms:${String(telefono || '').replace(/\s/g, '')}?&body=${encodeURIComponent(testo)}`;
export const linkEmail = (email, oggetto, testo) => `mailto:${email}?subject=${encodeURIComponent(oggetto)}&body=${encodeURIComponent(testo)}`;

// ---------- report

export function report(db, da, a) {
  const dentro = d => d >= da && d <= a;
  const vendite = db.vendite.filter(v => v.stato === 'pagata' && dentro(v.data));
  const app = db.appuntamenti.filter(x => dentro(x.data));
  const incasso = vendite.reduce((s, v) => s + v.totale, 0);
  const fatti = app.filter(x => x.stato === 'completato');
  const assenti = app.filter(x => x.stato === 'assente').length;
  const chiusi = fatti.length + assenti;
  const perGiorno = new Map();
  for (let d = da; d <= a; d = piuGiorni(d, 1)) perGiorno.set(d, 0);
  for (const v of vendite) perGiorno.set(v.data, (perGiorno.get(v.data) || 0) + v.totale);
  const perServizio = new Map(), perOperatrice = new Map(), perMetodo = new Map(), perCategoria = new Map();
  for (const v of vendite) {
    perMetodo.set(v.metodo, (perMetodo.get(v.metodo) || 0) + v.totale);
    const quota = v.subtotale ? v.totale / v.subtotale : 0;
    for (const r of v.righe) {
      const valore = Math.round((r.gratis ? 0 : r.prezzo * r.qta) * quota);
      if (r.tipo === 'servizio') {
        const s = perServizio.get(r.refId) || { n: 0, valore: 0 };
        s.n += r.qta; s.valore += valore; perServizio.set(r.refId, s);
        const serv = trova(db.servizi, r.refId);
        if (serv) perCategoria.set(serv.categoria, (perCategoria.get(serv.categoria) || 0) + valore);
      } else {
        const k = r.tipo === 'prodotto' ? 'prodotti' : r.tipo === 'pacchetto' ? 'pacchetti' : 'giftcard';
        perCategoria.set(k, (perCategoria.get(k) || 0) + valore);
      }
      if (r.operatriceId) {
        const o = perOperatrice.get(r.operatriceId) || { servizi: 0, valore: 0 };
        if (r.tipo === 'servizio') o.servizi += r.qta;
        o.valore += valore; perOperatrice.set(r.operatriceId, o);
      }
    }
  }
  const nuoviClienti = db.clienti.filter(c => dentro(c.creato)).length;
  const clientiServiti = new Set(fatti.map(x => x.clienteId)).size;
  const ore = new Map();
  for (const x of fatti) ore.set(x.operatriceId, (ore.get(x.operatriceId) || 0) + x.durata);
  return {
    incasso, scontrinoMedio: vendite.length ? Math.round(incasso / vendite.length) : 0, vendite: vendite.length,
    appuntamenti: fatti.length, assenti, tassoAssenze: chiusi ? assenti / chiusi * 100 : 0,
    annullati: app.filter(x => x.stato === 'annullato').length, online: app.filter(x => x.origine === 'online').length,
    nuoviClienti, clientiServiti,
    perGiorno: [...perGiorno.entries()], perServizio, perOperatrice, perMetodo, perCategoria, minutiPerOperatrice: ore,
  };
}

export const giornoSettDi = d => giornoSett(d);
export { daIso };
