import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { BookOpen, Timer, CheckCircle, ArrowRight, Trophy } from 'lucide-react';

/* Cyberpunk Glass card helper */
const Glass = ({ children, className = '' }) => (
    <div className={`relative overflow-hidden bg-black/80 backdrop-blur-3xl p-1 ${className}`}
        style={{ border: '1px solid rgba(255,174,0,0.3)', boxShadow: '0 0 15px rgba(255,174,0,0.05)' }}>
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#ffae00]" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#ffae00]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#ffae00]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#ffae00]" />
        {children}
    </div>
);

const Aptitude = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [finished, setFinished] = useState(false);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await api.get('/aptitude/questions');
                setQuestions(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    useEffect(() => {
        if (timeLeft > 0 && !finished && !loading) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !finished) {
            setFinished(true);
        }
    }, [timeLeft, finished, loading]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const currentQ = questions[currentIndex];

    const handleAnswer = (option) => {
        setAnswers({ ...answers, [currentIndex]: option });
    };

    const calculateScore = () => {
        return questions.filter((q, i) => answers[i] === q.correctAnswer).length;
    };

    if (loading) return null;

    if (finished) {
        const score = calculateScore();
        return (
            <div className="max-w-2xl mx-auto py-12 text-center space-y-8 animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 flex items-center justify-center mx-auto bg-[#ffae00]/10 border border-[#ffae00]/50 shadow-[0_0_20px_rgba(255,174,0,0.3)]">
                    <Trophy size={48} className="text-[#ffae00] drop-shadow-[0_0_8px_#ffae00]" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-white tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Simulation Terminated</h1>
                    <p className="text-[#ffae00]/60 mt-2 text-xs font-bold uppercase tracking-widest">Logic sequence completed.</p>
                </div>
                <Glass className="p-0 border-[#00ff41]/50 shadow-[0_0_30px_rgba(0,255,65,0.2)]">
                    <div className="bg-black p-10 flex flex-col items-center justify-center">
                        <div className="text-5xl font-black text-[#00ff41] mb-2 drop-shadow-[0_0_15px_#00ff41]">{score} <span className="text-white/20 text-3xl">/ {questions.length}</span></div>
                        <p className="text-[10px] font-black text-[#00ff41]/50 uppercase tracking-widest drop-shadow-[0_0_2px_#00ff41]">Final Diagnostic Score</p>
                    </div>
                </Glass>
                <button
                    onClick={() => window.location.reload()}
                    className="px-10 py-4 bg-[#ffae00] text-black font-black uppercase tracking-widest text-xs hover:bg-transparent hover:text-[#ffae00] border border-[#ffae00] transition-all shadow-[0_0_20px_rgba(255,174,0,0.4)]"
                >
                    Restart Sequence
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-black text-white flex items-center gap-3 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        <BookOpen className="text-[#ffae00] drop-shadow-[0_0_8px_#ffae00]" size={24} /> Aptitude Matrix
                    </h1>
                    <p className="text-xs text-[#ffae00]/60 font-bold uppercase tracking-widest">Logic & Quantitative Evaluation.</p>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-[#ff0041]/10 border border-[#ff0041]/50 shadow-[0_0_15px_rgba(255,0,65,0.2)]">
                    <Timer size={18} className="text-[#ff0041] drop-shadow-[0_0_5px_#ff0041]" />
                    <span className="font-mono font-black text-[#ff0041] tracking-widest drop-shadow-[0_0_5px_#ff0041]">{formatTime(timeLeft)}</span>
                </div>
            </div>

            <Glass className="p-0 flex flex-col min-h-[500px]">
                <div className="bg-black/80 flex flex-col h-full">
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-white/5 border-b border-[#ffae00]/20 shadow-[inset_0_0_10px_rgba(255,174,0,0.1)]">
                        <div
                            className="h-full bg-[#ffae00] shadow-[0_0_10px_#ffae00] transition-all duration-500"
                            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>

                    <div className="p-10 flex-1 relative">
                        {/* decorative background element */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#ffae00]/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="mb-10 relative z-10">
                            <span className="text-[9px] font-black text-[#ffae00] uppercase tracking-widest bg-[#ffae00]/10 border border-[#ffae00]/30 px-3 py-1 shadow-[0_0_5px_rgba(255,174,0,0.2)]">{currentQ?.category}</span>
                            <h2 className="text-2xl font-black text-white mt-6 leading-relaxed uppercase tracking-wider drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                                {currentQ?.questionText}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                            {['optionA', 'optionB', 'optionC', 'optionD'].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleAnswer(opt.slice(-1))}
                                    className={`p-6 text-left border transition-all font-bold ${answers[currentIndex] === opt.slice(-1)
                                        ? 'border-[#ffae00] bg-[#ffae00]/10 text-white shadow-[0_0_15px_rgba(255,174,0,0.2)]'
                                        : 'border-white/10 bg-white/5 hover:border-[#ffae00]/50 hover:bg-[#ffae00]/5 text-white/70'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className={`w-8 h-8 flex items-center justify-center text-xs font-black shrink-0 ${answers[currentIndex] === opt.slice(-1) ? 'bg-[#ffae00] text-black shadow-[0_0_10px_#ffae00]' : 'bg-black/50 text-white/40 border border-white/20'
                                            }`}>
                                            {opt.slice(-1)}
                                        </span>
                                        <span className="text-sm font-medium tracking-wide leading-relaxed">{currentQ?.[opt]}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-black border-t border-[#ffae00]/30 flex items-center justify-between relative z-10">
                        <button
                            disabled={currentIndex === 0}
                            onClick={() => setCurrentIndex(currentIndex - 1)}
                            className="text-[10px] font-black uppercase tracking-widest text-[#ffae00]/50 hover:text-[#ffae00] disabled:opacity-20 transition-colors drop-shadow-[0_0_2px_#ffae00]"
                        >
                            ← Previous Node
                        </button>
                        <div className="text-[10px] font-black tracking-widest uppercase text-white/30">
                            Sequence <span className="text-[#ffae00] drop-shadow-[0_0_5px_#ffae00]">{currentIndex + 1}</span> / <span className="text-white/60">{questions.length}</span>
                        </div>
                        <button
                            onClick={() => {
                                if (currentIndex === questions.length - 1) setFinished(true);
                                else setCurrentIndex(currentIndex + 1);
                            }}
                            className="flex items-center gap-2 px-8 py-3 bg-[#ffae00] text-black text-[10px] font-black uppercase tracking-widest border border-[#ffae00] hover:bg-transparent hover:text-[#ffae00] transition-all shadow-[0_0_15px_rgba(255,174,0,0.3)]"
                        >
                            {currentIndex === questions.length - 1 ? 'Terminate Sequence' : 'Next Node'} <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </Glass>
        </div>
    );
};

export default Aptitude;
