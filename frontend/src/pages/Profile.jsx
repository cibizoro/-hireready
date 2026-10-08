import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, BarChart2, Award, Edit2, Code, BookOpen, Github, Globe, X, Check, Upload, Camera } from 'lucide-react';
import api from '../services/api';

const LinkedinIcon = ({ size = 16, className = '' }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
);

const Glass = ({ children, className = '' }) => (
    <div className={`p-1 relative overflow-hidden bg-black/80 backdrop-blur-3xl ${className}`}
        style={{ border: '1px solid rgba(0,243,255,0.3)', boxShadow: '0 0 15px rgba(0,243,255,0.05)' }}>
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00f3ff]" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00f3ff]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00f3ff]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00f3ff]" />
        {children}
    </div>
);

const DarkInput = ({ icon, label, name, value, onChange, placeholder, hint }) => (
    <div>
        <p className="text-[10px] font-black text-[#00f3ff] uppercase tracking-widest mb-1.5 drop-shadow-[0_0_5px_#00f3ff]">{label}</p>
        <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#00f3ff] drop-shadow-[0_0_5px_#00f3ff]">{icon}</span>
            <input type="text" name={name} value={value || ''} onChange={onChange} placeholder={placeholder}
                className="w-full pl-10 pr-4 py-3 text-xs font-black tracking-widest uppercase text-white placeholder-[#00f3ff]/30 focus:outline-none transition-all"
                style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,243,255,0.5)', boxShadow: 'inset 0 0 10px rgba(0,243,255,0.1)' }} />
        </div>
        {hint && <p className="text-[9px] font-black uppercase tracking-widest text-[#00f3ff]/50 mt-1.5 ml-1 drop-shadow-[0_0_2px_#00f3ff]">→ {hint}</p>}
    </div>
);

const TABS = [
    { key: 'dsa', label: 'DSA Problems', icon: Code },
    { key: 'aptitude', label: 'Aptitude', icon: BarChart2 },
];

/* ── Edit Modal ── */
const EditModal = ({ profile, onClose, onSave }) => {
    const [form, setForm] = useState({ ...profile });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [dragging, setDragging] = useState(false);
    const fileRef = useRef();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const processFile = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.onload = () => {
            const maxSize = 300;
            const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
            const canvas = document.createElement('canvas');
            canvas.width = Math.round(img.width * scale);
            canvas.height = Math.round(img.height * scale);
            canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
            setForm(f => ({ ...f, photoUrl: canvas.toDataURL('image/jpeg', 0.8) }));
            URL.revokeObjectURL(objectUrl);
        };
        img.src = objectUrl;
    };

    const handleFilePick = (e) => { processFile(e.target.files[0]); e.target.value = ''; };
    const handleDrop = (e) => { e.preventDefault(); setDragging(false); processFile(e.dataTransfer.files[0]); };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put('/user/profile', form);
            setSaved(true);
            setTimeout(() => { onSave(form); onClose(); }, 700);
        } catch (err) { console.error(err); }
        finally { setSaving(false); }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
            <div className="w-full max-w-lg mx-4 overflow-hidden shadow-2xl animate-in slide-in-from-bottom-6 duration-300"
                style={{ background: '#050505', border: '1px solid rgba(0,243,255,0.5)', boxShadow: '0 0 30px rgba(0,243,255,0.2)' }}>
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid rgba(0,243,255,0.5)', background: 'rgba(0,243,255,0.05)' }}>
                    <h2 className="text-[#00f3ff] font-black tracking-widest uppercase text-sm drop-shadow-[0_0_8px_#00f3ff]">Edit Profile</h2>
                    <button onClick={onClose} className="p-1 text-[#ff0041] hover:text-white transition-all drop-shadow-[0_0_5px_#ff0041]"><X size={20} /></button>
                </div>

                <div className="px-8 py-6 space-y-6 max-h-[65vh] overflow-y-auto">
                    {/* Photo */}
                    <div>
                        <p className="text-[10px] font-black text-[#00f3ff] uppercase tracking-widest mb-3 drop-shadow-[0_0_5px_#00f3ff]">Profile Avatar</p>
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 flex items-center justify-center overflow-hidden shrink-0"
                                style={{ background: 'rgba(0,243,255,0.1)', border: '2px dashed rgba(0,243,255,0.5)' }}>
                                {form.photoUrl ? <img src={form.photoUrl} alt="Preview" className="w-full h-full object-cover" /> : <Camera size={24} className="text-[#00f3ff]/50" />}
                            </div>
                            <div onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop}
                                onClick={() => fileRef.current.click()}
                                className={`flex-1 flex flex-col items-center justify-center gap-2 py-5 border-2 border-dashed cursor-pointer transition-all ${dragging ? 'border-[#00f3ff] bg-[#00f3ff]/20' : 'border-[#00f3ff]/30 hover:border-[#00f3ff]/80 hover:bg-[#00f3ff]/10'
                                    }`}>
                                <Upload size={20} className={dragging ? 'text-[#00f3ff]' : 'text-[#00f3ff]/50'} />
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#00f3ff]/80">Click or Drag & Drop</p>
                                <p className="text-[9px] font-black uppercase tracking-widest text-[#00f3ff]/40 mt-1">PNG, JPG to 5MB</p>
                            </div>
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFilePick} />
                        </div>
                        {form.photoUrl && <button onClick={() => setForm(f => ({ ...f, photoUrl: '' }))} className="mt-3 text-[10px] font-black uppercase tracking-widest text-[#ff0041] hover:text-white transition-colors">Terminate Avatar</button>}
                    </div>

                    <DarkInput icon={<User size={14} />} label="Agent Name" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter designation" />
                    <DarkInput icon={<LinkedinIcon size={14} />} label="LinkedIn Identifier" name="linkedinId" value={form.linkedinId} onChange={handleChange} placeholder="username" hint={form.linkedinId ? `linkedin.com/in/${form.linkedinId}` : null} />
                    <DarkInput icon={<Github size={14} />} label="GitHub Override" name="githubId" value={form.githubId} onChange={handleChange} placeholder="username" hint={form.githubId ? `github.com/${form.githubId}` : null} />
                    <DarkInput icon={<Globe size={14} />} label="Network Node (Portfolio)" name="portfolioUrl" value={form.portfolioUrl} onChange={handleChange} placeholder="https://..." />
                </div>

                <div className="px-8 py-5 flex justify-end gap-4" style={{ borderTop: '1px solid rgba(0,243,255,0.5)' }}>
                    <button onClick={onClose} className="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-all">Abort</button>
                    <button onClick={handleSave} disabled={saving || saved}
                        className={`flex items-center gap-2 px-7 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${saved ? 'text-black bg-[#00ff41] shadow-[0_0_15px_#00ff41]' : 'text-black bg-[#00f3ff] hover:bg-transparent hover:text-[#00f3ff] border border-[#00f3ff] shadow-[0_0_15px_#00f3ff]'
                            }`}>
                        {saved ? <><Check size={14} /> Synced</> : saving ? 'Syncing...' : 'Deploy'}
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ── Main Profile Page ── */
const Profile = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('dsa');
    const [dsaStats, setDsaStats] = useState({ totalSolved: 0, byDifficulty: {}, history: [] });
    const [profile, setProfile] = useState({ fullName: '', email: '', linkedinId: '', githubId: '', portfolioUrl: '', photoUrl: '' });
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        Promise.all([api.get('/dsa/stats'), api.get('/user/profile')])
            .then(([s, p]) => { setDsaStats(s.data); setProfile(p.data); })
            .catch(console.error);
    }, []);

    const DIFFICULTY = [
        { label: 'Easy', count: dsaStats.byDifficulty?.Easy || 0, total: 10, bar: 'bg-[#00ff41]', text: 'text-[#00ff41]', drop: 'drop-shadow-[0_0_5px_#00ff41]' },
        { label: 'Medium', count: dsaStats.byDifficulty?.Medium || 0, total: 15, bar: 'bg-[#ffae00]', text: 'text-[#ffae00]', drop: 'drop-shadow-[0_0_5px_#ffae00]' },
        { label: 'Hard', count: dsaStats.byDifficulty?.Hard || 0, total: 5, bar: 'bg-[#ff0041]', text: 'text-[#ff0041]', drop: 'drop-shadow-[0_0_5px_#ff0041]' },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
            {showEdit && <EditModal profile={profile} onClose={() => setShowEdit(false)} onSave={u => setProfile(p => ({ ...p, ...u }))} />}

            {/* Hero Card */}
            <div className="relative overflow-hidden bg-black/80 backdrop-blur-3xl" style={{ border: '1px solid rgba(0,243,255,0.3)', boxShadow: '0 0 20px rgba(0,243,255,0.1)' }}>
                {/* Banner */}
                <div className="h-44 relative border-b border-[#00f3ff]" style={{ background: 'linear-gradient(135deg, rgba(0,243,255,0.1) 0%, rgba(255,0,255,0.1) 100%)' }}>
                    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] pointer-events-none" />
                    <div className="absolute top-[-40px] right-[-40px] w-72 h-72 bg-[#ff00ff]/20 rounded-full blur-3xl pointer-events-none" />
                </div>

                <div className="px-10 pb-10">
                    <div className="flex justify-between items-end -mt-14 mb-6 relative z-10">
                        {/* Avatar */}
                        <div className="relative group cursor-pointer" onClick={() => setShowEdit(true)}>
                            <div className="w-28 h-28 overflow-hidden flex items-center justify-center bg-[#050505] shadow-[0_0_20px_#00f3ff]"
                                style={{ border: '2px solid #00f3ff' }}>
                                {profile.photoUrl
                                    ? <img src={profile.photoUrl} alt="Avatar" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                    : <User size={48} className="text-[#00f3ff] drop-shadow-[0_0_5px_#00f3ff]" />}
                            </div>
                            <div className="absolute inset-0 bg-[#00f3ff]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                <Camera size={22} className="text-white drop-shadow-[0_0_5px_white]" />
                            </div>
                        </div>
                        <button onClick={() => setShowEdit(true)}
                            className="flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-[#00f3ff] border border-[#00f3ff] hover:bg-[#00f3ff] hover:text-black transition-all shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                            <Edit2 size={13} /> Update Profile
                        </button>
                    </div>

                    {/* Name + Social */}
                    <div className="space-y-4 mb-8">
                        <div>
                            <h1 className="text-4xl font-black tracking-widest text-[#00f3ff] uppercase drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]">{profile.fullName || user?.fullName || 'Agent X'}</h1>
                            <p className="text-white/50 flex items-center gap-2 mt-1.5 text-xs font-bold uppercase tracking-widest"><Mail size={13} className="text-[#ff00ff]" /> {user?.email}</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {profile.linkedinId && (
                                <a href={`https://linkedin.com/in/${profile.linkedinId}`} target="_blank" rel="noreferrer"
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00f3ff] px-4 py-2 border border-[#00f3ff]/50 bg-[#00f3ff]/10 hover:bg-[#00f3ff] hover:text-black transition-all shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                                    <LinkedinIcon size={12} /> {profile.linkedinId}
                                </a>
                            )}
                            {profile.githubId && (
                                <a href={`https://github.com/${profile.githubId}`} target="_blank" rel="noreferrer"
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#ff00ff] px-4 py-2 border border-[#ff00ff]/50 bg-[#ff00ff]/10 hover:bg-[#ff00ff] hover:text-black transition-all shadow-[0_0_10px_rgba(255,0,255,0.2)]">
                                    <Github size={12} /> {profile.githubId}
                                </a>
                            )}
                            {profile.portfolioUrl && (
                                <a href={profile.portfolioUrl} target="_blank" rel="noreferrer"
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00ff41] px-4 py-2 border border-[#00ff41]/50 bg-[#00ff41]/10 hover:bg-[#00ff41] hover:text-black transition-all shadow-[0_0_10px_rgba(0,255,65,0.2)]">
                                    <Globe size={12} /> Network Node
                                </a>
                            )}
                            {!profile.linkedinId && !profile.githubId && !profile.portfolioUrl && (
                                <button onClick={() => setShowEdit(true)} className="text-[10px] text-[#ffae00] border border-[#ffae00]/30 px-4 py-2 bg-[#ffae00]/5 hover:bg-[#ffae00] hover:text-black Drop-shadow-[0_0_5px_#ffae00] font-black uppercase tracking-widest transition-all flex items-center gap-2">
                                    <Edit2 size={12} /> Establish Uplinks
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative overflow-hidden p-6 bg-[#00f3ff]/5 border border-[#00f3ff] shadow-[0_0_15px_rgba(0,243,255,0.1)]">
                            <div className="absolute top-0 right-[-10px] w-4 h-full bg-[#00f3ff]/10 -skew-x-12" />
                            <Award size={24} className="text-[#00f3ff] mb-3 drop-shadow-[0_0_5px_#00f3ff]" />
                            <p className="text-4xl font-black text-white drop-shadow-[0_0_8px_#00f3ff]">{dsaStats.totalSolved}</p>
                            <p className="text-[10px] font-black text-[#00f3ff] uppercase tracking-widest mt-1.5 drop-shadow-[0_0_5px_#00f3ff]">Algorithms Defeated</p>
                        </div>
                        <div className="relative overflow-hidden p-6 bg-[#ff00ff]/5 border border-[#ff00ff] shadow-[0_0_15px_rgba(255,0,255,0.1)]">
                            <div className="absolute top-0 right-[-10px] w-4 h-full bg-[#ff00ff]/10 -skew-x-12" />
                            <BarChart2 size={24} className="text-[#ff00ff] mb-3 drop-shadow-[0_0_5px_#ff00ff]" />
                            <p className="text-4xl font-black text-white drop-shadow-[0_0_8px_#ff00ff]">0</p>
                            <p className="text-[10px] font-black text-[#ff00ff] uppercase tracking-widest mt-1.5 drop-shadow-[0_0_5px_#ff00ff]">Logic Puzzles Solved</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <Glass>
                {/* Tab bar */}
                <div className="flex" style={{ borderBottom: '1px solid rgba(0,243,255,0.3)' }}>
                    {TABS.map(({ key, label, icon: Icon }) => (
                        <button key={key} onClick={() => setActiveTab(key)}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 text-[11px] font-black tracking-widest uppercase transition-all ${activeTab === key ? 'text-[#00f3ff] border-b-2 border-[#00f3ff] bg-[#00f3ff]/10 drop-shadow-[0_0_5px_#00f3ff]' : 'text-white/40 hover:text-white/80'
                                }`}>
                            <Icon size={14} /> {label}
                        </button>
                    ))}
                </div>

                {/* DSA Tab */}
                {activeTab === 'dsa' && (
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-[11px] font-black text-[#00f3ff] uppercase tracking-widest drop-shadow-[0_0_3px_#00f3ff]">Completion Status</h3>
                            <span className="text-[10px] font-black text-[#00ff41] px-3 py-1 bg-[#00ff41]/10 border border-[#00ff41]/50 shadow-[0_0_10px_rgba(0,255,65,0.2)]">
                                {dsaStats.totalSolved} / 30
                            </span>
                        </div>
                        <div className="h-3 bg-black/50 border border-[#00f3ff]/30 mb-8 overflow-hidden relative shadow-[inset_0_0_10px_rgba(0,243,255,0.1)]">
                            <div className="h-full bg-[#00f3ff] shadow-[0_0_15px_#00f3ff] transition-all duration-700 relative"
                                style={{ width: `${Math.min((dsaStats.totalSolved / 30) * 100, 100)}%` }}>
                            </div>
                        </div>

                        {/* Difficulty */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {DIFFICULTY.map(d => (
                                <div key={d.label} className="p-4 bg-black/60 border border-white/10 hover:border-white/30 transition-colors">
                                    <div className="flex justify-between mb-4">
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${d.text} ${d.drop}`}>{d.label}</span>
                                        <span className="text-[10px] font-black text-white/50 tracking-widest">{d.count}/{d.total}</span>
                                    </div>
                                    <div className="h-1 bg-black overflow-hidden shadow-[inset_0_0_5px_rgba(255,255,255,0.1)]">
                                        <div className={`h-full ${d.bar} shadow-[0_0_10px_currentColor]`} style={{ width: `${Math.min((d.count / d.total) * 100, 100)}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h4 className="text-[10px] font-black text-[#ff00ff] uppercase tracking-widest mb-4 flex items-center gap-2 drop-shadow-[0_0_3px_#ff00ff]">
                            <span className="w-2 h-4 bg-[#ff00ff]" /> Execution Logs
                        </h4>
                        {dsaStats.history.length === 0 ? (
                            <div className="text-center py-16 border border-white/5 bg-white/[0.02]">
                                <Code size={40} className="mx-auto mb-4 text-[#ff0041] drop-shadow-[0_0_10px_#ff0041]" />
                                <p className="text-xs font-black uppercase tracking-widest text-white/50">Databank Empty</p>
                                <p className="text-[10px] font-bold mt-2 text-white/30 uppercase tracking-widest">Execute code to log victories.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {dsaStats.history.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between gap-4 p-4 border border-[#00f3ff]/10 bg-black hover:bg-[#00f3ff]/5 hover:border-[#00f3ff]/30 transition-all group"
                                        style={{ boxShadow: '0 0 10px rgba(0,243,255,0.02)' }}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 flex items-center justify-center text-[#00ff41] bg-[#00ff41]/5 border border-[#00ff41]/20 group-hover:bg-[#00ff41]/20 font-black text-lg shrink-0 drop-shadow-[0_0_5px_#00ff41] transition-colors">✓</div>
                                            <div>
                                                <p className="text-sm font-black text-white tracking-widest uppercase">{item.title}</p>
                                                <p className="text-[9px] text-white/40 font-black uppercase tracking-widest mt-1">{item.category}</p>
                                            </div>
                                        </div>
                                        <span className={`text-[9px] font-black px-3 py-1 uppercase border shrink-0 ${item.difficulty === 'Easy' ? 'text-[#00ff41] bg-[#00ff41]/10 border-[#00ff41]/30 drop-shadow-[0_0_3px_#00ff41]' :
                                            item.difficulty === 'Medium' ? 'text-[#ffae00] bg-[#ffae00]/10 border-[#ffae00]/30 drop-shadow-[0_0_3px_#ffae00]' :
                                                'text-[#ff0041] bg-[#ff0041]/10 border-[#ff0041]/30 drop-shadow-[0_0_3px_#ff0041]'
                                            }`}>{item.difficulty}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Aptitude Tab */}
                {activeTab === 'aptitude' && (
                    <div className="p-8 text-center py-24 border-t border-white/5 bg-white/[0.01]">
                        <BookOpen size={48} className="mx-auto mb-4 text-[#ffae00] drop-shadow-[0_0_10px_#ffae00]" />
                        <p className="text-xs font-black text-white/50 uppercase tracking-widest">Aptitude Link Offline</p>
                        <p className="text-[10px] uppercase font-bold mt-2 text-white/30 tracking-widest">Connect to aptitude server to retrieve logic scores.</p>
                    </div>
                )}
            </Glass>
        </div>
    );
};

export default Profile;
