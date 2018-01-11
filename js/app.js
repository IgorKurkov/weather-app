(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var selectors = require("./inc/_selectors.js").selectors;

var render = _interopRequireWildcard(require("./render.js"));

var request = _interopRequireWildcard(require("./request.js"));

var listen = _interopRequireWildcard(require("./listen.js"));

render.buildRecentCities();
listen.isInputPopulate(request, render); //init

window.onpopstate = function () {
  listen.isInputPopulate(request, render); //init
};

},{"./inc/_selectors.js":3,"./listen.js":4,"./render.js":5,"./request.js":6}],2:[function(require,module,exports){
// _lib.js module
//https://gist.github.com/Kepro/9ea2a918fd6f0a58b474

"use strict";

exports.getWeatherIcon = getWeatherIcon;
Object.defineProperty(exports, "__esModule", {
  value: true
});

function getWeatherIcon(weatherCode) {
  var icon = "";
  switch (weatherCode) {
    case "0":
      icon = "wi-tornado";
      break;
    case "1":
      icon = "wi-storm-showers";
      break;
    case "2":
      icon = "wi-tornado";
      break;
    case "3":
      icon = "wi-thunderstorm";
      break;
    case "4":
      icon = "wi-thunderstorm";
      break;
    case "5":
      icon = "wi-snow";
      break;
    case "6":
      icon = "wi-rain-mix";
      break;
    case "7":
      icon = "wi-rain-mix";
      break;
    case "8":
      icon = "wi-sprinkle";
      break;
    case "9":
      icon = "wi-sprinkle";
      break;
    case "10":
      icon = "wi-hail";
      break;
    case "11":
      icon = "wi-showers";
      break;
    case "12":
      icon = "wi-showers";
      break;
    case "13":
      icon = "wi-snow";
      break;
    case "14":
      icon = "wi-storm-showers";
      break;
    case "15":
      icon = "wi-snow";
      break;
    case "16":
      icon = "wi-snow";
      break;
    case "17":
      icon = "wi-hail";
      break;
    case "18":
      icon = "wi-hail";
      break;
    case "19":
      icon = "wi-cloudy-gusts";
      break;
    case "20":
      icon = "wi-fog";
      break;
    case "21":
      icon = "wi-fog";
      break;
    case "22":
      icon = "wi-fog";
      break;
    case "23":
      icon = "wi-cloudy-gusts";
      break;
    case "24":
      icon = "wi-cloudy-windy";
      break;
    case "25":
      icon = "wi-thermometer";
      break;
    case "26":
      icon = "wi-cloudy";
      break;
    case "27":
      icon = "wi-night-cloudy";
      break;
    case "28":
      icon = "wi-day-cloudy";
      break;
    case "29":
      icon = "wi-night-cloudy";
      break;
    case "30":
      icon = "wi-day-cloudy";
      break;
    case "31":
      icon = "wi-night-clear";
      break;
    case "32":
      icon = "wi-day-sunny";
      break;
    case "33":
      icon = "wi-night-clear";
      break;
    case "34":
      icon = "wi-day-sunny-overcast";
      break;
    case "35":
      icon = "wi-hail";
      break;
    case "36":
      icon = "wi-day-sunny";
      break;
    case "37":
      icon = "wi-thunderstorm";
      break;
    case "38":
      icon = "wi-thunderstorm";
      break;
    case "39":
      icon = "wi-thunderstorm";
      break;
    case "40":
      icon = "wi-storm-showers";
      break;
    case "41":
      icon = "wi-snow";
      break;
    case "42":
      icon = "wi-snow";
      break;
    case "43":
      icon = "wi-snow";
      break;
    case "44":
      icon = "wi-cloudy";
      break;
    case "45":
      icon = "wi-lightning";
      break;
    case "46":
      icon = "wi-snow";
      break;
    case "47":
      icon = "wi-thunderstorm";
      break;
    case "3200":
      icon = "wi-cloud";
      break;
    default:
      icon = "wi-cloud";
      break;
  }
  return "<i class=\"wi " + icon + "\"></i>";
}

;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var selectors = {
  input: document.querySelector("input.search"),
  mainBlock: document.querySelector(".main-block"),
  buttonAddToFavorites: document.querySelector(".add-to-favorites .fa"),
  mainCity: document.querySelector(".main-block-city"),
  mainTime: document.querySelector(".main-block-time"),
  mainIcon: document.querySelector(".main-block-icon"),
  mainTemp: document.querySelector(".main-block-temp"),
  mainInfo: document.querySelector(".main-block-info"),
  forecastBlock: document.querySelector(".forecast-days"),
  recentBlock: document.querySelector(".recent-cities"),
  favoriteWrapper: document.querySelector(".favorite-wrapper"),
  favoriteBlock: document.querySelector(".favorite-cities"),
  buttonClearActivity: document.querySelector(".clear-activity"),
  modalPopupBlock: document.querySelector(".modal") };
exports.selectors = selectors;

// leftControl: document.querySelector(".fa-caret-left"),
// rightControl: document.querySelector(".fa-caret-right"),

},{}],4:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var selectors = require("./inc/_selectors.js").selectors;

var storage = _interopRequireWildcard(require("./storage.js"));

var degrees = "celsius";

var isInputPopulate = function (request, render) {
  var urlCity = isCityInUrl();
  if (urlCity) {
    selectors.favoriteWrapper.style.display = "block";
    selectors.mainBlock.style.display = "block";
    selectors.input.value = urlCity; //inputValue
    request.searchWeather(urlCity, degrees, render.renderWeather);
  }

  //https://github.com/zhem4ag/jquery_cityAutocomplete
  $("input.search").cityAutocomplete({ /* show_state: true, */show_country: true });
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
      selectors.favoriteWrapper.style.display = "block";
      selectors.mainBlock.style.display = "block";
      populateCityToUrl(autocompleteCity);
      selectors.input.blur();
      request.searchWeather(autocompleteCity, degrees, render.renderWeather);
    }
  });

  selectors.input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      selectors.favoriteWrapper.style.display = "block";
      selectors.mainBlock.style.display = "block";
      autocomplete.style.visibility = "hidden";
      var inputCity = selectors.input.value; //inputValue
      if (inputCity.length == 0) {
        console.log("you dont type city");return;
      } else {
        populateCityToUrl(inputCity);
        selectors.input.blur();
        request.searchWeather(inputCity, degrees, render.renderWeather);
      }
    }
  });

  selectors.buttonAddToFavorites.addEventListener("click", function (event) {
    console.log(selectors.buttonAddToFavorites);
    var city = selectors.input.value;
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

  selectors.buttonClearActivity.addEventListener("click", function (event) {
    storage.clearStorage();
  });

  selectors.forecastBlock.addEventListener("click", function (event) {
    render.modifyTodayBlock(event);
  });

  selectors.input.addEventListener("click", function (event) {
    //if clicks input=>select text inside
    autocomplete.style.visibility = "inherit";
    selectors.input.focus();
    $(selectors.input).select();
  });
};

exports.isInputPopulate = isInputPopulate;
var populateCityToUrl = function (city) {
  //https://stackoverflow.com/a/19279428/9026103
  if (history.pushState) {
    var newurl = window.location.origin + window.location.pathname + "?=" + city;;
    window.history.pushState({ path: newurl }, "", newurl);
  }
};

var isCityInUrl = function () {
  var cityFromUrl = decodeURI(location.search.substring(2));
  return cityFromUrl.length > 0 ? cityFromUrl : null;
};

},{"./inc/_selectors.js":3,"./storage.js":7}],5:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var selectors = require("./inc/_selectors.js").selectors;

var getWeatherIcon = require("./inc/_lib.js").getWeatherIcon;

var storage = _interopRequireWildcard(require("./storage.js"));

var renderWeather = function (data, typedCity) {
  if (data.query.results === null) {
    renderModalPopup("This city is <br><br> not supported", "error");
  } else {
    storage.addCityActivity(typedCity);
    var weather = data.query.results.channel;
    var date = new Date(data.query.created);
    renderMainBlock(weather, date, typedCity);

    var forecast = weather.item.forecast;
    renderForecastDaysBlocks(forecast);
  }
};

exports.renderWeather = renderWeather;
var renderModalPopup = function (text, type) {
  selectors.modalPopupBlock.classList.add(type);
  selectors.modalPopupBlock.innerHTML = "<div class=\"message\">" + text + "</div>";
  selectors.modalPopupBlock.style.opacity = "1";
  selectors.modalPopupBlock.style.zIndex = "100";
  setTimeout(function () {
    selectors.modalPopupBlock.style.opacity = "0";
    selectors.modalPopupBlock.style.zIndex = "-100";
    selectors.modalPopupBlock.classList.remove(type);
    if (type == "error") {
      selectors.input.value = "";
      selectors.input.focus();
    }
  }, 800);
};

exports.renderModalPopup = renderModalPopup;
var buildDayBlock = function (obj) {
  var day = document.createElement("div");
  day.classList.add("forecast-days-item");
  day.innerHTML = "<span class=\"days-date\">" + obj.date.substring(0, 7) + "</span>\n                   <span class=\"days-icon\">" + getWeatherIcon(obj.code) + "</span>\n                   <span class=\"days-high\">" + obj.high + "&deg;</span>\n                   <span class=\"days-low\" >" + obj.low + "&deg;</span><br>\n                   <span class=\"days-text\">" + obj.text + "</span>";
  return day;
};

var renderForecastDaysBlocks = function (nextDays) {
  selectors.forecastBlock.innerHTML = "";
  nextDays.forEach(function (obj) {
    var day = buildDayBlock(obj);
    selectors.forecastBlock.appendChild(day);
  });
};

var convertToCelcius = function (F) {
  return 5 / 9 * (F - 32);
};
var checkIsCityInFavorites = function (typedCity) {
  // let city = storage.searchCity(typedCity);
  if (storage.isCityFavorite(typedCity)) {
    selectors.buttonAddToFavorites.className = "fa fa-heart";
  } else {
    selectors.buttonAddToFavorites.className = "fa fa-heart-o";
  }
};

exports.checkIsCityInFavorites = checkIsCityInFavorites;
var renderMainBlock = function (obj, date, typedCity) {
  checkIsCityInFavorites(typedCity);
  selectors.mainCity.innerHTML = obj.location.country + ", " + obj.location.region;
  selectors.mainTime.innerHTML = date.toLocaleString("ru-RU");
  selectors.mainIcon.innerHTML = getWeatherIcon(obj.item.condition.code);
  selectors.mainTemp.innerHTML = obj.item.condition.temp + "&deg;";
  selectors.mainInfo.innerHTML = "<span class=\"condition\">" + obj.item.condition.text + "</span> <br> \n      <span class=\"addition\">\n        Fill: " + Math.ceil(convertToCelcius(obj.wind.chill)) + " C&deg;<br>\n        Hudimity: " + obj.atmosphere.humidity + "%\n      </span>";
};

var setAnimationAppearing = function (el, delay) {
  el.style.animation = "appearing ." + delay + "s ease-out";
  setTimeout(function () {
    el.style.animation = "none";
  }, delay);
};

var modifyTodayBlock = function (event) {
  var el = event.path.find(function (el) {
    return el.classList.contains("forecast-days-item");
  });
  var now = new Date();
  var date = new Date(el.querySelector(".days-date").innerText + " " + now.getFullYear());
  selectors.mainTime.innerHTML = date.toLocaleDateString("ru-RU");
  setAnimationAppearing(selectors.mainTime, 400);
  selectors.mainIcon.firstChild.className = el.querySelector(".days-icon").firstChild.className;
  setAnimationAppearing(selectors.mainIcon.firstChild, 400);
  selectors.mainTemp.innerHTML = el.querySelector(".days-high").innerText;
  setAnimationAppearing(selectors.mainTemp, 400);
  selectors.mainInfo.querySelector(".condition").innerHTML = el.querySelector(".days-text").innerText;
  setAnimationAppearing(selectors.mainInfo, 400);
  selectors.mainInfo.querySelector(".addition").innerHTML = "";
};

exports.modifyTodayBlock = modifyTodayBlock;
var cities = storage.citiesInStorage.list;

var buildRecentCities = function () {
  selectors.recentBlock.innerHTML = "";
  if (cities.length) {
    cities.forEach(function (city) {
      selectors.recentBlock.innerHTML += "<a href=\"?=" + city.name + "\" class=\"recent\">\n              " + city.name + "<sup>(" + city.searchTimes + ")</sup>\n          </a>";
    });
  }
};

exports.buildRecentCities = buildRecentCities;
var buildFavoriteCities = function () {
  selectors.favoriteBlock.innerHTML = "";
  if (cities.length) {
    cities.filter(function (obj) {
      return obj.favorite == true;
    }).forEach(function (city) {
      selectors.favoriteBlock.innerHTML += "<a href=\"?=" + city.name + "\" class=\"favorite\">\n                " + city.name + "<sup>(" + city.searchTimes + ")</sup>\n            </a>";
    });
  }
};

var renderCities = function () {
  buildRecentCities();
  buildFavoriteCities();
};
exports.renderCities = renderCities;

},{"./inc/_lib.js":2,"./inc/_selectors.js":3,"./storage.js":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//request
var buildRequestUrl = function (city, deg) {
  var url = "https://query.yahooapis.com/v1/public/yql?q=",
      query = "select * from weather.forecast where woeid in ",
      getCityWoeid = "(select woeid from geo.places(1) where text=\"" + city + "\")",
      setDegree = deg === "celsius" ? " and u=\"c\"" : deg === "fahrenheit" ? " and u=\"f\"" : " and u=\"c\"",
      format = "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  return url + query + getCityWoeid + setDegree + format;
};

var searchWeather = function (typedCity, deg, callback) {
  fetch(buildRequestUrl(typedCity, deg)).then(function (r) {
    if (r.ok) return r.json();
    throw new Error("Network response was not ok.");
  }).then(function (data) {
    console.log(data);
    callback(data, typedCity);
  });
  // .catch(function(error) {
  //   console.log('There has been a problem with your fetch operation: ' + error.message);
  // });
};
exports.searchWeather = searchWeather;

},{}],7:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var selectors = require("./inc/_selectors.js").selectors;

var render = _interopRequireWildcard(require("./render.js"));

//view cities in recent and in favorite blocks

//build button - add to favorites
//button clear recent
//button clear favorites

var getCitiesFromStorage = function (storageName) {
  var cities = {};
  if (localStorage.getItem(storageName)) {
    cities = JSON.parse(localStorage.getItem(storageName));
  } else {
    cities.list = [];
    localStorage.setItem(storageName, JSON.stringify(cities));
  }
  return cities;
};

var storageName = "citiesInStorage";
var citiesInStorage = getCitiesFromStorage(storageName);

exports.citiesInStorage = citiesInStorage;

var City = function City(cityName) {
  _classCallCheck(this, City);

  this.name = cityName;
  this.searchTimes = 1;
  this.favorite = false;
};

//operations with cities
var searchCity = function (city) {
  return citiesInStorage.list.find(function (obj) {
    return obj.name === city;
  });
};
exports.searchCity = searchCity;
var isCityFavorite = function (city) {
  var obj = searchCity(city);
  return obj ? obj.favorite == true : false;
};

exports.isCityFavorite = isCityFavorite;
var updateCity = function (alreadyExistCity, isFavorite) {
  if (!isFavorite) {
    alreadyExistCity.searchTimes++;
  } else {
    switch (isFavorite) {
      case "add":
        isFavorite = true;break;
      case "remove":
        isFavorite = false;break;
      default:
        isFavorite = false;break;
    }
    alreadyExistCity.favorite = isFavorite;
  }
  localStorage.setItem(storageName, JSON.stringify(citiesInStorage));
};
var addCity = function (city) {
  citiesInStorage.list.push(new City(city));
  localStorage.setItem(storageName, JSON.stringify(citiesInStorage));
};

var addCityActivity = function (city, isFavorite) {
  var alreadyExistCity = searchCity(city);
  alreadyExistCity ? updateCity(alreadyExistCity, isFavorite) : addCity(city);
  render.checkIsCityInFavorites(city);
  render.renderCities();
};

exports.addCityActivity = addCityActivity;
var clearStorage = function () {
  localStorage.removeItem(storageName);
  window.location = window.location.pathname;
};
exports.clearStorage = clearStorage;

},{"./inc/_selectors.js":3,"./render.js":5}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiRzovRlJPTlRFTkQvUHJvamVjdHMvR2l0aHViL1JlYWwgcHJvamVjdHMvd2VhdGhlci1hcHAtY29weS9hcHAvanMvYXBwLmpzIiwiRzovRlJPTlRFTkQvUHJvamVjdHMvR2l0aHViL1JlYWwgcHJvamVjdHMvd2VhdGhlci1hcHAtY29weS9hcHAvanMvaW5jL19saWIuanMiLCJHOi9GUk9OVEVORC9Qcm9qZWN0cy9HaXRodWIvUmVhbCBwcm9qZWN0cy93ZWF0aGVyLWFwcC1jb3B5L2FwcC9qcy9pbmMvX3NlbGVjdG9ycy5qcyIsIkc6L0ZST05URU5EL1Byb2plY3RzL0dpdGh1Yi9SZWFsIHByb2plY3RzL3dlYXRoZXItYXBwLWNvcHkvYXBwL2pzL2xpc3Rlbi5qcyIsIkc6L0ZST05URU5EL1Byb2plY3RzL0dpdGh1Yi9SZWFsIHByb2plY3RzL3dlYXRoZXItYXBwLWNvcHkvYXBwL2pzL3JlbmRlci5qcyIsIkc6L0ZST05URU5EL1Byb2plY3RzL0dpdGh1Yi9SZWFsIHByb2plY3RzL3dlYXRoZXItYXBwLWNvcHkvYXBwL2pzL3JlcXVlc3QuanMiLCJHOi9GUk9OVEVORC9Qcm9qZWN0cy9HaXRodWIvUmVhbCBwcm9qZWN0cy93ZWF0aGVyLWFwcC1jb3B5L2FwcC9qcy9zdG9yYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztJQ0FTLFNBQVMsV0FBUSxxQkFBcUIsRUFBdEMsU0FBUzs7SUFDTixNQUFNLG1DQUFPLGFBQWE7O0lBQzFCLE9BQU8sbUNBQU0sY0FBYzs7SUFDM0IsTUFBTSxtQ0FBTyxhQUFhOztBQU10QyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztBQUMzQixNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFeEMsTUFBTSxDQUFDLFVBQVUsR0FBRyxZQUFXO0FB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QUFBO0FBQ0QsSUFBTSxPQUFPLEdBQUcsVUFBQyxJQUFJLEVBQUs7QUFDeEIsaUJBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDMUMsY0FBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBRSxlQUFlLENBQUUsQ0FBQyxDQUFDO0NBQ3RFLENBQUE7O0FBRU0sSUFBTSxlQUFlLEdBQUcsVUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFLO0FBQ25ELE1BQUksZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hDLEFBQUMsa0JBQWdCLEdBQUksVUFBVSxDQUFDLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5RSxRQUFNLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEMsUUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO0NBQ3ZCLENBQUE7O1FBTFksZUFBZSxHQUFmLGVBQWU7QUFPckIsSUFBTSxZQUFZLEdBQUcsWUFBTTtBQUNoQyxjQUFZLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JDLFFBQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7Q0FDNUMsQ0FBQTtRQUhZLFlBQVksR0FBWixZQUFZIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IHNlbGVjdG9ycyB9IGZyb20gJy4vaW5jL19zZWxlY3RvcnMuanMnXHJcbmltcG9ydCAqIGFzIHJlbmRlciAgZnJvbSAnLi9yZW5kZXIuanMnXHJcbmltcG9ydCAqIGFzIHJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0LmpzJ1xyXG5pbXBvcnQgKiBhcyBsaXN0ZW4gIGZyb20gJy4vbGlzdGVuLmpzJ1xyXG5cclxuXHJcblxyXG5cclxuXHJcbnJlbmRlci5idWlsZFJlY2VudENpdGllcygpO1xyXG5saXN0ZW4uaXNJbnB1dFBvcHVsYXRlKHJlcXVlc3QsIHJlbmRlcik7IC8vaW5pdFxyXG5cclxud2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbigpIHtcclxuICBsaXN0ZW4uaXNJbnB1dFBvcHVsYXRlKHJlcXVlc3QsIHJlbmRlcik7IC8vaW5pdFxyXG59XHJcblxyXG5cclxuXHJcbiIsIi8vIF9saWIuanMgbW9kdWxlXHJcbi8vaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vS2Vwcm8vOWVhMmE5MThmZDZmMGE1OGI0NzRcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWF0aGVySWNvbih3ZWF0aGVyQ29kZSkge1xyXG4gIGxldCBpY29uID0gJyc7XHJcbiAgc3dpdGNoKHdlYXRoZXJDb2RlKSB7XHJcbiAgICBjYXNlICcwJzogaWNvbiAgPSAnd2ktdG9ybmFkbyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnMSc6IGljb24gPSAnd2ktc3Rvcm0tc2hvd2Vycyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnMic6IGljb24gPSAnd2ktdG9ybmFkbyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnMyc6IGljb24gPSAnd2ktdGh1bmRlcnN0b3JtJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICc0JzogaWNvbiA9ICd3aS10aHVuZGVyc3Rvcm0nO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJzUnOiBpY29uID0gJ3dpLXNub3cnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJzYnOiBpY29uID0gJ3dpLXJhaW4tbWl4JztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICc3JzogaWNvbiA9ICd3aS1yYWluLW1peCc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnOCc6IGljb24gPSAnd2ktc3ByaW5rbGUnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJzknOiBpY29uID0gJ3dpLXNwcmlua2xlJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICcxMCc6IGljb24gPSAnd2ktaGFpbCc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnMTEnOiBpY29uID0gJ3dpLXNob3dlcnMnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJzEyJzogaWNvbiA9ICd3aS1zaG93ZXJzJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICcxMyc6IGljb24gPSAnd2ktc25vdyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnMTQnOiBpY29uID0gJ3dpLXN0b3JtLXNob3dlcnMnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJzE1JzogaWNvbiA9ICd3aS1zbm93JztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICcxNic6IGljb24gPSAnd2ktc25vdyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnMTcnOiBpY29uID0gJ3dpLWhhaWwnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJzE4JzogaWNvbiA9ICd3aS1oYWlsJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICcxOSc6IGljb24gPSAnd2ktY2xvdWR5LWd1c3RzJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICcyMCc6IGljb24gPSAnd2ktZm9nJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICcyMSc6IGljb24gPSAnd2ktZm9nJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICcyMic6IGljb24gPSAnd2ktZm9nJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICcyMyc6IGljb24gPSAnd2ktY2xvdWR5LWd1c3RzJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICcyNCc6IGljb24gPSAnd2ktY2xvdWR5LXdpbmR5JztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICcyNSc6IGljb24gPSAnd2ktdGhlcm1vbWV0ZXInO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJzI2JzogaWNvbiA9ICd3aS1jbG91ZHknO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJzI3JzogaWNvbiA9ICd3aS1uaWdodC1jbG91ZHknO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJzI4JzogaWNvbiA9ICd3aS1kYXktY2xvdWR5JztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICcyOSc6IGljb24gPSAnd2ktbmlnaHQtY2xvdWR5JztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICczMCc6IGljb24gPSAnd2ktZGF5LWNsb3VkeSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnMzEnOiBpY29uID0gJ3dpLW5pZ2h0LWNsZWFyJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICczMic6IGljb24gPSAnd2ktZGF5LXN1bm55JztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICczMyc6IGljb24gPSAnd2ktbmlnaHQtY2xlYXInO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJzM0JzogaWNvbiA9ICd3aS1kYXktc3Vubnktb3ZlcmNhc3QnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJzM1JzogaWNvbiA9ICd3aS1oYWlsJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICczNic6IGljb24gPSAnd2ktZGF5LXN1bm55JztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICczNyc6IGljb24gPSAnd2ktdGh1bmRlcnN0b3JtJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICczOCc6IGljb24gPSAnd2ktdGh1bmRlcnN0b3JtJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICczOSc6IGljb24gPSAnd2ktdGh1bmRlcnN0b3JtJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICc0MCc6IGljb24gPSAnd2ktc3Rvcm0tc2hvd2Vycyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnNDEnOiBpY29uID0gJ3dpLXNub3cnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJzQyJzogaWNvbiA9ICd3aS1zbm93JztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICc0Myc6IGljb24gPSAnd2ktc25vdyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnNDQnOiBpY29uID0gJ3dpLWNsb3VkeSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnNDUnOiBpY29uID0gJ3dpLWxpZ2h0bmluZyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnNDYnOiBpY29uID0gJ3dpLXNub3cnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJzQ3JzogaWNvbiA9ICd3aS10aHVuZGVyc3Rvcm0nO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJzMyMDAnOiBpY29uID0gJ3dpLWNsb3VkJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OiBpY29uID0gJ3dpLWNsb3VkJztcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG4gIHJldHVybiAnPGkgY2xhc3M9XCJ3aSAnKyBpY29uICsnXCI+PC9pPic7XHJcbn07IiwiIGV4cG9ydCBjb25zdCBzZWxlY3RvcnMgPSB7XHJcbiAgaW5wdXQ6ICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dC5zZWFyY2hcIiksXHJcbiAgbWFpbkJsb2NrOiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1ibG9ja1wiKSxcclxuICBidXR0b25BZGRUb0Zhdm9yaXRlczogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdG8tZmF2b3JpdGVzIC5mYVwiKSxcclxuICBtYWluQ2l0eTogICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWJsb2NrLWNpdHlcIiksXHJcbiAgbWFpblRpbWU6ICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1ibG9jay10aW1lXCIpLFxyXG4gIG1haW5JY29uOiAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tYmxvY2staWNvblwiKSxcclxuICBtYWluVGVtcDogICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWJsb2NrLXRlbXBcIiksXHJcbiAgbWFpbkluZm86ICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1ibG9jay1pbmZvXCIpLFxyXG4gIGZvcmVjYXN0QmxvY2s6ICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcmVjYXN0LWRheXNcIiksXHJcbiAgcmVjZW50QmxvY2s6ICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVjZW50LWNpdGllc1wiKSxcclxuICBmYXZvcml0ZVdyYXBwZXI6ICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYXZvcml0ZS13cmFwcGVyXCIpLFxyXG4gIGZhdm9yaXRlQmxvY2s6ICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhdm9yaXRlLWNpdGllc1wiKSxcclxuICBidXR0b25DbGVhckFjdGl2aXR5OiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbGVhci1hY3Rpdml0eVwiKSxcclxuICBtb2RhbFBvcHVwQmxvY2s6ICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbFwiKSxcclxuICBcclxuICAvLyBsZWZ0Q29udHJvbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYS1jYXJldC1sZWZ0XCIpLFxyXG4gIC8vIHJpZ2h0Q29udHJvbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYS1jYXJldC1yaWdodFwiKSxcclxuXHJcbn0iLCJpbXBvcnQgeyBzZWxlY3RvcnMgfSBmcm9tICcuL2luYy9fc2VsZWN0b3JzLmpzJ1xyXG5pbXBvcnQgKiBhcyBzdG9yYWdlICBmcm9tICcuL3N0b3JhZ2UuanMnXHJcblxyXG5jb25zdCBkZWdyZWVzID0gXCJjZWxzaXVzXCI7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGlzSW5wdXRQb3B1bGF0ZSA9IChyZXF1ZXN0LCByZW5kZXIpID0+IHtcclxuICBsZXQgdXJsQ2l0eSA9IGlzQ2l0eUluVXJsKCk7XHJcbiAgaWYgKHVybENpdHkpIHtcclxuICAgIHNlbGVjdG9ycy5mYXZvcml0ZVdyYXBwZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgIHNlbGVjdG9ycy5tYWluQmxvY2suc3R5bGUuZGlzcGxheSAgICAgICA9IFwiYmxvY2tcIjtcclxuICAgIHNlbGVjdG9ycy5pbnB1dC52YWx1ZSA9IHVybENpdHk7IC8vaW5wdXRWYWx1ZVxyXG4gICAgcmVxdWVzdC5zZWFyY2hXZWF0aGVyKHVybENpdHksIGRlZ3JlZXMsIHJlbmRlci5yZW5kZXJXZWF0aGVyKTtcclxuICB9IFxyXG5cclxuICAvL2h0dHBzOi8vZ2l0aHViLmNvbS96aGVtNGFnL2pxdWVyeV9jaXR5QXV0b2NvbXBsZXRlXHJcbiAgJCgnaW5wdXQuc2VhcmNoJykuY2l0eUF1dG9jb21wbGV0ZSh7IC8qIHNob3dfc3RhdGU6IHRydWUsICovIHNob3dfY291bnRyeTogdHJ1ZX0pO1xyXG4gIGNvbnN0IGF1dG9jb21wbGV0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkaXYuY2l0eS1hdXRvY29tcGxldGVcIik7XHJcbiAgYXV0b2NvbXBsZXRlLnN0eWxlLnZpc2liaWxpdHkgPSBcImluaGVyaXRcIjtcclxuXHJcbiAgYXV0b2NvbXBsZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHsgIFxyXG4gICAgbGV0IGF1dG9jb21wbGV0ZUNpdHkgPSBcIlwiO1xyXG4gICAgICBpZihldmVudC5wYXRoWzBdLmNsYXNzTGlzdC5jb250YWlucyhcImNpdHlcIikgKSB7XHJcbiAgICAgICAgYXV0b2NvbXBsZXRlQ2l0eSA9IGV2ZW50LnRhcmdldC5pbm5lclRleHQ7IC8vaW5wdXRWYWx1ZVxyXG4gICAgICB9ZWxzZSB7XHJcbiAgICAgICAgYXV0b2NvbXBsZXRlQ2l0eSA9IGV2ZW50LnBhdGhbMF0uZmlyc3RDaGlsZC5pbm5lclRleHQ7IC8vaW5wdXRWYWx1ZVxyXG4gICAgICB9XHJcbiAgICAgIGlmKGF1dG9jb21wbGV0ZUNpdHkubGVuZ3RoID09IDApIHsgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgZG9udCB0eXBlIGNpdHlcIik7IHJldHVybjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWxlY3RvcnMuZmF2b3JpdGVXcmFwcGVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgc2VsZWN0b3JzLm1haW5CbG9jay5zdHlsZS5kaXNwbGF5ICAgICAgID0gXCJibG9ja1wiO1xyXG4gICAgICAgIHBvcHVsYXRlQ2l0eVRvVXJsKGF1dG9jb21wbGV0ZUNpdHkpO1xyXG4gICAgICAgIHNlbGVjdG9ycy5pbnB1dC5ibHVyKCk7XHJcbiAgICAgICAgcmVxdWVzdC5zZWFyY2hXZWF0aGVyKGF1dG9jb21wbGV0ZUNpdHksIGRlZ3JlZXMsIHJlbmRlci5yZW5kZXJXZWF0aGVyKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICBzZWxlY3RvcnMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXZlbnQpID0+IHtcclxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICBzZWxlY3RvcnMuZmF2b3JpdGVXcmFwcGVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgIHNlbGVjdG9ycy5tYWluQmxvY2suc3R5bGUuZGlzcGxheSAgICAgICA9IFwiYmxvY2tcIjtcclxuICAgICAgYXV0b2NvbXBsZXRlLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgICBsZXQgaW5wdXRDaXR5ID0gc2VsZWN0b3JzLmlucHV0LnZhbHVlOyAvL2lucHV0VmFsdWVcclxuICAgICAgaWYoaW5wdXRDaXR5Lmxlbmd0aCA9PSAwKSB7IFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieW91IGRvbnQgdHlwZSBjaXR5XCIpOyByZXR1cm47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcG9wdWxhdGVDaXR5VG9VcmwoaW5wdXRDaXR5KTtcclxuICAgICAgICBzZWxlY3RvcnMuaW5wdXQuYmx1cigpO1xyXG4gICAgICAgIHJlcXVlc3Quc2VhcmNoV2VhdGhlcihpbnB1dENpdHksIGRlZ3JlZXMsIHJlbmRlci5yZW5kZXJXZWF0aGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICB9KTtcclxuXHJcbiBcclxuXHJcbiAgc2VsZWN0b3JzLmJ1dHRvbkFkZFRvRmF2b3JpdGVzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKHNlbGVjdG9ycy5idXR0b25BZGRUb0Zhdm9yaXRlcykgXHJcbiAgICBsZXQgY2l0eSA9IHNlbGVjdG9ycy5pbnB1dC52YWx1ZTtcclxuICAgIGlmKHNlbGVjdG9ycy5pbnB1dC52YWx1ZSl7ICAgIFxyXG4gICAgICBpZiAoc3RvcmFnZS5pc0NpdHlGYXZvcml0ZShjaXR5KSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHN0b3JhZ2UuYWRkQ2l0eUFjdGl2aXR5KGNpdHksIFwiYWRkXCIpO1xyXG4gICAgICAgIHJlbmRlci5yZW5kZXJNb2RhbFBvcHVwKFwiQ2l0eSBcIitzZWxlY3RvcnMuaW5wdXQudmFsdWUrXCIgc2F2ZWQhXCIsIFwic2F2ZWRcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3RvcmFnZS5hZGRDaXR5QWN0aXZpdHkoY2l0eSwgXCJyZW1vdmVcIik7XHJcbiAgICAgICAgcmVuZGVyLnJlbmRlck1vZGFsUG9wdXAoXCJDaXR5IFwiK3NlbGVjdG9ycy5pbnB1dC52YWx1ZStcIiBkZWxldGVkIVwiLCBcImRlbGV0ZWRcIik7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIFxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIFxyXG4gIHNlbGVjdG9ycy5idXR0b25DbGVhckFjdGl2aXR5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgIHN0b3JhZ2UuY2xlYXJTdG9yYWdlKCk7XHJcbiAgfSk7XHJcblxyXG4gIHNlbGVjdG9ycy5mb3JlY2FzdEJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgIHJlbmRlci5tb2RpZnlUb2RheUJsb2NrKGV2ZW50KTtcclxuICB9KTtcclxuXHJcbiAgc2VsZWN0b3JzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHsgLy9pZiBjbGlja3MgaW5wdXQ9PnNlbGVjdCB0ZXh0IGluc2lkZVxyXG4gICAgYXV0b2NvbXBsZXRlLnN0eWxlLnZpc2liaWxpdHkgPSBcImluaGVyaXRcIjtcclxuICAgIHNlbGVjdG9ycy5pbnB1dC5mb2N1cygpO1xyXG4gICAgJChzZWxlY3RvcnMuaW5wdXQpLnNlbGVjdCgpO1xyXG4gIH0pO1xyXG5cclxufVxyXG5cclxuXHJcbmNvbnN0IHBvcHVsYXRlQ2l0eVRvVXJsID0gKGNpdHkpID0+IHtcclxuICAvL2h0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xOTI3OTQyOC85MDI2MTAzXHJcbiAgaWYgKGhpc3RvcnkucHVzaFN0YXRlKSB7IFxyXG4gICAgdmFyIG5ld3VybCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyBcIj89XCIrIGNpdHk7O1xyXG4gICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHsgcGF0aDpuZXd1cmwgfSwgJycsIG5ld3VybCApO1xyXG4gIH0gXHJcbn1cclxuXHJcbmNvbnN0IGlzQ2l0eUluVXJsID0gKCkgPT4ge1xyXG4gIGxldCBjaXR5RnJvbVVybCA9IGRlY29kZVVSSShsb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDIpKVxyXG4gIHJldHVybiAoY2l0eUZyb21VcmwubGVuZ3RoID4gMCkgPyBjaXR5RnJvbVVybCA6IG51bGw7XHJcbn0iLCJpbXBvcnQgeyBzZWxlY3RvcnMgfSBmcm9tICcuL2luYy9fc2VsZWN0b3JzLmpzJ1xyXG5pbXBvcnQgeyBnZXRXZWF0aGVySWNvbiB9IGZyb20gJy4vaW5jL19saWIuanMnXHJcbmltcG9ydCAqIGFzIHN0b3JhZ2UgIGZyb20gJy4vc3RvcmFnZS5qcydcclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJXZWF0aGVyID0gKGRhdGEsIHR5cGVkQ2l0eSkgPT4ge1xyXG4gIGlmKGRhdGEucXVlcnkucmVzdWx0cyA9PT0gbnVsbCl7IFxyXG4gICAgcmVuZGVyTW9kYWxQb3B1cChcIlRoaXMgY2l0eSBpcyA8YnI+PGJyPiBub3Qgc3VwcG9ydGVkXCIsIFwiZXJyb3JcIik7XHJcbiAgICBcclxuICB9IFxyXG4gIGVsc2Uge1xyXG4gICAgc3RvcmFnZS5hZGRDaXR5QWN0aXZpdHkodHlwZWRDaXR5KTtcclxuICAgIGxldCB3ZWF0aGVyID0gZGF0YS5xdWVyeS5yZXN1bHRzLmNoYW5uZWw7XHJcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGRhdGEucXVlcnkuY3JlYXRlZCk7XHJcbiAgICByZW5kZXJNYWluQmxvY2sod2VhdGhlciwgZGF0ZSwgdHlwZWRDaXR5KTtcclxuXHJcbiAgICBsZXQgZm9yZWNhc3QgPSB3ZWF0aGVyLml0ZW0uZm9yZWNhc3Q7XHJcbiAgICByZW5kZXJGb3JlY2FzdERheXNCbG9ja3MoZm9yZWNhc3QpOyBcclxuICB9IFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyTW9kYWxQb3B1cCA9ICh0ZXh0LCB0eXBlKSA9PiB7XHJcbiAgc2VsZWN0b3JzLm1vZGFsUG9wdXBCbG9jay5jbGFzc0xpc3QuYWRkKHR5cGUpO1xyXG4gIHNlbGVjdG9ycy5tb2RhbFBvcHVwQmxvY2suaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJtZXNzYWdlXCI+JHt0ZXh0fTwvZGl2PmA7XHJcbiAgc2VsZWN0b3JzLm1vZGFsUG9wdXBCbG9jay5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgc2VsZWN0b3JzLm1vZGFsUG9wdXBCbG9jay5zdHlsZS56SW5kZXggPSBcIjEwMFwiO1xyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgc2VsZWN0b3JzLm1vZGFsUG9wdXBCbG9jay5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcbiAgICBzZWxlY3RvcnMubW9kYWxQb3B1cEJsb2NrLnN0eWxlLnpJbmRleCA9IFwiLTEwMFwiO1xyXG4gICAgc2VsZWN0b3JzLm1vZGFsUG9wdXBCbG9jay5jbGFzc0xpc3QucmVtb3ZlKHR5cGUpO1xyXG4gICAgaWYgKHR5cGUgPT0gXCJlcnJvclwiKXtcclxuICAgICAgc2VsZWN0b3JzLmlucHV0LnZhbHVlID0gXCJcIjtcclxuICAgICAgc2VsZWN0b3JzLmlucHV0LmZvY3VzKClcclxuICAgIH1cclxuICB9LCA4MDApXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmNvbnN0IGJ1aWxkRGF5QmxvY2sgPSAob2JqKSA9PiB7XHJcbiAgbGV0IGRheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZGF5LmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdC1kYXlzLWl0ZW1cIik7XHJcbiAgZGF5LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImRheXMtZGF0ZVwiPiR7b2JqLmRhdGUuc3Vic3RyaW5nKDAsNyl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXlzLWljb25cIj4ke2dldFdlYXRoZXJJY29uKG9iai5jb2RlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheXMtaGlnaFwiPiR7b2JqLmhpZ2h9JmRlZzs8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheXMtbG93XCIgPiR7b2JqLmxvd30mZGVnOzwvc3Bhbj48YnI+XHJcbiAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheXMtdGV4dFwiPiR7b2JqLnRleHR9PC9zcGFuPmA7XHJcbiAgcmV0dXJuIGRheTtcclxufVxyXG5cclxuY29uc3QgcmVuZGVyRm9yZWNhc3REYXlzQmxvY2tzID0gKG5leHREYXlzKSA9PiB7XHJcbiAgc2VsZWN0b3JzLmZvcmVjYXN0QmxvY2suaW5uZXJIVE1MID0gXCJcIjtcclxuICBuZXh0RGF5cy5mb3JFYWNoKChvYmopID0+IHsgIFxyXG4gICAgbGV0IGRheSA9IGJ1aWxkRGF5QmxvY2sob2JqKTtcclxuICAgIHNlbGVjdG9ycy5mb3JlY2FzdEJsb2NrLmFwcGVuZENoaWxkKGRheSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IGNvbnZlcnRUb0NlbGNpdXMgPSAoRikgPT4ge1xyXG4gIHJldHVybiAoNS85KSAqIChGIC0gMzIpO1xyXG59XHJcbmV4cG9ydCBjb25zdCBjaGVja0lzQ2l0eUluRmF2b3JpdGVzID0gKHR5cGVkQ2l0eSkgPT4ge1xyXG4gIC8vIGxldCBjaXR5ID0gc3RvcmFnZS5zZWFyY2hDaXR5KHR5cGVkQ2l0eSk7XHJcbiAgaWYoc3RvcmFnZS5pc0NpdHlGYXZvcml0ZSh0eXBlZENpdHkpKSB7IFxyXG4gICAgc2VsZWN0b3JzLmJ1dHRvbkFkZFRvRmF2b3JpdGVzLmNsYXNzTmFtZSA9IFwiZmEgZmEtaGVhcnRcIjtcclxuICB9IGVsc2Uge1xyXG4gICAgc2VsZWN0b3JzLmJ1dHRvbkFkZFRvRmF2b3JpdGVzLmNsYXNzTmFtZSA9IFwiZmEgZmEtaGVhcnQtb1wiO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgcmVuZGVyTWFpbkJsb2NrID0gKG9iaiwgZGF0ZSwgdHlwZWRDaXR5KSA9PiB7XHJcbiAgY2hlY2tJc0NpdHlJbkZhdm9yaXRlcyh0eXBlZENpdHkpO1xyXG4gIHNlbGVjdG9ycy5tYWluQ2l0eS5pbm5lckhUTUwgPSBvYmoubG9jYXRpb24uY291bnRyeSArXCIsIFwiKyBvYmoubG9jYXRpb24ucmVnaW9uO1xyXG4gIHNlbGVjdG9ycy5tYWluVGltZS5pbm5lckhUTUwgPSBkYXRlLnRvTG9jYWxlU3RyaW5nKCdydS1SVScpO1xyXG4gIHNlbGVjdG9ycy5tYWluSWNvbi5pbm5lckhUTUwgPSBnZXRXZWF0aGVySWNvbihvYmouaXRlbS5jb25kaXRpb24uY29kZSk7XHJcbiAgc2VsZWN0b3JzLm1haW5UZW1wLmlubmVySFRNTCA9IG9iai5pdGVtLmNvbmRpdGlvbi50ZW1wICsgXCImZGVnO1wiO1xyXG4gIHNlbGVjdG9ycy5tYWluSW5mby5pbm5lckhUTUwgPSBcclxuICAgICBgPHNwYW4gY2xhc3M9XCJjb25kaXRpb25cIj4ke29iai5pdGVtLmNvbmRpdGlvbi50ZXh0fTwvc3Bhbj4gPGJyPiBcclxuICAgICAgPHNwYW4gY2xhc3M9XCJhZGRpdGlvblwiPlxyXG4gICAgICAgIEZpbGw6ICR7TWF0aC5jZWlsKGNvbnZlcnRUb0NlbGNpdXMob2JqLndpbmQuY2hpbGwpKX0gQyZkZWc7PGJyPlxyXG4gICAgICAgIEh1ZGltaXR5OiAke29iai5hdG1vc3BoZXJlLmh1bWlkaXR5fSVcclxuICAgICAgPC9zcGFuPmA7XHJcbn1cclxuXHJcbmNvbnN0IHNldEFuaW1hdGlvbkFwcGVhcmluZyA9IChlbCwgZGVsYXkpID0+IHtcclxuICBlbC5zdHlsZS5hbmltYXRpb24gPSBcImFwcGVhcmluZyAuXCIrZGVsYXkrXCJzIGVhc2Utb3V0XCI7XHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBlbC5zdHlsZS5hbmltYXRpb24gPSBcIm5vbmVcIjtcclxuICB9LCBkZWxheSk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBtb2RpZnlUb2RheUJsb2NrID0gKGV2ZW50KSA9PiB7XHJcbiAgbGV0IGVsID0gZXZlbnQucGF0aC5maW5kKChlbCkgPT4ge3JldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMoXCJmb3JlY2FzdC1kYXlzLWl0ZW1cIik7IH0pO1xyXG4gIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gIGxldCBkYXRlID0gbmV3IERhdGUoZWwucXVlcnlTZWxlY3RvcihcIi5kYXlzLWRhdGVcIikuaW5uZXJUZXh0ICtcIiBcIisgbm93LmdldEZ1bGxZZWFyKCkpO1xyXG4gIHNlbGVjdG9ycy5tYWluVGltZS5pbm5lckhUTUwgPSBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygncnUtUlUnKTtcclxuICBzZXRBbmltYXRpb25BcHBlYXJpbmcoc2VsZWN0b3JzLm1haW5UaW1lLCA0MDApO1xyXG4gIHNlbGVjdG9ycy5tYWluSWNvbi5maXJzdENoaWxkLmNsYXNzTmFtZSA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIuZGF5cy1pY29uXCIpLmZpcnN0Q2hpbGQuY2xhc3NOYW1lO1xyXG4gIHNldEFuaW1hdGlvbkFwcGVhcmluZyhzZWxlY3RvcnMubWFpbkljb24uZmlyc3RDaGlsZCwgNDAwKTtcclxuICBzZWxlY3RvcnMubWFpblRlbXAuaW5uZXJIVE1MID0gZWwucXVlcnlTZWxlY3RvcihcIi5kYXlzLWhpZ2hcIikuaW5uZXJUZXh0O1xyXG4gIHNldEFuaW1hdGlvbkFwcGVhcmluZyhzZWxlY3RvcnMubWFpblRlbXAsIDQwMCk7XHJcbiAgc2VsZWN0b3JzLm1haW5JbmZvLnF1ZXJ5U2VsZWN0b3IoXCIuY29uZGl0aW9uXCIpLmlubmVySFRNTCA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIuZGF5cy10ZXh0XCIpLmlubmVyVGV4dDtcclxuICBzZXRBbmltYXRpb25BcHBlYXJpbmcoc2VsZWN0b3JzLm1haW5JbmZvLCA0MDApO1xyXG4gIHNlbGVjdG9ycy5tYWluSW5mby5xdWVyeVNlbGVjdG9yKFwiLmFkZGl0aW9uXCIpLmlubmVySFRNTCA9IFwiXCI7XHJcbn1cclxuXHJcbmxldCBjaXRpZXMgPSBzdG9yYWdlLmNpdGllc0luU3RvcmFnZS5saXN0O1xyXG5cclxuZXhwb3J0IGNvbnN0IGJ1aWxkUmVjZW50Q2l0aWVzID0gKCkgPT4ge1xyXG4gIHNlbGVjdG9ycy5yZWNlbnRCbG9jay5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIGlmKGNpdGllcy5sZW5ndGgpIHtcclxuICBjaXRpZXMuZm9yRWFjaCgoY2l0eSkgPT4ge1xyXG4gICAgc2VsZWN0b3JzLnJlY2VudEJsb2NrLmlubmVySFRNTCArPSBcclxuICAgICAgICAgIGA8YSBocmVmPVwiPz0ke2NpdHkubmFtZX1cIiBjbGFzcz1cInJlY2VudFwiPlxyXG4gICAgICAgICAgICAgICR7Y2l0eS5uYW1lfTxzdXA+KCR7Y2l0eS5zZWFyY2hUaW1lc30pPC9zdXA+XHJcbiAgICAgICAgICA8L2E+YDtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgYnVpbGRGYXZvcml0ZUNpdGllcyA9ICgpID0+IHtcclxuICBzZWxlY3RvcnMuZmF2b3JpdGVCbG9jay5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIGlmKGNpdGllcy5sZW5ndGgpIHtcclxuICAgIGNpdGllcy5maWx0ZXIoKG9iaikgPT4geyByZXR1cm4gb2JqLmZhdm9yaXRlID09IHRydWU7fSlcclxuICAgIC5mb3JFYWNoKChjaXR5KSA9PiB7XHJcbiAgICAgIHNlbGVjdG9ycy5mYXZvcml0ZUJsb2NrLmlubmVySFRNTCArPSBcclxuICAgICAgICAgICAgYDxhIGhyZWY9XCI/PSR7Y2l0eS5uYW1lfVwiIGNsYXNzPVwiZmF2b3JpdGVcIj5cclxuICAgICAgICAgICAgICAgICR7Y2l0eS5uYW1lfTxzdXA+KCR7Y2l0eS5zZWFyY2hUaW1lc30pPC9zdXA+XHJcbiAgICAgICAgICAgIDwvYT5gO1xyXG4gICAgICB9KTtcclxuIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlckNpdGllcyA9ICgpID0+IHtcclxuICBidWlsZFJlY2VudENpdGllcygpXHJcbiAgYnVpbGRGYXZvcml0ZUNpdGllcygpO1xyXG59XHJcbiIsIi8vcmVxdWVzdFxyXG5jb25zdCBidWlsZFJlcXVlc3RVcmwgPSAoY2l0eSwgZGVnKSA9PiB7XHJcbiAgbGV0IHVybCA9IFwiaHR0cHM6Ly9xdWVyeS55YWhvb2FwaXMuY29tL3YxL3B1YmxpYy95cWw/cT1cIixcclxuICAgICAgcXVlcnkgPSBcInNlbGVjdCAqIGZyb20gd2VhdGhlci5mb3JlY2FzdCB3aGVyZSB3b2VpZCBpbiBcIixcclxuICAgICAgZ2V0Q2l0eVdvZWlkID0gJyhzZWxlY3Qgd29laWQgZnJvbSBnZW8ucGxhY2VzKDEpIHdoZXJlIHRleHQ9XCInKyBjaXR5ICsnXCIpJyxcclxuICAgICAgc2V0RGVncmVlID0gKGRlZyA9PT0gXCJjZWxzaXVzXCIpID8gJyBhbmQgdT1cImNcIicgOiAoZGVnID09PSBcImZhaHJlbmhlaXRcIikgPyAnIGFuZCB1PVwiZlwiJyA6ICcgYW5kIHU9XCJjXCInLCBcclxuICAgICAgZm9ybWF0ID0gXCImZm9ybWF0PWpzb24mZW52PXN0b3JlJTNBJTJGJTJGZGF0YXRhYmxlcy5vcmclMkZhbGx0YWJsZXN3aXRoa2V5c1wiO1xyXG4gIHJldHVybiB1cmwgKyBxdWVyeSArIGdldENpdHlXb2VpZCArIHNldERlZ3JlZSArIGZvcm1hdDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZWFyY2hXZWF0aGVyID0gKHR5cGVkQ2l0eSwgZGVnLCBjYWxsYmFjaykgPT4ge1xyXG4gIGZldGNoKGJ1aWxkUmVxdWVzdFVybCh0eXBlZENpdHksIGRlZykpXHJcbiAgICAudGhlbigocikgPT4geyBcclxuICAgICAgaWYoci5vaykgcmV0dXJuIHIuanNvbigpO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgcmVzcG9uc2Ugd2FzIG5vdCBvay4nKTtcclxuICAgICAgIH0pXHJcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICBjYWxsYmFjayhkYXRhLCB0eXBlZENpdHkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgIC8vICAgY29uc29sZS5sb2coJ1RoZXJlIGhhcyBiZWVuIGEgcHJvYmxlbSB3aXRoIHlvdXIgZmV0Y2ggb3BlcmF0aW9uOiAnICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgLy8gfSk7XHJcbn07IiwiaW1wb3J0IHsgc2VsZWN0b3JzIH0gZnJvbSAnLi9pbmMvX3NlbGVjdG9ycy5qcydcclxuaW1wb3J0ICogYXMgcmVuZGVyICBmcm9tICcuL3JlbmRlci5qcydcclxuLy92aWV3IGNpdGllcyBpbiByZWNlbnQgYW5kIGluIGZhdm9yaXRlIGJsb2Nrc1xyXG5cclxuXHJcblxyXG4vL2J1aWxkIGJ1dHRvbiAtIGFkZCB0byBmYXZvcml0ZXNcclxuLy9idXR0b24gY2xlYXIgcmVjZW50IFxyXG4vL2J1dHRvbiBjbGVhciBmYXZvcml0ZXNcclxuXHJcblxyXG5jb25zdCBnZXRDaXRpZXNGcm9tU3RvcmFnZSA9IChzdG9yYWdlTmFtZSkgPT4ge1xyXG4gIGxldCBjaXRpZXMgPSB7fTtcclxuICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlTmFtZSkpIHtcclxuICAgIGNpdGllcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oc3RvcmFnZU5hbWUpKTtcclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICBjaXRpZXMubGlzdCA9IFtdOyBcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0b3JhZ2VOYW1lLCBKU09OLnN0cmluZ2lmeSggY2l0aWVzICkpO1xyXG4gIH1cclxuICByZXR1cm4gY2l0aWVzO1xyXG59XHJcblxyXG5jb25zdCBzdG9yYWdlTmFtZSA9IFwiY2l0aWVzSW5TdG9yYWdlXCI7XHJcbmV4cG9ydCBjb25zdCBjaXRpZXNJblN0b3JhZ2UgPSBnZXRDaXRpZXNGcm9tU3RvcmFnZShzdG9yYWdlTmFtZSk7XHJcblxyXG5cclxuXHJcbmNsYXNzIENpdHkge1xyXG4gIGNvbnN0cnVjdG9yKGNpdHlOYW1lKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBjaXR5TmFtZTtcclxuICAgIHRoaXMuc2VhcmNoVGltZXMgPSAxO1xyXG4gICAgdGhpcy5mYXZvcml0ZSA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuLy9vcGVyYXRpb25zIHdpdGggY2l0aWVzXHJcbmV4cG9ydCBjb25zdCBzZWFyY2hDaXR5ID0gKGNpdHkpID0+IHtcclxuICByZXR1cm4gY2l0aWVzSW5TdG9yYWdlLmxpc3QuZmluZCgob2JqKSA9PiB7IHJldHVybiBvYmoubmFtZSA9PT0gY2l0eTsgfSk7XHJcbn1cclxuZXhwb3J0IGNvbnN0IGlzQ2l0eUZhdm9yaXRlID0gKGNpdHkpID0+IHtcclxuICBsZXQgb2JqID0gc2VhcmNoQ2l0eShjaXR5KTtcclxuICByZXR1cm4gKG9iaikgPyAob2JqLmZhdm9yaXRlID09IHRydWUpIDogZmFsc2U7XHJcbn1cclxuXHJcbmNvbnN0IHVwZGF0ZUNpdHkgPSAoYWxyZWFkeUV4aXN0Q2l0eSwgaXNGYXZvcml0ZSkgPT4ge1xyXG4gIGlmKCFpc0Zhdm9yaXRlKSB7IFxyXG4gICAgYWxyZWFkeUV4aXN0Q2l0eS5zZWFyY2hUaW1lcysrOyBcclxuICB9XHJcbiAgIGVsc2Uge1xyXG4gICAgIHN3aXRjaChpc0Zhdm9yaXRlKSB7XHJcbiAgICAgICBjYXNlIFwiYWRkXCI6ICAgIGlzRmF2b3JpdGUgPSB0cnVlOyAgYnJlYWs7XHJcbiAgICAgICBjYXNlIFwicmVtb3ZlXCI6IGlzRmF2b3JpdGUgPSBmYWxzZTsgYnJlYWs7XHJcbiAgICAgICBkZWZhdWx0OiAgICAgICBpc0Zhdm9yaXRlID0gZmFsc2U7IGJyZWFrO1xyXG4gICAgIH1cclxuICAgIGFscmVhZHlFeGlzdENpdHkuZmF2b3JpdGUgPSBpc0Zhdm9yaXRlO1xyXG4gIH1cclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzdG9yYWdlTmFtZSwgSlNPTi5zdHJpbmdpZnkoIGNpdGllc0luU3RvcmFnZSApKTtcclxufVxyXG5jb25zdCBhZGRDaXR5ID0gKGNpdHkpID0+IHtcclxuICBjaXRpZXNJblN0b3JhZ2UubGlzdC5wdXNoKG5ldyBDaXR5KGNpdHkpKTtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzdG9yYWdlTmFtZSwgSlNPTi5zdHJpbmdpZnkoIGNpdGllc0luU3RvcmFnZSApKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGFkZENpdHlBY3Rpdml0eSA9IChjaXR5LCBpc0Zhdm9yaXRlKSA9PiB7XHJcbiAgbGV0IGFscmVhZHlFeGlzdENpdHkgPSBzZWFyY2hDaXR5KGNpdHkpO1xyXG4gIChhbHJlYWR5RXhpc3RDaXR5KSA/IHVwZGF0ZUNpdHkoYWxyZWFkeUV4aXN0Q2l0eSwgaXNGYXZvcml0ZSkgOiBhZGRDaXR5KGNpdHkpO1xyXG4gIHJlbmRlci5jaGVja0lzQ2l0eUluRmF2b3JpdGVzKGNpdHkpO1xyXG4gIHJlbmRlci5yZW5kZXJDaXRpZXMoKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNsZWFyU3RvcmFnZSA9ICgpID0+IHtcclxuICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShzdG9yYWdlTmFtZSk7XHJcbiAgd2luZG93LmxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG59Il19
