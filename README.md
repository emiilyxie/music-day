# music-day
A web application that generates new background music depending on your location's time of day and weather. <br />
Created with Tone.js and the OpenWeather API.

## Demo
Demo is located at http://emily.xie.fm/activities/music-day/. To play the music, please click on the text in the center of the page.

## Hours
* Morning: 6 a.m. to 2:59 p.m.
* Afternoon: 3 p.m. to 7:59 p.m.
* Night: 8 p.m. to 5:59 a.m.<br />
If it is raining or snowing, the webpage will update accordingly.

## Project Structure
* src/App.js: main application code
* src/music.js: functions for music manipulation
* src/musicVars.js: variables for music generation
* src/sounds: contains sound sample files
* src/weather.js: weather api call
* src/index.css: website styling
