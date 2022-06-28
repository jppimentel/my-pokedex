import React, {useState} from 'react';
import api from "./services/api.js";

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
      setIsLoading(false);
    } catch(error){
      setPokemon(null);
      setError("Pokemon not found!");
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <h1>Welcome to my Pokedex!</h1>
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
    </div>
  )
}

export default App;
