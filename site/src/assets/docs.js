// Documentazione: indice laterale, pagine dei componenti con riquadro live, tema e tinta.
(function () {
  var S = window.SITE, D = window.STC_DOCS, X = window.STC;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };
  var I = function (n, s) { return S.icon(n, s || 16); };
  var RES = [{ id: "icone", label: "Icone" }, { id: "illustrazioni", label: "Illustrazioni" }, { id: "logo", label: "Logo" }];
  var width = "desktop", tab = "preview";

  // ---------- indice ----------
  var order = [];
  function toc() {
    var h = '<h4>Inizio</h4>' + D.pages.map(function (p) { order.push("p-" + p.id); return '<a href="#p-' + p.id + '" data-k="' + esc(p.label) + '">' + esc(p.label) + "</a>"; }).join("");
    h += '<h4>Risorse</h4>' + RES.map(function (p) { order.push("p-" + p.id); return '<a href="#p-' + p.id + '" data-k="' + p.label + '">' + p.label + "</a>"; }).join("");
    D.groups.forEach(function (g) {
      var cs = D.comps.filter(function (c) { return c.group === g; });
      h += '<div class="grp"><h4>' + esc(g) + "<span>" + cs.length + "</span></h4>" + cs.map(function (c) { order.push("c-" + c.name); return '<a href="#c-' + c.name + '" data-k="' + esc(c.name + " " + c.title + " " + g) + '">' + esc(c.name) + "</a>"; }).join("") + "</div>";
    });
    $("#toc").innerHTML = h;
  }
  function filter(q) {
    q = q.trim().toLowerCase();
    document.querySelectorAll("#toc a").forEach(function (a) { a.hidden = q && a.getAttribute("data-k").toLowerCase().indexOf(q) < 0; });
    document.querySelectorAll("#toc .grp").forEach(function (g) { g.hidden = !g.querySelector("a:not([hidden])"); });
    document.querySelectorAll("#toc > h4").forEach(function (h4) { var n = h4.nextElementSibling, any = false; while (n && n.tagName === "A") { if (!n.hidden) any = true; n = n.nextElementSibling; } h4.hidden = !any; });
  }

  // ---------- evidenziazione del codice ----------
  var KW = /^(const|let|var|function|return|if|else|for|while|new|import|from|export|default|true|false|null|undefined|void|typeof|of|in|class|extends|async|await|try|catch)$/;
  function hl(src) {
    var out = "", re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(<\/?[A-Za-z][\w.]*)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)(?=\s*=(?!=)|\s*:)|([A-Za-z_$][\w$]*)/g, m, last = 0;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index)); last = re.lastIndex;
      if (m[1]) out += '<span class="tk-c">' + esc(m[1]) + "</span>";
      else if (m[2]) out += '<span class="tk-s">' + esc(m[2]) + "</span>";
      else if (m[3]) out += '<span class="tk-t">' + esc(m[3]) + "</span>";
      else if (m[4]) out += '<span class="tk-n">' + m[4] + "</span>";
      else if (m[5]) out += KW.test(m[5]) ? '<span class="tk-k">' + m[5] + "</span>" : '<span class="tk-a">' + m[5] + "</span>";
      else out += KW.test(m[6]) ? '<span class="tk-k">' + m[6] + "</span>" : esc(m[6]);
    }
    return out + esc(src.slice(last));
  }

  // ---------- barra del riquadro ----------
  // tinta e tema dell'anteprima: valgono solo per il componente che guardi, non per il sito
  var P = { theme: S.theme, h: 260 };
  function setP(k, v) { P[k] = v; syncBar(); }
  function swatches() { return '<span class="swatches" role="group" aria-label="Tinta dell\'accento">' + S.HUES.map(function (x) { return '<button type="button" class="sw" style="--sw:' + x[0] + '" data-h="' + x[0] + '" aria-label="' + x[1] + '" title="' + x[1] + '" aria-pressed="' + (P.h === x[0]) + '"></button>'; }).join("") + "</span>"; }
  function themeSeg() { return '<span class="seg" role="group" aria-label="Tema"><button type="button" data-t="light" aria-pressed="' + (P.theme === "light") + '">' + I("sun", 15) + "Chiaro</button><button type=\"button\" data-t=\"dark\" aria-pressed=\"" + (P.theme === "dark") + '">' + I("moon", 15) + "Scuro</button></span>"; }
  function hueSlider() { return '<label class="hue"><input type="range" id="hue" min="0" max="359" value="' + P.h + '" aria-label="Tinta dell\'accento"><output id="hue-v">' + P.h + "</output></label>"; }
  function toolbar(extra) { return '<div class="toolbar glass">' + themeSeg() + swatches() + hueSlider() + '<span class="grow"></span>' + (extra || "") + '<button type="button" class="tb-btn" id="copy-theme">' + I("palette", 15) + "Tema</button></div>"; }
  function syncBar() {
    document.querySelectorAll("[data-t]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-t") === P.theme); });
    document.querySelectorAll(".sw[data-h]").forEach(function (b) { b.setAttribute("aria-pressed", +b.getAttribute("data-h") === P.h); });
    var r = $("#hue"); if (r && +r.value !== P.h) r.value = P.h; var o = $("#hue-v"); if (o) o.textContent = P.h;
    document.querySelectorAll("iframe.live").forEach(function (f) { try { f.contentWindow.postMessage({ stc: { theme: P.theme, h: P.h } }, "*"); } catch (e) {} });
    var sc = $("#scale"); if (sc) { sc.setAttribute("data-theme", P.theme); sc.style.setProperty("--h", P.h); }
  }
  function themeCss() {
    var out = [];
    ["light", "dark"].forEach(function (t) {
      var p = document.createElement("div"); p.setAttribute("data-hue", ""); p.setAttribute("data-theme", t); p.style.setProperty("--h", P.h); p.hidden = true; document.body.appendChild(p);
      var cs = getComputedStyle(p), lines = [];
      ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"].forEach(function (k) { lines.push("  --accent-" + k + ": " + cs.getPropertyValue("--accent-" + k).trim().replace(/calc\(([\d.]+) ([+-]) ([\d.]+)\)/, function (_, a, s, b) { return String(s === "+" ? +a + +b : +a - +b); }) + ";"); });
      ["--ill-glow", "--ill-glow-2"].forEach(function (k) { lines.push("  " + k + ": " + cs.getPropertyValue(k).trim().replace(/calc\(([\d.]+) ([+-]) ([\d.]+)\)/, function (_, a, s, b) { return String(s === "+" ? +a + +b : (+a - +b + 360) % 360); }) + ";"); });
      p.remove();
      out.push((t === "light" ? ":root" : '[data-theme="dark"]') + " {\n" + lines.join("\n") + "\n}");
    });
    return "/* STC · tinta " + P.h + " · incolla dopo tokens.css */\n" + out.join("\n");
  }

  // ---------- pagine ----------
  function pager(key) {
    var i = order.indexOf(key), p = order[i - 1], n = order[i + 1];
    var lab = function (k) { var c = k.slice(2); if (k[0] === "c") return c; var pg = D.pages.find(function (x) { return x.id === c; }) || RES.find(function (x) { return x.id === c; }); return pg ? pg.label : c; };
    return '<nav class="pager">' + (p ? '<a class="glass" href="#' + p + '"><span>Precedente</span><b>' + esc(lab(p)) + "</b></a>" : "<span></span>") + (n ? '<a class="glass next" href="#' + n + '"><span>Successivo</span><b>' + esc(lab(n)) + "</b></a>" : "") + "</nav>";
  }
  function compPage(c) {
    var src = "frame/" + c.name + ".html?theme=" + P.theme + "&h=" + P.h;
    var open = '<a class="tb-btn" href="frame/' + c.name + '.html" target="_blank" rel="noopener">' + I("external-link", 15) + "Apri</a>";
    var wseg = '<span class="seg" role="group" aria-label="Larghezza"><button type="button" data-w="desktop" aria-pressed="' + (width === "desktop") + '">' + I("monitor", 15) + 'Desktop</button><button type="button" data-w="phone" aria-pressed="' + (width === "phone") + '">' + I("smartphone", 15) + "Telefono</button></span>";
    return '<div class="crumb">Componenti · <b>' + esc(c.group) + "</b></div><h1>" + esc(c.name) + "</h1>" + (c.lead ? '<p class="lead">' + esc(c.lead) + "</p>" : "") +
      toolbar(wseg + open) +
      '<div class="tabs" role="tablist"><button type="button" role="tab" data-tab="preview" aria-selected="' + (tab === "preview") + '">Anteprima</button><button type="button" role="tab" data-tab="code" aria-selected="' + (tab === "code") + '">Codice</button></div>' +
      '<div class="viewer glass' + (width === "phone" ? " phone" : "") + '" ' + (tab === "code" ? "hidden" : "") + '><iframe class="live" title="Anteprima di ' + esc(c.name) + '" src="' + src + '" style="height:' + c.height + 'px" data-min="' + Math.min(c.height, 240) + '" loading="lazy"></iframe></div>' +
      '<div class="codebox" ' + (tab === "preview" ? "hidden" : "") + '><button type="button" class="copy" id="copy-code">Copia</button><pre><code>' + hl(c.code || "// Codice non disponibile") + "</code></pre></div>" +
      '<div class="prose">' + c.html + "</div>" + pager("c-" + c.name);
  }
  function textPage(p) {
    var extra = "";
    if (p.special === "temi") extra = toolbar() + '<div class="cards" id="scale"></div>';
    if (p.id === "introduzione") extra = '<div class="cards">' + D.groups.map(function (g) { var cs = D.comps.filter(function (c) { return c.group === g; }); return '<a class="glass" href="#c-' + cs[0].name + '"><b>' + esc(g) + "</b><span>" + cs.length + " componenti · " + esc(cs.slice(0, 4).map(function (c) { return c.name; }).join(", ")) + "</span></a>"; }).join("") + "</div>";
    return '<div class="crumb">Guida</div><h1>' + esc(p.label) + "</h1>" + (p.lead ? '<p class="lead">' + esc(p.lead) + "</p>" : "") + extra + '<div class="prose">' + p.html + "</div>" + pager("p-" + p.id);
  }
  function scale() {
    var el = $("#scale"); if (!el) return;
    el.setAttribute("data-hue", ""); el.setAttribute("data-theme", P.theme); el.style.setProperty("--h", P.h); el.style.background = "transparent";
    el.innerHTML = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"].map(function (k) { return '<div class="glass" style="padding:10px;border-radius:14px"><div style="height:54px;border-radius:10px;background:var(--accent-' + k + ')"></div><div style="font:11px var(--font-num);color:var(--text-tertiary);margin-top:8px">accent-' + k + "</div></div>"; }).join("");
  }
  var roots = [];
  function iconsPage() {
    var all = X.iconNames();
    return '<div class="crumb">Risorse</div><h1>Icone</h1><p class="lead">' + all.length.toLocaleString("it-IT") + ' icone Lucide 1.70 dentro STC. Clicca un\'icona per copiarne il nome e usarla con <code>&lt;Icon name="…" /&gt;</code>.</p><div class="side-search" style="max-width:420px">' + I("search", 16) + '<input id="iq" type="search" placeholder="Cerca un\'icona" aria-label="Cerca un\'icona" autocomplete="off"></div><div class="icons-all" id="icons"></div><p style="text-align:center"><button type="button" class="s-btn" id="more-icons">Mostra altre</button></p>' + pager("p-icone");
  }
  function paintIcons(q, n) {
    var all = X.iconNames().filter(function (x) { return !q || x.indexOf(q) >= 0; });
    $("#icons").innerHTML = all.slice(0, n).map(function (x) { return '<button type="button" data-icon="' + x + '" title="' + x + '">' + S.icon(x, 24) + "<span>" + x + "</span></button>"; }).join("");
    $("#more-icons").hidden = all.length <= n;
  }
  function illsPage() {
    return '<div class="crumb">Risorse</div><h1>Illustrazioni</h1><p class="lead">' + X.ILLUSTRAZIONI.length + ' illustrazioni animate per stati vuoti, esiti e messaggi. Seguono tema e tinta. Passa il mouse per animarle; usa <code>&lt;Illustration name="…" /&gt;</code>.</p><div id="ills"></div>' + pager("p-illustrazioni");
  }
  function logoPage() {
    var files = ["logo-chiaro", "logo-scuro", "logo-riga-chiaro", "logo-riga-scuro", "logo-breve-chiaro", "logo-breve-scuro", "simbolo-chiaro", "simbolo-scuro", "simbolo-piatto-chiaro", "simbolo-piatto-scuro", "simbolo-mono-nero", "simbolo-mono-bianco"];
    return '<div class="crumb">Risorse</div><h1>Logo</h1><p class="lead">L\'Esagono con STC in Michroma. «Chiaro» e «scuro» indicano il fondo su cui va il file.</p><div class="logos">' + files.map(function (f) { return '<figure class="glass' + (/scuro|bianco/.test(f) ? " dark" : "") + '"><img src="assets/logo/' + f + '.svg" alt="' + f + '"><figcaption>' + f + ".svg</figcaption></figure>"; }).join("") + "</div>" + pager("p-logo");
  }

  function route() {
    roots.forEach(function (r) { r.unmount(); }); roots = [];
    var k = location.hash.slice(1) || "p-introduzione", el = $("#content"), html = "";
    var c = k[0] === "c" && D.comps.find(function (x) { return "c-" + x.name === k; });
    var p = k[0] === "p" && D.pages.find(function (x) { return "p-" + x.id === k; });
    if (c) html = compPage(c);
    else if (p) html = textPage(p);
    else if (k === "p-icone") html = iconsPage();
    else if (k === "p-illustrazioni") html = illsPage();
    else if (k === "p-logo") html = logoPage();
    else { k = "p-introduzione"; html = textPage(D.pages[0]); }
    el.innerHTML = html;
    document.title = (c ? c.name : p ? p.label : k === "p-icone" ? "Icone" : k === "p-illustrazioni" ? "Illustrazioni" : k === "p-logo" ? "Logo" : "Documentazione") + " · STC";
    document.querySelectorAll("#toc a").forEach(function (a) { var on = a.getAttribute("href") === "#" + k; a.classList.toggle("on", on); if (on) a.scrollIntoView({ block: "nearest" }); });
    if (k === "p-icone") { var n = 240; paintIcons("", n); $("#iq").addEventListener("input", function () { n = 240; paintIcons(this.value.trim().toLowerCase(), n); }); $("#more-icons").addEventListener("click", function () { n += 480; paintIcons($("#iq").value.trim().toLowerCase(), n); }); }
    if (k === "p-illustrazioni") {
      var r = ReactDOM.createRoot($("#ills")); roots.push(r);
      var groups = []; X.ILLUSTRAZIONI.forEach(function (i) { if (groups.indexOf(i.group) < 0) groups.push(i.group); });
      r.render(React.createElement(React.Fragment, null, groups.map(function (g) {
        return React.createElement("section", { key: g, className: "prose", style: { maxWidth: "none", marginTop: 8 } }, React.createElement("h3", null, g), React.createElement("div", { className: "ills-all" }, X.ILLUSTRAZIONI.filter(function (i) { return i.group === g; }).map(function (i) { return React.createElement("div", { key: i.name, className: "glass" }, React.createElement(X.Illustration, { name: i.name, size: "md", animated: "hover" }), React.createElement("b", null, i.title || i.label), React.createElement("span", null, i.name)); })));
      })));
    }
    scale(); syncLogo();
    $("#side").classList.remove("open"); $("#side-btn").setAttribute("aria-expanded", "false");
    window.scrollTo(0, 0);
  }
  function syncLogo() { var dk = S.theme === "dark"; document.querySelectorAll(".brand img").forEach(function (im) { im.src = "assets/logo/simbolo-piatto-" + (dk ? "scuro" : "chiaro") + ".svg"; }); }

  // ---------- eventi ----------
  document.addEventListener("click", function (e) {
    var t = e.target.closest("button, a"); if (!t) return;
    if (t.hasAttribute("data-t")) setP("theme", t.getAttribute("data-t"));
    else if (t.hasAttribute("data-h")) setP("h", +t.getAttribute("data-h"));
    else if (t.hasAttribute("data-w")) { width = t.getAttribute("data-w"); var v = $(".viewer"); if (v) v.classList.toggle("phone", width === "phone"); document.querySelectorAll("[data-w]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-w") === width); }); }
    else if (t.hasAttribute("data-tab")) { tab = t.getAttribute("data-tab"); document.querySelectorAll("[data-tab]").forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-tab") === tab); }); $(".viewer").hidden = tab !== "preview"; $(".codebox").hidden = tab !== "code"; }
    else if (t.id === "copy-code") { S.copy($(".codebox code").textContent, function () { t.textContent = "Copiato"; setTimeout(function () { t.textContent = "Copia"; }, 1500); }); }
    else if (t.id === "copy-theme") { S.copy(themeCss(), function () { S.toast("Tema copiato: incollalo dopo tokens.css"); }); }
    else if (t.hasAttribute("data-icon")) { var n = t.getAttribute("data-icon"); S.copy(n, function () { S.toast("Copiato: " + n); }); }
    else if (t.id === "side-btn") { var s = $("#side"), o = !s.classList.contains("open"); s.classList.toggle("open", o); t.setAttribute("aria-expanded", o); }
  });
  document.addEventListener("input", function (e) { if (e.target.id === "hue") setP("h", +e.target.value); if (e.target.id === "q") filter(e.target.value); });
  addEventListener("message", function (e) {
    var m = e.data; if (!m || !m.stcH) return;
    document.querySelectorAll("iframe.live").forEach(function (f) { if (f.contentWindow === e.source) f.style.height = Math.max(+f.getAttribute("data-min") || 200, Math.min(m.stcH, 1400)) + "px"; });
  });
  addEventListener("keydown", function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); var s = $("#side"); if (getComputedStyle($("#side-btn")).display !== "none") { s.classList.add("open"); } $("#q").focus(); } });
  S.on(function () { P.theme = S.theme; syncBar(); syncLogo(); });
  addEventListener("hashchange", route);
  document.addEventListener("DOMContentLoaded", function () { toc(); route(); });
})();
