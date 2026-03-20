// =============================================
// Lusaka Chamber of Commerce — index.js
// Home page: Weather API + Spotlights + UI
// =============================================

// ── Weather config ───────────────────────────
// Lusaka, Zambia: lat=-15.42, lon=28.28
const WEATHER_KEY = '8a40d94edd917bc65b610f32960b7753';
const LAT = '-15.42';
const LON = '28.28';
const UNITS = 'imperial'; // °F — change to 'metric' for °C

const weatherUrl =
    `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${WEATHER_KEY}`;

const forecastUrl =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${WEATHER_KEY}`;

// ── Weather element refs ─────────────────────
const weatherIcon = document.querySelector('#weather-icon');
const weatherTemp = document.querySelector('#weather-temp');
const weatherDesc = document.querySelector('#weather-desc');
const weatherHigh = document.querySelector('#weather-high');
const weatherLow = document.querySelector('#weather-low');
const weatherHumidity = document.querySelector('#weather-humidity');
const weatherSunrise = document.querySelector('#weather-sunrise');
const weatherSunset = document.querySelector('#weather-sunset');
const forecastList = document.querySelector('#forecast-list');

// ── Format Unix timestamp → "7:30 AM" ────────
const formatTime = (unix) => {
    const d = new Date(unix * 1000);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

// ── Fetch current weather ────────────────────
async function getWeather() {
    try {
        const res = await fetch(weatherUrl);
        if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
        const data = await res.json();
        console.log('Current weather data:', data);
        displayWeather(data);
    } catch (err) {
        console.error(err);
        weatherDesc.textContent = 'Weather unavailable';
    }
}

function displayWeather(data) {
    const deg = UNITS === 'imperial' ? '°F' : '°C';
    const icon = data.weather[0].icon;

    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    weatherTemp.textContent = `${Math.round(data.main.temp)}${deg}`;
    weatherDesc.textContent = data.weather[0].description;
    weatherHigh.textContent = `${Math.round(data.main.temp_max)}${deg}`;
    weatherLow.textContent = `${Math.round(data.main.temp_min)}${deg}`;
    weatherHumidity.textContent = `${data.main.humidity}%`;
    weatherSunrise.textContent = formatTime(data.sys.sunrise);
    weatherSunset.textContent = formatTime(data.sys.sunset);
}

// ── Fetch 3-day forecast ─────────────────────
async function getForecast() {
    try {
        const res = await fetch(forecastUrl);
        if (!res.ok) throw new Error(`Forecast fetch failed: ${res.status}`);
        const data = await res.json();
        console.log('Forecast data:', data);
        displayForecast(data);
    } catch (err) {
        console.error(err);
        forecastList.innerHTML = '<li>Forecast unavailable</li>';
    }
}

function displayForecast(data) {
    const deg = UNITS === 'imperial' ? '°F' : '°C';

    // The 5-day/3-hour forecast returns entries every 3 hours.
    // Pick the noon entry (or closest) for the next 3 distinct days.
    const today = new Date().toDateString();
    const seen = new Set();
    const days = [];

    for (const entry of data.list) {
        const date = new Date(entry.dt * 1000);
        const dateStr = date.toDateString();
        const hour = date.getHours();

        // Skip today, pick one entry per future day (prefer midday)
        if (dateStr === today) continue;
        if (seen.has(dateStr)) continue;
        if (hour >= 11 && hour <= 14) {
            seen.add(dateStr);
            days.push(entry);
        }
        if (days.length === 3) break;
    }

    // Fallback: if noon entries weren't found, just take first per day
    if (days.length < 3) {
        seen.clear();
        days.length = 0;
        for (const entry of data.list) {
            const date = new Date(entry.dt * 1000);
            const dateStr = date.toDateString();
            if (dateStr === today) continue;
            if (seen.has(dateStr)) continue;
            seen.add(dateStr);
            days.push(entry);
            if (days.length === 3) break;
        }
    }

    forecastList.innerHTML = days.map((entry) => {
        const date = new Date(entry.dt * 1000);
        const label = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(entry.main.temp);
        return `<li class="forecast-item">
      <span class="forecast-day">${label}:</span>
      <strong class="forecast-temp">${temp}${deg}</strong>
    </li>`;
    }).join('');
}

// ── Spotlights ───────────────────────────────
const spotlightsContainer = document.querySelector('#spotlights-container');
const membersUrl = 'data/members.json';

const levelLabel = (level) => {
    switch (level) {
        case 3: return { text: 'Gold Member', cls: 'badge-gold' };
        case 2: return { text: 'Silver Member', cls: 'badge-silver' };
        default: return { text: 'Member', cls: 'badge-member' };
    }
};

function buildSpotlight(member) {
    const badge = levelLabel(member.membershipLevel);
    const card = document.createElement('article');
    card.classList.add('spotlight-card');

    card.innerHTML = `
    <div class="spotlight-img-wrap">
      <img
        src="images/members/${member.image}"
        alt="${member.name} logo"
        loading="lazy"
        width="100"
        height="100"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
      />
      <span class="spotlight-img-placeholder" aria-hidden="true" style="display:none;">🏢</span>
    </div>
    <div class="spotlight-body">
      <h3 class="spotlight-name">${member.name}</h3>
      <span class="membership-badge ${badge.cls}">${badge.text}</span>
      <p class="spotlight-detail"><strong>Phone:</strong> ${member.phone}</p>
      <p class="spotlight-detail"><strong>Address:</strong> ${member.address}</p>
      <p class="spotlight-detail">
        <a href="${member.website}" target="_blank" rel="noopener noreferrer">
          ${member.website.replace('https://', '')}
        </a>
      </p>
    </div>
  `;
    return card;
}

async function getSpotlights() {
    try {
        const res = await fetch(membersUrl);
        if (!res.ok) throw new Error(`Members fetch failed: ${res.status}`);
        const data = await res.json();

        // Filter gold (3) and silver (2) members only
        const eligible = data.members.filter(m => m.membershipLevel >= 2);

        // Shuffle array randomly
        eligible.sort(() => Math.random() - 0.5);

        // Show 2 or 3 spotlights
        const count = eligible.length >= 3 ? 3 : 2;
        const selected = eligible.slice(0, count);

        spotlightsContainer.innerHTML = '';
        selected.forEach(member => {
            spotlightsContainer.appendChild(buildSpotlight(member));
        });
    } catch (err) {
        console.error('Spotlights error:', err);
        spotlightsContainer.innerHTML = '<p>Could not load spotlights.</p>';
    }
}

// ── Hamburger menu ───────────────────────────
const hamburger = document.querySelector('#hamburger');
const mobileNav = document.querySelector('#mobile-nav');

hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileNav.setAttribute('aria-hidden', !isOpen);
});

// ── Footer: year & last modified ─────────────
document.querySelector('#currentYear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent =
    `Last Modified: ${document.lastModified}`;

// ── Init ─────────────────────────────────────
getWeather();
getForecast();
getSpotlights();