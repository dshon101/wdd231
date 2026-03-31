// index.js — Home page module
// WDD231 EduStar Project
import { initNav } from './nav.js';

initNav('home');

// ── Features data rendered with template literals & map ──────
const FEATURES = [
  { icon: '📚', title: 'Free Textbook Library', desc: 'Over 30 free, legal textbooks from Siyavula, OpenStax, and Maktaba — filtered for your country and grade.' },
  { icon: '🤖', title: 'AI-Powered Lessons', desc: 'Curriculum-aligned lessons and explanations generated with AI and tailored to your learning pace.' },
  { icon: '🧠', title: 'Adaptive Quizzes', desc: 'Test your knowledge with smart quizzes that adapt to your level and help you identify gaps.' },
  { icon: '💬', title: 'Peer Community', desc: 'Ask questions, share notes, and connect with students across Africa who are studying the same subjects.' },
  { icon: '📊', title: 'Progress Tracking', desc: 'Track your learning progress, XP points, and subject completion from your personal dashboard.' },
  { icon: '🌍', title: 'Multi-Curriculum Support', desc: 'Supports ZIMSEC, WAEC, KCSE, NECTA, CAPS, ECZ, and more — all in one place.' },
];

const grid = document.getElementById('features-grid');
if (grid) {
  grid.innerHTML = FEATURES.map(f => `
    <article class="feature-card">
      <div class="feature-icon" aria-hidden="true">${f.icon}</div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </article>`).join('');
}

// ── Animate stat counter ─────────────────────────────────────
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const step = Math.ceil(target / 40);
  const interval = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start + suffix;
    if (start >= target) clearInterval(interval);
  }, 40);
}

const statEl = document.getElementById('stat-books');
if (statEl) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(statEl, 30, '+');
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statEl);
}

// ── Persist last visited page ────────────────────────────────
localStorage.setItem('edustar_last_page', 'home');
