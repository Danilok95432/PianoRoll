import React, { useState } from "react";
import '../css/Interface.css'
import Synth from "./Synth";
import SynthContainer from "./SynthContainer";


const Interface = () =>{
    return(
        <div className="interface">
            <SynthContainer />
        </div>
    )
}

export default Interface