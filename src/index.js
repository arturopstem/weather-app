import './style.css';

import * as Location from './js/location';

const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', Location.search);
searchForm.addEventListener('input', Location.suggest);
