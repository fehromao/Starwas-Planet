import React, { useContext } from 'react';
import Context from './Context';

function Table() {
  const { filteredData,
    setFilterByName,
    setFilterColum,
    setFilterOperator,
    setFilterValue,
    setFilterByNumericValues,
    filterColum,
    filterOperator,
    filterValue,
    filterByNumericValues,
  } = useContext(Context);

  const handlePlanet = ({ target }) => {
    console.log('target', typeof target.value);
    setFilterByName(target.value.toLowerCase());
  };

  const handleFilterChoose = () => {
    console.log('clicou');
    const filterNumericValues = {
      filterColum,
      filterOperator,
      filterValue,
    };
    setFilterByNumericValues([...filterByNumericValues, filterNumericValues]);
  };

  return (
    <div>
      <form>
        <input
          data-testid="name-filter"
          type="text"
          placeholder="Type Planet"
          onChange={ handlePlanet }
        />
        <label htmlFor="colum">
          Coluna
          <select
            id="colum"
            name="colum"
            data-testid="column-filter"
            onChange={ ({ target }) => setFilterColum(target.value) }
          >
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label htmlFor="operator">
          Operador
          <select
            id="operator"
            name="operator"
            data-testid="comparison-filter"
            onChange={ ({ target }) => setFilterOperator(target.value) }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <input
          type="number"
          data-testid="value-filter"
          placeholder="0"
          onChange={ ({ target }) => setFilterValue(target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilterChoose }
        >
          Filtrar
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredData && filteredData.map((item) => (
            <tr key={ item.name }>
              <td>{item.name}</td>
              <td>{item.rotation_period}</td>
              <td>{item.orbital_period}</td>
              <td>{item.diameter}</td>
              <td>{item.climate}</td>
              <td>{item.gravity}</td>
              <td>{item.terrain}</td>
              <td>{item.surface_water}</td>
              <td>{item.population}</td>
              <td>{item.films}</td>
              <td>{item.created}</td>
              <td>{item.edited}</td>
              <td>{item.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
