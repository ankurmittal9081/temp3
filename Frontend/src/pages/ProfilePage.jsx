import React, { useState, useEffect } from 'react';
import request from '../api/api';
import GlassCard from '../components/GlassCard';
import Spinner from '../components/Spinner';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await request('/users/me');
                setProfile(data);
            } catch (err) {
                setError('Failed to fetch profile.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <Spinner />;
    if (error) return <div className="text-red-400">{error}</div>;
    if (!profile) return <div className="p-4 text-slate-400">No profile data found.</div>;

    return (
        <div className="w-full max-w-4xl">
            <GlassCard>
                <h1 className="text-3xl font-bold text-cyan-400 mb-6">My Profile</h1>
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <span className="font-semibold text-slate-400">Full Name:</span>
                        <span className="col-span-2 text-white">{profile.fullName}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <span className="font-semibold text-slate-400">Email:</span>
                        <span className="col-span-2 text-white">{profile.email}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <span className="font-semibold text-slate-400">Aadhaar:</span>
                        <span className="col-span-2 text-white">{profile.aadhaarNumber}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <span className="font-semibold text-slate-400">Role:</span>
                        <span className="col-span-2 text-white capitalize">{profile.role}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <span className="font-semibold text-slate-400">Member Since:</span>
                        <span className="col-span-2 text-white">{new Date(profile.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
};

export default ProfilePage;