import anime from './node_modules/animejs/lib/anime.es.js';
import _ from './node_modules/underscore/underscore-esm.js';
document.querySelector('form').addEventListener('submit', event =>{
    event.preventDefault();
    const lang = document.querySelector('input').value;
    const url = `https://restcountries.com/v3.1/lang/${lang}`;
    getCountries(url);
})

async function getCountries(url){
    const response = await fetch(url);
    const countryArray = await response.json();
    sortCountries(countryArray);
}
function sortCountries(countryArray){
    const smallestFirst = _.sortBy(countryArray, function(con){return con.population});
    const biggestFirst = smallestFirst.reverse();
    console.log(biggestFirst);
    for(let i =0; i<3; i++){
        const countryName = document.createElement('h1');
        countryName.innerText = biggestFirst[i].name.common;
        const countryPopulation = document.createElement('h2');
        countryPopulation.innerText = biggestFirst[i].population;
        const countryContainer = document.createElement('div');
        countryContainer.append(countryName, countryPopulation);
        document.getElementById('divContainer').append(countryContainer);
    }
    anime({
        targets: 'h2',
        rotate: 360,
        duration: 3000
    })
}