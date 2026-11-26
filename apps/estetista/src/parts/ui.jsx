// Pezzi piccoli che si ripetono in tutte le pagine, fatti solo con componenti STC.
import { STC, useState, useEffect } from '../stc.js';
import { euro } from '../lib/soldi.js';
import { STATI, trova, nomeCliente, categoria, statoPacchetto, statoGift } from '../lib/dominio.js';
import { data as fData } from '../lib/tempo.js';

const { Badge, Tag, Avatar, CellPerson, EmptyState, Button } = STC;

export const AzioniCtx = React.createContext(null);
export const useAzioni = () => React.useContext(AzioniCtx);

export const Euro = ({ c, className = '' }) => <span className={`num ${className}`}>{euro(c)}</span>;
export const Num = ({ children }) => <span className="num">{children}</span>;
export const Data = ({ d }) => <span className="num">{fData(d)}</span>;

export const StatoAppuntamento = ({ stato, size = 'sm' }) => {
  const s = STATI[stato] || STATI.prenotato;
  return <Badge tone={s.tone} size={size} icon={s.icon}>{s.label}</Badge>;
};
export const StatoPacchetto = ({ pc, size = 'sm' }) => {
  const s = statoPacchetto(pc);
  return <Badge tone={s.tone} size={size} icon={s.icon}>{s.label}</Badge>;
};
export const StatoGift = ({ g, size = 'sm' }) => {
  const s = statoGift(g);
  return <Badge tone={s.tone} size={size} icon={s.icon}>{s.label}</Badge>;
};
export const StatoVendita = ({ v }) => v.stato === 'rimborsata'
  ? <Badge tone="warning" size="sm" icon="undo-2">Rimborsata</Badge>
  : <Badge tone="success" size="sm" icon="circle-check">Pagata</Badge>;

export const TagOperatrice = ({ op }) => op ? <Tag color={op.colore}>{op.nome}</Tag> : <span className="testo-tenue">Da assegnare</span>;
export const TagCategoria = ({ v }) => <Tag>{categoria(v).label}</Tag>;

export const CellaCliente = ({ db, id, meta }) => {
  const c = trova(db.clienti, id);
  const n = nomeCliente(c);
  return <CellPerson avatar={<Avatar name={n} size={32} />} name={n} meta={meta ?? (c ? <span className="num">{telefono(c.telefono)}</span> : 'Senza scheda')} />;
};

/** «347 123 4567» */
export const telefono = t => {
  const d = String(t || '').replace(/\D/g, '');
  if (!d) return '';
  return d.length === 10 ? `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` : d.replace(/(\d{3})(?=\d)/g, '$1 ');
};

/** Vuoto di una lista con i filtri: dice cosa fare per vedere di nuovo qualcosa (S4). */
export const VuotoFiltri = ({ onAzzera, cosa = 'risultati' }) => (
  <EmptyState illustration="filter-empty" title={`Nessun ${cosa} con questi filtri`} action={onAzzera && <Button onClick={onAzzera}>Azzera i filtri</Button>}>
    Prova a togliere un filtro o a cercare un'altra parola.
  </EmptyState>
);

/** Vero quando la finestra è stretta come un telefono. */
export function useTelefono(soglia = 720) {
  const [t, setT] = useState(() => window.innerWidth < soglia);
  useEffect(() => {
    const f = () => setT(window.innerWidth < soglia);
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, [soglia]);
  return t;
}

/** Cerca una parola in più campi, senza accenti né maiuscole. */
const piano = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
export const contiene = (q, ...campi) => {
  const p = piano(q).trim();
  if (!p) return true;
  const testo = piano(campi.join(' ')) + ' ' + campi.join(' ').replace(/\s/g, '');
  return p.split(/\s+/).every(w => testo.includes(w));
};

/** Scarica un testo come file (CSV, backup). */
export function scarica(nome, testo, tipo = 'text/csv;charset=utf-8') {
  const url = URL.createObjectURL(new Blob(['﻿' + testo], { type: tipo }));
  const a = document.createElement('a');
  a.href = url; a.download = nome; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export const csv = (righe) => righe.map(r => r.map(v => {
  const s = String(v ?? '');
  return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}).join(';')).join('\n');

/**
 * La tabella di STC che, sotto i 1000 px (tablet in verticale e telefono), tiene solo le colonne
 * che contano: quelle segnate hideOnMobile spariscono già dal tablet, così le righe non si schiacciano.
 */
export function Tabella({ columns, ...props }) {
  const stretto = useTelefono(1000);
  return <STC.Table columns={stretto ? columns.filter(c => !c.hideOnMobile) : columns} {...props} />;
}
