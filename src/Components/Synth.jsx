import React, { useEffect, useState } from "react";
import * as Tone from 'tone'
import '../css/Synth.css'
import PianoRoll from "./PianoRoll";

const Synth = (props) =>{

    const defaultNotes = "CDEFGAB".split('').map(n => `${n}${2}`);

    let steps = [0, 0.001, 0.005, 0.01, 0.05, 0.1, 0.125, 0.25, 0.5, 0.75, 1];
    const [play, setPlay] = useState(true);

    const [octave, setOctave] = useState(2);
    const [synth, setSynth] = useState('Synth');
    const [oscillator, setOscillator] = useState('triangle');
    const [partials, setPartials] = useState('none');

    const [attack, setAttack] = useState(0.001);
    const [decay, setDecay] = useState(0.001);
    const [sustain, setSustain] = useState(0.5);
    const [release, setRelease] = useState(0.125); 

    const [reverb,setReverb] = useState(false)
    const [phaser,setPhaser] = useState(false)
    const [distortion,setDistortion] = useState(false)
    const [compressor,setCompressor] = useState(false)

    let envelope = {
        attack: attack,
        decay: decay,
        sustain: sustain,
        release: release
    }


    useEffect( () => {
        console.log(props.inst.synth)  
        props.inst.setNotes(octave)
        props.inst.update(synth, oscillator, partials, envelope, reverb, distortion, phaser, compressor);
    },[synth, oscillator, partials, envelope,octave,reverb,phaser,distortion, compressor])

    let activeButton = ' active-button'
    
    return(
        <div className="synth">
            <PianoRoll instrument={props.inst} synth={synth} oscillator={oscillator} partials={partials} envelope={envelope} octave={octave}/>
            <div className="container">
                <section className="section">
                    <div className="field">
                        <label className="label" htmlFor="octave">Octave</label>
                        <span className="select is-fullwidth">
                        <select id="octave" onChange={ e => setOctave(e.target.value)}>
                            <option defaultValue="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                        </span>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="synth-type">Synth Type</label>
                        <span className="select is-fullwidth">
                        <select id="synth-type" onChange={ e => setSynth(e.target.value)}>
                            <option defaultValue="Synth">Synth</option>
                            <option value="AMSynth">AMSynth</option>
                            <option value="FMSynth">FMSynth</option>
                        </select>
                        </span>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="oscillator-type">Oscillator Type</label>
                        <span className="select is-fullwidth">
                        <select id="oscillator-type" onChange={ e => setOscillator(e.target.value)}>
                            <option defaultValue="triangle">triangle</option>
                            <option value="sawtooth">sawtooth</option>
                            <option value="sine">sine</option>
                            <option value="square">square</option>
                        </select>
                        </span>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="oscillator-partials">Oscillator Partials</label>
                        <span className="select is-fullwidth">
                        <select id="oscillator-partials" onChange={ e => setPartials(e.target.value)}>
                            <option defaultValue="none">none</option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="8">8</option>
                            <option value="16">16</option>
                            <option value="32">32</option>
                            <option value="64">64</option>
                        </select>
                        </span>
                    </div>
                
                    <div className="field">
                        <label className="label" htmlFor="envelope-attack">Attack <span>{attack}</span></label>
                        <div className="control">
                            <input id="envelope-attack" className="input is-fullwidth" defaultValue="1" min="0" max="10" step="1" type="range" onChange={ e => setAttack(steps[parseInt(e.target.value)])}></input>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="envelope-decay">Decay <span>{decay}</span></label>
                        <div className="control">
                            <input id="envelope-decay" className="input is-fullwidth" defaultValue="1" min="0" max="10" step="1" type="range" onChange={ e => setDecay(steps[parseInt(e.target.value)])}></input>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="envelope-sustain">Sustain <span>{sustain}</span></label>
                        <div className="control">
                            <input id="envelope-sustain" className="input is-fullwidth" defaultValue="9" min="0" max="10" step="1" type="range" onChange={ e => setSustain(steps[parseInt(e.target.value)])}></input>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="envelope-release">Release <span>{release}</span></label>
                        <div className="control">
                            <input id="envelope-release" className="input is-fullwidth" defaultValue="7" min="0" max="10" step="1" type="range" onChange={ e => setRelease(steps[parseInt(e.target.value)])}></input>
                        </div>
                    </div>
                    
                    <div className="field">
                        <button className="button is-success" id="toggle" onClick={ () => { 
                            if (play){
                                Tone.Transport.bpm.value = 140;
                                Tone.Transport.start(); 
                                props.inst.update(synth, oscillator, partials, envelope, reverb, distortion, phaser);
                                props.inst.initializeTransportAuto();
                            }
                            else Tone.Transport.stop(); 
                            setPlay(!play);
                            } 
                            }>
                            {
                                !play ? 
                                <span>Pause</span>
                                :
                                <span>Play</span>
                            }
                        </button>
                        <div className="controls-group">
                        <button className={!reverb ? 'auto-play' + activeButton : 'auto-play'} onClick={ () => 
                       {
                            setReverb(!reverb);
                        } 
                    }>
                        {
                            !reverb ? 
                            'Reverb on' : 'Reverb off'
                        }
                        </button>
                        <button className={!phaser ? 'auto-play' + activeButton : 'auto-play'} onClick={ () => 
                       {
                            setPhaser(!phaser);
                        } 
                    }>
                        {
                            !phaser ? 
                            'Phaser on' : 'Phaser off'
                        }
                        </button>
                        <button className={!distortion ? 'auto-play' + activeButton : 'auto-play'} onClick={ () => 
                        {
                            setDistortion(!distortion);
                        } 
                    }>
                        {
                            !distortion ? 
                            'Distortion on' : 'Distortion off'
                        }
                        </button>
                        <button className={!compressor ? 'auto-play' + activeButton : 'auto-play'} onClick={ () => 
                        {
                            setCompressor(!compressor);
                        } 
                    }>
                        {
                            !compressor ? 
                            'Compressor on' : 'Compressor off'
                        }
                        </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Synth