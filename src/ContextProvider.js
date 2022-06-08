import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Context from './Context';

function ContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterColum, setFilterColum] = useState('population');
  const [filterOperator, setFilterOperator] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const dataPlanets = await response.json();
      setData(dataPlanets.results);
      setFilteredData(dataPlanets.results);
    };
    fetchPlanets();
  }, []);

  useEffect(() => {
    const filterPlanet = data
      .filter((planet) => planet.name.toLowerCase().includes(filterByName));

    filterByNumericValues.reduce((acumulador, currentValue) => acumulador
      .filter((planet) => {
        switch (currentValue.operator) {
        case 'maior que':
          return planet[currentValue.filterColum] > Number(planet.value);
        case 'menor que':
          return planet[currentValue.filterColum] < Number(planet.value);
        case 'igual':
          return planet[currentValue.filterColum] === Number(planet.value);
        default:
          return true;
        }
      }), filterPlanet);

    setFilteredData(filterPlanet);
  }, [filterByName, filterByNumericValues]);

  return (
    <main>
      <Context.Provider
        value={
          ({ filteredData,
            setFilterByName,
            setFilterColum,
            setFilterOperator,
            setFilterValue,
            setFilterByNumericValues,
            filterColum,
            filterOperator,
            filterValue,
            filterByNumericValues,
          })
        }
      >
        { children }
      </Context.Provider>
    </main>
  );
}

ContextProvider.propTypes = {
  children: propTypes.arrayOf(propTypes.string).isRequired,
};

export default ContextProvider;
