import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Import the hook

const PublicHero = () => {
    const { t } = useTranslation(); // Initialize the hook

    return (
        <section className="min-h-screen w-full flex items-center justify-center text-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-slate-900/30 backdrop-blur-sm p-10 rounded-2xl border border-slate-700/50"
            >
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
                    <span dangerouslySetInnerHTML={{ __html: t('publicHero.title', { nsSeparator: '||' }) }} />
                </h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 mb-8">
                    {t('publicHero.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link to="/register" className="w-full sm:w-auto px-8 py-3 font-bold text-white bg-cyan-500 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20">
                        {t('publicHero.getStarted')}
                    </Link>
                    <Link to="/login" className="w-full sm:w-auto px-8 py-3 font-bold text-white bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-full transition-all duration-300 transform hover:scale-105">
                        {t('publicHero.login')}
                    </Link>
                </div>
            </motion.div>
        </section>
    );
};

export default PublicHero;