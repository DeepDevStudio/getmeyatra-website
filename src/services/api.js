import axios from 'axios';

// ============================================
// API CONFIGURATION
// ============================================

// Use relative path - Nginx will proxy /api to the backend
const API_BASE = '/api';

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
});

// ============================================
// YATRA APIS
// ============================================

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

// ============================================
// TRIP APIS
// ============================================

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

// ============================================
// CUSTOMER APIS
// ============================================

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

// ============================================
// BOOKING APIS
// ============================================

export const createBooking = async (tripId, bookingData) => {
    try {
        const response = await api.post(`/yatra-bookings/trips/${tripId}/customers`, bookingData);
        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

// ============================================
// CUSTOMER AUTH APIS
// ============================================

export const registerCustomer = async (data) => {
    try {
        const response = await api.post('/customers', data);
        return response.data;
    } catch (error) {
        console.error('Error registering customer:', error);
        throw error;
    }
};

export const loginCustomer = async (phone) => {
    try {
        const response = await api.get(`/customers/search/${phone}`);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const getCustomerBookings = async (phone) => {
    try {
        const response = await api.get(`/yatra-bookings/customer/${phone}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching customer bookings:', error);
        throw error;
    }
};

export const updateCustomerProfile = async (id, data) => {
    try {
        const response = await api.put(`/customers/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating customer:', error);
        throw error;
    }
};

// ============================================
// SINGLE BOOKING APIS (NEW)
// ============================================

export const getBookingById = async (id) => {
    try {
        const response = await api.get(`/yatra-bookings/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching booking:', error);
        throw error;
    }
};

export const cancelBooking = async (id) => {
    try {
        const response = await api.put(`/yatra-bookings/${id}/cancel`);
        return response.data;
    } catch (error) {
        console.error('Error cancelling booking:', error);
        throw error;
    }
};

// ============================================
// DESTINATION IMAGE APIS (NEW)
// ============================================

export const getDestinationImage = async (destination) => {
    try {
        const response = await api.get(`/yatra-details/destination-image/${encodeURIComponent(destination)}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching destination image:', error);
        return null;
    }
};

// ============================================
// EXPORT DEFAULT
// ============================================

export default api;
