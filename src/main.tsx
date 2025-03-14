import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration.js";

// 注册 Service Worker
const mode = import.meta.env.MODE;
if (mode === "production") {
  serviceWorkerRegistration.register();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);