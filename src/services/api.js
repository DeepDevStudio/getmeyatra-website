import axios from 'axios';

// CRM Backend API URL - Now using port 5000
const API_BASE = 'http://31.97.62.121:5000/api';

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
});

// ===== YATRA APIS =====
export const getYatras = async () => {
    try {
        const response = await api.get('/yatras');
        return response.data;
    } catch (error) {
        console.error('Error fetching yatras:', error);
        throw error;
    }
};

export const getYatra = async (id) => {
    try {
        const response = await api.get(`/yatras/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching yatra:', error);
        throw error;
    }
};

// ===== TRIP APIS =====
export const getTrips = async () => {
    try {
        const response = await api.get('/yatra-bookings/trips');
        return response.data;
    } catch (error) {
        console.error('Error fetching trips:', error);
        throw error;
    }
};

export const getTrip = async (id) => {
    try {
        const response = await api.get(`/yatra-bookings/trips/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching trip:', error);
        throw error;
    }
};

// ===== CUSTOMER APIS =====
export const checkCustomer = async (phone) => {
    try {
        const response = await api.get(`/customers/search/${phone}`);
        return response.data;
    } catch (error) {
        console.error('Error checking customer:', error);
        throw error;
    }
};

export const createCustomer = async (data) => {
    try {
        const response = await api.post('/customers', data);
        return response.data;
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
};

// ===== BOOKING APIS =====
export const createBooking = async (tripId, bookingData) => {
    try {
        const response = await api.post(`/yatra-bookings/trips/${tripId}/customers`, bookingData);
        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

export default api;
