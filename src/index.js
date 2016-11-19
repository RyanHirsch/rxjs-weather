import Rx from 'rxjs';
const appContainer = document.getElementById('app-container');
const zipcodeInput = document.getElementById('zipcode-input');
const addLocationBtn = document.getElementById('add-location');

const btn$ = Rx.Observable
  .fromEvent(addLocationBtn, 'click')
  .mapTo(true);

const zipInput$ = Rx.Observable
  .fromEvent(zipcodeInput, 'input')
  .map(e => e.target.value)
  .filter(validateZip);

const zipCode$ = btn$
  .withLatestFrom(
    zipInput$,
    function(click, zip) {
      return zip;
    }
  )
  .distinct();

zipCode$
  .flatMap(zipTemperatureStreamFactory)
  .forEach(createTempCard);

const replayZip$ = new Rx.ReplaySubject();
zipCode$.subscribe(replayZip$);

Rx.Observable
  .interval(20000)
  .switchMap(() => replayZip$)
  .flatMap(zipTemperatureStreamFactory)
  .forEach(log);

function log(...args) {
  console.log(...args); // eslint-disable-line no-console
}

function validateZip(zip) {
  return (/^\d{5}$/).test(zip);
}

function getTemperature(zip) {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${zip},us&units=imperial&APPID=798539b1ab859c818a0bd78604832b93`)
    .then(res => res.json());
}

function zipTemperatureStreamFactory(zip) {
  return Rx.Observable
    .fromPromise(getTemperature(zip))
    .map(({ main: { temp } }) => ({ temp, zip }));
}

function createTempCard({ zip, temp }) {
  const locationEle = document.createElement('div');
  locationEle.id = `zip-${zip}`;
  locationEle.classList.add('location');

  const zipEle = document.createElement('p');
  zipEle.classList.add('zip');
  zipEle.innerText = zip;

  const tempEle = document.createElement('p');
  tempEle.classList.add('temp');
  tempEle.innerHTML = `${temp}&deg;F`;

  locationEle.appendChild(zipEle);
  locationEle.appendChild(tempEle);
  appContainer.appendChild(locationEle);

  zipcodeInput.value = '';
}
