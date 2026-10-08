import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, AlertCircle, Zap } from 'lucide-react';

const DarkInput = ({ icon, type, value, onChange, placeholder }) => (
    <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">{icon}</span>
        <input type={type} required value={value} onChange={onChange} placeholder={placeholder}
            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} />
    </div>
);

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await register(fullName, email, password);
            navigate('/');
        } catch {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #0f0c29, #1a1a2e, #16213e)' }}>
            <div className="fixed top-1/3 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-1/3 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl shadow-indigo-500/40 mb-4">
                        <Zap size={28} className="text-white" fill="white" />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight">HireReady</h1>
                    <p className="text-white/40 text-sm mt-1 font-medium">Join thousands of job seekers</p>
                </div>

                <div className="rounded-3xl p-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
                    <h2 className="text-xl font-black text-white mb-1">Create your account</h2>
                    <p className="text-white/40 text-sm mb-8">Start your interview prep journey today</p>

                    {error && (
                        <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            <AlertCircle size={16} className="shrink-0" /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">Full Name</label>
                            <DarkInput icon={<User size={16} />} type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="John Doe" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">Email Address</label>
                            <DarkInput icon={<Mail size={16} />} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">Password</label>
                            <DarkInput icon={<Lock size={16} />} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full py-3.5 rounded-xl text-sm font-black text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all active:scale-95 disabled:opacity-60 mt-2">
                            {loading ? 'Creating account…' : 'Create Account →'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-white/30 mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
