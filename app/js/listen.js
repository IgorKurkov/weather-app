import { selectors } from './inc/_selectors.js'

export const isInputPopulate = (request, render) => {
  let city = isCityInUrl();
  if (city) {
    request.searchWeather(city, "celsius", render.renderWeather);
    selectors.input.value = city;
  } 
  else {
    selectors.input.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        if(selectors.input.value.length == 0) { 
          console.log("you dont type city"); return;
        } else {
          request.searchWeather(selectors.input.value, "celsius", render.renderWeather)

          }
      }
    });
  }
}

const isCityInUrl = () => {
  let cityFromUrl = decodeURI(location.search.substring(2))
  return (cityFromUrl.length > 0) ? cityFromUrl : null;
}