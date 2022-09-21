import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import SelectWithOptions from './SelectWithOptions';

const COLUMN_OPTIONS = ['population', 'orbital_period', 'rotation_period', 'diameter',
  'surface_water'];

const COMPARISON_OPERATOR = ['maior que', 'menor que', 'igual a'];

function FilterForm() {
  const { filterByName, setFilterByName, filterByNumericValues,
    setFilterByNumericValues, filterArguments,
    setFilterArguments, order, setOrder, setOrderArguments,
  } = useContext(StarWarsContext);

  // Handling Functions
  const handleNameFilterInput = ({ target: { value } }) => setFilterByName(value);

  const handleNumericFilterSelect = ({ target: { name, value } }) => (
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

  const handleRemoveAllFiltersButtonClick = () => setFilterArguments([]);

  const handleSortSelectAndRadio = ({ target: { name, value } }) => (
    setOrder((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  );

  const handleSortButtonClick = () => setOrderArguments(order);

  // Rendering Functions
  const currentOptions = () => {
    const optionsInUse = filterArguments.map(({ column }) => column);
    const remainingOptions = COLUMN_OPTIONS
      .filter((option) => !optionsInUse.includes(option));
    return remainingOptions;
  };

  const options = currentOptions();

  const renderCurrentFilters = () => (
    <div>
      { filterArguments.map(({ column, comparison, value }) => (
        <div data-testid="filter" key={ column }>
          <span>{ `${column} ${comparison} ${value}` }</span>
          <button
            type="button"
            data-filter={ column }
            onClick={ handleRemoveFilterButtonClick }
          >
            X
          </button>
        </div>
      )) }
    </div>
  );

  // On props update Functions
  useEffect(() => setFilterByNumericValues(({
    comparison: 'maior que',
    column: options[0],
    value: 0,
  })), [filterArguments]);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        name="name"
        value={ filterByName }
        onChange={ handleNameFilterInput }
      />
      <SelectWithOptions
        dataTestId="column-filter"
        id="column"
        name="column"
        value={ filterByNumericValues.column }
        onChange={ handleNumericFilterSelect }
        data={ options }
      />
      <SelectWithOptions
        dataTestId="comparison-filter"
        id="comparison"
        name="comparison"
        value={ filterByNumericValues.comparison }
        onChange={ handleNumericFilterSelect }
        data={ COMPARISON_OPERATOR }
      />
      <input
        data-testid="value-filter"
        type="number"
        name="value"
        value={ filterByNumericValues.value }
        onChange={ handleNumericFilterSelect }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleAddFilterButtonClick }
      >
        Filtrar
      </button>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ handleRemoveAllFiltersButtonClick }
      >
        Remover filtros
      </button>
      <SelectWithOptions
        dataTestId="column-sort"
        id="column"
        name="column"
        value={ order.column }
        onChange={ handleSortSelectAndRadio }
        data={ COLUMN_OPTIONS }
      />
      <input
        data-testid="column-sort-input-asc"
        type="radio"
        name="sort"
        id="sort"
        checked={ order.sort === 'ASC' }
        value="ASC"
        onChange={ handleSortSelectAndRadio }
      />
      Ascendente
      <input
        data-testid="column-sort-input-desc"
        type="radio"
        name="sort"
        id="sort"
        checked={ order.sort === 'DSC' }
        value="DSC"
        onChange={ handleSortSelectAndRadio }
      />
      Descendente
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ handleSortButtonClick }
      >
        Ordenar
      </button>
      { renderCurrentFilters() }
    </div>
  );
}

export default FilterForm;
