import { getWeatherIcon } from './inc/_lib.js'
import { selectors } from './inc/_selectors.js'

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

