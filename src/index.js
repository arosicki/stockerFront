import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import Content from './Content';
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <Content />
  </React.StrictMode>,
  document.getElementById('root')
);