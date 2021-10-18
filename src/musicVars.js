import * as Tone from "tone";
// import sound files
import bassmp3 from './sounds/bass1.mp3';
import hihatmp3 from './sounds/drumhihat1.mp3';
import vibesmp3 from './sounds/vibes1.mp3';
import guitarwav from './sounds/guitar1.wav';
import tambourinewav from './sounds/tambourine.wav';

const { Chord } = require("@tonaljs/tonal");

// samples
export const piano = new Tone.Sampler({
  urls: {
    C4: "C4.mp3",
    C5: "C5.mp3",
  },
  baseUrl: "https://tonejs.github.io/audio/salamander/",
  volume: -4
}).toDestination();

export const bell = new Tone.Sampler(
  { C4: vibesmp3 },
  { 
    onload: () => {
      console.log("loaded vibes");
    }
  }
  ).toDestination();

export const guitar = new Tone.Sampler(
  { G4: guitarwav },
  { 
    onload: () => {
      console.log("loaded guitar");
      guitar.volume.value = -10;
    }
  }
).toDestination();

export const hihat = new Tone.Sampler(
  { C1: hihatmp3 },
  { 
    onload: () => {
      console.log("loaded hihat");
      hihat.volume.value = -10;
    }
  },
).toDestination();

export const tambourine = new Tone.Sampler(
  { C1: tambourinewav },
  { 
    onload: () => {
      console.log("loaded tambourine");
      tambourine.volume.value = -10;
    }
  }
).toDestination();

export const bassPluck = new Tone.Sampler(
  { C4: bassmp3 },
  { 
    onload: () => {
      console.log("loaded bass");
      bassPluck.volume.value = -10;
    }
  }
).toDestination();

export const synth = new Tone.PolySynth().toDestination();
export const kickDrum = new Tone.MembraneSynth({
  volume: -6
}).toDestination();

// declare chords
export const IMaj7 = Chord.getChord("maj7", "G4", "G4");
export const I6 = Chord.getChord("6", "G4", "G4");
export const imin7 = Chord.getChord("min7", "G4", "G4");
export const bII7b5 = Chord.getChord("7b5", "G#4", "G#4");
export const bIIMaj7 = Chord.getChord("Maj7", "G#4", "G#4");
export const II7 = Chord.getChord("7", "A4", "A4");
export const iimin7 = Chord.getChord("min7", "A4", "A4");
export const III7 = Chord.getChord("7", "B3", "F#4");
export const iiimin7 = Chord.getChord("min7", "B4", "B4");
export const IVMaj7 = Chord.getChord("maj7", "C4", "G4");
export const ivmin = Chord.getChord("maj7", "C4", "Bb4");
export const V7 = Chord.getChord("7", "D4", "A4");
export const vimin7 = Chord.getChord("min7", "E4", "E4");
export const VII7b5 = Chord.getChord("min7", "F#4", "F#4");
export const viimin7 = Chord.getChord("min7", "F#4", "F#4");

// declare chord progressions
// chord progressions will be 8 measures
let twoFiveOneProg = [
  iimin7.notes,
  V7.notes,
  IMaj7.notes,
  I6.notes
];
twoFiveOneProg = twoFiveOneProg.concat(twoFiveOneProg);
export const twoFiveOne = twoFiveOneProg;

let rainingOutsideProg = [
  vimin7.notes,
  iiimin7.notes,
  iimin7.notes,
  IMaj7.notes
];
rainingOutsideProg = rainingOutsideProg.concat(rainingOutsideProg);
export const rainingOutside = rainingOutsideProg;

let nardisBridgeProg = [
  iiimin7.notes,
  IMaj7.notes,
  iiimin7.notes,
  IMaj7.notes
];
nardisBridgeProg = nardisBridgeProg.concat(nardisBridgeProg);
export const nardisBridge = nardisBridgeProg;

export let ipanema = [
  IMaj7.notes, IMaj7.notes, II7.notes, II7.notes,
  iimin7.notes, bII7b5.notes, IMaj7.notes, bII7b5.notes
];

export let autumnLeaves = [
  iimin7.notes, V7.notes, IMaj7.notes, IVMaj7.notes,
  viimin7.notes, III7.notes, vimin7.notes, vimin7.notes
];

export let greenDolphin = [
  IMaj7.notes, IMaj7.notes, imin7.notes, imin7.notes,
  II7.notes, bIIMaj7.notes, IMaj7.notes, IMaj7.notes
]

export let redClay = [
  iiimin7.notes, iiimin7.notes, iimin7.notes, V7.notes,
  IMaj7.notes, IMaj7.notes, IMaj7.notes, IMaj7.notes
]

export const chordProgressions = [ twoFiveOne, rainingOutside, 
  nardisBridge, ipanema, autumnLeaves, greenDolphin ];

// declare rhythms for 1 measure
export const oneNote = [{ time: '0:0' }];

export const daytimeRhythm1 = [
  { time: '0:0' },
  { time: '0:1' },
  { time: '0:3' },
];

export const daytimeRhythm2 = [
  { time: '0:0' },
  { time: '0:0:2' },
  { time: '0:1:2' },
  { time: '0:2:2' },
  { time: '0:3:2' },
]

export const twoFourRhythm = [
  { time: '0:1' },
  { time: '0:3' },
]

export const twoFourEigthRhythm = [
  { time: '0:1' },
  { time: '0:3' },
  { time: '0:3:2' },
]

export const twoThreeClaveRhythm1 = [
  { time: '0:1' },
  { time: '0:2' },
]

export const twoThreeClaveRhythm2 = [
  { time: '0:0' },
  { time: '0:1:2' },
  { time: '0:3' }
]

export const oneFourRhythm = [
  { time: '0:0' },
  { time: '0:3' }
]

export const eigthNoteRhythm = [
  { time: '0:0' },
  { time: '0:0:2' },
  { time: '0:1' },
  { time: '0:1:2' },
  { time: '0:2' },
  { time: '0:2:2' },
  { time: '0:3' },
  { time: '0:3:2' }
]

export const dottedQuarterEigth = [
  { time: '0:0' },
  { time: '0:1:2' },
  { time: '0:2:0' },
  { time: '0:3:2' }
];

export const progressionRhythms = [
  [oneNote],
  [oneFourRhythm, oneNote],
  [daytimeRhythm1, daytimeRhythm2],
  [twoThreeClaveRhythm1, twoThreeClaveRhythm2],
  [twoThreeClaveRhythm2, twoThreeClaveRhythm1],
]

export const percRhythms = [
  [oneNote],
  [oneFourRhythm],
  [twoThreeClaveRhythm1, twoThreeClaveRhythm2],
  [twoThreeClaveRhythm2, twoThreeClaveRhythm1],
  [eigthNoteRhythm]
]