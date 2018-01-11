'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearStorage = exports.addCityActivity = exports.isCityFavorite = exports.searchCity = exports.citiesInStorage = undefined;

var _selectors = require('./inc/_selectors.js');

var _render = require('./render.js');

var render = _interopRequireWildcard(_render);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//view cities in recent and in favorite blocks


//build button - add to favorites
//button clear recent 
//button clear favorites


var getCitiesFromStorage = function getCitiesFromStorage(storageName) {
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
var citiesInStorage = exports.citiesInStorage = getCitiesFromStorage(storageName);

var City = function City(cityName) {
  _classCallCheck(this, City);

  this.name = cityName;
  this.searchTimes = 1;
  this.favorite = false;
};

//operations with cities


var searchCity = exports.searchCity = function searchCity(city) {
  return citiesInStorage.list.find(function (obj) {
    return obj.name === city;
  });
};
var isCityFavorite = exports.isCityFavorite = function isCityFavorite(city) {
  var obj = searchCity(city);
  return obj ? obj.favorite == true : false;
};

var updateCity = function updateCity(alreadyExistCity, isFavorite) {
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
var addCity = function addCity(city) {
  citiesInStorage.list.push(new City(city));
  localStorage.setItem(storageName, JSON.stringify(citiesInStorage));
};

var addCityActivity = exports.addCityActivity = function addCityActivity(city, isFavorite) {
  var alreadyExistCity = searchCity(city);
  alreadyExistCity ? updateCity(alreadyExistCity, isFavorite) : addCity(city);
  render.checkIsCityInFavorites(city);
  render.renderCities();
};

var clearStorage = exports.clearStorage = function clearStorage() {
  localStorage.removeItem(storageName);
  window.location = window.location.pathname;
};