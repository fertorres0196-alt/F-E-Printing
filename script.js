/* F-E Printing · Interacciones de la página de inicio */

(function () {
  "use strict";

  // Año actual en el footer
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Menú móvil
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");

  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      nav.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Cerrar al elegir un enlace
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });

    // Cerrar con Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    // Restablecer si se amplía la pantalla
    window.matchMedia("(min-width: 821px)").addEventListener("change", function (e) {
      if (e.matches) setOpen(false);
    });
  }

  // Encabezado con sombra al hacer scroll
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.style.boxShadow = window.scrollY > 10 ? "0 4px 20px rgba(0,0,0,.25)" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Animación de aparición al hacer scroll
  var targets = document.querySelectorAll(
    ".section-head, .video-frame, .servicio, .foto, .cifra, .frase blockquote, .sector, .logo-vertical, .datos"
  );

  targets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    targets.forEach(function (el) { observer.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
