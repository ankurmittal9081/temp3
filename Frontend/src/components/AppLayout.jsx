// // import React from 'react';
// // import { Outlet, Link, NavLink } from 'react-router-dom';
// // import { useTranslation } from 'react-i18next'; // <-- IMPORT HOOK
// // import { useAuth } from '../context/AuthContext';
// // import Footer from './Footer';
// // import LanguageSwitcher from './LanguageSwitcher'; // <-- IMPORT COMPONENT

// // const AppLayout = () => { 
// //   const { isAuthenticated, user, logout } = useAuth();
// //   const { t } = useTranslation(); // <-- INITIALIZE HOOK

// //   const navLinkClass = ({ isActive }) =>
// //     `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
// //       isActive
// //         ? 'bg-cyan-500/20 text-cyan-300'
// //         : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
// //     }`;

// //   return (
// //     <div className="min-h-screen bg-slate-900 font-sans flex flex-col">
// //       <header className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-700 shadow-lg sticky top-0 z-50">
// //         <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex items-center justify-between h-16">
// //             <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
// //                <span className="text-cyan-400">Nyaya</span>Saathi
// //             </Link>
// //             <div className="flex items-center space-x-4">
// //               {/* Main Navigation */}
// //               <div className="hidden md:flex items-baseline space-x-4">
// //                 <NavLink to="/" className={navLinkClass} end>{t('nav.home')}</NavLink>
// //                 {isAuthenticated ? (
// //                   <>
// //                     <NavLink to="/dashboard" className={navLinkClass}>{t('nav.dashboard')}</NavLink>
// //                     <NavLink to="/profile" className={navLinkClass}>{t('nav.profile')}</NavLink>
// //                     {user?.role === 'admin' && (
// //                       <NavLink to="/admin" className={navLinkClass}>{t('nav.adminPanel')}</NavLink>
// //                     )}
// //                     <button onClick={logout} className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-red-500/50 hover:text-white">{t('nav.logout')}</button>
// //                   </>
// //                 ) : (
// //                   <>
// //                     <NavLink to="/login" className={navLinkClass}>{t('nav.login')}</NavLink>
// //                     <NavLink to="/register" className={navLinkClass}>{t('nav.register')}</NavLink>
// //                   </>
// //                 )}
// //               </div>
// //               {/* Language Switcher */}
// //               <LanguageSwitcher />
// //             </div>
// //           </div>
// //         </nav>
// //       </header>
      
// //       <main className="flex-grow w-full flex flex-col items-center p-4 sm:p-6 lg:p-8">
// //         <Outlet />
// //       </main>
      
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default AppLayout;
// import React from 'react';
// import { Outlet, Link, NavLink } from 'react-router-dom';
// import { useTranslation } from 'react-i18next'; // <-- IMPORT HOOK
// import { useAuth } from '../context/AuthContext';
// import Footer from './Footer';
// import LanguageSwitcher from './LanguageSwitcher'; // <-- IMPORT COMPONENT

// const AppLayout = () => { 
//   const { isAuthenticated, user, logout } = useAuth();
//   const { t } = useTranslation(); // <-- INITIALIZE HOOK

//   const navLinkClass = ({ isActive }) =>
//     `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
//       isActive
//         ? 'bg-cyan-100 text-cyan-700'
//         : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
//     }`;

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
//       <header className="bg-white/90 backdrop-blur-lg border-b border-slate-200 shadow-sm sticky top-0 z-50">
//         <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <Link to="/" className="text-2xl font-bold text-slate-900 flex items-center gap-2">
//                <span className="text-cyan-600">Nyaya</span>Saathi
//             </Link>
//             <div className="flex items-center space-x-4">
//               {/* Main Navigation */}
//               <div className="hidden md:flex items-baseline space-x-4">
//                 <NavLink to="/" className={navLinkClass} end>{t('nav.home')}</NavLink>
//                 {isAuthenticated ? (
//                   <>
//                     <NavLink to="/dashboard" className={navLinkClass}>{t('nav.dashboard')}</NavLink>
//                     <NavLink to="/profile" className={navLinkClass}>{t('nav.profile')}</NavLink>
//                     {user?.role === 'admin' && (
//                       <NavLink to="/admin" className={navLinkClass}>{t('nav.adminPanel')}</NavLink>
//                     )}
//                     <button onClick={logout} className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-red-700">{t('nav.logout')}</button>
//                   </>
//                 ) : (
//                   <>
//                     <NavLink to="/login" className={navLinkClass}>{t('nav.login')}</NavLink>
//                     <NavLink to="/register" className={navLinkClass}>{t('nav.register')}</NavLink>
//                   </>
//                 )}
//               </div>
//               {/* Language Switcher */}
//               <LanguageSwitcher />
//             </div>
//           </div>
//         </nav>
//       </header>
      
//       <main className="flex-grow w-full flex flex-col items-center p-4 sm:p-6 lg:p-8">
//         <Outlet />
//       </main>
      
//       <Footer />
//     </div>
//   );
// };

// export default AppLayout;
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
    `px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out ${
      isActive
        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md transform scale-105'
        : 'text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-sm transform hover:scale-105'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 font-sans flex flex-col">
      <header className="bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-xl sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <Link 
              to="/" 
              className="text-2xl font-black text-slate-900 flex items-center gap-2 hover:scale-105 transition-transform duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Nyaya</span>
              <span className="text-slate-700">Saathi</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              {/* Main Navigation */}
              <div className="hidden md:flex items-center space-x-1 bg-slate-100/80 rounded-xl p-1.5 backdrop-blur-sm">
                <NavLink to="/" className={navLinkClass} end>{t('nav.home')}</NavLink>
                {isAuthenticated ? (
                  <>
                    <NavLink to="/dashboard" className={navLinkClass}>{t('nav.dashboard')}</NavLink>
                    <NavLink to="/profile" className={navLinkClass}>{t('nav.profile')}</NavLink>
                    {user?.role === 'admin' && (
                      <NavLink to="/admin" className={navLinkClass}>{t('nav.adminPanel')}</NavLink>
                    )}
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className={navLinkClass}>{t('nav.login')}</NavLink>
                    <NavLink to="/register" className={navLinkClass}>{t('nav.register')}</NavLink>
                  </>
                )}
              </div>

              {/* User Actions */}
              <div className="flex items-center space-x-3 ml-4">
                <LanguageSwitcher />
                {isAuthenticated && (
                  <button 
                    onClick={logout} 
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 transition-all duration-200 transform hover:scale-105 hover:shadow-md"
                  >
                    {t('nav.logout')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow w-full flex flex-col items-center p-6 sm:p-8 lg:p-10">
        <div className="w-full max-w-7xl">
          <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AppLayout;