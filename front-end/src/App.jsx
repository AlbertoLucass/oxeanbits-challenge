import React, { useEffect, useState, useRef } from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { Input } from '@progress/kendo-react-inputs';
import { orderBy } from '@progress/kendo-data-query';
import '@progress/kendo-theme-default/dist/all.css';
import axios from 'axios';
import './App.css';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState([{ field: 'id', dir: 'asc' }]);
  const gridRef = useRef(null);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then(response => {
        const promises = response.data.results.map(pokemon => axios.get(pokemon.url));
        Promise.all(promises).then(pokemonResponses => setPokemon(pokemonResponses.map(response => response.data)));
      });
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      const columnsCount = gridRef.current.columns.length;
      for (let i = 0; i < columnsCount; i++) {
        gridRef.current.autoFitColumn(i);
      }
    }
  }, [pokemon]);

  const handleFilterChange = (event) => {
    const filterValue = event.target.value.toLowerCase();
    setFilter(filterValue);
  }

  const handleSortChange = (e) => {
    setSort(e.sort);
  }

  return (
    <div className="app-container">
      <div className="grid-container">
        <Grid
          data={orderBy(
            pokemon.filter(
              p =>
                String(p.name).toLowerCase().includes(filter) ||
                String(p.id).toLowerCase().includes(filter) ||
                String(p.height).toLowerCase().includes(filter) ||
                String(p.weight).toLowerCase().includes(filter) ||
                String(p.base_experience).toLowerCase().includes(filter)
            ),
            sort
          )}
          sortable={true}
          sort={sort}
          onSortChange={handleSortChange}
          centered={true}
        >
          <GridToolbar>
            <h2>Pokemon List</h2> 
            <div>
              <Input placeholder="Filter by name, height, weight..." onChange={handleFilterChange} />
            </div>
          </GridToolbar>
          <Column field="id" title="ID" />
          <Column
            field="sprites"
            title="Image"
            cell={(props) => <img src={props.dataItem.sprites.front_default} alt={props.dataItem.name} />}
          />
          <Column field="name" title="Name" />
          <Column field="height" title="Height" />
          <Column field="weight" title="Weight" />
          <Column field="base_experience" title="Base XP" />
          
        </Grid>
      </div>
    </div>
  );
}

export default App;