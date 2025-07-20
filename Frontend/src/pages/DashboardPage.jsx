import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/axiosConfig';
import GlassCard from '../components/GlassCard';
import Spinner from '../components/Spinner';
import VoiceCommandModal from '../components/VoiceCommandModal'; // <-- IMPORT THE NEW MODAL
import { Mic, FileText, Trash2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const DashboardPage = () => {
    const [data, setData] = useState({ issues: [], documents: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isVoiceModalOpen, setVoiceModalOpen] = useState(false); // <-- Single modal state
    
    const fetchData = useCallback(async () => {
        try {
            const [issuesResponse, documentsResponse] = await Promise.all([
                apiClient.get('/citizens/issues'),
                apiClient.get('/citizens/documents')
            ]);
            setData({ 
                issues: issuesResponse.data.issues || [], 
                documents: documentsResponse.data.documents || [] 
            });
        } catch (err) {
            console.error("Dashboard fetch error:", err);
            setError(err.message || 'Failed to fetch your dashboard data.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = async (type, id) => {
        const itemType = type === 'issues' ? 'issue' : 'document';
        if (!window.confirm(`Are you sure you want to delete this ${itemType}?`)) return;
        
        const toastId = toast.loading(`Deleting ${itemType}...`);
        try {
            await apiClient.delete(`/${type}/${id}`);
            toast.success(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} deleted successfully.`, { id: toastId });
            // Refresh data by calling fetchData again to ensure consistency
            fetchData();
        } catch (err) {
            toast.error(`Failed to delete ${itemType}: ${err.message}`, { id: toastId });
        }
    };

    if (loading) return <div className="h-screen w-full flex items-center justify-center"><Spinner /></div>;
    if (error) return <div className="w-full max-w-4xl text-center p-8 bg-red-500/10 text-red-300 rounded-lg"><p className='font-semibold'>An Error Occurred</p><p>{error}</p></div>;
    
    return (
        <>
            <motion.div className="w-full max-w-7xl space-y-8" variants={containerVariants} initial="hidden" animate="visible">
                <motion.div className="flex flex-wrap justify-between items-center gap-4" variants={itemVariants}>
                    <h1 className="text-4xl font-bold text-white tracking-tight">Your Dashboard</h1>
                     {/* --- THE NEW CENTRAL VOICE BUTTON --- */}
                    <button onClick={() => setVoiceModalOpen(true)} className="btn-primary flex items-center gap-2 text-base py-3 px-6 rounded-full shadow-lg shadow-cyan-500/20 transform hover:scale-105">
                        <Mic size={20} /> Start Voice Command
                    </button>
                </motion.div>
                
                {/* Legal Issues Section */}
                <motion.div variants={itemVariants}>
                    <GlassCard>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-cyan-400">My Legal Issues</h2>
                        </div>
                        {data.issues.length > 0 ? (
                            <div className="space-y-3">
                                <AnimatePresence>
                                {data.issues.map(issue => (
                                    <motion.div layout key={issue._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 bg-slate-700/50 rounded-lg border border-slate-700 flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-white">{issue.issueType}</p>
                                            <p className="text-sm text-slate-300">{issue.description}</p>
                                            <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${issue.status === 'Resolved' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{issue.status}</span>
                                        </div>
                                        <button onClick={() => handleDelete('issues', issue._id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </motion.div>
                                ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-slate-400 flex flex-col items-center gap-2">
                                <Sparkles className="text-cyan-400"/>
                                No legal issues found. Use the Voice Command button to create one.
                            </div>
                        )}
                    </GlassCard>
                </motion.div>

                {/* Documents Section */}
                <motion.div variants={itemVariants}>
                    <GlassCard>
                         <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-cyan-400">My Documents</h2>
                        </div>
                        {data.documents.length > 0 ? (
                            <div className="space-y-3">
                                <AnimatePresence>
                                {data.documents.map(doc => (
                                    <motion.div layout key={doc._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 bg-slate-700/50 rounded-lg border border-slate-700 flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <FileText className="text-cyan-400" />
                                            <div>
                                                <p className="font-bold text-white">{doc.documentType}</p>
                                                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-500 hover:underline">View Document</a>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDelete('documents', doc._id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </motion.div>
                                ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                             <div className="text-center py-8 text-slate-400 flex flex-col items-center gap-2">
                                <Sparkles className="text-cyan-400"/>
                                No documents found. Use the Voice Command button to add one.
                            </div>
                        )}
                    </GlassCard>
                </motion.div>
            </motion.div>

            <VoiceCommandModal isOpen={isVoiceModalOpen} onClose={() => setVoiceModalOpen(false)} onSuccess={fetchData} />
        </>
    );
};
export default DashboardPage;