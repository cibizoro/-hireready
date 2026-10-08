import React, { useState } from 'react';
import api from '../services/api';
import { MessageSquare, Sparkles, Send, ChevronRight, Play, Terminal } from 'lucide-react';

/* Cyberpunk Glass card helper */
const Glass = ({ children, className = '' }) => (
    <div className={`relative overflow-hidden bg-black/80 backdrop-blur-3xl p-1 ${className}`}
        style={{ border: '1px solid rgba(255,0,255,0.3)', boxShadow: '0 0 15px rgba(255,0,255,0.05)' }}>
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#ff00ff]" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#ff00ff]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#ff00ff]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#ff00ff]" />
        {children}
    </div>
);

const MockInterview = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [resumeContent, setResumeContent] = useState('');
    const [interviewResult, setInterviewResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleStart = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/interviews/start', { jobTitle, resumeContent });
            setInterviewResult(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black text-white flex items-center gap-3 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    <Sparkles className="text-[#ff00ff] drop-shadow-[0_0_8px_#ff00ff]" size={30} /> AI Interrogation Unit
                </h1>
                <p className="text-[#ff00ff]/60 text-xs font-bold uppercase tracking-widest">Connect to the neural network for simulated screening.</p>
            </div>

            {!interviewResult ? (
                <Glass className="p-0 border-[#ff00ff]/50 shadow-[0_0_20px_rgba(255,0,255,0.1)]">
                    <div className="bg-[#ff00ff]/10 border-b border-[#ff00ff]/30 p-8 flex items-center gap-4 relative overflow-hidden">
                        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-[#ff00ff]/20 rounded-full blur-3xl pointer-events-none" />
                        <Terminal className="text-[#ff00ff] shrink-0" size={32} />
                        <div>
                            <h2 className="text-sm font-black text-[#ff00ff] uppercase tracking-widest drop-shadow-[0_0_5px_#ff00ff]">Initialize Simulation</h2>
                            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">Provide parameters for the AI generation matrix.</p>
                        </div>
                    </div>

                    <form onSubmit={handleStart} className="p-8 space-y-8 bg-black">
                        <div className="space-y-3 relative group">
                            <label className="block text-[10px] font-black text-[#ff00ff] uppercase tracking-widest drop-shadow-[0_0_2px_#ff00ff]">Target Designation</label>
                            <input
                                type="text"
                                placeholder="e.g. Senior Cyber Security Analyst"
                                className="w-full px-6 py-4 bg-black border border-[#ff00ff]/30 text-white placeholder-white/20 text-sm font-black uppercase tracking-wider focus:outline-none focus:border-[#ff00ff] transition-all shadow-[inset_0_0_15px_rgba(255,0,255,0.05)] focus:shadow-[0_0_15px_rgba(255,0,255,0.2)]"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                required
                            />
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#ff00ff] group-focus-within:w-full transition-all duration-300 shadow-[0_0_5px_#ff00ff]" />
                        </div>

                        <div className="space-y-3 relative group">
                            <label className="block text-[10px] font-black text-[#ff00ff] uppercase tracking-widest drop-shadow-[0_0_2px_#ff00ff]">Agent Blueprint (Resume Output)</label>
                            <textarea
                                placeholder="Insert professional history and schematic capabilities here..."
                                className="w-full h-48 px-6 py-4 bg-black border border-[#ff00ff]/30 text-[#00f3ff] placeholder-[#00f3ff]/20 text-xs font-mono focus:outline-none focus:border-[#ff00ff] transition-all resize-none shadow-[inset_0_0_15px_rgba(255,0,255,0.05)] focus:shadow-[0_0_15px_rgba(255,0,255,0.2)] scrollbar-hide"
                                value={resumeContent}
                                onChange={(e) => setResumeContent(e.target.value)}
                                required
                            />
                            <div className="absolute bottom-1 left-0 w-0 h-[1px] bg-[#ff00ff] group-focus-within:w-full transition-all duration-300 shadow-[0_0_5px_#ff00ff]" />
                        </div>

                        <div className="flex flex-col items-center gap-6 pt-4 border-t border-white/5 relative">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full relative group overflow-hidden flex items-center justify-center gap-3 bg-transparent border border-[#ff00ff] text-[#ff00ff] font-black uppercase tracking-widest py-5 text-xs transition-all hover:bg-[#ff00ff] hover:text-black hover:shadow-[0_0_30px_rgba(255,0,255,0.4)] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#ff00ff]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 pointer-events-none" />
                                {loading ? 'Compiling Neural Data...' : (
                                    <><Play size={16} fill="currentColor" /> Initiate Sequence</>
                                )}
                            </button>
                            <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500 animate-pulse" /> Network uplink required for generative profiling.
                            </p>
                        </div>
                    </form>
                </Glass>
            ) : (
                <Glass className="p-0 border-[#00f3ff]/50 shadow-[0_0_30px_rgba(0,243,255,0.15)] animate-in zoom-in-95 duration-500">
                    <div className="bg-black p-8 flex flex-col h-full">
                        <div className="flex items-center justify-between border-b border-[#00f3ff]/30 pb-6 mb-8 relative">
                            <div className="absolute bottom-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-[#00f3ff] to-transparent shadow-[0_0_5px_#00f3ff]" />
                            <div>
                                <h2 className="text-2xl font-black text-white uppercase tracking-widest drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">{interviewResult.jobTitle}</h2>
                                <p className="text-[10px] text-[#00f3ff] font-black uppercase tracking-widest mt-2 drop-shadow-[0_0_2px_#00f3ff]">Simulation Report Generated</p>
                            </div>
                            <div className="text-right border border-[#00f3ff]/50 bg-[#00f3ff]/10 px-6 py-4 shadow-[inset_0_0_10px_rgba(0,243,255,0.2)]">
                                <div className="text-4xl font-black text-[#00f3ff] drop-shadow-[0_0_10px_#00f3ff]">{interviewResult.score}<span className="text-white/20 text-2xl">/100</span></div>
                                <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mt-2">Viability Index</p>
                            </div>
                        </div>

                        <div className="space-y-6 flex-1">
                            <h3 className="text-xs font-black text-[#ff00ff] uppercase tracking-widest flex items-center gap-3 drop-shadow-[0_0_5px_#ff00ff]">
                                <MessageSquare size={16} /> Interrogation Log
                            </h3>
                            <div className="bg-[#050505] border border-white/10 p-6 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] relative">
                                <div className="absolute top-0 right-0 w-2 h-full bg-white/10 -skew-x-12" />
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff00ff]/20 to-transparent" />
                                <pre className="whitespace-pre-wrap font-mono text-xs text-[#00ff41] leading-relaxed drop-shadow-[0_0_2px_#00ff41]">
                                    {interviewResult.feedback}
                                </pre>
                            </div>
                        </div>

                        <button
                            onClick={() => setInterviewResult(null)}
                            className="w-full mt-8 py-4 bg-transparent border border-[#00f3ff] text-[#00f3ff] font-black uppercase tracking-widest text-xs hover:bg-[#00f3ff] hover:text-black transition-all shadow-[0_0_15px_rgba(0,243,255,0.2)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)]"
                        >
                            Execute New Session
                        </button>
                    </div>
                </Glass>
            )}
        </div>
    );
};

export default MockInterview;
