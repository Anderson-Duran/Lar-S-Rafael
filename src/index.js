import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contextos/authContext';
import { PacientsProvider } from './contextos/pacientsContext';
import logo from './assets/logo.png';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div id='logo'>
      <img src={logo} alt='logomarcar' />
    </div>
    <AuthProvider>
      <PacientsProvider>
        <App />
      </PacientsProvider>
    </AuthProvider>
  </React.StrictMode>
);