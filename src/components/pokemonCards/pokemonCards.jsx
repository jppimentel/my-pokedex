import React, { useState, useEffect, useRef, useCallback  } from 'react';
import Card from '../card/card';
import './pokemonCards.css';

function PokemonCards(props) {
  const [pokemonID, setPokemonID] = useState(1);
  const [loading, setLoading] = useState(false)
  const [cards, setCards] = useState([]);

  const generateCards = () => {
    if(loading){
      setCards(cards => [...cards, <Card pokemonID={pokemonID} key={pokemonID}/>]);
      setPokemonID(pokemonID+1);
      setLoading(false);
    }
  };


  const observer = useRef()
  const loaderRef = useCallback(node => {
    if (observer.current){
      observer.current.disconnect();
    } 
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting ) {
        setLoading(true)
        generateCards();
        console.log("pokemon: "+pokemonID )
      }
    });
    if (node){
      observer.current.observe(node);
    } 
  }, [loading]);
  
  return (
    <>
      <div className="pokemonCards">
        {cards ? cards : <p>Loading pokemons</p>}
      </div>
      <p ref={loaderRef}>Loading pokemons...</p>
    </>
    
  );
}

export default PokemonCards;
