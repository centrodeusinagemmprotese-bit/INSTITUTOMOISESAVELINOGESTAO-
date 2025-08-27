import React from 'react';
import Navbar from './components/Navbar';
import Clientes from './pages/Clientes';
import Servicos from './pages/Servicos';
import Financeiro from './pages/Financeiro';

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Clientes />
        <Servicos />
        <Financeiro />
      </div>
    </>
  );
}

export default App;
