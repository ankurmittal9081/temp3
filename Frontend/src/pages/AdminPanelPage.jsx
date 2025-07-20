import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig';
import Spinner from '../components/Spinner';
import { Plus, Edit } from 'lucide-react';

// Import all necessary modals
import AddKioskModal from '../components/AddKioskModal.jsx';
import AddSubscriptionModal from '../components/AddSubscriptionModal.jsx';
import GenericEditModal from '../components/GenericEditModal.jsx'; // <-- The new, powerful edit modal

// Central configuration for all tables. This drives the entire page.
const columnsConfig = {
  users: [
    { header: 'Full Name', accessor: 'fullName' }, { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' }, { header: 'Phone', accessor: 'phoneNumber' },
  ],
  admins: [
    { header: 'Name', accessor: (item) => item.user?.fullName || 'N/A' },
    { header: 'Email', accessor: (item) => item.user?.email || 'N/A' },
    { header: 'Admin Role', accessor: 'adminRole' }, { header: 'Status', accessor: 'status' },
  ],
  employees: [
    { header: 'Name', accessor: (item) => item.user?.fullName || 'N/A' },
    { header: 'Email', accessor: (item) => item.user?.email || 'N/A' },
    { header: 'Department', accessor: 'department' }, { header: 'Designation', accessor: 'designation' },
  ],
  paralegals: [
    { header: 'Name', accessor: (item) => item.user?.fullName || 'N/A' },
    { header: 'Email', accessor: (item) => item.user?.email || 'N/A' },
    { header: 'Active', accessor: 'active' }, { header: 'Rating', accessor: 'rating' },
  ],
  kiosks: [
    { header: 'Location', accessor: 'location' }, { header: 'Village', accessor: 'village' },
    { header: 'Operator', accessor: 'operatorName' }, { header: 'Organization', accessor: 'organizationType' },
    { header: 'Active', accessor: 'isActive' },
  ],
  subscriptions: [
    { header: 'Org Type', accessor: 'organizationType' }, { header: 'Plan', accessor: 'plan' },
    { header: 'Status', accessor: 'paymentStatus' },
    { header: 'Expires On', accessor: (item) => new Date(item.expiryDate).toLocaleDateString() },
  ],
  issues: [
    { header: 'Issue Type', accessor: 'issueType' }, { header: 'Status', accessor: 'status' },
    { header: 'User ID', accessor: 'userId' }, { header: 'Description', accessor: 'description' },
  ],
  documents: [
    { header: 'Doc Type', accessor: 'documentType' }, { header: 'Status', accessor: 'submissionStatus' },
    { header: 'User ID', accessor: 'userId' }, { header: 'Issue ID', accessor: 'issueId' },
  ],
  voicequeries: [
    { header: 'Language', accessor: 'language' }, { header: 'User ID', accessor: 'userId' },
    { header: 'Issue ID', accessor: 'issueId' }, { header: 'Text', accessor: 'transcribedText' },
  ],
};

const AdminPanelPage = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [editingItem, setEditingItem] = useState(null);

    // State for all modals
    const [isAddKioskModalOpen, setAddKioskModalOpen] = useState(false);
    const [isAddSubModalOpen, setAddSubModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    
    const tabs = Object.keys(columnsConfig);
    const tabName = (tab) => tab.charAt(0).toUpperCase() + tab.slice(1);

    // Determine which tabs have "Create" or "Edit" functionality
    const canCreate = ['kiosks', 'subscriptions'].includes(activeTab);
    const canEdit = !['subscriptions', 'voicequeries'].includes(activeTab); // Example: disable editing for some tabs

    const handleCreateClick = () => {
        if (activeTab === 'kiosks') setAddKioskModalOpen(true);
        if (activeTab === 'subscriptions') setAddSubModalOpen(true);
    };

    const handleEditClick = (item) => {
        setEditingItem(item);
        setEditModalOpen(true);
    };
    
    const forceRerender = (tab) => {
        // A simple trick to force the DataTable to re-fetch its data
        setActiveTab('');
        setTimeout(() => setActiveTab(tab), 50);
    }

    return (
        <>
            <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
                    {canCreate && (
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
                    <DataTable 
                        endpoint={`/${activeTab}`} 
                        title={tabName(activeTab)} 
                        columns={columnsConfig[activeTab]} 
                        onEdit={canEdit ? handleEditClick : null} // Pass handler only if editable
                        key={activeTab}
                    />
                </div>
            </div>

            {/* Modals are all kept here */}
            <AddKioskModal isOpen={isAddKioskModalOpen} onClose={() => setAddKioskModalOpen(false)} onSuccess={() => forceRerender('kiosks')} />
            <AddSubscriptionModal isOpen={isAddSubModalOpen} onClose={() => setAddSubModalOpen(false)} onSuccess={() => forceRerender('subscriptions')} />
            <GenericEditModal 
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSuccess={() => forceRerender(activeTab)}
                itemData={editingItem}
                columns={columnsConfig[activeTab] || []}
                endpoint={`/${activeTab}`}
                title={`Edit ${tabName(activeTab).slice(0, -1)}`}
            />
        </>
    );
};

const DataTable = ({ endpoint, title, columns, onEdit }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); setError('');
            try {
                const response = await apiClient.get(endpoint);
                setData(Array.isArray(response.data) ? response.data : (response.data?.data || []));
            } catch (err) {
                setError(err.message || `Failed to fetch ${title}.`); setData([]);
            } finally { setLoading(false); }
        };
        fetchData();
    }, [endpoint, title]);

    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure you want to delete this ${title.slice(0, -1)}? This action cannot be undone.`)) {
            try {
                await apiClient.delete(`${endpoint}/${id}`);
                setData(prevData => prevData.filter(item => item._id !== id));
                toast.success(`${title.slice(0, -1)} deleted successfully.`);
            } catch (err) {
                toast.error(`Failed to delete: ${err.message}`);
            }
        }
    };

    if (loading) return <Spinner />;
    if (error) return <div className="text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>;
    if (data.length === 0) return <div className="text-slate-400 p-4 bg-slate-800/50 rounded-lg">No {title} found.</div>;

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-slate-800">
                        <tr>
                            {columns.map(col => <th key={col.header} className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">{col.header}</th>)}
                            <th className="px-6 py-3 text-right text-xs font-medium text-cyan-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-900/50 divide-y divide-slate-700">
                        {data.map(item => (
                            <tr key={item._id} className="hover:bg-slate-700/50 transition-colors">
                                {columns.map(col => (
                                    <td key={`${item._id}-${col.header}`} className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                        {typeof col.accessor === 'function' ? col.accessor(item) : String(item[col.accessor] ?? '')}
                                    </td>
                                ))}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end gap-4">
                                    {onEdit && <button onClick={() => onEdit(item)} className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"><Edit size={14}/> Edit</button>}
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