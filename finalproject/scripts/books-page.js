// books-page.js — Books page initialiser
// WDD231 EduStar Project
import { initNav, showToast } from './nav.js';
import { fetchBooks, renderBooks, applyFilters, clearFilters, restorePrefs, openBookModal } from './books.js';

initNav('books');

// ── Expose openModal globally for inline onclick in cards ────
window.openModal = openBookModal;

// ── Init ──────────────────────────────────────────────────────
(async () => {
  const loadingEl = document.getElementById('loading-state');

  const books = await fetchBooks();

  if (loadingEl) loadingEl.style.display = 'none';

  renderBooks(books);
  restorePrefs();

  if (books.length) showToast(`Loaded ${books.length} books`, '📚');

  // ── Event listeners ────────────────────────────────────────
  document.getElementById('search-input')?.addEventListener('input', applyFilters);
  document.getElementById('filter-country')?.addEventListener('change', applyFilters);
  document.getElementById('filter-subject')?.addEventListener('change', applyFilters);
  document.getElementById('btn-clear')?.addEventListener('click', clearFilters);

  // ── Modal close ────────────────────────────────────────────
  const modal    = document.getElementById('book-modal');
  const closeBtn = document.getElementById('modal-close');
  if (modal && closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('open'); });
  }

  localStorage.setItem('edustar_last_page', 'books');
})();
