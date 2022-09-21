import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { planetsInfo, getPlanetsInfo, filterByName,
    filterArguments, orderArguments } = useContext(StarWarsContext);

  // onMount Functions
  useEffect(() => getPlanetsInfo(), []);

  // Rendering functions
  const filterPlanetsByNumericValues = (planetsAcc, { column, comparison, value }) => {
    switch (comparison) {
    case 'maior que':
      return ((planet) => planet[column] !== 'unknown'
        && Number(planet[column]) > Number(value));
    case 'menor que':
      return ((planet) => planet[column] !== 'unknown'
        && Number(planet[column]) < Number(value));
    default:
      return ((planet) => planet[column] !== 'unknown'
      && Number(planet[column]) === Number(value));
    // case 'igual a':
    //   return ((planet) => planet[column] !== 'unknown'
    //     && Number(planet[column]) === Number(value));
    // default:
    //   return planetsAcc;
    }
  };

  const filterPlanets = () => {
    const planetsFilteredByNumericValues = filterArguments
      .reduce((planetsAcc, currentFilter) => (planetsAcc
        .filter(filterPlanetsByNumericValues(planetsAcc, currentFilter))), planetsInfo);

    const planetsFilteredByNumericValuesAndByName = planetsFilteredByNumericValues
      .filter(({ name }) => name.toLowerCase().includes(filterByName.toLowerCase()));

    return planetsFilteredByNumericValuesAndByName;
  };

  const sortPlanets = (filteredPlanets) => {
    const { column, sort } = orderArguments;

    const planetsWithUnknownValues = filteredPlanets
      .filter((planet) => planet[column] === 'unknown');
    const planetsWithoutUnknownValues = filteredPlanets
      .filter((planet) => planet[column] !== 'unknown');

    switch (sort) {
    case 'ASC':
      return [...planetsWithoutUnknownValues
        .sort((planetA, planetB) => Number(planetA[column]) - Number(planetB[column])),
      ...planetsWithUnknownValues];
    case 'DSC':
      return [...planetsWithoutUnknownValues
        .sort((planetA, planetB) => Number(planetB[column]) - Number(planetA[column])),
      ...planetsWithUnknownValues];
    default:
      return filteredPlanets;
    }
  };

  const filteredAndSortedPlanets = sortPlanets(filterPlanets());

  const renderTableHeaders = () => (
    <thead>
      <tr>
        { Object.keys(filteredAndSortedPlanets[0] || {}).map((header) => (
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
      { filteredAndSortedPlanets.map((planet) => (
        <tr key={ planet.name }>
          { Object.values(planet).map((info, index) => (
            index
              ? <td key={ info }>{ info }</td>
              : <td data-testid="planet-name" key={ info }>{ info }</td>
          )) }
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

export default Table;
