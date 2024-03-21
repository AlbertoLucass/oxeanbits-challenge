import React from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { Input } from '@progress/kendo-react-inputs';
import { orderBy } from '@progress/kendo-data-query';

const PokemonGrid = React.memo(({ pokemon, filter, sort, onSortChange, onFilterChange }) => (
  <Grid
    data={orderBy(
      pokemon.filter(
        (p) =>
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
    onSortChange={onSortChange}
  >
    <GridToolbar>
      <h2>Pokemon List</h2>
      <div>
        <Input placeholder="Filter by name, height, weight..." onChange={onFilterChange} />
      </div>
    </GridToolbar>
    <Column field="id" title="ID" />
    <Column field="sprites" title="Image" cell={(props) => <img src={props.dataItem.sprites.front_default} alt={props.dataItem.name} />} />
    <Column field="name" title="Name" />
    <Column field="height" title="Height" />
    <Column field="weight" title="Weight" />
    <Column field="base_experience" title="Base XP" />
  </Grid>
));

export default PokemonGrid;
