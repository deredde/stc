// L'archivio del centro. Oggi vive nel browser (localStorage), con la stessa forma che avrà
// su un server: ogni pagina passa da qui, quindi per collegare un backend si cambia solo questo file.
import { useSyncExternalStore } from '../stc.js';
import { creaDemo } from './seed.js';

const CHIAVE = 'bellezza:archivio:v1';
const VERSIONE = 1;

let stato = { fase: 'caricamento', db: null, errore: null };
const ascolto = new Set();
const avvisa = () => ascolto.forEach(f => f());

export const nuovoId = p => `${p}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

function salva(db) {
  try {
    localStorage.setItem(CHIAVE, JSON.stringify({ versione: VERSIONE, db }));
    return true;
  } catch (e) {
    stato = { ...stato, avviso: 'Non riesco a salvare su questo dispositivo: lo spazio è pieno o il browser lo blocca. Esporta un backup da Impostazioni › Dati.' };
    return false;
  }
}

/** Carica l'archivio. Al primo avvio prepara il centro di prova. */
export function carica() {
  stato = { fase: 'caricamento', db: null, errore: null };
  avvisa();
  // Una breve attesa come con un server vero: sotto i 300 ms non si vede niente (S3).
  setTimeout(() => {
    try {
      const raw = localStorage.getItem(CHIAVE);
      let db;
      if (raw) {
        const dati = JSON.parse(raw);
        if (!dati || dati.versione !== VERSIONE || !dati.db?.clienti) throw new Error('formato');
        db = dati.db;
      } else {
        db = creaDemo(nuovoId);
        salva(db);
      }
      stato = { fase: 'pronto', db, errore: null };
    } catch (e) {
      stato = { fase: 'errore', db: null, errore: 'L\'archivio di questo dispositivo non si legge. Riprova, o ripristina il centro di prova da qui sotto.' };
    }
    avvisa();
  }, 350);
}

export function useArchivio() {
  return useSyncExternalStore(f => { ascolto.add(f); return () => ascolto.delete(f); }, () => stato);
}
export const useDb = () => useArchivio().db;
export const leggi = () => stato.db;

/**
 * Cambia l'archivio. fn riceve una copia da modificare. Restituisce la funzione che lo riporta
 * com'era: è quella che va nel «Annulla» del toast (C2).
 */
export function cambia(fn) {
  const prima = stato.db;
  const db = structuredClone(prima);
  const risultato = fn(db);
  stato = { ...stato, db };
  salva(db);
  avvisa();
  const annulla = () => { stato = { ...stato, db: prima }; salva(prima); avvisa(); };
  annulla.risultato = risultato;
  return annulla;
}

export function ripristinaDemo() {
  const db = creaDemo(nuovoId);
  stato = { fase: 'pronto', db, errore: null };
  salva(db);
  avvisa();
}

export function svuota() {
  const demo = creaDemo(nuovoId);
  const db = { ...demo, clienti: [], appuntamenti: [], vendite: [], pacchettiClienti: [], giftcard: [], messaggi: [], carichi: [], note: [] };
  db.impostazioni.numeroRicevuta = 0;
  db.prodotti = db.prodotti.map(p => ({ ...p, giacenza: 0 }));
  stato = { fase: 'pronto', db, errore: null };
  salva(db);
  avvisa();
}

export function esporta() {
  return JSON.stringify({ versione: VERSIONE, esportato: new Date().toISOString(), db: stato.db }, null, 2);
}

/** Importa un backup. Restituisce un messaggio d'errore o null. */
export function importa(testo) {
  try {
    const dati = JSON.parse(testo);
    if (dati.versione !== VERSIONE || !dati.db?.clienti || !dati.db?.impostazioni) return 'Questo file non è un backup del gestionale. Scegli il file .json che hai esportato da Impostazioni › Dati.';
    stato = { fase: 'pronto', db: dati.db, errore: null };
    salva(dati.db);
    avvisa();
    return null;
  } catch (e) {
    return 'Il file non si legge. Scegli il file .json che hai esportato da Impostazioni › Dati.';
  }
}

// ---------- accesso (prova: in locale, finché non c'è un server)

const SESSIONE = 'bellezza:sessione';
export function sessione() {
  try { return JSON.parse(localStorage.getItem(SESSIONE)); } catch (e) { return null; }
}
export function entra(email) {
  const s = { email, dal: new Date().toISOString() };
  localStorage.setItem(SESSIONE, JSON.stringify(s));
  return s;
}
export function esci() { localStorage.removeItem(SESSIONE); }
