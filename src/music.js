import * as Tone from "tone";
const { Chord, Scale } = require("@tonaljs/tonal");

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// get random note in chord
export function getRandomNote(chord) {
  chord = Chord.detect(chord)[0];
  //console.log(chord);
  if (chord.includes('/')) {
    chord = chord.split('/');
    chord = chord[0];
  }

  let scale = Chord.chordScales(chord[0]);
  scale = scale[0];
  const notes = Scale.get("G " + scale);
  const noteMax = notes.notes.length;
  let note = notes.notes[getRandomInt(noteMax)];
  note = note + (getRandomInt(2) + 4) // set random octave
  return note;
}

// generate a melody
// generate a random note for a random beat
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

// get bass note of chord
export function getBassNotes(progression) {
  let bassNotes = [];
  progression.forEach(chord => {
    bassNotes.push([chord[0]]);
  });
  return bassNotes;
}

// this part has constant note, varying rhythm
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