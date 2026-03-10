import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api.js';
import AuthNavbar from '../components/AuthNavbar.jsx';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/api/users/login', formData);
            localStorage.setItem('token', res.data.token); 
            navigate('/feed'); 
        } catch (err) {
            alert("Login Failed: " + (err.response?.data?.message || "Something went wrong"));
        }
    };

    return (
        <div className="relative flex justify-center items-center min-h-screen bg-[#020617] overflow-hidden p-6 font-sans">
            <AuthNavbar/>
            {/* --- Animated Background Glows --- */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse delay-700"></div>

            {/* --- Login Card --- */}
            <div className="relative z-10 bg-white/3 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-120 border border-white/10">
                
                {/* Logo or Icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-linear-to-tr from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 rotate-3">
                        <span className="text-white font-black text-3xl italic tracking-tighter">T</span>
                    </div>
                </div>

                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-white tracking-tight mb-3">
                        Welcome <span className="text-blue-400 font-medium tracking-normal">Back</span>
                    </h2>
                    <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">Enter your journey credentials</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div className="group flex flex-col">
                        <label className="text-xs font-bold text-slate-500 mb-2 ml-4 uppercase tracking-[0.2em]">Email Address</label>
                        <input 
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-3xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/8 transition-all duration-300" 
                            type="email"  
                            placeholder="explorer@minitravel.com"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                            required 
                        />
                    </div>

                    {/* Password Input */}
                    <div className="group flex flex-col">
                        <div className="flex justify-between items-center mb-2 ml-4">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Password</label>
                        </div>
                        <input 
                            className="w-full p-5 bg-white/5 border border-white/10 rounded-3xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/8 transition-all duration-300" 
                            type="password" 
                            placeholder="••••••••" 
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                            required 
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        className="relative w-full mt-6 bg-linear-to-r from-blue-500 to-blue-500 text-white p-5 rounded-3xl font-black text-lg shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.4)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300" 
                        type="submit"
                    >
                        Sign In to Explore
                    </button>
                </form>

                {/* Footer Links */}
                <div className="mt-12 text-center">
                    <p className="text-slate-500 text-sm font-medium">
                        New to Mini Travel? 
                        <Link to="/register" className="text-blue-400 font-bold ml-2 hover:text-blue-300 transition-colors border-b border-blue-400/20 pb-0.5">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>

            {/* Subtle bottom text */}
            <p className="absolute bottom-6 text-slate-700 text-[10px] font-bold uppercase tracking-[0.5em]">
                Secure Cloud Gateway Protected
            </p>
        </div>
    );
};

export default Login;