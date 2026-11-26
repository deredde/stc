// Genera src/tema-fucsia.css: la parte A di STC (marca) con l'accento fucsia tenue.
// Tinta 338 (dentro 280–340, lontana dagli stati: M2), stesse luminosità per ruolo di STC,
// croma al 78 % di quella di serie per un fucsia morbido. Controlla il contrasto (A1).
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const H = 338, K = 0.78;
const base = {
  light: [[.975,.012],[.95,.024],[.905,.046],[.83,.084],[.555,.225],[.505,.205],[.49,.199],[.43,.175],[.375,.153],[.31,.125],[.235,.09]],
  dark:  [[.215,.035],[.25,.055],[.3,.08],[.375,.11],[.76,.122],[.81,.095],[.84,.079],[.88,.058],[.92,.038],[.95,.024],[.975,.012]],
};
const gradini = [50,100,200,300,400,500,600,700,800,900,950];

function lin(L, C, h) {
  const r = h * Math.PI / 180, a = C * Math.cos(r), b = C * Math.sin(r);
  const l = (L + .3963377774*a + .2158037573*b) ** 3, m = (L - .1055613458*a - .0638541728*b) ** 3, s = (L - .0894841775*a - 1.291485548*b) ** 3;
  return [4.0767416621*l - 3.3077115913*m + .2309699292*s, -1.2684380046*l + 2.6097574011*m - .3413193965*s, -.0041960863*l - .7034186147*m + 1.707614701*s].map(x => Math.min(1, Math.max(0, x)));
}
const enc = c => c <= .0031308 ? 12.92*c : 1.055*c**(1/2.4) - .055;
const rgb = (L, C, h = H) => lin(L, C, h).map(x => Math.round(enc(x) * 255)).join(', ');
const lum = (L, C, h = H) => { const [r,g,b] = lin(L, C, h); return .2126*r + .7152*g + .0722*b; };
const cr = (a, b) => (Math.max(a,b) + .05) / (Math.min(a,b) + .05);
const ok = (L, C, h = H) => `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${h})`;

const scala = t => base[t].map(([L, C], i) => `  --accent-${gradini[i]}: ${ok(L, +(C*K).toFixed(3))};`).join('\n');
const [lL, lC] = [.555, +(.225*K).toFixed(3)], [dL, dC] = [.76, +(.122*K).toFixed(3)];
const pl = rgb(lL, lC), pd = rgb(dL, dC);

const controlli = {
  'bianco sul pieno (chiaro)': cr(1, lum(lL, lC)),
  'inchiostro 700 sulla tinta 100 (chiaro)': cr(lum(.43, +(.175*K).toFixed(3)), lum(.95, +(.024*K).toFixed(3))),
  '#111 sul pieno (scuro)': cr(lum(dL, dC), lum(.178, 0)),
  'pieno sulla superficie (scuro)': cr(lum(dL, dC), lum(.218, 0)),
};
for (const [k, v] of Object.entries(controlli)) {
  if (v < 4.5) throw new Error(`Contrasto basso: ${k} ${v.toFixed(2)}:1`);
  console.log(`${k}: ${v.toFixed(2)}:1`);
}

const css = `/* Generato da scripts/tema-fucsia.mjs: non modificarlo a mano.
   Parte A di STC (marca): accento fucsia tenue, tinta ${H}. Il resto di STC resta com'è (M1). */
:root {
${scala('light')}
  --accent-wash: rgba(${pl}, 0.10);
  --accent-wash-strong: rgba(${pl}, 0.16);
  --ill-glow: ${ok(.88, .06)};
  --ill-glow-2: ${ok(.91, .045, 320)};
  --ill-edge: rgba(${pl}, 0.30);
  --ill-line: rgba(${pl}, 0.38);
  --ill-fold: rgba(${pl}, 0.22);
  --ill-shadow: rgba(${pl}, 0.13);
  --toast-action: ${ok(.82, .09)};
  --brand-ink: oklch(0.190 0.018 ${H});
  --brand-ink-2: oklch(0.230 0.022 ${H});
  --brand-accent: ${ok(dL, dC)};
  --brand-glow: rgba(${pd}, 0.50);
  --field-focus-halo: 0 0 0 3px rgba(${pl}, 0.22);
}
[data-theme="dark"] {
${scala('dark')}
  --primary-pressed: ${ok(.70, .11)};
  --accent-wash: rgba(${pd}, 0.12);
  --accent-wash-strong: rgba(${pd}, 0.18);
  --ill-glow: ${ok(.50, .09)};
  --ill-glow-2: ${ok(.48, .06, 320)};
  --ill-edge: rgba(${pd}, 0.18);
  --ill-line: rgba(${pd}, 0.45);
  --ill-fold: rgba(${pd}, 0.30);
  --ill-shadow: rgba(${pd}, 0.24);
  --viz-wash: rgba(${pd}, 0.10);
  --field-focus-halo: 0 0 0 3px rgba(${pd}, 0.24);
}
`;
writeFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'tema-fucsia.css'), css);
console.log('src/tema-fucsia.css scritto');
