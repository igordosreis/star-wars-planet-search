import React from 'react';
import './App.css';
import StarWarsProvider from './context/StarWarsProvider';
import Table from './components/Table';
import FilterForm from './components/FilterForm';

function App() {
  return (
    <StarWarsProvider>
      <>
        <FilterForm />
        <Table />
      </>
    </StarWarsProvider>
  );
}

export default App;
