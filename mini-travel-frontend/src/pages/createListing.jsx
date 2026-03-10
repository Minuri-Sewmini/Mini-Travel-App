import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api.js';

const CreateListing = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        description: '',
        price: ''
    });
    
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false); // New: Track upload progress

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const data = new FormData();
        data.append('title', formData.title);
        data.append('location', formData.location);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('image', imageFile);

        try {
            const token = localStorage.getItem('token');

            await API.post('/listings/create', data, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` 
                }
            });

            navigate('/feed');
        } catch (err) {
            console.error("Upload Error:", err);
            // Specific check for bucket errors
            const errorMessage = err.response?.data?.message || "Check your internet or login session.";
            alert(`Error: ${errorMessage}`);
        } finally {
            setLoading(false); // Stop loading regardless of result
        }
    };

    return (
        <div className="relative min-h-screen bg-[#020617] text-white font-sans p-6 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
            
            <div className="max-w-4xl mx-auto relative z-10 pt-10">
                <div className="flex items-center justify-between mb-12">
                    <button 
                        onClick={() => navigate('/feed')} 
                        className="text-slate-400 hover:text-white transition font-bold text-sm uppercase tracking-widest"
                    >
                        ← Back to Feed
                    </button>
                    <div className="text-right">
                        <h1 className="text-4xl font-black tracking-tighter">
                            Share <span className="text-blue-400 font-medium">Experience</span>
                        </h1>
                        <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] mt-1">
                            {loading ? "Uploading to Cloud..." : "Logged in Session Active"}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6 bg-white/[0.03] backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Experience Title</label>
                            <input 
                                className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition" 
                                type="text" 
                                placeholder="Hike to Adams Peak" 
                                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                                required 
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Location</label>
                            <input 
                                className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition" 
                                type="text" 
                                placeholder="Nallathanniya, Sri Lanka" 
                                onChange={(e) => setFormData({...formData, location: e.target.value})} 
                                required 
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Price ($)</label>
                            <input 
                                className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition" 
                                type="number" 
                                placeholder="45" 
                                onChange={(e) => setFormData({...formData, price: e.target.value})} 
                                required 
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Upload Photo</label>
                            <input 
                                className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer" 
                                type="file" 
                                accept="image/*"
                                onChange={handleImageChange}
                                required 
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <textarea 
                            className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex-grow min-h-[150px] outline-none focus:ring-2 focus:ring-blue-500 transition" 
                            placeholder="Describe the magic of this place..." 
                            onChange={(e) => setFormData({...formData, description: e.target.value})} 
                            required 
                        />

                        <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-[2.5rem]">
                            <h4 className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4">Live Preview</h4>
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-2xl mb-4 border border-white/10 shadow-2xl" />
                            ) : (
                                <div className="w-full h-40 bg-white/5 rounded-2xl mb-4 border border-dashed border-white/20 flex items-center justify-center text-slate-600 italic text-sm text-center px-4">
                                    No image selected yet.
                                </div>
                            )}
                            <button 
                                type="submit" 
                                disabled={loading}
                                className={`w-full font-black py-5 rounded-2xl transition-all shadow-lg active:scale-95 ${
                                    loading 
                                    ? "bg-slate-700 cursor-not-allowed" 
                                    : "bg-blue-600 hover:bg-blue-500 shadow-blue-600/20"
                                }`}
                            >
                                {loading ? "Publishing..." : "Publish Experience"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateListing;