import React, { useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsInfo from '../services';
import StarWarsContext from './StarWarsContext';
import deleteProperties from '../helpers';

const NUMERIC_FILTERS = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
};

function StarWarsProvider({ children }) {
  const [planetsInfo, setPlanetsInfo] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState(NUMERIC_FILTERS);
  const [filterArguments, setFilterArguments] = useState([]);
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
    filterByNumericValues,
    setFilterByNumericValues,
    filterArguments,
    setFilterArguments,
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

// {
//   column: 'population',
//   comparison: 'maior que',
//   value: '100000',
// }
