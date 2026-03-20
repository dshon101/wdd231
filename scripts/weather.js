// weather.js
// WDD 231 – Consuming an API Activity
// Location: Trier, Germany | Coordinates: lat=49.75, lon=6.64

// SELECT HTML ELEMENTS IN THE DOCUMENT
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const townName = document.querySelector('#town');

// BUILD THE API URL
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=8a40d94edd917bc65b610f32960b7753';

// FETCH THE CURRENT WEATHER DATA
async function apiFetch() {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only — inspect in DevTools > Console
      displayResults(data);
    } else {
      throw Error(await response.text());
    }

  } catch (error) {
    console.log(error);
  }
}

// DISPLAY THE JSON DATA ONTO THE WEB PAGE
function displayResults(data) {
  console.log('hello')
  townName.innerHTML = data.name;

  currentTemp.innerHTML = `${data.main.temp.toFixed(1)}&deg;C`;

  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let desc = data.weather[0].description;

  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
}

// START THE PROCESS
apiFetch();