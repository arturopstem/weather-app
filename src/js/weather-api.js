const API_KEY = 'cc9bf0bb9b1d436f954212750232709';
const BASE_URL = 'https://api.weatherapi.com/v1';

function filterUnique(locations) {
  const unique = new Map();
  locations.forEach((location) => {
    unique.set(location.url, location);
  });
  return [...unique.values()];
}

async function search(query) {
  const API = '/search.json';
  const call = `${BASE_URL}${API}?key=${API_KEY}&q=${query}`;
  const response = await fetch(call);
  const locationObjArray = await response.json();
  return filterUnique(locationObjArray);
}

async function realtime(query) {
  const API = '/current.json';
  const call = `${BASE_URL}${API}?key=${API_KEY}&q=${query}`;
  const response = await fetch(call);
  const currentObject = response.json();
  return currentObject;
}

async function forecast(query) {
  const API = '/forecast.json';
  const call = `${BASE_URL}${API}?key=${API_KEY}&q=${query}&days=3&aqi=no&alerts=no`;
  const response = await fetch(call);
  const forecastObject = response.json();
  return forecastObject;
}

export { search, realtime, forecast };
