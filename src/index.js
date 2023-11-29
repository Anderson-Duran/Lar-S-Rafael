import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
//import logo from './assets/logo.png';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <div id='logo'>
      {/* <img src={logo} alt='logomarcar' /> */}
    </div>
    <App />
  </>
);