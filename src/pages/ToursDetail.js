import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getYatras } from '../services/api';
import styled from 'styled-components';
import { colors, shadows, breakpoints } from '../styles/theme';

// ============================================
// TRANSLATION DICTIONARY
// ============================================

const translations = {
    'Back to Tours': 'यात्राओं पर वापस जाएँ',
    'Select a Date': 'तिथि चुनें',
    'Choose your preferred date and book your journey': 'अपनी पसंदीदा तिथि चुनें और अपनी यात्रा बुक करें',
    'trips available': 'यात्राएँ उपलब्ध',
    'per seat': 'प्रति सीट',
    'Multiple destinations': 'एकाधिक गंतव्य',
    'UPCOMING': 'आगामी',
    'ONGOING': 'जारी',
    'COMPLETED': 'समाप्त',
    'Loading tour details...': 'यात्रा विवरण लोड हो रहा है...',
    'Tour not found': 'यात्रा नहीं मिली',
    'Failed to load tours': 'यात्राएँ लोड करने में विफल',
    'No trips available for this tour.': 'इस यात्रा के लिए कोई यात्रा उपलब्ध नहीं है।',
    'Itinerary': 'यात्रा कार्यक्रम',
    'Inclusions': 'शामिल सेवाएँ',
    'Exclusions': 'शामिल नहीं',
    'Notes': 'महत्वपूर्ण सुझाव',
    'Book Now': 'अभी बुक करें',
    'WhatsApp Inquiry': 'व्हाट्सएप पूछताछ',
    'Share': 'साझा करें',
    'Destination': 'गंतव्य',
    'Duration': 'अवधि',
    'Price': 'कीमत',
    'Seats Available': 'उपलब्ध सीटें',
    'seats left': 'सीटें बाकी',
    'Start Time': 'प्रारंभ समय',
    'Return Time': 'वापसी समय',
    'Trip Type': 'यात्रा प्रकार',
    'Trip Count': 'यात्रा गणना',
    'Day 1': 'दिन 1',
    'Day 2': 'दिन 2',
    'Day 3': 'दिन 3',
    'Day 4': 'दिन 4',
    'Day 5': 'दिन 5',
    'Day 6': 'दिन 6',
    'Day 7': 'दिन 7',
    'Day 8': 'दिन 8',
    'Day 9': 'दिन 9',
    'Day 10': 'दिन 10',
    'Same Day': 'एक ही दिन',
    '2 Days': '2 दिन',
    '3 Days': '3 दिन',
    '4 Days': '4 दिन',
    '5 Days': '5 दिन',
    'Tour': 'यात्रा',
    'Camping': 'कैंपिंग',
    'Share on WhatsApp': 'व्हाट्सएप पर शेयर करें',
    'Copy Link': 'लिंक कॉपी करें',
    'Print': 'प्रिंट करें',
    'Home': 'होम',
    'Similar Tours': 'समान यात्राएँ',
    'View Gallery': 'गैलरी देखें',
    'Only': 'केवल',
    'seats remaining': 'सीटें बाकी',
    'per person': 'प्रति व्यक्ति',
    'Book Now': 'अभी बुक करें',
};

const translateText = (text, targetLang) => {
    if (!text) return text;
    if (targetLang === 'en') return text;
    return translations[text] || text;
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return '';
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`;
};

const formatTime = (time) => {
    if (!time) return '';
    const parts = time.split(':');
    const h = parseInt(parts[0]);
    const m = parts[1] || '00';
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${m} ${ampm}`;
};

const getTourStatus = (startDate, endDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    if (end < today) return { label: 'COMPLETED', type: 'completed' };
    if (start <= today && end >= today) return { label: 'ONGOING', type: 'ongoing' };
    return { label: 'UPCOMING', type: 'upcoming' };
};

const getTripType = (yatraName) => {
    if (!yatraName) return 'Tour';
    const name = yatraName.toLowerCase();
    if (name.includes('same day')) return 'Same Day';
    if (name.includes('1 day') || name.includes('one day')) return 'Same Day';
    if (name.includes('camping')) return 'Camping';
    if (name.includes('2 day') || name.includes('two day')) return '2 Days';
    if (name.includes('3 day') || name.includes('three day')) return '3 Days';
    if (name.includes('4 day') || name.includes('four day')) return '4 Days';
    if (name.includes('5 day') || name.includes('five day')) return '5 Days';
    return 'Tour';
};

// ============================================
// GET TOUR IMAGE - ADD THIS FUNCTION
// ============================================

const getTourImage = (yatra) => {
    // If tour has image URL, use it
    if (yatra && yatra.image_url) {
        return yatra.image_url;
    }
    
    // Otherwise use destination-based image
    const dest = yatra?.destination || 'Other';
    const imageMap = {
        'Vrindavan': '/images/tours/vrindavan.jpg',
        'Khatu Shyam': '/images/tours/khatu-shyam.jpg',
        'Haridwar': '/images/tours/haridwar.jpg',
        'Manali': '/images/tours/manali.jpg',
        'Other': '/images/tours/default.jpg',
    };
    return imageMap[dest] || '/images/tours/default.jpg';
};

// ============================================
// STYLED COMPONENTS
// ============================================

const PageContainer = styled.div`
    padding-top: 80px;
    padding-bottom: 80px;
    background: linear-gradient(135deg, #f5f7fa 0%, #e9edf5 100%);
    min-height: 100vh;
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
`;

// ============================================
// SCROLL PROGRESS BAR
// ============================================

const ScrollProgress = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: ${colors.primary.gradient};
    z-index: 9999;
    width: ${props => props.progress}%;
    transition: width 0.1s ease;
    box-shadow: 0 0 20px rgba(79, 70, 229, 0.3);
`;

// ============================================
// BREADCRUMBS
// ============================================

const Breadcrumbs = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: ${colors.neutral[500]};
    margin-bottom: 16px;
    flex-wrap: wrap;
    
    a {
        color: ${colors.primary.main};
        text-decoration: none;
        transition: all 0.3s ease;
        &:hover {
            text-decoration: underline;
        }
    }
    .separator {
        color: ${colors.neutral[300]};
    }
    .current {
        color: ${colors.neutral[700]};
        font-weight: 600;
    }
`;

// ============================================
// SHARE SECTION
// ============================================

const ShareSection = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin: 16px 0;
    padding: 12px 16px;
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.3);
    align-items: center;
    
    .share-label {
        font-size: 13px;
        font-weight: 600;
        color: ${colors.neutral[600]};
        margin-right: 4px;
    }
`;

const ShareBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 50px;
    border: none;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #fff;
    
    &.whatsapp { background: #25D366; }
    &.copy { background: ${colors.neutral[600]}; }
    &.print { background: ${colors.neutral[700]}; }
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
`;

// ============================================
// MAIN LAYOUT
// ============================================

const DetailLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 32px;
    
    @media (max-width: ${breakpoints.md}) {
        grid-template-columns: 1fr;
    }
`;

const MainContent = styled.div``;

// ============================================
// STICKY WIDGET
// ============================================

const StickyWidget = styled.div`
    position: sticky;
    top: 100px;
    align-self: start;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 24px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    
    @media (max-width: ${breakpoints.md}) {
        position: relative;
        top: 0;
        margin-top: 24px;
    }
    
    .widget-price {
        font-size: 2.2rem;
        font-weight: 800;
        color: ${colors.primary.main};
        span {
            font-size: 1rem;
            font-weight: 400;
            color: ${colors.neutral[500]};
        }
    }
    
    .widget-seats {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 8px 0 16px;
        padding: 8px 16px;
        background: ${colors.neutral[50]};
        border-radius: 10px;
        font-size: 14px;
        color: ${colors.neutral[700]};
        
        .urgent {
            color: #EF4444;
            font-weight: 700;
        }
        
        .safe {
            color: #22C55E;
            font-weight: 700;
        }
    }
    
    .widget-selector {
        margin: 12px 0 16px;
        select {
            width: 100%;
            padding: 10px 14px;
            border-radius: 10px;
            border: 2px solid ${colors.neutral[200]};
            font-size: 14px;
            background: #fff;
            color: ${colors.neutral[700]};
            cursor: pointer;
            outline: none;
            &:focus {
                border-color: ${colors.primary.main};
            }
        }
    }
    
    .widget-book-btn {
        width: 100%;
        padding: 14px;
        background: ${colors.primary.gradient};
        color: #fff;
        border: none;
        border-radius: 12px;
        font-weight: 700;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        text-align: center;
        display: block;
        box-shadow: 0 4px 20px rgba(79, 70, 229, 0.3);
        
        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 30px rgba(79, 70, 229, 0.4);
        }
    }
    
    .widget-whatsapp {
        width: 100%;
        padding: 12px;
        background: #25D366;
        color: #fff;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        font-size: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        text-align: center;
        display: block;
        margin-top: 10px;
        
        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
        }
    }
`;

// ============================================
// GLASSMORPHISM DETAILS CARD
// ============================================

const DetailsCard = styled.div`
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 24px;
    padding: 32px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
`;

// ============================================
// IMAGE GALLERY
// ============================================

const Gallery = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 8px;
    margin-bottom: 20px;
    border-radius: 16px;
    overflow: hidden;
    
    .main {
        grid-row: span 2;
        height: 320px;
        cursor: pointer;
        position: relative;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .view-gallery {
            position: absolute;
            bottom: 12px;
            right: 12px;
            background: rgba(0,0,0,0.7);
            backdrop-filter: blur(10px);
            color: #fff;
            padding: 6px 16px;
            border-radius: 50px;
            font-size: 12px;
            font-weight: 600;
        }
    }
    
    .thumb {
        height: 156px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.3s ease;
        }
        
        &:hover img {
            transform: scale(1.05);
        }
        
        &.active {
            border: 3px solid ${colors.primary.main};
        }
    }
    
    @media (max-width: ${breakpoints.md}) {
        .main { height: 220px; }
        .thumb { height: 110px; }
    }
    
    @media (max-width: 480px) {
        grid-template-columns: 1fr 1fr;
        .main { grid-row: span 1; height: 180px; }
        .thumb { height: 100px; }
    }
`;

const TourTitle = styled.h1`
    font-size: 2rem;
    font-weight: 800;
    color: ${colors.neutral[900]};
    margin-bottom: 4px;
`;

const Badge = styled.span`
    padding: 4px 14px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    background: ${props => props.bg || colors.primary.light};
    color: ${props => props.color || colors.primary.main};
`;

const StatusBadge = styled(Badge)`
    background: ${props => 
        props.status === 'upcoming' ? '#22C55E' :
        props.status === 'ongoing' ? '#F59E0B' : '#EF4444'
    };
    color: #fff;
`;

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
    margin-bottom: 16px;
`;

const InfoItem = styled.div`
    background: rgba(255,255,255,0.6);
    backdrop-filter: blur(10px);
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.2);
    .label {
        font-size: 11px;
        font-weight: 600;
        color: ${colors.neutral[500]};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    .value {
        font-size: 16px;
        font-weight: 700;
        color: ${colors.neutral[800]};
    }
`;

// ============================================
// TABS
// ============================================

const TabsWrapper = styled.div`
    margin-top: 24px;
`;

const TabHeaders = styled.div`
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    border-bottom: 2px solid ${colors.neutral[200]};
    margin-bottom: 16px;
    align-items: center;
`;

const TabBtn = styled.button`
    padding: 12px 24px;
    border: none;
    background: transparent;
    font-weight: 600;
    font-size: 15px;
    color: ${props => props.active ? colors.primary.main : colors.neutral[500]};
    cursor: pointer;
    transition: all 0.3s ease;
    border-bottom: 3px solid ${props => props.active ? colors.primary.main : 'transparent'};
    margin-bottom: -2px;
    &:hover {
        color: ${colors.primary.main};
    }
`;

const TabContent = styled.div`
    padding: 16px 0;
    min-height: 120px;
    color: ${colors.neutral[700]};
    font-size: 15px;
    line-height: 1.9;
`;

// ============================================
// DAY-BY-DAY ITINERARY
// ============================================

const DayCard = styled.div`
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 16px 18px;
    margin-bottom: 12px;
    border-left: 4px solid ${colors.primary.main};
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(255,255,255,0.2);
    
    &:hover {
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        transform: translateX(4px);
    }
    
    .day-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 700;
        font-size: 16px;
        color: ${colors.neutral[800]};
        
        .day-icon {
            font-size: 20px;
        }
        
        .day-toggle {
            font-size: 14px;
            color: ${colors.primary.main};
            transition: transform 0.3s ease;
            transform: ${props => props.expanded ? 'rotate(180deg)' : 'rotate(0)'};
        }
    }
    
    .day-content {
        margin-top: ${props => props.expanded ? '12px' : '0'};
        max-height: ${props => props.expanded ? '500px' : '0'};
        overflow: hidden;
        transition: all 0.4s ease;
        color: ${colors.neutral[600]};
        font-size: 14px;
        line-height: 1.8;
        padding-left: 4px;
        
        p {
            margin: 4px 0;
            padding-left: 8px;
            border-left: 2px solid ${colors.neutral[200]};
        }
        
        .highlight {
            color: ${colors.primary.main};
            font-weight: 600;
        }
    }
`;

// ============================================
// SIMILAR TOURS
// ============================================

const SimilarSection = styled.div`
    margin-top: 32px;
    padding-top: 24px;
    border-top: 2px solid ${colors.neutral[100]};
`;

const SimilarTitle = styled.h3`
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colors.neutral[800]};
    margin-bottom: 16px;
`;

const SimilarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
`;

const SimilarCard = styled(Link)`
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(10px);
    border-radius: 14px;
    padding: 16px;
    text-decoration: none;
    color: ${colors.neutral[900]};
    border: 1px solid rgba(255,255,255,0.2);
    transition: all 0.3s ease;
    text-align: center;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        border-color: ${colors.primary.main};
    }
    
    .sim-image {
        width: 100%;
        height: 120px;
        border-radius: 10px;
        overflow: hidden;
        background: ${colors.primary.gradient};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36px;
        color: #fff;
        opacity: 0.6;
        margin-bottom: 8px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    
    .sim-name {
        font-size: 13px;
        font-weight: 600;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    
    .sim-price {
        font-size: 16px;
        font-weight: 700;
        color: ${colors.primary.main};
        margin-top: 4px;
    }
`;

// ============================================
// LOADING & ERROR
// ============================================

const LoadingSpinner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    .spinner {
        width: 48px;
        height: 48px;
        border: 4px solid ${colors.neutral[200]};
        border-top-color: ${colors.primary.main};
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    p {
        margin-top: 16px;
        color: ${colors.neutral[500]};
    }
`;

const ErrorBox = styled.div`
    text-align: center;
    padding: 40px;
    h2 {
        color: ${colors.status.error};
        font-size: 1.3rem;
        margin-bottom: 8px;
    }
    p {
        color: ${colors.neutral[500]};
        margin-bottom: 16px;
    }
`;

const FloatingWhatsApp = styled.a`
    position: fixed;
    bottom: 120px;
    right: 24px;
    background: #25D366;
    color: #fff;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    text-decoration: none;
    box-shadow: 0 4px 25px rgba(37, 211, 102, 0.4);
    z-index: 99;
    transition: all 0.3s ease;
    &:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 35px rgba(37, 211, 102, 0.5);
    }
`;

const LanguageToggle = styled.button`
    padding: 6px 16px;
    border-radius: 50px;
    border: 2px solid ${colors.primary.main};
    background: ${props => props.lang === 'hi' ? colors.primary.gradient : 'transparent'};
    color: ${props => props.lang === 'hi' ? '#fff' : colors.primary.main};
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 16px;
    margin-left: auto;
    display: block;
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.2);
    }
`;

const BackButton = styled(Link)`
    display: inline-block;
    margin-bottom: 20px;
    color: ${colors.primary.main};
    text-decoration: none;
    font-weight: 600;
    &:hover {
        text-decoration: underline;
    }
`;

// ============================================
// COMPONENT
// ============================================

function ToursDetail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [allTrips, setAllTrips] = useState([]);
    const [similarTours, setSimilarTours] = useState([]);
    const [language, setLanguage] = useState('en');
    const [activeTab, setActiveTab] = useState('itinerary');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeImage, setActiveImage] = useState(0);
    const [expandedDays, setExpandedDays] = useState({});

    const t = (text) => translateText(text, language);

    useEffect(() => {
        loadData();
    }, [id]);

    // Scroll Progress
    useEffect(() => {
        const handleScrollProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScrollProgress);
        return () => window.removeEventListener('scroll', handleScrollProgress);
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await getYatras();
            
            const selectedYatra = data.find(y => y.id === parseInt(id));
            if (!selectedYatra) {
                setError('Tour not found');
                setLoading(false);
                return;
            }
            
            let baseName = selectedYatra.yatra_name;
            baseName = baseName.replace(/\s*-\s*\d{1,2}\s*[A-Za-z]{3}\s*\d{4}/g, '');
            baseName = baseName.replace(/\s*-\s*[A-Za-z]+\s*\d{1,2}\s*[A-Za-z]{3}\s*\d{4}/g, '');
            baseName = baseName.trim();
            
            const filtered = data.filter(y => {
                let yName = y.yatra_name;
                yName = yName.replace(/\s*-\s*\d{1,2}\s*[A-Za-z]{3}\s*\d{4}/g, '');
                yName = yName.replace(/\s*-\s*[A-Za-z]+\s*\d{1,2}\s*[A-Za-z]{3}\s*\d{4}/g, '');
                yName = yName.trim();
                return yName === baseName;
            });
            
            filtered.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
            
            setAllTrips(filtered);
            setSelectedTrip(selectedYatra);
            
            // Generate gallery images (using available images or placeholders)
            const galleryImages = [
                selectedYatra.image_url,
                ...data.filter(y => y.destination === selectedYatra.destination && y.id !== selectedYatra.id)
                    .slice(0, 4)
                    .map(y => y.image_url)
                    .filter(Boolean)
            ];
            
            // Similar tours
            const similar = data.filter(y => 
                y.destination === selectedYatra.destination && 
                y.id !== selectedYatra.id
            ).slice(0, 3);
            setSimilarTours(similar);
            
            setError(null);
        } catch (err) {
            console.error('Error loading data:', err);
            setError('Failed to load tours');
        } finally {
            setLoading(false);
        }
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    const handleDateChange = (e) => {
        const tripId = parseInt(e.target.value);
        const trip = allTrips.find(t => t.id === tripId);
        if (trip) {
            setSelectedTrip(trip);
        }
    };

    const handleShare = (platform) => {
        const url = window.location.href;
        const text = `Check out ${selectedTrip?.yatra_name} on GetMeYatra!`;
        
        if (platform === 'whatsapp') {
            window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        } else if (platform === 'copy') {
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard!');
            });
        } else if (platform === 'print') {
            window.print();
        }
    };

    const toggleDay = (index) => {
        setExpandedDays(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Parse itinerary into days
    const parseItinerary = (description) => {
        if (!description) return [];
        const lines = description.split('\n').filter(line => line.trim());
        const days = [];
        let currentDay = null;
        
        lines.forEach(line => {
            const trimmed = line.trim();
            const dayMatch = trimmed.match(/^📅 Day (\d+)/i) || trimmed.match(/^Day (\d+)/i);
            if (dayMatch) {
                if (currentDay) days.push(currentDay);
                currentDay = { day: parseInt(dayMatch[1]), title: trimmed, details: [] };
            } else if (currentDay && trimmed) {
                currentDay.details.push(trimmed);
            } else if (!currentDay && trimmed) {
                // If no day marker, treat as intro
                if (!days.length) {
                    days.push({ day: 0, title: 'Overview', details: [trimmed] });
                }
            }
        });
        if (currentDay) days.push(currentDay);
        return days;
    };

    if (loading) {
        return (
            <PageContainer>
                <ScrollProgress progress={0} />
                <Container>
                    <LoadingSpinner>
                        <div className="spinner"></div>
                        <p>{t('Loading tour details...')}</p>
                    </LoadingSpinner>
                </Container>
            </PageContainer>
        );
    }

    if (error || !selectedTrip) {
        return (
            <PageContainer>
                <ScrollProgress progress={0} />
                <Container>
                    <ErrorBox>
                        <h2>❌ {t(error || 'Tour not found')}</h2>
                        <Link to="/tours" style={{ color: colors.primary.main, fontWeight: 600, textDecoration: 'none' }}>
                            ← {t('Back to Tours')}
                        </Link>
                    </ErrorBox>
                </Container>
            </PageContainer>
        );
    }

    const seatsLeft = (selectedTrip.total_seats || 0) - (selectedTrip.booked_seats || 0);
    const statusInfo = getTourStatus(selectedTrip.start_date, selectedTrip.end_date);
    const isUrgent = seatsLeft < 10;

    // Gallery images
    const galleryImages = [
        selectedTrip.image_url || null,
        ...similarTours.map(y => y.image_url).filter(Boolean)
    ].filter(Boolean);

    // Parse itinerary
    const itineraryDays = parseItinerary(selectedTrip.description);

    const renderInclusions = () => {
        const items = ['AC Bus / Tempo Traveller Transport', 'Hotel Stay (as per package)', 'Meals as per itinerary', 'Sightseeing as per itinerary', 'Experienced Tour Coordinator', 'Mineral Water', 'All taxes included'];
        return items.map((item, index) => <p key={index}>✅ {t(item)}</p>);
    };

    const renderExclusions = () => {
        const items = ['Personal expenses', 'Adventure activities (if any)', 'Any meals not mentioned', 'Travel insurance'];
        return items.map((item, index) => <p key={index}>❌ {t(item)}</p>);
    };

    const renderNotes = () => {
        const items = ['Carry warm clothes (if needed)', 'Carry ID proof (Aadhar/Driving License)', 'Carry medication if needed', 'Follow group timings', 'Respect local customs and traditions'];
        return items.map((item, index) => <p key={index}>📝 {t(item)}</p>);
    };

    return (
        <PageContainer>
            <ScrollProgress progress={scrollProgress} />
            <Container>
                <LanguageToggle lang={language} onClick={toggleLanguage}>
                    {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
                </LanguageToggle>

                {/* Breadcrumbs */}
                <Breadcrumbs>
                    <Link to="/">{t('Home')}</Link>
                    <span className="separator">&gt;</span>
                    <Link to="/tours">Tours</Link>
                    <span className="separator">&gt;</span>
                    <span className="current">{selectedTrip.yatra_name}</span>
                </Breadcrumbs>

                <BackButton to="/tours">← {t('Back to Tours')}</BackButton>

                <DetailLayout>
                    {/* Main Content */}
                    <MainContent>
                        <DetailsCard>
                            {/* Image Gallery */}
                            <Gallery>
                                <div className="main" onClick={() => alert('Full gallery view coming soon!')}>
                                    <img 
                                        src={getTourImage(selectedTrip)}
                                        alt={selectedTrip.yatra_name}
                                        onError={(e) => {
                                            e.target.src = '/images/tours/default.jpg';
                                        }}
                                    />
                                    <span className="view-gallery">📸 View Gallery</span>
                                </div>
                                {galleryImages.slice(1, 5).map((img, index) => (
                                    <div 
                                        key={index} 
                                        className={`thumb ${activeImage === index + 1 ? 'active' : ''}`}
                                        onClick={() => setActiveImage(index + 1)}
                                    >
                                        <img 
                                            src={getTourImage({ image_url: img, destination: selectedTrip.destination })}
                                            alt={`Gallery ${index + 2}`}
                                            onError={(e) => {
                                                e.target.src = '/images/tours/default.jpg';
                                            }}
                                        />
                                    </div>
                                ))}
                            </Gallery>

                            {/* Title & Meta */}
                            <TourTitle>{t(selectedTrip.yatra_name)}</TourTitle>
                            
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                                <Badge>{t(getTripType(selectedTrip.yatra_name))}</Badge>
                                <StatusBadge status={statusInfo.type}>
                                    {t(statusInfo.label)}
                                </StatusBadge>
                                <Badge bg="#E0E7FF" color="#4338CA">
                                    📅 {formatDateRange(selectedTrip.start_date, selectedTrip.end_date)}
                                </Badge>
                            </div>

                            {/* Share Section */}
                            <ShareSection>
                                <span className="share-label">📤 {t('Share')}:</span>
                                <ShareBtn className="whatsapp" onClick={() => handleShare('whatsapp')}>
                                    💬 {t('Share on WhatsApp')}
                                </ShareBtn>
                                <ShareBtn className="copy" onClick={() => handleShare('copy')}>
                                    📋 {t('Copy Link')}
                                </ShareBtn>
                                <ShareBtn className="print" onClick={() => handleShare('print')}>
                                    🖨️ {t('Print')}
                                </ShareBtn>
                            </ShareSection>

                            {/* Info Grid */}
                            <InfoGrid>
                                <InfoItem>
                                    <div className="label">{t('Destination')}</div>
                                    <div className="value">{selectedTrip.destination || 'N/A'}</div>
                                </InfoItem>
                                <InfoItem>
                                    <div className="label">{t('Price')}</div>
                                    <div className="value">₹{selectedTrip.rate_per_seat}</div>
                                </InfoItem>
                                <InfoItem>
                                    <div className="label">{t('Duration')}</div>
                                    <div className="value">{selectedTrip.durationDays} {t('Days')}</div>
                                </InfoItem>
                                {selectedTrip.start_time && (
                                    <InfoItem>
                                        <div className="label">{t('Start Time')}</div>
                                        <div className="value">{formatTime(selectedTrip.start_time)}</div>
                                    </InfoItem>
                                )}
                                {selectedTrip.return_time && (
                                    <InfoItem>
                                        <div className="label">{t('Return Time')}</div>
                                        <div className="value">{selectedTrip.return_time}</div>
                                    </InfoItem>
                                )}
                            </InfoGrid>

                            {/* Tabs */}
                            <TabsWrapper>
                                <TabHeaders>
                                    <TabBtn active={activeTab === 'itinerary'} onClick={() => setActiveTab('itinerary')}>
                                        📅 {t('Itinerary')}
                                    </TabBtn>
                                    <TabBtn active={activeTab === 'inclusions'} onClick={() => setActiveTab('inclusions')}>
                                        ✅ {t('Inclusions')}
                                    </TabBtn>
                                    <TabBtn active={activeTab === 'exclusions'} onClick={() => setActiveTab('exclusions')}>
                                        ❌ {t('Exclusions')}
                                    </TabBtn>
                                    <TabBtn active={activeTab === 'notes'} onClick={() => setActiveTab('notes')}>
                                        📝 {t('Notes')}
                                    </TabBtn>
                                </TabHeaders>

                                <TabContent>
                                    {activeTab === 'itinerary' && (
                                        <div>
                                            {itineraryDays.length > 0 ? (
                                                itineraryDays.map((day, index) => (
                                                    <DayCard 
                                                        key={index} 
                                                        expanded={expandedDays[index]}
                                                        onClick={() => toggleDay(index)}
                                                    >
                                                        <div className="day-header">
                                                            <span>
                                                                <span className="day-icon">📌</span>
                                                                {day.day > 0 ? `Day ${day.day}: ${day.title.replace(/^📅 Day \d+:\s*/, '')}` : day.title}
                                                            </span>
                                                            <span className="day-toggle">{expandedDays[index] ? '▲' : '▼'}</span>
                                                        </div>
                                                        <div className="day-content">
                                                            {day.details.map((detail, i) => {
                                                                const isHighlight = detail.includes('★') || detail.includes('✨');
                                                                return (
                                                                    <p key={i} className={isHighlight ? 'highlight' : ''}>
                                                                        {detail.replace(/^[•\s]+/, '')}
                                                                    </p>
                                                                );
                                                            })}
                                                        </div>
                                                    </DayCard>
                                                ))
                                            ) : (
                                                <p>{t('No itinerary available')}</p>
                                            )}
                                        </div>
                                    )}
                                    {activeTab === 'inclusions' && <div>{renderInclusions()}</div>}
                                    {activeTab === 'exclusions' && <div>{renderExclusions()}</div>}
                                    {activeTab === 'notes' && <div>{renderNotes()}</div>}
                                </TabContent>
                            </TabsWrapper>

                            {/* Similar Tours */}
                            {similarTours.length > 0 && (
                                <SimilarSection>
                                    <SimilarTitle>🔄 {t('Similar Tours')}</SimilarTitle>
                                    <SimilarGrid>
                                        {similarTours.map(tour => (
                                            <SimilarCard key={tour.id} to={`/tours/${tour.id}`}>
                                                <div className="sim-image">
                                                    <img 
                                                        src={getTourImage(tour)}
                                                        alt={tour.yatra_name}
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            const parent = e.target.parentElement;
                                                            if (parent) {
                                                                parent.textContent = '🏔️';
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div className="sim-name">{tour.yatra_name}</div>
                                                <div className="sim-price">₹{tour.rate_per_seat}</div>
                                            </SimilarCard>
                                        ))}
                                    </SimilarGrid>
                                </SimilarSection>
                            )}
                        </DetailsCard>
                    </MainContent>

                    {/* Sticky Booking Widget */}
                    <StickyWidget>
                        <div className="widget-price">
                            ₹{selectedTrip.rate_per_seat} <span>/{t('per person')}</span>
                        </div>
                        
                        <div className="widget-seats">
                            🪑 
                            <span className={isUrgent ? 'urgent' : 'safe'}>
                                {seatsLeft} {t('seats left')}
                            </span>
                            {isUrgent && <span style={{ fontSize: '12px', color: '#EF4444' }}>⚡ Hurry!</span>}
                        </div>

                        {allTrips.length > 1 && (
                            <div className="widget-selector">
                                <select 
                                    value={selectedTrip.id}
                                    onChange={handleDateChange}
                                >
                                    {allTrips.map(trip => (
                                        <option key={trip.id} value={trip.id}>
                                            {formatDateRange(trip.start_date, trip.end_date)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <Link to={`/booking?yatra=${selectedTrip.id}`} className="widget-book-btn">
                            📋 {t('Book Now')} → ₹{selectedTrip.rate_per_seat}
                        </Link>

                        <a 
                            href={`https://wa.me/918010320000?text=Hi%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(selectedTrip.yatra_name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="widget-whatsapp"
                        >
                            💬 {t('WhatsApp Inquiry')}
                        </a>
                    </StickyWidget>
                </DetailLayout>
            </Container>

            <FloatingWhatsApp 
                href={`https://wa.me/918010320000?text=Hi%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(selectedTrip.yatra_name)}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                💬
            </FloatingWhatsApp>
        </PageContainer>
    );
}

export default ToursDetail;
