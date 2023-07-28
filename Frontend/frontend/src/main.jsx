import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/tailwind.css'
import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
  baseUrl: 'https://app-99at0hablqww.frontegg.com',
  clientId: '59fa7483-cbf9-4be9-b9d3-969c45d75265'
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
    <App />
  </React.StrictMode>,
)
