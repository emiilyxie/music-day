import logo from './logo.svg';
import './App.css';
import * as Tone from "tone";
import G from 'glob';
import Granim from 'react-granim'
import { useEffect } from 'react';
/*
import bassmp3 from './sounds/bass1.mp3';
import hihatmp3 from './sounds/drumhihat1.mp3';
import vibesmp3 from './sounds/vibes1.mp3';
import guitarwav from './sounds/guitar1.wav';
import tambourinewav from './sounds/tambourine.wav';
*/
import * as MusicVars from './musicVars.js';
import * as MusicFuncs from './music.js';
import { getWeather } from './weather';
import { Helmet } from "react-helmet";

const { Chord, Progression, Scale } = require("@tonaljs/tonal");

function App() {
  /*
  // declare samples
  const piano = new Tone.Sampler({
    urls: {
      C4: "C4.mp3",
      C5: "C5.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/salamander/",
    volume: -4
  }).toDestination();

  const bell = new Tone.Sampler(
    { C4: vibesmp3 },
    { 
      onload: () => {
        console.log("loaded vibes");
      }
    }
    ).toDestination();

  const guitar = new Tone.Sampler(
    { G4: guitarwav },
    { 
      onload: () => {
        console.log("loaded guitar");
        guitar.volume.value = -10;
      }
    }
  ).toDestination();

  const hihat = new Tone.Sampler(
    { C1: hihatmp3 },
    { 
      onload: () => {
        console.log("loaded hihat");
        hihat.volume.value = -10;
      }
    },
  ).toDestination();

  const tambourine = new Tone.Sampler(
    { C1: tambourinewav },
    { 
      onload: () => {
        console.log("loaded tambourine");
        tambourine.volume.value = -10;
      }
    }
  ).toDestination();

  const bassPluck = new Tone.Sampler(
    { C4: bassmp3 },
    { 
      onload: () => {
        console.log("loaded bass");
        bassPluck.volume.value = -10;
      }
    }
  ).toDestination();

  const synth = new Tone.PolySynth().toDestination();
  const kickDrum = new Tone.MembraneSynth({
    volume: -6
  }).toDestination();

  // declare chords
  const iimin7 = Chord.getChord("min7", "A4", "A4");
  const V7 = Chord.getChord("7", "D4", "A4");
  const IMaj7 = Chord.getChord("maj7", "G4", "G4");
  const I6 = Chord.getChord("6", "G4", "G4");
  const vimin7 = Chord.getChord("min7", "E4", "E4");
  const iiimin7 = Chord.getChord("min7", "B4", "B4");
  const bII7b5 = Chord.getChord("7b5", "G#4", "G#4");
  const II7 = Chord.getChord("7", "A4", "A4");
  const IVMaj7 = Chord.getChord("maj7", "C4", "G4");
  const viimin7 = Chord.getChord("min7", "F#4", "F#4");
  const III7 = Chord.getChord("7", "B3", "F#4");

  // declare chord progressions
  // chord progressions will be 8 measures
  let twoFiveOne = [
    iimin7.notes,
    V7.notes,
    IMaj7.notes,
    I6.notes
  ];
  twoFiveOne = twoFiveOne.concat(twoFiveOne);

  let rainingOutsideProg = [
    vimin7.notes,
    iiimin7.notes,
    iimin7.notes,
    IMaj7.notes
  ];
  rainingOutsideProg = rainingOutsideProg.concat(rainingOutsideProg);

  let nardisBridge = [
    iiimin7.notes,
    IMaj7.notes,
    iiimin7.notes,
    IMaj7.notes
  ];
  nardisBridge = nardisBridge.concat(nardisBridge);

  let ipanema = [
    IMaj7.notes, IMaj7.notes, II7.notes, II7.notes,
    iimin7.notes, bII7b5.notes, IMaj7.notes, bII7b5.notes
  ];

  let autumnLeaves = [
    iimin7.notes, V7.notes, IMaj7.notes, IVMaj7.notes,
    viimin7.notes, III7.notes, vimin7.notes, vimin7.notes
  ];

  const progressions = [twoFiveOne, rainingOutsideProg, nardisBridge, ipanema];

  // declare rhythms for 1 measure
  const oneNote = [{ time: '0:0' }];

  const daytimeRhythm1 = [
    { time: '0:0' },
    { time: '0:1' },
    { time: '0:3' },
  ];

  const daytimeRhythm2 = [
    { time: '0:0' },
    { time: '0:0:2' },
    { time: '0:1:2' },
    { time: '0:2:2' },
    { time: '0:3:2' },
  ]

  const twoFourRhythm = [
    { time: '0:1' },
    { time: '0:3' },
  ]

  const twoFourEigthRhythm = [
    { time: '0:1' },
    { time: '0:3' },
    { time: '0:3:2' },
  ]

  const twoThreeClaveRhythm1 = [
    { time: '0:1' },
    { time: '0:2' },
  ]

  const twoThreeClaveRhythm2 = [
    { time: '0:0' },
    { time: '0:1:2' },
    { time: '0:3' }
  ]

  const oneFourRhythm = [
    { time: '0:0' },
    { time: '0:3' }
  ]

  const eigthNoteRhythm = [
    { time: '0:0' },
    { time: '0:0:2' },
    { time: '0:1' },
    { time: '0:1:2' },
    { time: '0:2' },
    { time: '0:2:2' },
    { time: '0:3' },
    { time: '0:3:2' }
  ]

  const dottedQuarterEigth = [
    { time: '0:0' },
    { time: '0:1:2' },
    { time: '0:2:0' },
    { time: '0:3:2' }
  ];

  const progressionRhythms = [
    [oneNote],
    [oneFourRhythm, oneNote],
    [daytimeRhythm1, daytimeRhythm2],
    [twoThreeClaveRhythm1, twoThreeClaveRhythm2],
    [twoThreeClaveRhythm2, twoThreeClaveRhythm1],
  ]

  const percRhythms = [
    [oneNote],
    [oneFourRhythm],
    [twoThreeClaveRhythm1, twoThreeClaveRhythm2],
    [twoThreeClaveRhythm2, twoThreeClaveRhythm1],
    [eigthNoteRhythm]
  ]
  */

  /*
  // get random integer
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // get random note in chord
  function getRandomNote(chord) {
    chord = Chord.detect(chord)[0];
    let bass = chord.substr(0, 1);
    //console.log(chord);
    if (chord.includes('/')) {
      chord = chord.split('/');
      chord = chord[0];
    }
    let scale = Chord.chordScales(chord[0]);
    scale = scale[0];
    //console.log(scale);
    const notes = Scale.get("G " + scale);
    const noteMax = notes.notes.length;
    let note = notes.notes[getRandomInt(noteMax)];
    note = note + (getRandomInt(2) + 4)
    return note;
  }

  // generate a melody
  function generateMelody(progression, totalLength) {
    let melody = [];
    for (let measure = 0; measure < totalLength; measure++) {
      if (getRandomInt(6) == 2) continue;
      let progLength = progression.length;
      let chord = progression[measure % progLength];
      for (let beat = 0; beat < 4; beat++) {
        if (getRandomInt(3) == 2) continue;
        for (let subdivision = 0; subdivision < 2; subdivision++) {
          if (getRandomInt(2) == 1) continue;
          const note = getRandomNote(chord);
          const time = measure + ':' + beat + ':' + subdivision*2;
          const entry = { 'time': time, 'note': note, 'duration': '8n' };
          melody.push(entry);
        }
      }
    }
    return melody;
  }

  function getBassNotes(progression) {
    let bassNotes = [];
    progression.forEach(chord => {
      bassNotes.push([chord[0]]);
    });
    return bassNotes;
  }

  // constant note, varying rhythm
  function makePerc(instrument, notes, duration, rhythm, start, loop, loopEnd) {
    const part = new Tone.Part(function(time) {
      instrument.triggerAttackRelease(notes, duration, time);
    }, rhythm).start(start);
    part.loop = loop;
    part.loopEnd = loopEnd;
    return part;
  }

  // make a melody
  function makeMelody(instrument, melody, loop, loopEnd) {
    const part = new Tone.Part(function(time, note) {
      instrument.triggerAttackRelease(note.note, note.duration, time);
    }, melody).start(0);
    part.loop = loop;
    part.loopEnd = loopEnd;
    return part
  }

  // make chord progression with block chords and rhythm
  function makeProgression(instrument, progression, duration, rhythms, 
    measuresPerChord, loop, loopEnd) {
      if (instrument == null) return; 
      let parts = [];
      let start = 0;
      let counter = 0;
      let rhythm = rhythms[counter];
      progression.forEach(chord => {
        let measure = start + "m";
        const part = makePerc(instrument, chord, duration, rhythm,
          measure, loop, loopEnd);
        parts.push(part);
        start = start + measuresPerChord;
        counter = (counter + 1) % rhythms.length;
        rhythm = rhythms[counter];
      });
      return parts;
    }
  */
  // declare tempo
  let bpm = 80;
  let progression, progRhythm, bassRhythm, percRhythm;
  let progDuration, bassNotes, percNotes;
  let melodyInst, progInst, bassInst, percInst;
  getWeather();
  
  function setMorning() {
    progression = MusicVars.twoFiveOne;
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
    progression = MusicVars.autumnLeaves;
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
    progression = MusicVars.nardisBridge;
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
    progression = MusicVars.rainingOutside;
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
    progression = MusicVars.ipanema;
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

  function startSong() {
    const melody1 = MusicFuncs.generateMelody(progression, 8);
    const melodyPart1 = MusicFuncs.makeMelody(melodyInst, melody1, false, '0:0');
    const perc1 = MusicFuncs.makeProgression(percInst, percNotes, "8n", percRhythm, 1, true, '2:0');
    const backingChords1 = MusicFuncs.makeProgression(progInst, progression, progDuration, progRhythm, 
      1, false, '8:0');
    const bass1 = MusicFuncs.makeProgression(bassInst, bassNotes, '8n', bassRhythm, 
      1, false, '8:0');
  }

  function startTone() {
    //console.log(melody1);
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

  function adjustForWeather(weatherID) {
    let screenBg = document.getElementById("screen-background");
    let startButton = document.getElementById("start-button");
    let weatherMain = Math.floor(weatherID / 100);
    //console.log(weatherMain);
    let taggedWeathers = [2, 3, 5, 6];
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

  useEffect(() => {
    let screenBg = document.getElementById("screen-background");
    let startButton = document.getElementById("start-button");
    screenBg.classList.remove('background-morning');
    screenBg.classList.remove('background-afternoon');
    screenBg.classList.remove('background-night');
    screenBg.classList.remove('background-rain');
    screenBg.classList.remove('background-snow');
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

    getWeather(adjustForWeather);
  });

  return (
    <div id="screen-background" className="animated-background background-afternoon">
      <button id='start-button' onClick={() => startTone()}>Start</button>
    </div>
  );
}

export default App;
