import React, { useEffect, useState } from 'react';
import API from '../api.js'; 
import { useNavigate, Link } from 'react-router-dom'; // Link එකතු කළා
import { formatDistanceToNow } from 'date-fns';
import Footer from '../components/footer.jsx';

const Feed = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await API.get('/listings');
                setListings(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching feed", err);
                setError("Could not load experiences. Please try again later.");
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
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="text-slate-400 font-medium animate-pulse">Loading experiences...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617] pb-20 font-sans">
            {/* --- Transparent Glass Navbar --- */}
            <nav className="sticky top-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    
                    {/* Logo - Click to go Home */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 bg-linear-to-tr from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="text-white font-black text-xl italic">T</span>
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">Mini<span className="text-blue-400 font-medium">Travel</span></span>
                    </div>
                    
                    <div className="flex items-center gap-8">
                        {/* --- Home Link --- */}
                        <Link to="/" className="text-slate-300 font-bold text-sm uppercase tracking-widest hover:text-white transition">
                            Home
                        </Link>

                        <button 
                            onClick={() => navigate('/create-listing')} 
                            className="hidden md:block text-slate-300 font-bold text-sm uppercase tracking-widest hover:text-white transition"
                        >
                            Post Experience
                        </button>
                        
                        <button 
                            onClick={handleLogout}
                            className="bg-red-500/10 hover:bg-red-600 hover:text-white text-red-500 px-6 py-2 rounded-full font-bold text-sm transition-all border border-red-500/20"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <header className="pt-20 pb-12 px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                    Find Your <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">Dream</span> Escape
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
                    Discover hand-picked travel stories and unique stays shared by our community of world explorers.
                </p>
            </header>

            {/* --- Main Feed --- */}
            <main className="max-w-7xl mx-auto px-6 mt-10">
                {error && (
                    <div className="text-center py-10">
                        <p className="text-red-400 font-bold">{error}</p>
                    </div>
                )}

                {listings.length === 0 && !error ? (
                    <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
                        <p className="text-slate-500 text-xl font-medium">No experiences found. Be the first to share one!</p>
                        <button 
                            onClick={() => navigate('/create-listing')}
                            className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-500 transition"
                        >
                            Create Listing
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {listings.map((item) => (
                            <div 
                                key={item._id} 
                                onClick={() => navigate(`/listing/${item._id}`)} 
                                className="group relative bg-white/3 backdrop-blur-md rounded-[2.5rem] p-5 transition-all duration-500 hover:bg-white/[0.07] border border-white/10 cursor-pointer shadow-2xl hover:-translate-y-2"
                            >
                                <div className="relative h-72 rounded-4xl overflow-hidden mb-6">
                                    <img 
                                        src={item.imageUrl} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute top-5 right-5 bg-black/60 backdrop-blur-xl px-5 py-2 rounded-2xl text-blue-400 font-black text-sm border border-white/10">
                                        ${item.price}
                                    </div>
                                </div>
                                
                                <div className="px-2">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-blue-500 text-lg">📍</span>
                                        <p className="text-blue-400 font-bold text-xs uppercase tracking-[0.2em]">{item.location}</p>
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-3 group-hover:text-blue-300 transition-colors tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-2 font-medium">
                                        {item.description}
                                    </p>
                                    
                                    <div className="flex items-center justify-between border-t border-white/5 pt-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-slate-800 to-slate-950 flex items-center justify-center border border-white/10 text-blue-400 text-sm font-black">
                                                {item.creatorName?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Posted by</span>
                                                <span className="text-xs font-bold text-slate-200">{item.creatorName}</span>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-tighter opacity-60">
                                            {formatDistanceToNow(new Date(item.createdAt))} ago
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer/>

            {/* --- Floating Action Button --- */}
            <button 
                onClick={() => navigate('/create-listing')}
                className="fixed bottom-12 right-12 bg-linear-to-tr from-blue-600 to-cyan-500 text-white w-20 h-20 rounded-4xl shadow-[0_20px_50px_rgba(37,99,235,0.4)] transition-all hover:scale-110 active:scale-95 flex items-center justify-center z-50 group"
            >
                <span className="text-4xl font-light group-hover:rotate-90 transition-transform duration-300">+</span>
            </button>
        </div>
    );
};

export default Feed;