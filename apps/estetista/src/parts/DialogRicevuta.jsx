// La ricevuta dopo l'incasso: si stampa, si salva in PDF (dalla stampa) o si manda alla cliente.
import { STC, useRef } from '../stc.js';
import { trova, nomeCliente, metodo as fMetodo, linkWhatsApp, linkEmail } from '../lib/dominio.js';
import { daIso, MESI } from '../lib/tempo.js';
import { euro } from '../lib/soldi.js';

const { Dialog, Receipt, Alert, Button } = STC;

export function righeRicevuta(v) {
  const lines = v.righe.map(r => ({ name: r.gratis ? `${r.nome} (da pacchetto)` : r.nome, qty: r.qta, price: r.gratis ? 0 : r.prezzo / 100 }));
  if (v.scontoCent) lines.push({ name: v.sconto?.tipo === '%' ? `Sconto ${v.sconto.valore} %` : 'Sconto', qty: 1, price: -v.scontoCent / 100 });
  if (v.puntiValore) lines.push({ name: `Punti fedeltà (${v.puntiUsati})`, qty: 1, price: -v.puntiValore / 100 });
  if (v.giftUsato) lines.push({ name: 'Gift card', qty: 1, price: -v.giftUsato / 100 });
  return lines;
}

export function testoRicevuta(db, v) {
  const c = db.impostazioni.centro;
  return [`${c.nome} · ricevuta ${v.numero} del ${v.data.split('-').reverse().join('/')}`, ...v.righe.map(r => `${r.qta} × ${r.nome}: ${r.gratis ? 'da pacchetto' : euro(r.prezzo * r.qta)}`), v.scontoCent ? `Sconto: −${euro(v.scontoCent)}` : '', `Totale: ${euro(v.totale)} (${fMetodo(v.metodo).label})`, 'Grazie e a presto.'].filter(Boolean).join('\n');
}

export function DialogRicevuta({ db, id, onClose }) {
  const v = id ? trova(db.vendite, id) : null;
  const zona = useRef(null);
  const c = db.impostazioni.centro;
  const cli = v ? trova(db.clienti, v.clienteId) : null;

  const stampa = () => {
    const nodo = zona.current?.querySelector('.stc-rc');
    if (!nodo) return;
    const w = window.open('', '_blank', 'width=480,height=720');
    if (!w) { window.print(); return; }
    const base = document.baseURI;
    w.document.write(`<!doctype html><html lang="it" data-theme="light"><head><meta charset="utf-8"><title>Ricevuta ${v.numero}</title><base href="${base}"><link rel="stylesheet" href="stc/tokens.css"><link rel="stylesheet" href="stc/bundle.css"><style>body{margin:24px;font-family:var(--font-text)}.stc-rc-act{display:none}</style></head><body>${nodo.outerHTML}</body></html>`);
    w.document.close();
    w.onload = () => { w.focus(); w.print(); };
  };
  const manda = () => {
    const t = testoRicevuta(db, v);
    if (cli?.telefono) window.open(linkWhatsApp(cli.telefono, t), '_blank', 'noopener');
    else if (cli?.email) window.location.href = linkEmail(cli.email, `Ricevuta ${c.nome}`, t);
  };
  // I bottoni della ricevuta di STC non hanno ancora le loro props: li colleghiamo da fuori, senza toccare il componente.
  const clic = e => {
    const b = e.target.closest('.stc-rc-act button');
    if (!b) return;
    const i = [...b.parentNode.children].indexOf(b);
    if (i === 1) manda(); else stampa();
  };

  if (!v) return <Dialog open={false} onClose={onClose} title="Ricevuta" />;
  const d = daIso(v.data);
  return (
    <Dialog open={!!id} onClose={onClose} size="wide" icon="receipt" title={`Ricevuta ${v.numero}`} description={cli ? `${nomeCliente(cli)} · ${euro(v.totale)}` : euro(v.totale)}
      footer={<div className="riga riga--fine"><Button onClick={onClose}>Chiudi</Button>{(cli?.telefono || cli?.email) && <Button icon="send" onClick={manda}>{cli?.telefono ? 'Manda su WhatsApp' : 'Manda per email'}</Button>}<Button variant="primary" icon="printer" onClick={stampa}>Stampa</Button></div>}>
      <div className="colonna">
        {v.stato === 'rimborsata' && <Alert tone="warning" title={`Rimborsata il ${v.rimborso.data.split('-').reverse().join('/')}`}>{v.rimborso.motivo || 'Nessun motivo scritto.'}</Alert>}
        <div ref={zona} onClick={clic} className="riga" style={{ justifyContent: 'center' }}>
          <Receipt merchant={c.nome} vatId={`IT${c.piva}`} addr={c.indirizzo} number={v.numero} date={`${d.getDate()} ${MESI[d.getMonth()].slice(0, 3)} ${d.getFullYear()}, ${v.ora}`}
            lines={righeRicevuta(v)} vat={db.impostazioni.pagamenti.iva} method={fMetodo(v.metodo).label} status={v.stato === 'rimborsata' ? 'refund' : 'paid'} />
        </div>
        <span className="caption">Documento non fiscale. Lo scontrino o la fattura si emettono dal registratore telematico.</span>
      </div>
    </Dialog>
  );
}
