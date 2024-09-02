import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./config/global"

// CSS file for Toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"

import { Provider } from "react-redux";
import Store from './redux/store';

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <Provider store={Store}>
      <App />
      <ToastContainer />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
