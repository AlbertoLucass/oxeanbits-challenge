// App.jsx
import React, { useEffect, useState, useRef } from 'react';
import PokemonGrid from './PokemonGrid';
import { fetchPokemon } from './fetchPokemon.jsx';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState([{ field: 'id', dir: 'asc' }]);
  const gridRef = useRef(null);

  useEffect(() => {
    fetchPokemon().then((data) => setPokemon(data));
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      const columnsCount = gridRef.current.columns.length;
      for (let i = 0; i < columnsCount; i++) {
        gridRef.current.autoFitColumn(i);
      }
    }
  }, [pokemon]);

  const handleFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setFilter(filterValue);
  };

  const handleSortChange = (e) => {
    setSort(e.sort);
  };

  return (
    <div className="app-container">
      <div className="grid-container">
        <PokemonGrid
          pokemon={pokemon}
          filter={filter}
          sort={sort}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
          ref={gridRef}
        />
      </div>
    </div>
  );
};

export default App;