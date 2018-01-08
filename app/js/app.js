
//request
let buildRequestUrl = (city, deg) => {
  let url = "https://query.yahooapis.com/v1/public/yql?q=",
      query = "select * from weather.forecast where woeid in ",
      getCityWoeid = '(select woeid from geo.places(1) where text="'+ city +'")',
      setDegree = (deg === "celsius") ? ' and u="c"' : (deg === "fahrenheit") ? ' and u="f"' : ' and u="c"', 
      format = "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  return encodeURI(url + query + getCityWoeid + setDegree + format);
};

let searchWeatherForCity = (url) => {
  fetch(url).then((r) => { return r.json(); })
    .then((data) => {
      console.log(data.query.results.channel.location.city)
    });
};

searchWeatherForCity(buildRequestUrl("kiev", "celsius"));



//push data to dom
//make recent block
//push current city to recent block
