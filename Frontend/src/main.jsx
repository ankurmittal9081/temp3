// import React, { Suspense } from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App.jsx';
// import { AuthProvider } from './context/AuthContext.jsx';
// import { Toaster } from 'react-hot-toast';
// import './i18n'; // <-- IMPORT THE I18N CONFIG
// import './index.css';
// import Spinner from './components/Spinner.jsx';

// const fallbackSpinner = (
//   <div className="flex h-screen w-full items-center justify-center bg-slate-900">
//     <Spinner />
//   </div>
// );

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Suspense fallback={fallbackSpinner}>
//       <BrowserRouter>
//         <AuthProvider>
//           <App />
//           <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { background: '#1f2937', color: '#f9fafb', border: '1px solid #334155' } }} />
//         </AuthProvider>
//       </BrowserRouter>
//     </Suspense>
//   </React.StrictMode>
// );
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./context/AuthContext"
import App from "./App.jsx"
import "./index.css"
import "./index.js"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1e293b",
              color: "#f1f5f9",
              border: "1px solid #334155",
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)