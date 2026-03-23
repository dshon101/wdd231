// scripts.js — Parse form submission data and display on confirmation page
// WDD 231 | URLSearchParams Activity

// Pull the query string from the current URL
const queryString = window.location.search;
const params = new URLSearchParams(queryString);

// Reference the results container in thanks.html
const resultsDiv = document.getElementById('results');

// Helper: format the raw date string (YYYY-MM-DD) into something readable
function formatDate(rawDate) {
  if (!rawDate) return 'Not provided';
  // Append T00:00:00 to prevent timezone shifts when parsing
  const d = new Date(rawDate + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric'
  });
}

// Helper: build a single detail row
function buildRow(label, value) {
  return `
    <div class="detail-row">
      <span class="detail-label">${label}</span>
      <span class="detail-value">${value || '<em>Not provided</em>'}</span>
    </div>`;
}

// Read each named parameter from the URL query string
const firstName  = params.get('first');
const lastName   = params.get('last');
const phone      = params.get('phone');
const email      = params.get('email');
const ordinance  = params.get('ordinance');
const date       = params.get('date');
const location   = params.get('location');

// Build and inject the confirmation HTML
resultsDiv.innerHTML = `
  <h2>Appointment Confirmed</h2>
  <p class="confirm-intro">
    Thank you, <strong>${firstName} ${lastName}</strong>! 
    Your temple appointment has been scheduled. 
    Please review the details below.
  </p>

  <div class="detail-group">
    <h3>Personal Information</h3>
    ${buildRow('First Name',  firstName)}
    ${buildRow('Last Name',   lastName)}
    ${buildRow('Cell Phone',  phone)}
    ${buildRow('Email',       email)}
  </div>

  <div class="detail-group">
    <h3>Appointment Details</h3>
    ${buildRow('Ordinance', ordinance)}
    ${buildRow('Date',      formatDate(date))}
    ${buildRow('Location',  location)}
  </div>

  <a href="index.html" class="back-link">&#8592; Schedule Another Appointment</a>
`;