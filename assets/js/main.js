// ── Header sticky ──
(function() {
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
  }
})();

// ── Burger menu mobile ──
(function() {
  const burger = document.getElementById('burger');
  const overlay = document.getElementById('navOverlay');
  const closeBtn = document.getElementById('navOverlayClose');
  if (burger && overlay) {
    function openMenu() {
      burger.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      burger.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    burger.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    overlay.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });
  }
})();

// ── Reveal on scroll ──
(function() {
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.dataset.delay || 0;
          setTimeout(function() {
            entry.target.classList.add('visible');
          }, delay * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function(el) { observer.observe(el); });
  }
})();

// ── Barre de progression de lecture ──
(function() {
  var readingBar = document.getElementById('readingBar');
  var articleBody = document.getElementById('articleBody');
  if (readingBar && articleBody) {
    window.addEventListener('scroll', function() {
      var articleTop = articleBody.offsetTop;
      var articleH = articleBody.offsetHeight;
      var scrolled = window.scrollY - articleTop;
      var pct = Math.min(100, Math.max(0, (scrolled / (articleH - window.innerHeight)) * 100));
      readingBar.style.width = pct + '%';
      if (pct >= 75 && !window._articleRead) {
        window._articleRead = true;
        if (typeof dataLayer !== 'undefined') {
          dataLayer.push({ event: 'article_lu', article_title: document.title });
        }
      }
    });
  }
})();

// ── Newsletter ──
(function() {
  var nlForm = document.querySelector('.nl-form');
  if (nlForm) {
    nlForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = e.target.querySelector('button');
      if (btn) {
        btn.textContent = 'Merci !';
        btn.style.background = '#2a7a5a';
      }
      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({ event: 'newsletter_inscription' });
      }
    });
  }
})();

// ── Hero scroll ──
(function() {
  var scrollBtn = document.querySelector('.hero-scroll');
  var target = document.getElementById('articles');
  if (scrollBtn && target) {
    scrollBtn.addEventListener('click', function(e) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  }
})();

// ── Carrousel "À lire aussi" ──
(function() {
  var tracks = document.querySelectorAll('.carousel-track');
  tracks.forEach(function(track) {
    var carousel = track.closest('.carousel');
    if (!carousel) return;
    var prev = carousel.querySelector('.carousel-arrow--prev');
    var next = carousel.querySelector('.carousel-arrow--next');
    if (!prev || !next) return;
    var scrollAmount = function() {
      var card = track.querySelector('.article-card');
      return card ? card.offsetWidth + 16 : 300;
    };
    prev.addEventListener('click', function() {
      track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
    next.addEventListener('click', function() {
      track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
  });
})();
