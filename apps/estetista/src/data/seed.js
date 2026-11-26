// Il centro di prova: dati verosimili intorno a oggi, così ogni pagina si vede piena.
import { oggi, piuGiorni, minuti, ora, giornoSett } from '../lib/tempo.js';
import { registraVendita, conto, codiceGift } from '../lib/dominio.js';

function casuale(seme) {
  let s = seme >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

const NOMI = ['Giulia', 'Francesca', 'Chiara', 'Sara', 'Martina', 'Alessia', 'Valentina', 'Federica', 'Elisa', 'Silvia', 'Laura', 'Paola', 'Roberta', 'Anna', 'Elena', 'Ilaria', 'Beatrice', 'Camilla', 'Giorgia', 'Noemi', 'Aurora', 'Alice', 'Marta', 'Serena', 'Monica', 'Cristina', 'Daniela', 'Barbara', 'Simona', 'Veronica', 'Arianna', 'Greta', 'Rebecca', 'Ludovica', 'Nicole', 'Irene', 'Claudia', 'Michela', 'Lucia', 'Teresa'];
const NOMI_M = ['Marco', 'Luca', 'Andrea', 'Davide', 'Matteo'];
const COGNOMI = ['Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco', 'Bruno', 'Gallo', 'Conti', 'De Luca', 'Mancini', 'Costa', 'Giordano', 'Rizzo', 'Lombardi', 'Moretti', 'Barbieri', 'Fontana', 'Santoro', 'Mariani', 'Rinaldi', 'Caruso', 'Ferrara', 'Galli', 'Martini', 'Leone', 'Longo', 'Gentile', 'Martinelli', 'Vitale', 'Lombardo', 'Serra', 'Coppola', 'De Santis', 'Ferri', 'Villa'];
const FONTI = ['Passaparola', 'Instagram', 'Google', 'Passaggio davanti al centro', 'Facebook', 'Regalo'];

export function creaDemo(nuovoId) {
  const r = casuale(20261126);
  const scegli = a => a[Math.floor(r() * a.length)];
  const T = oggi();

  const settimana = (dalle, alle, chiusi = [6]) => Array.from({ length: 7 }, (_, i) => ({ lavora: !chiusi.includes(i), dalle, alle }));

  const operatrici = [
    { id: 'op_giulia', nome: 'Giulia', cognome: 'Marino', ruolo: 'Titolare · estetista', colore: 'viz-1', telefono: '3471234567', email: 'giulia@bellezzastudio.it', orari: settimana('09:00', '19:00', [0, 6]), provvigione: 0, attiva: true },
    { id: 'op_martina', nome: 'Martina', cognome: 'Conti', ruolo: 'Estetista', colore: 'viz-2', telefono: '3489876543', email: 'martina@bellezzastudio.it', orari: settimana('09:00', '18:00', [0, 6]), provvigione: 10, attiva: true },
    { id: 'op_sofia', nome: 'Sofia', cognome: 'Ricci', ruolo: 'Onicotecnica', colore: 'viz-3', telefono: '3405556677', email: 'sofia@bellezzastudio.it', orari: settimana('10:00', '19:00', [0, 2, 6]), provvigione: 12, attiva: true },
    { id: 'op_elena', nome: 'Elena', cognome: 'Galli', ruolo: 'Massaggiatrice', colore: 'viz-4', telefono: '3394443322', email: 'elena@bellezzastudio.it', orari: settimana('11:00', '19:00', [0, 3, 6]), provvigione: 12, attiva: true },
  ];
  const tutte = operatrici.map(o => o.id);
  const est = ['op_giulia', 'op_martina'];

  const cabine = [
    { id: 'cab_1', nome: 'Cabina Rosa' },
    { id: 'cab_2', nome: 'Cabina Lilla' },
    { id: 'cab_unghie', nome: 'Postazione unghie' },
    { id: 'cab_massaggi', nome: 'Sala massaggi' },
  ];

  const S = (id, nome, categoria, durata, euro, operatrici, cabinaId, descrizione = '') => ({ id, nome, categoria, durata, prezzo: euro * 100, iva: 22, operatrici, cabinaId, descrizione, online: true, attivo: true });
  const servizi = [
    S('sv_pulizia', 'Pulizia viso profonda', 'viso', 60, 55, est, 'cab_1', 'Detersione, esfoliazione, estrazione e maschera.'),
    S('sv_idratante', 'Trattamento viso idratante', 'viso', 45, 48, est, 'cab_1'),
    S('sv_antiage', 'Trattamento antietà', 'viso', 75, 85, est, 'cab_1', 'Con radiofrequenza e siero al collagene.'),
    S('sv_peeling', 'Peeling chimico', 'viso', 40, 65, ['op_giulia'], 'cab_1'),
    S('sv_pressoterapia', 'Pressoterapia', 'corpo', 40, 35, est, 'cab_2'),
    S('sv_fanghi', 'Fanghi drenanti', 'corpo', 60, 50, est, 'cab_2'),
    S('sv_scrub', 'Scrub corpo', 'corpo', 45, 45, est, 'cab_2'),
    S('sv_manicure', 'Manicure', 'mani-piedi', 30, 22, ['op_sofia', 'op_martina'], 'cab_unghie'),
    S('sv_semi', 'Smalto semipermanente mani', 'mani-piedi', 45, 30, ['op_sofia'], 'cab_unghie'),
    S('sv_ricostruzione', 'Ricostruzione unghie in gel', 'mani-piedi', 90, 60, ['op_sofia'], 'cab_unghie'),
    S('sv_pedicure', 'Pedicure estetico', 'mani-piedi', 45, 32, ['op_sofia', 'op_martina'], 'cab_unghie'),
    S('sv_cera_gambe', 'Ceretta gambe complete', 'epilazione', 40, 30, est, 'cab_2'),
    S('sv_cera_inguine', 'Ceretta inguine', 'epilazione', 20, 15, est, 'cab_2'),
    S('sv_cera_ascelle', 'Ceretta ascelle', 'epilazione', 15, 10, est, 'cab_2'),
    S('sv_laser', 'Epilazione laser · zona media', 'epilazione', 30, 70, ['op_giulia'], 'cab_1'),
    S('sv_laminazione', 'Laminazione ciglia', 'ciglia', 60, 55, est, 'cab_1'),
    S('sv_sopracciglia', 'Definizione sopracciglia', 'ciglia', 20, 15, est, 'cab_1'),
    S('sv_extension', 'Extension ciglia', 'ciglia', 120, 110, ['op_giulia'], 'cab_1'),
    S('sv_rilassante', 'Massaggio rilassante', 'massaggi', 50, 50, ['op_elena'], 'cab_massaggi'),
    S('sv_decontratturante', 'Massaggio decontratturante', 'massaggi', 50, 55, ['op_elena'], 'cab_massaggi'),
    S('sv_linfo', 'Linfodrenaggio', 'massaggi', 60, 60, ['op_elena'], 'cab_massaggi'),
    S('sv_trucco', 'Trucco sposa · prova', 'trucco', 60, 80, ['op_giulia'], 'cab_1'),
  ];
  servizi.find(s => s.id === 'sv_peeling').online = false;
  servizi.find(s => s.id === 'sv_trucco').online = false;

  const pacchetti = [
    { id: 'pk_presso10', nome: 'Pressoterapia · 10 sedute', servizioId: 'sv_pressoterapia', sedute: 10, prezzo: 29000, validitaMesi: 6, attivo: true, descrizione: 'Una seduta in regalo rispetto al prezzo singolo.' },
    { id: 'pk_laser6', nome: 'Laser · 6 sedute zona media', servizioId: 'sv_laser', sedute: 6, prezzo: 35000, validitaMesi: 12, attivo: true, descrizione: 'Il percorso completo per una zona.' },
    { id: 'pk_viso5', nome: 'Pulizia viso · 5 sedute', servizioId: 'sv_pulizia', sedute: 5, prezzo: 22000, validitaMesi: 8, attivo: true, descrizione: 'Una al mese, prezzo bloccato.' },
    { id: 'pk_massaggi5', nome: 'Massaggi rilassanti · 5', servizioId: 'sv_rilassante', sedute: 5, prezzo: 21000, validitaMesi: 6, attivo: true, descrizione: '' },
    { id: 'pk_semi8', nome: 'Semipermanente · 8 refill', servizioId: 'sv_semi', sedute: 8, prezzo: 20000, validitaMesi: 6, attivo: true, descrizione: '' },
    { id: 'pk_fanghi8', nome: 'Fanghi drenanti · 8 sedute', servizioId: 'sv_fanghi', sedute: 8, prezzo: 34000, validitaMesi: 4, attivo: true, descrizione: '' },
  ];

  const P = (id, nome, marca, categoria, euro, costo, giacenza, soglia, codice) => ({ id, nome, marca, categoria, prezzo: euro * 100, costo: costo * 100, giacenza, soglia, codice, attivo: true });
  const prodotti = [
    P('pr_crema', 'Crema viso idratante 50 ml', 'Lumière', 'Viso', 38, 16, 12, 4, '8001234000011'),
    P('pr_siero', 'Siero vitamina C 30 ml', 'Lumière', 'Viso', 45, 19, 3, 4, '8001234000028'),
    P('pr_detergente', 'Latte detergente 200 ml', 'Lumière', 'Viso', 22, 8, 9, 3, '8001234000035'),
    P('pr_maschera', 'Maschera argilla rosa', 'Terra Viva', 'Viso', 26, 10, 6, 3, '8001234000042'),
    P('pr_olio', 'Olio corpo elasticizzante', 'Terra Viva', 'Corpo', 32, 12, 7, 3, '8001234000059'),
    P('pr_anticell', 'Gel anticellulite 200 ml', 'Terra Viva', 'Corpo', 36, 14, 2, 3, '8001234000066'),
    P('pr_smalto', 'Smalto semipermanente', 'Nail Lab', 'Mani', 14, 5, 24, 8, '8001234000073'),
    P('pr_cuticole', 'Olio cuticole', 'Nail Lab', 'Mani', 12, 4, 10, 4, '8001234000080'),
    P('pr_spf', 'Protezione solare viso SPF 50', 'Lumière', 'Viso', 29, 12, 0, 3, '8001234000097'),
    P('pr_mascara', 'Siero ciglia rinforzante', 'Lash Studio', 'Ciglia', 34, 13, 5, 2, '8001234000103'),
  ];

  const clienti = [];
  for (let i = 0; i < 64; i++) {
    const uomo = i % 13 === 7;
    const nome = uomo ? scegli(NOMI_M) : NOMI[(i * 7) % NOMI.length];
    const cognome = COGNOMI[(i * 11 + 3) % COGNOMI.length];
    const anno = 1960 + Math.floor(r() * 45), mese = 1 + Math.floor(r() * 12), giorno = 1 + Math.floor(r() * 28);
    const nascita = i % 9 === 0 ? piuGiorni(T, Math.floor(r() * 20)).replace(/^\d{4}/, String(anno)) : `${anno}-${String(mese).padStart(2, '0')}-${String(giorno).padStart(2, '0')}`;
    const creato = i < 5 ? piuGiorni(T, -Math.floor(r() * 20)) : piuGiorni(T, -40 - Math.floor(r() * 700));
    clienti.push({
      id: `cl_${i + 1}`, nome, cognome,
      telefono: `3${Math.floor(r() * 5) + 3}${String(Math.floor(r() * 1e8)).padStart(8, '0')}`,
      email: `${nome}.${cognome}`.toLowerCase().replace(/\s/g, '') + '@esempio.it',
      nascita, sesso: uomo ? 'M' : 'F', note: '', tag: i % 6 === 0 ? ['VIP'] : [], fonte: scegli(FONTI),
      consensoPrivacy: true, consensoMarketing: r() > 0.25, creato, punti: 0,
      scheda: { pelle: scegli(['Normale', 'Secca', 'Grassa', 'Mista', 'Sensibile']), allergie: i % 8 === 0 ? 'Nichel' : i % 15 === 0 ? 'Lattice' : '', farmaci: '', controindicazioni: i % 17 === 0 ? 'Vene varicose: niente cera calda sulle gambe' : '', note: '' },
    });
  }
  clienti[0].note = 'Preferisce gli appuntamenti dopo le 17.';
  clienti[3].note = 'Arriva spesso con 10 minuti di anticipo.';

  const db = {
    impostazioni: {
      centro: { nome: 'Bellezza Studio', ragione: 'Bellezza Studio di Giulia Marino', piva: '12345678903', indirizzo: 'Via della Spiga 14, 20121 Milano', telefono: '0287654321', email: 'ciao@bellezzastudio.it', sito: 'bellezzastudio.it' },
      orari: [
        { aperto: false, dalle: '09:00', alle: '19:00' },
        { aperto: true, dalle: '09:00', alle: '19:00' },
        { aperto: true, dalle: '09:00', alle: '19:00' },
        { aperto: true, dalle: '09:00', alle: '20:00' },
        { aperto: true, dalle: '09:00', alle: '20:00' },
        { aperto: true, dalle: '09:00', alle: '18:00' },
        { aperto: false, dalle: '09:00', alle: '13:00' },
      ],
      chiusure: [{ data: '2026-12-25', motivo: 'Natale' }, { data: '2026-12-26', motivo: 'Santo Stefano' }, { data: '2027-01-01', motivo: 'Capodanno' }],
      agenda: { passo: 15, pausa: 0, dalle: 8, alle: 21 },
      promemoria: {
        attivo: true, anticipo: 1, canale: 'whatsapp',
        testo: 'Ciao {nome}, ti aspettiamo {giorno} alle {ora} per {servizio}. Se non riesci a venire scrivici qui. A presto, {centro}',
        compleanno: true, testoCompleanno: 'Buon compleanno {nome}. Per festeggiare hai il 15 % su un trattamento a scelta entro fine mese. {centro}',
        richiamo: true, giorniRichiamo: 60, testoRichiamo: 'Ciao {nome}, è da un po\' che non ci vediamo. Questo mese c\'è posto anche il sabato: prenota quando vuoi. {centro}',
        conferma: true, testoConferma: 'Ciao {nome}, il tuo appuntamento per {servizio} è fissato {giorno} alle {ora}. {centro}',
      },
      fedelta: { attiva: true, puntiPerEuro: 1, valorePunto: 5, minimoRiscatto: 100, nome: 'Bellezza Card' },
      pagamenti: { metodi: { carta: true, contanti: true, satispay: true, bonifico: false }, iva: 22 },
      online: { attiva: true, anticipoOre: 2, giorni: 30, conferma: 'manuale', messaggio: 'Prenota in pochi secondi. Ti scriviamo noi per confermare.' },
      accesso: { email: 'giulia@bellezzastudio.it' },
      numeroRicevuta: 0,
    },
    operatrici, cabine, servizi, pacchetti, prodotti, clienti,
    pacchettiClienti: [], appuntamenti: [], vendite: [], giftcard: [], messaggi: [], carichi: [], note: [],
  };

  // Pacchetti già venduti a qualche cliente, con sedute in parte usate.
  const vendiPacchetto = (cl, pk, giorniFa, usate) => {
    const data = piuGiorni(T, -giorniFa);
    const v = registraVendita(db, {
      data, ora: '18:10', clienteId: cl, metodo: 'carta', righe: [{ tipo: 'pacchetto', refId: pk.id, nome: pk.nome, qta: 1, prezzo: pk.prezzo, operatriceId: 'op_giulia' }],
      sconto: null, ...conto({ righe: [{ prezzo: pk.prezzo, qta: 1 }] }, db.impostazioni.fedelta),
    }, nuovoId);
    const pc = db.pacchettiClienti.find(p => p.venditaId === v.id);
    pc.usate = usate;
    return pc;
  };
  vendiPacchetto('cl_1', pacchetti[0], 50, 6);
  vendiPacchetto('cl_2', pacchetti[1], 120, 4);
  vendiPacchetto('cl_4', pacchetti[2], 90, 2);
  vendiPacchetto('cl_6', pacchetti[3], 160, 4);
  vendiPacchetto('cl_9', pacchetti[4], 40, 3);
  vendiPacchetto('cl_12', pacchetti[5], 30, 7);
  vendiPacchetto('cl_15', pacchetti[0], 200, 10);
  vendiPacchetto('cl_3', pacchetti[2], 20, 1);

  // Appuntamenti: 100 giorni indietro (fatti, con incasso) e 21 avanti (da fare).
  const occupato = new Map();
  const libera = (data, op, cab, da, dur) => {
    const k = data;
    const lista = occupato.get(k) || [];
    const ok = !lista.some(x => (x.op === op || x.cab === cab) && da < x.da + x.dur && x.da < da + dur);
    if (ok) { lista.push({ op, cab, da, dur }); occupato.set(k, lista); }
    return ok;
  };
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
  const preferiti = new Map();
  for (let g = -100; g <= 21; g++) {
    const data = piuGiorni(T, g);
    const gs = giornoSett(data);
    const o = db.impostazioni.orari[gs];
    if (!o.aperto || db.impostazioni.chiusure.some(c => c.data === data)) continue;
    const quanti = g === 0 ? 14 : g > 0 ? Math.max(2, Math.round(11 - g * 0.45 + r() * 3)) : 8 + Math.floor(r() * 6);
    for (let k = 0; k < quanti * 2 && db.appuntamenti.filter(a => a.data === data).length < quanti; k++) {
      const cliIdx = Math.floor(Math.pow(r(), 1.6) * clienti.length);
      const cli = clienti[cliIdx];
      if (cli.creato > data) continue;
      let serv = preferiti.get(cli.id);
      if (!serv || r() > 0.6) { serv = scegli(servizi.filter(s => s.attivo)); preferiti.set(cli.id, serv); }
      const opId = scegli(serv.operatrici.length ? serv.operatrici : tutte);
      const op = operatrici.find(x => x.id === opId);
      const t = op.orari[gs];
      if (!t.lavora) continue;
      const da0 = Math.max(minuti(o.dalle), minuti(t.dalle)), a0 = Math.min(minuti(o.alle), minuti(t.alle));
      const slot = da0 + Math.floor(r() * ((a0 - da0 - serv.durata) / 15)) * 15;
      if (slot + serv.durata > a0 || !libera(data, opId, serv.cabinaId, slot, serv.durata)) continue;
      let stato = 'prenotato';
      if (g < 0) stato = r() < 0.05 ? 'assente' : r() < 0.06 ? 'annullato' : 'completato';
      if (g === 0) stato = slot + serv.durata <= nowMin ? 'completato' : slot <= nowMin ? 'arrivato' : r() > 0.3 ? 'confermato' : 'prenotato';
      if (g > 0 && g < 3) stato = r() > 0.5 ? 'confermato' : 'prenotato';
      const origine = r() < 0.22 ? 'online' : r() < 0.5 ? 'telefono' : 'banco';
      // Le prenotazioni online da confermare sono poche: quelle arrivate da poco.
      if (origine === 'online' && stato === 'prenotato' && r() > 0.15) stato = 'confermato';
      db.appuntamenti.push({
        id: nuovoId('ap'), clienteId: cli.id, servizioId: serv.id, operatriceId: opId, cabinaId: serv.cabinaId,
        data, inizio: ora(slot), durata: serv.durata, stato, note: '', origine,
        prezzo: serv.prezzo, creato: piuGiorni(data, -Math.floor(r() * 14) - 1),
      });
    }
  }

  // Incassi degli appuntamenti fatti; qualche seduta scalata dai pacchetti; qualche prodotto venduto.
  const fatti = db.appuntamenti.filter(a => a.stato === 'completato').sort((a, b) => (a.data + a.inizio).localeCompare(b.data + b.inizio));
  for (const a of fatti) {
    const serv = servizi.find(s => s.id === a.servizioId);
    const pc = db.pacchettiClienti.find(p => p.clienteId === a.clienteId && p.servizioId === a.servizioId && p.acquistato <= a.data && p.usate < p.sedute);
    const righe = [{ tipo: 'servizio', refId: serv.id, nome: serv.nome, qta: 1, prezzo: serv.prezzo, operatriceId: a.operatriceId, ...(pc ? { gratis: true, pacchettoClienteId: pc.id } : {}) }];
    if (r() < 0.14) { const p = scegli(prodotti.filter(p => p.giacenza > 2)); if (p) righe.push({ tipo: 'prodotto', refId: p.id, nome: p.nome, qta: 1, prezzo: p.prezzo, operatriceId: a.operatriceId }); }
    const sconto = r() < 0.08 ? { tipo: '%', valore: 10 } : null;
    const c = conto({ righe, sconto }, db.impostazioni.fedelta);
    if (pc) pc.usate -= 0; // la seduta la scala registraVendita
    registraVendita(db, {
      data: a.data, ora: ora(minuti(a.inizio) + a.durata), clienteId: a.clienteId, metodo: c.totale === 0 ? 'pacchetto' : r() < 0.55 ? 'carta' : r() < 0.75 ? 'contanti' : 'satispay',
      righe, sconto, ...c, appuntamenti: [a.id],
    }, nuovoId);
  }
  // Le sedute dei pacchetti venduti prima erano già impostate a mano: le rimettiamo nei limiti.
  for (const pc of db.pacchettiClienti) pc.usate = Math.min(pc.usate, pc.sedute);

  // Gift card.
  const gift = (cl, euro, giorniFa, usato, beneficiario) => {
    const data = piuGiorni(T, -giorniFa);
    registraVendita(db, {
      data, ora: '12:30', clienteId: cl, metodo: 'carta',
      righe: [{ tipo: 'giftcard', refId: null, nome: `Gift card ${euro} €`, qta: 1, prezzo: euro * 100, beneficiario, codice: codiceGift() }],
      sconto: null, ...conto({ righe: [{ prezzo: euro * 100, qta: 1 }] }, db.impostazioni.fedelta),
    }, nuovoId);
    const g = db.giftcard[db.giftcard.length - 1];
    if (usato) { g.residuo -= usato * 100; g.movimenti.push({ data: piuGiorni(data, 10), importo: usato * 100, venditaId: null }); }
  };
  gift('cl_5', 100, 30, 45, 'Marta Ferri');
  gift('cl_8', 50, 12, 0, 'Sorella');
  gift('cl_20', 150, 300, 150, 'Anna Bruno');
  gift('cl_11', 80, 5, 0, '');

  // Messaggi già mandati, per lo storico.
  for (const a of db.appuntamenti.filter(a => a.data === piuGiorni(T, 1)).slice(0, 3)) {
    a.promemoria = { inviato: `${T}T09:12` };
    db.messaggi.push({ id: nuovoId('ms'), tipo: 'promemoria', clienteId: a.clienteId, appuntamentoId: a.id, canale: 'whatsapp', testo: 'Promemoria appuntamento', data: T, ora: '09:12' });
  }

  db.carichi.push({ id: nuovoId('ca'), prodottoId: 'pr_crema', qta: 6, data: piuGiorni(T, -15), nota: 'Ordine Lumière n. 3381' });
  db.note.push({ id: nuovoId('nt'), clienteId: 'cl_1', testo: 'Ha chiesto di provare il trattamento antietà a gennaio.', data: piuGiorni(T, -9), autore: 'Giulia' });
  return db;
}
