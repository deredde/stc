// Importi in centesimi interi: niente errori di virgola mobile sui totali.
export const euro = c => {
  const n = (c || 0) / 100, neg = n < 0;
  const [i, d] = Math.abs(n).toFixed(2).split('.');
  return `${neg ? '− ' : ''}€ ${i.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${d}`;
};
/** «€ 1.240» senza decimali, per le tessere. */
export const euroTondo = c => euro(Math.round((c || 0) / 100) * 100).replace(/,00$/, '');
/** «40,00» o «40» → 4000 */
export const centesimi = v => {
  if (typeof v === 'number') return Math.round(v * 100);
  const s = String(v ?? '').replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.');
  const n = parseFloat(s);
  return Number.isFinite(n) ? Math.round(n * 100) : 0;
};
/** 4000 → «40,00» per i campi MoneyInput. */
export const perCampo = c => ((c || 0) / 100).toFixed(2).replace('.', ',');
export const percento = (n, d = 0) => `${(n || 0).toFixed(d).replace('.', ',')} %`;
