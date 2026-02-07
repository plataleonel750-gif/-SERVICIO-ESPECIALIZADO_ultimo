(function () {
  // ——— Google Ads / conversión WhatsApp y Llamada ———
  var AW_ID = 'AW-17886446694';
  var CALL_CONVERSION_ID = 'AW-17886446694/45beCMu_nvIbEOaI9tBC';
  var WHATSAPP_CONVERSION_ID = 'AW-17886446694/re0ZCM6_nvIbEOaI9tBC';
  var PHONE_CONVERSION_NUMBER = '3247722933';

  function injectGtag() {
    if (window.__gtagInitialized) return;
    window.__gtagInitialized = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function () {
        window.dataLayer.push(arguments);
      };

    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src =
      'https://www.googletagmanager.com/gtag/js?id=' + AW_ID;
    document.head.appendChild(gtagScript);

    gtag('js', new Date());
    gtag('config', AW_ID);
    gtag('config', CALL_CONVERSION_ID, {
      phone_conversion_number: PHONE_CONVERSION_NUMBER
    });
  }

  function setupWhatsappConversion() {
    window.gtag_report_conversion = function (url) {
      var callback = function () {
        if (typeof url !== 'undefined') {
          window.location = url;
        }
      };
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          send_to: WHATSAPP_CONVERSION_ID,
          event_callback: callback
        });
      } else {
        callback();
      }
      return false;
    };
  }

  function bindWhatsappLinks() {
    var links = document.querySelectorAll('a[href*="wa.me"]');
    links.forEach(function (link) {
      if (link.dataset.whatsappTracked === '1') return;
      link.dataset.whatsappTracked = '1';
      link.addEventListener('click', function (e) {
        if (typeof window.gtag_report_conversion === 'function') {
          e.preventDefault();
          window.gtag_report_conversion(link.href);
        }
      });
    });
  }

  function bindCallLinks() {
    var callLinks = document.querySelectorAll('a[href^="tel:"]');
    callLinks.forEach(function (link) {
      if (link.dataset.callTracked === '1') return;
      link.dataset.callTracked = '1';
      link.addEventListener('click', function () {
        if (typeof gtag === 'function') {
          gtag('event', 'conversion', {
            send_to: CALL_CONVERSION_ID
          });
        }
      });
    });
  }

  injectGtag();
  setupWhatsappConversion();
  document.addEventListener('DOMContentLoaded', function () {
    bindWhatsappLinks();
    bindCallLinks();
  });

  var abrir = document.getElementById('abrir-menu');
  var cerrar = document.getElementById('cerrar-menu');
  var nav = document.querySelector('.cabecera__nav');
  var grupos = document.querySelectorAll('.nav__grupo');
  var DESKTOP_BREAK = 900;
  var CLOSE_DELAY = 320;

  function isDesktop() {
    return window.innerWidth > DESKTOP_BREAK;
  }

  function toggleNav() {
    nav.classList.toggle('activo');
  }

  // ——— Desktop: hover en cada grupo abre su dropdown ———
  var closeTimer = null;

  function openGrupo(grupo) {
    if (!isDesktop()) return;
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    grupo.classList.add('is-open');
  }

  function closeGruposLater() {
    if (!isDesktop()) return;
    closeTimer = setTimeout(function () {
      grupos.forEach(function (g) {
        g.classList.remove('is-open');
      });
      closeTimer = null;
    }, CLOSE_DELAY);
  }

  grupos.forEach(function (grupo) {
    grupo.addEventListener('mouseenter', function () {
      openGrupo(grupo);
    });
    grupo.addEventListener('mouseleave', closeGruposLater);
  });

  // ——— Móvil: clic en el enlace del grupo abre/cierra su dropdown ———
  function toggleGrupo(grupo) {
    if (!isDesktop()) {
      grupos.forEach(function (otro) {
        if (otro !== grupo) otro.classList.remove('activo');
      });
      grupo.classList.toggle('activo');
    }
  }

  if (abrir) abrir.addEventListener('click', toggleNav);
  if (cerrar) cerrar.addEventListener('click', toggleNav);

  grupos.forEach(function (grupo) {
    var link = grupo.querySelector('a');
    if (link) {
      link.addEventListener('click', function (e) {
        if (!isDesktop()) {
          e.preventDefault();
          toggleGrupo(grupo);
        }
      });
    }
  });

  // Limpiar estado al redimensionar
  window.addEventListener('resize', function () {
    if (isDesktop()) {
      nav.classList.remove('activo');
      grupos.forEach(function (g) {
        g.classList.remove('activo');
      });
    } else {
      grupos.forEach(function (g) {
        g.classList.remove('is-open');
      });
    }
    if (closeTimer) clearTimeout(closeTimer);
  });

  // ——— Animaciones al hacer scroll (Intersection Observer) ———
  if (typeof IntersectionObserver !== 'undefined') {
    var animarAlScroll = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
    );
    document.querySelectorAll('.seccion--animar').forEach(function (el) {
      animarAlScroll.observe(el);
    });
  } else {
    document.querySelectorAll('.seccion--animar').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ——— Pestañas dinámicas cuadros-oferta (estilo Javeriana) ———
  var pestanas = document.querySelectorAll('.cuadros-oferta__pestana');
  var panels = document.querySelectorAll('.cuadros-oferta__panel');

  var PANEL_ANIM_DURATION = 550;

  function onClickPestana(el) {
    var panelId = el.getAttribute('data-panel');
    if (!panelId) return;
    pestanas.forEach(function (p) {
      p.classList.remove('cuadros-oferta__pestana--activo');
    });
    panels.forEach(function (p) {
      p.classList.remove('cuadros-oferta__panel--activo');
      p.classList.remove('cuadros-oferta__panel--entrando');
    });
    el.classList.add('cuadros-oferta__pestana--activo');
    var panel = document.getElementById(panelId);
    if (panel) {
      panel.classList.add('cuadros-oferta__panel--activo');
      panel.classList.add('cuadros-oferta__panel--entrando');
      setTimeout(function () {
        panel.classList.remove('cuadros-oferta__panel--entrando');
      }, PANEL_ANIM_DURATION);
    }
  }

  pestanas.forEach(function (pestana) {
    pestana.addEventListener('click', function () {
      onClickPestana(pestana);
    });
    pestana.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClickPestana(pestana);
      }
    });
  });
})();
