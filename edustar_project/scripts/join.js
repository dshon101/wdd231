// join.js — Join page module
// WDD231 EduStar Project
import { initNav } from './nav.js';

initNav('join');

// ── Grade systems by country ─────────────────────────────────
const GRADE_SYSTEMS = {
  KE: { hint: 'Kenya CBC: Pre-Primary (PP1–PP2), Primary (Grade 1–6), Junior Secondary (Grade 7–9), Senior Secondary (Grade 10–12)', grades: ['PP1','PP2','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'] },
  NG: { hint: 'Nigeria: Primary (1–6), Junior Secondary (JSS1–3), Senior Secondary (SS1–3)', grades: ['Primary 1','Primary 2','Primary 3','Primary 4','Primary 5','Primary 6','JSS 1','JSS 2','JSS 3','SS 1','SS 2','SS 3'] },
  ZA: { hint: 'South Africa CAPS: Foundation (Gr1–3), Intermediate (Gr4–6), Senior (Gr7–9), FET (Gr10–12)', grades: ['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'] },
  TZ: { hint: 'Tanzania: Primary (Std 1–7), O-Level (Form 1–4), A-Level (Form 5–6)', grades: ['Standard 1','Standard 2','Standard 3','Standard 4','Standard 5','Standard 6','Standard 7','Form 1','Form 2','Form 3','Form 4','Form 5','Form 6'] },
  UG: { hint: 'Uganda: Primary (P1–P7), O-Level (S1–S4), A-Level (S5–S6)', grades: ['P1','P2','P3','P4','P5','P6','P7','S1','S2','S3','S4','S5','S6'] },
  GH: { hint: 'Ghana: Basic (Class 1–6, JHS 1–3), Senior High (SHS 1–3)', grades: ['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','JHS 1','JHS 2','JHS 3','SHS 1','SHS 2','SHS 3'] },
  ZW: { hint: 'Zimbabwe: Primary (Grade 1–7), Secondary (Form 1–6) — ZIMSEC curriculum', grades: ['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Form 1','Form 2','Form 3','Form 4','Form 5','Form 6'] },
  ZM: { hint: 'Zambia: Primary (Grade 1–9), Secondary (Grade 10–12) — ECZ curriculum', grades: ['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'] },
  ET: { hint: 'Ethiopia: Primary (Grade 1–8), Secondary (Grade 9–12)', grades: ['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'] },
  RW: { hint: 'Rwanda: Primary (P1–P6), Secondary (S1–S6) — REB curriculum', grades: ['P1','P2','P3','P4','P5','P6','S1','S2','S3','S4','S5','S6'] },
  MW: { hint: 'Malawi: Primary (Std 1–8), Secondary (Form 1–4)', grades: ['Standard 1','Standard 2','Standard 3','Standard 4','Standard 5','Standard 6','Standard 7','Standard 8','Form 1','Form 2','Form 3','Form 4'] },
  BW: { hint: 'Botswana: Primary (Std 1–7), Secondary (Form 1–5)', grades: ['Standard 1','Standard 2','Standard 3','Standard 4','Standard 5','Standard 6','Standard 7','Form 1','Form 2','Form 3','Form 4','Form 5'] },
  MZ: { hint: 'Mozambique: Primary (Grade 1–7), Secondary (Grade 8–12)', grades: ['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'] },
};

// ── DOM references ───────────────────────────────────────────
const countryEl = document.getElementById('country');
const gradeEl   = document.getElementById('grade');
const gradeHint = document.getElementById('grade-hint');
const errorMsg  = document.getElementById('error-msg');
const form      = document.getElementById('join-form');

// ── Update grade options when country changes ────────────────
if (countryEl && gradeEl) {
  countryEl.addEventListener('change', () => {
    const code = countryEl.value;
    gradeEl.innerHTML = '<option value="">Select your grade…</option>';

    if (!code || !GRADE_SYSTEMS[code]) {
      gradeEl.disabled = true;
      if (gradeHint) gradeHint.classList.remove('show');
      return;
    }

    const sys = GRADE_SYSTEMS[code];
    gradeEl.innerHTML = '<option value="">Select your grade…</option>' +
      sys.grades.map(g => `<option value="${g}">${g}</option>`).join('');

    gradeEl.disabled = false;
    if (gradeHint) {
      gradeHint.textContent = `📚 ${sys.hint}`;
      gradeHint.classList.add('show');
    }

    localStorage.setItem('edustar_pref_country', code);
  });
}

// ── Show error helper ────────────────────────────────────────
function showError(msg) {
  if (!errorMsg) return;
  errorMsg.textContent = msg;
  errorMsg.classList.add('show');
  errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  setTimeout(() => errorMsg.classList.remove('show'), 5000);
}

// ── Form validation & submission ─────────────────────────────
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fname   = document.getElementById('first-name').value.trim();
    const lname   = document.getElementById('last-name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const country = countryEl.value;
    const grade   = gradeEl.value;
    const subject = document.getElementById('subject').value;
    const agree   = document.getElementById('agree').checked;

    if (!fname || !lname)            return showError('⚠️ Please enter your first and last name.');
    if (!email || !email.includes('@')) return showError('⚠️ Please enter a valid email address.');
    if (!country)                    return showError('⚠️ Please select your country.');
    if (!grade)                      return showError('⚠️ Please select your grade level.');
    if (!subject)                    return showError('⚠️ Please select your primary subject.');
    if (!agree)                      return showError('⚠️ You must agree to the Terms of Use to continue.');

    const student = { fname, lname, email, country, grade, subject, joined: new Date().toISOString() };
    localStorage.setItem('edustar_pending_student', JSON.stringify(student));

    const params = new URLSearchParams({ fname, lname, email, country, grade, subject });
    window.location.href = `join-confirm.html?${params.toString()}`;
  });
}

localStorage.setItem('edustar_last_page', 'join');
