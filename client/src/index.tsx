import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import PlayersProvider from 'contexts/PlayersContext';

import App from './App';

// styles
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PlayersProvider>
        <App />
      </PlayersProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
