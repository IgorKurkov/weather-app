import { selectors } from './inc/_selectors.js'
import * as render  from './render.js'
//view cities in recent and in favorite blocks



//build button - add to favorites
//button clear recent 
//button clear favorites


const getCitiesFromStorage = (storageName) => {
  let cities = {};
  if(localStorage.getItem(storageName)) {
    cities = JSON.parse(localStorage.getItem(storageName));
  }
  else {
    cities.list = []; 
    localStorage.setItem(storageName, JSON.stringify( cities ));
  }
  return cities;
}

const storageName = "citiesInStorage";
export const citiesInStorage = getCitiesFromStorage(storageName);



class City {
  constructor(cityName) {
    this.name = cityName;
    this.searchTimes = 1;
    this.favorite = false;
  }
}

//operations with cities
export const searchCity = (city) => {
  return citiesInStorage.list.find((obj) => { return obj.name === city; });
}
export const isCityFavorite = (city) => {
  let obj = searchCity(city);
  return (obj) ? (obj.favorite == true) : false;
}

const updateCity = (alreadyExistCity, isFavorite) => {
  if(!isFavorite) { 
    alreadyExistCity.searchTimes++; 
  }
   else {
     switch(isFavorite) {
       case "add":    isFavorite = true;  break;
       case "remove": isFavorite = false; break;
       default:       isFavorite = false; break;
     }
    alreadyExistCity.favorite = isFavorite;
  }
  localStorage.setItem(storageName, JSON.stringify( citiesInStorage ));
}
const addCity = (city) => {
  citiesInStorage.list.push(new City(city));
  localStorage.setItem(storageName, JSON.stringify( citiesInStorage ));
}

export const addCityActivity = (city, isFavorite) => {
  let alreadyExistCity = searchCity(city);
  (alreadyExistCity) ? updateCity(alreadyExistCity, isFavorite) : addCity(city);
  render.checkIsCityInFavorites(city);
  render.renderCities();
}

export const clearStorage = () => {
  localStorage.removeItem(storageName);
  window.location = window.location.pathname;
}