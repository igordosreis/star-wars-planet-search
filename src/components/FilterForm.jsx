import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from '../context/StarWarsContext';

function FilterForm() {
  const { filterByName, setFilterByName } = useContext(StarWarsContext);

  const handleInput = ({ target: { name, value } }) => (
    setFilterByName({
      [name]: value,
    }));

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        name="name"
        value={ filterByName.name }
        onChange={ handleInput }
      />
    </div>
  );
}

FilterForm.propTypes = {

};

export default FilterForm;
