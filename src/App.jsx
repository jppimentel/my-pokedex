import React, {useState} from 'react';
import api from "./services/api.js";
import Presentation from './components/presentation/presentation';
import PokemonCards from './components/pokemonCards/pokemonCards';

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [typedPokemon, setTypedPokemon] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setTypedPokemon(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!typedPokemon){
      return;
    }
    setIsLoading(true);
    try{
      const response = await api.get(`/pokemon/${typedPokemon}`);
      setPokemon(response.data);
      setError(null);
    } catch(error){
      setPokemon(null);
      setError("Pokemon not found!");
    } finally{
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <Presentation />
      <p>Enter pokemon name or id</p>
      <form onSubmit={handleSubmit}>
        <input 
          value={typedPokemon}
          placeholder="Pokemon name/id"
          onChange={handleChange}
        />
        <button type="submit">
          { isLoading ? (
            <span>loading...</span>
          ) : (
            <>
              Search
            </>
          )}
        </button>
      </form> 
      <PokemonCards />     
      
    </div>
  )
}

export default App;
