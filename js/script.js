'use strict';

document.getElementById('btn-toggle').addEventListener('click', () => {
  const bodyElement = document.querySelector('body');
  bodyElement.classList.toggle('dark');

  const btnToggleText = document.getElementById('btn-toggle-text');
  const moonIcon = document.getElementById('moon-icon');

  if (bodyElement.classList.contains('dark')) {
    localStorage.setItem('darkMode', 'enabled');

    btnToggleText.innerText = 'Light Mode';
    // add 'bxs-moon' class for solid moon icon
    moonIcon.classList.add('bxs-moon');
    moonIcon.classList.remove('bx-moon');
  } else {
    localStorage.setItem('darkMode', 'disabled');

    btnToggleText.innerText = 'Dark Mode';
    moonIcon.classList.add('bx-moon');
    // remove 'bxs-moon' class for regular moon icon when dark mode is off
    moonIcon.classList.remove('bxs-moon');
  }
});

if (localStorage.getItem('darkMode') == 'enabled') {
  document.body.classList.toggle('dark');
}

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
    // console.log(country);

    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
      <div onclick = "loadCountryDetail('${country?.cca2}')" id="country-card" class="card h-100 shadow-sm border-0 rounded">
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
}

function loadCountryDetail(code) {
  const url = `https://restcountries.com/v3.1/alpha/${code}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCountryDetail(data[0]));
}

const displayCountryDetail = (country) => {
  window.location.href = './country.html';
  const countryObject = JSON.stringify(country);
  sessionStorage.setItem('country', countryObject);
  // console.log(country);
};

function loadCountries2() {
  fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => displayAfricaRegionCountry(data));
}

loadCountries2();

function setElementTextValue(country) {
  if (country.region === 'Africa') {
    const regionAfrica = document.getElementById('region-africa');
    regionAfrica.children[0].innerText = country.region;
  } else if (country.region === 'Americas') {
    const regionAmerica = document.getElementById('region-america');
    regionAmerica.children[0].innerText = country.region;
  } else if (country.region === 'Asia') {
    const regionAsia = document.getElementById('region-asia');
    regionAsia.children[0].innerText = country.region;
  } else if (country.region === 'Europe') {
    const regionEurope = document.getElementById('region-europe');
    regionEurope.children[0].innerText = country.region;
  } else if (country.region === 'Oceania') {
    const regionOceania = document.getElementById('region-oceania');
    regionOceania.children[0].innerText = country.region;
  }
}

function displayAfricaRegionCountry(countries) {
  const filterRegion = document.getElementById('filter');

  countries.forEach((country) => {
    setElementTextValue(country);
  });

  //* Add event listener to Africa Region List Item
  document.getElementById('region-africa').addEventListener('click', (e) => {
    const countryContainer = document.getElementById('country-container');
    countryContainer.innerHTML = '';

    const africanCountries = countries.filter((country) => {
      filterRegion.innerText = 'Africa';
      return country.region === 'Africa';
    });
    displayCountries(africanCountries);
    return;
  });

  //* Add event listener to Americas Region List Item
  document.getElementById('region-america').addEventListener('click', (e) => {
    const countryContainer = document.getElementById('country-container');
    countryContainer.innerHTML = '';

    const americanCountries = countries.filter((country) => {
      filterRegion.innerText = 'Americas';
      return country.region === 'Americas';
    });
    displayCountries(americanCountries);
    return;
  });

  //* Add event listener to Asia Region List Item
  document.getElementById('region-asia').addEventListener('click', (e) => {
    const countryContainer = document.getElementById('country-container');
    countryContainer.innerHTML = '';

    const asianCountries = countries.filter((country) => {
      filterRegion.innerText = 'Asia';
      return country.region === 'Asia';
    });
    displayCountries(asianCountries);
    return;
  });

  //* Add event listener to Europe Region List Item
  document.getElementById('region-europe').addEventListener('click', (e) => {
    const countryContainer = document.getElementById('country-container');
    countryContainer.innerHTML = '';

    const europeanCountries = countries.filter((country) => {
      filterRegion.innerText = 'Europe';
      return country.region === 'Europe';
    });
    displayCountries(europeanCountries);
    return;
  });

  //* Add event listener to Oceania Region List Item
  document.getElementById('region-oceania').addEventListener('click', (e) => {
    const countryContainer = document.getElementById('country-container');
    countryContainer.innerHTML = '';

    const europeanCountries = countries.filter((country) => {
      filterRegion.innerText = 'Oceania';
      return country.region === 'Oceania';
    });
    displayCountries(europeanCountries);
    return;
  });
}

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
  // console.log(country);
  const div = document.createElement('div');
  div.classList.add('col');
  div.innerHTML = `
      <div onclick = "loadCountryDetail('${country?.cca2}')" class="card h-100 shadow-sm border-0 rounded">
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
