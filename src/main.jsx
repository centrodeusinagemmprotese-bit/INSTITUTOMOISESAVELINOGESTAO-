import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // correto
import './index.css';    // correto

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
