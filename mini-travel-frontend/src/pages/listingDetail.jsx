import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api.js';
import { formatDistanceToNow } from 'date-fns';

const ListingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await API.get(`api/listings/${id}`);
                setListing(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching listing details", err);
                setLoading(false);
            }
        };
        fetchListing();
    }, [id]);

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-[#020617]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (!listing) return (
        <div className="flex h-screen items-center justify-center bg-[#020617]">
            <p className="text-white">Listing not found.</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617] text-white pb-20 font-sans">
            <div className="max-w-5xl mx-auto px-6 pt-10">
                <button 
                    onClick={() => navigate(-1)}
                    className="text-slate-400 hover:text-white transition flex items-center gap-2 mb-8 font-bold text-sm uppercase tracking-widest"
                >
                    ← Back to Feed
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <div className="rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl h-[400px] lg:h-[550px]">
                        <img src={listing.imageUrl} alt={listing.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Info Section */}
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-blue-500 text-xl">📍</span>
                            <p className="text-blue-400 font-black text-sm uppercase tracking-[0.3em]">{listing.location}</p>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
                            {listing.title}
                        </h1>
                        <div className="inline-block bg-blue-600/20 border border-blue-500/30 text-blue-400 px-6 py-2 rounded-2xl font-black text-xl mb-8 w-fit">
                            ${listing.price}
                        </div>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium">
                            {listing.description}
                        </p>

                        {/* Profile Info */}
                        <div className="flex items-center gap-4 p-6 bg-white/5 rounded-3xl border border-white/10">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xl font-black shadow-lg">
                                {listing.creatorName?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Posted by</p>
                                <p className="text-lg font-bold text-white">{listing.creatorName}</p>
                                <p className="text-xs text-slate-500 font-medium">
                                    {listing.createdAt ? formatDistanceToNow(new Date(listing.createdAt)) : ''} ago
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingDetail;