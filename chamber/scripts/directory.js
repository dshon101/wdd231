// =============================================
// Lusaka Chamber of Commerce — directory.js
// =============================================

const membersUrl = 'data/members.json';
const container  = document.querySelector('#directory-container');
const btnGrid    = document.querySelector('#btn-grid');
const btnList    = document.querySelector('#btn-list');
const memberCount = document.querySelector('.member-count');

// ── Membership level labels ──────────────────
const levelLabel = (level) => {
  switch (level) {
    case 3: return { text: '★ Gold Member',   cls: 'badge-gold'   };
    case 2: return { text: '◆ Silver Member', cls: 'badge-silver' };
    default: return { text: 'Member',          cls: 'badge-member' };
  }
};

// ── Build a single member card ───────────────
const buildCard = (member) => {
  const badge = levelLabel(member.membershipLevel);

  const card = document.createElement('article');
  card.classList.add('member-card');
  card.setAttribute('data-level', member.membershipLevel);

  // Matches wireframe: image left, details right
  card.innerHTML = `
    <div class="card-img-wrap">
      <img
        src="images/members/${member.image}"
        alt="${member.name} logo"
        loading="lazy"
        width="120"
        height="120"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
      />
      <span class="card-img-placeholder" aria-hidden="true" style="display:none;">🏢</span>
    </div>
    <div class="card-body">
      <h2 class="card-name">${member.name}</h2>
      <p class="card-tagline">${member.description}</p>
      <p class="card-detail"><strong>EMAIL:</strong> info@lusakachamber.co.zm</p>
      <p class="card-detail"><strong>PHONE:</strong> ${member.phone}</p>
      <p class="card-detail"><strong>URL:</strong>
        <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website.replace('https://', '')}</a>
      </p>
      <span class="membership-badge ${badge.cls}">${badge.text}</span>
    </div>
  `;

  return card;
};

// ── Fetch & display members ──────────────────
const displayMembers = (members) => {
  container.innerHTML = '';
  members.forEach((member) => {
    const card = buildCard(member);
    container.appendChild(card);
  });
  memberCount.textContent = `${members.length} member businesses`;
};

async function getMemberData() {
  try {
    const response = await fetch(membersUrl);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    // console.table(data.members); // dev testing — commented out
    displayMembers(data.members);
  } catch (error) {
    container.innerHTML = `<p style="color:red; padding:1rem;">Could not load member data: ${error.message}</p>`;
    console.error('Fetch error:', error);
  }
}

// ── Grid / List toggle ───────────────────────
btnGrid.addEventListener('click', () => {
  container.classList.replace('list-view', 'grid-view');
  btnGrid.classList.add('active');
  btnGrid.setAttribute('aria-pressed', 'true');
  btnList.classList.remove('active');
  btnList.setAttribute('aria-pressed', 'false');
});

btnList.addEventListener('click', () => {
  container.classList.replace('grid-view', 'list-view');
  btnList.classList.add('active');
  btnList.setAttribute('aria-pressed', 'true');
  btnGrid.classList.remove('active');
  btnGrid.setAttribute('aria-pressed', 'false');
});

// ── Hamburger menu ───────────────────────────
const hamburger  = document.querySelector('#hamburger');
const mobileNav  = document.querySelector('#mobile-nav');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileNav.setAttribute('aria-hidden', !isOpen);
});

// ── Footer: copyright year & last modified ───
document.querySelector('#currentYear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent =
  `Last Modified: ${document.lastModified}`;

// ── Init ─────────────────────────────────────
getMemberData();
