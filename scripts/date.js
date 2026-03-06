// date.js — Dynamic copyright year and last modified date
// WDD 231 | Demetrious Shoniwa

const yearSpan = document.getElementById('currentyear');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const lastModifiedEl = document.getElementById('lastModified');
if (lastModifiedEl) {
  lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
}
