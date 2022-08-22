'use strict';

document.getElementById('btn-toggle').addEventListener('click', () => {
  const bodyElement = document.querySelector('body');
  bodyElement.classList.toggle('dark');

  const btnToggleText = document.getElementById('btn-toggle-text');
  const moonIcon = document.getElementById('moon-icon');

  if (bodyElement.classList.contains('dark')) {
    btnToggleText.innerText = 'Light Mode';
    // add 'bxs-moon' class for solid moon icon
    moonIcon.classList.add('bxs-moon');
    moonIcon.classList.remove('bx-moon');
  } else {
    btnToggleText.innerText = 'Dark Mode';
    moonIcon.classList.add('bx-moon');
    // remove 'bxs-moon' class for regular moon icon when dark mode is off
    moonIcon.classList.remove('bxs-moon');
  }
});

function loadCountries() {
  fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => displayCountries(data));
}

loadCountries();

function displayCountries(countries) {
  const countryContainer = document.getElementById('country-container');

  for (const country of countries) {
    const countryObject = JSON.stringify(country);

    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
      <div onclick = 'displayCountryDetail(${countryObject})' class="card h-100 shadow-sm border-0 rounded">
          <img src="${country?.flags?.png}" class="card-img-top  country-img" alt="..." />
          <div class="card-body p-4 pb-5">
            <h4 class="card-title fw-bold py-2">${country?.name?.common}</h4>
            <h6>Population: <span>${country?.population} </span> </h6>
            <h6>Region: <span>${country?.region} </span> </h6>
            <h6>Capital: <span>${country.capital?.[0]} </span> </h6>
          </div>
      </div>`;

    countryContainer.appendChild(div);
    if (country.region === 'Africa') {
      document.getElementById('region-africa').children[0].innerText =
        country.region;
    } else if (country.region === 'Americas') {
      document.getElementById('region-america').children[0].innerText =
        country.region;
    } else if (country.region === 'Asia') {
      document.getElementById('region-asia').children[0].innerText =
        country.region;
    } else if (country.region === 'Europe') {
      document.getElementById('region-europe').children[0].innerText =
        country.region;
    } else if (country.region === 'Oceania') {
      document.getElementById('region-oceania').children[0].innerText =
        country.region;
    }
  }
}

// function displayCountryDetail(country) {
//   console.log(country);
//   window.location.href = './country.html';
//   return loadCountry(country);
// }

//* add event listener to search input field

document.getElementById('search-country').addEventListener('keyup', (e) => {
  const searchText = e.target.value;

  // This is a fetch request to the API. It is using the searchText to search for the country.
  const url = `https://restcountries.com/v3.1/name/${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchCountry(data[0]));

  // checking if the searchText is empty? if it is, it will load all the countries.
  if (searchText === '') {
    loadCountries();
  }
});

function displaySearchCountry(country) {
  const countryContainer = document.getElementById('country-container');
  countryContainer.innerHTML = ''; // clear the country container before adding new countries
  console.log(country);
  const div = document.createElement('div');
  div.classList.add('col');
  div.innerHTML = `
      <div class="card h-100 shadow-sm border-0 rounded">
          <img src="${country?.flags?.png}" class="card-img-top  country-img" alt="..." />
          <div class="card-body p-4 pb-5">
            <h4 class="card-title fw-bold py-2">${country?.name?.common}</h4>
            <h6>Population: <span>${country?.population} </span> </h6>
            <h6>Region: <span>${country?.region} </span> </h6>
            <h6>Capital: <span>${country.capital?.[0]} </span> </h6>
          </div>
      </div>`;

  countryContainer.appendChild(div);
}
