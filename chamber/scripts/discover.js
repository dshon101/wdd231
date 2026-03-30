// discover.js — Discover page module
// WDD231 Lusaka Chamber of Commerce

import { places } from '../data/discover.mjs';

// ── Render attraction cards ──────────────────────────────────
function renderCards() {
  const grid = document.getElementById('discover-grid');
  if (!grid) return;

  grid.innerHTML = places.map((place, index) => `
    <article class="discover-card" style="grid-area: card${index + 1};" aria-label="${place.name}">
      <figure class="discover-figure">
        <img
          src="${place.image}"
          alt="${place.alt}"
          width="300"
          height="200"
          loading="lazy"
          onerror="this.src='images/discover/placeholder.svg'; this.alt='Image not available';"
        >
      </figure>
      <div class="discover-body">
        <h2>${place.name}</h2>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button class="discover-btn" aria-label="Learn more about ${place.name}">Learn More</button>
      </div>
    </article>
  `).join('');
}

// ── Visit tracking with localStorage ───────────────────────
function handleVisitMessage() {
  const msgEl = document.getElementById('visit-message');
  if (!msgEl) return;

  const LAST_VISIT_KEY = 'lusaka_discover_last_visit';
  const now = Date.now();
  const lastVisit = localStorage.getItem(LAST_VISIT_KEY);

  let message = '';

  if (!lastVisit) {
    message = 'Welcome! Let us know if you have any questions.';
  } else {
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysSince = Math.floor((now - Number(lastVisit)) / msPerDay);

    if (daysSince < 1) {
      message = 'Back so soon! Awesome!';
    } else if (daysSince === 1) {
      message = 'You last visited 1 day ago.';
    } else {
      message = `You last visited ${daysSince} days ago.`;
    }
  }

  localStorage.setItem(LAST_VISIT_KEY, now);

  msgEl.textContent = message;
  msgEl.closest('.visit-banner')?.removeAttribute('hidden');
}

// ── Hamburger menu ───────────────────────────────────────────
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    mobileNav.classList.toggle('open');
    mobileNav.setAttribute('aria-hidden', expanded);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
    }
  });
}

// ── Footer: year & last modified ────────────────────────────
function initFooter() {
  const yearEl = document.getElementById('currentYear');
  const modEl = document.getElementById('lastModified');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl) modEl.textContent = 'Last Modified: ' + document.lastModified;
}

// ── Init ─────────────────────────────────────────────────────
renderCards();
handleVisitMessage();
initHamburger();
initFooter();