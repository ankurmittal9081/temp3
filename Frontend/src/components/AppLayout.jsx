import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // <-- IMPORT HOOK
import { useAuth } from '../context/AuthContext';
import Footer from './Footer';
import LanguageSwitcher from './LanguageSwitcher'; // <-- IMPORT COMPONENT

const AppLayout = () => { 
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useTranslation(); // <-- INITIALIZE HOOK

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive
        ? 'bg-cyan-500/20 text-cyan-300'
        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-slate-900 font-sans flex flex-col">
      <header className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-700 shadow-lg sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
               <span className="text-cyan-400">Nyaya</span>Saathi
            </Link>
            <div className="flex items-center space-x-4">
              {/* Main Navigation */}
              <div className="hidden md:flex items-baseline space-x-4">
                <NavLink to="/" className={navLinkClass} end>{t('nav.home')}</NavLink>
                {isAuthenticated ? (
                  <>
                    <NavLink to="/dashboard" className={navLinkClass}>{t('nav.dashboard')}</NavLink>
                    <NavLink to="/profile" className={navLinkClass}>{t('nav.profile')}</NavLink>
                    {user?.role === 'admin' && (
                      <NavLink to="/admin" className={navLinkClass}>{t('nav.adminPanel')}</NavLink>
                    )}
                    <button onClick={logout} className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-red-500/50 hover:text-white">{t('nav.logout')}</button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className={navLinkClass}>{t('nav.login')}</NavLink>
                    <NavLink to="/register" className={navLinkClass}>{t('nav.register')}</NavLink>
                  </>
                )}
              </div>
              {/* Language Switcher */}
              <LanguageSwitcher />
            </div>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default AppLayout;