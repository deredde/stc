#!/usr/bin/env node
// Tiene allineata la guida per le AI con il resto di STC.
//
//   node scripts/guida-ai.mjs           controlla (esce con 1 se qualcosa non torna)
//   node scripts/guida-ai.mjs --scrivi  rigenera componenti.md, poi controlla
//
// Controlla che:
//   1. CLAUDE.md e AGENTS.md siano identici;
//   2. componenti.md sia aggiornato rispetto a components/<Nome>/README.md;
//   3. ogni regola di regole.md abbia codice unico, Regola, Perché, Invece e Fonte;
//   4. ogni sezione di default.md sia coperta da almeno una regola (Fonte: `default.md` §N);
//   5. i componenti citati tra apici in regole.md e CLAUDE.md esistano davvero;
//   6. i codici di regola citati altrove esistano in regole.md;
//   7. i file citati nelle Fonti esistano;
//   8. nessun file pubblico nomini il gestionale d'origine.
// Nessuna dipendenza: basta Node 18 o più nuovo.

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const leggi = (p) => readFileSync(join(ROOT, p), 'utf8');
const errori = [];
const errore = (m) => errori.push(m);

// ---------- componenti ----------
const ESCLUSI = new Set(['lib', 'Cover']);
const ORDINE_GRUPPI = ['Layout', 'Testate', 'Navigazione', 'Azioni', 'Form', 'Date e ore', 'Passi', 'Overlay', 'Dati', 'Grafici', 'Stato', 'Caricamento', 'Mobile', 'Marca'];

function componenti() {
  const dir = join(ROOT, 'components');
  return readdirSync(dir)
    .filter((n) => !ESCLUSI.has(n) && statSync(join(dir, n)).isDirectory())
    .sort((a, b) => a.localeCompare(b))
    .map((nome) => {
      const readme = join(dir, nome, 'README.md');
      const preview = join(dir, nome, 'preview.html');
      if (!existsSync(readme)) {
        errore(`components/${nome}/ non ha README.md: ogni componente ha la sua scheda.`);
        return null;
      }
      const testo = readFileSync(readme, 'utf8');
      const righe = testo.split('\n');
      const i = righe.findIndex((r, k) => k > 0 && r.trim() && !r.startsWith('#'));
      const descr = (righe[i] || '').trim();
      const quando = (testo.match(/^\*\*Quando:\*\*\s*(.+)$/m) || [])[1] || '';
      let gruppo = 'Altro';
      if (existsSync(preview)) {
        const m = readFileSync(preview, 'utf8').match(/@dsCard[^>]*group="([^"]+)"/);
        if (m) gruppo = m[1];
      }
      return { nome, descr, quando, gruppo };
    })
    .filter(Boolean);
}

// ---------- regole ----------
const RE_TITOLO = /^### ([PDCSTVAM]\d+) · (.+)$/;
function regole() {
  const testo = leggi('regole.md');
  const blocchi = testo.split(/\n(?=### )/).filter((b) => b.startsWith('### '));
  const viste = new Set();
  return blocchi.map((b) => {
    const titolo = b.split('\n')[0];
    const m = titolo.match(RE_TITOLO);
    if (!m) {
      errore(`regole.md: titolo non valido «${titolo}» (serve «### X1 · Titolo»).`);
      return null;
    }
    const [, codice] = m;
    if (viste.has(codice)) errore(`regole.md: il codice ${codice} è usato due volte.`);
    viste.add(codice);
    for (const campo of ['Regola', 'Perché', 'Invece', 'Fonte']) {
      if (!new RegExp(`^- \\*\\*${campo}:\\*\\* \\S`, 'm').test(b)) errore(`regole.md ${codice}: manca «${campo}».`);
    }
    const fonte = (b.match(/^- \*\*Fonte:\*\* (.+)$/m) || [])[1] || '';
    return { codice, testo: b, fonte };
  }).filter(Boolean);
}

function codiciPerComponente(lista, nomi) {
  const mappa = new Map(nomi.map((n) => [n, []]));
  for (const r of lista) {
    for (const [, nome] of r.testo.matchAll(/`([A-Z][A-Za-z]+)[ `]/g)) {
      const l = mappa.get(nome);
      if (l && !l.includes(r.codice)) l.push(r.codice);
    }
    for (const [, nome] of r.fonte.matchAll(/components\/([A-Za-z]+)\//g)) {
      const l = mappa.get(nome);
      if (l && !l.includes(r.codice)) l.push(r.codice);
    }
  }
  return mappa;
}

const cella = (s) => s.replace(/\|/g, '\\|');

function componentiMd(lista, mappa) {
  const gruppi = new Map();
  for (const c of lista) {
    if (!gruppi.has(c.gruppo)) gruppi.set(c.gruppo, []);
    gruppi.get(c.gruppo).push(c);
  }
  const ordine = [...gruppi.keys()].sort((a, b) => {
    const ia = ORDINE_GRUPPI.indexOf(a), ib = ORDINE_GRUPPI.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
  });
  let out = `# Componenti di STC\n\n`;
  out += `<!-- File generato da scripts/guida-ai.mjs --scrivi: non modificarlo a mano. -->\n\n`;
  out += `Tutti i ${lista.length} componenti, per gruppo, con cosa sono e le regole di \`regole.md\` che li riguardano. Prima di usarne uno leggi la sua scheda (\`components/<Nome>/README.md\`); le props stanno in \`components/index.d.ts\`.\n`;
  for (const g of ordine) {
    out += `\n## ${g}\n\n| Componente | Cos'è | Regole |\n|---|---|---|\n`;
    for (const c of gruppi.get(g)) {
      const testo = c.quando ? `${c.descr} **Quando:** ${c.quando}` : c.descr;
      const codici = (mappa.get(c.nome) || []).join(' · ') || '—';
      out += `| [\`${c.nome}\`](components/${c.nome}/README.md) | ${cella(testo)} | ${codici} |\n`;
    }
  }
  return out;
}

// ---------- esecuzione ----------
const scrivi = process.argv.includes('--scrivi');
const lista = componenti();
const nomiComponenti = lista.map((c) => c.nome);
const listaRegole = regole();
const codici = new Set(listaRegole.map((r) => r.codice));

// 2. componenti.md
const atteso = componentiMd(lista, codiciPerComponente(listaRegole, nomiComponenti));
if (scrivi) writeFileSync(join(ROOT, 'componenti.md'), atteso);
else if (!existsSync(join(ROOT, 'componenti.md')) || leggi('componenti.md') !== atteso)
  errore('componenti.md non è aggiornato: lancia «node scripts/guida-ai.mjs --scrivi».');

// 1. CLAUDE.md == AGENTS.md
if (leggi('CLAUDE.md') !== leggi('AGENTS.md')) errore('CLAUDE.md e AGENTS.md devono essere identici: copia uno sull\'altro.');

// 4. default.md coperto
const sezioni = [...leggi('default.md').matchAll(/^## (\d+)\. (.+)$/gm)];
for (const [, n, titolo] of sezioni) {
  const cita = (r) => {
    const pezzo = (r.fonte.split('`default.md`')[1] || '').split('·')[0];
    return [...pezzo.matchAll(/§\s*(\d+)/g)].some((m) => m[1] === n);
  };
  if (!listaRegole.some(cita))
    errore(`default.md §${n} «${titolo}» non ha nessuna regola in regole.md che la spieghi (Fonte: \`default.md\` §${n}).`);
}

// 5. nomi citati esistono
const dts = leggi('components/index.d.ts');
const esportati = new Set([...dts.matchAll(/^export (?:declare )?(?:const|function|interface|type|class) ([A-Za-z_]+)/gm)].map((m) => m[1]));
const noti = new Set([...esportati, ...nomiComponenti]);
for (const file of ['regole.md', 'CLAUDE.md']) {
  for (const [, nome] of leggi(file).matchAll(/`([A-Z][a-z]+[A-Z][A-Za-z]*|[A-Z][a-z]{2,})(?=[ `])/g)) {
    if (!noti.has(nome)) errore(`${file}: \`${nome}\` non è un componente né un export di index.d.ts.`);
  }
}

// 6. codici citati esistono
for (const file of ['CLAUDE.md', 'README.md', 'llms.txt', 'regole.md']) {
  if (!existsSync(join(ROOT, file))) { errore(`manca ${file}.`); continue; }
  for (const [, c] of leggi(file).matchAll(/\b([PDCSTVAM]\d{1,2})\b/g)) {
    if (!codici.has(c)) errore(`${file}: cita la regola ${c}, che non esiste in regole.md.`);
  }
}

// 7. file citati nelle Fonti
for (const r of listaRegole) {
  for (const [, p] of r.fonte.matchAll(/`([\w./-]+\.md)`/g)) {
    if (!existsSync(join(ROOT, p))) errore(`regole.md ${r.codice}: la fonte ${p} non esiste.`);
  }
}

// 8. nessun riferimento al gestionale d'origine
const VIETATO = new RegExp(['v', 'i', 'g', 'o', 'r'].join(''), 'i');
const TESTO = /\.(md|txt|json|css|js|mjs|ts|html|svg|yml|yaml)$/;
(function giro(dir) {
  for (const n of readdirSync(dir)) {
    if (n === '.git' || n === 'node_modules' || n === 'dist') continue;
    const p = join(dir, n);
    if (statSync(p).isDirectory()) giro(p);
    else if (TESTO.test(n) && VIETATO.test(readFileSync(p, 'utf8'))) errore(`${relative(ROOT, p)}: nomina il gestionale d'origine, va tolto dalla copia pubblica.`);
  }
})(ROOT);

if (errori.length) {
  console.error(`Guida per le AI: ${errori.length} cose da sistemare\n`);
  for (const e of errori) console.error(`- ${e}`);
  process.exit(1);
}
console.log(`Guida per le AI in ordine: ${listaRegole.length} regole, ${lista.length} componenti, CLAUDE.md = AGENTS.md.`);
