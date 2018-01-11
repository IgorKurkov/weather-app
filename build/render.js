'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderCities = exports.buildRecentCities = exports.modifyTodayBlock = exports.checkIsCityInFavorites = exports.renderModalPopup = exports.renderWeather = undefined;

var _selectors = require('./inc/_selectors.js');

var _lib = require('./inc/_lib.js');

var _storage = require('./storage.js');

var storage = _interopRequireWildcard(_storage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var renderWeather = exports.renderWeather = function renderWeather(data, typedCity) {
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

var renderModalPopup = exports.renderModalPopup = function renderModalPopup(text, type) {
  _selectors.selectors.modalPopupBlock.classList.add(type);
  _selectors.selectors.modalPopupBlock.innerHTML = '<div class="message">' + text + '</div>';
  _selectors.selectors.modalPopupBlock.style.opacity = "1";
  _selectors.selectors.modalPopupBlock.style.zIndex = "100";
  setTimeout(function () {
    _selectors.selectors.modalPopupBlock.style.opacity = "0";
    _selectors.selectors.modalPopupBlock.style.zIndex = "-100";
    _selectors.selectors.modalPopupBlock.classList.remove(type);
    if (type == "error") {
      _selectors.selectors.input.value = "";
      _selectors.selectors.input.focus();
    }
  }, 800);
};

var buildDayBlock = function buildDayBlock(obj) {
  var day = document.createElement("div");
  day.classList.add("forecast-days-item");
  day.innerHTML = '<span class="days-date">' + obj.date.substring(0, 7) + '</span>\n                   <span class="days-icon">' + (0, _lib.getWeatherIcon)(obj.code) + '</span>\n                   <span class="days-high">' + obj.high + '&deg;</span>\n                   <span class="days-low" >' + obj.low + '&deg;</span><br>\n                   <span class="days-text">' + obj.text + '</span>';
  return day;
};

var renderForecastDaysBlocks = function renderForecastDaysBlocks(nextDays) {
  _selectors.selectors.forecastBlock.innerHTML = "";
  nextDays.forEach(function (obj) {
    var day = buildDayBlock(obj);
    _selectors.selectors.forecastBlock.appendChild(day);
  });
};

var convertToCelcius = function convertToCelcius(F) {
  return 5 / 9 * (F - 32);
};
var checkIsCityInFavorites = exports.checkIsCityInFavorites = function checkIsCityInFavorites(typedCity) {
  // let city = storage.searchCity(typedCity);
  if (storage.isCityFavorite(typedCity)) {
    _selectors.selectors.buttonAddToFavorites.className = "fa fa-heart";
  } else {
    _selectors.selectors.buttonAddToFavorites.className = "fa fa-heart-o";
  }
};

var renderMainBlock = function renderMainBlock(obj, date, typedCity) {
  checkIsCityInFavorites(typedCity);
  _selectors.selectors.mainCity.innerHTML = obj.location.country + ", " + obj.location.region;
  _selectors.selectors.mainTime.innerHTML = date.toLocaleString('ru-RU');
  _selectors.selectors.mainIcon.innerHTML = (0, _lib.getWeatherIcon)(obj.item.condition.code);
  _selectors.selectors.mainTemp.innerHTML = obj.item.condition.temp + "&deg;";
  _selectors.selectors.mainInfo.innerHTML = '<span class="condition">' + obj.item.condition.text + '</span> <br> \n      <span class="addition">\n        Fill: ' + Math.ceil(convertToCelcius(obj.wind.chill)) + ' C&deg;<br>\n        Hudimity: ' + obj.atmosphere.humidity + '%\n      </span>';
};

var setAnimationAppearing = function setAnimationAppearing(el, delay) {
  el.style.animation = "appearing ." + delay + "s ease-out";
  setTimeout(function () {
    el.style.animation = "none";
  }, delay);
};

var modifyTodayBlock = exports.modifyTodayBlock = function modifyTodayBlock(event) {
  var el = event.path.find(function (el) {
    return el.classList.contains("forecast-days-item");
  });
  var now = new Date();
  var date = new Date(el.querySelector(".days-date").innerText + " " + now.getFullYear());
  _selectors.selectors.mainTime.innerHTML = date.toLocaleDateString('ru-RU');
  setAnimationAppearing(_selectors.selectors.mainTime, 400);
  _selectors.selectors.mainIcon.firstChild.className = el.querySelector(".days-icon").firstChild.className;
  setAnimationAppearing(_selectors.selectors.mainIcon.firstChild, 400);
  _selectors.selectors.mainTemp.innerHTML = el.querySelector(".days-high").innerText;
  setAnimationAppearing(_selectors.selectors.mainTemp, 400);
  _selectors.selectors.mainInfo.querySelector(".condition").innerHTML = el.querySelector(".days-text").innerText;
  setAnimationAppearing(_selectors.selectors.mainInfo, 400);
  _selectors.selectors.mainInfo.querySelector(".addition").innerHTML = "";
};

var cities = storage.citiesInStorage.list;

var buildRecentCities = exports.buildRecentCities = function buildRecentCities() {
  _selectors.selectors.recentBlock.innerHTML = "";
  if (cities.length) {
    cities.forEach(function (city) {
      _selectors.selectors.recentBlock.innerHTML += '<a href="?=' + city.name + '" class="recent">\n              ' + city.name + '<sup>(' + city.searchTimes + ')</sup>\n          </a>';
    });
  }
};

var buildFavoriteCities = function buildFavoriteCities() {
  _selectors.selectors.favoriteBlock.innerHTML = "";
  if (cities.length) {
    cities.filter(function (obj) {
      return obj.favorite == true;
    }).forEach(function (city) {
      _selectors.selectors.favoriteBlock.innerHTML += '<a href="?=' + city.name + '" class="favorite">\n                ' + city.name + '<sup>(' + city.searchTimes + ')</sup>\n            </a>';
    });
  }
};

var renderCities = exports.renderCities = function renderCities() {
  buildRecentCities();
  buildFavoriteCities();
};