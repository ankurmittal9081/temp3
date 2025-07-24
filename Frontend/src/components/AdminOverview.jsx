// import React, { useState, useEffect } from 'react';
// import apiClient from '../api/axiosConfig';
// import Spinner from './Spinner';
// import { Users, FileText, Home, LineChart, PieChart } from 'lucide-react';
// import { Line, Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement
// } from 'chart.js';

// // Register the components needed for Chart.js
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

// const StatCard = ({ icon, title, value, color }) => (
//     <div className="bg-slate-800 p-6 rounded-xl flex items-center gap-4">
//         <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
//             {icon}
//         </div>
//         <div>
//             <p className="text-slate-400 text-sm">{title}</p>
//             <p className="text-2xl font-bold text-white">{value}</p>
//         </div>
//     </div>
// );

// const AdminOverview = () => {
//     const [stats, setStats] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 const response = await apiClient.get('/admins/stats');
//                 setStats(response.data);
//             } catch (err) {
//                 setError(err.message || 'Failed to fetch statistics.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchStats();
//     }, []);

//     if (loading) return <Spinner />;
//     if (error) return <div className="text-red-400 p-4">{error}</div>;
//     if (!stats) return <div>No stats available.</div>;

//     // Prepare data for the line chart
//     const lineChartData = {
//         labels: stats.issuesLast30Days.map(d => d._id),
//         datasets: [{
//             label: 'Issues Created',
//             data: stats.issuesLast30Days.map(d => d.count),
//             borderColor: 'rgb(56, 189, 248)',
//             backgroundColor: 'rgba(56, 189, 248, 0.2)',
//             fill: true,
//             tension: 0.3
//         }]
//     };

//     // Prepare data for the doughnut chart
//     const doughnutChartData = {
//         labels: stats.issueTypeDistribution.map(d => d._id),
//         datasets: [{
//             label: 'Issue Types',
//             data: stats.issueTypeDistribution.map(d => d.count),
//             backgroundColor: ['#06b6d4', '#ec4899', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'],
//             borderColor: '#1e293b',
//             borderWidth: 2,
//         }]
//     };

//     return (
//         <div className="space-y-8">
//             {/* Stat Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <StatCard icon={<Users size={24} />} title="Total Users" value={stats.keyMetrics.totalUsers} color="bg-cyan-500/20 text-cyan-300" />
//                 <StatCard icon={<FileText size={24} />} title="Total Legal Issues" value={stats.keyMetrics.totalIssues} color="bg-pink-500/20 text-pink-300" />
//                 <StatCard icon={<Home size={24} />} title="Total Kiosks" value={stats.keyMetrics.totalKiosks} color="bg-purple-500/20 text-purple-300" />
//             </div>

//             {/* Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
//                 <div className="lg:col-span-3 bg-slate-800 p-6 rounded-xl">
//                     <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><LineChart size={20}/>Issues Created (Last 30 Days)</h3>
//                     <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
//                 </div>
//                 <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl">
//                     <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><PieChart size={20}/>Issue Type Distribution</h3>
//                     <Doughnut data={doughnutChartData} options={{ maintainAspectRatio: false }} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminOverview;

import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig';
import Spinner from './Spinner';
import { Users, FileText, Home, LineChart, PieChart } from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';

// Register the components needed for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const StatCard = ({ icon, title, value, color, bgColor }) => (
    <div className="bg-white/95 backdrop-blur-xl p-6 rounded-xl shadow-lg border border-slate-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${bgColor} shadow-md`}>
            <div className={color}>
                {icon}
            </div>
        </div>
        <div className="mt-4">
            <p className="text-slate-500 text-sm font-medium">{title}</p>
            <p className="text-3xl font-black text-slate-800 mt-1">{value}</p>
        </div>
    </div>
);

const AdminOverview = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await apiClient.get('/admins/stats');
                setStats(response.data);
            } catch (err) {
                setError(err.message || 'Failed to fetch statistics.');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <Spinner />;
    if (error) return <div className="text-red-600 p-6 bg-red-50 rounded-xl border border-red-200">{error}</div>;
    if (!stats) return <div className="text-slate-600 p-6 bg-slate-50 rounded-xl">No stats available.</div>;

    // Prepare data for the line chart
    const lineChartData = {
        labels: stats.issuesLast30Days.map(d => d._id),
        datasets: [{
            label: 'Issues Created',
            data: stats.issuesLast30Days.map(d => d.count),
            borderColor: 'rgb(6, 182, 212)',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'rgb(6, 182, 212)',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    };

    // Prepare data for the doughnut chart
    const doughnutChartData = {
        labels: stats.issueTypeDistribution.map(d => d._id),
        datasets: [{
            label: 'Issue Types',
            data: stats.issueTypeDistribution.map(d => d.count),
            backgroundColor: [
                'rgba(6, 182, 212, 0.8)',
                'rgba(236, 72, 153, 0.8)', 
                'rgba(139, 92, 246, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(239, 68, 68, 0.8)'
            ],
            borderColor: '#ffffff',
            borderWidth: 3,
            hoverBorderWidth: 4,
            hoverOffset: 8
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#475569',
                    font: {
                        size: 12,
                        family: 'Inter, sans-serif'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1e293b',
                bodyColor: '#475569',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: true
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                    borderColor: 'rgba(148, 163, 184, 0.2)'
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                    borderColor: 'rgba(148, 163, 184, 0.2)'
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11
                    }
                }
            }
        }
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#475569',
                    font: {
                        size: 12,
                        family: 'Inter, sans-serif'
                    },
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1e293b',
                bodyColor: '#475569',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                cornerRadius: 8
            }
        }
    };

    return (
        <div className="space-y-8 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-black text-slate-800 mb-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    Admin Dashboard
                </h1>
                <p className="text-slate-600">Monitor key metrics and system performance</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    icon={<Users size={28} />} 
                    title="Total Users" 
                    value={stats.keyMetrics.totalUsers} 
                    color="text-cyan-600" 
                    bgColor="bg-gradient-to-br from-cyan-100 to-cyan-200"
                />
                <StatCard 
                    icon={<FileText size={28} />} 
                    title="Total Legal Issues" 
                    value={stats.keyMetrics.totalIssues} 
                    color="text-pink-600" 
                    bgColor="bg-gradient-to-br from-pink-100 to-pink-200"
                />
                <StatCard 
                    icon={<Home size={28} />} 
                    title="Total Kiosks" 
                    value={stats.keyMetrics.totalKiosks} 
                    color="text-purple-600" 
                    bgColor="bg-gradient-to-br from-purple-100 to-purple-200"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-white/95 backdrop-blur-xl p-8 rounded-xl shadow-lg border border-slate-200/50">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center">
                            <LineChart size={20} className="text-cyan-600"/>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Issues Created (Last 30 Days)</h3>
                    </div>
                    <div className="h-80">
                        <Line data={lineChartData} options={chartOptions} />
                    </div>
                </div>
                
                <div className="lg:col-span-2 bg-white/95 backdrop-blur-xl p-8 rounded-xl shadow-lg border border-slate-200/50">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                            <PieChart size={20} className="text-purple-600"/>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Issue Distribution</h3>
                    </div>
                    <div className="h-80">
                        <Doughnut data={doughnutChartData} options={doughnutOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;