import React from 'react';
import PropTypes from 'prop-types';

const SelectWithOptions = (
  { value, onChange, data, name, dataTestId,
    className, ...otherProps },
) => (
  <select
    data-testid={ dataTestId }
    className={ className }
    id={ name }
    name={ name }
    value={ value }
    onChange={ onChange }
    { ...otherProps }
  >
    { data.map((option) => (
      <option
        key={ option }
        value={ option }
      >
        { option }
      </option>
    )) }
  </select>
);

SelectWithOptions.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
};

SelectWithOptions.defaultProps = {
  className: null,
  dataTestId: null,
  value: '',
};

export default SelectWithOptions;
