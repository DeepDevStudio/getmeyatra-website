import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getYatras } from '../services/api';
import { colors, shadows, breakpoints } from '../styles/theme';

// ============================================
// TRANSLATION DICTIONARY
// ============================================

const translations = {
    'About GetMeYatra': 'GetMeYatra के बारे में',
    'Your trusted travel partner for spiritual journeys across India': 'भारत भर में आध्यात्मिक यात्राओं के लिए आपका विश्वसनीय यात्रा साथी',
    'Our Story': 'हमारी कहानी',
    'From a small dream to a trusted travel partner': 'एक छोटे से सपने से एक विश्वसनीय यात्रा साथी तक',
    'Our Impact': 'हमारा प्रभाव',
    'Numbers that tell our story': 'संख्याएं जो हमारी कहानी बताती हैं',
    'Happy Travelers': 'खुश यात्री',
    'Destinations': 'गंतव्य',
    'Customized Tours': 'अनुकूलित यात्राएँ',
    'Satisfaction Rate': 'संतुष्टि दर',
    'Why Choose Us': 'हमें क्यों चुनें',
    'What makes us different': 'हमें क्या अलग बनाता है',
    'Spiritual Expertise': 'आध्यात्मिक विशेषज्ञता',
    'Deep knowledge of pilgrimage routes': 'तीर्थ मार्गों की गहरी जानकारी',
    'Premium Fleet': 'प्रीमियम वाहन',
    'Wide range of vehicles': 'हर समूह के लिए वाहनों की विस्तृत श्रृंखला',
    'Best Price Guarantee': 'सर्वोत्तम मूल्य गारंटी',
    'Competitive pricing with transparent billing': 'प्रतिस्पर्धी मूल्य निर्धारण और पारदर्शी बिलिंग',
    '5-Star Service': '5-स्टार सेवा',
    'Personalized attention and exceptional care': 'व्यक्तिगत ध्यान और असाधारण देखभाल',
    'Pan India Network': 'पूरे भारत में नेटवर्क',
    'Extensive presence across India': 'भारत भर में व्यापक उपस्थिति',
    'Safety First': 'सुरक्षा पहले',
    'Well-maintained vehicles and trained drivers': 'अच्छी तरह से रखरखाव वाले वाहन और प्रशिक्षित ड्राइवर',
    'Our Team': 'हमारी टीम',
    'The people behind your journeys': 'आपकी यात्राओं के पीछे के लोग',
    'Ready for Your Next Journey?': 'अपनी अगली यात्रा के लिए तैयार हैं?',
    'Experience the divine and scenic beauty of India': 'भारत की दिव्य और सुंदरता का अनुभव करें',
    'Explore Tours': 'यात्राएं देखें',
    'Co-Founder & CEO': 'सह-संस्थापक और सीईओ',
    'Co-Founder & Director': 'सह-संस्थापक और निदेशक',
    'Senior Developer': 'वरिष्ठ डेवलपर',
    'Developer': 'डेवलपर',
    'Team Member': 'टीम सदस्य',
    'Our Mission': 'हमारा मिशन',
    'Our Vision': 'हमारा दृष्टिकोण',
    'Our Values': 'हमारे मूल्य',
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
  padding-top: 160px;
  padding-bottom: 60px;
  background: linear-gradient(135deg, #f8fafc 0%, #eef2f7 100%);
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
// HERO SECTION - Premium Dark Gradient
// ============================================

const HeroSection = styled.div`
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  border-radius: 24px;
  padding: 70px 50px;
  color: #fff;
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(79,70,229,0.15), transparent 70%);
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
    background: radial-gradient(circle, rgba(236,72,153,0.08), transparent 70%);
    border-radius: 50%;
    animation: float 15s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(40px, -30px) scale(1.1); }
  }

  .hero-badge {
    display: inline-block;
    padding: 6px 24px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 50px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 20px;
    backdrop-filter: blur(10px);
    position: relative;
    z-index: 1;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 900;
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
    letter-spacing: -0.5px;
    
    .gradient-text {
      background: linear-gradient(135deg, #818CF8, #C084FC, #F472B6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  p {
    font-size: 1.2rem;
    opacity: 0.85;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.8;
    position: relative;
    z-index: 1;
    color: rgba(255,255,255,0.85);
  }

  .hero-stats-mini {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 30px;
    position: relative;
    z-index: 1;
    flex-wrap: wrap;

    .mini-stat {
      text-align: center;

      .number {
        font-size: 1.8rem;
        font-weight: 800;
        background: linear-gradient(135deg, #fff, rgba(255,255,255,0.7));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .label {
        font-size: 12px;
        color: rgba(255,255,255,0.6);
        margin-top: 2px;
      }
    }
  }

  @media (max-width: ${breakpoints.md}) {
    padding: 40px 24px;
    h1 { font-size: 2.2rem; }
    p { font-size: 1rem; }
    .hero-stats-mini { gap: 20px; }
  }
`;

// ============================================
// SECTION HEADER
// ============================================

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;

  .section-tag {
    display: inline-block;
    padding: 4px 18px;
    background: rgba(79,70,229,0.08);
    color: ${colors.primary.main};
    border-radius: 50px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }

  h2 {
    font-size: 2.2rem;
    font-weight: 800;
    color: ${colors.neutral[900]};
    margin-bottom: 4px;
    letter-spacing: -0.5px;

    .gradient-text {
      background: linear-gradient(135deg, #4F46E5, #7C3AED);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  p {
    color: ${colors.neutral[500]};
    font-size: 1.05rem;
  }

  @media (max-width: ${breakpoints.md}) {
    h2 { font-size: 1.6rem; }
  }
`;

const Section = styled.div`
  margin-bottom: 60px;
`;

// ============================================
// MISSION & VISION CARDS
// ============================================

const MissionVisionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 40px;

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const MissionCard = styled.div`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 32px 28px;
  border: 1px solid rgba(255,255,255,0.3);
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.08);
  }

  .card-icon {
    font-size: 40px;
    display: block;
    margin-bottom: 12px;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: ${colors.neutral[900]};
    margin-bottom: 8px;
  }

  p {
    color: ${colors.neutral[600]};
    font-size: 15px;
    line-height: 1.7;
  }
`;

// ============================================
// OUR STORY
// ============================================

const StoryWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid rgba(255,255,255,0.3);
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);

  .story-text {
    p {
      color: ${colors.neutral[600]};
      line-height: 1.9;
      margin-bottom: 14px;
      font-size: 1rem;
    }

    .highlight-text {
      font-size: 1.05rem;
      font-weight: 600;
      color: ${colors.primary.main};
      padding: 16px 20px;
      background: rgba(79,70,229,0.05);
      border-radius: 12px;
      border-left: 4px solid ${colors.primary.main};
      margin-top: 16px;
    }

    .story-timeline {
      display: flex;
      gap: 16px;
      margin-top: 20px;
      flex-wrap: wrap;

      .milestone {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        color: ${colors.neutral[600]};
        background: ${colors.neutral[50]};
        padding: 6px 16px;
        border-radius: 50px;

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${colors.primary.main};
        }
      }
    }
  }

  .story-image {
    background: linear-gradient(135deg, #4F46E5, #7C3AED);
    border-radius: 16px;
    height: 340px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 100px;
    color: #fff;
    opacity: 0.85;
    position: relative;
    overflow: hidden;

    &::after {
      content: '✨';
      position: absolute;
      font-size: 40px;
      top: 25px;
      right: 35px;
      opacity: 0.5;
      animation: sparkle 3s ease-in-out infinite;
    }

    .floating-icons {
      position: absolute;
      font-size: 30px;
      animation: floatIcon 6s ease-in-out infinite;
    }

    .floating-icons:nth-child(2) { top: 20%; left: 15%; animation-delay: 1s; }
    .floating-icons:nth-child(3) { bottom: 25%; right: 15%; animation-delay: 2s; }

    @keyframes sparkle {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.2); }
    }

    @keyframes floatIcon {
      0%, 100% { transform: translateY(0) rotate(0); }
      50% { transform: translateY(-15px) rotate(10deg); }
    }
  }

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
    padding: 24px;
    .story-image {
      height: 200px;
      order: -1;
      font-size: 60px;
    }
  }
`;

// ============================================
// STATS - Premium Animated Cards
// ============================================

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  .stat-card {
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
    padding: 28px 20px;
    border-radius: 16px;
    text-align: center;
    border: 1px solid rgba(255,255,255,0.3);
    box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: ${props => props.color || colors.primary.gradient};
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.08);
      
      &::before {
        opacity: 1;
      }
    }

    .stat-icon {
      font-size: 28px;
      display: block;
      margin-bottom: 4px;
    }

    .number {
      font-size: 2.5rem;
      font-weight: 900;
      color: ${props => props.color || colors.primary.main};
      display: block;
      line-height: 1.2;
    }

    .label {
      color: ${colors.neutral[600]};
      font-size: 14px;
      margin-top: 4px;
      font-weight: 500;
    }
  }

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

// ============================================
// WHY CHOOSE US - Premium Cards
// ============================================

const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  .why-card {
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
    padding: 32px 24px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    border: 1px solid rgba(255,255,255,0.3);
    transition: all 0.3s ease;
    text-align: center;

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.08);
      border-color: ${colors.primary.main};
    }

    .icon-wrapper {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: ${colors.primary.light};
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 12px;
      font-size: 28px;
      transition: all 0.3s ease;
    }

    &:hover .icon-wrapper {
      background: ${colors.primary.gradient};
      transform: scale(1.05);
    }

    h4 {
      font-size: 1.1rem;
      font-weight: 700;
      color: ${colors.neutral[900]};
      margin-bottom: 8px;
    }

    p {
      color: ${colors.neutral[600]};
      font-size: 14px;
      line-height: 1.6;
    }
  }

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

// ============================================
// TEAM SECTION - Premium Cards
// ============================================

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;

  .team-card {
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
    padding: 24px 16px;
    border-radius: 16px;
    text-align: center;
    border: 1px solid rgba(255,255,255,0.3);
    box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.08);
      border-color: ${colors.primary.main};
    }

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4F46E5, #7C3AED);
      margin: 0 auto 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      color: #fff;
      box-shadow: 0 4px 15px rgba(79,70,229,0.2);
      transition: all 0.3s ease;
    }

    &:hover .avatar {
      transform: scale(1.05);
      box-shadow: 0 8px 25px rgba(79,70,229,0.3);
    }

    .name {
      font-weight: 700;
      color: ${colors.neutral[900]};
      font-size: 1rem;
    }

    .role {
      color: ${colors.neutral[500]};
      font-size: 13px;
      margin-top: 2px;
    }
  }
`;

// ============================================
// VALUES SECTION
// ============================================

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;

  .value-item {
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(10px);
    padding: 20px 16px;
    border-radius: 14px;
    text-align: center;
    border: 1px solid rgba(255,255,255,0.3);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.06);
      border-color: ${colors.primary.main};
    }

    .value-icon {
      font-size: 28px;
      display: block;
      margin-bottom: 6px;
    }

    .value-name {
      font-size: 14px;
      font-weight: 600;
      color: ${colors.neutral[800]};
    }
  }
`;

// ============================================
// CTA SECTION - Premium
// ============================================

const CTASection = styled.div`
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  border-radius: 24px;
  padding: 60px 40px;
  text-align: center;
  color: #fff;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(79,70,229,0.15), transparent 70%);
    border-radius: 50%;
  }

  h2 {
    font-size: 2.2rem;
    font-weight: 800;
    margin-bottom: 8px;
    position: relative;
  }

  p {
    opacity: 0.85;
    margin-bottom: 24px;
    font-size: 1.1rem;
    position: relative;
  }

  .cta-btn {
    display: inline-block;
    padding: 14px 48px;
    background: linear-gradient(135deg, #4F46E5, #7C3AED);
    color: #fff;
    border-radius: 50px;
    font-weight: 700;
    font-size: 16px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 25px rgba(79,70,229,0.4);
    position: relative;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 35px rgba(79,70,229,0.5);
    }
  }

  @media (max-width: ${breakpoints.md}) {
    padding: 30px 20px;
    h2 { font-size: 1.5rem; }
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

function About() {
    const [language, setLanguage] = useState('en');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [stats, setStats] = useState({
        travelers: '1000+',
        destinations: '50+',
        customized: '100%',
        satisfaction: '98%'
    });

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

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getYatras();
                if (data && data.length > 0) {
                    const uniqueDestinations = new Set(data.map(y => {
                        const name = y.yatra_name || '';
                        if (name.includes('Vrindavan')) return 'Vrindavan';
                        if (name.includes('Barsana')) return 'Barsana';
                        if (name.includes('Khatu Shyam')) return 'Khatu Shyam';
                        if (name.includes('Manali')) return 'Manali';
                        if (name.includes('Haridwar')) return 'Haridwar';
                        if (name.includes('Rishikesh')) return 'Rishikesh';
                        if (name.includes('Ayodhya')) return 'Ayodhya';
                        return null;
                    }).filter(Boolean)).size;

                    let totalSeats = 0;
                    data.forEach(y => {
                        totalSeats += y.total_seats || 0;
                    });

                    setStats({
                        travelers: `${totalSeats || 1000}+`,
                        destinations: `${uniqueDestinations || 50}+`,
                        customized: '100%',
                        satisfaction: '98%'
                    });
                }
            } catch (err) {
                console.error('Error fetching stats:', err);
            }
        };
        fetchStats();
    }, []);

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    const team = [
        { name: 'Sanjeev', role: t('Co-Founder & CEO'), emoji: '👨‍💼' },
        { name: 'Rajeev', role: t('Co-Founder & Director'), emoji: '👨‍💼' },
        { name: 'Hritik', role: t('Senior Developer'), emoji: '👨‍💻' },
        { name: 'Deepanshu', role: t('Developer'), emoji: '🧑‍💻' },
        { name: 'Dev', role: t('Team Member'), emoji: '👨‍💻' },
        { name: 'Muskan', role: t('Team Member'), emoji: '👩‍💼' },
        { name: 'Riya', role: t('Team Member'), emoji: '👩‍💼' },
    ];

    const values = [
        { icon: '🙏', name: 'Spirituality' },
        { icon: '❤️', name: 'Compassion' },
        { icon: '🌟', name: 'Excellence' },
        { icon: '🤝', name: 'Integrity' },
        { icon: '🌿', name: 'Sustainability' },
        { icon: '👥', name: 'Community' },
    ];

    return (
        <PageContainer>
            <ScrollProgress progress={scrollProgress} />

            <Container>
                <LanguageToggle lang={language} onClick={toggleLanguage}>
                    {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
                </LanguageToggle>

                {/* ===== HERO SECTION ===== */}
                <HeroSection>
                    <div className="hero-badge">✨ Welcome to GetMeYatra</div>
                    <h1>
                        🙏 {t('About')} <span className="gradient-text">GetMeYatra</span>
                    </h1>
                    <p>{t('Your trusted travel partner for spiritual journeys across India')}</p>
                    <div className="hero-stats-mini">
                        <div className="mini-stat">
                            <div className="number">2019</div>
                            <div className="label">Founded</div>
                        </div>
                        <div className="mini-stat">
                            <div className="number">1000+</div>
                            <div className="label">Travelers</div>
                        </div>
                        <div className="mini-stat">
                            <div className="number">50+</div>
                            <div className="label">Destinations</div>
                        </div>
                        <div className="mini-stat">
                            <div className="number">4.9⭐</div>
                            <div className="label">Rating</div>
                        </div>
                    </div>
                </HeroSection>

                {/* ===== MISSION & VISION ===== */}
                <Section>
                    <MissionVisionGrid>
                        <MissionCard>
                            <span className="card-icon">🎯</span>
                            <h3>{t('Our Mission')}</h3>
                            <p>To provide safe, comfortable, and spiritually enriching travel experiences that connect people with India's divine heritage and natural beauty.</p>
                        </MissionCard>
                        <MissionCard>
                            <span className="card-icon">🔭</span>
                            <h3>{t('Our Vision')}</h3>
                            <p>To become India's most trusted and preferred travel partner for spiritual and adventure tourism, creating unforgettable journeys for every traveler.</p>
                        </MissionCard>
                    </MissionVisionGrid>
                </Section>

                {/* ===== OUR STORY ===== */}
                <Section>
                    <SectionHeader>
                        <div className="section-tag">{t('Our Story')}</div>
                        <h2>{t('From a small dream to a trusted travel partner')}</h2>
                    </SectionHeader>
                    <StoryWrapper>
                        <div className="story-text">
                            <p>
                                GetMeYatra was born from a simple idea - to make spiritual and adventure
                                travel accessible, comfortable, and memorable for everyone. Starting with
                                a single vehicle and a passion for travel, we've grown into a trusted
                                name in pan-India tour and cab services.
                            </p>
                            <p>
                                Today, we're proud to serve thousands of happy travelers, offering
                                curated experiences that combine comfort, safety, and spiritual
                                fulfillment. Our team of dedicated professionals ensures every journey
                                is as special as the destination itself.
                            </p>
                            <p className="highlight-text">
                                🌟 "Travel is not just about reaching a destination; it's about the journey,
                                the experiences, and the memories you create along the way."
                            </p>
                            <div className="story-timeline">
                                <span className="milestone"><span className="dot"></span> 2019 - Founded</span>
                                <span className="milestone"><span className="dot"></span> 2020 - First 100 Travelers</span>
                                <span className="milestone"><span className="dot"></span> 2023 - 50+ Destinations</span>
                                <span className="milestone"><span className="dot"></span> 2024 - 1000+ Happy Travelers</span>
                            </div>
                        </div>
                        <div className="story-image">
                            🚐
                            <span className="floating-icons">🛕</span>
                            <span className="floating-icons">🏔️</span>
                            <span className="floating-icons">🌊</span>
                        </div>
                    </StoryWrapper>
                </Section>

                {/* ===== STATS ===== */}
                <Section>
                    <SectionHeader>
                        <div className="section-tag">{t('Our Impact')}</div>
                        <h2>{t('Numbers that tell our story')}</h2>
                    </SectionHeader>
                    <StatsGrid>
                        <div className="stat-card" color="#4F46E5">
                            <span className="stat-icon">🚌</span>
                            <span className="number">{stats.travelers}</span>
                            <span className="label">{t('Happy Travelers')}</span>
                        </div>
                        <div className="stat-card" color="#22C55E">
                            <span className="stat-icon">📍</span>
                            <span className="number">{stats.destinations}</span>
                            <span className="label">{t('Destinations')}</span>
                        </div>
                        <div className="stat-card" color="#F59E0B">
                            <span className="stat-icon">✨</span>
                            <span className="number">{stats.customized}</span>
                            <span className="label">{t('Customized Tours')}</span>
                        </div>
                        <div className="stat-card" color="#EC4899">
                            <span className="stat-icon">⭐</span>
                            <span className="number">{stats.satisfaction}</span>
                            <span className="label">{t('Satisfaction Rate')}</span>
                        </div>
                    </StatsGrid>
                </Section>

                {/* ===== WHY CHOOSE US ===== */}
                <Section>
                    <SectionHeader>
                        <div className="section-tag">{t('Why Choose Us')}</div>
                        <h2>{t('What makes us different')}</h2>
                    </SectionHeader>
                    <WhyGrid>
                        <div className="why-card">
                            <div className="icon-wrapper">🙏</div>
                            <h4>{t('Spiritual Expertise')}</h4>
                            <p>{t('Deep knowledge of pilgrimage routes')}</p>
                        </div>
                        <div className="why-card">
                            <div className="icon-wrapper">🚗</div>
                            <h4>{t('Premium Fleet')}</h4>
                            <p>{t('Wide range of vehicles')}</p>
                        </div>
                        <div className="why-card">
                            <div className="icon-wrapper">💰</div>
                            <h4>{t('Best Price Guarantee')}</h4>
                            <p>{t('Competitive pricing with transparent billing')}</p>
                        </div>
                        <div className="why-card">
                            <div className="icon-wrapper">⭐</div>
                            <h4>{t('5-Star Service')}</h4>
                            <p>{t('Personalized attention and exceptional care')}</p>
                        </div>
                        <div className="why-card">
                            <div className="icon-wrapper">🌏</div>
                            <h4>{t('Pan India Network')}</h4>
                            <p>{t('Extensive presence across India')}</p>
                        </div>
                        <div className="why-card">
                            <div className="icon-wrapper">🛡️</div>
                            <h4>{t('Safety First')}</h4>
                            <p>{t('Well-maintained vehicles and trained drivers')}</p>
                        </div>
                    </WhyGrid>
                </Section>

                {/* ===== OUR VALUES ===== */}
                <Section>
                    <SectionHeader>
                        <div className="section-tag">{t('Our Values')}</div>
                        <h2>What we <span className="gradient-text">Believe</span> In</h2>
                    </SectionHeader>
                    <ValuesGrid>
                        {values.map((value, index) => (
                            <div className="value-item" key={index}>
                                <span className="value-icon">{value.icon}</span>
                                <div className="value-name">{value.name}</div>
                            </div>
                        ))}
                    </ValuesGrid>
                </Section>

                {/* ===== TEAM ===== */}
                <Section>
                    <SectionHeader>
                        <div className="section-tag">{t('Our Team')}</div>
                        <h2>{t('The people behind your journeys')}</h2>
                    </SectionHeader>
                    <TeamGrid>
                        {team.map((member, index) => (
                            <div className="team-card" key={index}>
                                <div className="avatar">{member.emoji}</div>
                                <div className="name">{member.name}</div>
                                <div className="role">{member.role}</div>
                            </div>
                        ))}
                    </TeamGrid>
                </Section>

                {/* ===== CTA ===== */}
                <CTASection>
                    <h2>🚀 {t('Ready for Your Next Journey?')}</h2>
                    <p>{t('Experience the divine and scenic beauty of India')}</p>
                    <Link to="/tours" className="cta-btn">
                        {t('Explore Tours')} →
                    </Link>
                </CTASection>
            </Container>

            {/* ===== FLOATING WHATSAPP ===== */}
            <FloatingWhatsApp
                href="https://wa.me/918010320000?text=Hi%20I%20want%20to%20know%20more%20about%20your%20tours"
                target="_blank"
                rel="noopener noreferrer"
            >
                💬
            </FloatingWhatsApp>
        </PageContainer>
    );
}

export default About;
