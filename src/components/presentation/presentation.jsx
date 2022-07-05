import React, { useState } from 'react';
import logo from "../../images/pokemon-logo.jpg";

import './presentation.css';

function Presentation(params) {
    return (<>
        <div className="presentation">
            <img className="presentationImage" src={logo}/>
            <h1 className="presentationText" >Welcome to my Pokedex!</h1>
        </div>
        
    </>
    );
}

export default Presentation;