// nav.js — Shared navigation module
// WDD231 EduStar Project

export function initNav(activePage) {
  // Works with new <ul>/<li><a> nav structure
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    if (link.dataset.page === activePage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.site-nav')) {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Intersection Observer for section reveal transitions
  const sections = document.querySelectorAll('.section, .hero, .about-hero, .page-header');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  sections.forEach(s => revealObserver.observe(s));
}

export function showToast(message, icon = '✅') {
  const wrap = document.querySelector('.toast-wrap');
  if (!wrap) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span> ${message}`;
  wrap.appendChild(toast);

  setTimeout(() => toast.remove(), 3500);
}
