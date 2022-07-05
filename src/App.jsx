import React, {useState} from 'react';
import api from "./services/api.js";
import Presentation from './components/presentation/presentation';
import Card from './components/card/card';
import PokemonCards from './components/pokemonCards/pokemonCards';

import './App.css';

const App = () => {
  const [typedPokemon, setTypedPokemon] = useState('');

  const handleChange = (event) => {
    setTypedPokemon(event.target.value);
  };
  
  return (
    <div className="appBackground">
      <Presentation />
      <div>
        <div className="appSearch">
          <p className="appText">Enter pokemon name or id: </p>
          <input 
            value={typedPokemon}
            placeholder="Pokemon name/id"
            onChange={handleChange}
          />
        </div>
        <br></br>
        {typedPokemon ? <Card pokemonID={typedPokemon} key={'typed_'+typedPokemon}/> : <PokemonCards />}
      </div>
      
           
      
    </div>
  )
}

export default App;
