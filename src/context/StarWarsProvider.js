import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanetsInfo from '../services';
import deleteProperties from '../helpers';

const NUMERIC_FILTERS = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
};

const SORT_ORDER = {
  column: 'population',
  sort: 'ASC',
};

function StarWarsProvider({ children }) {
  const [planetsInfo, setPlanetsInfo] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState(NUMERIC_FILTERS);
  const [numericFilterArguments, setNumericFilterArguments] = useState([]);
  const [order, setOrder] = useState(SORT_ORDER);
  const [orderArguments, setOrderArguments] = useState({});
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
    numericFilterArguments,
    setNumericFilterArguments,
    order,
    setOrder,
    orderArguments,
    setOrderArguments,
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
