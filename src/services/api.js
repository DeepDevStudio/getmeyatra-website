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
// HOME SETTINGS APIS (NEW)
// ============================================

export const getHomeSettings = async () => {
    try {
        const response = await api.get('/home-settings');
        return response.data;
    } catch (error) {
        console.error('Error fetching home settings:', error);
        // Return default values if API fails
        return {
            hero_title: 'Discover the <span class="gradient-text">Spiritual & Scenic</span> Beauty of India',
            hero_subtitle: 'Journey to sacred temples, serene hill stations, and breathtaking landscapes with comfortable travel, expert guides, and unforgettable experiences.',
            hero_badge: 'Explore India with GetMeYatra',
            show_buttons: true,
            stats_travelers: '5000+',
            stats_destinations: '50+',
            stats_rating: '4.9',
            stats_label_travelers: 'Happy Travelers',
            stats_label_destinations: 'Destinations',
            stats_label_rating: 'Average Rating',
            slider_images: [],
            logo_url: '',
            whatsapp_number: '919312113322',
        };
    }
};

// ============================================
// EXPORT DEFAULT
// ============================================

export default api;
