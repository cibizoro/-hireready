import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Code, MessageSquare, BookOpen, Trophy, ArrowRight, Activity, Zap } from 'lucide-react';

/* Cyberpunk Glass card helper */
const Glass = ({ children, className = '', hover = false }) => (
    <div className={`p-1 relative overflow-hidden bg-black/80 backdrop-blur-3xl ${hover ? 'transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,243,255,0.2)]' : ''} ${className}`}
        style={{ border: '1px solid rgba(0,243,255,0.3)', boxShadow: '0 0 15px rgba(0,243,255,0.05)' }}>
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00f3ff]" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00f3ff]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00f3ff]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00f3ff]" />
        {children}
    </div>
);

const MODULE_CARDS = [
    {
        title: 'DSA Practice', desc: 'Solve coding problems and master algorithms step by step.',
        icon: Code, link: '/dsa', tag: '30 Problems',
        glow: 'hover:shadow-[0_0_30px_rgba(0,243,255,0.4)]', iconBg: 'bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30',
        borderColor: 'border-[#00f3ff]'
    },
    {
        title: 'AI Mock Interview', desc: 'Get interviewed by AI based on your target role and resume.',
        icon: MessageSquare, link: '/interview', tag: 'AI Powered',
        glow: 'hover:shadow-[0_0_30px_rgba(255,0,255,0.4)]', iconBg: 'bg-[#ff00ff]/10 text-[#ff00ff] border border-[#ff00ff]/30',
        borderColor: 'border-[#ff00ff]'
    },
    {
        title: 'Aptitude Tests', desc: 'Practice quantitative and logical reasoning for placements.',
        icon: BookOpen, link: '/aptitude', tag: 'Timed Tests',
        glow: 'hover:shadow-[0_0_30px_rgba(255,174,0,0.4)]', iconBg: 'bg-[#ffae00]/10 text-[#ffae00] border border-[#ffae00]/30',
        borderColor: 'border-[#ffae00]'
    },
    {
        title: 'Leaderboard', desc: 'Compete globally and track your rank among top peers.',
        icon: Trophy, link: '/leaderboard', tag: 'Rank #42',
        glow: 'hover:shadow-[0_0_30px_rgba(0,255,65,0.4)]', iconBg: 'bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/30',
        borderColor: 'border-[#00ff41]'
    },
];

const TOPICS = [
    { name: 'Arrays', icon: '📊', count: 5, color: 'text-[#00f3ff]', category: 'Array' },
    { name: 'Strings', icon: '🔤', count: 5, color: 'text-[#ff00ff]', category: 'String' },
    { name: 'Linked Lists', icon: '🔗', count: 5, color: 'text-[#00ff41]', category: 'Linked List' },
    { name: 'Stacks & Queues', icon: '🥞', count: 5, color: 'text-[#ffae00]', category: 'Stack' },
    { name: 'Trees', icon: '🌳', count: 5, color: 'text-[#00f3ff]', category: 'Tree' },
    { name: 'Hash Maps', icon: '🔑', count: 5, color: 'text-[#ff00ff]', category: 'Hash Map' },
];

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hero banner */}
            <div className="relative overflow-hidden rounded-none p-10 bg-black/80 backdrop-blur-3xl border-y border-[#00f3ff] shadow-[0_0_50px_rgba(0,243,255,0.1)]">
                {/* Decorative glow */}
                <div className="absolute top-[-60px] right-[-60px] w-80 h-80 bg-[#00f3ff]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-[-40px] left-[-40px] w-60 h-60 bg-[#ff00ff]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Glitch overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 pointer-events-none" />

                <div className="relative z-10 flex items-start justify-between flex-wrap gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 flex items-center justify-center border border-[#00f3ff]/50 bg-[#00f3ff]/10 shadow-[0_0_15px_rgba(0,243,255,0.3)]">
                                <Zap size={20} className="text-[#00f3ff]" fill="#00f3ff" />
                            </div>
                            <span className="text-[#00f3ff] text-xs font-black uppercase tracking-widest blur-[0.3px]">System Ready</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black text-white tracking-widest leading-tight uppercase relative">
                            Welcome back,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                                {user?.fullName?.split(' ')[0] || 'Player 1'}
                            </span>
                        </h1>
                        <p className="text-[#00f3ff]/60 mt-3 text-sm font-bold max-w-md tracking-wider uppercase">
                            Your mission awaits. Select a module to begin training.
                        </p>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                        {[{ label: 'Streak', val: '7 DAYS' }, { label: 'Rank', val: '#42' }].map(({ label, val }) => (
                            <div key={label} className="px-6 py-4 text-center border-l-2 border-[#00f3ff] bg-gradient-to-r from-[#00f3ff]/10 to-transparent">
                                <p className="text-[#00f3ff] font-black text-2xl tracking-widest" style={{ textShadow: '0 0 10px #00f3ff' }}>{val}</p>
                                <p className="text-white/40 text-[10px] uppercase tracking-widest font-black mt-1.5">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Module Cards */}
            <div>
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-black text-white tracking-widest flex items-center gap-3 uppercase">
                        <span className="w-2 h-6 bg-[#ff00ff] shadow-[0_0_10px_#ff00ff]" /> Select Mode
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {MODULE_CARDS.map(({ title, desc, icon: Icon, link, tag, glow, iconBg, borderColor }) => (
                        <Link key={link} to={link}
                            className={`group relative overflow-hidden p-1 transition-all ${glow}`}
                            style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div className={`absolute top-0 right-0 w-8 h-8 ${iconBg} opacity-20 -skew-x-12 translate-x-4`} />

                            <div className="p-5 border border-white/5 h-full flex flex-col relative z-10 transition-colors group-hover:bg-white/5">
                                <div className={`w-12 h-12 flex items-center justify-center mb-4 ${iconBg} scale-100 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon size={22} />
                                </div>
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-white font-black text-sm tracking-widest uppercase">{title}</h3>
                                </div>
                                <p className="text-white/40 text-[11px] font-bold leading-relaxed mb-4 flex-1 uppercase tracking-wider">{desc}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className={`text-[9px] font-black uppercase tracking-widest border border-current px-2 py-1 bg-current/[0.05] ${borderColor.replace('border-', 'text-')}`}>{tag}</span>
                                    <ArrowRight size={16} className={`text-white/20 group-hover:${borderColor.replace('border-', 'text-')} group-hover:translate-x-1 transition-all`} />
                                </div>
                            </div>
                            {/* Hover accent line */}
                            <div className={`absolute bottom-0 left-0 h-1 w-0 bg-current transition-all duration-300 group-hover:w-full ${borderColor.replace('border-', 'bg-')} shadow-[0_0_10px_current]`} />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Topics + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Topics */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl font-black text-white tracking-widest flex items-center gap-3 uppercase">
                            <span className="w-2 h-6 bg-[#00ff41] shadow-[0_0_10px_#00ff41]" /> Databank
                        </h2>
                        <Link to="/dsa" className="text-[#00ff41] text-xs uppercase tracking-widest font-black hover:text-white transition-colors" style={{ textShadow: '0 0 8px #00ff41' }}>Access All ↓</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {TOPICS.map(({ name, icon, count, color, category }) => (
                            <Link key={name} to={`/dsa?category=${category}`}
                                className="group p-1 relative overflow-hidden transition-all bg-black hover:bg-white/5"
                                style={{ border: '1px solid rgba(0,255,65,0.2)' }}>
                                <div className="p-4 border border-[#00ff41]/20 flex items-center justify-between h-full">
                                    <div className="relative flex items-center gap-4">
                                        <span className="text-2xl drop-shadow-[0_0_5px_currentColor]">{icon}</span>
                                        <div>
                                            <p className={`font-black text-sm tracking-widest uppercase ${color}`}>{name}</p>
                                            <p className="text-white/30 text-[9px] font-black uppercase tracking-widest">{count} Files</p>
                                        </div>
                                    </div>
                                    <ArrowRight size={16} className="text-[#00ff41]/20 group-hover:text-[#00ff41] group-hover:translate-x-1 transition-all" />
                                </div>
                                <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff41] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Daily Challenge */}
                <div className="space-y-4">
                    <h2 className="text-xl font-black text-white tracking-widest flex items-center gap-3 uppercase">
                        <span className="w-2 h-6 bg-[#ffae00] shadow-[0_0_10px_#ffae00]" /> Alert
                    </h2>
                    <div className="relative overflow-hidden p-[2px] h-full transition-all group hover:shadow-[0_0_30px_rgba(255,174,0,0.3)] bg-gradient-to-br from-[#ffae00]/40 to-transparent">
                        <div className="bg-black/90 p-7 h-full flex flex-col relative z-10">
                            <div className="absolute top-[-20px] right-[-20px] opacity-10 pointer-events-none group-hover:scale-110 group-hover:opacity-20 transition-all">
                                <Trophy size={160} className="text-[#ffae00]" />
                            </div>
                            <div className="relative z-10 mt-auto">
                                <span className="text-[#ffae00] text-[10px] font-black uppercase tracking-widest border border-[#ffae00]/30 px-2 py-1 bg-[#ffae00]/10" style={{ boxShadow: '0 0 10px rgba(255,174,0,0.2)' }}>Daily Quest</span>
                                <h3 className="text-white font-black text-lg mt-4 mb-3 uppercase tracking-widest">Longest Substring</h3>
                                <p className="text-[#ffae00]/60 text-xs font-bold leading-relaxed mb-8 uppercase tracking-wider">Solve today's challenge to earn 50 rep.</p>
                                <button className="w-full py-3 border border-[#ffae00] font-black text-xs uppercase tracking-widest text-black bg-[#ffae00] hover:bg-transparent hover:text-[#ffae00] transition-all shadow-[0_0_15px_rgba(255,174,0,0.5)]">
                                    Initiate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div>
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-black text-white tracking-widest flex items-center gap-3 uppercase">
                        <span className="w-2 h-6 bg-[#b537f2] shadow-[0_0_10px_#b537f2]" /> System Logs
                    </h2>
                </div>
                <Glass className="divide-y" style={{ '--tw-divide-opacity': '1', borderTop: '2px solid #b537f2' }}>
                    {[
                        { icon: <MessageSquare size={16} className="text-[#ff00ff]" />, title: 'AI Mock Interview', sub: 'Software Engineer @ Google', right: 'Score: 88/100', time: '2 hours ago', bg: 'bg-[#ff00ff]/10 border border-[#ff00ff]/30' },
                        { icon: <Code size={16} className="text-[#00f3ff]" />, title: 'Two Sum — DSA', sub: 'Array · Easy', right: 'Solved ✓', time: '5 hours ago', bg: 'bg-[#00f3ff]/10 border border-[#00f3ff]/30' },
                        { icon: <BookOpen size={16} className="text-[#ffae00]" />, title: 'Aptitude Practice', sub: 'Quantitative Reasoning', right: '28/30', time: 'Yesterday', bg: 'bg-[#ffae00]/10 border border-[#ffae00]/30' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-white/5 transition-colors group cursor-pointer border-b border-white/10 last:border-0">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 flex flex-col items-center justify-center shrink-0 ${item.bg} shadow-[0_0_10px_currentColor]`}>{item.icon}</div>
                                <div>
                                    <p className="text-white text-sm font-black uppercase tracking-widest">{item.title}</p>
                                    <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mt-0.5">{item.sub}</p>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-white text-xs font-black tracking-widest uppercase">{item.right}</p>
                                <p className="text-white/30 text-[9px] uppercase font-black tracking-widest mt-1">{item.time}</p>
                            </div>
                        </div>
                    ))}
                </Glass>
            </div>
        </div>
    );
};

export default Dashboard;
