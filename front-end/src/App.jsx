import React, { useEffect, useState } from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { Input } from '@progress/kendo-react-inputs';
import axios from 'axios';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filter, setFilter] = useState('');

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  return (
    <Grid
      data={pokemon.filter(p => 
        String(p.name).toLowerCase().includes(filter.toLowerCase())
      )}
    >
      <GridToolbar>
        <div className="k-toolbar-spacer" />
        <div>
          <Input placeholder="Filter by name..." onChange={handleFilterChange} />
        </div>
      </GridToolbar>
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
