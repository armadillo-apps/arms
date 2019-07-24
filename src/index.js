import React from 'react';

import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import Modal from "react-modal";

Modal.setAppElement("#modal");

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

