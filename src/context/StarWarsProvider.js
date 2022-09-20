import React, { useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsInfo from '../services';
import StarWarsContext from './StarWarsContext';
import deleteProperties from '../helpers';

function StarWarsProvider({ children }) {
  const [planetsInfo, setPlanetsInfo] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  // const [error, setError] = useState('');

  const getPlanetsInfo = async () => {
    // try {
    const response = await fetchPlanetsInfo();
    const planetsInfoWithoutResidents = deleteProperties(
      response.results,
      ['residents'],
    );
    setPlanetsInfo([...planetsInfoWithoutResidents]);
    // } catch (errorMsg) {
    // setError(error);
    // }
  };

  const contextValues = {
    planetsInfo,
    getPlanetsInfo,
    filterByName,
    setFilterByName,
  };

  return (
    <StarWarsContext.Provider value={ contextValues }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default StarWarsProvider;
