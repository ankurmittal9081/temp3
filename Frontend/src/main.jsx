import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// 1. Change the import
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Change the component wrapper */}
    <HashRouter>
      <AuthProvider>
        <App />
        <Toaster 
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: '#1f2937',
              color: '#f9fafb',
              border: '1px solid #334155',
            },
          }}
        />
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);