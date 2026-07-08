import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getYatra, getTrips, createBooking, checkCustomer, createCustomer } from '../services/api';

function Booking() {
    const location = useLocation();
    const navigate = useNavigate();
    const [yatra, setYatra] = useState(null);
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        customer_name: '',
        phone: '',
        total_seats: 1,
        advance_amount: 0,
        remarks: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams(location.search);
            const yatraId = params.get('yatra');
            
            if (yatraId) {
                const yatraData = await getYatra(yatraId);
                setYatra(yatraData);
            }
            
            const tripsData = await getTrips();
            setTrips(tripsData);
        } catch (err) {
            console.error('Error loading data:', err);
            setError('Failed to load booking data');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            // Check if customer exists
            const customerCheck = await checkCustomer(formData.phone);
            let customerId = null;

            if (!customerCheck.exists) {
                // Create new customer
                const newCustomer = await createCustomer({
                    customer_name: formData.customer_name,
                    mobile_number: formData.phone,
                    interests: yatra?.yatra_name || '',
                    location_type: 'Delhi NCR',
                    group_type: 'Daily Reach'
                });
                customerId = newCustomer.id;
            } else {
                customerId = customerCheck.customer.id;
            }

            // Create booking
            const bookingData = {
                customer_id: customerId,
                customer_name: formData.customer_name,
                phone: formData.phone,
                total_seats: parseInt(formData.total_seats),
                selected_seats: [],
                base_amount: yatra?.rate_per_seat || 0,
                total_amount: parseInt(formData.total_seats) * (yatra?.rate_per_seat || 0),
                advance_amount: parseFloat(formData.advance_amount) || 0,
                balance_amount: parseInt(formData.total_seats) * (yatra?.rate_per_seat || 0) - (parseFloat(formData.advance_amount) || 0),
                remarks: formData.remarks,
                travelers: []
            };

            await createBooking(selectedTrip, bookingData);
            setSuccess(true);
            setTimeout(() => navigate('/'), 3000);

        } catch (err) {
            console.error('Booking error:', err);
            setError(err.response?.data?.error || 'Failed to create booking. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
                    <p className="text-gray-500 mt-4">Loading...</p>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-50">
                <div className="text-center p-8">
                    <div className="text-6xl mb-4">✅</div>
                    <h2 className="text-2xl font-bold text-green-700">Booking Confirmed!</h2>
                    <p className="text-gray-600 mt-2">Your booking has been created successfully.</p>
                    <p className="text-gray-500 mt-4">Redirecting to home...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">Book Your Yatra</h1>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Trip *</label>
                                <select
                                    required
                                    value={selectedTrip}
                                    onChange={(e) => setSelectedTrip(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
                                >
                                    <option value="">Select a trip</option>
                                    {trips.map((trip) => (
                                        <option key={trip.id} value={trip.id}>
                                            {trip.trip_name} - {new Date(trip.start_date).toLocaleDateString()} ({trip.booked_seats || 0}/{trip.total_seats} seats)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    name="customer_name"
                                    required
                                    value={formData.customer_name}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
                                    placeholder="Enter 10-digit phone number"
                                    maxLength="10"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Seats *</label>
                                <input
                                    type="number"
                                    name="total_seats"
                                    required
                                    min="1"
                                    value={formData.total_seats}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Advance Amount (₹)</label>
                                <input
                                    type="number"
                                    name="advance_amount"
                                    value={formData.advance_amount}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
                                    placeholder="Optional"
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                                <textarea
                                    name="remarks"
                                    value={formData.remarks}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400"
                                    placeholder="Any special requests..."
                                />
                            </div>

                            {yatra && (
                                <div className="bg-yellow-50 rounded-lg p-4">
                                    <p className="text-sm font-medium text-gray-700">Yatra: {yatra.yatra_name}</p>
                                    <p className="text-sm text-gray-600">Rate: ₹{yatra.rate_per_seat}/seat</p>
                                    <p className="text-sm text-gray-600">Total: ₹{parseInt(formData.total_seats) * yatra.rate_per_seat}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition disabled:opacity-50"
                            >
                                {submitting ? 'Booking...' : 'Confirm Booking'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Booking;
