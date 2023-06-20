import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import './styles.css';
// let esc=false;

// const keyUp = e => {
//   console.log('document key up');
//   console.log(e);
//   // esc=(e.key=="Escape");
// };
// document.addEventListener('keyup', keyUp);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
