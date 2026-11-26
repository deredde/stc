// Report (pattern Report): il periodo, i numeri che contano, un grafico per domanda, poi il dettaglio.
import { STC, useState, useMemo } from '../stc.js';
import { Euro, scarica, csv } from '../parts/ui.jsx';
import { trova, report, metodo as fMetodo, categoria } from '../lib/dominio.js';
import { oggi, piuGiorni, giorniTra, inizioSettimana, daIso, data as fData } from '../lib/tempo.js';
import { euro, euroTondo, percento } from '../lib/soldi.js';

const { PageHeader, PageBody, Card, StatTile, DateRangePicker, Button, LineChart, BarList, DonutChart, Table, EmptyState, Delta, useToast } = STC;

export function Report({ db }) {
  const toast = useToast();
  const t = oggi();
  const [p, setP] = useState({ from: piuGiorni(t, -29), to: t });
  const giorni = giorniTra(p.from, p.to) + 1;
  const prima = { from: piuGiorni(p.from, -giorni), to: piuGiorni(p.from, -1) };
  const r = useMemo(() => report(db, p.from, p.to), [db, p]);
  const rp = useMemo(() => report(db, prima.from, prima.to), [db, p]);
  const d = (a, b) => (b ? Math.round((a - b) / b * 100) : null);

  const presets = [
    { label: 'Ultimi 7 giorni', range: { from: piuGiorni(t, -6), to: t } },
    { label: 'Ultimi 30 giorni', range: { from: piuGiorni(t, -29), to: t } },
    { label: 'Questo mese', range: { from: t.slice(0, 8) + '01', to: t } },
    { label: 'Ultimi 90 giorni', range: { from: piuGiorni(t, -89), to: t } },
    { label: 'Quest\'anno', range: { from: t.slice(0, 5) + '01-01', to: t } },
  ];

  const linea = r.perGiorno.map(([g, v], i) => ({ label: `${daIso(g).getDate()}/${daIso(g).getMonth() + 1}`, value: v / 100, prev: (rp.perGiorno[i]?.[1] || 0) / 100, tip: fData(g) }));
  const servizi = [...r.perServizio.entries()].sort((a, b) => b[1].valore - a[1].valore).slice(0, 8).map(([id, x], i) => ({ label: trova(db.servizi, id)?.nome || 'Servizio tolto', value: x.valore / 100, note: `${x.n} volte`, highlight: i === 0 }));
  const etichetta = k => ({ prodotti: 'Prodotti', pacchetti: 'Pacchetti', giftcard: 'Gift card' }[k] || categoria(k).label);
  const cat = [...r.perCategoria.entries()].sort((a, b) => b[1] - a[1]);
  const torta = cat.slice(0, 4).map(([k, v], i) => ({ label: etichetta(k), value: v / 100, color: `viz-${i + 1}` }));
  if (cat.length > 4) torta.push({ label: 'Altro', value: cat.slice(4).reduce((s, [, v]) => s + v, 0) / 100, color: 'viz-5' });
  const metodi = [...r.perMetodo.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ label: fMetodo(k).label, value: v / 100 }));
  const staff = db.operatrici.map(o => ({ o, x: r.perOperatrice.get(o.id) || { servizi: 0, valore: 0 }, min: r.minutiPerOperatrice.get(o.id) || 0 })).sort((a, b) => b.x.valore - a.x.valore);

  const esporta = () => {
    scarica(`report-${p.from}-${p.to}.csv`, csv([
      ['Periodo', `${fData(p.from)} – ${fData(p.to)}`], [],
      ['Incasso', euro(r.incasso)], ['Scontrino medio', euro(r.scontrinoMedio)], ['Trattamenti fatti', r.appuntamenti], ['Non presentate', r.assenti], ['Nuove clienti', r.nuoviClienti], [],
      ['Giorno', 'Incasso'], ...r.perGiorno.map(([g, v]) => [fData(g), euro(v)]), [],
      ['Servizio', 'Volte', 'Incasso'], ...[...r.perServizio.entries()].map(([id, x]) => [trova(db.servizi, id)?.nome, x.n, euro(x.valore)]), [],
      ['Operatrice', 'Trattamenti', 'Ore', 'Incasso', 'Provvigione'], ...staff.map(s => [`${s.o.nome} ${s.o.cognome}`, s.x.servizi, (s.min / 60).toFixed(1).replace('.', ','), euro(s.x.valore), euro(Math.round(s.x.valore * (s.o.provvigione || 0) / 100))]),
    ]));
    toast({ text: 'Report esportato', tone: 'success' });
  };

  const vuoto = r.vendite === 0 && r.appuntamenti === 0;

  return (
    <>
      <PageHeader title="Report" subtitle={`Dal ${fData(p.from)} al ${fData(p.to)} · confronto con i ${giorni} giorni prima`}
        actions={<><DateRangePicker value={p} onChange={x => x && setP(x)} presets={presets} today={t} label="Periodo" /><Button icon="download" onClick={esporta}>Esporta</Button></>} />
      <PageBody>
        <div className="griglia-4">
          <StatTile title="Incasso" value={euroTondo(r.incasso)} icon="wallet" note={<span className="riga">{d(r.incasso, rp.incasso) != null && <Delta value={d(r.incasso, rp.incasso)} suffix=" %" />} sui pagamenti registrati</span>} />
          <StatTile title="Scontrino medio" value={euro(r.scontrinoMedio)} icon="receipt" note={<span className="riga">{d(r.scontrinoMedio, rp.scontrinoMedio) != null && <Delta value={d(r.scontrinoMedio, rp.scontrinoMedio)} suffix=" %" />} su {r.vendite} pagamenti</span>} />
          <StatTile title="Trattamenti fatti" value={String(r.appuntamenti)} icon="calendar-check" note={`${r.clientiServiti} clienti diverse · ${r.online} prenotati online`} />
          <StatTile title="Non presentate" value={percento(r.tassoAssenze, 1)} icon="user-x" tone={r.tassoAssenze > 8 ? 'warning' : undefined} note={`${r.assenti} su ${r.appuntamenti + r.assenti} appuntamenti chiusi`} />
        </div>
        {vuoto ? <Card><EmptyState illustration="report-empty" title="Nessun dato in questo periodo">Scegli un periodo in cui hai incassato o fatto trattamenti.</EmptyState></Card> : <>
          <Card title="Quanto hai incassato ogni giorno" action={<span className="caption">La linea tratteggiata è il periodo prima</span>}>
            <LineChart data={linea} compare area height={220} format={v => euroTondo(v * 100)} tooltipFormat={v => euro(v * 100)} label="Incasso al giorno" currentLabel="Questo periodo" prevLabel="Periodo prima" xTicks={linea.length > 14 ? linea.map((_, i) => i).filter(i => i % Math.ceil(linea.length / 8) === 0) : undefined} />
          </Card>
          <div className="griglia-2" style={{ alignItems: 'start' }}>
            <Card title="I servizi che rendono di più"><BarList data={servizi} format={v => euroTondo(v * 100)} label="Incasso per servizio" /></Card>
            <Card title="Da dove arriva l'incasso"><DonutChart data={torta} format={v => euroTondo(v * 100)} totalLabel="Totale" label="Incasso per categoria" /></Card>
          </div>
          <div className="griglia-2" style={{ alignItems: 'start' }}>
            <Card title="Come pagano le clienti"><BarList data={metodi} format={v => euroTondo(v * 100)} label="Incasso per metodo" /></Card>
            <Card title="Clienti">
              <div className="griglia-2">
                <StatTile title="Nuove clienti" value={String(r.nuoviClienti)} icon="user-plus" note={<span className="riga">{d(r.nuoviClienti, rp.nuoviClienti) != null && <Delta value={d(r.nuoviClienti, rp.nuoviClienti)} suffix=" %" />} rispetto a prima</span>} />
                <StatTile title="Annullati" value={String(r.annullati)} icon="calendar-x" note="Appuntamenti tolti prima" />
              </div>
            </Card>
          </div>
          <Table label="Lo staff nel periodo" rows={staff} rowKey={s => s.o.id}
            columns={[
              { key: 'nome', label: 'Operatrice', width: 'minmax(0, 1.8fr)', render: s => `${s.o.nome} ${s.o.cognome}` },
              { key: 'n', label: 'Trattamenti', width: 'minmax(0, 1fr)', align: 'right', mono: true, render: s => s.x.servizi },
              { key: 'ore', label: 'Ore in cabina', width: 'minmax(0, 1fr)', align: 'right', hideOnMobile: true, render: s => <span className="num">{(s.min / 60).toFixed(1).replace('.', ',')} h</span> },
              { key: 'orario', label: 'Incasso all\'ora', width: 'minmax(0, 1fr)', align: 'right', hideOnMobile: true, render: s => <Euro c={s.min ? Math.round(s.x.valore / (s.min / 60)) : 0} /> },
              { key: 'valore', label: 'Incasso', width: 'minmax(0, 1fr)', align: 'right', render: s => <Euro c={s.x.valore} /> },
              { key: 'prov', label: 'Provvigione', width: 'minmax(0, 1fr)', align: 'right', render: s => <Euro c={Math.round(s.x.valore * (s.o.provvigione || 0) / 100)} /> },
            ]} />
          <span className="caption">L'incasso conta i pagamenti registrati in cassa, al netto di sconti, punti e gift card usate. I trattamenti scalati da un pacchetto valgono zero il giorno della seduta: il loro incasso sta nel giorno in cui è stato venduto il pacchetto.</span>
        </>}
      </PageBody>
    </>
  );
}
