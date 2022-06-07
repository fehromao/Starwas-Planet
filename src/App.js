import React from 'react';
import ContextProvider from './ContextProvider';
import './App.css';
import Table from './Table';

function App() {
  return (
    <ContextProvider>
      <Table />
    </ContextProvider>
  );
}

export default App;
