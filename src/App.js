import React from 'react';
import './App.css';
import StarWarsProvider from './context/StarWarsProvider';
import Table from './components/Table';

function App() {
  return (
    <StarWarsProvider>
      <>
        SearchMenu
        <Table />
      </>
    </StarWarsProvider>
  );
}

export default App;
