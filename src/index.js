import Rx from 'rxjs';
// const appContainer = document.getElementById('app-container');
const zipcodeInput = document.getElementById('zipcode-input');
const addLocationBtn = document.getElementById('add-location');

const btn$ = Rx.Observable
  .fromEvent(addLocationBtn, 'click')
  .mapTo(true);

const zipInput$ = Rx.Observable
  .fromEvent(zipcodeInput, 'input')
  .map(e => e.target.value)
  .filter(zip => (/^\d{5}$/).test(zip))
  .distinctUntilChanged();


btn$.forEach(val => console.log('click stream val', val)); // eslint-disable-line no-console
zipInput$.forEach(zip => console.log('zip code!', zip)); // eslint-disable-line no-console
