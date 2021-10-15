import logo from './logo.svg';
import './App.css';
import * as Tone from "tone";
import G from 'glob';
const { Chord, Progression, Scale } = require("@tonaljs/tonal");

function App() {

  //create a synth and connect it to the main output (your speakers)
  const piano = new Tone.Sampler({
    urls: {
      C4: "C4.mp3",
      C5: "C5.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/salamander/",
  }).toDestination();

  const bell = new Tone.Sampler({
    urls: {
      E4: "glasshit1.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/berklee/",
  }).toDestination();

  const guitar = new Tone.Sampler({
    urls: {
      G4: "guitar_Gstring.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/berklee/",
  }).toDestination();

  const hihat = new Tone.Sampler({
    urls: {
      C1: "Kit3/hihat.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/drum-samples/",
  }).toDestination();

  const synth = new Tone.PolySynth().toDestination();
  const kickDrum = new Tone.MembraneSynth({
    volume: 6
  }).toDestination();

  const iimin7 = Chord.getChord("min7", "A4", "A4");
  const V7 = Chord.getChord("7", "D4", "A4");
  const IMaj7 = Chord.getChord("maj7", "G4", "G4");
  const I6 = Chord.getChord("6", "G4", "G4");
  const viimin7 = Chord.getChord("min7", "E5", "E5");
  const iiimin7 = Chord.getChord("min7", "B4", "B4");

  const BPM = 80;

  const twoFiveOne = [
    iimin7.notes,
    V7.notes,
    IMaj7.notes,
    I6.notes
  ];

  const rainingOutsideProg = [
    viimin7.notes,
    iiimin7.notes,
    iimin7.notes,
    IMaj7.notes
  ];

  const nardisBridge = [
    iiimin7.notes,
    IMaj7.notes,
    iiimin7.notes,
    IMaj7.notes
  ];

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

  const twoThreeClaveRhythm = [
    { time: '0:1' },
    { time: '0:2' },
    { time: '1:0' },
    { time: '1:1:2' },
    { time: '1:3' },
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

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

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

  function makePerc(instrument, notes, duration, rhythm, start, loop, loopEnd) {
    const part = new Tone.Part(function(time) {
      instrument.triggerAttackRelease(notes, duration, time);
    }, rhythm).start(start);
    part.loop = loop;
    part.loopEnd = loopEnd;
    return part;
  }

  const melody1 = generateMelody(nardisBridge, 4);

  const melodyPart1 = new Tone.Part(function(time, note) {
    bell.triggerAttackRelease(note.note, note.duration, time);
  }, melody1).start(0);
  melodyPart1.loop = true;
  melodyPart1.loopEnd = '4:0';

  //const perc1 = makePerc(hihat, "C1", "8n", eigthNoteRhythm, 0, true, '1:0');

  const backingChords1 = makePerc(piano, nardisBridge[0],
    '1m', oneNote, 0, true, '4:0');
  //const backingChords1 = new Tone.Part(function(time) {
  //  synth.triggerAttackRelease(rainingOutsideProg[0], '8n', time);
  //}, daytimeRhythm1).start(0);

  const backingChords2 = makePerc(piano, nardisBridge[1],
    '1m', oneNote, 2, true, '4:0');

  const backingChords3 = makePerc(piano, nardisBridge[2],
    '1m', oneNote, 4, true, '4:0');

  const backingChords4 = makePerc(piano, nardisBridge[3],
    '1m', oneNote, 6, true, '4:0');

  function startTone() {
    console.log(melody1);
    if (Tone.Transport.state !== 'started') {
      Tone.start();
      Tone.Transport.bpm.value = BPM;
      Tone.Transport.loop = true;
      Tone.Transport.loopEnd = '8:0';
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      <button className="note" onClick={() => startTone()}>
          Start
        </button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload!!
        </p>
      </header>
    </div>
  );
}

export default App;
