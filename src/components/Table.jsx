import React, { useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { planetsInfo, getPlanetsInfo, filterByName,
    filterArguments } = useContext(StarWarsContext);

  // onMount Functions
  useEffect(() => {
    getPlanetsInfo();
  }, []);

  // Rendering functions
  const filterPlanetsByNumericValues = ({ column, comparison, value }) => {
    switch (comparison) {
    case 'maior que':
      return ((planet) => planet[column] !== 'unknown'
        && Number(planet[column]) > Number(value));
    case 'menor que':
      return ((planet) => planet[column] !== 'unknown'
        && Number(planet[column]) < Number(value));
    case 'igual a':
      return ((planet) => planet[column] !== 'unknown'
        && Number(planet[column]) === Number(value));
    default:
      return planetsAcc;
    }
  };

  const filterPlanets = () => {
    const planetsFilteredByNumericValues = filterArguments
      .reduce((planetsAcc, currentFilter) => (planetsAcc
        .filter(filterPlanetsByNumericValues(currentFilter))), planetsInfo);
    const planetsFilteredByNumericValuesAndByName = planetsFilteredByNumericValues
      .filter(({ name }) => name.toLowerCase().includes(filterByName.toLowerCase()));
    return planetsFilteredByNumericValuesAndByName;
  };

  const filteredPlanets = filterPlanets();

  const renderTableHeaders = () => (
    <thead>
      <tr>
        { Object.keys(filteredPlanets[0] || {}).map((header) => (
          <th key={ header }>
            { header
              .replace(/_+/g, ' ')
              .replace(/\b\w/g, (firstChar) => firstChar.toUpperCase()) }
          </th>
        )) }
      </tr>
    </thead>
  );

  const renderTableBody = () => (
    <tbody>
      { filteredPlanets.map((planet) => (
        <tr key={ planet.name }>
          { Object.values(planet).map((info) => <td key={ info }>{ info }</td>) }
        </tr>
      )) }
    </tbody>
  );

  return (
    <table>
      { renderTableHeaders() }
      { renderTableBody() }
    </table>
  );
}

// Table.propTypes = {

// };

export default Table;
