import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        // Changed overflow-x-hidden to prevent unexpected horizontal scrolling
        <div className="min-h-screen bg-slate-50 overflow-x-hidden">
            
            {/* --- Transparent & Floating Navbar --- */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-5 flex justify-between items-center bg-transparent backdrop-blur-sm border-b border-white/10">
                
                {/* Logo with better typography */}
                <h2 className="text-3xl font-extrabold text-white tracking-tighter">
                    MINI<span className="text-blue-400">TRAVEL.</span>
                </h2>
                
                {/* Nav Links with better styling */}
                <div className="flex items-center space-x-3 md:space-x-6 font-semibold">
                    <Link to="/login" className="text-white hover:text-blue-300 transition-colors duration-200">
                        Login
                    </Link>
                    <Link 
                        to="/register" 
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
                    >
                        Sign Up
                    </Link>
                </div>
            </nav>

            {/* --- Hero Section (Now Full Screen 100vh) --- */}
            <header className="relative h-screen flex items-center justify-center text-center text-white px-6">
                
                {/* Background Image - Covers 100% of the screen height */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0" 
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2074')` }}
                >
                    {/* Darker overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* Content with animation and padding for Navbar */}
                <div className="relative z-10 max-w-4xl mt-20 animate-fadeIn">
                    <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tighter">
                        Escape to your <br /> 
                        <span className="bg-linear-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                            Dream Destination
                        </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-slate-200 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
                        Plan, book, and explore the world with our all-in-one travel companion. 
                        Your next adventure is just a click away.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <Link 
                            to="/register" 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4.5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-2xl shadow-blue-600/30"
                        >
                            Start Planning Now 🌍
                        </Link>
                    </div>
                </div>
            </header>

            
        </div>
    );
};



export default Home;