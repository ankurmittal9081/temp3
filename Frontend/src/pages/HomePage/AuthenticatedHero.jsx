import React from 'react';
import { motion } from 'framer-motion';
import { Mic, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AuthenticatedHero = ({ onVoiceQueryClick }) => {
    const { user } = useAuth();

    return (
        <section className="min-h-screen w-full flex items-center justify-center text-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-slate-900/30 backdrop-blur-sm p-10 rounded-2xl border border-slate-700/50 w-full max-w-4xl"
            >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={32} className="text-cyan-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                        Welcome back, {user?.fullName || 'User'}!
                    </h1>
                </div>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-8">
                    Legal help is just a word away. Start a voice query now to get assistance with your legal paperwork.
                </p>

                <button
                    onClick={onVoiceQueryClick}
                    className="btn-primary text-lg py-4 px-10 rounded-full shadow-lg shadow-cyan-500/20 transform hover:scale-105"
                >
                    <Mic size={24} />
                    Start Your First Voice Query
                </button>
            </motion.div>
        </section>
    );
};

export default AuthenticatedHero;