import './style.css';

import * as Location from './js/location';
import * as GUI from './js/GUI';

GUI.initDegreeBtns();
GUI.displayInitialInfo();

const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', Location.search);
searchForm.addEventListener('input', Location.suggest);

const degreeMenu = document.querySelector('.degree-menu');
degreeMenu.addEventListener('click', GUI.degreeBtnsEventHandler);
