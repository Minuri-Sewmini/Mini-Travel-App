import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api.js';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Front-end validation for password match
        if (formData.password !== formData.confirmPassword) {
            return alert("Passwords do not match!");
        }

        try {
            // 1. Send registration request
            const res = await API.post('/users/register', formData);
            
            // 2. Auto-login: If your backend returns a token upon registration
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                navigate('/feed'); // Redirect straight to feed
            } else {
                // If backend doesn't return a token, go to login
                alert("Account created! Please log in.");
                navigate('/login');
            }
        } catch (err) {
            alert("Error: " + (err.response?.data?.message || "Registration failed"));
        }
    };

    return (
        <div className="relative flex justify-center items-center min-h-screen bg-[#020617] overflow-hidden p-6 font-sans">
            {/* --- Animated Background Glows --- */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse delay-700"></div>

            {/* --- Register Card --- */}
            <div className="relative z-10 bg-white/[0.03] backdrop-blur-2xl p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-2xl border border-white/10">
                
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-white tracking-tight mb-3">
                        Create <span className="text-blue-400 font-medium tracking-normal">Account</span>
                    </h2>
                    <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">Join the global travel community</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Group */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-500 mb-2 ml-4 uppercase tracking-[0.2em]">First Name</label>
                            <input 
                                className="w-full p-4 bg-white/[0.05] border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" 
                                type="text" 
                                placeholder="John"
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} 
                                required 
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-500 mb-2 ml-4 uppercase tracking-[0.2em]">Last Name</label>
                            <input 
                                className="w-full p-4 bg-white/[0.05] border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" 
                                type="text" 
                                placeholder="Doe"
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} 
                                required 
                            />
                        </div>
                    </div>

                    {/* Username & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-500 mb-2 ml-4 uppercase tracking-[0.2em]">Username</label>
                            <input 
                                className="w-full p-4 bg-white/[0.05] border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" 
                                type="text" 
                                placeholder="johndoe123"
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
                                required 
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-500 mb-2 ml-4 uppercase tracking-[0.2em]">Email Address</label>
                            <input 
                                className="w-full p-4 bg-white/[0.05] border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" 
                                type="email" 
                                placeholder="name@example.com"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                                required 
                            />
                        </div>
                    </div>

                    {/* Passwords */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-500 mb-2 ml-4 uppercase tracking-[0.2em]">Password</label>
                            <input 
                                className="w-full p-4 bg-white/[0.05] border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" 
                                type="password" 
                                placeholder="••••••••"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                                required 
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-500 mb-2 ml-4 uppercase tracking-[0.2em]">Confirm Password</label>
                            <input 
                                className="w-full p-4 bg-white/[0.05] border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" 
                                type="password" 
                                placeholder="••••••••"
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} 
                                required 
                            />
                        </div>
                    </div>

                    <button 
                        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white p-5 rounded-2xl font-black text-lg shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300" 
                        type="submit"
                    >
                        Create My Account
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-slate-500 text-sm font-medium">
                        Already have an account? 
                        <Link to="/login" className="text-blue-400 font-bold ml-2 hover:text-blue-300 transition-colors border-b border-blue-400/20 pb-0.5">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;