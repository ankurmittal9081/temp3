import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useTranslation } from 'react-i18next'; // Import the hook

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const { t } = useTranslation(); // Initialize the hook

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
  
  if (isLoading) { return <Spinner />; }
  if (isAuthenticated) { return <Navigate to="/dashboard" replace />; }

  return (
    <div className="w-full max-w-4xl mx-auto flex rounded-xl shadow-2xl overflow-hidden bg-slate-800/80 backdrop-blur-sm border border-slate-700 my-8">
      <div className="hidden md:block md:w-1/2">
        <img src="/hero-image.jpg" alt="Smiling women from rural India" className="w-full h-full object-cover" />
      </div>
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center text-white mb-2">{t('loginPage.title')}</h2>
        <p className="text-center text-slate-300 mb-6">{t('loginPage.subtitle')}</p>
        {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-md mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">{t('loginPage.emailLabel')}</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="input-style"/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300">{t('loginPage.passwordLabel')}</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="input-style"/>
          </div>
          <div>
            <button type="submit" disabled={loading} className="w-full btn-primary">
              {loading ? t('loginPage.signingInButton') : t('loginPage.signInButton')}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          {t('loginPage.noAccount')}{' '}
          <Link to="/register" className="font-medium text-cyan-400 hover:text-cyan-300">{t('loginPage.signUpLink')}</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;