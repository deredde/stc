// Date e ore come stringhe: date «2026-11-26», ore «09:30». Settimana da lunedì (T4).
const pad = n => String(n).padStart(2, '0');

export const isoDi = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const daIso = s => { const [y, m, g] = s.split('-').map(Number); return new Date(y, m - 1, g); };
export const oggi = () => isoDi(new Date());
export const piuGiorni = (s, n) => { const d = daIso(s); d.setDate(d.getDate() + n); return isoDi(d); };
export const piuMesi = (s, n) => { const d = daIso(s); d.setMonth(d.getMonth() + n); return isoDi(d); };
/** 0 = lunedì … 6 = domenica */
export const giornoSett = s => (daIso(s).getDay() + 6) % 7;
export const inizioSettimana = s => piuGiorni(s, -giornoSett(s));
export const giorniTra = (a, b) => Math.round((daIso(b) - daIso(a)) / 86400000);

export const minuti = hhmm => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
export const ora = min => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;
export const adessoOra = () => { const d = new Date(); return ora(d.getHours() * 60 + d.getMinutes()); };

export const GIORNI = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
export const GIORNI_BREVI = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
export const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

/** «26/11/2026» */
export const data = s => (s ? s.split('-').reverse().join('/') : '');
/** «giovedì 26 novembre» */
export const dataLunga = s => { const d = daIso(s); return `${GIORNI[giornoSett(s)].toLowerCase()} ${d.getDate()} ${MESI[d.getMonth()]}`; };
/** «26 nov» */
export const dataBreve = s => { const d = daIso(s); return `${d.getDate()} ${MESI[d.getMonth()].slice(0, 3)}`; };

/** Età in anni da una data di nascita. */
export const eta = (nascita, rif = oggi()) => {
  if (!nascita) return null;
  const [y, m, g] = nascita.split('-').map(Number), [ry, rm, rg] = rif.split('-').map(Number);
  return ry - y - (rm < m || (rm === m && rg < g) ? 1 : 0);
};
/** Il compleanno cade tra oggi e i prossimi n giorni? Restituisce i giorni che mancano o null. */
export const compleannoTra = (nascita, n, rif = oggi()) => {
  if (!nascita) return null;
  for (let i = 0; i <= n; i++) if (piuGiorni(rif, i).slice(5) === nascita.slice(5)) return i;
  return null;
};
