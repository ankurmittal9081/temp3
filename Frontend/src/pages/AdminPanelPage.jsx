import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig';
import Spinner from '../components/Spinner';
import { Plus } from 'lucide-react';

// Import the new modals
import AddKioskModal from '../components/AddKioskModal.jsx';
import AddSubscriptionModal from '../components/AddSubscriptionModal.jsx';

const AdminPanelPage = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [isKioskModalOpen, setKioskModalOpen] = useState(false);
    const [isSubModalOpen, setSubModalOpen] = useState(false);
    
    const tabs = ['users', 'admins', 'employees', 'paralegals', 'kiosks', 'subscriptions', 'issues', 'documents', 'voicequeries'];

    const tabName = (tab) => tab.charAt(0).toUpperCase() + tab.slice(1);

    // Determine if the current tab should have a "Create" button
    const showCreateButton = ['kiosks', 'subscriptions'].includes(activeTab);

    const handleCreateClick = () => {
        if (activeTab === 'kiosks') setKioskModalOpen(true);
        if (activeTab === 'subscriptions') setSubModalOpen(true);
    };

    return (
        <>
            <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
                    {showCreateButton && (
                        <button onClick={handleCreateClick} className="btn-primary w-auto flex items-center gap-2">
                            <Plus size={16} /> Create New {tabName(activeTab).slice(0, -1)}
                        </button>
                    )}
                </div>
                
                <div className="flex flex-wrap gap-2 border-b border-slate-700">
                    {tabs.map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'text-cyan-400 border-cyan-400' : 'text-slate-400 border-transparent hover:text-white hover:border-slate-500'}`}>
                            {tabName(tab)}
                        </button>
                    ))}
                </div>

                <div>
                    <DataTable endpoint={`/${activeTab}`} title={tabName(activeTab)} key={activeTab} />
                </div>
            </div>

            <AddKioskModal isOpen={isKioskModalOpen} onClose={() => setKioskModalOpen(false)} onSuccess={() => { /* DataTable will refetch via key change */ setActiveTab(''); setTimeout(() => setActiveTab('kiosks'), 50); }} />
            <AddSubscriptionModal isOpen={isSubModalOpen} onClose={() => setSubModalOpen(false)} onSuccess={() => { setActiveTab(''); setTimeout(() => setActiveTab('subscriptions'), 50); }} />
        </>
    );
};

// DataTable component remains largely the same, no changes needed here.
const DataTable = ({ endpoint, title }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        setLoading(true); setError('');
        try {
            const response = await apiClient.get(endpoint);
            setData(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            setError(err.message || `Failed to fetch ${title}.`);
            setData([]);
        } finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, [endpoint]);

    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure you want to delete this ${title.slice(0, -1)}?`)) {
            try {
                await apiClient.delete(`${endpoint}/${id}`);
                fetchData(); // Refresh data after delete
            } catch (err) {
                alert(`Failed to delete: ${err.message}`);
            }
        }
    };

    if (loading) return <Spinner />;
    if (error) return <div className="text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>;
    if (data.length === 0) return <div className="text-slate-400 p-4 bg-slate-800/50 rounded-lg">No {title} found.</div>;

    const headers = Object.keys(data[0]).filter(key => !['_id', '__v', 'password', 'isDeleted', 'updatedAt', 'refreshToken']);

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-slate-800">
                        <tr>
                            {headers.map(header => <th key={header} className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">{header.replace(/([A-Z])/g, ' $1').trim()}</th>)}
                            <th className="px-6 py-3 text-right text-xs font-medium text-cyan-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-900/50 divide-y divide-slate-700">
                        {data.map(item => (
                            <tr key={item._id} className="hover:bg-slate-700/50 transition-colors">
                                {headers.map(header => (
                                    <td key={`${item._id}-${header}`} className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                        {String(typeof item[header] === 'object' && item[header] !== null ? JSON.stringify(item[header]) : item[header])}
                                    </td>
                                ))}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-400">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanelPage;