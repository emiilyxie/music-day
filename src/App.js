import logo from './logo.svg';
import './App.css';
import * as Tone from "tone";
import G from 'glob';
import { useEffect } from 'react';
import * as MusicVars from './musicVars.js';
import * as MusicFuncs from './music.js';
import { getWeather } from './weather';

function App() {

  // declare tempo and variables
  let bpm = 80;
  let progIndex = MusicFuncs.getRandomInt(MusicVars.chordProgressions.length);
  let progression = MusicVars.chordProgressions[progIndex];
  let progRhythm, bassRhythm, percRhythm;
  let progDuration, bassNotes, percNotes;
  let melodyInst, progInst, bassInst, percInst;
  getWeather();
  
  function setMorning() {
    bpm = MusicFuncs.getRandomInt(60) + 100;

    progRhythm = [MusicVars.daytimeRhythm1, MusicVars.daytimeRhythm2];
    bassRhythm = [MusicVars.dottedQuarterEigth, MusicVars.dottedQuarterEigth];
    bassNotes = MusicFuncs.getBassNotes(progression);
    percRhythm = [MusicVars.twoThreeClaveRhythm1, MusicVars.twoThreeClaveRhythm2];
    percNotes = ["C1", "C1"];
    progDuration = "8n"

    melodyInst = MusicVars.synth;
    MusicVars.piano.volume.value = -8;
    progInst = MusicVars.piano;
    bassInst = MusicVars.bassPluck;
    percInst = MusicVars.kickDrum;
  }

  function setAfternoon() {
    bpm = MusicFuncs.getRandomInt(60) + 80;

    progRhythm = [MusicVars.daytimeRhythm1, MusicVars.daytimeRhythm2];
    bassRhythm = [MusicVars.oneFourRhythm, MusicVars.oneFourRhythm];
    bassNotes = MusicFuncs.getBassNotes(progression);
    percRhythm = [MusicVars.twoThreeClaveRhythm2];
    percNotes = ["C1", "C1"];
    progDuration = "8n"

    melodyInst = MusicVars.guitar;
    MusicVars.synth.volume.value = -20;
    progInst = MusicVars.synth;
    bassInst = MusicVars.bassPluck;
    percInst = MusicVars.kickDrum;
  }

  function setNight() {
    bpm = MusicFuncs.getRandomInt(30) + 50;

    progRhythm = [MusicVars.oneFourRhythm, MusicVars.oneNote];
    bassRhythm = [MusicVars.dottedQuarterEigth, MusicVars.dottedQuarterEigth];
    bassNotes = MusicFuncs.getBassNotes(progression);
    percRhythm = [MusicVars.twoThreeClaveRhythm1, MusicVars.twoThreeClaveRhythm2];
    percNotes = ["C1", "C1"];
    progDuration = "1m"

    melodyInst = MusicVars.piano;
    progInst = MusicVars.piano;
    bassInst = null;
    percInst = null;
  }

  function setRainy() {
    bpm = MusicFuncs.getRandomInt(40) + 80;

    progRhythm = [MusicVars.oneNote];
    bassRhythm = [MusicVars.dottedQuarterEigth, MusicVars.dottedQuarterEigth];
    bassNotes = MusicFuncs.getBassNotes(progression);
    percRhythm = [MusicVars.twoThreeClaveRhythm1, MusicVars.twoThreeClaveRhythm2];
    percNotes = ["C1", "C1"];
    progDuration = "1m"

    MusicVars.bell.volume.value = 0;
    melodyInst = MusicVars.bell;
    MusicVars.synth.volume.value = -25;
    progInst = MusicVars.synth;
    MusicVars.bell.volume.value = -15;
    bassInst = MusicVars.bell;
    percInst = MusicVars.hihat;
  }

  function setSnowy() {
    bpm = MusicFuncs.getRandomInt(60) + 80;

    progRhythm = [MusicVars.dottedQuarterEigth];
    bassRhythm = [MusicVars.daytimeRhythm1];
    bassNotes = MusicFuncs.getBassNotes(progression);
    percRhythm = [MusicVars.twoFourEigthRhythm];
    percNotes = ["C1", "C1"];
    progDuration = "1m"

    melodyInst = MusicVars.piano;
    MusicVars.bell.volume.value = -25;
    progInst = MusicVars.bell;
    bassInst = null;
    percInst = MusicVars.tambourine;
  }

  // make the song based on the setting!
  function startSong() {
    const melody1 = MusicFuncs.generateMelody(progression, 8);
    const melodyPart1 = MusicFuncs.makeMelody(melodyInst, melody1, false, '0:0');
    const perc1 = MusicFuncs.makeProgression(percInst, percNotes, "8n", percRhythm, 1, true, '2:0');
    const backingChords1 = MusicFuncs.makeProgression(progInst, progression, progDuration, progRhythm, 
      1, false, '8:0');
    const bass1 = MusicFuncs.makeProgression(bassInst, bassNotes, '8n', bassRhythm, 
      1, false, '8:0');
  }

  // start tone.js
  function startTone() {
    if (Tone.Transport.state !== 'started') {
      Tone.start();
      Tone.Transport.bpm.value = bpm;
      Tone.Transport.loop = true;
      Tone.Transport.loopEnd = '8:0';
      Tone.Transport.start();
      startSong();
    } else {
      Tone.Transport.stop();
    }
  }

  // update setting based on weather data
  function adjustForWeather(weatherID) {
    let screenBg = document.getElementById("screen-background");
    let startButton = document.getElementById("start-button");
    let weatherMain = Math.floor(weatherID / 100);
    let taggedWeathers = [2, 3, 5, 6]; // ids for rain + snow

    if (taggedWeathers.includes(weatherMain)) {
      screenBg.classList.remove('background-morning');
      screenBg.classList.remove('background-afternoon');
      screenBg.classList.remove('background-night');
      screenBg.classList.remove('background-rain');
      screenBg.classList.remove('background-snow');
    }

    if (weatherMain == 2) {
      screenBg.classList.add('background-rain');
      setRainy();
      startButton.textContent = "thunderstorms outside.";
    }
    if (weatherMain == 3) {
      screenBg.classList.add('background-rain');
      setRainy();
      startButton.textContent = "a small drizzle.";
    }
    if (weatherMain == 5) {
      screenBg.classList.add('background-rain');
      setRainy();
      startButton.textContent = "rainy day.";
    }
    if (weatherMain == 6) {
      screenBg.classList.add('background-snow');
      setSnowy();
      startButton.textContent = "snowy!";
    }
  }

  let date = new Date();
  let hours = date.getHours();
  //hours = 10;

  // this code runs after UI loads in
  useEffect(() => {
    let screenBg = document.getElementById("screen-background");
    let startButton = document.getElementById("start-button");

    screenBg.classList.remove('background-morning');
    screenBg.classList.remove('background-afternoon');
    screenBg.classList.remove('background-night');
    screenBg.classList.remove('background-rain');
    screenBg.classList.remove('background-snow');

    // change bg based on hour of day
    if (hours >= 20 || hours < 6) {
      screenBg.classList.add('background-night');
      setNight();
      startButton.textContent = "it's nighttime.";
    }
    else if (6 <= hours && hours < 15) {
      screenBg.classList.add('background-morning');
      setMorning();
      startButton.textContent = "good morning!";
    }
    else if (15 <= hours && hours < 20) {
      screenBg.classList.add('background-afternoon');
      setAfternoon();
      startButton.textContent = "a lazy afternoon...";
    }

    // hardcoded location
    // can adjust location in future versions
    let location = "Pittsburgh";
    getWeather(location, adjustForWeather);
  });

  return (
    <div id="screen-background" className="animated-background background-afternoon">
      <button id='start-button' onClick={() => startTone()}>music day</button>
    </div>
  );
}

export default App;
