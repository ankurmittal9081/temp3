import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import GlassCard from '../components/GlassCard';
import Spinner from '../components/Spinner';
import VoiceQueryModal from '../components/VoiceQueryModal';
import IssueCreateModal from '../components/IssueCreateModal';
import UploadDocumentModal from '../components/UploadDocumentModal';
import { Plus, FilePlus, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const DashboardPage = () => {
    const [data, setData] = useState({ issues: [], documents: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [isVoiceModalOpen, setVoiceModalOpen] = useState(false);
    const [isIssueModalOpen, setIssueModalOpen] = useState(false);
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);
    const [selectedIssueId, setSelectedIssueId] = useState(null);

    const fetchData = async () => {
        if (!loading) setLoading(true); // Ensure loading is true when refetching
        try {
            // THE FIX IS HERE: Correctly using Promise.all()
            const [issuesResponse, documentsResponse] = await Promise.all([
                axios.get('/citizens/issues'),
                axios.get('/citizens/documents')
            ]);
            
            setData({ 
                issues: issuesResponse.data.issues || [], 
                documents: documentsResponse.data.documents || [] 
            });
        } catch (err) {
            console.error("Dashboard fetch error:", err);
            setError('Failed to fetch your dashboard data. Your session may have expired. Please log in again.');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []); // Runs once on initial mount

    const handleIssueCreated = (newIssue) => {
        setData(prev => ({ ...prev, issues: [newIssue, ...prev.issues] }));
    };
    const handleDocumentUploaded = (newDoc) => {
        setData(prev => ({ ...prev, documents: [newDoc, ...prev.documents] }));
    };

    const openUploadModal = (issueId) => {
        setSelectedIssueId(issueId);
        setUploadModalOpen(true);
    };

    if (loading) return <Spinner />;
    
    if (error) {
        return (
            <div className="w-full max-w-4xl text-center p-8 bg-red-500/10 text-red-300 rounded-lg">
                <p className='font-semibold'>An Error Occurred</p>
                <p>{error}</p>
            </div>
        );
    }

    const hasData = data.issues.length > 0 || data.documents.length > 0;
    
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
            <p className="text-slate-400">Ready to start? Click a button below.</p>
            <div className='mt-6 flex justify-center items-center gap-4'>
                <button
                    onClick={() => setIssueModalOpen(true)}
                    className="btn-secondary"
                >
                    <FilePlus size={20} /> Report an Issue
                </button>
                <button
                    onClick={() => setVoiceModalOpen(true)}
                    className="btn-primary"
                >
                    <Plus size={20} /> Use Voice Query
                </button>
            </div>
        </motion.div>
    );

    const PopulatedDashboard = () => (
        <motion.div className="w-full max-w-7xl space-y-8" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div className="flex flex-wrap justify-between items-center gap-4" variants={itemVariants}>
                <h1 className="text-4xl font-bold text-white tracking-tight">Your Dashboard</h1>
                <div className="flex items-center gap-2 sm:gap-4">
                     <button onClick={() => setIssueModalOpen(true)} className="btn-secondary">
                        <FilePlus size={20} />
                        <span className="hidden sm:inline">New Legal Issue</span>
                     </button>
                     <button onClick={() => setVoiceModalOpen(true)} className="btn-primary">
                        <Plus size={20} />
                        <span className="hidden sm:inline">New Voice Query</span>
                     </button>
                </div>
            </motion.div>
            
            {data.issues.length > 0 && (
                <motion.div variants={itemVariants}>
                    <GlassCard>
                        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">My Legal Issues</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.issues.map(issue => (
                                <div key={issue._id} className="group relative p-4 bg-slate-700/50 rounded-lg border border-slate-700 hover:border-slate-600 hover:bg-slate-700 transition-all duration-300">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg text-white mb-1 pr-10">{issue.issueType}</h3>
                                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${ issue.status === 'Resolved' ? 'bg-green-500/20 text-green-300' : issue.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' : issue.status === 'Escalated' ? 'bg-orange-500/20 text-orange-300' : 'bg-blue-500/20 text-blue-300' }`}>{issue.status}</span>
                                    </div>
                                    <p className="text-slate-300 text-sm line-clamp-2 mt-1">{issue.description || "No description provided."}</p>
                                    <button onClick={() => openUploadModal(issue._id)} className="absolute top-2 right-2 p-1.5 bg-slate-800/50 text-slate-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-500/20 hover:text-cyan-300 focus:opacity-100">
                                        <Upload size={16} aria-label="Upload document for this issue"/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </motion.div>
            )}

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
                                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 hover:underline font-semibold">
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
            {hasData ? <PopulatedDashboard /> : <EmptyDashboard />}
            
            <VoiceQueryModal isOpen={isVoiceModalOpen} onClose={() => setVoiceModalOpen(false)} />
            <IssueCreateModal isOpen={isIssueModalOpen} onClose={() => setIssueModalOpen(false)} onIssueCreated={handleIssueCreated} />
            {selectedIssueId && <UploadDocumentModal isOpen={isUploadModalOpen} onClose={() => {setUploadModalOpen(false); setSelectedIssueId(null);}} issueId={selectedIssueId} onDocumentUploaded={handleDocumentUploaded} />}
        </>
    );
};
export default DashboardPage;