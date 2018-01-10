import { selectors } from './inc/_selectors.js';
import { getWeatherIcon } from './inc/_lib.js';
import * as storage from './storage.js';

export const renderWeather = (data, typedCity) => {
  if (data.query.results === null) {
    renderModalPopup("This city is <br><br> not supported", "error");
  } else {
    storage.addCityActivity(typedCity);
    let weather = data.query.results.channel;
    let date = new Date(data.query.created);
    renderMainBlock(weather, date, typedCity);

    let forecast = weather.item.forecast;
    renderForecastDaysBlocks(forecast);
  }
};

export const renderModalPopup = (text, type) => {
  selectors.modalPopupBlock.classList.add(type);
  selectors.modalPopupBlock.innerHTML = `<div class="message">${text}</div>`;
  selectors.modalPopupBlock.style.opacity = "1";
  selectors.modalPopupBlock.style.zIndex = "100";
  setTimeout(() => {
    selectors.modalPopupBlock.style.opacity = "0";
    selectors.modalPopupBlock.style.zIndex = "-100";
    selectors.modalPopupBlock.classList.remove(type);
    if (type == "error") {
      selectors.input.value = "";
      selectors.input.focus();
    }
  }, 800);
};

const buildDayBlock = obj => {
  let day = document.createElement("div");
  day.classList.add("forecast-days-item");
  day.innerHTML = `<span class="days-date">${obj.date.substring(0, 7)}</span>
                   <span class="days-icon">${getWeatherIcon(obj.code)}</span>
                   <span class="days-high">${obj.high}&deg;</span>
                   <span class="days-low" >${obj.low}&deg;</span><br>
                   <span class="days-text">${obj.text}</span>`;
  return day;
};

const renderForecastDaysBlocks = nextDays => {
  selectors.forecastBlock.innerHTML = "";
  nextDays.forEach(obj => {
    let day = buildDayBlock(obj);
    selectors.forecastBlock.appendChild(day);
  });
};

const convertToCelcius = F => {
  return 5 / 9 * (F - 32);
};
export const checkIsCityInFavorites = typedCity => {
  // let city = storage.searchCity(typedCity);
  if (storage.isCityFavorite(typedCity)) {
    selectors.buttonAddToFavorites.className = "fa fa-heart";
  } else {
    selectors.buttonAddToFavorites.className = "fa fa-heart-o";
  }
};

const renderMainBlock = (obj, date, typedCity) => {
  checkIsCityInFavorites(typedCity);
  selectors.mainCity.innerHTML = obj.location.country + ", " + obj.location.region;
  selectors.mainTime.innerHTML = date.toLocaleString('ru-RU');
  selectors.mainIcon.innerHTML = getWeatherIcon(obj.item.condition.code);
  selectors.mainTemp.innerHTML = obj.item.condition.temp + "&deg;";
  selectors.mainInfo.innerHTML = `<span class="condition">${obj.item.condition.text}</span> <br> 
      <span class="addition">
        Fill: ${Math.ceil(convertToCelcius(obj.wind.chill))} C&deg;<br>
        Hudimity: ${obj.atmosphere.humidity}%
      </span>`;
};

const setAnimationAppearing = (el, delay) => {
  el.style.animation = "appearing ." + delay + "s ease-out";
  setTimeout(() => {
    el.style.animation = "none";
  }, delay);
};

export const modifyTodayBlock = event => {
  let el = event.path.find(el => {
    return el.classList.contains("forecast-days-item");
  });
  let now = new Date();
  let date = new Date(el.querySelector(".days-date").innerText + " " + now.getFullYear());
  selectors.mainTime.innerHTML = date.toLocaleDateString('ru-RU');
  setAnimationAppearing(selectors.mainTime, 400);
  selectors.mainIcon.firstChild.className = el.querySelector(".days-icon").firstChild.className;
  setAnimationAppearing(selectors.mainIcon.firstChild, 400);
  selectors.mainTemp.innerHTML = el.querySelector(".days-high").innerText;
  setAnimationAppearing(selectors.mainTemp, 400);
  selectors.mainInfo.querySelector(".condition").innerHTML = el.querySelector(".days-text").innerText;
  setAnimationAppearing(selectors.mainInfo, 400);
  selectors.mainInfo.querySelector(".addition").innerHTML = "";
};

let cities = storage.citiesInStorage.list;

export const buildRecentCities = () => {
  selectors.recentBlock.innerHTML = "";
  if (cities.length) {
    cities.forEach(city => {
      selectors.recentBlock.innerHTML += `<a href="?=${city.name}" class="recent">
              ${city.name}<sup>(${city.searchTimes})</sup>
          </a>`;
    });
  }
};

const buildFavoriteCities = () => {
  selectors.favoriteBlock.innerHTML = "";
  if (cities.length) {
    cities.filter(obj => {
      return obj.favorite == true;
    }).forEach(city => {
      selectors.favoriteBlock.innerHTML += `<a href="?=${city.name}" class="favorite">
                ${city.name}<sup>(${city.searchTimes})</sup>
            </a>`;
    });
  }
};

export const renderCities = () => {
  buildRecentCities();
  buildFavoriteCities();
};
//# sourceMappingURL=render.js.map
