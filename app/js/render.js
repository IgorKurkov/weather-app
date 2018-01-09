import { selectors } from './inc/_selectors.js'
import { getWeatherIcon } from './inc/_lib.js'
import * as storage  from './storage.js'

export const renderWeather = (data) => {
  let weather = data.query.results.channel;
  renderTodayBlock(weather);
  let forecast = weather.item.forecast;
  renderForecastDaysBlocks(forecast); 
}

const buildDayBlock = (obj) => {
  let day = document.createElement("div");
  day.classList.add("forecast-days-item");
  day.innerHTML = `<span class="days-date">${obj.date}</span>
                   <span class="days-icon">${getWeatherIcon(obj.code)}</span>
                   <span class="days-high">${obj.high}</span>
                   <span class="days-low" >${obj.low} </span>
                   <span class="days-text">${obj.text}</span>`;
  return day;
}

const renderForecastDaysBlocks = (nextDays) => {
  selectors.forecastBlock.innerHTML = "";
  nextDays.forEach((obj) => {  
    let day = buildDayBlock(obj);
    selectors.forecastBlock.appendChild(day);
  });
}

const renderTodayBlock = (obj) => {
  document.querySelector(".main-block-city").innerHTML = obj.location.city;
  document.querySelector(".main-block-temp").innerHTML = obj.item.condition.temp;
  document.querySelector(".main-block-info").innerHTML = obj.item.condition.text;
}

let cities = storage.citiesInStorage.list;
const buildRecentCities = () => {
  selectors.recentBlock.innerHTML = "";
  if(cities.length) {
  cities.forEach((city) => {
    selectors.recentBlock.innerHTML += 
          `<a href="?=${city.name}" class="recent">
              ${city.name}<sup>(${city.searchTimes})</sup>
          </a>`;
    });
  }
}

const buildFavoriteCities = () => {
  selectors.favoriteBlock.innerHTML = "";
  if(cities.length) {
    cities.filter((obj) => { return obj.favorite == true;})
    .forEach((city) => {
      selectors.favoriteBlock.innerHTML += 
            `<a href="?=${city.name}" class="favorite">
                ${city.name}<sup>(${city.searchTimes})</sup>
            </a>`;
      });
 }
}

export const renderCities = () => {
  buildRecentCities()
  buildFavoriteCities();
}
