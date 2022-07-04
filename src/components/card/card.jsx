import React, { useState, useEffect } from 'react';
import api from "../../services/api.js";

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
    

    
    
    
    return (<>
        {pokemon && (
        <div className='card' key={pokemon.id}>
          {isLoading ? (<p>Loading</p> ) : (
            <>
              <div>
                <h2>{pokemon.name}</h2>
                <img 
                  src={pokemon.sprites['front_default']}
                  alt={pokemon.name}
                />
              </div>
              <div>
                <span>
                  <strong>Height</strong>: {pokemon.height*10} cm
                </span>
                <br></br>
                <span>
                  <strong>Weight</strong>: {pokemon.weight/10} kg
                </span>
                <br></br>
                <span>
                  <strong>Type</strong>: {pokemon.types[0].type.name}
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </>
    );
}

export default Card;
