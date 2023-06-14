// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import reactLogo from './images/react.svg';
// import './styles/app.css';

// const rootElement = document.getElementById('root');

// const root = ReactDOM.createRoot(rootElement);
// root.render(
//   <div>
//     <h1>Hello from React application</h1>
//     <img src={reactLogo} className="logo react" alt="React logo" />
//   </div>,
// );

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/app.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
