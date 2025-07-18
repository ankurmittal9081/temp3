import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import GlassCard from '../components/GlassCard';
import Spinner from '../components/Spinner';
import VoiceQueryModal from '../components/VoiceQueryModal';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

// Animation variants for the main container
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Animation variants for individual child elements
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const DashboardPage = () => {
    const [data, setData] = useState({ issues: [], documents: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const [issuesResponse, documentsResponse] = await axios.all([
                axios.get('/citizens/issues'),
                axios.get('/citizens/documents')
            ]);
            setData({
                issues: issuesResponse.data.issues || [],
                documents: documentsResponse.data.documents || []
            });
            } catch (err) {
                console.error("Dashboard fetch error:", err);
                setError('Failed to fetch your dashboard data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Spinner />;
    
    if (error) {
        return (
            <div className="w-full max-w-7xl text-center p-6 bg-red-500/10 text-red-300 rounded-lg">
                <p>{error}</p>
            </div>
        );
    }

    // A flag to check if there is any data to display
    const hasData = data.issues.length > 0 || data.documents.length > 0;

    // Component for the beautiful empty state
    const EmptyDashboard = () => (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 max-w-2xl"
        >
            <img src="/dashboard-welcome.svg" alt="Welcome illustration" className="w-48 h-48 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">Welcome to NyayaSaathi!</h2>
            <p className="mt-2 text-slate-300">It looks like you don't have any active issues or documents yet.</p>
            <p className="text-slate-400">Ready to start? Click the button below.</p>
            <button
                onClick={() => setModalOpen(true)}
                className="mt-6 flex items-center gap-2 mx-auto px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/20 transform hover:scale-105"
            >
                <Plus size={20} /> Create Your First Query
            </button>
        </motion.div>
    );

    // Component for the populated dashboard
    const PopulatedDashboard = () => (
        <motion.div
            className="w-full max-w-7xl space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div className="flex justify-between items-center" variants={itemVariants}>
                <h1 className="text-4xl font-bold text-white tracking-tight">Your Dashboard</h1>
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/20 transform hover:scale-105"
                >
                    <Plus size={20} /> New Voice Query
                </button>
            </motion.div>

            {/* Legal Issues Section */}
            {data.issues.length > 0 && (
                <motion.div variants={itemVariants}>
                    <GlassCard>
                        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">My Legal Issues</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.issues.map(issue => (
                                <div key={issue._id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg text-white mb-1">{issue.issueType}</h3>
                                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                                            issue.status === 'Resolved' ? 'bg-green-500/20 text-green-300' :
                                            issue.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' :
                                            issue.status === 'Escalated' ? 'bg-orange-500/20 text-orange-300' :
                                            'bg-blue-500/20 text-blue-300'
                                        }`}>{issue.status}</span>
                                    </div>
                                    <p className="text-slate-300 text-sm line-clamp-2">{issue.description || "No description provided."}</p>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </motion.div>
            )}

            {/* Documents Section */}
            {data.documents.length > 0 && (
                <motion.div variants={itemVariants}>
                    <GlassCard>
                        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">My Documents</h2>
                        <ul className="space-y-3">
                            {data.documents.map(doc => (
                                <li key={doc._id} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors">
                                    <div>
                                        <p className="font-medium text-white">{doc.documentType}</p>
                                        <p className="text-sm text-slate-400">Related Issue: {doc.issueId?.issueType || 'N/A'}</p>
                                    </div>
                                    <a 
                                      href={doc.fileUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="text-cyan-400 hover:text-cyan-300 hover:underline font-semibold"
                                    >
                                      View Document
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </GlassCard>
                </motion.div>
            )}
        </motion.div>
    );

    return (
        <>
            {/* Conditionally render the correct view based on data presence */}
            {hasData ? <PopulatedDashboard /> : <EmptyDashboard />}
            
            {/* The Voice Query Modal is always in the DOM but hidden, controlled by its own state */}
            <VoiceQueryModal 
                isOpen={isModalOpen} 
                onClose={() => setModalOpen(false)} 
            />
        </>
    );
};

export default DashboardPage;