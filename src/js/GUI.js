import * as WeatherAPI from './weather-api';

function showLoading(element) {
  element.setAttribute('aria-busy', 'true');
}

function removeLoading(element) {
  element.removeAttribute('aria-busy');
}

function createWeatherLocation(location) {
  const { name, region, country, localtime } = location;
  const todaysDate = new Date(localtime);
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const dateString = todaysDate.toLocaleDateString(undefined, options);
  const markup = `
    <header class="weather-location">
      <hgroup id="todays-date">
        <h1>Today</h1>
        <p>${dateString}</p>
      </hgroup>
      <div id="full-location" class="headings">
        <h2>${name}</h3>
        <p>${region ? `${region},` : ''} ${country}</p>
      </div>
    </header>
  `;

  const locationNode = new DOMParser()
    .parseFromString(markup, 'text/html')
    .querySelector('.weather-location');

  return locationNode;
}

function createWeatherBody(current) {
  const degree = localStorage.getItem('degree');
  const tempMagnitude = degree === 'C' ? current.temp_c : current.temp_f;
  const temperature = `${tempMagnitude} º${degree}`;
  const {
    condition: { icon, text },
  } = current;
  const markup = `
    <div class="weather-body">
      <div class="todays-temperature"><strong>${temperature}</strong></div>
      <figure class="todays-condition">
        <img src=${icon}>
        <figcaption>${text}</figcaption>
      </figure>
    </div>
  `;

  const bodyNode = new DOMParser()
    .parseFromString(markup, 'text/html')
    .querySelector('.weather-body');

  return bodyNode;
}

function createForecastDayInfo(day, index) {
  const {
    date,
    day: { avgtemp_c: tempC, avgtemp_f: tempF, condition },
  } = day;
  const title = index === 0 ? 'Tomorrow' : 'After tomorrow';
  const degree = localStorage.getItem('degree');
  const tempMagnitude = degree === 'C' ? tempC : tempF;
  const temperature = `${tempMagnitude} º${degree}`;
  const forecastDate = new Date(date).toUTCString();
  const UTCdateString = forecastDate.match(/.*(?= 00:)/)[0];

  const markup = `
    <details class="forecast-day">
      <summary role="button" class="outline contrast">${title}</summary>
      <ul>
        <li><strong>${UTCdateString}</strong></li>
        <li>Temperature: <strong class="forecast-temperature">${temperature}</strong></li>
        <li><img src="${condition.icon}"> ${condition.text}</li>
      </ul>
    </details>
  `;

  const dayNode = new DOMParser()
    .parseFromString(markup, 'text/html')
    .querySelector('.forecast-day');

  return dayNode;
}

function createWeatherForecast(forecast) {
  const { forecastday } = forecast;
  const forecastDays = forecastday.slice(1);
  const forecastNode = document.createElement('footer');
  forecastNode.classList.add('weather-footer');
  forecastDays.forEach((day, index) => {
    const forecastDay = createForecastDayInfo(day, index);
    forecastNode.appendChild(forecastDay);
  });

  return forecastNode;
}

function displayWeatherInfo(forecastObject) {
  const { location, current, forecast } = forecastObject;
  const headerLocation = createWeatherLocation(location);
  const weatherBody = createWeatherBody(current);
  const footerForecast = createWeatherForecast(forecast);
  const article = document.createElement('article');
  article.appendChild(headerLocation);
  article.appendChild(weatherBody);
  article.appendChild(footerForecast);
  const main = document.querySelector('.main');
  main.replaceChildren();
  main.appendChild(article);
}

async function displayInitialInfo() {
  const storedForecast = localStorage.getItem('forecast-object');
  let query;
  if (storedForecast) {
    const storedForecastObject = JSON.parse(storedForecast);
    const {
      location: { name, region, country },
    } = storedForecastObject;
    query = `${name} ${region} ${country}`;
  } else {
    query = 'Lima Lima Peru';
  }
  const forecastObject = await WeatherAPI.forecast(query);
  const forecastJSON = JSON.stringify(forecastObject);
  localStorage.setItem('forecast-object', forecastJSON);
  displayWeatherInfo(forecastObject);
}

function colorDegreeBtn(degree) {
  const degreeBtns = document.querySelectorAll('button[data-degree]');
  degreeBtns.forEach((btn) => {
    if (btn.dataset.degree === degree) {
      btn.classList.remove('secondary', 'outline');
      btn.classList.add('primary');
    } else {
      btn.classList.remove('primary');
      btn.classList.add('secondary', 'outline');
    }
  });
}

function initDegreeBtns(degree = 'C') {
  const storedDegree = localStorage.getItem('degree');
  if (storedDegree) {
    colorDegreeBtn(storedDegree);
  } else {
    localStorage.setItem('degree', degree);
    colorDegreeBtn(degree);
  }
}

function degreeBtnsEventHandler(e) {
  if (e.target.nodeName === 'BUTTON') {
    const button = e.target;
    const { degree } = button.dataset;
    localStorage.setItem('degree', degree);
    colorDegreeBtn(degree);
    const storedForecast = localStorage.getItem('forecast-object');
    const storedForecastObject = JSON.parse(storedForecast);
    displayWeatherInfo(storedForecastObject);
  }
}

export {
  showLoading,
  removeLoading,
  degreeBtnsEventHandler,
  initDegreeBtns,
  displayWeatherInfo,
  displayInitialInfo,
};
