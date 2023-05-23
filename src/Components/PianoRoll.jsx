import '../css/PianoRoll.css'
import React, { useEffect, useState } from "react";
import * as Tone from 'tone'

const PianoRoll = (props) =>{

    useEffect( () => {
        props.instrument.setNotes(octave)
        props.instrument.update(props.synth, props.oscillator, props.partials, props.envelope);
        const keyDownHandler = event => {
      
            if (event.key === 'q') {
              event.preventDefault();
            }
            switch(event.key){
                case 'q':{
                    props.instrument.initializeTransportKey('C' + props.octave)
                    console.log('User played note: C');
                    break;
                }
                case 'w':{
                    props.instrument.initializeTransportKey('D' + props.octave)
                    console.log('User played note: D');
                    break;
                }
                case 'e':{
                    props.instrument.initializeTransportKey('E' + props.octave)
                    console.log('User played note: E');
                    break;
                }
                case 'r':{
                    props.instrument.initializeTransportKey('C#' + props.octave)
                    console.log('User played note: C#');
                    break;
                }
                case 't':{
                    props.instrument.initializeTransportKey('D#' + props.octave)
                    console.log('User played note: D#');
                    break;
                }
                case 'y':{
                    props.instrument.initializeTransportKey('F' + props.octave)
                    console.log('User played note: F');
                    break;
                }
                case 'u':{
                    props.instrument.initializeTransportKey('G' + props.octave)
                    console.log('User played note: G');
                    break;
                }
                case 'i':{
                    props.instrument.initializeTransportKey('A' + props.octave)
                    console.log('User played note: A');
                    break;
                }
                case 'o':{
                    props.instrument.initializeTransportKey('B' + props.octave)
                    console.log('User played note: B');
                    break;
                }
                case 'p':{
                    props.instrument.initializeTransportKey('F#' + props.octave)
                    console.log('User played note: F#');
                    break;
                }
                case '[':{
                    props.instrument.initializeTransportKey('G#' + props.octave)
                    console.log('User played note: G#');
                    break;
                }
                case ']':{
                    props.instrument.initializeTransportKey('A#' + props.octave)
                    console.log('User played note: A#');
                    break;
                }
            }
          };
      
          document.addEventListener('keydown', keyDownHandler);
          return () => {
            document.removeEventListener('keydown', keyDownHandler);
          };
    },[props.synth, props.oscillator, props.partials, props.envelope, props.octave])


    return(
        <div className="piano-roll-block">
            <div className="top-block">
                <span className="piano-title">Piano Roll</span>
            </div>
            <div className="piano-roll">
                <div className="group">
                    <div className="white-keys">
                        <div className="white-key" onClick={() => props.instrument.initializeTransportKey('C' + props.octave)}><span className="key-name-white">C</span></div>
                        <div className="white-key" onClick={() => props.instrument.initializeTransportKey('D' + props.octave)}><span className="key-name-white">D</span></div>
                        <div className="white-key" onClick={() => props.instrument.initializeTransportKey('E' + props.octave)}><span className="key-name-white">E</span></div>
                    </div>
                    <div className="group-black">
                        <div className="black-keys">
                            <div className="black-key" onClick={() => props.instrument.initializeTransportKey('C#' + props.octave)}><span className="key-name-black">C#</span></div>
                            <div className="black-key" onClick={() => props.instrument.initializeTransportKey('D#' + props.octave)}><span className="key-name-black">D#</span></div>
                        </div>
                    </div>
                </div>
                <div className="group">
                    <div className="white-keys">
                        <div className="white-key" onClick={() => props.instrument.initializeTransportKey('F' + props.octave)}><span className="key-name-white">F</span></div>
                        <div className="white-key" onClick={() => props.instrument.initializeTransportKey('G' + props.octave)}><span className="key-name-white">G</span></div>
                        <div className="white-key" onClick={() => props.instrument.initializeTransportKey('A' + props.octave)}><span className="key-name-white">A</span></div>
                        <div className="white-key" onClick={() => props.instrument.initializeTransportKey('B' + props.octave)}><span className="key-name-white">B</span></div>
                    </div>
                    <div className="group-black group-black-last">
                        <div className="black-keys">
                            <div className="black-key" onClick={() => props.instrument.initializeTransportKey('F#' + props.octave)}><span className="key-name-black">F#</span></div>
                            <div className="black-key" onClick={() => props.instrument.initializeTransportKey('G#' + props.octave)}><span className="key-name-black">G#</span></div>
                            <div className="black-key" onClick={() => props.instrument.initializeTransportKey('A#' + props.octave)}><span className="key-name-black">A#</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PianoRoll