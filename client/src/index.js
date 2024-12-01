import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { SocketProvider } from './socketContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SocketProvider>
  {/* // <React.StrictMode> */}
    <App />
  {/* // </React.StrictMode> */}
  </SocketProvider>
);

