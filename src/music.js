import * as Tone from "tone";
import * as MusicVars from './musicVars.js';
const { Chord, Scale } = require("@tonaljs/tonal");

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// get random note in chord
export function getRandomNote(chord) {
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
export function generateMelody(progression, totalLength) {
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

export function getBassNotes(progression) {
  let bassNotes = [];
  progression.forEach(chord => {
    bassNotes.push([chord[0]]);
  });
  return bassNotes;
}

// constant note, varying rhythm
export function makePerc(instrument, notes, duration, rhythm, start, loop, loopEnd) {
  const part = new Tone.Part(function(time) {
    instrument.triggerAttackRelease(notes, duration, time);
  }, rhythm).start(start);
  part.loop = loop;
  part.loopEnd = loopEnd;
  return part;
}

// make a melody
export function makeMelody(instrument, melody, loop, loopEnd) {
  const part = new Tone.Part(function(time, note) {
    instrument.triggerAttackRelease(note.note, note.duration, time);
  }, melody).start(0);
  part.loop = loop;
  part.loopEnd = loopEnd;
  return part
}

// make chord progression with block chords and rhythm
export function makeProgression(instrument, progression, duration, rhythms, 
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

  /*
// declare tempo
export let bpm = 80;
export let progression, progRhythm, bassRhythm, percRhythm;
export let progDuration, bassNotes, percNotes;
export let melodyInst, progInst, bassInst, percInst;

export function setMorning() {
  progression = MusicVars.twoFiveOne;
  bpm = getRandomInt(60) + 100;

  progRhythm = [MusicVars.daytimeRhythm1, MusicVars.daytimeRhythm2];
  bassRhythm = [MusicVars.dottedQuarterEigth, MusicVars.dottedQuarterEigth];
  bassNotes = getBassNotes(progression);
  percRhythm = [MusicVars.twoThreeClaveRhythm1, MusicVars.twoThreeClaveRhythm2];
  percNotes = ["C1", "C1"];
  progDuration = "8n"

  melodyInst = MusicVars.synth;
  MusicVars.piano.volume.value = -8;
  progInst = MusicVars.piano;
  bassInst = MusicVars.bassPluck;
  percInst = MusicVars.kickDrum;
}

export function setAfternoon() {
  progression = MusicVars.autumnLeaves;
  bpm = getRandomInt(60) + 80;

  progRhythm = [MusicVars.daytimeRhythm1, MusicVars.daytimeRhythm2];
  bassRhythm = [MusicVars.oneFourRhythm, MusicVars.oneFourRhythm];
  bassNotes = getBassNotes(progression);
  percRhythm = [MusicVars.twoThreeClaveRhythm2];
  percNotes = ["C1", "C1"];
  progDuration = "8n"

  melodyInst = MusicVars.guitar;
  MusicVars.synth.volume.value = -20;
  progInst = MusicVars.synth;
  bassInst = MusicVars.bassPluck;
  percInst = MusicVars.kickDrum;
}

export function setNight() {
  progression = MusicVars.nardisBridge;
  bpm = getRandomInt(30) + 50;

  progRhythm = [MusicVars.oneFourRhythm, MusicVars.oneNote];
  bassRhythm = [MusicVars.dottedQuarterEigth, MusicVars.dottedQuarterEigth];
  bassNotes = getBassNotes(progression);
  percRhythm = [MusicVars.twoThreeClaveRhythm1, MusicVars.twoThreeClaveRhythm2];
  percNotes = ["C1", "C1"];
  progDuration = "1m"

  melodyInst = MusicVars.piano;
  progInst = MusicVars.piano;
  bassInst = null;
  percInst = null;
}

export function setRainy() {
  progression = MusicVars.rainingOutside;
  bpm = getRandomInt(40) + 80;

  progRhythm = [MusicVars.oneNote];
  bassRhythm = [MusicVars.dottedQuarterEigth, MusicVars.dottedQuarterEigth];
  bassNotes = getBassNotes(progression);
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

export function setSnowy() {
  progression = MusicVars.ipanema;
  bpm = getRandomInt(60) + 80;

  progRhythm = [MusicVars.dottedQuarterEigth];
  bassRhythm = [MusicVars.daytimeRhythm1];
  bassNotes = getBassNotes(progression);
  percRhythm = [MusicVars.twoFourEigthRhythm];
  percNotes = ["C1", "C1"];
  progDuration = "1m"

  melodyInst = MusicVars.piano;
  MusicVars.bell.volume.value = -25;
  progInst = MusicVars.bell;
  bassInst = null;
  percInst = MusicVars.tambourine;
}

*/