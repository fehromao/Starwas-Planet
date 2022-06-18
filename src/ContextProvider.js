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

    setFilteredData(filterPlanet);
  }, [filterByName]);

  useEffect(() => {
    const filterNumeric = data.filter((item) => {
      switch (filterOperator) {
      case 'maior que':
        return item[filterColum] > Number(filterValue);
      case 'menor que':
        return item[filterColum] < Number(filterValue);
      case 'igual a':
        return item[filterColum] === filterValue;
      default:
        return true;
      }
    });
    setFilteredData(filterNumeric);
  }, [filterByNumericValues]);

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
