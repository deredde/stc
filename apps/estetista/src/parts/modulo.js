// Moduli nei drawer: in creazione si scrive e poi «Crea …»; in modifica ogni campo vale subito (P5).
import { useState, useEffect, useRef } from '../stc.js';
import { adessoOra } from '../lib/tempo.js';

/**
 * esistente: l'oggetto da modificare (o null per crearne uno nuovo).
 * salva(valori): scrive nell'archivio; si chiama da sola in modifica, mezzo secondo dopo l'ultimo cambio.
 * valido(valori): false blocca il salvataggio automatico (per esempio un nome vuoto).
 */
export function useModulo({ open, esistente, vuoto, salva, valido = () => true, chiave }) {
  const [f, setF] = useState(vuoto);
  const [stato, setStato] = useState(null);
  const [ora, setOra] = useState('');
  const timer = useRef();
  useEffect(() => {
    if (!open) return;
    clearTimeout(timer.current);
    setF(esistente ? structuredClone(esistente) : vuoto());
    setStato(null);
  }, [open, chiave]);
  const set = patch => setF(x => {
    const n = { ...x, ...(typeof patch === 'function' ? patch(x) : patch) };
    if (esistente) {
      clearTimeout(timer.current);
      setStato('saving');
      timer.current = setTimeout(() => {
        if (!valido(n)) { setStato('error'); return; }
        salva(n);
        setStato('saved');
        setOra(adessoOra());
      }, 500);
    }
    return n;
  });
  return { f, set, salvo: stato, ora };
}
