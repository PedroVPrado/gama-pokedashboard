import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [pokeData, setPokeData] = useState([]);
  const [specificData, setSpecificData] = useState([]);

  function handleAPI() {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`).then(response => {
      const pokemons = response.data.results;
      pokemons.map(pokemon => {
        pokemon.id = String(pokemon.url).split("/pokemon/")[1].replace("/","");
        handlePokemon(pokemon.url);
      })
      setPokeData(pokemons);
    });
  }

  function handlePokemon(pokemonURL) {
    axios.get(pokemonURL).then(response => {
      const pokemon = response.data.sprites;
    });
  }

  useEffect(() => {
    (async () => handleAPI())()
  }, []);
  
  return (
    <>
      <div className="row mx-3">
        {pokeData.map((poke, index) => {
          return (
            <div className="col-3" key={index}>
              <div className="card my-3 align-items-center">
                <img className="card-img-top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`} alt="Imagem de capa do card"/>
                <div className="card-body">
                  <h5 className="card-title">{poke.name}</h5>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
};