import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig'; // <-- UPDATED IMPORT
import Spinner from '../components/Spinner';
const AdminPanelPage = () => {
    const [activeTab, setActiveTab] = useState('users');
    const tabs = ['users', 'admins', 'employees', 'paralegals', 'kiosks', 'subscriptions', 'issues', 'documents', 'voicequeries'];

        return (
            <div className="w-full max-w-7xl space-y-6">
                <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
                {/* ... rest of the header ... */}
                <div>
                    <DataTable endpoint={`/${activeTab}`} title={activeTab} key={activeTab} />
                </div>
            </div>
        );
    };

    const DataTable = ({ endpoint, title }) => {
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState('');

        const fetchData = async () => {
            setLoading(true); setError('');
            try {
                const response = await apiClient.get(endpoint);
                // Assuming most list endpoints just return an array
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
        if (error) return <div className="text-red-400 p-4">{error}</div>;
    if (data.length === 0) return <div className="text-slate-400 p-4 bg-slate-800/50 rounded-lg">No {title} found.</div>;

    const headers = Object.keys(data[0]).filter(key => !['_id', '__v', 'password', 'isDeleted', 'updatedAt'].includes(key));

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-slate-800">
                        <tr>
                            {headers.map(header => <th key={header} className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">{header}</th>)}
                            <th className="px-6 py-3 text-right text-xs font-medium text-cyan-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-900/50 divide-y divide-slate-700">
                        {data.map(item => (
                            <tr key={item._id} className="hover:bg-slate-700/50 transition-colors">
                                {headers.map(header => (
                                    <td key={`${item._id}-${header}`} className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                        {typeof item[header] === 'object' && item[header] !== null ? JSON.stringify(item[header]) : String(item[header])}
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