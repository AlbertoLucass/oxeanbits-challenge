import React, { useEffect, useState } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import axios from 'axios';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then(response => {
        const promises = response.data.results.map(pokemon => 
          axios.get(pokemon.url)
        );
        Promise.all(promises).then(pokemonResponses => 
          setPokemon(pokemonResponses.map(response => response.data))
        );
      });
  }, []);

  return (
    <Grid
      data={pokemon.filter(p => 
        String(p.name).toLowerCase().includes(filter.name || '')
      )}
    >
      console.log(pokemon)
      <Column field="id" title="ID" />
      <Column field="sprites" title="Image" cell={(props) =>
        <img src={props.dataItem.sprites.front_default} alt={props.dataItem.name} />
      } />
      <Column field="name" title="Name" />
      <Column field="height" title="Height" />
      <Column field="weight" title="Weight" />
      <Column field="types" title="Types" cell={(props) => 
        props.dataItem.types.map(type => type.type.name).join(', ')
      } />
      <Column field="abilities" title="Abilities" cell={(props) =>
        props.dataItem.abilities.map(ability => ability.ability.name).join(', ')
      } />

    </Grid>
  );
};

export default App;
