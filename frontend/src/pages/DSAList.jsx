import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Search, Filter, CheckCircle, Code, ChevronRight, ChevronDown } from 'lucide-react';

const Glass = ({ children, className = '' }) => (
    <div className={`p-1 relative overflow-hidden bg-black/80 backdrop-blur-3xl ${className}`} style={{ border: '1px solid rgba(0,243,255,0.3)', boxShadow: '0 0 20px rgba(0,243,255,0.05)' }}>
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00f3ff]" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00f3ff]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00f3ff]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00f3ff]" />
        {children}
    </div>
);

const CustomSelect = ({ value, onChange, options, placeholder }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between gap-3 px-4 py-2.5 text-xs font-black tracking-widest uppercase text-white transition-all min-w-[160px]"
                style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,243,255,0.5)', boxShadow: open ? '0 0 15px rgba(0,243,255,0.2)' : 'none' }}
            >
                {value ? options.find(o => o.value === value)?.label : placeholder}
                <ChevronDown size={14} className={`text-[#00f3ff] transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute top-full mt-2 w-full z-20 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
                        style={{ background: '#050505', border: '1px solid rgba(0,243,255,0.3)', boxShadow: '0 0 20px rgba(0,243,255,0.15)' }}>
                        <div className="max-h-60 overflow-y-auto py-1">
                            <button
                                onClick={() => { onChange(''); setOpen(false); }}
                                className={`w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${!value ? 'text-[#00f3ff] bg-[#00f3ff]/10' : 'text-white/60 hover:text-[#00f3ff] hover:bg-[#00f3ff]/5'}`}
                            >
                                {placeholder}
                            </button>
                            {options.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => { onChange(opt.value); setOpen(false); }}
                                    className={`w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${value === opt.value ? 'text-[#00f3ff] bg-[#00f3ff]/10' : 'text-white/60 hover:text-[#00f3ff] hover:bg-[#00f3ff]/5'}`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const DSAList = () => {
    const [questions, setQuestions] = useState([]);
    const [solvedIds, setSolvedIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [topicFilter, setTopicFilter] = useState('');
    const categoryQuery = searchParams.get('category');

    useEffect(() => {
        if (categoryQuery) {
            setTopicFilter(categoryQuery);
        }
    }, [categoryQuery]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch all questions so local filtering works without extra API calls
                const [qRes, sRes] = await Promise.all([api.get('/dsa/questions'), api.get('/dsa/solved-ids')]);
                setQuestions(qRes.data);
                setSolvedIds(sRes.data);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    const filtered = questions.filter(q => {
        const matchSearch = q.title.toLowerCase().includes(search.toLowerCase());
        const matchTopic = topicFilter ? q.category === topicFilter : true;
        const matchDiff = difficulty ? q.difficulty === difficulty : true;
        return matchSearch && matchTopic && matchDiff;
    });

    const diffColor = (d) => d === 'Easy' ? 'text-[#00ff41] border-[#00ff41] bg-[#00ff41]/10 shadow-[0_0_10px_rgba(0,255,65,0.2)]'
        : d === 'Medium' ? 'text-[#ffae00] border-[#ffae00] bg-[#ffae00]/10 shadow-[0_0_10px_rgba(255,174,0,0.2)]'
            : 'text-[#ff0041] border-[#ff0041] bg-[#ff0041]/10 shadow-[0_0_10px_rgba(255,0,65,0.2)]';

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-[11px] font-black text-white/30 uppercase tracking-widest mb-1">
                        <Link to="/dsa" className="hover:text-indigo-400 transition-colors">DSA Practice</Link>
                        {categoryQuery && (<><ChevronRight size={12} /><span className="text-indigo-400">{categoryQuery}</span></>)}
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight">
                        {categoryQuery ? `${categoryQuery} Problems` : 'All Problems'}
                    </h1>
                    <p className="text-white/30 text-sm mt-1">Sharpen your coding skills with curated problems.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00f3ff]" size={16} />
                        <input type="text" placeholder="Search problems…" value={search} onChange={e => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2.5 text-xs font-black tracking-widest text-white placeholder-white/20 focus:outline-none transition-all uppercase"
                            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,243,255,0.5)' }} />
                    </div>

                    <CustomSelect
                        value={topicFilter}
                        onChange={setTopicFilter}
                        placeholder="All Topics"
                        options={[
                            { value: 'Array', label: 'Array' },
                            { value: 'String', label: 'String' },
                            { value: 'Linked List', label: 'Linked List' },
                            { value: 'Stack', label: 'Stack' },
                            { value: 'Tree', label: 'Tree' },
                            { value: 'Hash Map', label: 'Hash Map' }
                        ]}
                    />

                    <CustomSelect
                        value={difficulty}
                        onChange={setDifficulty}
                        placeholder="All Difficulties"
                        options={[
                            { value: 'Easy', label: 'Easy' },
                            { value: 'Medium', label: 'Medium' },
                            { value: 'Hard', label: 'Hard' }
                        ]}
                    />
                </div>
            </div>

            {/* Stats bar */}
            <div className="flex gap-4 flex-wrap">
                {[
                    { label: 'Total', val: filtered.length, color: 'text-white' },
                    { label: 'Solved', val: filtered.filter(q => solvedIds.includes(q.id)).length, color: 'text-emerald-400' },
                    { label: 'Remaining', val: filtered.length - filtered.filter(q => solvedIds.includes(q.id)).length, color: 'text-white/40' },
                ].map(({ label, val, color }) => (
                    <div key={label} className="px-5 py-3 relative overflow-hidden" style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(0,243,255,0.3)', boxShadow: '0 0 15px rgba(0,243,255,0.05)' }}>
                        <div className="absolute top-0 right-[-10px] w-4 h-full bg-[#00f3ff]/10 -skew-x-12" />
                        <span className={`font-black text-lg ${color}`} style={{ textShadow: `0 0 10px ${color}` }}>{val}</span>
                        <span className="text-white/40 text-[10px] font-black uppercase ml-2 tracking-widest">{label}</span>
                    </div>
                ))}
            </div>

            {/* Table */}
            <Glass>
                <table className="w-full text-left">
                    <thead style={{ borderBottom: '1px solid rgba(0,243,255,0.3)' }}>
                        <tr>
                            {['Status', 'Title', 'Category', 'Difficulty', 'Action'].map((h, i) => (
                                <th key={h} className={`px-5 py-4 text-[9px] font-black uppercase tracking-widest text-[#00f3ff] ${i === 4 ? 'text-right' : ''}`}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            [1, 2, 3, 4, 5].map(i => (
                                <tr key={i} className="animate-pulse" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <td colSpan="5" className="px-5 py-4">
                                        <div className="h-4 rounded-full bg-white/5 w-3/4" />
                                    </td>
                                </tr>
                            ))
                        ) : filtered.map((q, idx) => {
                            const solved = solvedIds.includes(q.id);
                            return (
                                <tr key={q.id} className="group transition-colors origin-left hover:scale-[1.01]" style={{ borderBottom: '1px solid rgba(0,243,255,0.1)', background: solved ? 'rgba(0,255,65,0.05)' : 'transparent' }}>
                                    <td className="px-5 py-4">
                                        <CheckCircle size={18} className={solved ? 'text-[#00ff41]' : 'text-white/10'} style={solved ? { filter: 'drop-shadow(0 0 5px #00ff41)' } : {}} />
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-black text-white group-hover:text-[#00f3ff] transition-colors tracking-wide">{q.title}</span>
                                            {solved && (
                                                <span className="text-[8px] font-black text-[#00ff41] bg-[#00ff41]/10 border border-[#00ff41] px-2 py-0.5 rounded-sm uppercase tracking-widest" style={{ boxShadow: '0 0 8px rgba(0,255,65,0.3)' }}>Solved</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="px-2 py-1 text-[10px] font-black uppercase text-white/50 border border-white/20 bg-white/5">{q.category}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`px-2 py-1 text-[9px] font-black uppercase border ${diffColor(q.difficulty)}`}>{q.difficulty}</span>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <Link to={`/dsa/${q.id}`}
                                            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#ff00ff] hover:text-white transition-colors" style={{ textShadow: '0 0 8px #ff00ff' }}>
                                            {solved ? 'Revisit' : 'Execute'} <Code size={14} />
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {!loading && filtered.length === 0 && (
                    <div className="text-center py-16 text-white/20">
                        <Code size={40} className="mx-auto mb-3" />
                        <p className="text-sm font-semibold text-white/30">No problems found.</p>
                    </div>
                )}
            </Glass>
        </div>
    );
};

export default DSAList;
