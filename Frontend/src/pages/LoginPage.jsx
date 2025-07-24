// // // import React, { useState } from 'react';
// // // import { useAuth } from '../context/AuthContext';
// // // import { Link, Navigate } from 'react-router-dom';
// // // import Spinner from '../components/Spinner';
// // // import { useTranslation } from 'react-i18next'; // Import the hook

// // // const LoginPage = () => {
// // //   const [email, setEmail] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [error, setError] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const { login, isAuthenticated, isLoading } = useAuth();
// // //   const { t } = useTranslation(); // Initialize the hook

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setError(null); setLoading(true);
// // //     try {
// // //       await login(email, password);
// // //     } catch (err) {
// // //       setError(err.message || 'An unknown error occurred.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };
  
// // //   if (isLoading) { return <Spinner />; }
// // //   if (isAuthenticated) { return <Navigate to="/dashboard" replace />; }

// // //   return (
// // //     <div className="w-full max-w-4xl mx-auto flex rounded-xl shadow-2xl overflow-hidden bg-slate-800/80 backdrop-blur-sm border border-slate-700 my-8">
// // //       <div className="hidden md:block md:w-1/2">
// // //         <img src="/hero-image.jpg" alt="Smiling women from rural India" className="w-full h-full object-cover" />
// // //       </div>
// // //       <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
// // //         <h2 className="text-3xl font-bold text-center text-white mb-2">{t('loginPage.title')}</h2>
// // //         <p className="text-center text-slate-300 mb-6">{t('loginPage.subtitle')}</p>
// // //         {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-md mb-4 text-center">{error}</div>}
// // //         <form onSubmit={handleSubmit} className="space-y-6">
// // //           <div>
// // //             <label htmlFor="email" className="block text-sm font-medium text-slate-300">{t('loginPage.emailLabel')}</label>
// // //             <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="input-style"/>
// // //           </div>
// // //           <div>
// // //             <label htmlFor="password" className="block text-sm font-medium text-slate-300">{t('loginPage.passwordLabel')}</label>
// // //             <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="input-style"/>
// // //           </div>
// // //           <div>
// // //             <button type="submit" disabled={loading} className="w-full btn-primary">
// // //               {loading ? t('loginPage.signingInButton') : t('loginPage.signInButton')}
// // //             </button>
// // //           </div>
// // //         </form>
// // //         <p className="mt-6 text-center text-sm text-slate-400">
// // //           {t('loginPage.noAccount')}{' '}
// // //           <Link to="/register" className="font-medium text-cyan-400 hover:text-cyan-300">{t('loginPage.signUpLink')}</Link>
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default LoginPage;

// // import React, { useState } from 'react';
// // import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

// // const LoginPage = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [focusedField, setFocusedField] = useState(null);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError(null);
// //     setLoading(true);
    
// //     // Simulate login process
// //     try {
// //       // Simulate API call delay
// //       await new Promise(resolve => setTimeout(resolve, 2000));
      
// //       // Basic validation demo
// //       if (email === 'demo@example.com' && password === 'password123') {
// //         console.log('Login successful!');
// //         // In real app, redirect to dashboard here
// //       } else {
// //         throw new Error('Invalid email or password');
// //       }
// //     } catch (err) {
// //       setError(err.message || 'An unknown error occurred.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
// //       {/* Animated background elements */}
// //       <div className="absolute inset-0 overflow-hidden">
// //         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
// //         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
// //         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
// //       </div>

// //       {/* Floating particles */}
// //       <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //         {[...Array(20)].map((_, i) => (
// //           <div
// //             key={i}
// //             className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-bounce"
// //             style={{
// //               left: `${Math.random() * 100}%`,
// //               top: `${Math.random() * 100}%`,
// //               animationDelay: `${Math.random() * 3}s`,
// //               animationDuration: `${2 + Math.random() * 2}s`
// //             }}
// //           ></div>
// //         ))}
// //       </div>

// //       <div className="relative z-10 w-full max-w-md">
// //         {/* Logo/Brand section */}
// //         <div className="text-center mb-8">
// //           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl mb-4 shadow-2xl">
// //             <Sparkles className="w-8 h-8 text-white" />
// //           </div>
// //           <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-2">
// //             Welcome Back
// //           </h1>
// //           <p className="text-slate-400 text-lg">
// //             Sign in to continue your journey
// //           </p>
// //         </div>

// //         {/* Main login card */}
// //         <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 relative overflow-hidden">
// //           {/* Card glow effect */}
// //           <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 rounded-3xl"></div>
          
// //           <div className="relative z-10">
// //             {error && (
// //               <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/50 text-red-200 p-4 rounded-2xl mb-6 text-center relative overflow-hidden">
// //                 <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10"></div>
// //                 <div className="relative z-10">{error}</div>
// //               </div>
// //             )}

// //             <div className="space-y-6">
// //               {/* Email field */}
// //               <div className="relative">
// //                 <label 
// //                   htmlFor="email" 
// //                   className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
// //                     focusedField === 'email' ? 'text-cyan-300' : 'text-slate-300'
// //                   }`}
// //                 >
// //                   Email Address
// //                 </label>
// //                 <div className="relative">
// //                   <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
// //                     focusedField === 'email' ? 'text-cyan-400' : 'text-slate-400'
// //                   }`} />
// //                   <input
// //                     id="email"
// //                     type="email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     onFocus={() => setFocusedField('email')}
// //                     onBlur={() => setFocusedField(null)}
// //                     placeholder="your@email.com"
// //                     required
// //                     className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-slate-400 transition-all duration-300 ${
// //                       focusedField === 'email' 
// //                         ? 'border-cyan-400 shadow-lg shadow-cyan-400/25 bg-white/10' 
// //                         : 'border-white/20 hover:border-white/30'
// //                     } focus:outline-none focus:ring-0`}
// //                   />
// //                 </div>
// //               </div>

// //               {/* Password field */}
// //               <div className="relative">
// //                 <label 
// //                   htmlFor="password" 
// //                   className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
// //                     focusedField === 'password' ? 'text-purple-300' : 'text-slate-300'
// //                   }`}
// //                 >
// //                   Password
// //                 </label>
// //                 <div className="relative">
// //                   <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
// //                     focusedField === 'password' ? 'text-purple-400' : 'text-slate-400'
// //                   }`} />
// //                   <input
// //                     id="password"
// //                     type={showPassword ? 'text' : 'password'}
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     onFocus={() => setFocusedField('password')}
// //                     onBlur={() => setFocusedField(null)}
// //                     placeholder="••••••••"
// //                     required
// //                     className={`w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-slate-400 transition-all duration-300 ${
// //                       focusedField === 'password' 
// //                         ? 'border-purple-400 shadow-lg shadow-purple-400/25 bg-white/10' 
// //                         : 'border-white/20 hover:border-white/30'
// //                     } focus:outline-none focus:ring-0`}
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
// //                   >
// //                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Submit button */}
// //               <button
// //                 type="submit"
// //                 onClick={handleSubmit}
// //                 disabled={loading}
// //                 className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
// //               >
// //                 <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
// //                 <div className="relative z-10 flex items-center justify-center space-x-2">
// //                   {loading ? (
// //                     <>
// //                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //                       <span>Signing In...</span>
// //                     </>
// //                   ) : (
// //                     <>
// //                       <span>Sign In</span>
// //                       <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
// //                     </>
// //                   )}
// //                 </div>
// //               </button>
// //             </div>

// //             {/* Sign up link */}
// //             <div className="mt-8 text-center">
// //               <p className="text-slate-400">
// //                 Don't have an account?{' '}
// //                 <button 
// //                   className="font-semibold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text hover:from-cyan-300 hover:to-purple-300 transition-all duration-300 relative group"
// //                   onClick={() => console.log('Navigate to register')}
// //                 >
// //                   Sign up
// //                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
// //                 </button>
// //               </p>
// //             </div>

// //             {/* Forgot password link */}
// //             <div className="mt-4 text-center">
// //               <button 
// //                 className="text-sm text-slate-400 hover:text-white transition-colors duration-300"
// //                 onClick={() => console.log('Navigate to forgot password')}
// //               >
// //                 Forgot your password?
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Footer */}
// //         <div className="text-center mt-8 text-slate-500 text-sm">
// //           <p>Secure • Fast • Reliable</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginPage;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Make sure this is your actual Auth hook
// import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth(); // your custom auth hook
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [focusedField, setFocusedField] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       const res = await login(email, password);
//       if (res.success) {
//         // Navigate based on role
//         const role = res.data.user.role;
//         if (role === 'admin') navigate('/admin');
//         else if (role === 'citizen') navigate('/dashboard');
//         else navigate('/');
//       } else {
//         throw new Error(res.message || 'Invalid login');
//       }
//     } catch (err) {
//       setError(err.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Animated background effects */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }} />
//       </div>

//       <div className="relative z-10 w-full max-w-md">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl mb-4 shadow-2xl">
//             <Sparkles className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-2">
//             Welcome Back
//           </h1>
//           <p className="text-slate-400 text-lg">Sign in to continue your journey</p>
//         </div>

//         <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 relative overflow-hidden">
//           <div className="relative z-10">
//             {error && (
//               <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/50 text-red-200 p-4 rounded-2xl mb-6 text-center">
//                 {error}
//               </div>
//             )}

//             <div className="space-y-6">
//               {/* Email */}
//               <div className="relative">
//                 <label className={`block text-sm mb-2 ${focusedField === 'email' ? 'text-cyan-300' : 'text-slate-300'}`}>
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${focusedField === 'email' ? 'text-cyan-400' : 'text-slate-400'}`} />
//                   <input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     onFocus={() => setFocusedField('email')}
//                     onBlur={() => setFocusedField(null)}
//                     placeholder="your@email.com"
//                     required
//                     className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white placeholder-slate-400 transition-all ${
//                       focusedField === 'email' ? 'border-cyan-400 shadow-lg bg-white/10' : 'border-white/20 hover:border-white/30'
//                     } focus:outline-none`}
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div className="relative">
//                 <label className={`block text-sm mb-2 ${focusedField === 'password' ? 'text-purple-300' : 'text-slate-300'}`}>
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${focusedField === 'password' ? 'text-purple-400' : 'text-slate-400'}`} />
//                   <input
//                     id="password"
//                     type={showPassword ? 'text' : 'password'}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     onFocus={() => setFocusedField('password')}
//                     onBlur={() => setFocusedField(null)}
//                     placeholder="••••••••"
//                     required
//                     className={`w-full pl-12 pr-12 py-4 bg-white/5 border rounded-2xl text-white placeholder-slate-400 transition-all ${
//                       focusedField === 'password' ? 'border-purple-400 shadow-lg bg-white/10' : 'border-white/20 hover:border-white/30'
//                     } focus:outline-none`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
//               >
//                 <div className="flex items-center justify-center space-x-2">
//                   {loading ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       <span>Signing In...</span>
//                     </>
//                   ) : (
//                     <>
//                       <span>Sign In</span>
//                       <ArrowRight className="w-5 h-5" />
//                     </>
//                   )}
//                 </div>
//               </button>
//             </div>

//             {/* Links */}
//             <div className="mt-8 text-center text-slate-400 text-sm">
//               <p>
//                 Don’t have an account?{' '}
//                 <span onClick={() => navigate('/register')} className="text-cyan-400 hover:text-cyan-300 cursor-pointer font-medium">
//                   Sign up
//                 </span>
//               </p>
//               <p className="mt-2">
//                 <span onClick={() => navigate('/forgot-password')} className="hover:text-white cursor-pointer">
//                   Forgot your password?
//                 </span>
//               </p>
//             </div>
//           </div>
//         </form>

//         <div className="text-center mt-8 text-slate-500 text-sm">
//           <p>Secure • Fast • Reliable</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // 🔐 Your custom auth hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        const role = res.data.user.role;
        if (role === 'admin') navigate('/admin');
        else if (role === 'citizen') navigate('/dashboard');
        else navigate('/');
      } else {
        throw new Error(res.message || 'Invalid login');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 🌌 Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* 🧠 Login Box */}
      <div className="relative z-10 w-full max-w-md">
        {/* 🧊 Brand/Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl mb-4 shadow-2xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-lg">Sign in to continue your journey</p>
        </div>

        {/* 📋 Login Form */}
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 relative overflow-hidden">
          {loading && (
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center rounded-3xl z-20">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          <div className="relative z-10">
            {/* 🚨 Error Box */}
            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/50 text-red-200 p-4 rounded-2xl mb-6 text-center relative">
                <button onClick={() => setError(null)} className="absolute top-2 right-3 text-red-300 hover:text-white text-sm">
                  ×
                </button>
                {error}
              </div>
            )}

            {/* ✏️ Email */}
            <div className="mb-6">
              <label htmlFor="email" className={`block text-sm mb-2 ${focusedField === 'email' ? 'text-cyan-300' : 'text-slate-300'}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${focusedField === 'email' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="your@email.com"
                  required
                  className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white placeholder-slate-400 transition-all ${
                    focusedField === 'email' ? 'border-cyan-400 shadow-lg bg-white/10' : 'border-white/20 hover:border-white/30'
                  } focus:outline-none`}
                />
              </div>
            </div>

            {/* 🔒 Password */}
            <div className="mb-6">
              <label htmlFor="password" className={`block text-sm mb-2 ${focusedField === 'password' ? 'text-purple-300' : 'text-slate-300'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${focusedField === 'password' ? 'text-purple-400' : 'text-slate-400'}`} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  required
                  className={`w-full pl-12 pr-12 py-4 bg-white/5 border rounded-2xl text-white placeholder-slate-400 transition-all ${
                    focusedField === 'password' ? 'border-purple-400 shadow-lg bg-white/10' : 'border-white/20 hover:border-white/30'
                  } focus:outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* ✅ Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <div className="flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </div>
            </button>

            {/* 🌐 Links */}
            <div className="mt-8 text-center text-slate-400 text-sm">
              <p>
                Don’t have an account?{' '}
                <span onClick={() => navigate('/register')} className="text-cyan-400 hover:text-cyan-300 cursor-pointer font-medium">
                  Sign up
                </span>
              </p>
              <p className="mt-2">
                <span onClick={() => navigate('/forgot-password')} className="hover:text-white cursor-pointer">
                  Forgot your password?
                </span>
              </p>
            </div>
          </div>
        </form>

        {/* 📦 Footer */}
        <div className="text-center mt-8 text-slate-500 text-sm">
          <p>Secure • Fast • Reliable</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
