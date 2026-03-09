import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { formatDistanceToNow } from 'date-fns';

const Feed = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/listings');
                setListings(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching feed", err);
                setLoading(false);
            }
        };
        fetchListings();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-[#0f172a]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        
        <div className="min-h-screen bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] pb-20">
            
            {/* --- Transparent Glass Navbar --- */}
            <nav className="sticky top-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-linear-to-tr from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="text-white font-black text-xl italic">T</span>
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">Mini<span className="text-blue-400">Travel</span></span>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <button onClick={() => navigate('/create-listing')} className="hidden md:block text-slate-300 font-medium hover:text-white transition">Post New</button>
                        <button 
                            onClick={handleLogout}
                            className="bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-white px-6 py-2 rounded-full font-bold text-sm transition-all border border-white/10"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <header className="pt-16 pb-12 px-6 text-center">
                <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
                    Find Your <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">Dream</span> Escape
                </h1>
                <p className="text-slate-400 text-lg max-w-xl mx-auto">
                    Explore curated world-class experiences at your fingertips.
                </p>
            </header>
            
            {/* --- Cards Grid --- */}
            <main className="max-w-7xl mx-auto px-6 mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {listings.map((item) => (
                        <div 
                            key={item._id} 
                            onClick={() => navigate(`/listing/${item._id}`)} 
                            className="group relative bg-white/5 backdrop-blur-sm rounded-[2.5rem] p-4 transition-all duration-500 hover:bg-white/10 border border-white/10 cursor-pointer shadow-2xl"
                        >
                            {/* Image Section */}
                            <div className="relative h-64 rounded-[4xl] overflow-hidden mb-6">
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full text-blue-400 font-bold text-sm border border-white/20">
                                    ${item.price}
                                </div>
                            </div>
                            
                            {/* Content Section */}
                            <div className="px-2 pb-2">
                                <p className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-2">📍 {item.location}</p>
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                                    {item.description}
                                </p>
                                
                                <div className="flex items-center justify-between border-t border-white/10 pt-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-slate-700 to-slate-900 flex items-center justify-center border border-white/20 text-white text-xs font-bold">
                                            {item.creatorName?.charAt(0)}
                                        </div>
                                        <span className="text-xs font-semibold text-slate-300">{item.creatorName}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase italic">
                                        {formatDistanceToNow(new Date(item.createdAt))} ago
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* --- New Post Button --- */}
            <button 
                onClick={() => navigate('/create-listing')}
                className="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-400 text-white w-16 h-16 rounded-2xl shadow-xl shadow-blue-500/40 transition-all hover:scale-110 flex items-center justify-center"
            >
                <span className="text-3xl font-light">+</span>
            </button>
        </div>
    );
};

export default Feed;