// Genera temi.css da temi.json e tokens.css.
// Ogni tema applica la regola 60·30·10 e ridichiara i token del suo modo che dipendono da altri token,
// così funziona anche su un contenitore e non solo su <html>.
// Uso: node scripts/temi.mjs   ·   controllo senza scrivere: node scripts/temi.mjs --check
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const tokens = fs.readFileSync(path.join(ROOT, "tokens.css"), "utf8");
const { themes } = JSON.parse(fs.readFileSync(path.join(ROOT, "temi.json"), "utf8"));

// token di colore dei due blocchi di tokens.css (spazi, raggi, tempi, livelli e caratteri non cambiano)
const SKIP = /^--(sp|r|dur|ease|z|font|icon|ov|ctrl|sidebar|header|mobile-header|bottom-nav)-?/;
function block(sel) {
  const re = new RegExp("(^|\\n)" + sel.replace(/[[\]"]/g, "\\$&") + "\\s*\\{([\\s\\S]*?)\\n\\}");
  const m = tokens.match(re); if (!m) throw new Error("Blocco mancante in tokens.css: " + sel);
  const out = new Map();
  for (const ln of m[2].split("\n")) { const d = ln.match(/^\s*(--[\w-]+):\s*(.+);\s*$/); if (d && !SKIP.test(d[1])) out.set(d[1], d[2]); }
  return out;
}
const BASE = { light: block(":root"), dark: block('[data-theme="dark"]') };
// il blocco scuro ridichiara solo quello che cambia: il resto viene dal chiaro
for (const [k, v] of BASE.light) if (!BASE.dark.has(k)) BASE.dark.set(k, v);

const mx = (a, p, b) => `color-mix(in oklab, ${a} ${p}%, ${b})`;

function vars(t) {
  const M = t.surface || t.main, P0 = t.second, A = t.accent, Sx = t.ink || P0, onA = t.onAccent, v = {};
  if (t.mode === "light") {
    v["--neutral-0"] = mx(M, 38, "#fff"); v["--neutral-50"] = mx(M, 72, "#fff"); v["--neutral-100"] = M;
    [[150, 6], [200, 11], [300, 20], [400, 40], [500, 56], [600, 66], [700, 78], [800, 88], [900, 95]].forEach(([k, q]) => (v["--neutral-" + k] = mx(Sx, q, M)));
    v["--neutral-950"] = Sx;
    v["--page-bg"] = M; v["--surface"] = "var(--neutral-0)"; v["--surface-raised"] = "var(--neutral-0)"; v["--surface-sunken"] = "var(--neutral-50)";
    v["--surface-hover"] = mx(Sx, 5, "var(--neutral-0)"); v["--surface-active"] = mx(Sx, 9, "var(--neutral-0)");
    v["--on-primary"] = mx(M, 30, "#fff"); v["--primary-hover"] = mx(P0, 85, "#000"); v["--primary-pressed"] = mx(P0, 75, "#000");
    [[50, 7], [100, 14], [200, 26], [300, 48]].forEach(([k, q]) => (v["--accent-" + k] = mx(A, q, "var(--neutral-0)")));
    v["--accent-400"] = A; v["--accent-500"] = mx(A, 88, "#000"); v["--accent-600"] = mx(A, 80, "#000");
    [[700, 58], [800, 44], [900, 32], [950, 22]].forEach(([k, q]) => (v["--accent-" + k] = mx(A, q, Sx)));
    v["--accent-tint-fg"] = "var(--accent-800)";
    v["--toast-bg"] = Sx; v["--toast-fg"] = M; v["--toast-muted"] = mx(M, 70, "transparent"); v["--toast-action"] = A;
    v["--brand-ink"] = P0; v["--brand-ink-2"] = mx(P0, 90, "#fff"); v["--on-brand"] = M; v["--on-brand-muted"] = mx(M, 66, "transparent"); v["--on-brand-faint"] = mx(M, 42, "transparent");
    v["--glass-bg"] = mx("var(--neutral-0)", 66, "transparent");
  } else {
    v["--neutral-0"] = mx(Sx, 7, M); v["--neutral-50"] = mx(Sx, 10, M);
    [[100, 13], [150, 17], [200, 21], [300, 28], [400, 42], [500, 56], [600, 66], [700, 78], [800, 88], [900, 95]].forEach(([k, q]) => (v["--neutral-" + k] = mx(Sx, q, M)));
    v["--neutral-950"] = Sx;
    v["--page-bg"] = M; v["--surface"] = "var(--neutral-0)"; v["--surface-raised"] = mx(Sx, 11, M); v["--surface-sunken"] = mx(M, 82, "#000");
    v["--surface-hover"] = mx(Sx, 12, M); v["--surface-active"] = mx(Sx, 16, M);
    v["--on-primary"] = M; v["--primary-hover"] = mx(Sx, 88, "#fff"); v["--primary-pressed"] = mx(Sx, 85, M);
    [[50, 10], [100, 16], [200, 24], [300, 38]].forEach(([k, q]) => (v["--accent-" + k] = mx(A, q, M)));
    v["--accent-400"] = A; v["--accent-500"] = mx(A, 85, "#fff"); v["--accent-600"] = mx(A, 75, "#fff");
    [[700, 62], [800, 48], [900, 34], [950, 20]].forEach(([k, q]) => (v["--accent-" + k] = mx(A, q, "#fff")));
    v["--accent-tint-fg"] = mx(A, 70, "#fff");
    v["--toast-bg"] = Sx; v["--toast-fg"] = M; v["--toast-muted"] = mx(M, 70, "transparent"); v["--toast-action"] = mx(A, 80, "#000");
    v["--brand-ink"] = mx(M, 70, "#000"); v["--brand-ink-2"] = mx(M, 85, "#000"); v["--on-brand"] = Sx; v["--on-brand-muted"] = mx(Sx, 66, "transparent"); v["--on-brand-faint"] = mx(Sx, 42, "transparent");
    v["--glass-bg"] = mx(M, 70, "transparent");
  }
  Object.assign(v, {
    "--text-primary": "var(--neutral-950)", "--text-secondary": "var(--neutral-700)", "--text-tertiary": "var(--neutral-600)",
    "--border": mx(Sx, 12, "transparent"), "--border-strong": mx(Sx, 20, "transparent"), "--border-field": mx(Sx, 24, "transparent"), "--border-field-hover": mx(Sx, 40, "transparent"), "--divider": mx(Sx, 9, "transparent"),
    "--primary": P0, "--accent": A, "--accent-hover": "var(--accent-500)", "--on-accent": onA, "--control": A, "--on-control": onA,
    "--accent-tint": "var(--accent-100)", "--accent-line": A, "--accent-wash": mx(A, 12, "transparent"), "--accent-wash-strong": mx(A, 20, "transparent"),
    "--nav-active-icon": Sx, "--focus-color": Sx, "--field-bg": "var(--neutral-0)", "--field-focus-halo": `0 0 0 3px ${mx(A, 30, "transparent")}`,
    "--viz-ink": "var(--neutral-800)", "--viz-line": A, "--viz-1": A, "--viz-2": P0, "--viz-3": mx(A, 50, M), "--viz-4": mx(Sx, 40, M), "--viz-5": mx(Sx, 18, M), "--viz-wash": mx(Sx, 7, "transparent"),
    "--heat-0": mx(Sx, 8, M), "--heat-1": mx(A, 22, M), "--heat-2": mx(A, 45, M), "--heat-3": mx(A, 70, M), "--heat-4": A,
    "--ill-glow": mx(A, 35, M), "--ill-glow-2": mx(A, 20, M), "--tab-glow": mx(A, 40, M), "--ill-edge": mx(A, 30, "transparent"), "--ill-line": mx(A, 38, "transparent"), "--ill-fold": mx(A, 22, "transparent"), "--ill-shadow": mx(A, 13, "transparent"),
    "--brand-accent": A, "--brand-glow": mx(A, 50, "transparent"),
    "--kbd-bg": "var(--neutral-100)", "--skeleton": "var(--neutral-150)",
  });
  if (t.overrides) Object.assign(v, t.overrides);
  return v;
}

const ids = new Set();
const out = [
  "/* STC · 30 temi 60·30·10. Generato da scripts/temi.mjs a partire da temi.json: non modificare a mano.",
  "   Uso: carica dopo tokens.css e metti sullo stesso elemento data-palette=\"<id>\" e data-theme col modo del tema,",
  "   es. <html data-theme=\"light\" data-palette=\"tahini\">. Senza data-palette resta STC di serie, blu. */",
];
for (const t of themes) {
  if (!/^[a-z][a-z0-9-]*$/.test(t.id) || ids.has(t.id)) throw new Error("id non valido o doppio: " + t.id);
  if (t.mode !== "light" && t.mode !== "dark") throw new Error(t.id + ": mode deve essere light o dark");
  ids.add(t.id);
  // dei token di base servono solo quelli che puntano ad altri token: vanno ricalcolati sull'elemento del tema
  const all = new Map([...BASE[t.mode]].filter(([, x]) => x.includes("var("))); for (const [k, x] of Object.entries(vars(t))) all.set(k, x);
  const body = [...all].map(([k, x]) => `  ${k}: ${x};`).join("\n");
  out.push(`\n/* ${t.name} · ${t.mode === "light" ? "chiaro" : "scuro"} */\n[data-palette="${t.id}"] {\n  color-scheme: ${t.mode};\n${body}\n}`);
}
const css = out.join("\n") + "\n";
const file = path.join(ROOT, "temi.css");
if (process.argv.includes("--check")) {
  const cur = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  if (cur !== css) { console.error("temi.css non è aggiornato: esegui node scripts/temi.mjs"); process.exit(1); }
  console.log("temi.css aggiornato · " + themes.length + " temi");
} else { fs.writeFileSync(file, css); console.log("temi.css · " + themes.length + " temi"); }
