(function () {
  'use strict';

  // Header background on scroll
  var header = document.getElementById('header');
  function updateHeader() {
    if (window.scrollY > 12) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Mobile menu toggle
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var iconMenu = document.getElementById('iconMenu');
  var iconClose = document.getElementById('iconClose');

  function closeMenu() {
    mobileMenu.classList.add('hidden');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    var isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      iconMenu.classList.add('hidden');
      iconClose.classList.remove('hidden');
      menuBtn.setAttribute('aria-expanded', 'true');
    } else {
      closeMenu();
    }
  }

  menuBtn.addEventListener('click', toggleMenu);

  // Close mobile menu after tapping a link
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Scroll progress bar
  var progress = document.getElementById('scrollProgress');
  function updateProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = pct + '%';
  }
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  // Active nav link tracking
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
            });
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(function (section) { navObserver.observe(section); });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach(function (el, i) {
      if (!el.style.getPropertyValue('--d')) {
        el.style.setProperty('--d', (i % 6) * 0.09 + 's');
      }
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Symptom pills marquee — duplicate content for seamless loop
  var marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    marqueeTrack.innerHTML += marqueeTrack.innerHTML;
  }

  // Animated counters (rating + review count)
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-target'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progressRatio = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progressRatio, 3);
      var value = target * eased;
      el.textContent = value.toFixed(decimals).replace('.', ',');
      if (progressRatio < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toFixed(decimals).replace('.', ',');
      }
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('.js-counter');
  if ('IntersectionObserver' in window && counters.length) {
    var counterObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-target'));
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      el.textContent = target.toFixed(decimals).replace('.', ',');
    });
  }

  // Respect reduced motion: skip counter animation, show final values instantly
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    counters.forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-target'));
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      el.textContent = target.toFixed(decimals).replace('.', ',');
    });
  }
})();
