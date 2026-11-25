// Tema, tinta e piccoli aiuti comuni a landing e documentazione.
(function () {
  var d = document.documentElement;
  d.classList.add("js");
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  var S = (window.SITE = {
    theme: get("stc-theme") || "light",
    h: +(get("stc-h") || 260),
    listeners: [],
    on: function (fn) { S.listeners.push(fn); },
    emit: function () { S.listeners.forEach(function (f) { f(S); }); },
    setTheme: function (t) { S.theme = t; d.setAttribute("data-theme", t); set("stc-theme", t); S.emit(); },
    setHue: function (h) { S.h = +h; d.style.setProperty("--h", S.h); set("stc-h", S.h); S.emit(); },
    icon: function (name, size) {
      var extra = { github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>' };
      var p = extra[name] || (window.STC && STC.ICONE && STC.ICONE[name]) || "";
      return '<svg viewBox="0 0 24 24" width="' + (size || 18) + '" height="' + (size || 18) + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + "</svg>";
    },
    copy: function (text, done) {
      function fallback() { var t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch (e) {} t.remove(); done && done(); }
      try { navigator.clipboard.writeText(text).then(function () { done && done(); }, fallback); } catch (e) { fallback(); }
    },
    toast: function (msg) {
      var t = document.querySelector(".toast"); if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
      t.textContent = msg; t.classList.add("on"); clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("on"); }, 1800);
    },
    HUES: [[260, "Blu elettrico"], [292, "Viola"], [350, "Rosa"], [25, "Rosso"], [55, "Arancio"], [150, "Verde"], [195, "Petrolio"]],
  });
  d.setAttribute("data-theme", S.theme);
  d.setAttribute("data-hue", "");
  d.style.setProperty("--h", S.h);
  document.addEventListener("DOMContentLoaded", function () {
    // icone dichiarate in HTML: <i data-i="nome"></i>
    document.querySelectorAll("[data-i]").forEach(function (el) { el.outerHTML = S.icon(el.getAttribute("data-i"), +el.getAttribute("data-s") || 18); });
    var tb = document.getElementById("theme-btn");
    function paint() { if (tb) { tb.innerHTML = S.icon(S.theme === "dark" ? "sun" : "moon", 18); tb.setAttribute("aria-label", S.theme === "dark" ? "Passa al tema chiaro" : "Passa al tema scuro"); } }
    if (tb) tb.addEventListener("click", function () { S.setTheme(S.theme === "dark" ? "light" : "dark"); });
    S.on(paint); paint();
    // comparsa allo scorrimento
    var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px" }) : null;
    document.querySelectorAll(".rv").forEach(function (el) { io ? io.observe(el) : el.classList.add("on"); });
  });
})();
