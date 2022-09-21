import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

describe('Testa a aplicação', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
    .mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData)
    });

    render(<App />);
  });

  // afterEach(() => {
  //   cleanup();
  // });

  it('a tabela é carregada corretamente', async () => {
    const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
    expect(global.fetch).toHaveBeenNthCalledWith(1, url);

    const allColumns = await screen.findAllByRole('columnheader');
    expect(allColumns).toHaveLength(13);

    const allRows = await screen.findAllByRole('row');
    expect(allRows).toHaveLength(11);
     
    const allPlanets = testData.results.map(({ name }) => name);
    allPlanets.forEach((planet) => {
      const currentPlanet = screen.getByText(planet);
      expect(currentPlanet).toBeInTheDocument();
    });

  });

  it('o menu de filtros é carregado corretamente', async () => {
    const textInput = await screen.findByRole('textbox');
    expect(textInput).toBeInTheDocument();

    const numberInput = await screen.findByRole('spinbutton');
    expect(numberInput).toBeInTheDocument();

    const allRadioInputs = await screen.findAllByRole('radio');
    expect(allRadioInputs).toHaveLength(2);

    const allSelects = await screen.findAllByRole('combobox');
    expect(allSelects).toHaveLength(3);

    const filterButton = await screen.findByRole('button', {name: /filtrar/i});
    expect(filterButton).toBeInTheDocument();

    const removeAllFiltersButton = await screen.findByRole('button', {name: /remover filtros/i});
    expect(removeAllFiltersButton).toBeInTheDocument();

    const orderButton = await screen.findByRole('button', {name: /ordenar/i});
    expect(orderButton).toBeInTheDocument();
  });

  it('é possível adicionar múltiplos filtros simultaneamente e remove-los com um botao', async () => {
    const hoth = await screen.findByText('Hoth');
    expect(hoth).toBeInTheDocument();

    const textInput = await screen.findByRole('textbox');
    userEvent.type(textInput, 'oo');

    const naboo = await screen.findByText('Naboo');
    expect(naboo).toBeInTheDocument();
    const tatooine = await screen.findByText('Tatooine');
    expect(tatooine).toBeInTheDocument();
    expect(hoth).not.toBeInTheDocument();

    const allRows = await screen.findAllByRole('row');
    expect(allRows).toHaveLength(3);

    const numberInput = await screen.findByRole('spinbutton');
    userEvent.type(numberInput, '1000000');

    const filterButton = await screen.findByRole('button', {name: /filtrar/i});
    userEvent.click(filterButton);

    expect(naboo).toBeInTheDocument();
    expect(tatooine).not.toBeInTheDocument();

    const removeAllFiltersButton = screen.getByRole('button', {name: /remover filtros/i});
    expect(removeAllFiltersButton).toBeInTheDocument();
    userEvent.click(removeAllFiltersButton);
    
    const allRowsAftterRemovingAllFilters = screen.getAllByRole('row');
    waitFor(() => {
      expect(allRowsAftterRemovingAllFilters).toHaveLength(11); 
    });
  });

  it('os filtros "menor que" e "igual a" com o ordenamento', async () => {
    // const columnFilter = await screen.findByTestId('column-filter');
    const hoth = await screen.findByText('Hoth');
    expect(hoth).toBeInTheDocument();

    const comparisonOperator = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonOperator, 'menor que');

    const numberInput = screen.getByTestId('value-filter');
    userEvent.type(numberInput, '6000000');

    const filterButton = await screen.findByRole('button', {name: /filtrar/i});
    userEvent.click(filterButton);

    const allRows = screen.getAllByRole('row');
    expect(allRows).toHaveLength(3);

    const allPlanetsBeforeSort = screen.getAllByTestId('planet-name');
    expect(allPlanetsBeforeSort[0]).toHaveProperty('textContent', 'Tatooine');

    const sortSelect = screen.getByTestId('column-sort');
    userEvent.selectOptions(sortSelect, 'orbital_period');

    const descRadio = screen.getByTestId('column-sort-input-desc');
    userEvent.click(descRadio);

    const orderButton = screen.getByRole('button', {name: /ordenar/i});
    userEvent.click(orderButton);

    const allPlanetsAfterSort = screen.getAllByTestId('planet-name');
    expect(allPlanetsAfterSort[0]).toHaveProperty('textContent', 'Yavin IV');

    const removeSingleFilter = screen.getByRole('button', {name: /x/i});
    // waitFor(() => {
      userEvent.click(removeSingleFilter);
    // });

    const allRowsAfterRemoveFilter = screen.getAllByRole('row');
    expect(allRowsAfterRemoveFilter).toHaveLength(11);

    const ascRadio = screen.getByTestId('column-sort-input-asc');
    userEvent.click(ascRadio);

    const sortSelect2 = screen.getByTestId('column-sort');
    userEvent.selectOptions(sortSelect2, 'diameter');

    userEvent.click(orderButton);

    const allPlanets3 = screen.getAllByTestId('planet-name');
    expect(allPlanets3[0]).toHaveProperty('textContent', 'Endor');

    userEvent.selectOptions(comparisonOperator, 'igual a');
    userEvent.type(numberInput, '6000000');
    userEvent.click(filterButton);

    const allPlanets4 = screen.getAllByTestId('planet-name');
    expect(allPlanets4[0]).toHaveProperty('textContent', 'Bespin');
  });
});
