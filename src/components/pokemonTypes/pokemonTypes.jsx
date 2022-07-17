import React, { useState, useEffect } from 'react';

import './pokemonTypes.css';
import '../../configurations/colors.css';

function PokemonTypes(props) { 
  const typeColor = getComputedStyle(document.documentElement).getPropertyValue('--colorType' + props.type).replaceAll('"', '');
 
  const styleColor = {
    backgroundColor: typeColor
  };
  
  return (
    <>
        <div className='pokemonType' style={styleColor}>
            <strong>{props.type}</strong>
        </div>
    </>
  );
}

export default PokemonTypes;
