import React, { useState, useEffect, useRef, useCallback  } from 'react';
import Card from '../card/card';
import './pokemonCards.css';

function PokemonCards(props) {
  const [pokemonID, setPokemonID] = useState(1);
  const callsPerLoading = 5;
  const [totalPokemon, setTotalPokemon] = useState(5);
  const [teste, setTest] = useState(false)
  var cards = [];

  const generateCards = (cards) => {
    if(!teste){
      for(var i = pokemonID; i <= totalPokemon; i++){
        cards.push(<Card pokemonID={i} key={i}/>)
      }
      // setPokemonID(6);
      // console.log("pokemonID: "+pokemonID);
      // setTest(true);
      return (cards);
    }
  };


  // 993448919
  const [pageNumber, setPageNumber] = useState(1)
  const observer = useRef()
  const [loading, setLoading] = useState(false)
  const loaderRef = useCallback(node => {
    // if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting ) {
        // setPageNumber(prevPageNumber => prevPageNumber + 1)
        setLoading(true)
        // setPokemonID(pokemonID+callsPerLoading);
        // setTotalPokemon(totalPokemon+callsPerLoading)
        console.log("testeaqui")
      }
    })
    if (node) observer.current.observe(node)
  }, [loading])
  
    
  return (
    <>
      <div className="pokemonCards">
        {generateCards(cards)}
      </div>
      <p ref={loaderRef}>Loading pokemons...</p>
    </>
    
  );
}

export default PokemonCards;
