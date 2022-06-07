import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Context from './Context';

function ContextProvider({ children }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const dataPlanets = await response.json();
      setData(dataPlanets.results);
    };
    fetchPlanets();
  }, []);

  return (
    <main>
      <Context.Provider value={ { data } }>
        { children }
      </Context.Provider>
    </main>
  );
}

ContextProvider.propTypes = {
  children: propTypes.arrayOf(propTypes.string).isRequired,
};

export default ContextProvider;
