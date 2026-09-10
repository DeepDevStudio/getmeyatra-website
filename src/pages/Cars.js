import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, breakpoints } from '../styles/theme';

// ============================================
// TRANSLATION DICTIONARY
// ============================================

const translations = {
    'Premium Fleet': 'प्रीमियम फ्लीट',
    'Choose Your Perfect Ride': 'अपनी सही सवारी चुनें',
    'From luxury sedans to spacious vans': 'लक्जरी सेडान से विशाल वैन तक',
    'Filter Vehicles': 'वाहन फ़िल्टर करें',
    'Search vehicles...': 'वाहन खोजें...',
    'No vehicles found': 'कोई वाहन नहीं मिला',
    'Try adjusting your filters': 'अपने फ़िल्टर समायोजित करें',
    'Special Demand': 'विशेष मांग',
    'Luxury Vehicles on Special Demand': 'विशेष मांग पर लक्जरी वाहन',
    'Request Now': 'अभी अनुरोध करें',
    'Contact Us': 'संपर्क करें',
    'Need a Custom Vehicle?': 'एक कस्टम वाहन की आवश्यकता है?',
    'All Vehicles': 'सभी वाहन',
    'Luxury': 'लक्जरी',
    'Family': 'परिवार',
    'Sedan': 'सेडान',
    'Special Demand': 'विशेष मांग',
    'Seats': 'सीटें',
    'Bags': 'बैग',
    'AC': 'एसी',
    'Non-AC': 'गैर-एसी',
    'per km': 'प्रति किमी',
    'Min charge': 'न्यूनतम शुल्क',
};

const translateText = (text, targetLang) => {
    if (!text) return text;
    if (targetLang === 'en') return text;
    return translations[text] || text;
};

// ============================================
// STYLED COMPONENTS
// ============================================

const PageContainer = styled.div`
  padding-top: 0;
  background: ${colors.background.main};
`;

// ============================================
// SCROLL PROGRESS BAR
// ============================================

const ScrollProgress = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #4F46E5, #7C3AED, #EC4899);
    z-index: 9999;
    width: ${props => props.progress}%;
    transition: width 0.1s ease;
`;

// ============================================
// LANGUAGE TOGGLE
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
    margin-bottom: 20px;
    margin-left: auto;
    display: block;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.2);
    }
`;

// ============================================
// HERO SECTION - Premium Dark
// ============================================

const HeroSection = styled.section`
  padding: 160px 0 60px;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(79,70,229,0.12), transparent 70%);
    border-radius: 50%;
    animation: float 12s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -40%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(236,72,153,0.06), transparent 70%);
    border-radius: 50%;
    animation: float 15s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(40px, -30px) scale(1.1); }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const HeroBadge = styled.span`
  display: inline-block;
  padding: 8px 24px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 50px;
  color: rgba(255,255,255,0.8);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  backdrop-filter: blur(10px);
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 20px;
  line-height: 1.2;
  letter-spacing: -0.5px;

  .highlight {
    background: linear-gradient(135deg, #818CF8, #C084FC, #F472B6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255,255,255,0.7);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
`;

// ============================================
// SECTION
// ============================================

const Section = styled.section`
  padding: 60px 0 80px;
  background: ${({ bg }) => bg || '#fff'};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

// ============================================
// FILTER SECTION - Premium
// ============================================

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  padding: 20px 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  border: 1px solid rgba(255,255,255,0.3);
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterTitle = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: ${colors.neutral[700]};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FilterButton = styled.button`
  padding: 6px 18px;
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
    border-color: ${props => props.active ? colors.primary.main : colors.primary.main};
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${colors.neutral[50]};
  border-radius: 50px;
  padding: 4px 16px 4px 12px;
  border: 2px solid ${colors.neutral[200]};
  transition: all 0.3s ease;

  &:focus-within {
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  input {
    border: none;
    outline: none;
    padding: 8px 0;
    font-size: 14px;
    background: transparent;
    color: ${colors.neutral[700]};
    min-width: 140px;

    &::placeholder {
      color: ${colors.neutral[400]};
    }
  }

  i {
    color: ${colors.neutral[400]};
  }
`;

// ============================================
// CAB GRID - Premium Cards
// ============================================

const CabGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
  margin-top: 20px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CabCard = styled.div`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  border: 1px solid rgba(255,255,255,0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.08);
    border-color: ${colors.primary.main};
    
    .cab-image img {
      transform: scale(1.05);
    }
  }
`;

const CabImage = styled.div`
  height: 200px;
  background: ${colors.primary.gradient};
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const CabBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  background: ${props => props.color || colors.primary.gradient};
  letter-spacing: 0.5px;
  backdrop-filter: blur(4px);
`;

const CabSpecial = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  background: linear-gradient(135deg, #F59E0B, #D97706);
  color: #fff;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
`;

const CabContent = styled.div`
  padding: 20px 24px 24px;
`;

const CabTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${colors.neutral[900]};
  margin-bottom: 2px;
`;

const CabSubtitle = styled.p`
  font-size: 13px;
  color: ${colors.neutral[500]};
  margin-bottom: 12px;
`;

const CabSpecs = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: ${colors.neutral[600]};
  margin-bottom: 10px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  i {
    color: ${colors.primary.main};
  }
`;

const CabFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;

  span {
    font-size: 12px;
    color: ${colors.neutral[600]};
    background: ${colors.neutral[50]};
    padding: 2px 12px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 4px;

    i {
      color: ${colors.primary.main};
      font-size: 10px;
    }
  }
`;

const CabFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  border-top: 1px solid ${colors.neutral[100]};
  flex-wrap: wrap;
  gap: 10px;
`;

const CabPrice = styled.div`
  .amount {
    font-size: 1.4rem;
    font-weight: 800;
    color: ${colors.primary.main};
  }

  .per-km {
    font-size: 13px;
    color: ${colors.neutral[500]};
  }

  .min-charge {
    display: block;
    font-size: 12px;
    color: ${colors.neutral[400]};
  }
`;

const BookBtn = styled(Link)`
  padding: 8px 24px;
  background: ${colors.primary.gradient};
  color: #fff;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 15px rgba(79,70,229,0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(79,70,229,0.3);
  }
`;

// ============================================
// SPECIAL SECTION - Premium
// ============================================

const SpecialSection = styled.section`
  padding: 60px 0;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(79,70,229,0.1), transparent 70%);
    border-radius: 50%;
  }
`;

const SpecialContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;

  h2 {
    font-size: 2.2rem;
    font-weight: 800;
    margin-bottom: 12px;

    .highlight {
      background: linear-gradient(135deg, #F59E0B, #FBBF24);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: inline-block;
    }
  }

  p {
    opacity: 0.7;
    max-width: 600px;
    margin: 0 auto 32px;
    font-size: 16px;
    line-height: 1.8;
  }
`;

const SpecialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const SpecialCard = styled.div`
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 28px 24px;
  text-align: center;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-6px);
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.15);
  }

  .icon {
    font-size: 44px;
    display: block;
    margin-bottom: 12px;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 4px;
  }

  p {
    color: rgba(255,255,255,0.6);
    font-size: 14px;
    margin-bottom: 8px;
  }

  .price {
    font-size: 1.2rem;
    font-weight: 700;
    color: #FBBF24;
    display: block;
    margin-bottom: 12px;
  }
`;

const SpecialBtn = styled(Link)`
  display: inline-block;
  padding: 10px 28px;
  background: linear-gradient(135deg, #F59E0B, #D97706);
  color: #fff;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(245,158,11,0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(245,158,11,0.3);
  }
`;

// ============================================
// CTA SECTION - Premium
// ============================================

const CTASection = styled.section`
  padding: 60px 0;
  background: ${colors.background.card};
`;

const CTAContent = styled.div`
  text-align: center;

  h2 {
    font-size: 2rem;
    font-weight: 800;
    color: ${colors.neutral[900]};
    margin-bottom: 12px;

    .gradient-text {
      background: ${colors.primary.gradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  p {
    color: ${colors.neutral[500]};
    max-width: 600px;
    margin: 0 auto 24px;
    font-size: 16px;
    line-height: 1.8;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 14px 44px;
  background: ${colors.primary.gradient};
  color: #fff;
  border-radius: 50px;
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(79,70,229,0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(79,70,229,0.4);
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
// COMPONENT
// ============================================

function Cars() {
    const [language, setLanguage] = useState('en');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const t = (text) => translateText(text, language);

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

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    const cabData = [
        {
            id: 1,
            name: "Toyota Innova Crysta",
            subtitle: "Spacious Family SUV with Premium Comfort",
            image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=500",
            badge: "Premium",
            badgeColor: colors.primary.gradient,
            seats: 7,
            bags: 4,
            ac: true,
            features: ["Premium", "Spacious", "AC", "Push Back"],
            price: 20,
            minCharge: 2800,
            category: "family"
        },
        {
            id: 2,
            name: "Toyota Fortuner",
            subtitle: "Premium SUV with Power and Style",
            image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500",
            badge: "Premium",
            badgeColor: colors.primary.gradient,
            seats: 7,
            bags: 3,
            ac: true,
            features: ["Premium", "SUV", "4x4", "Luxury"],
            price: 30,
            minCharge: 3500,
            category: "luxury"
        },
        {
            id: 3,
            name: "Swift Dzire",
            subtitle: "Comfortable Sedan for Daily Commute",
            image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500",
            badge: "Best Seller",
            badgeColor: "linear-gradient(135deg, #22C55E, #16A34A)",
            seats: 4,
            bags: 2,
            ac: true,
            features: ["AC", "Comfortable", "Fuel Efficient"],
            price: 11,
            minCharge: 2000,
            category: "sedan"
        },
        {
            id: 4,
            name: "Mercedes Benz E-Class",
            subtitle: "Executive Luxury Sedan with Driver",
            image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500",
            badge: "Executive",
            badgeColor: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
            seats: 4,
            bags: 2,
            ac: true,
            features: ["Executive", "Premium Leather", "Ambient Lighting", "Chauffeur"],
            price: 48,
            minCharge: 2800,
            category: "special-demand",
            special: true,
            isSpecialDemand: true
        }
    ];

    const categories = [
        { id: 'all', label: t('All Vehicles') },
        { id: 'luxury', label: '💎 ' + t('Luxury') },
        { id: 'family', label: '👨‍👩‍👧‍👦 ' + t('Family') },
        { id: 'sedan', label: '🚗 ' + t('Sedan') },
        { id: 'special-demand', label: '⭐ ' + t('Special Demand') }
    ];

    const filteredCabs = cabData.filter(cab => {
        const matchesFilter = filter === 'all' || cab.category === filter;
        const matchesSearch = cab.name.toLowerCase().includes(search.toLowerCase()) ||
                            cab.subtitle.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const specialCabs = cabData.filter(cab => cab.isSpecialDemand);

    return (
        <PageContainer>
            <ScrollProgress progress={scrollProgress} />

            {/* ===== HERO SECTION ===== */}
            <HeroSection>
                <HeroContent>
                    <HeroBadge>🚗 {t('Premium Fleet')}</HeroBadge>
                    <HeroTitle>
                        {t('Choose Your')} <span className="highlight">{t('Perfect Ride')}</span>
                    </HeroTitle>
                    <HeroSubtitle>
                        {t('From luxury sedans to spacious vans')}
                    </HeroSubtitle>
                </HeroContent>
            </HeroSection>

            {/* ===== MAIN SECTION ===== */}
            <Section bg={colors.background.main}>
                <Container>
                    <LanguageToggle lang={language} onClick={toggleLanguage}>
                        {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
                    </LanguageToggle>

                    {/* Filter Section */}
                    <FilterSection>
                        <FilterTitle>
                            <i className="fas fa-sliders-h"></i> {t('Filter Vehicles')}
                        </FilterTitle>
                        <FilterGroup>
                            {categories.map(cat => (
                                <FilterButton
                                    key={cat.id}
                                    active={filter === cat.id}
                                    onClick={() => setFilter(cat.id)}
                                >
                                    {cat.label}
                                </FilterButton>
                            ))}
                        </FilterGroup>
                        <SearchBox>
                            <i className="fas fa-search"></i>
                            <input
                                type="text"
                                placeholder={t('Search vehicles...')}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </SearchBox>
                    </FilterSection>

                    <div style={{ 
                        marginBottom: '20px', 
                        color: colors.neutral[500], 
                        fontSize: '14px',
                        textAlign: 'center'
                    }}>
                        Showing {filteredCabs.length} vehicle{filteredCabs.length !== 1 ? 's' : ''}
                    </div>

                    {/* Cab Grid */}
                    <CabGrid>
                        {filteredCabs.map((cab) => (
                            <CabCard key={cab.id}>
                                <CabImage className="cab-image">
                                    <img src={cab.image} alt={cab.name} />
                                    <CabBadge color={cab.badgeColor}>{cab.badge}</CabBadge>
                                    {cab.isSpecialDemand && (
                                        <CabSpecial>⭐ {t('Special Demand')}</CabSpecial>
                                    )}
                                </CabImage>
                                <CabContent>
                                    <CabTitle>{cab.name}</CabTitle>
                                    <CabSubtitle>{cab.subtitle}</CabSubtitle>
                                    <CabSpecs>
                                        <span><i className="fas fa-users"></i> {cab.seats} {t('Seats')}</span>
                                        <span><i className="fas fa-suitcase"></i> {cab.bags} {t('Bags')}</span>
                                        <span><i className="fas fa-snowflake"></i> {cab.ac ? t('AC') : t('Non-AC')}</span>
                                    </CabSpecs>
                                    <CabFeatures>
                                        {cab.features.map((feature, idx) => (
                                            <span key={idx}>
                                                <i className="fas fa-check-circle"></i> {feature}
                                            </span>
                                        ))}
                                    </CabFeatures>
                                    <CabFooter>
                                        <CabPrice>
                                            <div>
                                                <span className="amount">₹{cab.price}</span>
                                                <span className="per-km"> / km</span>
                                            </div>
                                            <span className="min-charge">{t('Min charge')} {cab.minCharge} km</span>
                                        </CabPrice>
                                        <BookBtn to="/contact">
                                            {t('Book Now')} <i className="fas fa-arrow-right"></i>
                                        </BookBtn>
                                    </CabFooter>
                                </CabContent>
                            </CabCard>
                        ))}
                    </CabGrid>

                    {filteredCabs.length === 0 && (
                        <div style={{
                            textAlign: 'center',
                            padding: '60px 20px',
                            color: colors.neutral[500]
                        }}>
                            <i className="fas fa-search" style={{ fontSize: '48px', marginBottom: '20px', color: colors.primary.main }}></i>
                            <h3 style={{ color: colors.neutral[700], marginBottom: '10px' }}>{t('No vehicles found')}</h3>
                            <p>{t('Try adjusting your filters or search terms')}</p>
                        </div>
                    )}
                </Container>
            </Section>

            {/* ===== SPECIAL DEMAND SECTION ===== */}
            <SpecialSection>
                <Container>
                    <SpecialContent>
                        <h2>⭐ {t('Luxury Vehicles on')} <span className="highlight">{t('Special Demand')}</span></h2>
                        <p>
                            Experience the ultimate luxury with our premium vehicles available on special request.
                            Perfect for VIP events, weddings, corporate travel, and special occasions.
                        </p>
                        <SpecialGrid>
                            {specialCabs.map((cab) => (
                                <SpecialCard key={cab.id}>
                                    <span className="icon">🚗</span>
                                    <h4>{cab.name}</h4>
                                    <p>{cab.subtitle}</p>
                                    <span className="price">₹{cab.price}/km</span>
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
                                        {cab.features.map((feature, idx) => (
                                            <span key={idx} style={{ 
                                                fontSize: '11px', 
                                                color: 'rgba(255,255,255,0.5)',
                                                background: 'rgba(255,255,255,0.05)',
                                                padding: '2px 12px',
                                                borderRadius: '50px'
                                            }}>
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                    <SpecialBtn to="/contact">{t('Request Now')} <i className="fas fa-arrow-right"></i></SpecialBtn>
                                </SpecialCard>
                            ))}
                        </SpecialGrid>
                    </SpecialContent>
                </Container>
            </SpecialSection>

            {/* ===== CTA SECTION ===== */}
            <CTASection>
                <Container>
                    <CTAContent>
                        <h2>{t('Need a')} <span className="gradient-text">{t('Custom Vehicle')}</span>?</h2>
                        <p>
                            Don't see what you're looking for? We have a wide range of vehicles available.
                            Contact us for special requests and custom requirements.
                        </p>
                        <CTAButton to="/contact">{t('Contact Us')} <i className="fas fa-arrow-right"></i></CTAButton>
                    </CTAContent>
                </Container>
            </CTASection>

            {/* ===== FLOATING WHATSAPP ===== */}
            <FloatingWhatsApp
                href="https://wa.me/918010320000?text=Hi%20I%20want%20to%20know%20more%20about%20your%20car%20rentals"
                target="_blank"
                rel="noopener noreferrer"
            >
                💬
            </FloatingWhatsApp>
        </PageContainer>
    );
}

export default Cars;
