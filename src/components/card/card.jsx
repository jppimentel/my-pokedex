import React, { useState, useEffect } from 'react';
import api from "../../services/api.js";
import PokemonTypes from '../pokemonTypes/pokemonTypes';


import './card.css';

function Card(props) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getPokemon(id) { 
      if(!id){
          return;
      }
      setIsLoading(true);
      try{
          const response = await api.get(`/pokemon/${id}`);
          setPokemon(response.data);
          setError(null);
      } catch(error){
          setPokemon(null);
          setError("Pokemon not found!");
      } finally{
          setIsLoading(false);
      }   
  };

  useEffect(() => {
      getPokemon(props.pokemonID);
  }, []);  
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  return (
    <>
      {pokemon && (
      <div className='card' key={pokemon.id}>
        {isLoading ? (<p>Loading</p> ) : (
          <>
            { !error && (
              <>
                <div>
                  <p className='cardID'><strong>#{pokemon.id}</strong></p>
                  <h2 className='cardTitle'>{capitalizeFirstLetter(pokemon.name)}</h2>
                  <img 
                    className="pokemonImage"
                    src={pokemon.sprites['front_default']}
                    alt={pokemon.name}
                  />
                </div>
                <div>
                  {/* <span>
                    <strong>Height</strong>: {pokemon.height*10} cm
                  </span>
                  <br></br>
                  <span>
                    <strong>Weight</strong>: {pokemon.weight/10} kg
                  </span>
                  <br></br>
                  <br></br> */}
                    <div className='types'>
                      {pokemon.types[0] && (
                         <PokemonTypes type={capitalizeFirstLetter(pokemon.types[0].type.name)} /> 
                      )}
                      {pokemon.types[1] && (
                         <PokemonTypes type={capitalizeFirstLetter(pokemon.types[1].type.name)} /> 
                      )}
                    </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      )}
    </>
  );
}

export default Card;
