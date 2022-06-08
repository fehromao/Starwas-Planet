import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Context from './Context';

function ContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });

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

  return (
    <main>
      <Context.Provider value={ { filteredData, setFilterByName } }>
        { children }
      </Context.Provider>
    </main>
  );
}

ContextProvider.propTypes = {
  children: propTypes.arrayOf(propTypes.string).isRequired,
};

export default ContextProvider;
