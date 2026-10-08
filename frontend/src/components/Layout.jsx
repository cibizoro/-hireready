import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen relative text-slate-100 selection:bg-cyan-500/30">
            {/* Top glowing accent line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-cyan-500 shadow-[0_0_15px_rgba(0,243,255,0.8)] z-50 animate-pulse" />
            <Navbar />
            <main className="pt-20 pb-16 px-4 max-w-7xl mx-auto relative z-10">
                {children}
            </main>
        </div>
    );
};

export default Layout;
