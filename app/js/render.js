import { selectors } from './inc/_selectors.js'
import { getWeatherIcon } from './inc/_lib.js'
import * as storage  from './storage.js'

export const renderWeather = (data, typedCity) => {
  if(data.query.results === null){ 
    renderModalPopup("This city is <br><br> not supported", "error");
    
  } 
  else {
    storage.addCityActivity(typedCity);
    let weather = data.query.results.channel;
    renderTodayBlock(weather);
    let forecast = weather.item.forecast;
    renderForecastDaysBlocks(forecast); 
  } 
}

const renderModalPopup = (text, type) => {
  selectors.modalPopupBlock.innerHTML = `<div class="message ${type}">${text}</div>`;
  selectors.modalPopupBlock.style.opacity = "1";
  selectors.modalPopupBlock.style.zIndex = "100";
  setTimeout(() => {
    selectors.modalPopupBlock.style.opacity = "0";
    selectors.modalPopupBlock.style.zIndex = "-100";
    selectors.input.value = "";
    selectors.input.focus();
  }, 2000)
}

const buildDayBlock = (obj) => {
  let day = document.createElement("div");
  day.classList.add("forecast-days-item");
  day.innerHTML = `<span class="days-date">${obj.date.substring(0,7)}</span>
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

const convertToCelcius = (F) => {
  return (5/9) * (F - 32);
}
const renderTodayBlock = (obj) => {
  document.querySelector(".main-block-city").innerHTML = obj.location.country +", "+ obj.location.region;
  document.querySelector(".main-block-icon").innerHTML = getWeatherIcon(obj.item.condition.code);
  document.querySelector(".main-block-temp").innerHTML = obj.item.condition.temp;
  document.querySelector(".main-block-info").innerHTML = 
     `<span class="condition">${obj.item.condition.text}</span> <br> 
      <span class="addition">
        Fill ${Math.ceil(convertToCelcius(obj.wind.chill))} C<br>
        Hudimity: ${obj.atmosphere.humidity}%
      </span>`;
}

let cities = storage.citiesInStorage.list;

export const buildRecentCities = () => {
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
