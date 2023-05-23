import React from "react";
import '../css/Start.css'
import { NavLink, useNavigate } from "react-router-dom";

const Start = () =>{
    return( 
        <div className="start">
            <div className="start-block">
                <h1>Добро пожаловать в сервис</h1>
                <div className="introduce">
                    <p>Этот сервис предназначен для обработки аудиофайлов форматов .mp3, .wav, .mp4</p>
                </div>
                <NavLink to='/interface'>
                    <button className="btn-start">Press me</button>
                </NavLink>
            </div>
        </div>
    )
}

export default Start