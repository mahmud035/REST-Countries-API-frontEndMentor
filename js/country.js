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

//* get country object
const countryObjectString = sessionStorage.getItem('country');
const country = JSON.parse(countryObjectString);
// console.log(country);

function displayCountryDetail() {
  const countryContainer = document.getElementById('country-container');

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
            <div class="col">
              <h6>Border Countries:</h6>
            </div>
            <div id="borders" class="col-sm-7 borders">
             
            </div>
         </div>
      </div>
    </div>`;

  countryContainer.appendChild(countryDiv);
  // console.log(country);
}

displayCountryDetail(); //* call displayCountryDetail() function

//* use history api
document.getElementById('back-previous-page').addEventListener('click', () => {
  window.history.back();
});

function getBorderCountries(country) {
  const borderCountriesContainer = document.getElementById('borders');
  const borderCountries = country.borders;
  console.log(country);

  borderCountries.forEach((borderCountry) => {
    console.log(borderCountry);

    const borderElement = document.createElement('a');
    borderElement.classList.add(
      'border',
      'shadow-sm',
      'border-0',
      'fw-semibold'
    );
    borderElement.innerText = borderCountry;

    borderCountriesContainer.appendChild(borderElement);
  });
  console.log(borderCountries);
}

getBorderCountries(country); //* call getBorderCountries() function

// function displayBorderCountries(country) {
//   console.log(country);
// }

// displayBorderCountries();
