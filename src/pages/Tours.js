import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getYatras, getDestinationImage } from '../services/api';
import styled, { keyframes } from 'styled-components';
import { colors, shadows, breakpoints } from '../styles/theme';

// ============================================
// ANIMATIONS
// ============================================

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
`;

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

// ============================================
// TRANSLATION DICTIONARY (Hindi ↔ English)
// ============================================

const translateText = (text, targetLang) => {
    if (!text) return text;
    if (targetLang === 'en') return text;
    
    const dict = {
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
        'What\'s Included': 'शामिल सेवाएँ',
        'What\'s Not Included': 'शामिल नहीं',
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
    };
    
    let result = text;
    const sortedKeys = Object.keys(dict).sort((a, b) => b.length - a.length);
    
    for (const key of sortedKeys) {
        const pattern = new RegExp(`\\b${key}\\b`, 'gi');
        result = result.replace(pattern, dict[key]);
    }
    
    return result;
};

// ============================================
// EXTRACT DESTINATION FROM TOUR NAME
// ============================================
const extractDestination = (yatraName) => {
    if (!yatraName) return 'Other';
    
    const name = yatraName.toLowerCase();
    
    if (name.includes('vrindavan')) return 'Vrindavan';
    if (name.includes('barsana')) return 'Barsana';
    if (name.includes('khatu shyam') || name.includes('khatu')) return 'Khatu Shyam';
    if (name.includes('salasar')) return 'Salasar';
    if (name.includes('manali')) return 'Manali';
    if (name.includes('kasol')) return 'Kasol';
    if (name.includes('sissu')) return 'Sissu';
    if (name.includes('manikaran')) return 'Manikaran';
    if (name.includes('rani sati')) return 'Rani Sati';
    if (name.includes('dwarka') || name.includes('dwaraka')) return 'Dwarka';
    if (name.includes('somnath')) return 'Somnath';
    if (name.includes('ayodhya')) return 'Ayodhya';
    if (name.includes('kashi') || name.includes('varanasi')) return 'Varanasi';
    if (name.includes('haridwar')) return 'Haridwar';
    if (name.includes('rishikesh')) return 'Rishikesh';
    if (name.includes('jammu') || name.includes('katra')) return 'Jammu & Katra';
    if (name.includes('vaishno')) return 'Vaishno Devi';
    if (name.includes('amritsar')) return 'Amritsar';
    if (name.includes('golden temple')) return 'Golden Temple';
    
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
// STYLED COMPONENTS
// ============================================

const PageContainer = styled.div`
    padding-top: 160px;
    padding-bottom: 100px;
    background: ${colors.background.main};
    min-height: 100vh;
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
`;

const PageHeader = styled.div`
    text-align: center;
    margin-bottom: 30px;

    h1 {
        font-size: 2.5rem;
        font-weight: 800;
        color: ${colors.neutral[900]};
        margin-bottom: 8px;
    }

    p {
        color: ${colors.neutral[600]};
        font-size: 1.1rem;
    }

    .gradient-text {
        background: ${colors.primary.gradient};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
`;

// ===== FEATURED TOUR BANNER =====
const FeaturedBanner = styled.div`
    background: ${colors.primary.gradient};
    border-radius: 16px;
    padding: 30px 40px;
    margin-bottom: 30px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    animation: ${fadeIn} 0.6s ease;

    .banner-content {
        flex: 1;

        .badge {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            padding: 4px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 8px;
        }

        h2 {
            font-size: 1.8rem;
            font-weight: 800;
            margin-bottom: 4px;
        }

        p {
            opacity: 0.9;
            font-size: 14px;
        }
    }

    .banner-btn {
        padding: 12px 32px;
        background: #fff;
        color: ${colors.primary.main};
        border: none;
        border-radius: 50px;
        font-weight: 700;
        font-size: 16px;
        text-decoration: none;
        transition: all 0.3s ease;
        white-space: nowrap;

        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }
    }

    @media (max-width: ${breakpoints.md}) {
        flex-direction: column;
        text-align: center;
        padding: 24px 20px;
    }
`;

// ===== FILTER BAR =====
const FilterBar = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 20px;
    padding: 16px 20px;
    background: ${colors.background.card};
    border-radius: 12px;
    box-shadow: ${shadows.sm};
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${colors.neutral[100]};
`;

const FilterGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
`;

const FilterInput = styled.input`
    padding: 8px 14px;
    border: 1px solid ${colors.neutral[200]};
    border-radius: 8px;
    font-size: 13px;
    outline: none;
    transition: all 0.3s ease;
    min-width: 120px;

    &:focus {
        border-color: ${colors.primary.main};
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }
`;

const FilterSelect = styled.select`
    padding: 8px 14px;
    border: 1px solid ${colors.neutral[200]};
    border-radius: 8px;
    font-size: 13px;
    background: #fff;
    color: ${colors.neutral[700]};
    cursor: pointer;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
        border-color: ${colors.primary.main};
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }
`;

// ===== DESTINATION NAVIGATION =====
const DestinationNav = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 30px;
    padding: 16px 20px;
    background: ${colors.background.card};
    border-radius: 12px;
    box-shadow: ${shadows.sm};
    align-items: center;
    justify-content: center;
    border: 1px solid ${colors.neutral[100]};
`;

const NavBtn = styled.button`
    padding: 8px 20px;
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
        margin-left: 5px;
    }

    .icon {
        margin-right: 4px;
    }

    &.status-upcoming {
        border-color: #22C55E;
        color: #22C55E;
        ${props => props.active && `
            background: #22C55E;
            color: #fff;
            border-color: #22C55E;
        `}
    }

    &.status-ongoing {
        border-color: #F59E0B;
        color: #F59E0B;
        ${props => props.active && `
            background: #F59E0B;
            color: #fff;
            border-color: #F59E0B;
        `}
    }

    &.status-completed {
        border-color: #EF4444;
        color: #EF4444;
        ${props => props.active && `
            background: #EF4444;
            color: #fff;
            border-color: #EF4444;
        `}
    }
`;

// ===== TRIP DETAILS SECTION =====
const TripDetails = styled.div`
    background: ${colors.background.card};
    border-radius: 16px;
    padding: 30px;
    box-shadow: ${shadows.md};
    animation: ${fadeIn} 0.5s ease;
`;

// ===== HERO IMAGE =====
const HeroImage = styled.div`
    width: 100%;
    height: 280px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 20px;
    background: ${colors.primary.gradient};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80px;
    color: #fff;
    opacity: 0.8;
    position: relative;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 20px;
        background: linear-gradient(transparent, rgba(0,0,0,0.6));
        color: #fff;

        h2 {
            margin: 0;
            font-size: 1.8rem;
        }
    }
`;

const TripHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 2px solid ${colors.neutral[200]};

    h2 {
        font-size: 1.8rem;
        font-weight: 800;
        color: ${colors.neutral[900]};
        margin: 0;
    }

    .price-tag {
        font-size: 1.8rem;
        font-weight: 800;
        color: ${colors.primary.main};
        background: ${colors.primary.light};
        padding: 8px 20px;
        border-radius: 12px;
    }
`;

// ===== HIGHLIGHTS =====
const Highlights = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
    margin: 16px 0;

    .highlight-item {
        background: ${colors.neutral[50]};
        padding: 12px;
        border-radius: 8px;
        text-align: center;
        border: 1px solid ${colors.neutral[200]};
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-2px);
            box-shadow: ${shadows.sm};
        }

        .icon {
            font-size: 24px;
            display: block;
        }
        .label {
            font-size: 12px;
            color: ${colors.neutral[600]};
            margin-top: 4px;
        }
    }
`;

// ===== INFO BOX =====
const InfoBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin: 16px 0;
    padding: 16px;
    background: ${colors.neutral[50]};
    border-radius: 12px;
    border: 1px solid ${colors.neutral[200]};
`;

const InfoItem = styled.div`
    flex: 1;
    min-width: 120px;

    .label {
        font-size: 12px;
        font-weight: 600;
        color: ${colors.neutral[500]};
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
    }

    .value {
        font-size: 15px;
        font-weight: 600;
        color: ${colors.neutral[800]};
    }
`;

// ===== DATE SELECTOR =====
const DateSelector = styled.select`
    padding: 10px 16px;
    border-radius: 8px;
    border: 2px solid ${colors.neutral[200]};
    font-size: 14px;
    font-weight: 500;
    background: #fff;
    color: ${colors.neutral[700]};
    cursor: pointer;
    outline: none;
    min-width: 200px;
    transition: all 0.3s ease;

    &:focus {
        border-color: ${colors.primary.main};
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }
`;

const SelectorWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin: 16px 0;
    padding: 16px;
    background: ${colors.neutral[50]};
    border-radius: 12px;
    border: 1px solid ${colors.neutral[200]};
    align-items: center;
`;

const SelectorLabel = styled.span`
    font-weight: 600;
    color: ${colors.neutral[700]};
    font-size: 14px;
`;

// ===== LANGUAGE TOGGLE =====
const LanguageToggle = styled.button`
    padding: 6px 16px;
    border-radius: 50px;
    border: 2px solid ${colors.primary.main};
    background: ${props => props.lang === 'hi' ? colors.primary.main : 'transparent'};
    color: ${props => props.lang === 'hi' ? '#fff' : colors.primary.main};
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-left: auto;
    white-space: nowrap;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.2);
    }
`;

// ===== ITINERARY TABS =====
const TabsWrapper = styled.div`
    margin-top: 20px;
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
    padding: 10px 20px;
    border: none;
    background: transparent;
    font-weight: 600;
    font-size: 14px;
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
    min-height: 100px;
    color: ${colors.neutral[600]};
    font-size: 14px;
    line-height: 1.8;
    white-space: pre-wrap;

    p {
        margin: 6px 0;
    }

    .section-title {
        font-weight: 700;
        font-size: 16px;
        color: ${colors.neutral[900]};
        margin-top: 12px;
        margin-bottom: 6px;
    }
`;

// ===== ACTION BUTTONS =====
const ActionButtons = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 2px solid ${colors.neutral[200]};
    flex-wrap: wrap;
`;

const BookNowBtn = styled(Link)`
    padding: 14px 40px;
    background: ${colors.primary.gradient};
    color: #fff;
    border: none;
    border-radius: 50px;
    font-weight: 700;
    font-size: 18px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
    }
`;

const WhatsAppInquiry = styled.a`
    padding: 14px 30px;
    background: #25D366;
    color: #fff;
    border: none;
    border-radius: 50px;
    font-weight: 700;
    font-size: 16px;
    text-decoration: none;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
    }
`;

const ShareBtn = styled.button`
    padding: 14px 30px;
    background: ${colors.neutral[100]};
    color: ${colors.neutral[700]};
    border: 2px solid ${colors.neutral[200]};
    border-radius: 50px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
        transform: translateY(-3px);
        box-shadow: ${shadows.md};
        background: ${colors.neutral[200]};
    }
`;

// ===== FLOATING WHATSAPP BUTTON =====
const FloatingWhatsApp = styled.a`
    position: fixed;
    bottom: 120px;
    right: 20px;
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
    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
    z-index: 99;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 30px rgba(37, 211, 102, 0.5);
    }
`;

// ===== STICKY BOOK NOW BAR =====
const StickyBar = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${colors.background.card};
    padding: 12px 20px;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    flex-wrap: wrap;
    gap: 10px;

    .sticky-info {
        display: flex;
        align-items: center;
        gap: 15px;

        .sticky-price {
            font-size: 1.2rem;
            font-weight: 800;
            color: ${colors.primary.main};
        }

        .sticky-name {
            font-weight: 600;
            color: ${colors.neutral[700]};
        }
    }

    .sticky-btn {
        padding: 10px 30px;
        background: ${colors.primary.gradient};
        color: #fff;
        border: none;
        border-radius: 50px;
        font-weight: 700;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);

        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
        }
    }

    @media (max-width: ${breakpoints.md}) {
        .sticky-info .sticky-name { display: none; }
    }
`;

// ===== NO SELECTION =====
const NoSelection = styled.div`
    text-align: center;
    padding: 80px 20px;

    h2 {
        font-size: 2rem;
        color: ${colors.neutral[700]};
        margin-bottom: 12px;
    }

    p {
        color: ${colors.neutral[500]};
        font-size: 1.1rem;
    }

    .icon {
        font-size: 64px;
        margin-bottom: 16px;
    }
`;

// ============================================
// COMPONENT
// ============================================

function Tours() {
    const [yatras, setYatras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // ===== STATE =====
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [activeTab, setActiveTab] = useState('itinerary');
    const [showSticky, setShowSticky] = useState(true);
    const [destinationImages, setDestinationImages] = useState({});
    
    // ===== FILTER STATES =====
    const [searchTerm, setSearchTerm] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [statusFilter, setStatusFilter] = useState('upcoming');
    
    // ===== LANGUAGE STATE =====
    const [language, setLanguage] = useState('en');

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
            }));
            setYatras(enrichedData);
            
            if (enrichedData.length > 0) {
                const upcomingTrips = enrichedData.filter(y => y.statusInfo.type === 'upcoming');
                if (upcomingTrips.length > 0) {
                    setSelectedTrip(upcomingTrips[0]);
                    setSelectedDestination(upcomingTrips[0].destination);
                } else {
                    setSelectedTrip(enrichedData[0]);
                    setSelectedDestination(enrichedData[0].destination);
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

    const filteredYatras = useMemo(() => {
        let filtered = [...yatras];

        if (searchTerm) {
            filtered = filtered.filter(y => 
                y.yatra_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                y.destination?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (priceMin) {
            filtered = filtered.filter(y => y.rate_per_seat >= parseFloat(priceMin));
        }
        if (priceMax) {
            filtered = filtered.filter(y => y.rate_per_seat <= parseFloat(priceMax));
        }

        if (selectedDestination) {
            filtered = filtered.filter(y => y.destination === selectedDestination);
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(y => y.statusInfo.type === statusFilter);
        }

        return filtered;
    }, [yatras, searchTerm, priceMin, priceMax, statusFilter, selectedDestination]);

    const destinationTrips = useMemo(() => {
        if (!selectedDestination) return filteredYatras;
        return filteredYatras.filter(y => y.destination === selectedDestination);
    }, [filteredYatras, selectedDestination]);

    // ===== HANDLE CLICKS =====
    const handleAllDestinationsClick = () => {
        setSelectedDestination(null);
        setActiveTab('itinerary');
        const trips = yatras.filter(y => y.statusInfo.type === statusFilter);
        if (trips.length > 0) {
            setSelectedTrip(trips[0]);
        } else if (yatras.length > 0) {
            setSelectedTrip(yatras[0]);
        }
    };

    const handleDestinationClick = (destination) => {
        setSelectedDestination(destination);
        setActiveTab('itinerary');
        const trips = yatras.filter(y => y.destination === destination);
        if (trips.length > 0) {
            setSelectedTrip(trips[0]);
        }
    };

    const handleStatusChange = (status) => {
        setStatusFilter(status);
        setSelectedDestination(null);
        setActiveTab('itinerary');
        const trips = yatras.filter(y => y.statusInfo.type === status);
        if (trips.length > 0) {
            setSelectedTrip(trips[0]);
        } else if (yatras.length > 0) {
            setSelectedTrip(yatras[0]);
        }
    };

    const handleDateChange = (e) => {
        const tripId = parseInt(e.target.value);
        if (!destinationTrips || destinationTrips.length === 0) return;
        const trip = destinationTrips.find(t => t.id === tripId);
        if (trip) {
            setSelectedTrip(trip);
        }
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
            'Vrindavan': '🛕',
            'Barsana': '🛕',
            'Khatu Shyam': '🙏',
            'Salasar': '🙏',
            'Manali': '🏔️',
            'Kasol': '🏔️',
            'Sissu': '🏔️',
            'Manikaran': '🏔️',
            'Rani Sati': '🙏',
            'Dwarka': '🏛️',
            'Somnath': '🏛️',
            'Ayodhya': '🏛️',
            'Varanasi': '🏛️',
            'Haridwar': '🏛️',
            'Rishikesh': '🏛️',
            'Jammu & Katra': '🏛️',
            'Vaishno Devi': '🙏',
            'Amritsar': '🏛️',
            'Golden Temple': '🏛️',
        };
        return icons[dest] || '📍';
    };

    const getHeroContent = (destination) => {
        const heroMap = {
            'Vrindavan': { emoji: '🛕', bg: 'linear-gradient(135deg, #FF6B6B, #EE5A24)' },
            'Barsana': { emoji: '🌸', bg: 'linear-gradient(135deg, #F093FB, #F5576C)' },
            'Khatu Shyam': { emoji: '🙏', bg: 'linear-gradient(135deg, #FDCB6E, #E17055)' },
            'Salasar': { emoji: '🙏', bg: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' },
            'Manali': { emoji: '🏔️', bg: 'linear-gradient(135deg, #74B9FF, #0984E3)' },
            'Haridwar': { emoji: '🏛️', bg: 'linear-gradient(135deg, #FDCB6E, #E17055)' },
            'Rishikesh': { emoji: '🏛️', bg: 'linear-gradient(135deg, #55EFC4, #00B894)' },
            'Ayodhya': { emoji: '🏛️', bg: 'linear-gradient(135deg, #F093FB, #F5576C)' },
            'Dwarka': { emoji: '🏛️', bg: 'linear-gradient(135deg, #74B9FF, #0984E3)' },
            'Varanasi': { emoji: '🏛️', bg: 'linear-gradient(135deg, #FDCB6E, #E17055)' },
            'Jammu & Katra': { emoji: '🏛️', bg: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' },
            'Vaishno Devi': { emoji: '🙏', bg: 'linear-gradient(135deg, #F093FB, #F5576C)' },
            'Amritsar': { emoji: '🏛️', bg: 'linear-gradient(135deg, #FF6B6B, #EE5A24)' },
            'Golden Temple': { emoji: '🏛️', bg: 'linear-gradient(135deg, #FDCB6E, #E17055)' },
        };
        return heroMap[destination] || { emoji: '📍', bg: colors.primary.gradient };
    };

    const getHighlights = (trip) => {
        const highlights = {
            'Manali': [
                { icon: '🏔️', label: 'Snow View' },
                { icon: '🚇', label: 'Atal Tunnel' },
                { icon: '🏕️', label: 'Camping' },
                { icon: '🌲', label: 'Nature Walk' },
                { icon: '🎶', label: 'DJ Night' },
                { icon: '🔥', label: 'Bonfire' },
            ],
            'Vrindavan': [
                { icon: '🛕', label: 'Temple Darshan' },
                { icon: '🙏', label: 'Spiritual' },
                { icon: '🌸', label: 'Holy Places' },
                { icon: '📿', label: 'Bhajan-Kirtan' },
            ],
            'Barsana': [
                { icon: '🛕', label: 'Radha Rani Temple' },
                { icon: '🌸', label: 'Holy Places' },
                { icon: '🙏', label: 'Spiritual' },
                { icon: '📿', label: 'Bhajan-Kirtan' },
            ],
            'Khatu Shyam': [
                { icon: '🛕', label: 'Khatu Shyam Darshan' },
                { icon: '🙏', label: 'Spiritual' },
                { icon: '🌸', label: 'Holy Places' },
                { icon: '📿', label: 'Bhajan-Kirtan' },
            ],
        };
        return highlights[trip?.destination] || [
            { icon: '🌟', label: 'Spiritual Journey' },
            { icon: '🙏', label: 'Blessings' },
            { icon: '🌸', label: 'Divine Experience' },
        ];
    };

    // Get upcoming tour for banner
    const featuredTour = useMemo(() => {
        const upcoming = yatras.filter(y => y.statusInfo.type === 'upcoming');
        if (upcoming.length > 0) {
            return upcoming[0];
        }
        return yatras.length > 0 ? yatras[0] : null;
    }, [yatras]);

    if (loading) {
        return (
            <PageContainer>
                <Container>
                    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                        <p style={{ marginTop: '16px', color: colors.neutral[500] }}>Loading tours...</p>
                    </div>
                </Container>
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer>
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
    const tripCount = filteredYatras.length;

    // Get counts
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
            <Container>
                <PageHeader>
                    <h1>🚌 Our <span className="gradient-text">Yatra / Tour</span> Packages</h1>
                    <p>Select a destination or filter by status to view trip details</p>
                </PageHeader>

                {/* ===== FEATURED TOUR BANNER ===== */}
                {featuredTour && (
                    <FeaturedBanner>
                        <div className="banner-content">
                            <div className="badge">⭐ Featured Tour</div>
                            <h2>{featuredTour.yatra_name}</h2>
                            <p>
                                {formatDateRange(featuredTour.start_date, featuredTour.end_date)} • 
                                Starting from ₹{featuredTour.rate_per_seat} per seat
                            </p>
                        </div>
                        <Link to={`/yatra/${featuredTour.id}`} className="banner-btn">
                            View Details →
                        </Link>
                    </FeaturedBanner>
                )}

                <FilterBar>
                    <FilterGroup>
                        <FilterInput
                            type="text"
                            placeholder="🔍 Search tours..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ minWidth: '180px' }}
                        />
                    </FilterGroup>

                    <FilterGroup>
                        <FilterInput
                            type="number"
                            placeholder="Min ₹"
                            value={priceMin}
                            onChange={(e) => setPriceMin(e.target.value)}
                            style={{ width: '80px' }}
                        />
                        <span style={{ color: colors.neutral[400] }}>-</span>
                        <FilterInput
                            type="number"
                            placeholder="Max ₹"
                            value={priceMax}
                            onChange={(e) => setPriceMax(e.target.value)}
                            style={{ width: '80px' }}
                        />
                    </FilterGroup>

                    <FilterGroup>
                        <span style={{ fontSize: '13px', color: colors.neutral[500] }}>
                            {tripCount} {tripCount === 1 ? getTranslatedContent('tour found') : getTranslatedContent('tours found')}
                        </span>
                    </FilterGroup>
                </FilterBar>

                {/* ===== DESTINATION NAVIGATION ===== */}
                <DestinationNav>
                    <NavBtn
                        active={!selectedDestination && statusFilter === 'all'}
                        onClick={handleAllDestinationsClick}
                    >
                        🌐 {getTranslatedContent('All Tours')}
                        <span className="count">{totalCount}</span>
                    </NavBtn>

                    <NavBtn
                        className="status-upcoming"
                        active={statusFilter === 'upcoming' && !selectedDestination}
                        onClick={() => handleStatusChange('upcoming')}
                    >
                        🟢 {getTranslatedContent('Upcoming')}
                        <span className="count">{upcomingCount}</span>
                    </NavBtn>

                    <NavBtn
                        className="status-ongoing"
                        active={statusFilter === 'ongoing' && !selectedDestination}
                        onClick={() => handleStatusChange('ongoing')}
                    >
                        🟡 {getTranslatedContent('Ongoing')}
                        <span className="count">{ongoingCount}</span>
                    </NavBtn>

                    <NavBtn
                        className="status-completed"
                        active={statusFilter === 'completed' && !selectedDestination}
                        onClick={() => handleStatusChange('completed')}
                    >
                        🔴 {getTranslatedContent('Completed')}
                        <span className="count">{completedCount}</span>
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

                {selectedTrip ? (
                    <TripDetails>
                        <HeroImage style={{ background: heroContent?.bg || colors.primary.gradient }}>
                            {destinationImages && destinationImages[selectedTrip.destination] ? (
                                <img 
                                    src={`http://getmeyatra.com${destinationImages[selectedTrip.destination]}`} 
                                    alt={selectedTrip.destination}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        const parent = e.target.parentElement;
                                        if (parent) {
                                            const span = document.createElement('span');
                                            span.style.cssText = 'font-size:80px;opacity:0.6;';
                                            span.textContent = heroContent?.emoji || '📍';
                                            parent.appendChild(span);
                                        }
                                    }}
                                />
                            ) : (
                                <span style={{ fontSize: '80px', opacity: 0.6 }}>{heroContent?.emoji || '📍'}</span>
                            )}
                            <div className="overlay">
                                <h2>{getTranslatedContent(selectedTrip.destination)}</h2>
                            </div>
                        </HeroImage>

                        <TripHeader>
                            <div>
                                <h2>{selectedTrip.yatra_name}</h2>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                                    <span style={{ 
                                        background: colors.primary.light, 
                                        color: colors.primary.main, 
                                        padding: '2px 12px', 
                                        borderRadius: '20px',
                                        fontSize: '13px',
                                        fontWeight: '600'
                                    }}>
                                        {getTranslatedContent(selectedTrip.tripType)}
                                    </span>
                                    <span style={{ 
                                        background: selectedTrip.statusInfo.type === 'upcoming' ? '#22C55E' : 
                                                   selectedTrip.statusInfo.type === 'ongoing' ? '#F59E0B' : '#EF4444',
                                        color: '#fff',
                                        padding: '2px 12px',
                                        borderRadius: '20px',
                                        fontSize: '13px',
                                        fontWeight: '600'
                                    }}>
                                        {getTranslatedContent(selectedTrip.statusInfo.label)}
                                    </span>
                                </div>
                            </div>
                            <div className="price-tag">
                                ₹{selectedTrip.rate_per_seat}
                            </div>
                        </TripHeader>

                        <Highlights>
                            {highlights && highlights.length > 0 ? (
                                highlights.map((item, index) => (
                                    <div key={index} className="highlight-item">
                                        <span className="icon">{item.icon}</span>
                                        <div className="label">{getTranslatedContent(item.label)}</div>
                                    </div>
                                ))
                            ) : (
                                <p>{getTranslatedContent('No highlights available')}</p>
                            )}
                        </Highlights>

                        <InfoBox>
                            <InfoItem>
                                <div className="label">{getTranslatedContent('Trip Type')}</div>
                                <div className="value">{getTranslatedContent(selectedTrip.tripType)}</div>
                            </InfoItem>
                            <InfoItem>
                                <div className="label">{getTranslatedContent('Price')}</div>
                                <div className="value">₹{selectedTrip.rate_per_seat} / {getTranslatedContent('seat')}</div>
                            </InfoItem>
                            <InfoItem>
                                <div className="label">{getTranslatedContent('Duration')}</div>
                                <div className="value">{selectedTrip.durationDays + 1} {getTranslatedContent('Days')}</div>
                            </InfoItem>
                            <InfoItem>
                                <div className="label">{getTranslatedContent('Trip Count')}</div>
                                <div className="value">{selectedTrip.trip_count || 0} {getTranslatedContent('trips')}</div>
                            </InfoItem>
                        </InfoBox>

                        {destinationTrips && destinationTrips.length > 1 && (
                            <SelectorWrapper>
                                <SelectorLabel>{getTranslatedContent('Select Date')}:</SelectorLabel>
                                <DateSelector 
                                    value={selectedTrip.id}
                                    onChange={handleDateChange}
                                >
                                    {destinationTrips.map(trip => (
                                        <option key={trip.id} value={trip.id}>
                                            {formatDateRange(trip.start_date, trip.end_date)}
                                        </option>
                                    ))}
                                </DateSelector>
                            </SelectorWrapper>
                        )}

                        <TabsWrapper>
                            <TabHeaders>
                                <TabBtn 
                                    active={activeTab === 'itinerary'} 
                                    onClick={() => setActiveTab('itinerary')}
                                >
                                    📅 {getTranslatedContent('Itinerary')}
                                </TabBtn>
                                <TabBtn 
                                    active={activeTab === 'inclusions'} 
                                    onClick={() => setActiveTab('inclusions')}
                                >
                                    ✅ {getTranslatedContent('Inclusions')}
                                </TabBtn>
                                <TabBtn 
                                    active={activeTab === 'exclusions'} 
                                    onClick={() => setActiveTab('exclusions')}
                                >
                                    ❌ {getTranslatedContent('Exclusions')}
                                </TabBtn>
                                <TabBtn 
                                    active={activeTab === 'notes'} 
                                    onClick={() => setActiveTab('notes')}
                                >
                                    📝 {getTranslatedContent('Notes')}
                                </TabBtn>
                                <LanguageToggle 
                                    lang={language} 
                                    onClick={toggleLanguage}
                                >
                                    {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
                                </LanguageToggle>
                            </TabHeaders>

                            <TabContent>
                                {activeTab === 'itinerary' && (
                                    selectedTrip.description ? (
                                        selectedTrip.description.split('\n').map((line, index) => {
                                            const trimmed = line.trim();
                                            if (!trimmed) return <br key={index} />;
                                            const isHeader = trimmed.match(/^[🌟📌🏷️✅❌📋]/) || trimmed === trimmed.toUpperCase();
                                            const translated = getTranslatedContent(trimmed);
                                            return (
                                                <p key={index} style={isHeader ? { fontWeight: 700, fontSize: '15px', marginTop: '8px' } : {}}>
                                                    {translated}
                                                </p>
                                            );
                                        })
                                    ) : (
                                        <p>{getTranslatedContent('No itinerary available')}</p>
                                    )
                                )}
                                {activeTab === 'inclusions' && (
                                    <div>
                                        <p className="section-title">✅ {getTranslatedContent('What\'s Included')}:</p>
                                        <p>{getTranslatedContent('• AC Tempo Traveller / Bus Transport')}</p>
                                        <p>{getTranslatedContent('• Hotel Stay (as per package)')}</p>
                                        <p>{getTranslatedContent('• Meals: Breakfast & Dinner')}</p>
                                        <p>{getTranslatedContent('• Sightseeing as per itinerary')}</p>
                                        <p>{getTranslatedContent('• Experienced Tour Coordinator')}</p>
                                        <p>{getTranslatedContent('• All taxes included')}</p>
                                    </div>
                                )}
                                {activeTab === 'exclusions' && (
                                    <div>
                                        <p className="section-title">❌ {getTranslatedContent('What\'s Not Included')}:</p>
                                        <p>{getTranslatedContent('• Personal expenses')}</p>
                                        <p>{getTranslatedContent('• Adventure activities (Paragliding, Zorbing, etc.)')}</p>
                                        <p>{getTranslatedContent('• Any meals not mentioned')}</p>
                                        <p>{getTranslatedContent('• Travel insurance')}</p>
                                    </div>
                                )}
                                {activeTab === 'notes' && (
                                    <div>
                                        <p className="section-title">📝 {getTranslatedContent('Important Notes')}:</p>
                                        <p>{getTranslatedContent('• Carry warm clothes (even in summer)')}</p>
                                        <p>{getTranslatedContent('• Carry ID proof (Aadhar/Driving License)')}</p>
                                        <p>{getTranslatedContent('• Carry medication if needed')}</p>
                                        <p>{getTranslatedContent('• Follow group timings')}</p>
                                        <p>{getTranslatedContent('• Respect local customs and traditions')}</p>
                                    </div>
                                )}
                            </TabContent>
                        </TabsWrapper>

                        <ActionButtons>
                            <BookNowBtn to={`/booking?yatra=${selectedTrip.id}`}>
                                {getTranslatedContent('Book Now')} → ₹{selectedTrip.rate_per_seat}
                            </BookNowBtn>
                            <WhatsAppInquiry 
                                href={`https://wa.me/918010320000?text=Hi%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(selectedTrip.yatra_name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                💬 {getTranslatedContent('WhatsApp Inquiry')}
                            </WhatsAppInquiry>
                            <ShareBtn onClick={handleShare}>
                                📤 {getTranslatedContent('Share')}
                            </ShareBtn>
                        </ActionButtons>
                    </TripDetails>
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

            {showSticky && selectedTrip && (
                <StickyBar>
                    <div className="sticky-info">
                        <span className="sticky-price">₹{selectedTrip.rate_per_seat}</span>
                        <span className="sticky-name">| {selectedTrip.yatra_name}</span>
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
