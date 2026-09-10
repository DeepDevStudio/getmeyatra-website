import api from './api';

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
