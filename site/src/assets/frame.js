// Dentro ogni riquadro live: riceve tema, tinta e tema pronto dal sito, comunica l'altezza.
(function () {
  var d = document.documentElement;
  addEventListener("message", function (e) {
    var m = e.data && e.data.stc; if (!m) return;
    if (m.theme) d.setAttribute("data-theme", m.theme);
    if (m.h != null) d.style.setProperty("--h", m.h);
    // un tema pronto prende il posto della tinta: data-hue va tolto, altrimenti in scuro vincerebbe hue.css
    if (m.pal != null) { if (m.pal) { d.setAttribute("data-palette", m.pal); d.removeAttribute("data-hue"); } else { d.removeAttribute("data-palette"); d.setAttribute("data-hue", ""); } }
  });
  function send() { try { parent.postMessage({ stcH: d.scrollHeight, id: location.pathname }, "*"); } catch (e) {} }
  addEventListener("load", function () {
    send(); setTimeout(send, 300); setTimeout(send, 1200);
    if (window.ResizeObserver) new ResizeObserver(send).observe(document.body);
  });
})();
