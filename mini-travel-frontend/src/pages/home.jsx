import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-[#020617] overflow-x-hidden font-sans selection:bg-blue-500/30">
            
            {/* --- Premium Glass Navbar --- */}
            <nav className="fixed top-0 left-0 w-full z-50 px-8 md:px-16 py-6 flex justify-between items-center bg-transparent backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <span className="text-white font-black text-xl italic">T</span>
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tighter">
                        MINI<span className="text-blue-500">TRAVEL.</span>
                    </h2>
                </div>
                
                <div className="flex items-center space-x-8 font-bold text-sm uppercase tracking-widest">
                    <Link to="/login" className="text-slate-400 hover:text-white transition-colors">
                        Login
                    </Link>
                    <Link 
                        to="/register" 
                        className="bg-white text-black px-8 py-3 rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-xl active:scale-95"
                    >
                        Join Now
                    </Link>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <header className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden">
                {/* Background with subtle zoom animation */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-subtleZoom" 
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2074')` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#020617]"></div>
                </div>

                <div className="relative z-10 max-w-5xl">
                    <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-[0.3em]">
                        Explore the Unexplored
                    </span>
                    
                    <h1 className="text-6xl md:text-9xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
                        Adventure <br /> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                            Awaits You
                        </span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
                        Connect with local experience providers and discover unique travel stories. 
                        Your journey to the world's most beautiful places starts here.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link 
                            to="/register" 
                            className="group relative bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-lg transition-all hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]"
                        >
                            Start Your Journey
                            <span className="ml-2 group-hover:translate-x-2 transition-transform inline-block">→</span>
                        </Link>
                        
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map((i) => (
                                <img 
                                    key={i}
                                    className="w-12 h-12 rounded-full border-4 border-[#020617] object-cover"
                                    src={`https://i.pravatar.cc/150?u=${i}`}
                                    alt="User"
                                />
                            ))}
                            <div className="w-12 h-12 rounded-full bg-slate-800 border-4 border-[#020617] flex items-center justify-center text-[10px] font-bold text-white">
                                10k+
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
                        <div className="w-1 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                </div>
            </header>

            {/* --- Simple Feature Preview --- */}
            <section className="py-24 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="text-3xl mb-4">📍</div>
                    <h4 className="text-xl font-bold text-white mb-2">Unique Locations</h4>
                    <p className="text-slate-400">Hand-picked destinations from local experts around the globe.</p>
                </div>
                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="text-3xl mb-4">📸</div>
                    <h4 className="text-xl font-bold text-white mb-2">Real Stories</h4>
                    <p className="text-slate-400">See real photos and read experiences shared by our community.</p>
                </div>
                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="text-3xl mb-4">🛡️</div>
                    <h4 className="text-xl font-bold text-white mb-2">Verified Hosts</h4>
                    <p className="text-slate-400">We ensure every experience provider meets our quality standards.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;