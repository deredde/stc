// Indirizzi con il cancelletto (#/clienti/cl_1): funzionano su qualunque hosting statico.
import { useSyncExternalStore } from './stc.js';

const leggi = () => {
  const h = window.location.hash.replace(/^#\/?/, '');
  const [percorso, query = ''] = h.split('?');
  const parti = percorso.split('/').filter(Boolean);
  return { pagina: parti[0] || 'oggi', id: parti[1] || null, extra: parti[2] || null, query: Object.fromEntries(new URLSearchParams(query)), hash: h };
};
let attuale = leggi();
const ascolto = new Set();
window.addEventListener('hashchange', () => { attuale = leggi(); ascolto.forEach(f => f()); });

export const useRotta = () => useSyncExternalStore(f => { ascolto.add(f); return () => ascolto.delete(f); }, () => attuale);
export const vai = p => { window.location.hash = '#/' + p.replace(/^\//, ''); };
