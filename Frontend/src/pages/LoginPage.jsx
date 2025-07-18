import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex rounded-xl shadow-2xl overflow-hidden bg-slate-800/80 backdrop-blur-sm border border-slate-700">
      {/* Image Side */}
      <div className="hidden md:block md:w-1/2">
        <img 
          src="/hero-image.jpg" 
          alt="Community hands together" 
          className="w-full h-full object-cover" 
        />
      </div>
      {/* Form Side */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome Back!</h2>
        <p className="text-center text-slate-300 mb-6">Sign in to continue to NyayaSaathi.</p>
        {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-md mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email Address</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="input-style"/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="input-style"/>
          </div>
          <div>
            <button type="submit" disabled={loading} className="w-full btn-primary">{loading ? 'Signing In...' : 'Sign In'}</button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-cyan-400 hover:text-cyan-300">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;