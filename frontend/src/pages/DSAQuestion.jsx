import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Editor from '@monaco-editor/react';
import { Play, Send, ChevronLeft, Info, Settings, Code, Terminal } from 'lucide-react';

const LANGUAGES = [
    { id: 63, name: 'JavaScript', monaco: 'javascript', extension: 'js', defaultCode: '// Write your solution here\n\nfunction solution() {\n  \n}' },
    { id: 62, name: 'Java', monaco: 'java', extension: 'java', defaultCode: 'public class Main {\n    public static void main(String[] args) {\n        // Write your solution here\n    }\n}' },
];

/* Cyberpunk Glass card helper */
const Glass = ({ children, className = '' }) => (
    <div className={`relative overflow-hidden bg-black/80 backdrop-blur-3xl p-1 ${className}`}
        style={{ border: '1px solid rgba(0,243,255,0.3)', boxShadow: '0 0 15px rgba(0,243,255,0.05)' }}>
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00f3ff]" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00f3ff]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00f3ff]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00f3ff]" />
        {children}
    </div>
);

const DSAQuestion = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
    const [codes, setCodes] = useState({
        63: LANGUAGES[0].defaultCode,
        62: LANGUAGES[1].defaultCode,
    });
    const [output, setOutput] = useState(null);
    const [submissionResult, setSubmissionResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchQuestion = async () => {
            const res = await api.get(`/dsa/questions/${id}`);
            setQuestion(res.data);
        };
        fetchQuestion();
    }, [id]);

    const handleLanguageChange = (e) => {
        const lang = LANGUAGES.find(l => l.id === parseInt(e.target.value));
        setSelectedLanguage(lang);
    };

    const handleEditorChange = (value) => {
        setCodes({
            ...codes,
            [selectedLanguage.id]: value
        });
    };

    const handleRun = async () => {
        setLoading(true);
        setSubmissionResult(null);
        try {
            const res = await api.post('/dsa/execute', {
                source_code: codes[selectedLanguage.id],
                language_id: selectedLanguage.id,
                stdin: ''
            });
            setOutput(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setOutput(null);
        try {
            const res = await api.post(`/dsa/submit/${id}`, {
                source_code: codes[selectedLanguage.id],
                language_id: selectedLanguage.id
            });
            setSubmissionResult(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!question) return null;

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="flex items-center justify-between mt-2">
                <button
                    onClick={() => navigate('/dsa')}
                    className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-[#00f3ff] hover:text-white transition-colors"
                    style={{ textShadow: '0 0 5px rgba(0,243,255,0.5)' }}
                >
                    <ChevronLeft size={16} /> Retreat to Databank
                </button>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-black/50 border border-[#00f3ff]/50 px-3 py-1.5 shadow-[0_0_10px_rgba(0,243,255,0.1)] transition-colors hover:border-[#00f3ff]">
                        <Code size={14} className="text-[#00f3ff] drop-shadow-[0_0_5px_#00f3ff]" />
                        <select
                            className="text-[11px] font-black uppercase tracking-widest text-white bg-transparent outline-none border-none cursor-pointer [&>option]:bg-[#050505]"
                            value={selectedLanguage.id}
                            onChange={handleLanguageChange}
                        >
                            {LANGUAGES.map(lang => (
                                <option key={lang.id} value={lang.id}>{lang.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex gap-4 overflow-hidden">
                {/* Left Side: Question Details */}
                <Glass className="w-1/3 flex flex-col">
                    <div className="h-full overflow-y-auto p-6 custom-scrollbar bg-black/40">
                        <div className="flex items-center gap-3 mb-5">
                            <span className={`px-2 py-0.5 text-[9px] font-black border uppercase tracking-widest shadow-[0_0_5px_currentColor] ${question.difficulty === 'Easy' ? 'bg-[#00ff41]/10 text-[#00ff41] border-[#00ff41]/50' :
                                question.difficulty === 'Medium' ? 'bg-[#ffae00]/10 text-[#ffae00] border-[#ffae00]/50' :
                                    'bg-[#ff0041]/10 text-[#ff0041] border-[#ff0041]/50'
                                }`}>
                                {question.difficulty}
                            </span>
                            <span className="text-white/40 text-[9px] font-black uppercase tracking-widest border-b border-white/10">{question.category}</span>
                        </div>
                        <h1 className="text-2xl font-black text-white mb-6 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{question.title}</h1>
                        <div className="prose prose-invert prose-sm text-white/70 leading-relaxed mb-8 font-medium">
                            <p className="whitespace-pre-wrap">{question.description}</p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-black text-[#ff00ff] text-xs uppercase tracking-widest flex items-center gap-2 drop-shadow-[0_0_5px_#ff00ff]">
                                <span className="w-2 h-2 bg-[#ff00ff]" /> Simulation 1
                            </h3>
                            <div className="bg-white/5 border border-[#ff00ff]/30 p-4 shadow-[inset_0_0_10px_rgba(255,0,255,0.05)] relative">
                                <div className="absolute top-0 right-0 w-2 h-full bg-[#ff00ff]/20 -skew-x-12" />
                                <p className="text-[9px] font-black text-[#ff00ff] uppercase tracking-widest mb-2 drop-shadow-[0_0_2px_#ff00ff]">Input</p>
                                <code className="text-xs text-white block mb-4 bg-black/50 p-2 font-mono border border-white/10">{question.exampleInput}</code>
                                <p className="text-[9px] font-black text-[#ff00ff] uppercase tracking-widest mb-2 drop-shadow-[0_0_2px_#ff00ff]">Output</p>
                                <code className="text-xs text-[#00ff41] block bg-black/50 p-2 font-mono border border-white/10 drop-shadow-[0_0_5px_#00ff41]">{question.exampleOutput}</code>
                            </div>

                            {question.constraints && (
                                <>
                                    <h3 className="font-black text-[#ffae00] text-xs uppercase tracking-widest flex items-center gap-2 mt-8 drop-shadow-[0_0_5px_#ffae00]">
                                        <span className="w-2 h-2 bg-[#ffae00]" /> Constraints
                                    </h3>
                                    <div className="bg-black border border-[#ffae00]/30 p-4 text-[11px] text-[#ffae00]/80 font-mono leading-relaxed shadow-[inset_0_0_10px_rgba(255,174,0,0.05)] whitespace-pre-wrap">
                                        {question.constraints}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Glass>

                {/* Right Side: Code Editor */}
                <div className="flex-1 flex flex-col gap-4">
                    <Glass className="flex-1 flex flex-col">
                        <div className="bg-black border-b border-[#00f3ff]/30 px-4 py-2 flex items-center justify-between">
                            <div className="flex gap-4">
                                <button className="text-[10px] font-black text-[#00f3ff] border-b-2 border-[#00f3ff] pb-1 uppercase tracking-widest flex items-center gap-2 drop-shadow-[0_0_5px_#00f3ff]">
                                    <Terminal size={12} /> solution.{selectedLanguage.extension}
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 relative bg-[#050505]">
                            <Editor
                                height="100%"
                                language={selectedLanguage.monaco}
                                value={codes[selectedLanguage.id]}
                                onChange={handleEditorChange}
                                theme="vs-dark"
                                options={{
                                    fontSize: 14,
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    padding: { top: 16 },
                                    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                                    fontLigatures: true,
                                    cursorBlinking: 'smooth',
                                    smoothScrolling: true,
                                    lineNumbers: 'on',
                                    renderLineHighlight: 'all',
                                    scrollbar: { vertical: 'hidden', horizontal: 'hidden' }
                                }}
                            />
                        </div>
                        <div className="bg-black border-t border-[#00f3ff]/30 px-4 py-3 flex items-center justify-between">
                            <div className="text-[9px] text-white/40 font-black uppercase tracking-widest flex items-center gap-2">
                                <Code size={12} className="text-[#00f3ff]" /> {selectedLanguage.name} Runtime Environment
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleRun}
                                    disabled={loading}
                                    className="flex items-center gap-2 px-6 py-2 bg-transparent border border-white/20 hover:border-white text-white text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50"
                                >
                                    <Play size={12} /> Execute
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="flex items-center gap-2 px-6 py-2 bg-[#00f3ff] hover:bg-transparent hover:text-[#00f3ff] border border-[#00f3ff] text-black text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,243,255,0.3)] active:scale-95 disabled:opacity-50"
                                >
                                    <Send size={12} /> Deploy
                                </button>
                            </div>
                        </div>
                    </Glass>

                    {/* Output Panel for Run */}
                    {output && (
                        <Glass className="h-1/3 p-0">
                            <div className="h-full bg-black/80 flex flex-col">
                                <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-white/5">
                                    <h3 className="text-[10px] font-black text-white/50 uppercase tracking-widest flex items-center gap-2">
                                        <Terminal size={12} /> Terminal Output
                                    </h3>
                                    {output.status && (
                                        <span className="text-[9px] font-black px-2 py-0.5 border uppercase tracking-widest text-[#00ff41] border-[#00ff41]/50 bg-[#00ff41]/10 drop-shadow-[0_0_5px_#00ff41]">
                                            {output.status.description}
                                        </span>
                                    )}
                                </div>
                                <div className="flex-1 p-6 overflow-y-auto">
                                    <pre className="text-white/80 font-mono text-xs leading-relaxed">
                                        {output.stdout || output.error || 'Program executed successfully with no output.'}
                                    </pre>
                                </div>
                            </div>
                        </Glass>
                    )}

                    {/* Submission Result Panel */}
                    {submissionResult && (
                        <Glass className="h-2/5 p-0 border border-[#b537f2] shadow-[0_0_20px_rgba(181,55,242,0.15)]">
                            <div className="h-full flex flex-col bg-black/80">
                                <div className="bg-white/5 border-b border-white/10 px-6 py-3 flex items-center justify-between">
                                    <button className="text-[10px] font-black text-[#b537f2] border-b-2 border-[#b537f2] pb-1 uppercase tracking-widest drop-shadow-[0_0_5px_#b537f2]">
                                        Diagnostic Result
                                    </button>
                                    <span className={`text-[9px] font-black px-3 py-1 uppercase tracking-widest border ${submissionResult.passed ? 'text-[#00ff41] bg-[#00ff41]/10 border-[#00ff41]/50 drop-shadow-[0_0_5px_#00ff41]' : 'text-[#ff0041] bg-[#ff0041]/10 border-[#ff0041]/50 drop-shadow-[0_0_5px_#ff0041]'}`}>
                                        {submissionResult.passed ? 'ACCEPTED' : 'REJECTED'}
                                    </span>
                                </div>

                                <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
                                    <div className="flex items-center gap-4">
                                        <h3 className={`text-lg font-black uppercase tracking-widest drop-shadow-[0_0_8px_currentColor] ${submissionResult.passed ? 'text-[#00ff41]' : 'text-[#ff0041]'}`}>
                                            {submissionResult.passed ? 'System Validation: PASS' : 'System Validation: FAIL'}
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="bg-black border border-white/10 p-4 relative">
                                            <div className="absolute top-0 right-0 w-2 h-full bg-white/5 -skew-x-12" />
                                            <p className="text-[9px] font-black text-white/50 uppercase mb-2 tracking-widest">Input Vector</p>
                                            <pre className="font-mono text-xs text-white/80">{question.testCaseInput.split('\n')[0]}</pre>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className={`p-4 border relative ${submissionResult.passed ? 'bg-[#00ff41]/5 border-[#00ff41]/30' : 'bg-[#ff0041]/5 border-[#ff0041]/30'}`}>
                                                <div className={`absolute top-0 right-0 w-2 h-full -skew-x-12 ${submissionResult.passed ? 'bg-[#00ff41]/20' : 'bg-[#ff0041]/20'}`} />
                                                <p className="text-[9px] font-black text-white/50 uppercase mb-2 tracking-widest">Your Output</p>
                                                <pre className={`font-mono text-xs font-black drop-shadow-[0_0_5px_currentColor] ${submissionResult.passed ? 'text-[#00ff41]' : 'text-[#ff0041]'}`}>{submissionResult.actualOutput}</pre>
                                            </div>
                                            <div className="bg-black border border-white/10 p-4 relative">
                                                <div className="absolute top-0 right-0 w-2 h-full bg-white/5 -skew-x-12" />
                                                <p className="text-[9px] font-black text-white/50 uppercase mb-2 tracking-widest">Expected Signature</p>
                                                <pre className="font-mono text-xs font-black text-white/90">{submissionResult.expectedOutput}</pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Glass>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DSAQuestion;
