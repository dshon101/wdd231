// join-confirm.js — Registration confirmation page
// WDD231 EduStar Project
import { initNav, showToast } from './nav.js';

initNav('join');

const COUNTRY_NAMES = {
  KE:'🇰🇪 Kenya', NG:'🇳🇬 Nigeria', ZA:'🇿🇦 South Africa',
  TZ:'🇹🇿 Tanzania', UG:'🇺🇬 Uganda', GH:'🇬🇭 Ghana',
  ZW:'🇿🇼 Zimbabwe', ZM:'🇿🇲 Zambia', ET:'🇪🇹 Ethiopia',
  RW:'🇷🇼 Rwanda', MW:'🇲🇼 Malawi', BW:'🇧🇼 Botswana', MZ:'🇲🇿 Mozambique'
};

// ── Parse query string ───────────────────────────────────────
const params  = new URLSearchParams(window.location.search);
const fname   = params.get('fname')   || '';
const lname   = params.get('lname')   || '';
const email   = params.get('email')   || '';
const country = params.get('country') || '';
const grade   = params.get('grade')   || '';
const subject = params.get('subject') || '';

const fields = [
  { label: 'Full Name',  value: `${fname} ${lname}`.trim() || '—' },
  { label: 'Email',      value: email   || '—' },
  { label: 'Country',    value: COUNTRY_NAMES[country] || country || '—' },
  { label: 'Grade',      value: grade   || '—' },
  { label: 'Subject',    value: subject || '—' },
  { label: 'Registered', value: new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' }) },
];

const output = document.getElementById('data-output');
if (output) {
  output.innerHTML = fields.map(f => `
    <div class="data-row">
      <span class="data-label">${f.label}</span>
      <span class="data-value">${f.value}</span>
    </div>`).join('');
}

showToast('Registration received!', '🎉');
