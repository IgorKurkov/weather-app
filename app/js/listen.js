import { selectors } from './inc/_selectors.js'

const degrees = "celsius";

export const isInputPopulate = (request, render, storage) => {
  let urlCity = isCityInUrl();
  if (urlCity) {
    request.searchWeather(urlCity, degrees, render.renderWeather);
    selectors.input.value = urlCity;
  } 

  selectors.input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      let inputCity = selectors.input.value;
      if(inputCity.length == 0) { 
        console.log("you dont type city"); return;
      } else {
        populateCityToUrl(inputCity);
        request.searchWeather(inputCity, degrees, render.renderWeather)
        }
      }
  });
}

const populateCityToUrl = (city) => {
  //https://stackoverflow.com/a/19279428/9026103
  if (history.pushState) { 
    var newurl = window.location.origin + window.location.pathname + "?="+ city;;
    window.history.pushState({ path:newurl }, '', newurl );
  } 
}

const isCityInUrl = () => {
  let cityFromUrl = decodeURI(location.search.substring(2))
  return (cityFromUrl.length > 0) ? cityFromUrl : null;
}