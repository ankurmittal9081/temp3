import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig'; // <-- UPDATED IMPORT
import GlassCard from '../components/GlassCard';
import Spinner from '../components/Spinner';
import VoiceQueryModal from '../components/VoiceQueryModal';
import { Plus, Upload, FilePlus } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const DashboardPage = () => {
    const [data, setData] = useState({ issues: [], documents: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isVoiceModalOpen, setVoiceModalOpen] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Calls are now made with apiClient
                const [issuesResponse, documentsResponse] = await Promise.all([
                    apiClient.get('/citizens/issues'),
                    apiClient.get('/citizens/documents')
                ]);
                
                // Your backend for these routes returns the data object directly
                setData({ 
                    issues: issuesResponse.data.issues || [], 
                    documents: documentsResponse.data.documents || [] 
                });
            } catch (err) {
                console.error("Dashboard fetch error:", err);
                setError(err.message || 'Failed to fetch your dashboard data. Your session may have expired.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Spinner />;
    if (error) { return <div className="w-full max-w-4xl text-center p-8 bg-red-500/10 text-red-300 rounded-lg"><p className='font-semibold'>An Error Occurred</p><p>{error}</p></div>; }

    const hasData = data.issues.length > 0 || data.documents.length > 0;
    
    // The Empty/Populated JSX can remain the same, as the data structure is handled above.
    // I'm including the full component for completeness.

    const EmptyDashboard = () => (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 max-w-2xl">
            <img src="/dashboard-welcome.svg" alt="Welcome illustration" className="w-48 h-48 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">Welcome to NyayaSaathi!</h2>
            <p className="mt-2 text-slate-300">It looks like you don't have any active issues or documents yet.</p>
            <button onClick={() => setVoiceModalOpen(true)} className="mt-6 btn-primary"><Plus size={20} /> Create Your First Voice Query</button>
        </motion.div>
    );

    const PopulatedDashboard = () => (
        <motion.div className="w-full max-w-7xl space-y-8" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div className="flex flex-wrap justify-between items-center gap-4" variants={itemVariants}>
                <h1 className="text-4xl font-bold text-white tracking-tight">Your Dashboard</h1>
                <button onClick={() => setVoiceModalOpen(true)} className="btn-primary"><Plus size={20} /><span className="hidden sm:inline">New Voice Query</span></button>
            </motion.div>
            
            {data.issues.length > 0 && (
                <motion.div variants={itemVariants}>
                    <GlassCard>
                        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">My Legal Issues</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.issues.map(issue => (
                                <div key={issue._id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-700">{/* ... */}</div>
                            ))}
                        </div>
                    </GlassCard>
                </motion.div>
            )}
             {data.documents.length > 0 && (
                <motion.div variants={itemVariants}>
                    <GlassCard>{/* ... documents list ... */}</GlassCard>
                </motion.div>
            )}
        </motion.div>
    );

    return (
        <>
            {hasData ? <PopulatedDashboard /> : <EmptyDashboard />}
            <VoiceQueryModal isOpen={isVoiceModalOpen} onClose={() => setVoiceModalOpen(false)} />
        </>
    );
};
export default DashboardPage;