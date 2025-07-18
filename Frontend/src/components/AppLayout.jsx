import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from './Footer'; // We'll always have a footer

const AppLayout = () => { 
  const { isAuthenticated, user, logout } = useAuth(); // Renamed to isAuthenticated for clarity

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive
        ? 'bg-cyan-500/20 text-cyan-300'
        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-slate-900 font-sans flex flex-col">
      {/* Header/Navbar */}
      <header className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-700 shadow-lg sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
               <span className="text-cyan-400">Nyaya</span>Saathi
            </Link>
            <div className="flex items-baseline space-x-4">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              {isAuthenticated ? (
                <>
                  <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
                  <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
                  {user?.role === 'admin' && (
                    <NavLink to="/admin" className={navLinkClass}>Admin Panel</NavLink>
                  )}
                  <button onClick={logout} className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-red-500/50 hover:text-white">Logout</button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={navLinkClass}>Login</NavLink>
                  <NavLink to="/register" className={navLinkClass}>Register</NavLink>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
      
      {/* Main Content Area */}
      <main className="flex-grow w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* The same background glows from AuthLayout are now here */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] z-0">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-lighten filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-lighten filter blur-3xl opacity-10 animate-blob" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 w-full flex justify-center">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;