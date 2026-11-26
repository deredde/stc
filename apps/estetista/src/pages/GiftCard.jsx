// Gift card: vendute dalla cassa, usate alla cassa con il codice.
import { STC, useState } from '../stc.js';
import { useAzioni, Euro, StatoGift, VuotoFiltri, contiene } from '../parts/ui.jsx';
import { cambia } from '../data/store.js';
import { trova, nomeCliente, statoGift } from '../lib/dominio.js';
import { oggi, piuMesi, data as fData } from '../lib/tempo.js';
import { euro } from '../lib/soldi.js';

const { ListPage, Table, Field, Button, FilterMenu, Chip, Menu, EmptyState, Drawer, KeyValue, CopyField, Timeline, Alert, StatTile, useToast } = STC;

export function GiftCard({ db }) {
  const azioni = useAzioni();
  const toast = useToast();
  const [q, setQ] = useState('');
  const [stato, setStato] = useState('');
  const [aperta, setAperta] = useState(null);
  const t = oggi();

  const righe = db.giftcard
    .filter(g => contiene(q, g.codice, g.beneficiario, nomeCliente(trova(db.clienti, g.acquirenteId))))
    .filter(g => !stato || statoGift(g, t).label === stato)
    .sort((a, b) => b.emessa.localeCompare(a.emessa));
  const credito = db.giftcard.filter(g => g.scadenza >= t).reduce((s, g) => s + g.residuo, 0);
  const g = aperta ? trova(db.giftcard, aperta) : null;

  const prolunga = x => {
    const annulla = cambia(d => { const y = trova(d.giftcard, x.id); y.scadenza = piuMesi(y.scadenza < t ? t : y.scadenza, 3); });
    toast({ text: `Scadenza spostata di 3 mesi · ${x.codice}`, tone: 'success', action: { label: 'Annulla', onClick: annulla } });
  };

  return (
    <ListPage
      header={{ title: 'Gift card', subtitle: `${db.giftcard.length} emesse · ${euro(credito)} di credito ancora da usare`, actions: <Button variant="primary" icon="gift" onClick={() => azioni.incassa({ tipo: 'giftcard' })}>Vendi una gift card</Button> }}
      search={{ value: q, onChange: setQ, placeholder: 'Cerca per codice o nome' }}
      filters={<FilterMenu label="Stato" value={stato} onChange={setStato} options={['Da usare', 'Usata in parte', 'Usata', 'Scaduta'].map(v => ({ value: v, label: v, count: db.giftcard.filter(x => statoGift(x, t).label === v).length }))} />}
      chips={stato ? <Chip prefix="Stato" onRemove={() => setStato('')}>{stato}</Chip> : null}
      onClearFilters={stato ? () => setStato('') : undefined}>
      <Table label="Gift card" rows={righe} rowKey={x => x.id} onRowClick={x => setAperta(x.id)}
        columns={[
          { key: 'codice', label: 'Codice', width: 'minmax(0, 1.2fr)', render: x => <span className="num">{x.codice}</span> },
          { key: 'per', label: 'Per', width: 'minmax(0, 1.6fr)', render: x => <div className="colonna" style={{ gap: 2 }}><span>{x.beneficiario || 'Senza nome'}</span><span className="caption">Regalata da {nomeCliente(trova(db.clienti, x.acquirenteId))}</span></div> },
          { key: 'emessa', label: 'Emessa', width: 'minmax(0, .9fr)', align: 'right', hideOnMobile: true, render: x => <span className="num">{fData(x.emessa)}</span> },
          { key: 'scade', label: 'Scade', width: 'minmax(0, .9fr)', align: 'right', hideOnMobile: true, render: x => <span className="num">{fData(x.scadenza)}</span> },
          { key: 'valore', label: 'Valore', width: 'minmax(0, .9fr)', align: 'right', hideOnMobile: true, render: x => <Euro c={x.valore} /> },
          { key: 'residuo', label: 'Credito', width: 'minmax(0, .9fr)', align: 'right', render: x => <Euro c={x.residuo} /> },
          { key: 'stato', label: 'Stato', width: 'minmax(0, 1.1fr)', render: x => <StatoGift g={x} /> },
        ]}
        actions={x => <Menu items={[
          { id: 'vedi', label: 'Vedi movimenti', icon: 'list', onSelect: () => setAperta(x.id) },
          { id: 'usa', label: 'Usala alla cassa', icon: 'wallet', disabled: x.residuo <= 0, onSelect: () => azioni.incassa({}) },
          { id: 'prolunga', label: 'Sposta la scadenza di 3 mesi', icon: 'calendar-range', onSelect: () => prolunga(x) },
        ]} />}
        empty={db.giftcard.length === 0
          ? <EmptyState illustration="orders-first" title="Nessuna gift card ancora" action={<Button variant="primary" icon="gift" onClick={() => azioni.incassa({ tipo: 'giftcard' })}>Vendi la prima</Button>}>Le gift card si vendono dalla cassa. Il codice si usa poi per pagare.</EmptyState>
          : <VuotoFiltri onAzzera={() => { setStato(''); setQ(''); }} cosa="gift card" />} />
      <Drawer open={!!g} onClose={() => setAperta(null)} title={g ? `Gift card ${euro(g.valore)}` : ''} subtitle={g ? (g.beneficiario || 'Senza nome') : ''}
        footer={<div className="riga riga--fine"><Button onClick={() => setAperta(null)}>Chiudi</Button>{g && g.residuo > 0 && <Button variant="primary" icon="wallet" onClick={() => { setAperta(null); azioni.incassa({}); }}>Usala alla cassa</Button>}</div>}>
        {g && <div className="colonna colonna--larga">
          {statoGift(g, t).label === 'Scaduta' && g.residuo > 0 && <Alert tone="danger" title="Scaduta con credito" action={<Button size="card" onClick={() => prolunga(g)}>Sposta la scadenza</Button>}>Restano {euro(g.residuo)}. Se vuoi farla usare lo stesso, sposta la scadenza.</Alert>}
          <Field label="Codice da dare alla cliente"><CopyField value={g.codice} mono /></Field>
          <KeyValue items={[
            { label: 'Credito', value: euro(g.residuo), mono: true },
            { label: 'Valore iniziale', value: euro(g.valore), mono: true },
            { label: 'Regalata da', value: nomeCliente(trova(db.clienti, g.acquirenteId)) },
            { label: 'Emessa', value: fData(g.emessa), mono: true },
            { label: 'Scade', value: fData(g.scadenza), mono: true },
            { label: 'Stato', value: <StatoGift g={g} /> },
          ]} />
          <span className="overline">Movimenti</span>
          {g.movimenti.length
            ? <Timeline items={g.movimenti.slice().reverse().map((m, i) => ({ id: String(i), icon: 'wallet', text: <><b>{euro(m.importo)}</b> usati</>, meta: fData(m.data) }))} />
            : <span className="secondary">Non è ancora stata usata.</span>}
        </div>}
      </Drawer>
    </ListPage>
  );
}

