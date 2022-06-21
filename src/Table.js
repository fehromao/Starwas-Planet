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
    selectOptions,
    setSelectOptions,
  } = useContext(Context);

  const handlePlanet = ({ target }) => {
    setFilterByName(target.value.toLowerCase());
  };

  const handleFilterChoose = () => {
    const filterNumericValues = {
      filterColum,
      filterOperator,
      filterValue,
    };

    setSelectOptions(selectOptions.filter((e) => e !== filterColum));
    setFilterByNumericValues([filterNumericValues]);
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
            value={ filterColum }
            data-testid="column-filter"
            onChange={ ({ target }) => setFilterColum(target.value) }
          >
            {selectOptions.map((item) => (
              <option key={ item }>{ item }</option>
            ))}

          </select>
        </label>
        <label htmlFor="operator">
          Operador
          <select
            id="operator"
            name="operator"
            value={ filterOperator }
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
          value={ filterValue }
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
      {filterByNumericValues
        .map((filter, index) => (
          (
            <p
              key={ `${filter.filterValue} ${index}` }
            >
              {
                `${filter.filterColum}
                ${filter.filterOperator}
                ${filter.filterValue}`
              }
            </p>)
        ))}
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
