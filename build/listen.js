'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInputPopulate = undefined;

var _selectors = require('./inc/_selectors.js');

var _storage = require('./storage.js');

var storage = _interopRequireWildcard(_storage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var degrees = "celsius";

var isInputPopulate = exports.isInputPopulate = function isInputPopulate(request, render) {
  var urlCity = isCityInUrl();
  if (urlCity) {
    _selectors.selectors.favoriteWrapper.style.display = "block";
    _selectors.selectors.mainBlock.style.display = "block";
    _selectors.selectors.input.value = urlCity; //inputValue
    request.searchWeather(urlCity, degrees, render.renderWeather);
  }

  //https://github.com/zhem4ag/jquery_cityAutocomplete
  $('input.search').cityAutocomplete({ /* show_state: true, */show_country: true });
  var autocomplete = document.querySelector("div.city-autocomplete");
  autocomplete.style.visibility = "inherit";

  autocomplete.addEventListener("click", function (event) {
    var autocompleteCity = "";
    if (event.path[0].classList.contains("city")) {
      autocompleteCity = event.target.innerText; //inputValue
    } else {
      autocompleteCity = event.path[0].firstChild.innerText; //inputValue
    }
    if (autocompleteCity.length == 0) {
      console.log("you dont type city");return;
    } else {
      _selectors.selectors.favoriteWrapper.style.display = "block";
      _selectors.selectors.mainBlock.style.display = "block";
      populateCityToUrl(autocompleteCity);
      _selectors.selectors.input.blur();
      request.searchWeather(autocompleteCity, degrees, render.renderWeather);
    }
  });

  _selectors.selectors.input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      _selectors.selectors.favoriteWrapper.style.display = "block";
      _selectors.selectors.mainBlock.style.display = "block";
      autocomplete.style.visibility = "hidden";
      var inputCity = _selectors.selectors.input.value; //inputValue
      if (inputCity.length == 0) {
        console.log("you dont type city");return;
      } else {
        populateCityToUrl(inputCity);
        _selectors.selectors.input.blur();
        request.searchWeather(inputCity, degrees, render.renderWeather);
      }
    }
  });

  _selectors.selectors.buttonAddToFavorites.addEventListener("click", function (event) {
    console.log(_selectors.selectors.buttonAddToFavorites);
    var city = _selectors.selectors.input.value;
    if (_selectors.selectors.input.value) {
      if (storage.isCityFavorite(city) == false) {
        storage.addCityActivity(city, "add");
        render.renderModalPopup("City " + _selectors.selectors.input.value + " saved!", "saved");
      } else {
        storage.addCityActivity(city, "remove");
        render.renderModalPopup("City " + _selectors.selectors.input.value + " deleted!", "deleted");
      }
    }
  });

  _selectors.selectors.buttonClearActivity.addEventListener("click", function (event) {
    storage.clearStorage();
  });

  _selectors.selectors.forecastBlock.addEventListener("click", function (event) {
    render.modifyTodayBlock(event);
  });

  _selectors.selectors.input.addEventListener("click", function (event) {
    //if clicks input=>select text inside
    autocomplete.style.visibility = "inherit";
    _selectors.selectors.input.focus();
    $(_selectors.selectors.input).select();
  });
};

var populateCityToUrl = function populateCityToUrl(city) {
  //https://stackoverflow.com/a/19279428/9026103
  if (history.pushState) {
    var newurl = window.location.origin + window.location.pathname + "?=" + city;;
    window.history.pushState({ path: newurl }, '', newurl);
  }
};

var isCityInUrl = function isCityInUrl() {
  var cityFromUrl = decodeURI(location.search.substring(2));
  return cityFromUrl.length > 0 ? cityFromUrl : null;
};