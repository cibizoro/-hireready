import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Code, MessageSquare, BookOpen, User, Menu, X, Zap } from 'lucide-react';

const NAV_LINKS = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/dsa', label: 'DSA Practice', icon: Code },
    { to: '/interview', label: 'Mock Interview', icon: MessageSquare },
    { to: '/aptitude', label: 'Aptitude', icon: BookOpen },
];

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => { logout(); navigate('/login'); };

    if (!user) return null;

    const isActive = (to) => to === '/' ? pathname === '/' : pathname.startsWith(to);

    return (
        <nav className="fixed w-full z-40 top-0" style={{ background: 'rgba(5,5,5,0.7)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,243,255,0.2)', boxShadow: '0 4px 30px rgba(0,243,255,0.1)' }}>
            <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 flex items-center justify-center transition-all group-hover:scale-110" style={{ filter: 'drop-shadow(0 0 8px #00f3ff)' }}>
                        <Zap size={20} color="#00f3ff" fill="#00f3ff" />
                    </div>
                    <span className="text-white font-black text-xl tracking-widest uppercase" style={{ textShadow: '0 0 10px rgba(0,243,255,0.5)' }}>
                        Hire<span style={{ color: '#00f3ff' }}>Ready</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                        <Link key={to} to={to}
                            className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest transition-all ${isActive(to)
                                ? 'text-[#00f3ff]'
                                : 'text-white/50 hover:text-[#00f3ff]'
                                }`}
                            style={isActive(to) ? { textShadow: '0 0 10px rgba(0,243,255,0.5)', borderBottom: '2px solid #00f3ff' } : {}}
                        >
                            <Icon size={16} />
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Right side */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="w-px h-5 bg-white/10" />
                    <Link to="/profile"
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-none border border-transparent text-xs font-black uppercase tracking-widest transition-all ${pathname === '/profile' ? 'text-[#ff00ff] border-[#ff00ff]' : 'text-white/50 hover:text-[#ff00ff] hover:border-[#ff00ff]'
                            }`}
                        style={pathname === '/profile' ? { boxShadow: 'inset 0 0 10px rgba(255,0,255,0.2), 0 0 10px rgba(255,0,255,0.2)', textShadow: '0 0 8px #ff00ff' } : {}}>
                        <User size={14} /> Profile
                    </Link>
                    <button onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#ff0041] hover:text-white hover:bg-[#ff0041] transition-all border border-[#ff0041]"
                        style={{ boxShadow: '0 0 10px rgba(255,0,65,0.2)' }}>
                        <LogOut size={14} /> Logout
                    </button>
                </div>

                {/* Mobile toggle */}
                <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-[#00f3ff] hover:text-white transition-colors p-2">
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-[#00f3ff]/30 bg-[#050505]/95 px-4 py-4 space-y-1 backdrop-blur-xl">
                    {[...NAV_LINKS, { to: '/profile', label: 'Profile', icon: User }].map(({ to, label, icon: Icon }) => (
                        <Link key={to} to={to} onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest transition-all ${isActive(to) ? 'text-[#00f3ff] bg-[#00f3ff]/10 border-l-2 border-[#00f3ff]' : 'text-white/50 hover:text-[#00f3ff] hover:bg-[#00f3ff]/5 border-l-2 border-transparent'
                                }`}>
                            <Icon size={17} /> {label}
                        </Link>
                    ))}
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest text-[#ff0041] hover:bg-[#ff0041]/10 border-l-2 border-transparent hover:border-[#ff0041] transition-all mt-4">
                        <LogOut size={17} /> Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
