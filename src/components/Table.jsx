import React, { useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { planetsInfo, getPlanetsInfo, filterByName } = useContext(StarWarsContext);

  useEffect(() => {
    getPlanetsInfo();
  }, []);

  const filterPlanets = () => planetsInfo
    .filter(({ name }) => name.toLowerCase().includes(filterByName.name.toLowerCase()));

  const filteredPlanets = filterPlanets();

  // Rendering functions
  const renderTableHeaders = () => (
    <thead>
      <tr>
        { Object.keys(filteredPlanets[0] || {}).map((header) => (
          <th key={ header }>
            { header
              .replace(/_+/g, ' ')
              .replace(/(^\w{1})|(\s+\w{1})/g, (firstChar) => firstChar.toUpperCase()) }
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
