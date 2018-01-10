//request
const buildRequestUrl = (city, deg) => {
  let url = "https://query.yahooapis.com/v1/public/yql?q=",
      query = "select * from weather.forecast where woeid in ",
      getCityWoeid = '(select woeid from geo.places(1) where text="' + city + '")',
      setDegree = deg === "celsius" ? ' and u="c"' : deg === "fahrenheit" ? ' and u="f"' : ' and u="c"',
      format = "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  return url + query + getCityWoeid + setDegree + format;
};

export const searchWeather = (typedCity, deg, callback) => {
  fetch(buildRequestUrl(typedCity, deg)).then(r => {
    if (r.ok) return r.json();
    throw new Error('Network response was not ok.');
  }).then(data => {
    console.log(data);
    callback(data, typedCity);
  });
  // .catch(function(error) {
  //   console.log('There has been a problem with your fetch operation: ' + error.message);
  // });
};
//# sourceMappingURL=request.js.map
