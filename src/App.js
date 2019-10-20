import React from 'react';
import './App.css';
import logo from './assets/logo.png';
import Router from './routes';

function App() {
  return (
    <div className="container">
      <img src={logo} alt="Logo" height="100px" width="160px"></img>
      <div className="content">
        <Router />
      </div>
    </div>
  );
}

export default App;