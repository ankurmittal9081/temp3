import React, { useState, useEffect } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import Footer from './Footer';
import { Menu, X } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const AppLayout = () => { 
  const { isLoggedIn, user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);
  
  const navLinkClass = "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300";
  const getActiveNavLinkClass = ({ isActive }) => `${navLinkClass} ${isActive ? 'text-cyan-300 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-700'}`;

  const MobileNavLinks = () => (
    <>
      <NavLink to="/" className={getActiveNavLinkClass} onClick={closeMenu} end>Home</NavLink>
      {isLoggedIn ? (
        <>
          <NavLink to="/dashboard" className={getActiveNavLinkClass} onClick={closeMenu}>Dashboard</NavLink>
          <NavLink to="/profile" className={getActiveNavLinkClass} onClick={closeMenu}>Profile</NavLink>
          {user?.role === 'admin' && (
            <NavLink to="/admin" className={getActiveNavLinkClass} onClick={closeMenu}>Admin Panel</NavLink>
          )}
          <button onClick={() => { logout(); closeMenu(); }} className={`${navLinkClass} text-left w-full text-red-400 hover:bg-red-500/20 hover:text-red-300`}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" className={getActiveNavLinkClass} onClick={closeMenu}>Login</NavLink>
          <NavLink to="/register" className={getActiveNavLinkClass} onClick={closeMenu}>Register</NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-slate-900 font-sans flex flex-col">
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-slate-900/80 backdrop-blur-lg border-b border-slate-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
               <span className="text-cyan-400">Nyaya</span>Saathi
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-baseline space-x-4">
              <MobileNavLinks />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-700">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLinks />
          </div>
        )}
      </nav>
      
      <motion.main 
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="flex-grow flex flex-col items-center justify-start py-8 px-4 relative"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
};

export default AppLayout;