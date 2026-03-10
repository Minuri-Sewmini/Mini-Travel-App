import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthNavbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-transparent">
            {/* Logo - Click to go Home */}
            <div 
                className="flex items-center gap-2 cursor-pointer group" 
                onClick={() => navigate('/')}
            >
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-blue-500 transition-colors">
                    <span className="text-white font-black text-xl italic">T</span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tighter">
                    MINI<span className="text-blue-500">TRAVEL.</span>
                </h2>
            </div>

            {/* Back Button */}
            <button 
                onClick={() => navigate('/')}
                className="text-slate-400 hover:text-white font-bold text-sm uppercase tracking-widest transition-all flex items-center gap-2"
            >
                <span className="text-lg">←</span> Back
            </button>
        </nav>
    );
};

export default AuthNavbar;