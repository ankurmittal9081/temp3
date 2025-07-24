// import React from 'react';
// import { Link } from 'react-router-dom';
// import { MessageSquare, Phone, Mail } from 'lucide-react';

// const Footer = () => {
//   return (
//     <footer className="bg-slate-900/50 border-t border-slate-800 text-slate-400">
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* About */}
//           <div className="md:col-span-2">
//             <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
//                 <span className="text-cyan-400">Nyaya</span>Saathi
//             </Link>
//             <p className="max-w-md">AI-powered legal assistant for rural India. We make legal help as easy as talking to a friend.</p>
//           </div>
//           {/* Quick Links */}
//           <div>
//             <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Quick Links</h3>
//             <ul className="mt-4 space-y-2">
//               <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
//               <li><Link to="/login" className="hover:text-cyan-400 transition-colors">Login</Link></li>
//               <li><Link to="/register" className="hover:text-cyan-400 transition-colors">Register</Link></li>
//               <li><Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</Link></li>
//             </ul>
//           </div>
//           {/* Contact */}
//           <div>
//             <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Contact Us</h3>
//             <ul className="mt-4 space-y-3">
//               <li className="flex items-center gap-3">
//                 <Mail className="w-5 h-5 text-cyan-400"/>
//                 <span>support@nyayasaathi.com</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Phone className="w-5 h-5 text-cyan-400"/>
//                 <span>+91 123-456-7890</span>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm">
//           <p>© {new Date().getFullYear()} NyayaSaathi. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/95 backdrop-blur-xl border-t border-slate-200/60 text-slate-600 shadow-lg">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <Link 
              to="/" 
              className="text-2xl font-black text-slate-900 flex items-center gap-2 mb-4 hover:scale-105 transition-transform duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Nyaya</span>
              <span className="text-slate-700">Saathi</span>
            </Link>
            <p className="max-w-md text-slate-600 leading-relaxed">
              AI-powered legal assistant for rural India. We make legal help as easy as talking to a friend.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 tracking-wider uppercase mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-slate-600 hover:text-cyan-600 hover:translate-x-1 transition-all duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className="text-slate-600 hover:text-cyan-600 hover:translate-x-1 transition-all duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className="text-slate-600 hover:text-cyan-600 hover:translate-x-1 transition-all duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Register
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-slate-600 hover:text-cyan-600 hover:translate-x-1 transition-all duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 tracking-wider uppercase mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Mail className="w-5 h-5 text-cyan-600"/>
                </div>
                <span className="text-slate-600 group-hover:text-slate-800 transition-colors">
                  support@nyayasaathi.com
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Phone className="w-5 h-5 text-cyan-600"/>
                </div>
                <span className="text-slate-600 group-hover:text-slate-800 transition-colors">
                  +91 123-456-7890
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-200/80 pt-8">
          <div className="text-center">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} 
              <span className="font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mx-1">
                NyayaSaathi
              </span>
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;