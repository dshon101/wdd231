const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  // console.table(data.prophets); // temporary testing - commented out
  displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {

    // Create elements
    let card = document.createElement('section');
    card.classList.add('card');

    let orderBadge = document.createElement('span');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');
    let infoDiv = document.createElement('div');
    let birthdate = document.createElement('p');
    let birthplace = document.createElement('p');

    // Order badge
    orderBadge.classList.add('card-order');
    orderBadge.textContent = `Prophet #${prophet.order}`;

    // Full name heading
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // Portrait image
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Info section
    infoDiv.classList.add('card-info');
    birthdate.innerHTML = `<span>Date of Birth:</span> ${prophet.birthdate}`;
    birthplace.innerHTML = `<span>Place of Birth:</span> ${prophet.birthplace}`;

    // Assemble card
    infoDiv.appendChild(orderBadge);
    infoDiv.appendChild(birthdate);
    infoDiv.appendChild(birthplace);

    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(infoDiv);

    cards.appendChild(card);
  });
};

getProphetData();
