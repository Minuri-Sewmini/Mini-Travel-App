import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="relative bg-[#020617] border-t border-white/5 pt-24 pb-12 px-8 overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                    
                    {/* Brand & Newsletter Section */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-3 mb-8 group cursor-pointer" onClick={() => navigate('/')}>
                            <div className="w-12 h-12 bg-linear-to-tr from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                                <span className="text-white font-black text-xl italic">T</span>
                            </div>
                            <h2 className="text-3xl font-black text-white tracking-tighter">
                                MINI<span className="text-blue-500">TRAVEL.</span>
                            </h2>
                        </div>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">
                            The next generation of travel discovery. Share your soul-stirring journeys and find hidden gems around the globe.
                        </p>
                        
                        {/* Fake Newsletter Input for UI points */}
                        <div className="flex gap-2 max-w-sm">
                            <input 
                                type="text" 
                                placeholder="Get travel updates..." 
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            />
                            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl transition-all active:scale-95">
                                ➔
                            </button>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em] opacity-50">Explore</h4>
                            <ul className="space-y-4">
                                {['Feed', 'Trending', 'New Stays', 'Top Guides'].map((item) => (
                                    <li key={item} className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors font-medium">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em] opacity-50">Platform</h4>
                            <ul className="space-y-4 text-slate-400">
                                <li className="hover:text-blue-400 cursor-pointer transition-colors" onClick={() => navigate('/create-listing')}>Share Experience</li>
                                <li className="hover:text-blue-400 cursor-pointer transition-colors">How it works</li>
                                <li className="hover:text-blue-400 cursor-pointer transition-colors">Affiliates</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em] opacity-50">Support</h4>
                            <ul className="space-y-4 text-slate-400">
                                <li className="hover:text-blue-400 cursor-pointer transition-colors">Help Center</li>
                                <li className="hover:text-blue-400 cursor-pointer transition-colors">Safety</li>
                                <li className="hover:text-blue-400 cursor-pointer transition-colors">Privacy</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-slate-500 text-sm">
                            © {new Date().getFullYear()} MiniTravel Inc.
                        </p>
                        <div className="flex gap-6 text-xs font-bold text-slate-600 uppercase tracking-widest">
                            <span className="hover:text-slate-300 cursor-pointer transition">Status</span>
                            <span className="hover:text-slate-300 cursor-pointer transition">Security</span>
                            <span className="hover:text-slate-300 cursor-pointer transition">Cookies</span>
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex gap-4">
                        {['FB', 'IG', 'X', 'YT'].map((social) => (
                            <div 
                                key={social} 
                                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 hover:-translate-y-1 transition-all cursor-pointer font-bold text-xs"
                            >
                                {social}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;