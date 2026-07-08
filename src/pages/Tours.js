import React, { useState, useEffect } from 'react';
import { getYatras } from '../services/api';

function Tours() {
    const [yatras, setYatras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadYatras();
    }, []);

    const loadYatras = async () => {
        try {
            setLoading(true);
            const data = await getYatras();
            setYatras(data);
            setError(null);
        } catch (err) {
            console.error('Error loading yatras:', err);
            setError('Failed to load yatras. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
                    <p className="text-gray-500 mt-4">Loading Tours...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500">{error}</p>
                    <button 
                        onClick={loadYatras}
                        className="mt-4 bg-yellow-400 px-6 py-2 rounded-lg"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-4">Our Yatra Tours</h1>
                <p className="text-gray-600 text-center mb-12">Explore our amazing tour packages</p>
                
                {yatras.length === 0 ? (
                    <p className="text-center text-gray-500">No tours available at the moment.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {yatras.map((yatra) => (
                            <div key={yatra.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{yatra.yatra_name}</h3>
                                    <p className="text-gray-600 text-sm mb-2">
                                        📅 {new Date(yatra.start_date).toLocaleDateString()} - {new Date(yatra.end_date).toLocaleDateString()}
                                    </p>
                                    <p className="text-2xl font-bold text-yellow-600 mb-4">₹{yatra.rate_per_seat}/seat</p>
                                    <a 
                                        href={`/booking?yatra=${yatra.id}`}
                                        className="block text-center bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition"
                                    >
                                        Book Now
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tours;
