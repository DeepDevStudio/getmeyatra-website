import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getYatras, getDestinationImage } from '../services/api';
import styled from 'styled-components';
import { colors, shadows, breakpoints } from '../styles/theme';

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

// ============================================
// TRANSLATION DICTIONARY
// ============================================

const translations = {
    'Day': 'दिन',
    'Days': 'दिन',
    'Morning': 'सुबह',
    'Evening': 'शाम',
    'Night': 'रात',
    'Afternoon': 'दोपहर',
    'AM': 'पूर्वाह्न',
    'PM': 'अपराह्न',
    'Arrival': 'आगमन',
    'Departure': 'प्रस्थान',
    'Pickup': 'पिकअप',
    'Drop': 'ड्रॉप',
    'Journey': 'यात्रा',
    'Return': 'वापसी',
    'Transfer': 'स्थानांतरण',
    'Sightseeing': 'दर्शनीय स्थल',
    'Shopping': 'खरीदारी',
    'Trip': 'यात्रा',
    'Tour': 'यात्रा',
    'Travel': 'यात्रा',
    'Visit': 'भ्रमण',
    'Explore': 'अन्वेषण',
    'Temple': 'मंदिर',
    'Darshan': 'दर्शन',
    'Pilgrimage': 'तीर्थयात्रा',
    'Spiritual': 'आध्यात्मिक',
    'Blessings': 'आशीर्वाद',
    'Prayer': 'प्रार्थना',
    'Aarti': 'आरती',
    'Ashram': 'आश्रम',
    'Ghat': 'घाट',
    'Holy': 'पवित्र',
    'Divine': 'दिव्य',
    'Breakfast': 'नाश्ता',
    'Lunch': 'दोपहर का भोजन',
    'Dinner': 'रात का भोजन',
    'Snacks': 'नाश्ता',
    'Tea': 'चाय',
    'Water': 'पानी',
    'Hotel': 'होटल',
    'Check-in': 'चेक-इन',
    'Check-out': 'चेक-आउट',
    'Room': 'कमरा',
    'Stay': 'प्रवास',
    'Overnight': 'रात्रि प्रवास',
    'Bus': 'बस',
    'Car': 'कार',
    'Cab': 'कैब',
    'Driver': 'ड्राइवर',
    'AC': 'एसी',
    'Seat': 'सीट',
    'Seats': 'सीटें',
    'Guide': 'गाइड',
    'Group': 'समूह',
    'Family': 'परिवार',
    'Solo': 'एकल',
    'Booking': 'बुकिंग',
    'Payment': 'भुगतान',
    'Cash': 'नकद',
    'Online': 'ऑनलाइन',
    'Package': 'पैकेज',
    'Price': 'कीमत',
    'Cost': 'लागत',
    'Total': 'कुल',
    'Advance': 'अग्रिम',
    'Balance': 'शेष',
    'Discount': 'छूट',
    'Inclusions': 'शामिल सेवाएँ',
    'Exclusions': 'शामिल नहीं',
    'Notes': 'सुझाव',
    'Itinerary': 'यात्रा कार्यक्रम',
    'Important Notes': 'महत्वपूर्ण सुझाव',
    "What's Included": 'शामिल सेवाएँ',
    "What's Not Included": 'शामिल नहीं',
    'No itinerary available': 'कोई यात्रा कार्यक्रम उपलब्ध नहीं है',
    'No highlights available': 'कोई विशेषताएँ उपलब्ध नहीं हैं',
    'Select Date': 'तिथि चुनें',
    'Book Now': 'अभी बुक करें',
    'WhatsApp Inquiry': 'व्हाट्सएप पूछताछ',
    'Share': 'साझा करें',
    'All Status': 'सभी स्थिति',
    'Upcoming': 'आगामी',
    'Ongoing': 'जारी',
    'Completed': 'समाप्त',
    'trips': 'यात्राएँ',
    'Trip Type': 'यात्रा प्रकार',
    'Duration': 'अवधि',
    'Trip Count': 'यात्रा गणना',
    'tour found': 'यात्रा मिली',
    'tours found': 'यात्राएँ मिलीं',
    'No trips available': 'कोई यात्रा उपलब्ध नहीं है',
    'Select a Destination': 'एक गंतव्य चुनें',
    'All Destinations': 'सभी गंतव्य',
    'All Tours': 'सभी यात्राएँ',
    'of': 'में से',
    'seat': 'सीट',
    'View Details': 'विवरण देखें',
    'Available Tours in': 'में उपलब्ध यात्राएँ',
    'Similar Tours You Might Like': 'समान यात्राएँ जो आपको पसंद आ सकती हैं',
    'Loading amazing tours for you...': 'आपके लिए अद्भुत यात्राएँ लोड हो रही हैं...',
    'Search tours...': 'यात्राएँ खोजें...',
    'Clear Filters': 'फ़िल्टर साफ़ करें',
    'Min ₹': 'न्यूनतम ₹',
    'Max ₹': 'अधिकतम ₹',
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
    'AC Tempo Traveller': 'एसी टेम्पो ट्रैवलर',
    'AC Bus': 'एसी बस',
    'Bus Transport': 'बस परिवहन',
    'Hotel Stay': 'होटल प्रवास',
    'Meals: Breakfast': 'भोजन: नाश्ता',
    'Meals: Dinner': 'भोजन: रात का खाना',
    'Experienced Tour Coordinator': 'अनुभवी टूर कोऑर्डिनेटर',
    'All taxes included': 'सभी कर शामिल',
    'Personal expenses': 'व्यक्तिगत खर्च',
    'Adventure activities': 'साहसिक गतिविधियाँ',
    'Paragliding': 'पैराग्लाइडिंग',
    'Zorbing': 'ज़ॉर्बिंग',
    'Travel insurance': 'यात्रा बीमा',
    'Any meals not mentioned': 'कोई भी भोजन उल्लेख नहीं किया गया',
    'Carry warm clothes': 'गर्म कपड़े ले जाएं',
    'Carry ID proof': 'आईडी प्रूफ ले जाएं',
    'Aadhar': 'आधार',
    'Driving License': 'ड्राइविंग लाइसेंस',
    'Carry medication if needed': 'यदि आवश्यक हो तो दवा ले जाएं',
    'Follow group timings': 'समूह समय का पालन करें',
    'Respect local customs and traditions': 'स्थानीय रीति-रिवाजों और परंपराओं का सम्मान करें',
    'Holy Dip': 'पवित्र स्नान',
    'Ganga Aarti': 'गंगा आरती',
    'Bonfire': 'बोनफायर',
    'DJ Music': 'डीजे म्यूज़िक',
    'Rafting': 'राफ्टिंग',
    'Trekking': 'ट्रेकिंग',
    'Swimming': 'तैराकी',
    'Games': 'खेल',
    'Start Time': 'प्रारंभ समय',
    'Return Time': 'वापसी समय',
    'Seats Available': 'उपलब्ध सीटें',
    'seats left': 'सीटें बाकी',
    'Featured': 'विशेष',
    'Show More Tours': 'और यात्राएँ दिखाएँ',
    'left': 'बाकी',
    'Tours Available': 'यात्राएँ उपलब्ध',
    'Destinations': 'गंतव्य',
    'Happy Travelers': 'खुश यात्री',
    'Average Rating': 'औसत रेटिंग',
};

const translateText = (text, targetLang) => {
    if (!text) return text;
    if (targetLang === 'en') return text;
    
    let result = text;
    const sortedKeys = Object.keys(translations).sort((a, b) => b.length - a.length);
    
    for (const key of sortedKeys) {
        const pattern = new RegExp(`\\b${key}\\b`, 'gi');
        result = result.replace(pattern, translations[key]);
    }
    
    return result;
};

// ============================================
// EXTRACT DESTINATION FROM TOUR NAME
// ============================================
const extractDestination = (yatraName) => {
    if (!yatraName) return 'Other';
    const name = yatraName.toLowerCase();
    if (name.includes('vrindavan') || name.includes('barsana') || name.includes('bhandirvan') || name.includes('bansivat')) return 'Vrindavan';
    if (name.includes('khatu') || name.includes('salasar') || name.includes('rani sati')) return 'Khatu Shyam';
    if (name.includes('haridwar') || name.includes('rishikesh')) return 'Haridwar';
    if (name.includes('manali') || name.includes('sissu') || name.includes('kasol') || name.includes('manikaran')) return 'Manali';
    return 'Other';
};

// ============================================
// GET TRIP TYPE FROM TOUR NAME
// ============================================
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
// GET TOUR STATUS
// ============================================
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

// ============================================
// SUB-DESTINATION DATA
// ============================================

const getSubDestinations = (destination) => {
    const subDestMap = {
        'Vrindavan': [
            { name: 'Same Day Vrindavan Darshan', icon: '🛕', price: '1,700', days: '1 Day' },
            { name: '2 Days Barsana Vrindavan Yatra', icon: '🌸', price: '1,700', days: '2 Days' },
        ],
        'Khatu Shyam': [
            { name: 'Same Day Khatu Shyam Darshan', icon: '🙏', price: '1,700', days: '1 Day' },
            { name: '2 Days Khatu Shyam • Salasar Yatra', icon: '🚩', price: '1,700', days: '2 Days' },
        ],
        'Haridwar': [
            { name: 'Same Day Haridwar Rishikesh Yatra', icon: '🌊', price: '1,000', days: '1 Day' },
        ],
        'Manali': [
            { name: 'Manali • Sissu • Kasol • Manikaran Tour', icon: '🏔️', price: '4,500', days: '5 Days' },
        ],
    };
    return subDestMap[destination] || null;
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
// HERO STATS
// ============================================

const HeroStats = styled.div`
    display: flex;
    justify-content: center;
    gap: 24px;
    margin: 20px 0 30px;
    flex-wrap: wrap;
    
    .stat {
        text-align: center;
        background: rgba(255,255,255,0.9);
        backdrop-filter: blur(10px);
        padding: 16px 28px;
        border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.3);
        min-width: 110px;
        transition: all 0.3s ease;
        flex: 1;
        max-width: 160px;
        
        &:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        }
        
        .number {
            font-size: 2rem;
            font-weight: 800;
            color: ${colors.primary.main};
        }
        .label {
            font-size: 12px;
            color: ${colors.neutral[600]};
            font-weight: 500;
        }
        .icon {
            font-size: 22px;
            display: block;
            margin-bottom: 2px;
        }
    }
    
    @media (max-width: ${breakpoints.md}) {
        gap: 12px;
        .stat {
            padding: 12px 16px;
            min-width: 80px;
            max-width: 120px;
            .number { font-size: 1.5rem; }
            .label { font-size: 10px; }
            .icon { font-size: 18px; }
        }
    }
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
// TRUST BADGES
// ============================================

const TrustBadges = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    margin: 10px 0 20px;
    padding: 14px 20px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.3);
`;

const TrustBadge = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: ${colors.neutral[600]};
    .icon {
        font-size: 18px;
    }
`;

// ============================================
// PAGE HEADER
// ============================================

const PageHeader = styled.div`
    text-align: center;
    margin-bottom: 20px;
    h1 {
        font-size: 2.6rem;
        font-weight: 800;
        color: ${colors.neutral[900]};
        margin-bottom: 6px;
        letter-spacing: -0.5px;
        .gradient-text {
            background: ${colors.primary.gradient};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    }
    p {
        color: ${colors.neutral[600]};
        font-size: 1.05rem;
        margin-bottom: 10px;
    }
    .badge-count {
        display: inline-block;
        background: linear-gradient(135deg, ${colors.primary.main}, ${colors.primary.dark});
        color: #fff;
        padding: 4px 18px;
        border-radius: 50px;
        font-size: 13px;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
    }
`;

// ============================================
// FILTER BAR
// ============================================

const FilterBar = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
    padding: 16px 20px;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    align-items: center;
    justify-content: space-between;
    border: 1px solid rgba(255,255,255,0.3);
`;

const FilterGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
`;

const FilterInput = styled.input`
    padding: 9px 14px;
    border: 2px solid ${colors.neutral[200]};
    border-radius: 12px;
    font-size: 13px;
    outline: none;
    transition: all 0.3s ease;
    min-width: 120px;
    background: #fff;
    &:focus {
        border-color: ${colors.primary.main};
        box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
    }
`;

const StatusDropdown = styled.select`
    padding: 9px 18px;
    border-radius: 12px;
    border: 2px solid ${colors.primary.main};
    font-size: 13px;
    font-weight: 600;
    background: #fff;
    color: ${colors.neutral[700]};
    cursor: pointer;
    outline: none;
    transition: all 0.3s ease;
    display: ${props => props.visible ? 'inline-block' : 'none'};
    &:focus {
        box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
    }
`;

const ClearBtn = styled.button`
    padding: 9px 18px;
    background: transparent;
    border: 2px solid ${colors.neutral[200]};
    border-radius: 12px;
    color: ${colors.neutral[600]};
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.3s ease;
    &:hover {
        background: ${colors.neutral[100]};
        border-color: ${colors.neutral[300]};
        transform: translateY(-2px);
    }
`;

const FilterToggleBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 9px 18px;
    background: ${colors.primary.gradient};
    color: #fff;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
    }
`;

// ============================================
// FILTER DRAWER
// ============================================

const FilterOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    z-index: 999;
    display: ${props => props.isOpen ? 'block' : 'none'};
`;

const FilterDrawer = styled.div`
    position: fixed;
    right: ${props => props.isOpen ? '0' : '-380px'};
    top: 0;
    width: 360px;
    height: 100vh;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    box-shadow: -4px 0 30px rgba(0,0,0,0.1);
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    padding: 32px 24px;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${colors.primary.main};
        border-radius: 10px;
    }
`;

const FilterDrawerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid ${colors.neutral[100]};
    h2 {
        font-size: 1.3rem;
        font-weight: 700;
        color: ${colors.neutral[900]};
    }
    .close-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        background: ${colors.neutral[100]};
        cursor: pointer;
        font-size: 18px;
        transition: all 0.3s ease;
        &:hover {
            background: ${colors.status.error};
            color: #fff;
        }
    }
`;

const FilterSection = styled.div`
    margin-bottom: 24px;
    .filter-label {
        font-weight: 600;
        font-size: 14px;
        color: ${colors.neutral[700]};
        margin-bottom: 8px;
        display: block;
    }
`;

const FilterChipGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const FilterChip = styled.button`
    padding: 8px 16px;
    border-radius: 50px;
    border: 2px solid ${props => props.active ? colors.primary.main : colors.neutral[200]};
    background: ${props => props.active ? colors.primary.gradient : 'transparent'};
    color: ${props => props.active ? '#fff' : colors.neutral[600]};
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        transform: translateY(-2px);
        box-shadow: ${props => props.active ? '0 4px 15px rgba(79, 70, 229, 0.3)' : '0 2px 8px rgba(0,0,0,0.05)'};
    }
`;

const ApplyFiltersBtn = styled.button`
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
    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
    }
`;

// ============================================
// DESTINATION NAVIGATION
// ============================================

const DestinationNav = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 24px;
    padding: 14px 20px;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255,255,255,0.3);
`;

const NavBtn = styled.button`
    padding: 8px 18px;
    border-radius: 50px;
    border: 2px solid ${props => props.active ? colors.primary.main : colors.neutral[200]};
    background: ${props => props.active ? colors.primary.gradient : 'transparent'};
    color: ${props => props.active ? '#fff' : colors.neutral[600]};
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    &:hover {
        transform: translateY(-2px);
        box-shadow: ${props => props.active ? '0 4px 15px rgba(79, 70, 229, 0.3)' : '0 2px 8px rgba(0,0,0,0.05)'};
        border-color: ${props => props.active ? colors.primary.main : colors.primary.main};
    }
    .count {
        background: ${props => props.active ? 'rgba(255,255,255,0.2)' : colors.neutral[200]};
        color: ${props => props.active ? '#fff' : colors.neutral[500]};
        padding: 1px 8px;
        border-radius: 20px;
        font-size: 10px;
        margin-left: 4px;
    }
    .icon {
        margin-right: 4px;
    }
`;

// ============================================
// GLASSMORPHISM TOUR CARD
// ============================================

const TourCardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    margin: 24px 0;
`;

const TourCard = styled.div`
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;

    &:hover {
        transform: translateY(-8px) scale(1.01);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        border-color: ${colors.primary.main};
    }

    .card-image {
        width: 100%;
        height: 200px;
        background: ${colors.primary.gradient};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48px;
        color: #fff;
        opacity: 0.7;
        position: relative;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .featured-badge {
            position: absolute;
            top: 12px;
            right: 12px;
            background: #F59E0B;
            color: #fff;
            padding: 4px 14px;
            border-radius: 50px;
            font-size: 11px;
            font-weight: 700;
            box-shadow: 0 2px 10px rgba(245, 158, 11, 0.4);
        }

        .duration-badge {
            position: absolute;
            bottom: 12px;
            left: 12px;
            background: rgba(0,0,0,0.7);
            backdrop-filter: blur(10px);
            color: #fff;
            padding: 4px 14px;
            border-radius: 50px;
            font-size: 12px;
            font-weight: 500;
        }

        .status-badge-card {
            position: absolute;
            bottom: 12px;
            right: 12px;
            padding: 4px 14px;
            border-radius: 50px;
            font-size: 11px;
            font-weight: 600;
            color: #fff;
            &.upcoming { background: #22C55E; }
            &.ongoing { background: #F59E0B; }
            &.completed { background: #EF4444; }
        }
    }

    .card-body {
        padding: 18px 20px 20px;
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(10px);

        .card-title {
            font-size: 1.05rem;
            font-weight: 700;
            color: ${colors.neutral[900]};
            margin-bottom: 4px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .card-destination {
            font-size: 13px;
            color: ${colors.primary.main};
            font-weight: 500;
            margin-bottom: 6px;
        }

        .card-rating {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 8px;
            .stars {
                color: #F59E0B;
                font-size: 14px;
                letter-spacing: 1px;
            }
            .rating-text {
                font-size: 12px;
                color: ${colors.neutral[500]};
            }
        }

        .card-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
            .price {
                font-size: 1.3rem;
                font-weight: 800;
                color: ${colors.primary.main};
            }
            .seats-left {
                font-size: 12px;
                color: ${colors.neutral[500]};
                background: ${colors.neutral[100]};
                padding: 2px 12px;
                border-radius: 20px;
            }
        }

        .card-date-selector {
            margin: 10px 0;
            padding: 8px 12px;
            background: rgba(255,255,255,0.8);
            border-radius: 10px;
            border: 1px solid ${colors.neutral[200]};
            display: flex;
            align-items: center;
            gap: 8px;
            .date-label {
                font-size: 12px;
                color: ${colors.neutral[600]};
                font-weight: 600;
                white-space: nowrap;
            }
            select {
                flex: 1;
                padding: 4px 10px;
                border: 1px solid ${colors.neutral[200]};
                border-radius: 8px;
                font-size: 12px;
                background: #fff;
                color: ${colors.neutral[700]};
                cursor: pointer;
                outline: none;
                min-width: 100px;
                &:focus {
                    border-color: ${colors.primary.main};
                }
            }
        }

        .card-actions {
            display: flex;
            gap: 10px;
            margin-top: 8px;
            .book-btn {
                flex: 1;
                padding: 8px 0;
                background: ${colors.neutral[100]};
                color: ${colors.neutral[700]};
                border: 2px solid ${colors.neutral[200]};
                border-radius: 50px;
                font-weight: 600;
                font-size: 13px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-decoration: none;
                text-align: center;
                &:hover {
                    transform: translateY(-2px);
                    background: ${colors.primary.gradient};
                    color: #fff;
                    border-color: ${colors.primary.main};
                    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
                }
            }
            .wishlist-btn {
                width: 40px;
                height: 40px;
                background: ${colors.neutral[100]};
                border: none;
                border-radius: 50%;
                font-size: 18px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                &:hover {
                    background: #FEE2E2;
                    transform: scale(1.1);
                }
                &.active {
                    background: #FEE2E2;
                    color: #EF4444;
                }
            }
        }
    }
`;

// ============================================
// LOAD MORE BUTTON
// ============================================

const LoadMoreBtn = styled.button`
    display: block;
    margin: 16px auto 0;
    padding: 12px 40px;
    background: transparent;
    color: ${colors.primary.main};
    border: 2px solid ${colors.primary.main};
    border-radius: 50px;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background: ${colors.primary.gradient};
        color: #fff;
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
    }
`;

// ============================================
// FLOATING WHATSAPP
// ============================================

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

// ============================================
// STICKY BAR
// ============================================

const StickyBar = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
    padding: 12px 20px;
    box-shadow: 0 -4px 30px rgba(0,0,0,0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    flex-wrap: wrap;
    gap: 10px;
    .sticky-info {
        display: flex;
        align-items: center;
        gap: 12px;
        .sticky-price {
            font-size: 1.2rem;
            font-weight: 800;
            color: ${colors.primary.main};
        }
        .sticky-name {
            font-weight: 600;
            color: ${colors.neutral[700]};
            font-size: 13px;
        }
    }
    .sticky-btn {
        padding: 10px 30px;
        background: ${colors.primary.gradient};
        color: #fff;
        border: none;
        border-radius: 50px;
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        box-shadow: 0 4px 20px rgba(79, 70, 229, 0.3);
        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 30px rgba(79, 70, 229, 0.4);
        }
    }
    @media (max-width: ${breakpoints.md}) {
        .sticky-info .sticky-name { display: none; }
    }
`;

const NoSelection = styled.div`
    text-align: center;
    padding: 60px 20px;
    h2 {
        font-size: 1.8rem;
        color: ${colors.neutral[700]};
        margin-bottom: 10px;
    }
    p {
        color: ${colors.neutral[500]};
        font-size: 1rem;
    }
    .icon {
        font-size: 56px;
        margin-bottom: 12px;
    }
`;

const SkeletonContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    padding: 20px 0;
`;

const SkeletonCard = styled.div`
    background: rgba(255,255,255,0.9);
    border-radius: 16px;
    padding: 24px;
    box-shadow: ${shadows.sm};
    animation: shimmer 1.5s ease-in-out infinite;
    background: linear-gradient(
        90deg,
        ${colors.neutral[100]} 25%,
        ${colors.neutral[200]} 50%,
        ${colors.neutral[100]} 75%
    );
    background-size: 200% 100%;
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
`;

const SkeletonLine = styled.div`
    height: ${props => props.height || '16px'};
    width: ${props => props.width || '100%'};
    background: ${colors.neutral[200]};
    border-radius: 8px;
    margin-bottom: ${props => props.mb || '12px'};
    opacity: 0.6;
`;

const SkeletonTitle = styled(SkeletonLine)`
    height: 32px;
    width: 60%;
`;

const SkeletonImage = styled.div`
    height: 180px;
    background: ${colors.neutral[200]};
    border-radius: 12px;
    margin-bottom: 16px;
    opacity: 0.6;
`;

const SkeletonBadge = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
`;

const SkeletonBadgeItem = styled.div`
    height: 24px;
    width: 80px;
    background: ${colors.neutral[200]};
    border-radius: 20px;
    opacity: 0.6;
`;

const SkeletonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin: 16px 0;
    @media (max-width: ${breakpoints.md}) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const BackToTopBtn = styled.button`
    position: fixed;
    bottom: 190px;
    right: 24px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${colors.primary.gradient};
    color: #fff;
    border: none;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(79, 70, 229, 0.3);
    z-index: 99;
    transition: all 0.3s ease;
    display: ${props => props.visible ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    &:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 30px rgba(79, 70, 229, 0.4);
    }
`;

// ============================================
// MAIN COMPONENT
// ============================================

function Tours() {
    const [yatras, setYatras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [activeTab, setActiveTab] = useState('itinerary');
    const [showSticky, setShowSticky] = useState(true);
    const [destinationImages, setDestinationImages] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [statusFilter, setStatusFilter] = useState('upcoming');
    const [sortBy, setSortBy] = useState('price_low');
    const [language, setLanguage] = useState('en');
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [selectedCardDate, setSelectedCardDate] = useState({});
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [tripTypeFilter, setTripTypeFilter] = useState('all');
    const [visibleCount, setVisibleCount] = useState(6);
    const [scrollProgress, setScrollProgress] = useState(0);

    const loadDestinationImages = async (dests) => {
        if (!dests || dests.length === 0) return;
        const imageMap = {};
        for (const dest of dests) {
            try {
                const result = await getDestinationImage(dest);
                if (result && result.image_url) {
                    imageMap[dest] = result.image_url;
                }
            } catch (err) {
                console.error(`Error loading image for ${dest}:`, err);
            }
        }
        setDestinationImages(imageMap);
    };

    useEffect(() => {
        loadYatras();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector('footer');
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                if (footerRect.top < window.innerHeight) {
                    setShowSticky(false);
                } else {
                    setShowSticky(true);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleBackToTopScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleBackToTopScroll);
        return () => window.removeEventListener('scroll', handleBackToTopScroll);
    }, []);

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

    useEffect(() => {
        const saved = localStorage.getItem('tourWishlist');
        if (saved) {
            setWishlist(JSON.parse(saved));
        }
    }, []);

    const toggleWishlist = (tourId) => {
        let newWishlist;
        if (wishlist.includes(tourId)) {
            newWishlist = wishlist.filter(id => id !== tourId);
        } else {
            newWishlist = [...wishlist, tourId];
        }
        setWishlist(newWishlist);
        localStorage.setItem('tourWishlist', JSON.stringify(newWishlist));
    };

    const loadYatras = async () => {
        try {
            setLoading(true);
            const data = await getYatras();
            const enrichedData = data.map((yatra) => ({
                ...yatra,
                destination: extractDestination(yatra.yatra_name),
                tripType: getTripType(yatra.yatra_name),
                statusInfo: getTourStatus(yatra.start_date, yatra.end_date),
                durationDays: yatra.start_date && yatra.end_date 
                    ? Math.ceil((new Date(yatra.end_date) - new Date(yatra.start_date)) / (1000 * 60 * 60 * 24))
                    : 0,
                rating: (3.5 + Math.random() * 1.5).toFixed(1),
                reviewCount: Math.floor(Math.random() * 100) + 10,
            }));
            setYatras(enrichedData);
            if (enrichedData.length > 0) {
                const upcomingTrips = enrichedData.filter(y => y.statusInfo.type === 'upcoming');
                if (upcomingTrips.length > 0) {
                    setSelectedTrip(upcomingTrips[0]);
                } else {
                    setSelectedTrip(enrichedData[0]);
                }
            }
            setError(null);
        } catch (err) {
            console.error('Error loading yatras:', err);
            setError('Failed to load yatras. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const destinations = useMemo(() => {
        if (!yatras || yatras.length === 0) return [];
        const destSet = new Set(yatras.map(y => y.destination));
        return Array.from(destSet).sort();
    }, [yatras]);

    useEffect(() => {
        if (destinations && destinations.length > 0) {
            loadDestinationImages(destinations);
        }
    }, [destinations]);

    const groupedYatras = useMemo(() => {
        const groups = {};
        yatras.forEach(yatra => {
            let baseName = yatra.yatra_name;
            baseName = baseName.replace(/\s*-\s*\d{1,2}\s*[A-Za-z]{3}\s*\d{4}/g, '');
            baseName = baseName.replace(/\s*-\s*[A-Za-z]+\s*\d{1,2}\s*[A-Za-z]{3}\s*\d{4}/g, '');
            baseName = baseName.trim();
            if (!groups[baseName]) {
                groups[baseName] = [];
            }
            groups[baseName].push(yatra);
        });
        return groups;
    }, [yatras]);

    const filteredGroups = useMemo(() => {
        let groups = { ...groupedYatras };
        
        if (selectedDestination) {
            const filtered = {};
            Object.keys(groups).forEach(key => {
                const trips = groups[key];
                const filteredTrips = trips.filter(t => t.destination === selectedDestination);
                if (filteredTrips.length > 0) {
                    filtered[key] = filteredTrips;
                }
            });
            groups = filtered;
        }
        
        if (searchTerm) {
            const filtered = {};
            Object.keys(groups).forEach(key => {
                const trips = groups[key];
                const filteredTrips = trips.filter(t => 
                    t.yatra_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    t.destination?.toLowerCase().includes(searchTerm.toLowerCase())
                );
                if (filteredTrips.length > 0) {
                    filtered[key] = filteredTrips;
                }
            });
            groups = filtered;
        }
        
        if (priceMin || priceMax) {
            const filtered = {};
            Object.keys(groups).forEach(key => {
                const trips = groups[key];
                const filteredTrips = trips.filter(t => {
                    const price = t.rate_per_seat;
                    if (priceMin && priceMax) {
                        return price >= parseFloat(priceMin) && price <= parseFloat(priceMax);
                    } else if (priceMin) {
                        return price >= parseFloat(priceMin);
                    } else if (priceMax) {
                        return price <= parseFloat(priceMax);
                    }
                    return true;
                });
                if (filteredTrips.length > 0) {
                    filtered[key] = filteredTrips;
                }
            });
            groups = filtered;
        }
        
        if (!selectedDestination && statusFilter !== 'all') {
            const filtered = {};
            Object.keys(groups).forEach(key => {
                const trips = groups[key];
                const filteredTrips = trips.filter(t => t.statusInfo.type === statusFilter);
                if (filteredTrips.length > 0) {
                    filtered[key] = filteredTrips;
                }
            });
            groups = filtered;
        }
        
        const sortedKeys = Object.keys(groups).sort((a, b) => {
            const firstTripA = groups[a][0];
            const firstTripB = groups[b][0];
            switch (sortBy) {
                case 'price_low': return firstTripA.rate_per_seat - firstTripB.rate_per_seat;
                case 'price_high': return firstTripB.rate_per_seat - firstTripA.rate_per_seat;
                case 'date_soon': return new Date(firstTripA.start_date) - new Date(firstTripB.start_date);
                case 'date_latest': return new Date(firstTripB.start_date) - new Date(firstTripA.start_date);
                default: return 0;
            }
        });
        
        const result = {};
        sortedKeys.forEach(key => { result[key] = groups[key]; });
        return result;
    }, [groupedYatras, selectedDestination, searchTerm, priceMin, priceMax, statusFilter, sortBy]);

    const filteredByType = useMemo(() => {
        if (tripTypeFilter === 'all') return filteredGroups;
        const filtered = {};
        Object.keys(filteredGroups).forEach(key => {
            const trips = filteredGroups[key];
            const filteredTrips = trips.filter(t => t.tripType === tripTypeFilter);
            if (filteredTrips.length > 0) {
                filtered[key] = filteredTrips;
            }
        });
        return filtered;
    }, [filteredGroups, tripTypeFilter]);

    const visibleKeys = useMemo(() => {
        return Object.keys(filteredByType).slice(0, visibleCount);
    }, [filteredByType, visibleCount]);

    const loadMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    const handleAllDestinationsClick = () => {
        setSelectedDestination(null);
        setActiveTab('itinerary');
        const firstKey = Object.keys(groupedYatras)[0];
        if (firstKey && groupedYatras[firstKey].length > 0) {
            setSelectedTrip(groupedYatras[firstKey][0]);
        }
    };

    const handleDestinationClick = (destination) => {
        setSelectedDestination(destination);
        setActiveTab('itinerary');
        const firstKey = Object.keys(groupedYatras).find(key => {
            return groupedYatras[key].some(t => t.destination === destination);
        });
        if (firstKey && groupedYatras[firstKey].length > 0) {
            setSelectedTrip(groupedYatras[firstKey][0]);
        }
    };

    const handleStatusChange = (status) => {
        setStatusFilter(status);
        if (!selectedDestination) {
            const firstKey = Object.keys(groupedYatras)[0];
            if (firstKey && groupedYatras[firstKey].length > 0) {
                setSelectedTrip(groupedYatras[firstKey][0]);
            }
        }
    };

    const handleCardClick = (trip) => {
        setSelectedTrip(trip);
        setActiveTab('itinerary');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleShare = () => {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: selectedTrip?.yatra_name || 'GetMeYatra Tour',
                text: `Check out ${selectedTrip?.yatra_name} on GetMeYatra!`,
                url: url,
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard!');
            });
        }
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    const getTranslatedContent = (text) => {
        if (!text) return text;
        if (language === 'en') return text;
        return translateText(text, 'hi');
    };

    const getDestinationIcon = (dest) => {
        const icons = {
            'Vrindavan': '🌸',
            'Khatu Shyam': '🙏',
            'Haridwar': '🌊',
            'Manali': '🏔️',
        };
        return icons[dest] || '📍';
    };

    const getHeroContent = (destination) => {
        const heroMap = {
            'Vrindavan': { emoji: '🌸', bg: 'linear-gradient(135deg, #F093FB, #F5576C)' },
            'Khatu Shyam': { emoji: '🙏', bg: 'linear-gradient(135deg, #FDCB6E, #E17055)' },
            'Haridwar': { emoji: '🌊', bg: 'linear-gradient(135deg, #74B9FF, #0984E3)' },
            'Manali': { emoji: '🏔️', bg: 'linear-gradient(135deg, #55EFC4, #00B894)' },
        };
        return heroMap[destination] || { emoji: '📍', bg: colors.primary.gradient };
    };

    const getHighlights = (trip) => {
        const highlights = {
            'Vrindavan': [
                { icon: '🌸', label: 'Radha Rani Temple' },
                { icon: '🛕', label: 'Banke Bihari Darshan' },
                { icon: '🙏', label: 'Prem Anand Maharaj' },
                { icon: '🌿', label: 'Nidhivan & Prem Mandir' },
            ],
            'Khatu Shyam': [
                { icon: '🙏', label: 'Khatu Shyam Darshan' },
                { icon: '🛕', label: 'Salasar Balaji' },
                { icon: '🌹', label: 'Rani Sati Dadi' },
                { icon: '🎶', label: 'Bhajan Kirtan' },
            ],
            'Haridwar': [
                { icon: '🌊', label: 'Ganga Aarti' },
                { icon: '🛕', label: 'Mansa Devi' },
                { icon: '🌉', label: 'Ram Jhula' },
                { icon: '🙏', label: 'Triveni Ghat' },
            ],
            'Manali': [
                { icon: '🏔️', label: 'Snow View' },
                { icon: '🚇', label: 'Atal Tunnel' },
                { icon: '🌲', label: 'Kasol & Manikaran' },
                { icon: '🔥', label: 'Bonfire & DJ' },
            ],
        };
        return highlights[trip?.destination] || [
            { icon: '🌟', label: 'Spiritual Journey' },
            { icon: '🙏', label: 'Blessings' },
            { icon: '🌸', label: 'Divine Experience' },
        ];
    };

    const getCardStars = (rating) => {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5 ? 1 : 0;
        const empty = 5 - full - half;
        return '⭐'.repeat(full) + (half ? '⭐' : '') + '☆'.repeat(empty);
    };

    const totalGroupCount = Object.keys(filteredByType).length;
    const visibleGroupCount = visibleKeys.length;

    if (loading) {
        return (
            <PageContainer>
                <ScrollProgress progress={0} />
                <Container>
                    <PageHeader>
                        <h1>🚌 Our <span className="gradient-text">Yatra / Tour</span> Packages</h1>
                        <p>Loading amazing tours for you...</p>
                    </PageHeader>
                    <SkeletonContainer>
                        {[1, 2, 3].map((i) => (
                            <SkeletonCard key={i}>
                                <SkeletonImage />
                                <SkeletonTitle />
                                <SkeletonLine width="80%" />
                                <SkeletonBadge>
                                    <SkeletonBadgeItem />
                                    <SkeletonBadgeItem />
                                    <SkeletonBadgeItem />
                                </SkeletonBadge>
                                <SkeletonGrid>
                                    <SkeletonLine height="50px" />
                                    <SkeletonLine height="50px" />
                                    <SkeletonLine height="50px" />
                                    <SkeletonLine height="50px" />
                                </SkeletonGrid>
                                <SkeletonLine width="30%" />
                            </SkeletonCard>
                        ))}
                    </SkeletonContainer>
                </Container>
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer>
                <ScrollProgress progress={0} />
                <Container>
                    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                        <p style={{ color: colors.status.error }}>{error}</p>
                        <button 
                            onClick={loadYatras}
                            style={{
                                marginTop: '16px',
                                padding: '10px 32px',
                                background: colors.primary.gradient,
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Retry
                        </button>
                    </div>
                </Container>
            </PageContainer>
        );
    }

    const heroContent = selectedDestination ? getHeroContent(selectedDestination) : null;
    const highlights = selectedTrip ? getHighlights(selectedTrip) : [];
    const totalCount = yatras.length;
    const upcomingCount = yatras.filter(y => y.statusInfo.type === 'upcoming').length;
    const ongoingCount = yatras.filter(y => y.statusInfo.type === 'ongoing').length;
    const completedCount = yatras.filter(y => y.statusInfo.type === 'completed').length;
    const destCounts = {};
    destinations.forEach(dest => {
        destCounts[dest] = yatras.filter(y => y.destination === dest).length;
    });

    return (
        <PageContainer>
            <ScrollProgress progress={scrollProgress} />
            <Container>
                {/* ===== BREADCRUMBS ===== */}
                <Breadcrumbs>
                    <Link to="/">Home</Link>
                    <span className="separator">&gt;</span>
                    <span className="current">Tours</span>
                </Breadcrumbs>

                {/* ===== PAGE HEADER ===== */}
                <PageHeader>
                    <h1>🚌 Our <span className="gradient-text">Yatra / Tour</span> Packages</h1>
                    <p>Select a destination or filter by status to view trip details</p>
                    <span className="badge-count">
                        {totalGroupCount} {totalGroupCount === 1 ? 'Tour' : 'Tours'} Available
                    </span>
                </PageHeader>

                {/* ===== HERO STATS ===== */}
                <HeroStats>
                    <div className="stat">
                        <span className="icon">🚌</span>
                        <div className="number">{yatras.length}</div>
                        <div className="label">{getTranslatedContent('Tours Available')}</div>
                    </div>
                    <div className="stat">
                        <span className="icon">📍</span>
                        <div className="number">{destinations.length}</div>
                        <div className="label">{getTranslatedContent('Destinations')}</div>
                    </div>
                    <div className="stat">
                        <span className="icon">👥</span>
                        <div className="number">1000+</div>
                        <div className="label">{getTranslatedContent('Happy Travelers')}</div>
                    </div>
                    <div className="stat">
                        <span className="icon">⭐</span>
                        <div className="number">4.9</div>
                        <div className="label">{getTranslatedContent('Average Rating')}</div>
                    </div>
                </HeroStats>

                {/* ===== TRUST BADGES ===== */}
                <TrustBadges>
                    <TrustBadge><span className="icon">✅</span> Best Price Guarantee</TrustBadge>
                    <TrustBadge><span className="icon">⭐</span> 4.9/5 Rating</TrustBadge>
                    <TrustBadge><span className="icon">👥</span> 1000+ Happy Travelers</TrustBadge>
                    <TrustBadge><span className="icon">🛡️</span> Safety Assured</TrustBadge>
                    <TrustBadge><span className="icon">💳</span> Secure Payments</TrustBadge>
                </TrustBadges>

                {/* ===== FILTER BAR ===== */}
                <FilterBar>
                    <FilterGroup>
                        <FilterInput
                            type="text"
                            placeholder={getTranslatedContent('Search tours...')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ minWidth: '160px' }}
                        />
                    </FilterGroup>
                    <FilterGroup>
                        <FilterInput
                            type="number"
                            placeholder={getTranslatedContent('Min ₹')}
                            value={priceMin}
                            onChange={(e) => setPriceMin(e.target.value)}
                            style={{ width: '80px' }}
                        />
                        <span style={{ color: colors.neutral[400] }}>-</span>
                        <FilterInput
                            type="number"
                            placeholder={getTranslatedContent('Max ₹')}
                            value={priceMax}
                            onChange={(e) => setPriceMax(e.target.value)}
                            style={{ width: '80px' }}
                        />
                    </FilterGroup>
                    <FilterGroup>
                        <StatusDropdown 
                            value={statusFilter} 
                            onChange={(e) => handleStatusChange(e.target.value)}
                            visible={!selectedDestination}
                        >
                            <option value="upcoming">🟢 {getTranslatedContent('Upcoming')} ({upcomingCount})</option>
                            <option value="ongoing">🟡 {getTranslatedContent('Ongoing')} ({ongoingCount})</option>
                            <option value="completed">🔴 {getTranslatedContent('Completed')} ({completedCount})</option>
                            <option value="all">🌐 {getTranslatedContent('All Tours')} ({totalCount})</option>
                        </StatusDropdown>
                    </FilterGroup>
                    <FilterGroup>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                padding: '9px 16px',
                                border: '2px solid ' + colors.neutral[200],
                                borderRadius: '12px',
                                fontSize: '13px',
                                background: '#fff',
                                color: colors.neutral[700],
                                cursor: 'pointer',
                                outline: 'none',
                                minWidth: '140px'
                            }}
                        >
                            <option value="price_low">💰 Price: Low to High</option>
                            <option value="price_high">💰 Price: High to Low</option>
                            <option value="date_soon">📅 Date: Soonest First</option>
                            <option value="date_latest">📅 Date: Latest First</option>
                        </select>
                    </FilterGroup>
                    <FilterGroup>
                        <span style={{ fontSize: '13px', color: colors.neutral[500], fontWeight: 500 }}>
                            {totalGroupCount} {totalGroupCount === 1 ? getTranslatedContent('tour found') : getTranslatedContent('tours found')}
                        </span>
                    </FilterGroup>
                    <FilterGroup>
                        <ClearBtn
                            onClick={() => {
                                setSearchTerm('');
                                setPriceMin('');
                                setPriceMax('');
                                setStatusFilter('upcoming');
                                setSelectedDestination(null);
                                setSortBy('price_low');
                                setTripTypeFilter('all');
                            }}
                        >
                            ✕ {getTranslatedContent('Clear Filters')}
                        </ClearBtn>
                    </FilterGroup>
                    <FilterGroup>
                        <FilterToggleBtn onClick={() => setIsFilterOpen(true)}>
                            ⚙️ Advanced Filters
                        </FilterToggleBtn>
                    </FilterGroup>
                </FilterBar>

                {/* ===== FILTER DRAWER ===== */}
                <FilterOverlay isOpen={isFilterOpen} onClick={() => setIsFilterOpen(false)} />
                <FilterDrawer isOpen={isFilterOpen}>
                    <FilterDrawerHeader>
                        <h2>⚙️ Advanced Filters</h2>
                        <button className="close-btn" onClick={() => setIsFilterOpen(false)}>✕</button>
                    </FilterDrawerHeader>
                    <FilterSection>
                        <span className="filter-label">Trip Type</span>
                        <FilterChipGroup>
                            <FilterChip active={tripTypeFilter === 'all'} onClick={() => setTripTypeFilter('all')}>All</FilterChip>
                            <FilterChip active={tripTypeFilter === 'Same Day'} onClick={() => setTripTypeFilter('Same Day')}>Same Day</FilterChip>
                            <FilterChip active={tripTypeFilter === '2 Days'} onClick={() => setTripTypeFilter('2 Days')}>2 Days</FilterChip>
                            <FilterChip active={tripTypeFilter === '3 Days'} onClick={() => setTripTypeFilter('3 Days')}>3 Days</FilterChip>
                            <FilterChip active={tripTypeFilter === '4 Days'} onClick={() => setTripTypeFilter('4 Days')}>4 Days</FilterChip>
                            <FilterChip active={tripTypeFilter === '5 Days'} onClick={() => setTripTypeFilter('5 Days')}>5 Days</FilterChip>
                        </FilterChipGroup>
                    </FilterSection>
                    <ApplyFiltersBtn onClick={() => setIsFilterOpen(false)}>Apply Filters</ApplyFiltersBtn>
                </FilterDrawer>

                {/* ===== DESTINATION NAVIGATION ===== */}
                <DestinationNav>
                    <NavBtn active={!selectedDestination} onClick={handleAllDestinationsClick}>
                        🌐 {getTranslatedContent('All Destinations')}
                        <span className="count">{totalGroupCount}</span>
                    </NavBtn>
                    {destinations.map(dest => {
                        const count = destCounts[dest] || 0;
                        const icon = getDestinationIcon(dest);
                        return (
                            <NavBtn
                                key={dest}
                                active={selectedDestination === dest}
                                onClick={() => handleDestinationClick(dest)}
                            >
                                <span className="icon">{icon}</span>
                                {getTranslatedContent(dest)}
                                <span className="count">{count}</span>
                            </NavBtn>
                        );
                    })}
                </DestinationNav>

                {/* ===== TOUR CARD GRID ===== */}
                {visibleKeys.length > 0 ? (
                    <>
                        <TourCardGrid>
                            {visibleKeys.map((groupName) => {
                                const trips = filteredByType[groupName];
                                const firstTrip = trips[0];
                                const totalSeats = trips.reduce((sum, t) => sum + t.total_seats, 0);
                                const bookedSeats = trips.reduce((sum, t) => sum + (t.booked_seats || 0), 0);
                                const seatsLeft = totalSeats - bookedSeats;
                                const isFeatured = firstTrip.rating >= 4.5;
                                const isWishlisted = wishlist.includes(firstTrip.id);
                                const stars = getCardStars(parseFloat(firstTrip.rating) || 4);
                                const priceRange = {
                                    min: Math.min(...trips.map(t => t.rate_per_seat)),
                                    max: Math.max(...trips.map(t => t.rate_per_seat))
                                };
                                const priceDisplay = priceRange.min === priceRange.max 
                                    ? `₹${priceRange.min}` 
                                    : `₹${priceRange.min} - ₹${priceRange.max}`;
                                
                                if (!selectedCardDate[firstTrip.id]) {
                                    setSelectedCardDate(prev => ({
                                        ...prev,
                                        [firstTrip.id]: trips[0].id
                                    }));
                                }
                                
                                const selectedDateId = selectedCardDate[firstTrip.id] || trips[0].id;
                                const selectedDateTrip = trips.find(t => t.id === selectedDateId) || trips[0];
                                
                                return (
                                    <TourCard key={firstTrip.id}>
                                        <div className="card-image">
                                            <img 
                                                src={getTourImage(firstTrip)}
                                                alt={firstTrip.yatra_name}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    const parent = e.target.parentElement;
                                                    if (parent) {
                                                        const span = document.createElement('span');
                                                        span.style.cssText = 'font-size:48px;opacity:0.6;';
                                                        span.textContent = getDestinationIcon(firstTrip.destination);
                                                        parent.appendChild(span);
                                                    }
                                                }}
                                            />
                                            {isFeatured && <span className="featured-badge">⭐ Featured</span>}
                                            <span className="duration-badge">📅 {trips.length} dates available</span>
                                            <span className={`status-badge-card ${firstTrip.statusInfo.type}`}>
                                                {getTranslatedContent(firstTrip.statusInfo.label)}
                                            </span>
                                        </div>
                                        <div className="card-body">
                                            <div className="card-title">{getTranslatedContent(groupName)}</div>
                                            <div className="card-destination">
                                                {getDestinationIcon(firstTrip.destination)} {getTranslatedContent(firstTrip.destination)}
                                            </div>
                                            <div className="card-rating">
                                                <span className="stars">{stars}</span>
                                                <span className="rating-text">
                                                    {firstTrip.rating} ({firstTrip.reviewCount} reviews)
                                                </span>
                                            </div>
                                            <div className="card-info">
                                                <span className="price">{priceDisplay}</span>
                                                <span className="seats-left">
                                                    {seatsLeft} {getTranslatedContent('seats left')}
                                                </span>
                                            </div>
                                            <div className="card-date-selector">
                                                <span className="date-label">📅 {getTranslatedContent('Select Date')}:</span>
                                                <select
                                                    value={selectedDateId}
                                                    onChange={(e) => {
                                                        const tripId = parseInt(e.target.value);
                                                        setSelectedCardDate(prev => ({
                                                            ...prev,
                                                            [firstTrip.id]: tripId
                                                        }));
                                                        const trip = trips.find(t => t.id === tripId);
                                                        if (trip) {
                                                            setSelectedTrip(trip);
                                                        }
                                                    }}
                                                >
                                                    {trips.map(trip => (
                                                        <option key={trip.id} value={trip.id}>
                                                            {formatDateRange(trip.start_date, trip.end_date)}
                                                            {trip.start_time && ` (${formatTime(trip.start_time)})`}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="card-actions">
                                                <Link 
                                                    to={`/tours/${selectedDateTrip.id}`} 
                                                    className="book-btn"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    📋 {getTranslatedContent('View Details')}
                                                </Link>
                                                <button 
                                                    className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleWishlist(firstTrip.id);
                                                    }}
                                                >
                                                    {isWishlisted ? '❤️' : '🤍'}
                                                </button>
                                            </div>
                                        </div>
                                    </TourCard>
                                );
                            })}
                        </TourCardGrid>
                        
                        {visibleCount < totalGroupCount && (
                            <LoadMoreBtn onClick={loadMore}>
                                {getTranslatedContent('Show More Tours')} ({totalGroupCount - visibleCount} {getTranslatedContent('left')})
                            </LoadMoreBtn>
                        )}
                    </>
                ) : (
                    <NoSelection>
                        <div className="icon">🔍</div>
                        <h2>{getTranslatedContent('No trips available')}</h2>
                        <p>{getTranslatedContent('Please select a different destination or check back later.')}</p>
                    </NoSelection>
                )}
            </Container>

            <FloatingWhatsApp 
                href="https://wa.me/918010320000?text=Hi%20I%20want%20to%20know%20more%20about%20your%20tours"
                target="_blank"
                rel="noopener noreferrer"
            >
                💬
            </FloatingWhatsApp>

            <BackToTopBtn 
                visible={showBackToTop}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                ↑
            </BackToTopBtn>

            {showSticky && selectedTrip && (
                <StickyBar>
                    <div className="sticky-info">
                        <span className="sticky-price">₹{selectedTrip.rate_per_seat}</span>
                        <span className="sticky-name">| {getTranslatedContent(selectedTrip.yatra_name)}</span>
                    </div>
                    <Link to={`/booking?yatra=${selectedTrip.id}`} className="sticky-btn">
                        {getTranslatedContent('Book Now')} →
                    </Link>
                </StickyBar>
            )}
        </PageContainer>
    );
}

export default Tours;
