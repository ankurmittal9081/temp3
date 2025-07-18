import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import HeroSection from './HomePage/HeroSection';
import FeaturesSection from './HomePage/FeaturesSection';
import AboutSection from './HomePage/AboutSection';
import WhyNowSection from './HomePage/WhyNowSection';
import HowItWorksSection from './HomePage/HowItWorksSection';
import Footer from '../components/Footer';

const HomePage = () => {
    const { isLoggedIn } = useAuth();
    
  return (
    <div className="bg-slate-900 text-white font-sans overflow-x-hidden relative">
      {/* 
        CENTRALIZED BACKGROUND GLOWS 
        This is the layer that was causing the problem.
      */}
      <div className="absolute top-0 left-0 w-full h-full -z-0">
          <div className="absolute top-[-10rem] left-[-20rem] w-[50rem] h-[50rem] bg-cyan-500 rounded-full mix-blend-lighten filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-[20rem] right-[-20rem] w-[50rem] h-[50rem] bg-pink-500 rounded-full mix-blend-lighten filter blur-3xl opacity-10 animate-blob" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-[60rem] left-[0rem] w-[40rem] h-[40rem] bg-purple-500 rounded-full mix-blend-lighten filter blur-3xl opacity-10 animate-blob" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-[120rem] right-[-10rem] w-[40rem] h-[40rem] bg-sky-500 rounded-full mix-blend-lighten filter blur-3xl opacity-10 animate-blob" style={{animationDelay: '1s'}}></div>
      </div>
        
      {/* Header (z-20 puts it safely on top) */}
      <header className="absolute w-full top-0 left-0 p-4 z-20">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">Nyaya</span>Saathi
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-4">
                {isLoggedIn ? (
                    <Link to="/dashboard" className="px-3 sm:px-4 py-2 text-sm rounded-md bg-slate-800/50 hover:bg-slate-700/80 border border-slate-700 transition-colors">Go to Dashboard</Link>
                ) : (
                    <>
                        <Link to="/login" className="px-3 py-2 text-sm text-slate-300 hover:text-white transition-colors">Login</Link>
                        <Link to="/register" className="px-3 py-2 text-sm text-white bg-slate-800/50 hover:bg-slate-700/80 border border-slate-700 rounded-md transition-colors">Register</Link>
                    </>
                )}
            </div>
        </nav>
      </header>
      
      {/* MAIN CONTENT (z-10 keeps it above the background) */}
      <main className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <WhyNowSection />
        <HowItWorksSection />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>

    </div>
  );
};

export default HomePage;