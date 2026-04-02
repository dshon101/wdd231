// discover.js — Discover page module
// WDD231 Lusaka Chamber of Commerce

import { places } from '../data/discover.mjs';

// ── Populate existing card elements with data ────────────────
function renderCards() {
  const cards = document.querySelectorAll('.discover-card');
  if (!cards.length) return;

  cards.forEach((card, index) => {
    const place = places[index];
    if (!place) return;

    const img = card.querySelector('img');
    const h2 = card.querySelector('h2');
    const address = card.querySelector('address');
    const p = card.querySelector('p');
    const btn = card.querySelector('.discover-btn');

    if (img) {
      img.src = place.image;
      img.alt = place.alt;
    }
    if (h2) h2.textContent = place.name;
    if (address) address.textContent = place.address;
    if (p) p.textContent = place.description;
    if (btn) btn.setAttribute('aria-label', `Learn more about ${place.name}`);
  });
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