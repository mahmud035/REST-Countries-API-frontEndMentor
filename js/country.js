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

const toggleSpinner = (displayValue) => {
  document.getElementById('spinner').style.display = displayValue;
};

// display spinner when page is loading
toggleSpinner('block');

//* get country object
const countryObjectString = sessionStorage.getItem('country');
const country = JSON.parse(countryObjectString);
// console.log(country);

function displayCountryDetails(country) {
  const countryContainer = document.getElementById('country-container');
  countryContainer.innerHTML = '';
  console.log(country);

  const countryDiv = document.createElement('div');
  countryDiv.classList.add('card', 'mb-3', 'border-0', 'bg-transparent');
  countryDiv.innerHTML = `
    <div class="row gx-5">
       <div class="col-sm-6">
          <img src="${country?.flags?.png}" class="img-fluid" alt="..." />
       </div>
       <div class="col-sm-6 d-flex flex-column justify-content-center">
            <h2 class="card-title fw-bold py-3">${country?.name?.common}
            </h2>
          <div class="row">
            <div class="col-12 col-md-6">
                 
                 <h6>Native Name: <span>${
                   country?.name?.nativeName?.eng?.common
                     ? country?.name?.nativeName?.eng?.common
                     : country?.name?.common
                 } </span> </h6>
                  <h6>Population: <span>${country?.population} </span> </h6>
                 <h6>Region: <span>${country?.region} </span> </h6>
                 <h6>Sub Region: <span>${country?.subregion} </span> </h6>
                 <h6>Capital: <span>${country?.capital?.[0]} </span> </h6>
            </div>
            <div class="col-12 col-md-6">
                <h6>Top Level Domain: <span>${country?.tld[0]} </span> </h6>
                <h6>Currencies: <span>${
                  country?.currencies?.EUR?.name
                } </span> </h6>
                <h6>Languages: <span>${country?.languages?.eng} </span> </h6>
            </div>
         </div>
          <div class="row py-4">
            <div class="col" id="border-countries-text">
              <h6>Border Countries:</h6>
            </div>
            <div id="borders" class="col-sm-7 borders">
             
            </div>
         </div>
      </div>
    </div>`;

  countryContainer.appendChild(countryDiv);
  getBorderCountries(country);
  // console.log(country);

  // hide spinner
  toggleSpinner('none');
}

displayCountryDetails(country); //* call displayCountryDetail() function

function getBorderCountries(country) {
  const borderCountriesContainer = document.getElementById('borders');
  const borderCountries = country.borders ? country.borders : [];
  console.log(country);

  if (borderCountries.length == 0) {
    document.getElementById('border-countries-text').style.display = 'none';
  } else {
    borderCountries.forEach((borderCountry) => {
      console.log(borderCountry);

      const borderElement = document.createElement('a');
      borderElement.classList.add(
        'border',
        'shadow-sm',
        'border-0',
        'fw-semibold',
        'border-element'
      );
      borderElement.innerText = borderCountry;

      borderCountriesContainer.appendChild(borderElement);
    });
  }
  console.log(borderCountries);
}

// getBorderCountries(country); //* call getBorderCountries() function

const allBorderElement = document.querySelectorAll('.border-element');
console.log(allBorderElement);

allBorderElement.forEach((borderElement) => {
  borderElement.addEventListener('click', () => {
    console.log(`${borderElement.innerText} clicked`);
    const countryCode = borderElement.innerText;
    loadCountryDetail(countryCode);
  });
});

console.log(country);

function loadCountryDetail(code) {
  // display spinner
  toggleSpinner('block');

  const url = `https://restcountries.com/v3.1/alpha/${code}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCountryDetails(data[0]));
}

//* use history api
document.getElementById('back-previous-page').addEventListener('click', () => {
  window.history.back();
});
