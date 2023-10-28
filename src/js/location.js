import * as WeatherAPI from './weather-api';
import * as Datalist from './datalist';
import * as GUI from './GUI';

async function search(e) {
  e.preventDefault();
  const form = e.target;
  const input = form.elements.namedItem('location');
  const ariaInvalid = input.getAttribute('aria-invalid');
  if (ariaInvalid === 'false') {
    // TODO: show loading
    // TODO: fetch location info (current and forecast)
    // TODO: create location info
    // TODO: remove loading
    // TODO: display location info
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
