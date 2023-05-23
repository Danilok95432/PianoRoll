import React from "react";
import { connect } from "react-redux";
import Synth from "./Synth";
import { changePlayingAC } from "../redux/synthReducer";


let mapStateToProps = (state) =>{
    return{
        isPlaying: state.synth.isPlaying,
        inst: state.synth
    }
}

let mapDispatchToProps = (dispatch) =>{
    return{
        tooglePlayer: (statePlay) =>{
            dispatch(changePlayingAC( statePlay ))
        }
    }
}

const SynthContainer = connect(mapStateToProps, mapDispatchToProps)(Synth)

export default SynthContainer
