//get cities from it    
//view cities in recent and in favorite blocks

//when search - add city to localstorage 
//rebuild view recent 
//build button - add to favorites
//button clear recent 
//button clear favorites

export const getCitiesFromStorage = (storageName) => {
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

const storageName = "savedCities";
const savedCities = getCitiesFromStorage(storageName);

class City {
  constructor(cityName) {
    this.city = cityName;
    this.searchTimes = 1;
    this.favorite = false;
  }
}

//operations with cities
const searchCity = (city) => {
  return savedCities.list.find((obj) => { return obj.city === city; });
}
const updateCity = (alreadyExistCity, isFavorite) => {
  alreadyExistCity.searchTimes++; 
  alreadyExistCity.favorite = (isFavorite) ? true : false;
}
const addCity = (city) => {
  savedCities.list.push(new City(city));
  localStorage.setItem(storageName, JSON.stringify( savedCities ));
}

export const addCityActivity = (city, isFavorite) => {
  let alreadyExistCity = searchCity(city);
  (alreadyExistCity) ? updateCity(alreadyExistCity, isFavorite) : addCity(city);
}

