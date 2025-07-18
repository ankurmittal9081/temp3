import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900/50 border-t border-slate-800 text-slate-400">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
                <span className="text-cyan-400">Nyaya</span>Saathi
            </Link>
            <p className="max-w-md">AI-powered legal assistant for rural India. We make legal help as easy as talking to a friend.</p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link to="/login" className="hover:text-cyan-400 transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-cyan-400 transition-colors">Register</Link></li>
              <li><Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400"/>
                <span>support@nyayasaathi.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400"/>
                <span>+91 123-456-7890</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} NyayaSaathi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;