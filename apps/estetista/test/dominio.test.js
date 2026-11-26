import { test } from 'node:test';
import assert from 'node:assert/strict';
import { creaDemo } from '../src/data/seed.js';
import { conto, controllaAppuntamento, orariLiberi, registraVendita, rimborsaVendita, statoPacchetto, numeriCliente, report, componi, linkWhatsApp, pacchettiPer } from '../src/lib/dominio.js';
import { oggi, piuGiorni, giornoSett } from '../src/lib/tempo.js';
import { euro, centesimi } from '../src/lib/soldi.js';

let n = 0;
const id = p => `${p}_t${++n}`;
const prossimoAperto = db => { let d = piuGiorni(oggi(), 1); while (!db.impostazioni.orari[giornoSett(d)].aperto) d = piuGiorni(d, 1); return d; };

test('formati italiani degli importi', () => {
  assert.equal(euro(124000), '€ 1.240,00');
  assert.equal(euro(550), '€ 5,50');
  assert.equal(centesimi('1.240,50'), 124050);
  assert.equal(centesimi('12,5'), 1250);
});

test('il centro di prova è coerente', () => {
  const db = creaDemo(id);
  assert.ok(db.clienti.length > 50);
  assert.ok(db.appuntamenti.length > 300);
  assert.ok(db.vendite.length > 200);
  for (const pc of db.pacchettiClienti) assert.ok(pc.usate <= pc.sedute);
  for (const a of db.appuntamenti.filter(a => a.stato === 'completato')) assert.ok(a.venditaId, 'ogni appuntamento fatto ha il suo incasso');
  // Nessuna operatrice ha due appuntamenti sovrapposti.
  const attivi = db.appuntamenti.filter(a => a.stato !== 'annullato');
  for (const a of attivi) assert.ok(!controllaAppuntamento(db, a).some(p => p.tipo === 'operatrice'), `sovrapposizione ${a.data} ${a.inizio}`);
});

test('conto: sconto, punti e gift card', () => {
  const fed = { attiva: true, puntiPerEuro: 1, valorePunto: 5 };
  const c = conto({ righe: [{ prezzo: 5000, qta: 2 }, { prezzo: 3000, qta: 1, gratis: true }], sconto: { tipo: '%', valore: 10 }, punti: 100, gift: 2000 }, fed);
  assert.equal(c.subtotale, 10000);
  assert.equal(c.scontoCent, 1000);
  assert.equal(c.puntiValore, 500);
  assert.equal(c.giftUsato, 2000);
  assert.equal(c.totale, 6500);
  assert.equal(c.puntiGuadagnati, 65);
  const tutto = conto({ righe: [{ prezzo: 1000, qta: 1 }], gift: 5000 }, fed);
  assert.equal(tutto.giftUsato, 1000);
  assert.equal(tutto.totale, 0);
});

test('controlli di prenotazione', () => {
  const db = creaDemo(id);
  const lunedi = (() => { let d = oggi(); while (giornoSett(d) !== 0) d = piuGiorni(d, 1); return d; })();
  assert.ok(controllaAppuntamento(db, { data: lunedi, inizio: '10:00', durata: 30 }).some(p => p.tipo === 'chiuso'));
  const d = prossimoAperto(db);
  assert.ok(controllaAppuntamento(db, { data: d, inizio: '07:00', durata: 30 }).some(p => p.tipo === 'orario'));
  const a = db.appuntamenti.find(x => x.data >= d && x.stato !== 'annullato');
  const prob = controllaAppuntamento(db, { data: a.data, inizio: a.inizio, durata: a.durata, operatriceId: a.operatriceId });
  assert.ok(prob.some(p => p.tipo === 'operatrice' && p.bloccante));
});

test('orari liberi senza sovrapposizioni', () => {
  const db = creaDemo(id);
  const d = prossimoAperto(db);
  const liberi = orariLiberi(db, { servizioId: 'sv_manicure', data: d });
  assert.ok(liberi.length > 0);
  for (const l of liberi) assert.ok(!controllaAppuntamento(db, { data: d, inizio: l.ora, durata: 30, operatriceId: l.operatriceId, servizioId: 'sv_manicure' }).some(p => p.bloccante));
});

test('vendita e rimborso rimettono tutto a posto', () => {
  const db = creaDemo(id);
  const prod = db.prodotti[0], g0 = prod.giacenza, cli = db.clienti[30], p0 = cli.punti;
  const righe = [{ tipo: 'prodotto', refId: prod.id, nome: prod.nome, qta: 2, prezzo: prod.prezzo }, { tipo: 'pacchetto', refId: 'pk_viso5', nome: 'x', qta: 1, prezzo: 22000 }];
  const c = conto({ righe }, db.impostazioni.fedelta);
  const v = registraVendita(db, { data: oggi(), ora: '10:00', clienteId: cli.id, metodo: 'carta', righe, ...c }, id);
  assert.equal(prod.giacenza, g0 - 2);
  assert.equal(cli.punti, p0 + c.puntiGuadagnati);
  assert.equal(pacchettiPer(db, cli.id, 'sv_pulizia').length >= 1, true);
  rimborsaVendita(db, v.id, 'prova', oggi());
  assert.equal(prod.giacenza, g0);
  assert.equal(cli.punti, p0);
  assert.equal(db.pacchettiClienti.some(p => p.venditaId === v.id), false);
});

test('stato dei pacchetti', () => {
  const t = oggi();
  assert.equal(statoPacchetto({ sedute: 5, usate: 5, scadenza: piuGiorni(t, 90) }, t).codice, 'esaurito');
  assert.equal(statoPacchetto({ sedute: 5, usate: 1, scadenza: piuGiorni(t, -1) }, t).codice, 'scaduto');
  assert.equal(statoPacchetto({ sedute: 5, usate: 1, scadenza: piuGiorni(t, 10) }, t).codice, 'scadenza');
  assert.equal(statoPacchetto({ sedute: 5, usate: 1, scadenza: piuGiorni(t, 90) }, t).codice, 'attivo');
});

test('numeri del cliente e report', () => {
  const db = creaDemo(id);
  const n1 = numeriCliente(db, 'cl_1');
  assert.ok(n1.visite > 0);
  const r = report(db, piuGiorni(oggi(), -30), oggi());
  assert.ok(r.incasso > 0);
  assert.equal(r.perGiorno.length, 31);
});

test('messaggi', () => {
  assert.equal(componi('Ciao {nome}, alle {ora}', { nome: 'Sara', ora: '10:00' }), 'Ciao Sara, alle 10:00');
  assert.match(linkWhatsApp('347 123 4567', 'ciao'), /^https:\/\/wa\.me\/393471234567\?text=ciao$/);
});
