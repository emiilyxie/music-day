//const express = require("express");
//const bodyParser = require("body-parser");
//const request = require("request");
//const app = express();

//require("dotenv").config();
//const apiKey = `${process.env.API_KEY}`;

import { config } from "./config.js";

const apiKey = config.API_KEY;

export function getWeather(adjust) {
  fetch('https://api.openweathermap.org/data/2.5/weather?id=' + 6167865 + '&appid=' + apiKey)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    //console.log(data.weather[0].id);
    let weatherID = data.weather[0].id;
    //weatherID = 503;
    adjust(weatherID);
  })
  .catch(function() {
    // catch any errors
  });
}