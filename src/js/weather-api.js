const API_KEY = 'cc9bf0bb9b1d436f954212750232709';
const BASE_URL = 'http://api.weatherapi.com/v1';

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
  const locations = await response.json();
  return filterUnique(locations);
}

async function current(query) {
  return query;
}
export { search, current };
