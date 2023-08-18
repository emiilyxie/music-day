import { config } from "./config.js";

const apiKey = config.API_KEY;

// get weather with openweather api
export function getWeather(location, adjust) {
  let lat = 40
  let lon = -79
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    let weatherID = data.weather[0].id;
    //weatherID = 503;
    adjust(weatherID);
  })
  .catch(function() {
    // catch any errors
    console.log("could not get weather data");

    // website is still fine, just shows time of day
  });
}