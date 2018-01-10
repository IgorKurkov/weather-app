import { selectors } from './inc/_selectors.js';
import * as storage from './storage.js';

const degrees = "celsius";

export const isInputPopulate = (request, render) => {
  let urlCity = isCityInUrl();
  if (urlCity) {
    selectors.favoriteWrapper.style.display = "block";
    selectors.mainBlock.style.display = "block";
    selectors.input.value = urlCity; //inputValue
    request.searchWeather(urlCity, degrees, render.renderWeather);
  }

  //https://github.com/zhem4ag/jquery_cityAutocomplete
  $('input.search').cityAutocomplete({ /* show_state: true, */show_country: true });
  const autocomplete = document.querySelector("div.city-autocomplete");
  autocomplete.style.visibility = "inherit";

  autocomplete.addEventListener("click", event => {
    let autocompleteCity = "";
    if (event.path[0].classList.contains("city")) {
      autocompleteCity = event.target.innerText; //inputValue
    } else {
      autocompleteCity = event.path[0].firstChild.innerText; //inputValue
    }
    if (autocompleteCity.length == 0) {
      console.log("you dont type city");return;
    } else {
      populateCityToUrl(autocompleteCity);
      selectors.input.blur();
      request.searchWeather(autocompleteCity, degrees, render.renderWeather);
    }
  });

  selectors.input.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
      selectors.favoriteWrapper.style.display = "block";
      selectors.mainBlock.style.display = "block";
      autocomplete.style.visibility = "hidden";
      let inputCity = selectors.input.value; //inputValue
      if (inputCity.length == 0) {
        console.log("you dont type city");return;
      } else {
        populateCityToUrl(inputCity);
        selectors.input.blur();
        request.searchWeather(inputCity, degrees, render.renderWeather);
      }
    }
  });

  selectors.buttonAddToFavorites.addEventListener("click", event => {
    console.log(selectors.buttonAddToFavorites);
    let city = selectors.input.value;
    if (selectors.input.value) {
      if (storage.isCityFavorite(city) == false) {
        storage.addCityActivity(city, "add");
        render.renderModalPopup("City " + selectors.input.value + " saved!", "saved");
      } else {
        storage.addCityActivity(city, "remove");
        render.renderModalPopup("City " + selectors.input.value + " deleted!", "deleted");
      }
    }
  });

  selectors.buttonClearActivity.addEventListener("click", event => {
    storage.clearStorage();
  });

  selectors.forecastBlock.addEventListener("click", event => {
    render.modifyTodayBlock(event);
  });

  selectors.input.addEventListener("click", event => {
    //if clicks input=>select text inside
    autocomplete.style.visibility = "inherit";
    selectors.input.focus();
    $(selectors.input).select();
  });
};

const populateCityToUrl = city => {
  //https://stackoverflow.com/a/19279428/9026103
  if (history.pushState) {
    var newurl = window.location.origin + window.location.pathname + "?=" + city;;
    window.history.pushState({ path: newurl }, '', newurl);
  }
};

const isCityInUrl = () => {
  let cityFromUrl = decodeURI(location.search.substring(2));
  return cityFromUrl.length > 0 ? cityFromUrl : null;
};
//# sourceMappingURL=listen.js.map
