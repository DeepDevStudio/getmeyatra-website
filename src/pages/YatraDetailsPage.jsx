import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { colors, shadows, breakpoints } from '../styles/theme';
import api from '../services/api';

// ============================================
// TRANSLATION DICTIONARY (Hindi ↔ English)
// ============================================

const translations = {
    'Back to Tours': 'यात्राओं पर वापस जाएँ',
    'Book Now': 'अभी बुक करें',
    'View Details': 'विवरण देखें',
    'Share': 'साझा करें',
    'Best Price Guarantee': 'सर्वोत्तम मूल्य गारंटी',
    'Happy Travelers': 'खुश यात्री',
    'Safety Assured': 'सुरक्षा सुनिश्चित',
    'Secure Payments': 'सुरक्षित भुगतान',
    'Pickup Points': 'पिकअप पॉइंट',
    'Tour Highlights': 'यात्रा की विशेषताएँ',
    'Inclusions': 'शामिल सेवाएँ',
    'Exclusions': 'शामिल नहीं',
    'Notes': 'महत्वपूर्ण सुझाव',
    'Itinerary': 'यात्रा कार्यक्रम',
    'Gallery': 'गैलरी',
    'Testimonials': 'प्रशंसापत्र',
    'Similar Yatras': 'समान यात्राएँ',
    'Loading details...': 'विवरण लोड हो रहा है...',
    'Retry': 'पुनः प्रयास करें',
    'Contact': 'संपर्क करें',
    'Yatra not found': 'यात्रा नहीं मिली',
    'Failed to load yatra details': 'यात्रा विवरण लोड करने में विफल',
    'No images available for this yatra.': 'इस यात्रा के लिए कोई छवियाँ उपलब्ध नहीं हैं।',
    'No itinerary available for this tour.': 'इस यात्रा के लिए कोई यात्रा कार्यक्रम उपलब्ध नहीं है।',
    'No testimonials available for this yatra.': 'इस यात्रा के लिए कोई प्रशंसापत्र उपलब्ध नहीं है।',
    'Chat with us': 'हमसे चैट करें',
    'Total Seats': 'कुल सीटें',
    'Booked Seats': 'बुक की गई सीटें',
    'Available Seats': 'उपलब्ध सीटें',
    'Seat Availability': 'सीट उपलब्धता',
};

const translateText = (text, targetLang) => {
    if (!text) return text;
    if (targetLang === 'en') return text;
    return translations[text] || text;
};

// ============================================
// STYLED COMPONENTS
// ============================================

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

const PageContainer = styled.div`
  padding-top: 160px;
  padding-bottom: 100px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9edf5 100%);
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
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.08);
  border: 1px solid rgba(255,255,255,0.3);
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

// ===== SEAT AVAILABILITY =====
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

// ===== ITINERARY TAB VIEW COMPONENT WITH TRANSLATION TOGGLE =====
const ItineraryTabView = ({ itinerary, language }) => {
    const [activeTab, setActiveTab] = useState('itinerary');
    
    const tabs = ['itinerary', 'inclusions', 'exclusions', 'notes'];
    const tabLabels = {
        itinerary: { hi: '📅 यात्रा कार्यक्रम', en: '📅 Itinerary' },
        inclusions: { hi: '✅ शामिल सेवाएँ', en: '✅ Inclusions' },
        exclusions: { hi: '❌ शामिल नहीं', en: '❌ Exclusions' },
        notes: { hi: '📝 महत्वपूर्ण सुझाव', en: '📝 Notes' }
    };
    
    const getContent = () => {
        if (!itinerary || itinerary.length === 0) return null;
        
        const isHindi = language === 'hi';
        
        switch(activeTab) {
            case 'itinerary':
                let content = '';
                itinerary.forEach(item => {
                    const desc = isHindi ? (item.description_hi || item.description) : item.description;
                    const dayLabel = item.day_number ? `Day ${item.day_number}: ${item.title}` : item.title || 'Details';
                    content += `${dayLabel}\n${desc || ''}\n\n`;
                });
                return content.trim() || null;
                
            case 'inclusions':
                const inclusions = itinerary
                    .map(item => isHindi ? (item.inclusion_hi || item.inclusion) : item.inclusion)
                    .filter(text => text && text.trim())
                    .join('\n');
                return inclusions || null;
                
            case 'exclusions':
                const exclusions = itinerary
                    .map(item => isHindi ? (item.exclusion_hi || item.exclusion) : item.exclusion)
                    .filter(text => text && text.trim())
                    .join('\n');
                return exclusions || null;
                
            case 'notes':
                const notes = itinerary
                    .map(item => isHindi ? (item.notes_hi || item.notes) : item.notes)
                    .filter(text => text && text.trim())
                    .join('\n');
                return notes || null;
                
            default:
                return null;
        }
    };
    
    const content = getContent();
    
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
    background: rgba(255,255,255,0.8);
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
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
  text-decoration: none;
  color: ${colors.neutral[900]};
  border: 1px solid ${colors.neutral[200]};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.1);
    border-color: ${colors.primary.main};
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
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
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

// ===== WHATSAPP BUTTON =====
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

// ============================================
// SHARING TYPE SELECTOR
// ============================================
const SharingSelector = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
    padding: 16px 24px;
    border-radius: 16px;
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
    const [language, setLanguage] = useState('en');

    const t = (text) => translateText(text, language);

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

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    const loadDetails = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/yatra-details/${id}`);
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
                    <LoadingSpinner>
                        <div className="spinner"></div>
                        <p>{t('Loading details...')}</p>
                    </LoadingSpinner>
                </Container>
            </PageContainer>
        );
    }

    if (error || !details.yatra) {
        return (
            <PageContainer>
                <Container>
                    <ErrorBox>
                        <h2>❌ {t(error || 'Yatra not found')}</h2>
                        <Link to="/tours" className="text-indigo-500 mt-4 inline-block" style={{ color: colors.primary.main, fontWeight: 600, textDecoration: 'none' }}>
                            ← {t('Back to Tours')}
                        </Link>
                    </ErrorBox>
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
                    <LanguageToggle lang={language} onClick={toggleLanguage}>
                        {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
                    </LanguageToggle>

                    <BackButton to="/tours">← {t('Back to Tours')}</BackButton>

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
                                {t('Book Now')} →
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
                        <SectionTitle>🎫 {t('Seat Availability')}</SectionTitle>
                        <SeatAvailability>
                            <div className="seat-box total">
                                <div className="label">{t('Total Seats')}</div>
                                <div className="number">{yatra.total_seats || 40}</div>
                            </div>
                            <div className="seat-box booked">
                                <div className="label">{t('Booked Seats')}</div>
                                <div className="number">{yatra.booked_seats || 0}</div>
                            </div>
                            <div className="seat-box available">
                                <div className="label">{t('Available Seats')}</div>
                                <div className="number">{(yatra.total_seats || 40) - (yatra.booked_seats || 0)}</div>
                            </div>
                        </SeatAvailability>
                    </Section>

                    <Section>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                            <SectionTitle style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>📤 {t('Share')}</SectionTitle>
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
                        <div className="badge"><span className="icon">✅</span> {t('Best Price Guarantee')}</div>
                        <div className="badge"><span className="icon">⭐</span> 4.9/5 Rating</div>
                        <div className="badge"><span className="icon">👥</span> 1000+ {t('Happy Travelers')}</div>
                        <div className="badge"><span className="icon">🛡️</span> {t('Safety Assured')}</div>
                        <div className="badge"><span className="icon">💳</span> {t('Secure Payments')}</div>
                    </TrustBadges>

                    <Section>
                        <SectionTitle>📸 {t('Gallery')}</SectionTitle>
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
                            <NoData>{t('No images available for this yatra.')}</NoData>
                        )}
                    </Section>

                    <Section>
                        <SectionTitle>🗺️ {t('Itinerary')}</SectionTitle>
                        {itinerary && itinerary.length > 0 ? (
                            <ItineraryTabView itinerary={itinerary} language={language} />
                        ) : yatra?.description ? (
                            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
                                {yatra.description.split('\n').map((line, index) => {
                                    const trimmed = line.trim();
                                    if (!trimmed) return <br key={index} />;
                                    const isHeader = trimmed.match(/^[🌟📌🏷️✅❌📋]/) || trimmed === trimmed.toUpperCase();
                                    return (
                                        <p key={index} style={isHeader ? { fontWeight: 700, fontSize: '15px', marginTop: '8px' } : { margin: '4px 0' }}>
                                            {trimmed}
                                        </p>
                                    );
                                })}
                            </div>
                        ) : (
                            <NoData>{t('No itinerary available for this tour.')}</NoData>
                        )}
                    </Section>

                    <Section>
                        <SectionTitle>⭐ {t('Testimonials')}</SectionTitle>
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
                            <NoData>{t('No testimonials available for this yatra.')}</NoData>
                        )}
                    </Section>

                    {similarYatras.length > 0 && (
                        <Section>
                            <SectionTitle>🔄 {t('Similar Yatras')}</SectionTitle>
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
                            📋 {t('Book Now')} → ₹{selectedSharing ? selectedSharing.price : yatra.rate_per_seat}
                        </Link>
                    </div>
                </Container>
            </PageContainer>

            <WhatsAppButton 
                href={`https://wa.me/918010320000?text=Hi%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(yatra.yatra_name)}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                💬 {t('Chat with us')}
            </WhatsAppButton>

            {showSticky && (
                <StickyBar>
                    <div className="sticky-info">
                        <span className="sticky-price">₹{selectedSharing ? selectedSharing.price : yatra.rate_per_seat}</span>
                        <span className="sticky-name">| {yatra.yatra_name}</span>
                    </div>
                    <Link to={`/booking?yatra=${yatra.id}`} className="sticky-btn">
                        {t('Book Now')} →
                    </Link>
                </StickyBar>
            )}
        </>
    );
}

export default YatraDetailsPage;
