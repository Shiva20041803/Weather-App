import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// creates a root for your React application using the createRoot function provided by ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root'));
// renders the App component inside the root element
root.render(<App />);
