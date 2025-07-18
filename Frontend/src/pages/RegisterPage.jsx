import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '', aadhaarNumber: '', role: 'citizen' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); setLoading(true);
        try {
            await register(formData);
        } catch (err) {
            setError(err.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex rounded-xl shadow-2xl overflow-hidden bg-slate-800/80 backdrop-blur-sm border border-slate-700">
            {/* Image Side */}
            <div className="hidden md:block md:w-1/2">
                <img src="/login-background.png" alt="Community hands together" className="w-full h-full object-cover" />
            </div>
            {/* Form Side */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Create an Account</h2>
                {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-md mb-4 text-center">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="fullName" placeholder="Full Name" onChange={handleChange} required className="input-style" />
                    <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required className="input-style" />
                    <input name="password" type="password" placeholder="Password (min 6 characters)" onChange={handleChange} required className="input-style" />
                    <input name="aadhaarNumber" placeholder="Aadhaar Number (12 digits)" onChange={handleChange} required pattern="\d{12}" title="Must be 12 digits" className="input-style" />
                    <select name="role" value={formData.role} onChange={handleChange} className="input-style">
                        <option value="citizen">Citizen</option>
                        <option value="paralegal">Paralegal</option>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit" disabled={loading} className="w-full btn-primary">{loading ? 'Creating Account...' : 'Register'}</button>
                </form>
                <p className="mt-6 text-center text-sm text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300">Sign in</Link>
                </p>
            </div>
        </div>
    );
};
export default RegisterPage;