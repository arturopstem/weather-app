import * as WeatherAPI from './weather-api';
import * as Datalist from './datalist';
import * as GUI from './GUI';

async function search(e) {
  e.preventDefault();
  const form = e.target;
  const input = form.elements.namedItem('location');
  const ariaInvalid = input.getAttribute('aria-invalid');
  if (ariaInvalid === 'false') {
    const main = document.querySelector('.main');
    GUI.showLoading(main);
    const query = input.value.trim();
    const forecastObject = await WeatherAPI.forecast(query);
    const forecastJSON = JSON.stringify(forecastObject);
    localStorage.setItem('forecast-object', forecastJSON);
    GUI.displayWeatherInfo(forecastObject);
    GUI.removeLoading(main);
  }
}

async function suggest(e) {
  const input = e.target;
  const { list } = input;
  const query = input.value.trim();
  if (query) {
    const locations = await WeatherAPI.search(query);
    if (locations.length > 0) {
      input.setAttribute('aria-invalid', 'false');
      Datalist.populate(list, locations);
    } else {
      input.setAttribute('aria-invalid', 'true');
      Datalist.removeOptions(list);
    }
  } else {
    input.removeAttribute('aria-invalid');
    Datalist.removeOptions(list);
  }
}

export { search, suggest };
