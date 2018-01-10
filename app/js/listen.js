import { selectors } from './inc/_selectors.js'
import * as storage  from './storage.js'

const degrees = "celsius";


export const isInputPopulate = (request, render) => {
  let urlCity = isCityInUrl();
  if (urlCity) {
    selectors.input.value = urlCity; //inputValue
    request.searchWeather(urlCity, degrees, render.renderWeather);
  } 

  $('input.search').cityAutocomplete({ /* show_state: true, */ show_country: true});
  const autocomplete = document.querySelector("div.city-autocomplete");
  autocomplete.style.visibility = "inherit";

  autocomplete.addEventListener("click", (event) => {  
    let autocompleteCity = "";
      if(event.path[0].classList.contains("city") ) {
        autocompleteCity = event.target.innerText; //inputValue
      }else {
        autocompleteCity = event.path[0].firstChild.innerText; //inputValue
      }
      if(autocompleteCity.length == 0) { 
        console.log("you dont type city"); return;
      } else {
        populateCityToUrl(autocompleteCity);
        selectors.input.blur();
        request.searchWeather(autocompleteCity, degrees, render.renderWeather);
      }
    });

  selectors.input.addEventListener('keyup', (event) => {
    
    if (event.keyCode === 13) {
      autocomplete.style.visibility = "hidden";
      let inputCity = selectors.input.value; //inputValue
      if(inputCity.length == 0) { 
        console.log("you dont type city"); return;
      } else {
        populateCityToUrl(inputCity);
        selectors.input.blur();
        request.searchWeather(inputCity, degrees, render.renderWeather);
        }
      }
  });

 

  selectors.buttonAddToFavorites.addEventListener("click", (event) => {
    console.log(selectors.buttonAddToFavorites) 
    if(selectors.input.value){
      storage.addCityActivity(selectors.input.value, "add");
    }
  });
  
  selectors.buttonClearActivity.addEventListener("click", (event) => {
    storage.clearStorage();
  });

  selectors.input.addEventListener("click", (event) => { //if clicks input=>select text inside
    autocomplete.style.visibility = "inherit";
    selectors.input.focus();
    $(selectors.input).select();
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