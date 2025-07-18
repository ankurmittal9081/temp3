import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from '../api/axios';
import GlassCard from '../components/GlassCard';
import Spinner from '../components/Spinner';
import { User, Mail, ShieldCheck, KeySquare, Calendar } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // The /users/me route is specifically for fetching the logged-in user's data
                const response = await axios.get('/users/me');
                setProfile(response.data);
            } catch (err) {
                console.error("Failed to fetch profile:", err);
                setError('Could not load your profile. Please try logging in again.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []); // Empty dependency array ensures this runs only once on mount

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <div className="w-full max-w-4xl p-8 bg-red-500/10 text-red-300 rounded-lg text-center">
                <p>{error}</p>
            </div>
        );
    }

    if (!profile) {
        return (
             <div className="w-full max-w-4xl p-8 text-slate-400 text-center">
                Profile data not found.
            </div>
        );
    }
    
    const profileDetails = [
        { icon: <User />, label: "Full Name", value: profile.fullName },
        { icon: <Mail />, label: "Email Address", value: profile.email },
        { icon: <ShieldCheck />, label: "Aadhaar Number", value: profile.aadhaarNumber },
        { icon: <KeySquare />, label: "Role", value: profile.role, isCapitalized: true },
        { icon: <Calendar />, label: "Member Since", value: new Date(profile.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl"
        >
            <GlassCard>
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-cyan-500/20 text-cyan-300 rounded-full flex items-center justify-center">
                        <User size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">{profile.fullName}</h1>
                        <p className="text-slate-400">Here is your profile information.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {profileDetails.map((detail, index) => (
                        <motion.div
                            key={detail.label}
                            className="flex items-center p-4 bg-slate-700/50 rounded-lg border border-slate-700"
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="flex items-center gap-4 w-1/3 text-slate-400">
                                {detail.icon}
                                <span className="font-semibold">{detail.label}</span>
                            </div>
                            <span className={`text-white ${detail.isCapitalized ? 'capitalize' : ''}`}>
                                {detail.value}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </GlassCard>
        </motion.div>
    );
};

export default ProfilePage;