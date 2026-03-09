import React, { useState } from 'react';
import API from '../api.js';

const Register = () => {
    // Backend model eka anuwa fields add kala
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/users/register', formData);
            alert("Success: " + res.data.message);
        } catch (err) {
            alert("Error: " + (err.response?.data?.message || "Registration failed"));
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-slate-100 p-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Join Mini Travel</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <input className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" type="text" placeholder="First Name" 
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
                    <input className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" type="text" placeholder="Last Name" 
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
                </div>

                <div className="space-y-4">
                    <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" type="text" placeholder="Username" 
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
                    <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" type="email" placeholder="Email" 
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" type="password" placeholder="Password" 
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                </div>

                <button className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition" type="submit">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Register;