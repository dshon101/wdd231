// =============================================
// Lusaka Chamber of Commerce — join.js
// Handles: join.html form setup + modal logic
//          thankyou.html URLSearchParams display
//          shared: hamburger, footer year/modified
// =============================================

// ── Shared: footer & hamburger ───────────────
const yearEl = document.querySelector('#currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lastModEl = document.querySelector('#lastModified');
if (lastModEl) lastModEl.textContent = `Last Modified: ${document.lastModified}`;

const hamburger = document.querySelector('#hamburger');
const mobileNav = document.querySelector('#mobile-nav');
if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        mobileNav.setAttribute('aria-hidden', !isOpen);
    });
}

// ══════════════════════════════════════════════
// JOIN.HTML logic
// ══════════════════════════════════════════════
const joinForm = document.querySelector('#join-form');

if (joinForm) {

    // ── Inject current timestamp into hidden field ──
    const timestampField = document.querySelector('#timestamp');
    if (timestampField) {
        timestampField.value = new Date().toLocaleString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
    }

    // ── Modal logic ─────────────────────────────
    // Open: each "Learn More" button opens its target dialog
    document.querySelectorAll('.mcard-learn-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) modal.showModal();
        });
    });

    // Close: the ✕ button inside each dialog
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('dialog').close();
        });
    });

    // Close: clicking outside the dialog box (on the ::backdrop)
    document.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('click', (e) => {
            const rect = dialog.getBoundingClientRect();
            const clickedOutside =
                e.clientX < rect.left || e.clientX > rect.right ||
                e.clientY < rect.top || e.clientY > rect.bottom;
            if (clickedOutside) dialog.close();
        });
    });

}

// ══════════════════════════════════════════════
// THANKYOU.HTML logic
// ══════════════════════════════════════════════
const resultsContainer = document.querySelector('#thankyou-results');

if (resultsContainer) {
    const params = new URLSearchParams(window.location.search);

    // Map of param name → friendly label
    const fields = [
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'email', label: 'Email Address' },
        { key: 'phone', label: 'Mobile Phone' },
        { key: 'orgName', label: 'Organisation Name' },
        { key: 'timestamp', label: 'Date &amp; Time Submitted' },
    ];

    // Membership level display names
    const levelNames = {
        np: 'NP Membership (Non-Profit)',
        bronze: 'Bronze Membership',
        silver: 'Silver Membership',
        gold: 'Gold Membership',
    };

    const membershipLevel = params.get('membershipLevel');
    const membershipDisplay = levelNames[membershipLevel] || membershipLevel || 'Not selected';

    // Build row helper
    const buildRow = (label, value) => `
    <div class="thankyou-row">
      <span class="thankyou-label">${label}</span>
      <span class="thankyou-value">${value || '<em>Not provided</em>'}</span>
    </div>`;

    const rows = fields.map(f => buildRow(f.label, params.get(f.key))).join('');
    const levelRow = buildRow('Membership Level', membershipDisplay);

    const firstName = params.get('firstName') || 'Applicant';

    resultsContainer.innerHTML = `
    <p class="thankyou-greeting">
      Welcome, <strong>${firstName} ${params.get('lastName') || ''}</strong>! 
      Here is a summary of the information you submitted.
    </p>
    <div class="thankyou-card">
      ${rows}
      ${levelRow}
    </div>
  `;
}