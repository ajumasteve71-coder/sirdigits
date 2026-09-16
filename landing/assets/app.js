(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Theme ---------------- */
  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var isDark = document.documentElement.classList.toggle('dark');
      try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      } catch (e) {}
    });
  }

  /* ---------------- Header on scroll ---------------- */
  var headerInner = document.getElementById('header-inner');
  function onScroll() {
    if (!headerInner) return;
    if (window.scrollY > 12) {
      headerInner.classList.add(
        'border-neutral-200',
        'bg-white/80',
        'shadow-sm',
        'backdrop-blur-md',
        'dark:border-white/10',
        'dark:bg-night/80'
      );
    } else {
      headerInner.classList.remove(
        'border-neutral-200',
        'bg-white/80',
        'shadow-sm',
        'backdrop-blur-md',
        'dark:border-white/10',
        'dark:bg-night/80'
      );
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------------- Mobile menu ---------------- */
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('hidden') === false;
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    mobileMenu.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        mobileMenu.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------- Reveal on scroll ---------------- */
  var revealable = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );
    revealable.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    revealable.forEach(function (element) {
      element.classList.add('is-visible');
    });
  }

  /* ---------------- Live digit preview ---------------- */
  var priceEl = document.getElementById('tick-price');
  var digitEl = document.getElementById('tick-digit');
  var barsEl = document.getElementById('digit-bars');
  var historyEl = document.getElementById('digit-history');

  if (priceEl && digitEl && barsEl && historyEl) {
    var counts = [104, 97, 101, 99, 103, 96, 100, 102, 98, 100];
    var history = [];
    var i;

    for (i = 0; i < 12; i += 1) {
      history.push(Math.floor(Math.random() * 10));
    }

    var barNodes = [];
    for (i = 0; i < 10; i += 1) {
      var bar = document.createElement('div');
      bar.className =
        'flex flex-1 flex-col items-center gap-1.5 transition-all duration-500';
      var track = document.createElement('div');
      track.className =
        'flex h-24 w-full items-end overflow-hidden rounded-md bg-neutral-100 dark:bg-white/5';
      var fill = document.createElement('div');
      fill.className =
        'w-full rounded-md bg-brand-500/70 transition-[height] duration-500 ease-out';
      fill.style.height = '50%';
      track.appendChild(fill);
      var label = document.createElement('span');
      label.className = 'font-mono text-[10px] text-neutral-400 dark:text-neutral-500';
      label.textContent = String(i);
      bar.appendChild(track);
      bar.appendChild(label);
      barsEl.appendChild(bar);
      barNodes.push(fill);
    }

    function renderBars() {
      var total = counts.reduce(function (sum, value) {
        return sum + value;
      }, 0);
      var max = Math.max.apply(null, counts);
      counts.forEach(function (value, index) {
        var percent = Math.round((value / total) * 100);
        barNodes[index].style.height = Math.max(12, percent * 6) + '%';
        barNodes[index].classList.toggle('bg-brand-500/70', value === max);
        barNodes[index].classList.toggle('bg-neutral-400/50', value !== max);
        barNodes[index].classList.toggle('dark:bg-white/25', value !== max);
      });
    }

    function renderHistory() {
      historyEl.innerHTML = '';
      history.slice(0, 10).forEach(function (digit, index) {
        var cell = document.createElement('span');
        cell.className =
          'flex h-9 flex-1 items-center justify-center rounded-md font-mono text-sm font-semibold tabular-nums';
        if (index === 0) {
          cell.className += ' bg-brand-500 text-white';
        } else if (digit % 2 === 0) {
          cell.className +=
            ' bg-buy/10 text-buy';
        } else {
          cell.className +=
            ' bg-neutral-100 text-neutral-600 dark:bg-white/5 dark:text-neutral-300';
        }
        cell.textContent = String(digit);
        historyEl.appendChild(cell);
      });
    }

    function tick() {
      var digit = Math.floor(Math.random() * 10);
      var lastPrice = parseFloat(priceEl.textContent.replace(/,/g, '')) || 1243.657;
      var nextPrice = lastPrice + (Math.random() - 0.48) * 1.4;
      history.unshift(digit);
      history = history.slice(0, 12);
      counts[digit] += 1;

      priceEl.textContent = nextPrice.toLocaleString('en-US', {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
      digitEl.textContent = String(digit);
      digitEl.classList.remove('animate-pop');
      void digitEl.offsetWidth;
      digitEl.classList.add('animate-pop');
      renderBars();
      renderHistory();
    }

    renderBars();
    renderHistory();
    if (!reduceMotion) {
      window.setInterval(tick, 2200);
    }
  }

  /* ---------------- Year ---------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
