import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import StarWarsContext from '../context/StarWarsContext';
import SelectWithOptions from './SelectWithOptions';

const COLUMN_OPTIONS = ['population', 'orbital_period', 'rotation_period', 'diameter',
  'surface_water'];

const COMPARISON_OPERATOR = ['maior que', 'menor que', 'igual a'];

function FilterForm() {
  const { filterByName, setFilterByName, filterByNumericValues,
    setFilterByNumericValues, filterArguments,
    setFilterArguments } = useContext(StarWarsContext);

  const currentOptions = () => {
    const optionsInUse = filterArguments.map(({ column }) => column);
    const remainingOptions = COLUMN_OPTIONS
      .filter((option) => !optionsInUse.includes(option));
    return remainingOptions;
  };

  const options = currentOptions();

  // Handling Functions
  const handleInput = ({ target: { name, value } }) => (
    setFilterByName({
      [name]: value,
    }));

  const handleSelect = ({ target: { name, value } }) => (
    setFilterByNumericValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  );

  const handleAddFilterButtonClick = () => {
    const updatedFilterArguments = [...filterArguments, filterByNumericValues];
    setFilterArguments(updatedFilterArguments);
  };

  const handleRemoveFilterButtonClick = ({ target: { dataset: { filter } } }) => {
    const updatedFilterArguments = filterArguments
      .filter(({ column }) => column !== filter);
    setFilterArguments(updatedFilterArguments);
  };

  // Rendering Functions

  const renderCurrentFilters = () => (
    <div>
      { filterArguments.map(({ column, comparison, value }) => (
        <div key={ column }>
          <span>{ `${column} ${comparison} ${value}` }</span>
          <button
            type="button"
            data-filter={ column }
            onClick={ handleRemoveFilterButtonClick }
          >
            Remover
          </button>
        </div>
      )) }
    </div>
  );

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        name="name"
        value={ filterByName.name }
        onChange={ handleInput }
      />
      <SelectWithOptions
        dataTestId="column-filter"
        id="column"
        name="column"
        value={ filterByNumericValues.column }
        onChange={ handleSelect }
        data={ options }
      />
      <SelectWithOptions
        dataTestId="comparison-filter"
        id="comparison"
        name="comparison"
        value={ filterByNumericValues.comparison }
        onChange={ handleSelect }
        data={ COMPARISON_OPERATOR }
      />
      <input
        data-testid="value-filter"
        type="number"
        name="value"
        value={ filterByNumericValues.value }
        onChange={ handleSelect }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleAddFilterButtonClick }
      >
        Filtrar
      </button>
      { renderCurrentFilters() }
    </div>
  );
}

// FilterForm.propTypes = {

// };

export default FilterForm;
