// Landing: grafiche animate fatte con i componenti veri di STC.
(function () {
  var R = React, h = R.createElement, useState = R.useState, useEffect = R.useEffect, useRef = R.useRef;
  var S = window.SITE, X = window.STC;
  var REDUCED = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var noop = function () {};

  // esegue fn ogni ms solo quando il riquadro è visibile
  function useTick(ms, start) {
    var ref = useRef(null), st = useState(start || 0), t = st[0], setT = st[1];
    useEffect(function () {
      if (REDUCED) return;
      var vis = false, id = null, el = ref.current;
      var run = function () { if (id == null) id = setInterval(function () { setT(function (x) { return x + 1; }); }, ms); };
      var stop = function () { clearInterval(id); id = null; };
      var io = new IntersectionObserver(function (es) { vis = es[0].isIntersecting; vis ? run() : stop(); }, { threshold: 0.15 });
      if (el) io.observe(el);
      return function () { stop(); io.disconnect(); };
    }, [ms]);
    return [ref, t];
  }
  function mount(id, el) { var n = document.getElementById(id); if (n) ReactDOM.createRoot(n).render(el); }
  var pick = function (arr, i) { return arr[((i % arr.length) + arr.length) % arr.length]; };

  // ---------- installazione ----------
  var INSTALL = {
    cdn: { label: "CDN", value: '<script src="https://cdn.jsdelivr.net/gh/deredde/stc@main/components/bundle.js"></script>' },
    git: { label: "GitHub", value: "git clone https://github.com/deredde/stc" },
  };
  var mode = "cdn", subs = [];
  function InstallSeg() {
    var s = useState(mode);
    return h(X.Segmented, { size: "card", options: [{ value: "cdn", label: "CDN" }, { value: "git", label: "GitHub" }], value: s[0], label: "Come installare", onChange: function (v) { mode = v; s[1](v); subs.forEach(function (f) { f(v); }); } });
  }
  function Install() {
    var s = useState(mode); useEffect(function () { subs.push(s[1]); }, []);
    return h(X.CopyField, { key: s[0], value: INSTALL[s[0]].value, copyLabel: "Copia", copiedLabel: "Copiato" });
  }

  // ---------- hero ----------
  function HeroTrend() {
    var tk = useTick(2600), i = tk[1];
    var base = [8, 9, 7, 11, 10, 12, 13, 12, 15, 14, 16, 18];
    var data = base.map(function (v, k) { return v + ((k * 7 + i * 3) % 5) - 2; });
    return h("div", { ref: tk[0] }, h(X.TrendTile, { title: "Iscritti del mese", value: (12480 + i * 37).toLocaleString("it-IT"), delta: 12.4, data: data, note: "rispetto a ottobre" }));
  }
  function HeroCtrl() {
    var tk = useTick(1500), i = tk[1];
    return h("div", { ref: tk[0], style: { display: "flex", flexDirection: "column", gap: 14 } },
      h("span", { className: "f-lab" }, "Preferenze"),
      h(X.Switch, { label: "Notifiche push", checked: i % 2 === 0, onChange: noop }),
      h(X.Switch, { label: "Riepilogo settimanale", checked: i % 3 !== 1, onChange: noop }),
      h(X.Slider, { label: "Volume", min: 0, max: 100, value: [62, 78, 45, 90, 30][i % 5], onChange: noop, showValue: true }),
      h(X.Segmented, { full: true, size: "card", options: ["Giorno", "Settimana", "Mese"], value: pick(["Giorno", "Settimana", "Mese"], i), onChange: noop, label: "Periodo" }));
  }
  var HERO_ILL = [["all-done", "Tutto fatto", "Non ci sono attività in sospeso."], ["mail-sent", "Email inviata", "Controlla la posta in arrivo."], ["payment-ok", "Pagamento riuscito", "La ricevuta è nella tua email."], ["search-empty", "Nessun risultato", "Prova con un'altra parola."]];
  function HeroIll() {
    var tk = useTick(3200), it = pick(HERO_ILL, tk[1]);
    return h("div", { ref: tk[0], key: it[0], className: "fade-key", style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 } },
      h(X.Illustration, { name: it[0], size: "md" }), h("b", null, it[1]), h("span", null, it[2]));
  }
  function HeroTeam() {
    var tk = useTick(900), i = tk[1];
    return h("div", { ref: tk[0], style: { display: "flex", flexDirection: "column", gap: 12 } },
      h("div", { className: "f-row" }, h("b", null, "Progetto Aurora"), h(X.Badge, { tone: "success" }, "In corso")),
      h(X.ProgressBar, { value: 40 + (i * 4) % 56, label: "Avanzamento" }),
      h("div", { className: "f-row" }, h(X.AvatarGroup, { names: ["Giulia Ferri", "Luca Bruni", "Sara Conti", "Marco Neri", "Elena Riva"], max: 4, size: 32 }), h("span", { style: { fontSize: 13, color: "var(--text-secondary)" } }, "5 persone")));
  }

  // ---------- pagina che si compone ----------
  function Dash() {
    var tk = useTick(900), i = tk[1], on = REDUCED || i % 9 !== 8;
    var D = [12, 18, 15, 22, 20, 28, 26, 31, 29, 36, 34, 41].map(function (v, k) { return { label: ["G", "F", "M", "A", "M", "G", "L", "A", "S", "O", "N", "D"][k], value: v * 10 + ((k + Math.floor(i / 9)) % 3) * 12 }; });
    return h("div", { ref: tk[0], className: "assemble dash" + (on ? " on" : "") },
      h("div", { className: "piece" }, h(X.StatTile, { title: "Utenti attivi", value: "8.214", note: "+312 questa settimana", icon: "users" })),
      h("div", { className: "piece" }, h(X.StatTile, { title: "Ricavi", value: "€ 48.900", note: "Novembre", icon: "wallet", tone: "success" })),
      h("div", { className: "piece wide panel" }, h("div", { className: "panel-t" }, "Crescita nell'anno", h(X.Badge, { tone: "accent", icon: false, size: "sm" }, "+18%")), h(X.AreaChart, { data: D, height: 150, label: "Utenti al mese" })),
      h("div", { className: "piece wide panel" },
        [["Giulia Ferri", "Design", "success", "Attiva"], ["Luca Bruni", "Sviluppo", "warning", "In revisione"], ["Sara Conti", "Prodotto", "info", "Nuova"]].map(function (r) {
          return h("div", { key: r[0], className: "f-row", style: { padding: "6px 0" } }, h("span", { style: { display: "flex", gap: 10, alignItems: "center" } }, h(X.Avatar, { name: r[0], size: 32 }), h("span", null, h("b", { style: { display: "block", fontSize: 14 } }, r[0]), h("span", { style: { fontSize: 12, color: "var(--text-tertiary)" } }, r[1]))), h(X.Badge, { tone: r[2], size: "sm" }, r[3]));
        })));
  }

  // ---------- controlli ----------
  function Ctrl() {
    var tk = useTick(1300), i = tk[1];
    return h("div", { ref: tk[0], className: "ctrl-grid" },
      h("div", { className: "panel" }, h("div", { className: "panel-t" }, "Notifiche"),
        h("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
          h(X.Switch, { label: "Email", checked: true, onChange: noop }),
          h(X.Switch, { label: "Push", checked: i % 2 === 1, onChange: noop }),
          h(X.Switch, { label: "SMS", checked: i % 4 === 2, onChange: noop }))),
      h("div", { className: "panel" }, h("div", { className: "panel-t" }, "Budget"),
        h(X.Slider, { min: 0, max: 5000, step: 100, value: [[800, 3200], [1200, 4000], [400, 2600], [1600, 3600]][i % 4], onChange: noop, showValue: true, format: function (v) { return "€ " + v.toLocaleString("it-IT"); } })),
      h("div", { className: "panel" }, h("div", { className: "panel-t" }, "Vista"),
        h(X.Segmented, { full: true, options: [{ value: "l", label: "Lista", icon: "list" }, { value: "g", label: "Griglia", icon: "layout-grid" }], value: i % 2 ? "g" : "l", onChange: noop, label: "Vista" }),
        h("div", { style: { height: 12 } }),
        h(X.ChoiceChips, { options: [{ value: "a", label: "Oggi" }, { value: "b", label: "Settimana" }, { value: "c", label: "Mese" }], value: pick(["a", "b", "c"], i), onChange: noop, label: "Periodo" })),
      h("div", { className: "panel" }, h("div", { className: "panel-t" }, "Permessi"),
        h("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
          h(X.Checkbox, { label: "Può modificare", checked: i % 3 !== 0, onChange: noop }),
          h(X.Checkbox, { label: "Può invitare", checked: i % 2 === 0, onChange: noop }),
          h(X.Checkbox, { label: "Amministratore", checked: false, indeterminate: i % 4 === 3, onChange: noop }))));
  }

  // ---------- form ----------
  var NAME = "Giulia Ferri", MAIL = "giulia@aurora.studio", PASS = "Aurora-2026!";
  function Form() {
    var tk = useTick(110), i = tk[1] % 110;
    var n = Math.min(NAME.length, i), m = Math.max(0, Math.min(MAIL.length, i - 16)), p = Math.max(0, Math.min(PASS.length, i - 42));
    var phase = i < 62 ? "type" : i < 76 ? "load" : "done";
    if (REDUCED) { n = NAME.length; m = MAIL.length; p = PASS.length; phase = "type"; }
    return h("div", { ref: tk[0], className: "panel", style: { padding: 20, display: "flex", flexDirection: "column", gap: 14 } },
      h("div", { className: "panel-t", style: { fontSize: 16 } }, "Crea il tuo account", h(X.Badge, { tone: "neutral", icon: false, size: "sm" }, "Passo 1 di 2")),
      h(X.Field, { label: "Nome e cognome" }, h(X.TextInput, { value: NAME.slice(0, n), onChange: noop, placeholder: "Come ti chiami" })),
      h(X.Field, { label: "Email", help: m > 0 && m < MAIL.length && MAIL.slice(0, m).indexOf("@") < 0 ? "Scrivi l'indirizzo completo, con la @" : undefined }, h(X.TextInput, { icon: "mail", value: MAIL.slice(0, m), onChange: noop, placeholder: "nome@azienda.it" })),
      h(X.Field, { label: "Password" }, h(X.PasswordInput, { value: PASS.slice(0, p), onChange: noop, meter: true })),
      phase === "done"
        ? h(X.Alert, { tone: "success", title: "Account creato" }, "Ti abbiamo mandato un'email per confermare l'indirizzo.")
        : h(X.Button, { variant: "accent", full: true, loading: phase === "load" }, phase === "load" ? "Creo l'account…" : "Crea account"));
  }

  // ---------- icone ----------
  var QUERIES = ["calendar", "user", "chart", "file", "arrow", "mail", "cloud", "shield"];
  function Icons() {
    var tk = useTick(140), i = tk[1], cycle = Math.floor(i / 40), step = i % 40;
    var q = pick(QUERIES, cycle), shown = REDUCED ? q : q.slice(0, Math.min(q.length, Math.max(0, step - 4)));
    var all = X.iconNames(), list = all.filter(function (n) { return n.indexOf(shown) >= 0; });
    return h("div", { ref: tk[0] },
      h(X.SearchInput, { value: shown, onChange: noop, placeholder: "Cerca tra 2.322 icone", size: "card" }),
      h("div", { className: "icon-grid", key: shown }, list.slice(0, 24).map(function (n, k) { return h("div", { key: n, title: n, style: { animationDelay: k * 18 + "ms" } }, h(X.Icon, { name: n, size: 22 })); })),
      h("div", { className: "icon-count" }, h("span", null, list.length.toLocaleString("it-IT") + (shown ? " icone con «" + shown + "»" : " icone")), h(X.Kbd || "kbd", null, "⌘K")));
  }

  // ---------- illustrazioni ----------
  var ILL = [["inbox-empty", "Posta vuota", "Quando arriva un messaggio lo trovi qui."], ["upload-failed", "Caricamento non riuscito", "Il file è troppo grande o la rete è caduta."], ["invite-sent", "Invito inviato", "Riceverà un link per entrare."], ["maintenance", "Manutenzione", "Torniamo online tra pochi minuti."], ["account-locked", "Account bloccato", "Troppi tentativi: riprova tra 15 minuti."], ["export-ready", "Esportazione pronta", "Il file è pronto da scaricare."]];
  function Ill() {
    var tk = useTick(2800), i = tk[1], it = pick(ILL, i);
    return h("div", { ref: tk[0], className: "ill-show" },
      h("div", { className: "panel ill-big" }, h("div", { key: it[0], className: "fade-key", style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 } }, h(X.Illustration, { name: it[0], size: "lg" }), h("b", null, it[1]), h("span", null, it[2]))),
      h("div", { className: "ill-small" }, ["folder-empty", "new-device", "order-shipped", "notifications-empty"].map(function (n) { return h("div", { key: n, className: "panel" }, h(X.Illustration, { name: n, size: "sm" })); })));
  }

  // ---------- attese ----------
  function Wait() {
    var tk = useTick(120), i = tk[1], v = (i * 1.3) % 100;
    return h("div", { ref: tk[0], className: "ctrl-grid" },
      h("div", { className: "panel", style: { display: "grid", placeItems: "center", minHeight: 170 } }, h(X.Loader, { label: "Carico i movimenti", detail: "Ultimi 30 giorni", size: "sm" })),
      h("div", { className: "panel", style: { display: "grid", placeItems: "center" } }, h(X.ProgressRing, { value: Math.round(v), size: 110, showValue: true, label: "Importazione" })),
      h("div", { className: "panel", style: { display: "flex", flexDirection: "column", gap: 12 } }, h("div", { className: "panel-t" }, "Clienti", h(X.LoadingPill, { label: "Aggiorno" })), h(X.SkeletonRow), h(X.SkeletonRow)),
      h("div", { className: "panel", style: { display: "flex", flexDirection: "column", gap: 14 } },
        h(X.ProgressBar, { value: Math.round(v), label: "contratti-2026.pdf" }),
        h(X.ProgressBar, { value: Math.round((v * 1.7) % 100), label: "fatture.xlsx" }),
        h("div", { className: "f-row" }, h("span", { style: { fontSize: 13, color: "var(--text-secondary)" } }, "Giulia sta scrivendo"), h(X.TypingDots, { label: "Giulia sta scrivendo" }))));
  }

  // ---------- grafici ----------
  function Chart() {
    var tk = useTick(2600), i = tk[1];
    var D = ["L", "M", "M", "G", "V", "S", "D"].map(function (l, k) { var w = Math.sin((k + i) * 0.9) * 0.5 + 1; return { label: l, value: Math.round(1200 * w + k * 160), prev: Math.round(1000 + k * 90 + Math.cos(k) * 150) }; });
    var pie = [["Diretto", 42], ["Social", 26], ["Email", 18], ["Altro", 14]].map(function (p, k) { return { label: p[0], value: p[1] + ((i + k) % 4) * 3 }; });
    var tot = pie.reduce(function (a, b) { return a + b.value; }, 0), acc = 0;
    pie.forEach(function (p, k) { p.value = k === pie.length - 1 ? 100 - acc : Math.round(p.value * 100 / tot); acc += p.value; });
    return h("div", { ref: tk[0], style: { display: "flex", flexDirection: "column", gap: 12 } },
      h("div", { className: "panel" }, h("div", { className: "panel-t" }, "Visite della settimana", h(X.Badge, { tone: "success", size: "sm" }, "+9,2%")), h(X.LineChart, { data: D, compare: true, height: 170, label: "Visite", currentLabel: "Questa settimana", prevLabel: "Scorsa" })),
      h("div", { className: "panel" }, h("div", { className: "panel-t" }, "Da dove arrivano"), h(X.DonutChart, { data: pie, size: 132, totalLabel: "visite", format: function (v) { return v + "%"; } })));
  }

  // ---------- temi ----------
  function Theme() {
    var tk = useTick(2400), i = tk[1];
    var hue = pick(S.HUES, i), dark = i % 2 === 1;
    return h("div", { ref: tk[0] },
      h("div", { className: "theme-demo", "data-hue": "", "data-theme": dark ? "dark" : "light", style: { "--h": hue[0] } },
        h("div", { className: "f-row" }, h("b", null, hue[1]), h(X.Badge, { tone: "accent", icon: false, size: "sm" }, (dark ? "Scuro" : "Chiaro") + " · tinta " + hue[0])),
        h(X.StatTile, { title: "Prenotazioni", value: "1.284", note: "Questa settimana", icon: "calendar-check", tone: "accent" }),
        h("div", { className: "f-row" }, h(X.Switch, { label: "Promemoria", checked: true, onChange: noop }), h(X.Button, { variant: "accent", icon: "plus", size: "card" }, "Nuova")),
        h(X.Slider, { min: 0, max: 100, value: 64, onChange: noop, label: "Intensità" }),
        h("div", { style: { display: "flex", justifyContent: "center" } }, h(X.Illustration, { name: "all-done", size: "sm" }))));
  }
  function PageSwatches() {
    var s = useState(S.h); useEffect(function () { S.on(function () { s[1](S.h); }); }, []);
    return h(R.Fragment, null, S.HUES.map(function (x) { return h("button", { key: x[0], type: "button", className: "sw", style: { "--sw": x[0] }, "aria-label": x[1], "aria-pressed": s[0] === x[0] ? "true" : "false", title: x[1], onClick: function () { S.setHue(x[0]); } }); }));
  }

  // ---------- avvio ----------
  document.addEventListener("DOMContentLoaded", function () {
    mount("install-seg", h(InstallSeg));
    mount("install", h(Install));
    mount("h-trend", h(HeroTrend)); mount("h-ctrl", h(HeroCtrl)); mount("h-ill", h(HeroIll)); mount("h-team", h(HeroTeam));
    mount("d-dash", h(Dash)); mount("d-ctrl", h(Ctrl)); mount("d-form", h(Form)); mount("d-icons", h(Icons));
    mount("d-ill", h(Ill)); mount("d-wait", h(Wait)); mount("d-chart", h(Chart)); mount("d-theme", h(Theme));
    mount("page-sw", h(PageSwatches));
    // nastro con i nomi dei componenti
    var names = ["Button", "Switch", "Slider", "DatePicker", "Combobox", "DataTable", "Kanban", "Timeline", "Sidebar", "CommandSearch", "Toast", "Sheet", "Drawer", "PinPad", "OtpInput", "PlanPicker", "Stepper", "WizardPage", "LineChart", "DonutChart", "Heatmap", "Illustration", "Loader", "Skeleton", "ProgressRing", "NotificationCenter", "TreeView", "Accordion", "Tabs", "Popover"];
    var mq = document.getElementById("mq");
    if (mq) { var html = names.map(function (n) { return '<span class="glass">' + n + "</span>"; }).join(""); mq.innerHTML = html; var copy = mq.cloneNode(true); copy.removeAttribute("id"); mq.parentNode.appendChild(copy); }
    // logo chiaro/scuro
    function logos() { var dk = S.theme === "dark"; document.querySelectorAll("#video-mark,#final-mark").forEach(function (im) { im.src = "assets/logo/simbolo-" + (dk ? "scuro" : "chiaro") + ".svg"; }); document.querySelectorAll(".brand img").forEach(function (im) { im.src = "assets/logo/simbolo-piatto-" + (dk ? "scuro" : "chiaro") + ".svg"; }); }
    S.on(logos); logos();
    // leggera parallasse nella hero
    var stage = document.getElementById("stage");
    if (stage && !REDUCED && matchMedia("(pointer: fine)").matches) {
      var fl = stage.querySelectorAll(".float");
      stage.addEventListener("mousemove", function (e) { var r = stage.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; fl.forEach(function (f, k) { var d = (k % 2 ? 14 : -10) * (1 + k * 0.2); f.style.transform = "translate(" + x * d + "px," + y * d + "px)"; }); });
      stage.addEventListener("mouseleave", function () { fl.forEach(function (f) { f.style.transform = ""; }); });
    }
  });
})();
