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
    // First ever visit
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

  // Save the current visit timestamp
  localStorage.setItem(LAST_VISIT_KEY, now);

  msgEl.textContent = message;
  msgEl.closest('.visit-banner')?.removeAttribute('hidden');
}

// ── Init ─────────────────────────────────────────────────────
renderCards();
handleVisitMessage();
