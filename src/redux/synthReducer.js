import React from "react";
import * as Tone from 'tone'

class Instrument{
  constructor() {
      this.synth = null;
      this.gain = new Tone.Gain(0.7).toDestination();
      this.reverb = null;
      this.tick = 0;
      this.setNotes(4);    
    }
  setNotes(octave) {
    this.notes = "CDEFGAB".split('').map(n => `${n}${octave}`);
  }
  
  initializeTransportAuto() {
  Tone.Transport.scheduleRepeat(time => {
      let note = this.notes[(this.tick * 2) % this.notes.length];
      if (this.synth) this.synth.triggerAttackRelease(note, "8n", time);
      this.tick++;
  }, "4n");
  }

  initializeTransportKey(note) {
      if (this.synth) this.synth.triggerAttackRelease(note, "8n");
      this.tick++;
  }

  update(synthType, oscillatorType, oscillatorPartials, envelope, reverb, distortion, phaser, compressor) {
      this._updateSynthType(synthType, envelope,reverb, distortion, phaser, compressor);
      this._updateOscillatorType(oscillatorType, oscillatorPartials);
    }
    
    _updateSynthType(synthType, envelope,reverb, distortion, phaser, compressor) {
      if (this.synth) {        
        this.synth.disconnect(this.gain);
        this.synth.dispose();
      }
      let settings = this.defaultSettings[synthType] || {};
      settings.envelope = Object.assign(settings.envelope, envelope);
      this.synth = new Tone[synthType](settings);
      this.synth.connect(this.gain);
      if(reverb)
      {
        this.reverb = new Tone.Reverb(2.5);
        this.reverb.generate();
        this.reverb.connect(this.gain);
        this.synth.connect(this.reverb);
      }
      if(phaser)
      {
        let newPhaser = new Tone.Phaser({
          "frequency" : 0.5,
          "octaves" : 5,
          "baseFrequency" : 1000
        }).toDestination();
        this.synth.connect(newPhaser);
      }

      if(distortion)
      {
        let newDist = new Tone.Distortion(0.8).toDestination();
        this.synth.connect(newDist);
      }
      if(compressor)
      {
        let newComp = new Tone.Compressor(-30,3).toDestination();
        this.synth.connect(newComp);
      }
      this.previosSynth = synthType
    }
    
    _updateOscillatorType(oscillatorType, oscillatorPartials) {
      let partials = oscillatorPartials === 'none' ? '' : oscillatorPartials;
      this.synth.oscillator.type = `${oscillatorType}${partials}`;
    }
    
    get defaultSettings() {
      return {
        Synth: {
          oscillator: { type: "triangle" },
          envelope: {
            attack: 0.005,
            decay: 0.1,
            sustain: 0.3,
            release: 1
          }
        },
        AMSynth: {
          harmonicity: 3,
          detune: 0,
          oscillator: {
            type: "sine"
          },
          envelope: {
            attack: 0.01,
            decay: 0.01,
            sustain: 1,
            release: 0.5
          },
          modulation: {
            type: "square"
          },
          modulationEnvelope: {
            attack: 0.5,
            decay: 0,
            sustain: 1,
            release: 0.5
          }
        },
        FMSynth: {
          harmonicity: 3,
          modulationIndex: 10,
          detune: 0,
          oscillator: {
            type: "sine"
          },
          envelope: {
            attack: 0.01,
            decay: 0.01,
            sustain: 1,
            release: 0.5
          },
          modulation: {
            type: "square"
          },
          modulationEnvelope: {
            attack: 0.5,
            decay: 0,
            sustain: 1,
            release: 0.5
          }
        }
      };
    }
}

const CHANGE_PLAY = 'CHANGE-PLAY'

let inst = new Instrument()

const synthReducer = (state = inst, action) =>{
    switch(action.type){
        case CHANGE_PLAY:{
            return{
                ...state,
                isPlaying: !state.isPlaying
            }
        }
    }
    return state;
}

export let changePlayingAC = (statePlay) =>{
    return{
        type: CHANGE_PLAY,
        statePlay: statePlay
    }
}




export default synthReducer