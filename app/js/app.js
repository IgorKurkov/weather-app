
//request
let buildRequestUrl = (city, deg) => {
  let url = "https://query.yahooapis.com/v1/public/yql?q=",
      query = "select * from weather.forecast where woeid in ",
      getCityWoeid = '(select woeid from geo.places(1) where text="'+ city +'")',
      setDegree = (deg === "celsius") ? ' and u="c"' : (deg === "fahrenheit") ? ' and u="f"' : ' and u="c"', 
      format = "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  return url + query + getCityWoeid + setDegree + format;
};

const searchWeather = (city, deg) => {
  fetch(buildRequestUrl(city, deg))
    .then((r) => { return r.json(); })
      .then((data) => {
        renderWeather(data);
      });
};

const input         = document.querySelector(".search");
const forecast = document.querySelector(".forecast-days");

const listenForInput = () => {
  input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      if(input.value.length == 0) { 
        console.log("you dont type city"); return;
      } else {
        searchWeather(input.value, "celsius");
        }
    }
  });
}
listenForInput(); //init

const buildForecastDaysBlock = (obj) => {
  let day = document.createElement("div");
  day.classList.add("forecast-days-item");
  day.innerHTML = `<span class="days-date">${obj.date}</span>
                   <span class="days-icon">${obj.code}</span>
                   <span class="days-high">${obj.high}</span>
                   <span class="days-low" >${obj.low} </span>
                   <span class="days-text">${obj.text}</span>`;
  forecast.appendChild(day);
}

const renderWeather = (data) => {
  let weather = data.query.results.channel;
  let forecast = weather.item.forecast;
  document.querySelector(".main-block-city").innerHTML = weather.location.city;
  document.querySelector(".main-block-temp").innerHTML = weather.item.condition.temp;
  document.querySelector(".main-block-info").innerHTML = weather.item.condition.text;
  forecast.forEach((obj) => {  
    buildForecastDaysBlock(obj); 
  });
}
// searchWeatherForCity(buildRequestUrl("kiev", "celsius"));



//push data to dom
//make recent block
//push current city to recent block
