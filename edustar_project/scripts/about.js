// about.js — About page module
// WDD231 EduStar Project
import { initNav } from './nav.js';

initNav('about');

// ── Curricula list — rendered with template literals + map ───
const CURRICULA = [
  { flag:'🇰🇪', country:'Kenya',        board:'CBC / KCSE' },
  { flag:'🇳🇬', country:'Nigeria',       board:'WAEC / NECO' },
  { flag:'🇿🇦', country:'South Africa',  board:'CAPS / NSC' },
  { flag:'🇹🇿', country:'Tanzania',      board:'NECTA' },
  { flag:'🇺🇬', country:'Uganda',        board:'UNEB' },
  { flag:'🇬🇭', country:'Ghana',         board:'WASSCE' },
  { flag:'🇿🇼', country:'Zimbabwe',      board:'ZIMSEC' },
  { flag:'🇿🇲', country:'Zambia',        board:'ECZ' },
  { flag:'🇪🇹', country:'Ethiopia',      board:'MoE Curriculum' },
  { flag:'🇷🇼', country:'Rwanda',        board:'REB' },
  { flag:'🇲🇼', country:'Malawi',        board:'MANEB' },
  { flag:'🇧🇼', country:'Botswana',      board:'BGCSE' },
];

const grid = document.getElementById('curricula-grid');
if (grid) {
  grid.innerHTML = CURRICULA.map(c => `
    <div class="curriculum-card">
      <span class="curriculum-flag" aria-hidden="true">${c.flag}</span>
      <div class="curriculum-info">
        <strong>${c.country}</strong>
        <span>${c.board}</span>
      </div>
    </div>`).join('');
}

localStorage.setItem('edustar_last_page', 'about');
