// fetchPokemon.js
import axios from 'axios';

export const fetchPokemon = async () => {

  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
  const promises = response.data.results.map((pokemon) => axios.get(pokemon.url));
  const pokemonResponses = await Promise.all(promises);

  return pokemonResponses.map((response) => response.data);
};