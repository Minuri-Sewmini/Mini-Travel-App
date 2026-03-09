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
        confirmPassword: '' // Added for backend validation
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/users/register', formData);
            alert("Success: " + res.data.message);
            navigate('/login'); // Redirect to login on success
        } catch (err) {
            alert("Error: " + (err.response?.data?.message || "Registration failed"));
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-white/20 backdrop-blur-sm">
                
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">Create Account</h2>
                    <p className="text-slate-500 mt-2">Join the Mini Travel community today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Group */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-slate-700 mb-1 ml-1">First Name</label>
                            <input 
                                className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                type="text" 
                                placeholder="John" 
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} 
                                required 
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-slate-700 mb-1 ml-1">Last Name</label>
                            <input 
                                className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                type="text" 
                                placeholder="Doe" 
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} 
                                required 
                            />
                        </div>
                    </div>

                    {/* Username & Email */}
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-slate-700 mb-1 ml-1">Username</label>
                            <input 
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                type="text" 
                                placeholder="johndoe123" 
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
                                required 
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-slate-700 mb-1 ml-1">Email Address</label>
                            <input 
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                type="email" 
                                placeholder="name@example.com" 
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                                required 
                            />
                        </div>
                    </div>

                    {/* Passwords */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-slate-700 mb-1 ml-1">Password</label>
                            <input 
                                className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                type="password" 
                                placeholder="••••••••" 
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                                required 
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-slate-700 mb-1 ml-1">Confirm Password</label>
                            <input 
                                className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                type="password" 
                                placeholder="••••••••" 
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} 
                                required 
                            />
                        </div>
                    </div>

                    <button 
                        className="w-full mt-4 bg-blue-600 text-white p-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200 active:scale-95" 
                        type="submit"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-600">
                        Already have an account? 
                        <Link to="/login" className="text-blue-600 font-bold ml-1 hover:underline underline-offset-4">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;