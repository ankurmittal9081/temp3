// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import apiClient from '../api/axiosConfig'; // <-- UPDATED IMPORT
// import GlassCard from '../components/GlassCard';
// import Spinner from '../components/Spinner';
// import { User, Mail, ShieldCheck, KeySquare, Calendar } from 'lucide-react';

// const itemVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 }};

// const ProfilePage = () => {
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 // Using the new auth endpoint
//                 const response = await apiClient.get('/auth/current-user');
//                 // The new backend wraps the data
//                 setProfile(response.data.data);
//             } catch (err) {
//                 setError(err.message || 'Could not load your profile.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProfile();
//     }, []);

//     if (loading) return <Spinner />;
//     if (error) return <div className="w-full max-w-4xl p-8 bg-red-500/10 text-red-300 rounded-lg text-center"><p>{error}</p></div>;
//     if (!profile) return <div className="w-full max-w-4xl p-8 text-slate-400 text-center">Profile data not found.</div>;
    
//     const profileDetails = [
//         { icon: <User />, label: "Full Name", value: profile.fullName },
//         { icon: <Mail />, label: "Email Address", value: profile.email },
//         { icon: <ShieldCheck />, label: "Aadhaar Number", value: profile.aadhaarNumber },
//         { icon: <KeySquare />, label: "Role", value: profile.role, isCapitalized: true },
//     ];

//     return (
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-4xl">
//             <GlassCard>
//                 <div className="flex items-center gap-4 mb-8">
//                     <div className="w-16 h-16 bg-cyan-500/20 text-cyan-300 rounded-full flex items-center justify-center"><User size={32} /></div>
//                     <div>
//                         <h1 className="text-3xl font-bold text-white">{profile.fullName}</h1>
//                         <p className="text-slate-400">Your personal account details.</p>
//                     </div>
//                 </div>
//                 <div className="space-y-4">
//                     {profileDetails.map((detail, index) => (
//                         <motion.div key={detail.label} className="flex items-center p-4 bg-slate-700/50 rounded-lg border border-slate-700" variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}>
//                             <div className="flex items-center gap-4 w-1/3 text-slate-400">
//                                 {detail.icon}
//                                 <span className="font-semibold">{detail.label}</span>
//                             </div>
//                             <span className={`text-white ${detail.isCapitalized ? 'capitalize' : ''}`}>{detail.value}</span>
//                         </motion.div>
//                     ))}
//                 </div>
//             </GlassCard>
//         </motion.div>
//     );
// };
// export default ProfilePage;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiClient from '../api/axiosConfig';
import Spinner from '../components/Spinner';
import { User, Mail, ShieldCheck, KeySquare, Calendar, AlertCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = { 
  hidden: { opacity: 0, x: -20 }, 
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Using the new auth endpoint
                const response = await apiClient.get('/auth/current-user');
                // The new backend wraps the data
                setProfile(response.data.data);
            } catch (err) {
                setError(err.message || 'Could not load your profile.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-4xl text-center p-8 bg-red-50 text-red-700 rounded-xl border border-red-200">
                <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
                <p className="font-semibold text-lg">An Error Occurred</p>
                <p className="mt-2">{error}</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="w-full max-w-4xl p-8 text-center text-slate-500 bg-white/95 backdrop-blur-xl rounded-xl border border-slate-200/50">
                <User className="mx-auto mb-4 text-slate-400" size={48} />
                <p className="text-lg">Profile data not found.</p>
            </div>
        );
    }
    
    const profileDetails = [
        { icon: <User size={20} />, label: "Full Name", value: profile.fullName, bgColor: "bg-gradient-to-br from-blue-100 to-cyan-100", iconColor: "text-blue-600" },
        { icon: <Mail size={20} />, label: "Email Address", value: profile.email, bgColor: "bg-gradient-to-br from-green-100 to-emerald-100", iconColor: "text-green-600" },
        { icon: <ShieldCheck size={20} />, label: "Aadhaar Number", value: profile.aadhaarNumber, bgColor: "bg-gradient-to-br from-purple-100 to-pink-100", iconColor: "text-purple-600" },
        { icon: <KeySquare size={20} />, label: "Role", value: profile.role, isCapitalized: true, bgColor: "bg-gradient-to-br from-orange-100 to-red-100", iconColor: "text-orange-600" },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
            className="w-full max-w-4xl"
        >
            {/* Profile Header Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-8 mb-8">
                <motion.div 
                    className="flex items-center gap-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center shadow-md">
                        <User size={40} className="text-cyan-600" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                            {profile.fullName}
                        </h1>
                        <p className="text-slate-600 text-lg mt-2">Your personal account details</p>
                        <div className="flex items-center gap-2 mt-3">
                            <Calendar size={16} className="text-slate-500" />
                            <span className="text-sm text-slate-500">
                                Member since {new Date(profile.createdAt || Date.now()).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long' 
                                })}
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Profile Details Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-8">
                <motion.div
                    className="flex items-center gap-3 mb-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                        <User size={20} className="text-slate-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Account Information</h2>
                </motion.div>

                <motion.div 
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {profileDetails.map((detail, index) => (
                        <motion.div 
                            key={detail.label} 
                            className="flex items-center p-6 bg-slate-50/80 rounded-xl border border-slate-200/50 hover:border-slate-300 hover:shadow-md transition-all duration-200 group"
                            variants={itemVariants}
                            whileHover={{ scale: 1.01, y: -1 }}
                        >
                            <div className="flex items-center gap-4 w-1/3">
                                <div className={`w-12 h-12 rounded-xl ${detail.bgColor} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                                    <div className={detail.iconColor}>
                                        {detail.icon}
                                    </div>
                                </div>
                                <span className="font-semibold text-slate-700">{detail.label}</span>
                            </div>
                            <div className="flex-1">
                                <span className={`text-slate-800 font-medium text-lg ${detail.isCapitalized ? 'capitalize' : ''}`}>
                                    {detail.value}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Additional Info Section */}
                <motion.div 
                    className="mt-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <ShieldCheck size={20} className="text-cyan-600" />
                        <h3 className="text-lg font-bold text-slate-800">Account Security</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Your account is secured with Aadhaar verification and encrypted data storage. 
                        All your personal information is protected according to data privacy regulations.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ProfilePage;