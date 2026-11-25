// Costruisce il sito di STC leggendo i file della repo.
// Uso: node build.mjs [cartella-di-uscita]   (di serie: dist)
// Fonti: ../tokens.css, ../components/<Nome>/{preview.html,README.md}, ../components/bundle.*,
//        ../components/lib/*, ../assets/Logo/*.svg, ../README.md, ../default.md, ../pattern.md, ../adattare.md
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as acorn from "acorn";
import * as prettier from "prettier";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, process.env.STC_ROOT || "..");
const OUT = path.resolve(HERE, process.argv[2] || "dist");
const SRC = path.join(HERE, "src");
const COMP = path.join(ROOT, "components");
const SKIP = new Set(["Cover", "lib"]);
const GROUP_ORDER = ["Azioni", "Form", "Date e ore", "Passi", "Layout", "Testate", "Navigazione", "Overlay", "Mobile", "Dati", "Grafici", "Stato", "Caricamento", "Marca"];

const read = (p) => fs.readFileSync(p, "utf8");
const write = (p, s) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };
const copy = (a, b) => { fs.mkdirSync(path.dirname(b), { recursive: true }); fs.copyFileSync(a, b); };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ---------- markdown minimo ----------
function inline(s) {
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return `\u0000${codes.length - 1}\u0000`; });
  s = esc(s)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*\w])\*([^*\s][^*]*)\*(?!\w)/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => `<a href="${u}"${/^https?:/.test(u) ? ' target="_blank" rel="noopener"' : ""}>${t}</a>`);
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[+i])}</code>`);
}
function md(text) {
  const L = text.replace(/\r/g, "").split("\n"); const out = []; let i = 0;
  const isItem = (l) => /^\s*([-*]|\d+\.)\s+/.test(l);
  while (i < L.length) {
    const l = L[i];
    if (!l.trim()) { i++; continue; }
    if (/^```/.test(l)) { const lang = l.slice(3).trim(); const b = []; i++; while (i < L.length && !/^```/.test(L[i])) b.push(L[i++]); i++; out.push(`<pre class="code"><code data-lang="${esc(lang)}">${esc(b.join("\n"))}</code></pre>`); continue; }
    let m = l.match(/^(#{1,6})\s+(.*)/);
    if (m) { const lv = Math.min(m[1].length + 1, 4); const t = m[2].replace(/\s*#+\s*$/, ""); out.push(`<h${lv} id="${slug(t)}">${inline(t)}</h${lv}>`); i++; continue; }
    if (/^\s*\|/.test(l)) {
      const rows = []; while (i < L.length && /^\s*\|/.test(L[i])) rows.push(L[i++]);
      const cells = rows.map((r) => r.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
      const body = cells.filter((r) => !r.every((c) => /^:?-{2,}:?$/.test(c || "--")));
      if (body.length) out.push(`<div class="tw"><table><thead><tr>${body[0].map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${body.slice(1).map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }
    if (isItem(l)) {
      const ordered = /^\s*\d+\./.test(l); const items = [];
      while (i < L.length && (isItem(L[i]) || (/^\s{2,}\S/.test(L[i]) && items.length))) {
        if (isItem(L[i]) && !/^\s{2,}/.test(L[i])) items.push(L[i].replace(/^\s*([-*]|\d+\.)\s+/, ""));
        else items[items.length - 1] += "\n" + L[i].replace(/^\s{2,4}/, "");
        i++;
      }
      out.push(`<${ordered ? "ol" : "ul"}>${items.map((t) => { const [h, ...r] = t.split("\n"); return `<li>${inline(h)}${r.length ? md(r.join("\n")) : ""}</li>`; }).join("")}</${ordered ? "ol" : "ul"}>`);
      continue;
    }
    if (/^>\s?/.test(l)) { const b = []; while (i < L.length && /^>\s?/.test(L[i])) b.push(L[i++].replace(/^>\s?/, "")); out.push(`<blockquote>${md(b.join("\n"))}</blockquote>`); continue; }
    const p = []; while (i < L.length && L[i].trim() && !/^(#{1,6}\s|```|\s*\||>)/.test(L[i]) && !isItem(L[i])) p.push(L[i++].trim());
    out.push(`<p>${inline(p.join(" "))}</p>`);
  }
  return out.join("\n");
}
function slug(t) { return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
function splitDoc(text) {
  // titolo, prima frase, resto
  const lines = text.replace(/\r/g, "").split("\n");
  let title = ""; if (/^#\s/.test(lines[0])) title = lines.shift().replace(/^#\s+/, "").trim();
  const rest = lines.join("\n").trim();
  const firstPara = rest.split(/\n\s*\n/)[0] || "";
  const lead = /^[#|\-*`>]/.test(firstPara) ? "" : firstPara.replace(/\s+/g, " ").trim();
  return { title, lead, body: lead ? rest.slice(rest.indexOf(firstPara) + firstPara.length).trim() : rest };
}

// ---------- tinta dell'accento ----------
// Ogni valore oklch con tinta 260 (o 240) diventa calc(var(--h) ± delta); gli rgba dell'accento diventano color-mix.
function hueCss(tokens) {
  const blocks = {}; const re = /(^|\n)(:root|\[data-theme="dark"\])\s*\{([\s\S]*?)\n\}/g; let m;
  while ((m = re.exec(tokens))) blocks[m[2]] = m[3];
  const conv = (body) => body.split("\n").map((ln) => {
    const d = ln.match(/^\s*(--[\w-]+):\s*(.+);\s*$/); if (!d) return null;
    let [, name, v] = d; let changed = false;
    if (/^--(info|success|danger|warning|neutral)-/.test(name)) return `  ${name}: ${v};`;
    v = v.replace(/oklch\(([\d.]+) ([\d.]+) (260|240)\)/g, (_, L, C, H) => { changed = true; return `oklch(${L} ${C} calc(var(--h, 260) ${H === "260" ? "+ 0" : "- 20"}))`; });
    v = v.replace(/rgba\((2, 103, 243|131, 178, 255), ([\d.]+)\)/g, (_, c, a) => { changed = true; return `color-mix(in srgb, var(--accent-400) ${Math.round(a * 100)}%, transparent)`; });
    return `  ${name}: ${v};`;
  }).filter(Boolean).join("\n");
  return `/* Generato da build.mjs: stessi token di tokens.css, con la tinta dell'accento in --h. */\n[data-hue] {\n${conv(blocks[":root"])}\n}\n[data-hue][data-theme="dark"] {\n${conv(blocks['[data-theme="dark"]'])}\n}\n`;
}

// ---------- codice delle anteprime: da createElement a JSX ----------
function collectCalls(ast) {
  const calls = [];
  (function walk(n) {
    if (!n || typeof n.type !== "string") return;
    if (n.type === "CallExpression" && n.callee.type === "MemberExpression" && n.callee.object.name === "React" && n.callee.property.name === "createElement" && n.arguments.length) calls.push(n);
    for (const k in n) { if (k === "loc") continue; const v = n[k]; if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v.type === "string") walk(v); }
  })(ast);
  return calls;
}
function toJsx(src, calls) {
  const outer = (s, e) => calls.filter((c) => c.start >= s && c.end <= e && !calls.some((o) => o !== c && o.start >= s && o.end <= e && o.start <= c.start && o.end >= c.end && (o.start < c.start || o.end > c.end)));
  const splice = (s, e) => { let out = "", p = s; for (const c of outer(s, e).sort((a, b) => a.start - b.start)) { out += src.slice(p, c.start) + jsx(c); p = c.end; } return out + src.slice(p, e); };
  const expr = (n) => splice(n.start, n.end);
  function jsx(c) {
    const [t, props, ...kids] = c.arguments;
    let tag = t.type === "Literal" ? t.value : src.slice(t.start, t.end);
    if (tag === "React.Fragment") tag = "";
    let attrs = "";
    if (props && props.type === "ObjectExpression") {
      for (const p of props.properties) {
        if (p.type === "SpreadElement") { attrs += ` {...${expr(p.argument)}}`; continue; }
        const k = p.key.type === "Identifier" ? p.key.name : p.key.value;
        if (p.value.type === "Literal" && typeof p.value.value === "string" && !/["\n{}]/.test(p.value.value)) attrs += ` ${k}="${p.value.value}"`;
        else if (p.value.type === "Literal" && p.value.value === true) attrs += ` ${k}`;
        else attrs += ` ${k}={${expr(p.value)}}`;
      }
    } else if (props && !(props.type === "Literal" && props.value === null)) attrs += ` {...${expr(props)}}`;
    const body = kids.map((k) => {
      if (k.type === "Literal" && typeof k.value === "string") return /^\s|\s$|[{}<>]/.test(k.value) ? `{${JSON.stringify(k.value)}}` : k.value;
      if (k.type === "CallExpression" && calls.includes(k)) return jsx(k);
      return `{${expr(k)}}`;
    }).join("");
    return body ? `<${tag}${attrs}>${body}</${tag}>` : `<${tag}${attrs} />`;
  }
  return { splice };
}

function scriptOf(html) { const m = html.match(/<script>([\s\S]*?)<\/script>/); return m ? m[1] : ""; }

async function main() {
  fs.rmSync(OUT, { recursive: true, force: true });
  const A = path.join(OUT, "assets");
  // STC
  const tokens = read(path.join(ROOT, "tokens.css"));
  write(path.join(A, "stc/tokens.css"), tokens);
  write(path.join(A, "stc/hue.css"), hueCss(tokens));
  copy(path.join(COMP, "bundle.css"), path.join(A, "stc/bundle.css"));
  copy(path.join(COMP, "bundle.js"), path.join(A, "stc/bundle.js"));
  copy(path.join(COMP, "lib/react.production.min.js"), path.join(A, "stc/react.js"));
  copy(path.join(COMP, "lib/react-dom.production.min.js"), path.join(A, "stc/react-dom.js"));
  const logoDir = path.join(ROOT, "assets/Logo");
  for (const f of fs.readdirSync(logoDir).filter((f) => f.endsWith(".svg"))) copy(path.join(logoDir, f), path.join(A, "logo", f));
  for (const f of fs.readdirSync(path.join(SRC, "assets"))) copy(path.join(SRC, "assets", f), path.join(A, f));

  // componenti
  const names = fs.readdirSync(COMP).filter((d) => !SKIP.has(d) && fs.statSync(path.join(COMP, d)).isDirectory()).sort();
  const missing = names.filter((n) => !fs.existsSync(path.join(COMP, n, "preview.html")) || !fs.existsSync(path.join(COMP, n, "README.md")));
  if (missing.length) { console.error("Manca README.md o preview.html in: " + missing.join(", ")); process.exit(1); }

  const previews = names.map((n) => ({ n, html: read(path.join(COMP, n, "preview.html")) }));
  // prologo comune (const {...} = STC, dati di prova): le istruzioni presenti in molte anteprime
  const freq = new Map(); const parsed = {};
  for (const { n, html } of previews) {
    const s = scriptOf(html); try { parsed[n] = { s, ast: acorn.parse(s, { ecmaVersion: "latest" }) }; } catch { parsed[n] = { s, ast: null }; continue; }
    for (const st of parsed[n].ast.body) { const k = s.slice(st.start, st.end); freq.set(k, (freq.get(k) || 0) + 1); }
  }
  const common = new Set([...freq].filter(([, c]) => c >= Math.max(5, previews.length * 0.25)).map(([k]) => k));
  const STC_NAMES = new Set((read(path.join(COMP, "bundle.js")).match(/[A-Z][A-Za-z]+/g) || []));

  const comps = [];
  for (const { n, html } of previews) {
    const head = html.match(/<!--\s*@dsCard([^>]*)-->/); const meta = head ? head[1] : "";
    const group = (meta.match(/group="([^"]+)"/) || [])[1] || "Altro";
    const height = +((meta.match(/height=(\d+)/) || [])[1] || 320);
    const doc = splitDoc(read(path.join(COMP, n, "README.md")));
    // codice
    let code = "";
    const { s, ast } = parsed[n];
    if (ast) {
      const own = ast.body.filter((st) => !common.has(s.slice(st.start, st.end)));
      const calls = collectCalls(ast); const { splice } = toJsx(s, calls);
      let body = own.map((st) => splice(st.start, st.end)).join("\n\n");
      const destr = ast.body.find((st) => st.type === "VariableDeclaration" && st.declarations[0]?.init && /window\.STC$/.test(s.slice(st.declarations[0].init.start, st.declarations[0].init.end)));
      const avail = destr && destr.declarations[0].id.type === "ObjectPattern" ? destr.declarations[0].id.properties.filter((p) => p.key).map((p) => p.key.name) : [];
      const used = avail.filter((k) => new RegExp(`\\b${k}\\b`).test(body));
      body = body.replace(/ReactDOM\.createRoot\(root\)/g, 'ReactDOM.createRoot(document.getElementById("root"))');
      if (!/createRoot/.test(body) && /function Demo\(/.test(body)) body += '\n\nReactDOM.createRoot(document.getElementById("root")).render(<Demo />);';
      body = body.replace(/\\u([0-9a-fA-F]{4})/g, (_, x) => String.fromCharCode(parseInt(x, 16))).replace(/\\x([0-9a-fA-F]{2})/g, (_, x) => String.fromCharCode(parseInt(x, 16)));
      code = (used.length ? `const { ${used.join(", ")} } = window.STC;\n\n` : "") + body;
      try { code = await prettier.format(code, { parser: "babel", printWidth: 88, semi: true }); } catch { /* lascia com'è */ }
    }
    comps.push({ name: n, group, height, title: doc.title || n, lead: doc.lead, html: md(doc.body), code });
    // riquadro live
    let f = html.replace(/^<!--\s*@dsCard[^>]*-->\s*/, "");
    const inject = `<meta name="viewport" content="width=device-width,initial-scale=1"><script>(function(){var q=new URLSearchParams(location.search),d=document.documentElement;d.setAttribute('data-theme',q.get('theme')==='dark'?'dark':'light');d.setAttribute('data-hue','');d.style.setProperty('--h',q.get('h')||'260')})()</script><link rel="stylesheet" href="../assets/stc/tokens.css"><link rel="stylesheet" href="../assets/stc/bundle.css"><link rel="stylesheet" href="../assets/stc/hue.css"><style>html,body{background:var(--page-bg);color:var(--text-primary);font-family:var(--font-text);margin:0}</style><script src="../assets/stc/react.js"></script><script src="../assets/stc/react-dom.js"></script><script src="../assets/stc/bundle.js"></script><script src="../assets/frame.js"></script>`;
    f = /<head[^>]*>/.test(f) ? f.replace(/<head[^>]*>/, (h) => h + inject) : inject + f;
    write(path.join(OUT, "frame", n + ".html"), f);
  }
  comps.sort((a, b) => (GROUP_ORDER.indexOf(a.group) + 1 || 99) - (GROUP_ORDER.indexOf(b.group) + 1 || 99) || a.name.localeCompare(b.name));

  // pagine di testo
  const pageDoc = (file, id, label) => { const d = splitDoc(read(path.join(ROOT, file))); return { id, label, lead: d.lead, html: md(d.body) }; };
  const readme = splitDoc(read(path.join(ROOT, "README.md")));
  const pages = [
    { id: "introduzione", label: "Introduzione", lead: readme.lead, html: md(readme.body) },
    { id: "installazione", label: "Installazione", lead: "Tre modi per usare STC: dal CDN in una pagina, dentro un progetto React, o copiando la repo.", html: md(read(path.join(SRC, "installazione.md"))) },
    { id: "temi", label: "Temi e colore", lead: "Chiaro e scuro sono di serie. L'accento si cambia da un solo valore: la tinta.", html: md(read(path.join(SRC, "temi.md"))), special: "temi" },
    pageDoc("default.md", "regole", "Regole di default"),
    pageDoc("pattern.md", "pattern", "Pattern di pagina"),
    pageDoc("adattare.md", "adattare", "Adattare a un progetto"),
  ];
  const data = { pages, comps, groups: GROUP_ORDER.filter((g) => comps.some((c) => c.group === g)).concat([...new Set(comps.map((c) => c.group))].filter((g) => !GROUP_ORDER.includes(g))) };
  write(path.join(A, "docs-data.js"), "window.STC_DOCS=" + JSON.stringify(data) + ";");

  const stats = { comps: comps.length };
  for (const f of ["index.html", "docs.html"]) write(path.join(OUT, f), read(path.join(SRC, f)).replace(/\{\{COMPS\}\}/g, stats.comps));
  console.log(`Fatto: ${comps.length} componenti, ${pages.length} pagine → ${path.relative(process.cwd(), OUT) || OUT}`);
}
main();
