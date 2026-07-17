import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { colors, shadows, breakpoints } from '../styles/theme';
import api from '../services/api';

// ============================================
// TRANSLATION DICTIONARY (Hindi ↔ English)
// ============================================

// Detect if text is Hindi (contains Devanagari script)
const isHindi = (text) => {
    if (!text) return false;
    const hindiRegex = /[\u0900-\u097F]/;
    return hindiRegex.test(text);
};

// Translate text using dictionary (no API calls)
const translateWithDict = (text, targetLang) => {
    if (!text) return text;
    if (targetLang === 'en') return text;
    if (isHindi(text)) return text;
    
    const dict = {
        'Day': 'दिन',
        'Days': 'दिन',
        'Monday': 'सोमवार',
        'Tuesday': 'मंगलवार',
        'Wednesday': 'बुधवार',
        'Thursday': 'गुरुवार',
        'Friday': 'शुक्रवार',
        'Saturday': 'शनिवार',
        'Sunday': 'रविवार',
        'Mon': 'सोम',
        'Tue': 'मंगल',
        'Wed': 'बुध',
        'Thu': 'गुरु',
        'Fri': 'शुक्र',
        'Sat': 'शनि',
        'Sun': 'रवि',
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
// STYLED COMPONENTS
// ============================================

const DescriptionBox = styled.div`
    background: ${colors.background.card};
    padding: 24px;
    border-radius: 12px;
    border: 1px solid ${colors.neutral[200]};
    line-height: 1.8;
    white-space: pre-wrap;
    
    p {
        margin: 2px 0;
        color: ${colors.neutral[700]};
        font-size: 14px;
    }
    
    .section-title {
        font-weight: 700;
        font-size: 16px;
        color: ${colors.primary.main};
        margin-top: 12px;
    }
`;

const WhatsAppButton = styled.a`
    position: fixed;
    bottom: 120px;
    right: 20px;
    background: #25D366;
    color: #fff;
    padding: 14px 18px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
    z-index: 99;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 25px rgba(37, 211, 102, 0.5);
    }

    @media (max-width: ${breakpoints.md}) {
        bottom: 100px;
        right: 10px;
        padding: 12px 14px;
        font-size: 12px;
    }
`;

const SharingSelector = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    background: ${colors.background.card};
    padding: 16px 24px;
    border-radius: 12px;
    border: 1px solid ${colors.neutral[200]};
    margin-bottom: 20px;

    .label {
        font-weight: 600;
        color: ${colors.neutral[700]};
        font-size: 14px;
    }

    select {
        padding: 10px 20px;
        border-radius: 10px;
        border: 2px solid ${colors.primary.main};
        font-size: 15px;
        font-weight: 600;
        background: #fff;
        color: ${colors.neutral[700]};
        cursor: pointer;
        outline: none;
        min-width: 200px;

        &:focus {
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
    }

    .price-tag {
        background: ${colors.primary.gradient};
        color: #fff;
        padding: 6px 16px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: 600;
    }

    @media (max-width: ${breakpoints.md}) {
        flex-direction: column;
        align-items: stretch;
        text-align: center;
        select { width: 100%; }
    }
`;

const SeatAvailability = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;

    .seat-box {
        flex: 1;
        min-width: 120px;
        padding: 16px 24px;
        background: ${colors.neutral[50]};
        border-radius: 12px;
        border: 1px solid ${colors.neutral[200]};
        text-align: center;

        .label {
            font-size: 13px;
            color: ${colors.neutral[600]};
            margin-bottom: 4px;
        }

        .number {
            font-size: 24px;
            font-weight: 800;
        }

        &.total .number { color: ${colors.neutral[900]}; }
        &.booked .number { color: #EF4444; }
        &.available .number { color: #22C55E; }
    }
`;

const PageContainer = styled.div`
    padding-top: 160px;
    padding-bottom: 100px;
    background: ${colors.background.main};
    min-height: 100vh;
`;

const Container = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 20px;
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

// ===== HERO SECTION =====
const HeroSection = styled.div`
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 30px;
    min-height: 350px;
    display: flex;
    align-items: center;
    color: #fff;

    .hero-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${colors.primary.gradient};
        z-index: 1;
    }

    .hero-bg-image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        background-position: center;
        opacity: 0.4;
        z-index: 1;
    }

    .hero-content {
        position: relative;
        z-index: 2;
        padding: 50px 40px;
        width: 100%;

        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        p {
            opacity: 0.95;
            font-size: 1.1rem;
            text-shadow: 0 1px 5px rgba(0,0,0,0.3);
            margin-bottom: 8px;
        }

        .price-tag {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            backdrop-filter: blur(10px);
            padding: 8px 20px;
            border-radius: 50px;
            font-size: 1.2rem;
            font-weight: 700;
            margin-top: 10px;
            border: 1px solid rgba(255,255,255,0.3);
        }

        .book-now-hero {
            display: inline-block;
            margin-top: 15px;
            padding: 12px 35px;
            background: #fff;
            color: ${colors.primary.main};
            border-radius: 50px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);

            &:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            }
        }
    }

    @media (max-width: ${breakpoints.md}) {
        min-height: 280px;
        .hero-content {
            padding: 30px 20px;
            h1 { font-size: 1.8rem; }
        }
    }
`;

// ===== SECTION =====
const Section = styled.div`
    background: ${colors.background.card};
    border-radius: 16px;
    padding: 30px;
    box-shadow: ${shadows.md};
    margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${colors.neutral[900]};
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid ${colors.neutral[200]};
`;

// ===== GALLERY =====
const GalleryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
`;

const GalleryImage = styled.div`
    border-radius: 10px;
    overflow: hidden;
    aspect-ratio: 1;
    background: ${colors.neutral[200]};

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .caption {
        padding: 8px;
        font-size: 12px;
        color: ${colors.neutral[600]};
        text-align: center;
        background: ${colors.background.card};
    }
`;

// ===== ITINERARY TABS =====
const ItineraryTabs = styled.div`
    .tab-headers {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
        margin-bottom: 16px;
        border-bottom: 2px solid ${colors.neutral[200]};
        padding-bottom: 0;
    }

    .tab-btn {
        padding: 10px 20px;
        border: none;
        background: transparent;
        font-weight: 600;
        font-size: 14px;
        color: ${colors.neutral[500]};
        cursor: pointer;
        transition: all 0.3s ease;
        border-bottom: 3px solid transparent;
        margin-bottom: -2px;

        &:hover {
            color: ${colors.primary.main};
        }

        &.active {
            color: ${colors.primary.main};
            border-bottom-color: ${colors.primary.main};
        }
    }

    .tab-content {
        padding: 16px 0;
        min-height: 80px;
    }

    .tab-content p {
        white-space: pre-line;
        color: ${colors.neutral[600]};
        font-size: 14px;
        line-height: 1.8;
    }

    .no-data {
        color: ${colors.neutral[500]};
        font-style: italic;
    }
`;

// ===== LANGUAGE BUTTON =====
const LanguageButton = styled.button`
    padding: 6px 16px;
    border-radius: 50px;
    border: 2px solid #4F46E5;
    background: ${props => props.lang === 'hi' ? '#4F46E5' : 'transparent'};
    color: ${props => props.lang === 'hi' ? '#fff' : '#4F46E5'};
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

// ===== ITINERARY TAB VIEW COMPONENT WITH TRANSLATION TOGGLE =====
const ItineraryTabView = ({ itinerary }) => {
    const [activeTab, setActiveTab] = useState('itinerary');
    const [language, setLanguage] = useState('hi');
    
    const tabs = ['itinerary', 'inclusions', 'exclusions', 'notes'];
    const tabLabels = {
        itinerary: { hi: '📅 यात्रा कार्यक्रम', en: '📅 Itinerary' },
        inclusions: { hi: '✅ शामिल सेवाएँ', en: '✅ Inclusions' },
        exclusions: { hi: '❌ शामिल नहीं', en: '❌ Exclusions' },
        notes: { hi: '📝 महत्वपूर्ण सुझाव', en: '📝 Notes' }
    };
    
    const getContent = () => {
        if (!itinerary || itinerary.length === 0) return null;
        
        const isHindiLang = language === 'hi';
        
        switch(activeTab) {
            case 'itinerary':
                let content = '';
                itinerary.forEach(item => {
                    const desc = isHindiLang ? (item.description_hi || item.description) : item.description;
                    const dayLabel = item.day_number ? `Day ${item.day_number}: ${item.title}` : item.title || 'Details';
                    const translatedDesc = isHindiLang ? translateWithDict(desc, 'hi') : desc;
                    content += `${dayLabel}\n${translatedDesc || ''}\n\n`;
                });
                return content.trim() || null;
                
            case 'inclusions':
                const inclusions = itinerary
                    .map(item => {
                        const text = isHindiLang ? (item.inclusion_hi || item.inclusion) : item.inclusion;
                        return isHindiLang ? translateWithDict(text, 'hi') : text;
                    })
                    .filter(text => text && text.trim())
                    .join('\n');
                return inclusions || null;
                
            case 'exclusions':
                const exclusions = itinerary
                    .map(item => {
                        const text = isHindiLang ? (item.exclusion_hi || item.exclusion) : item.exclusion;
                        return isHindiLang ? translateWithDict(text, 'hi') : text;
                    })
                    .filter(text => text && text.trim())
                    .join('\n');
                return exclusions || null;
                
            case 'notes':
                const notes = itinerary
                    .map(item => {
                        const text = isHindiLang ? (item.notes_hi || item.notes) : item.notes;
                        return isHindiLang ? translateWithDict(text, 'hi') : text;
                    })
                    .filter(text => text && text.trim())
                    .join('\n');
                return notes || null;
                
            default:
                return null;
        }
    };
    
    const content = getContent();
    const toggleLanguage = () => {
        setLanguage(language === 'hi' ? 'en' : 'hi');
    };
    
    return (
        <ItineraryTabs>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '10px' }}>
                <div className="tab-headers" style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tabLabels[tab][language]}
                        </button>
                    ))}
                </div>
                <LanguageButton onClick={toggleLanguage} lang={language}>
                    {language === 'hi' ? '🇬🇧 English' : '🇮🇳 हिंदी'}
                </LanguageButton>
            </div>
            <div className="tab-content">
                {!itinerary || itinerary.length === 0 ? (
                    <p className="no-data">No itinerary available for this yatra.</p>
                ) : content ? (
                    <p style={{ whiteSpace: 'pre-line' }}>{content}</p>
                ) : (
                    <p className="no-data">No {activeTab} available.</p>
                )}
            </div>
        </ItineraryTabs>
    );
};

// ===== TESTIMONIALS =====
const TestimonialGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
`;

const TestimonialCard = styled.div`
    background: ${colors.neutral[50]};
    border-radius: 12px;
    padding: 20px;
    border: 1px solid ${colors.neutral[200]};

    .stars {
        color: #f59e0b;
        font-size: 18px;
        margin-bottom: 8px;
    }

    .comment {
        color: ${colors.neutral[700]};
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 10px;
    }

    .customer {
        font-weight: 600;
        color: ${colors.neutral[900]};
    }
`;

// ===== TRUST BADGES =====
const TrustBadges = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin: 20px 0;

    .badge {
        display: flex;
        align-items: center;
        gap: 8px;
        background: ${colors.neutral[50]};
        padding: 8px 16px;
        border-radius: 50px;
        font-size: 13px;
        color: ${colors.neutral[700]};
        border: 1px solid ${colors.neutral[200]};

        .icon {
            font-size: 18px;
        }
    }
`;

// ===== SHARE BUTTONS =====
const ShareSection = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 10px;

    .share-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border-radius: 50px;
        border: none;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        color: #fff;

        &:hover {
            transform: translateY(-2px);
        }

        &.whatsapp { background: #25D366; }
        &.facebook { background: #1877F2; }
        &.email { background: #EA4335; }
        &.copy { background: ${colors.neutral[600]}; }
    }
`;

// ===== SIMILAR YATRAS =====
const SimilarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
`;

const SimilarCard = styled(Link)`
    background: ${colors.background.card};
    border-radius: 12px;
    overflow: hidden;
    box-shadow: ${shadows.sm};
    transition: all 0.3s ease;
    text-decoration: none;
    color: ${colors.neutral[900]};
    border: 1px solid ${colors.neutral[200]};

    &:hover {
        transform: translateY(-5px);
        box-shadow: ${shadows.lg};
    }

    .sim-image {
        height: 150px;
        background: ${colors.primary.gradient};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        color: #fff;
        opacity: 0.6;
    }

    .sim-content {
        padding: 15px;

        h4 {
            font-size: 14px;
            margin-bottom: 5px;
        }

        p {
            font-size: 12px;
            color: ${colors.neutral[600]};
        }

        .sim-price {
            font-weight: 700;
            color: ${colors.primary.main};
            margin-top: 8px;
        }
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

const NoData = styled.p`
    color: ${colors.neutral[500]};
    font-style: italic;
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
// COMPONENT
// ============================================

function YatraDetailsPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [details, setDetails] = useState({
        yatra: null,
        itinerary: [],
        testimonials: [],
        gallery: []
    });
    const [similarYatras, setSimilarYatras] = useState([]);
    const [showSticky, setShowSticky] = useState(true);
    const [selectedSharing, setSelectedSharing] = useState(null);

    useEffect(() => {
        loadDetails();
        loadSimilarYatras();
    }, [id]);

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

    const loadDetails = async () => {
        try {
            setLoading(true);
            console.log('📝 Fetching yatra details for ID:', id);
            const response = await api.get(`/yatra-details/${id}`);
            console.log('📦 API Response:', response.data);
            setDetails(response.data);
            setError(null);
        } catch (err) {
            console.error('Error loading yatra details:', err);
            setError('Failed to load yatra details');
        } finally {
            setLoading(false);
        }
    };

    const loadSimilarYatras = async () => {
        try {
            const response = await api.get('/yatras');
            const allYatras = response.data || [];
            const filtered = allYatras.filter(y => y.id !== parseInt(id)).slice(0, 4);
            setSimilarYatras(filtered);
        } catch (err) {
            console.error('Error loading similar yatras:', err);
        }
    };

    const handleShare = (platform) => {
        const url = window.location.href;
        const text = `Check out ${details.yatra?.yatra_name} on GetMeYatra!`;
        
        const shareUrls = {
            whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(text + '\n\n' + url)}`,
        };

        if (platform === 'copy') {
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard!');
            });
            return;
        }

        window.open(shareUrls[platform], '_blank', 'width=600,height=500');
    };

    if (loading) {
        return (
            <PageContainer>
                <Container>
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                        <p className="text-gray-500 mt-4">Loading details...</p>
                    </div>
                </Container>
            </PageContainer>
        );
    }

    if (error || !details.yatra) {
        return (
            <PageContainer>
                <Container>
                    <div className="text-center py-12">
                        <p className="text-red-500">{error || 'Yatra not found'}</p>
                        <Link to="/tours" className="text-indigo-500 mt-4 inline-block">
                            ← Back to Tours
                        </Link>
                    </div>
                </Container>
            </PageContainer>
        );
    }

    const { yatra, itinerary, testimonials, gallery } = details;

    const imageUrl = yatra.image_url ? `http://getmeyatra.com${yatra.image_url}` : 'http://getmeyatra.com/og-default.jpg';
    const pageUrl = `http://getmeyatra.com/yatra/${yatra.id}`;
    const pageTitle = `${yatra.yatra_name} | GetMeYatra`;
    const pageDescription = `Book ${yatra.yatra_name} with GetMeYatra. ${formatDate(yatra.start_date)} - ${formatDate(yatra.end_date)}. ₹${yatra.rate_per_seat} per seat.`;

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="GetMeYatra" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={imageUrl} />
            </Helmet>

            <PageContainer>
                <Container>
                    <BackButton to="/tours">← Back to Tours</BackButton>

                    <HeroSection>
                        <div className="hero-bg"></div>
                        {imageUrl && (
                            <div 
                                className="hero-bg-image" 
                                style={{ 
                                    backgroundImage: `url(${imageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            ></div>
                        )}
                        <div className="hero-content">
                            <h1>{yatra.yatra_name}</h1>
                            <p>
                                📅 {formatDate(yatra.start_date)} - {formatDate(yatra.end_date)}
                                {yatra.start_time && ` | 🕐 ${formatTime(yatra.start_time)}`}
                                {yatra.return_time && ` | ↩️ ${yatra.return_time}`}
                            </p>
                            <div className="price-tag">💰 ₹{yatra.rate_per_seat} / seat</div>
                            <br />
                            <Link to={`/booking?yatra=${yatra.id}`} className="book-now-hero">
                                Book Now →
                            </Link>
                        </div>
                    </HeroSection>

                    {yatra?.sharing_options && yatra.sharing_options.length > 0 && (
                        <SharingSelector>
                            <span className="label">🛏️ Sharing Type:</span>
                            <select 
                                value={selectedSharing?.sharing_type || yatra.sharing_options[0]?.sharing_type}
                                onChange={(e) => {
                                    const selected = yatra.sharing_options.find(s => s.sharing_type === e.target.value);
                                    setSelectedSharing(selected);
                                }}
                            >
                                {yatra.sharing_options.map((option) => (
                                    <option key={option.sharing_type} value={option.sharing_type}>
                                        {option.sharing_type} - ₹{option.price}/seat
                                    </option>
                                ))}
                            </select>
                            <span className="price-tag">
                                {selectedSharing ? `${selectedSharing.sharing_type}: ₹${selectedSharing.price}` : 
                                 `${yatra.sharing_options[0]?.sharing_type}: ₹${yatra.sharing_options[0]?.price}`}
                            </span>
                        </SharingSelector>
                    )}

                    <Section>
                        <SectionTitle>🎫 Seat Availability</SectionTitle>
                        <SeatAvailability>
                            <div className="seat-box total">
                                <div className="label">Total Seats</div>
                                <div className="number">{yatra.total_seats || 40}</div>
                            </div>
                            <div className="seat-box booked">
                                <div className="label">Booked Seats</div>
                                <div className="number">{yatra.booked_seats || 0}</div>
                            </div>
                            <div className="seat-box available">
                                <div className="label">Available Seats</div>
                                <div className="number">{(yatra.total_seats || 40) - (yatra.booked_seats || 0)}</div>
                            </div>
                        </SeatAvailability>
                    </Section>

                    <Section>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                            <SectionTitle style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>📤 Share</SectionTitle>
                            <ShareSection>
                                <button className="share-btn whatsapp" onClick={() => handleShare('whatsapp')}>
                                    💬 WhatsApp
                                </button>
                                <button className="share-btn facebook" onClick={() => handleShare('facebook')}>
                                    📘 Facebook
                                </button>
                                <button className="share-btn email" onClick={() => handleShare('email')}>
                                    📧 Email
                                </button>
                                <button className="share-btn copy" onClick={() => handleShare('copy')}>
                                    📋 Copy Link
                                </button>
                            </ShareSection>
                        </div>
                    </Section>

                    <TrustBadges>
                        <div className="badge"><span className="icon">✅</span> Best Price Guarantee</div>
                        <div className="badge"><span className="icon">⭐</span> 4.9/5 Rating</div>
                        <div className="badge"><span className="icon">👥</span> 1000+ Happy Travelers</div>
                        <div className="badge"><span className="icon">🛡️</span> Safety Assured</div>
                        <div className="badge"><span className="icon">💳</span> Secure Payments</div>
                    </TrustBadges>

                    <Section>
                        <SectionTitle>📸 Gallery</SectionTitle>
                        {gallery && gallery.length > 0 ? (
                            <GalleryGrid>
                                {gallery.map((img) => (
                                    <GalleryImage key={img.id}>
                                        <img 
                                            src={`http://getmeyatra.com${img.image_url}`}
                                            alt={img.caption || 'Gallery image'}
                                            onError={(e) => { e.target.src = ''; }}
                                        />
                                        {img.caption && <div className="caption">{img.caption}</div>}
                                    </GalleryImage>
                                ))}
                            </GalleryGrid>
                        ) : (
                            <NoData>No images available for this yatra.</NoData>
                        )}
                    </Section>

                    <Section>
                        <SectionTitle>🗺️ Itinerary</SectionTitle>
                        {itinerary && itinerary.length > 0 ? (
                            <ItineraryTabView itinerary={itinerary} />
                        ) : yatra?.description ? (
                            <DescriptionBox>
                                {yatra.description.split('\n').map((line, index) => {
                                    const trimmed = line.trim();
                                    if (!trimmed) return <br key={index} />;
                                    const isHeader = trimmed.match(/^[🌟📌🏷️✅❌📋]/) || trimmed === trimmed.toUpperCase();
                                    return (
                                        <p key={index} style={isHeader ? { fontWeight: 700, fontSize: '15px', marginTop: '8px' } : {}}>
                                            {trimmed}
                                        </p>
                                    );
                                })}
                            </DescriptionBox>
                        ) : (
                            <p style={{ color: colors.neutral[500], fontStyle: 'italic' }}>
                                No itinerary available for this tour.
                            </p>
                        )}
                    </Section>

                    <Section>
                        <SectionTitle>⭐ Testimonials</SectionTitle>
                        {testimonials && testimonials.length > 0 ? (
                            <TestimonialGrid>
                                {testimonials.map((testimonial) => (
                                    <TestimonialCard key={testimonial.id}>
                                        <div className="stars">
                                            {'⭐'.repeat(Math.min(testimonial.rating || 5, 5))}
                                        </div>
                                        <div className="comment">"{testimonial.comment}"</div>
                                        <div className="customer">- {testimonial.customer_name}</div>
                                    </TestimonialCard>
                                ))}
                            </TestimonialGrid>
                        ) : (
                            <NoData>No testimonials available for this yatra.</NoData>
                        )}
                    </Section>

                    {similarYatras.length > 0 && (
                        <Section>
                            <SectionTitle>🔄 Similar Yatras</SectionTitle>
                            <SimilarGrid>
                                {similarYatras.map((y) => (
                                    <SimilarCard key={y.id} to={`/yatra/${y.id}`}>
                                        <div className="sim-image">🏔️</div>
                                        <div className="sim-content">
                                            <h4>{y.yatra_name}</h4>
                                            <p>{formatDate(y.start_date)} - {formatDate(y.end_date)}</p>
                                            <div className="sim-price">₹{y.rate_per_seat} / seat</div>
                                        </div>
                                    </SimilarCard>
                                ))}
                            </SimilarGrid>
                        </Section>
                    )}

                    <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '40px' }}>
                        <Link 
                            to={`/booking?yatra=${yatra.id}`}
                            style={{
                                display: 'inline-block',
                                padding: '16px 48px',
                                background: colors.primary.gradient,
                                color: '#fff',
                                borderRadius: '50px',
                                fontWeight: 700,
                                fontSize: '18px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 20px rgba(79, 70, 229, 0.4)'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = 'translateY(-3px)';
                                e.target.style.boxShadow = '0 8px 30px rgba(79, 70, 229, 0.5)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 20px rgba(79, 70, 229, 0.4)';
                            }}
                        >
                            📋 Book Now → ₹{selectedSharing ? selectedSharing.price : yatra.rate_per_seat}
                        </Link>
                    </div>
                </Container>
            </PageContainer>

            <WhatsAppButton 
                href={`https://wa.me/918010320000?text=Hi%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(yatra.yatra_name)}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                💬 Chat with us
            </WhatsAppButton>

            {showSticky && (
                <StickyBar>
                    <div className="sticky-info">
                        <span className="sticky-price">₹{selectedSharing ? selectedSharing.price : yatra.rate_per_seat}</span>
                        <span className="sticky-name">| {yatra.yatra_name}</span>
                    </div>
                    <Link to={`/booking?yatra=${yatra.id}`} className="sticky-btn">
                        Book Now →
                    </Link>
                </StickyBar>
            )}
        </>
    );
}

export default YatraDetailsPage;
