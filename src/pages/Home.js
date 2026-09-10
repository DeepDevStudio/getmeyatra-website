import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getYatras, getHomeSettings } from '../services/api';
import { colors, breakpoints } from '../styles/theme';

// ============================================
// STYLED COMPONENTS - PREMIUM & ATTRACTIVE
// ============================================

const PageContainer = styled.div`
  padding-top: 80px;
  background: #ffffff;
  min-height: 100vh;
  overflow-x: hidden;
`;

const ScrollProgress = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #4F46E5, #7C3AED, #EC4899);
  z-index: 9999;
  width: ${props => props.progress}%;
  transition: width 0.1s ease;
`;

// ============================================
// HERO SECTION - UNCHANGED
// ============================================

const HeroSection = styled.section`
  height: 90vh;
  min-height: 700px;
  max-height: 900px;
  position: relative;
  overflow: hidden;
  margin-bottom: 60px;
  border-radius: 0 0 50px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const SliderWrapper = styled.div`
  display: flex;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%);
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  color: #fff;
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  animation: fadeInUp 1s ease-out;

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 24px;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 50px;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 20px;
  letter-spacing: 0.5px;

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #22C55E;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: 16px;
  line-height: 1.1;

  .highlight {
    background: linear-gradient(135deg, #FCD34D, #F59E0B);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: ${breakpoints.md}) {
    font-size: 2.8rem;
  }
  @media (max-width: ${breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 650px;
  margin: 0 auto 28px;
  line-height: 1.8;
  color: rgba(255,255,255,0.9);
  font-weight: 300;

  @media (max-width: ${breakpoints.md}) {
    font-size: 1rem;
  }
`;

const SearchBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 800px;
  margin: 0 auto 28px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
  padding: 8px;
  border-radius: 60px;
  border: 1px solid rgba(255,255,255,0.12);

  input, select {
    flex: 1;
    min-width: 140px;
    padding: 14px 20px;
    border: none;
    border-radius: 50px;
    background: rgba(255,255,255,0.06);
    color: #fff;
    font-size: 14px;
    outline: none;

    &::placeholder { color: rgba(255,255,255,0.5); }
    option { color: #333; }
  }

  .search-btn {
    padding: 14px 40px;
    background: linear-gradient(135deg, #4F46E5, #7C3AED);
    color: #fff;
    border: none;
    border-radius: 50px;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;

    &:hover {
      transform: scale(1.03);
      box-shadow: 0 4px 25px rgba(79,70,229,0.4);
    }
  }

  @media (max-width: ${breakpoints.md}) {
    border-radius: 20px;
    padding: 16px;
    flex-direction: column;
    input, select { width: 100%; }
    .search-btn { width: 100%; justify-content: center; }
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const HeroButton = styled(Link)`
  padding: 16px 44px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &.primary {
    background: linear-gradient(135deg, #4F46E5, #7C3AED);
    color: #fff;
    box-shadow: 0 4px 30px rgba(79,70,229,0.4);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
      transition: left 0.6s ease;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 40px rgba(79,70,229,0.5);
      &::before { left: 100%; }
    }
  }

  &.secondary {
    background: rgba(255,255,255,0.1);
    color: #fff;
    backdrop-filter: blur(10px);
    border: 1.5px solid rgba(255,255,255,0.2);

    &:hover {
      background: rgba(255,255,255,0.2);
      transform: translateY(-3px);
    }
  }
`;

const HeroStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;

  .stat {
    text-align: center;

    .number {
      font-size: 2rem;
      font-weight: 800;
      color: #fff;
    }

    .label {
      font-size: 13px;
      color: rgba(255,255,255,0.7);
      font-weight: 500;
      display: block;
      margin-top: 2px;
    }

    .icon {
      font-size: 24px;
      display: block;
      margin-bottom: 4px;
    }
  }

  @media (max-width: ${breakpoints.md}) {
    gap: 16px;
    .stat .number { font-size: 1.4rem; }
    .stat .label { font-size: 10px; }
    .stat .icon { font-size: 18px; }
  }
`;

// ============================================
// SLIDER CONTROLS - UNCHANGED
// ============================================

const SliderDots = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 20;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.5);
  background: ${props => props.active ? '#fff' : 'rgba(255,255,255,0.15)'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover { transform: scale(1.3); }
`;

const SliderArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(8px);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.1);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  z-index: 20;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255,255,255,0.2);
    transform: translateY(-50%) scale(1.05);
  }

  &.prev { left: 16px; }
  &.next { right: 16px; }

  @media (max-width: ${breakpoints.md}) {
    width: 36px; height: 36px; font-size: 16px;
    &.prev { left: 10px; }
    &.next { right: 10px; }
  }
`;

// ============================================
// SECTION HEADER - PREMIUM
// ============================================

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;

  .badge {
    display: inline-block;
    padding: 6px 20px;
    background: rgba(79,70,229,0.08);
    color: ${colors.primary.main};
    border-radius: 50px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 2.8rem;
    font-weight: 800;
    color: ${colors.neutral[900]};
    margin-bottom: 8px;

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
    max-width: 550px;
    margin: 0 auto;
  }

  @media (max-width: ${breakpoints.md}) {
    h2 { font-size: 2rem; }
    margin-bottom: 32px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

// ============================================
// 1. TRUST BADGES - PREMIUM
// ============================================

const TrustBadges = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  margin: 0 0 60px;
  padding: 30px 20px;
  background: #f8fafc;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.04);
`;

const TrustBadge = styled.div`
  text-align: center;
  transition: all 0.3s ease;

  &:hover { transform: translateY(-4px); }

  .number {
    font-size: 2.2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #4F46E5, #7C3AED);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .label {
    font-size: 14px;
    color: ${colors.neutral[600]};
    font-weight: 500;
    margin-top: 4px;
  }

  .icon {
    font-size: 32px;
    display: block;
    margin-bottom: 6px;
  }
`;

// ============================================
// 2. CATEGORY SECTION - PREMIUM
// ============================================

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 60px;
`;

const CategoryCard = styled(Link)`
  background: #fff;
  border-radius: 16px;
  padding: 30px 20px;
  text-align: center;
  text-decoration: none;
  color: ${colors.neutral[800]};
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.04);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.08);
    border-color: ${colors.primary.main};
  }

  .cat-icon { font-size: 40px; display: block; margin-bottom: 10px; }
  .cat-name { font-weight: 700; font-size: 15px; }
  .cat-count { font-size: 12px; color: ${colors.neutral[500]}; margin-top: 4px; }
`;

// ============================================
// 3. DESTINATION CARDS - PREMIUM
// ============================================

const DestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  margin-bottom: 60px;
`;

const DestCard = styled(Link)`
  background: #fff;
  border-radius: 18px;
  padding: 32px 24px;
  text-decoration: none;
  color: ${colors.neutral[800]};
  text-align: center;
  transition: all 0.4s ease;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.04);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #4F46E5, #7C3AED);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.08);
    &::before { opacity: 1; }
    .dest-icon { transform: scale(1.1) rotate(-5deg); }
  }

  .dest-icon { font-size: 48px; display: block; margin-bottom: 12px; transition: transform 0.3s ease; }
  .dest-name { font-size: 1.2rem; font-weight: 700; color: ${colors.neutral[900]}; margin-bottom: 4px; }
  .dest-info { font-size: 13px; color: ${colors.neutral[500]}; }
  .dest-price { display: inline-block; padding: 4px 16px; background: rgba(79,70,229,0.06); color: ${colors.primary.main}; border-radius: 50px; font-size: 13px; font-weight: 600; margin-top: 10px; }
`;

// ============================================
// 4. FEATURED TOURS - PREMIUM
// ============================================

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 60px;
`;

const FeaturedCard = styled(Link)`
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.04);
  text-decoration: none;
  color: ${colors.neutral[900]};
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.08);
    .featured-image img { transform: scale(1.05); }
    .featured-btn { background: linear-gradient(135deg, #7C3AED, #4F46E5); }
  }

  .featured-image {
    height: 220px;
    background: linear-gradient(135deg, #4F46E5, #7C3AED);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    color: #fff;
    overflow: hidden;
    position: relative;

    img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
    .featured-badge { position: absolute; top: 12px; right: 12px; padding: 4px 14px; background: rgba(0,0,0,0.6); backdrop-filter: blur(10px); color: #F59E0B; border-radius: 50px; font-size: 11px; font-weight: 700; }
  }

  .featured-content { padding: 20px;
    h4 { font-size: 1.1rem; font-weight: 700; margin: 0 0 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .featured-meta { display: flex; align-items: center; gap: 12px; font-size: 13px; color: ${colors.neutral[500]}; margin-bottom: 10px; }
    .featured-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid ${colors.neutral[100]};
      .featured-price { font-size: 1.4rem; font-weight: 800; color: ${colors.primary.main}; }
      .featured-btn { padding: 8px 24px; background: linear-gradient(135deg, #4F46E5, #7C3AED); color: #fff; border-radius: 50px; font-size: 13px; font-weight: 600; transition: all 0.3s ease; border: none; cursor: pointer; }
    }
  }
`;

// ============================================
// 5. WHY CHOOSE US - PREMIUM
// ============================================

const WhySection = styled.div`
  background: #f8fafc;
  border-radius: 18px;
  padding: 48px 30px;
  margin-bottom: 60px;
`;

const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
`;

const WhyItem = styled.div`
  text-align: center;
  padding: 16px;
  transition: all 0.3s ease;

  &:hover { transform: translateY(-4px); }

  .why-icon { font-size: 36px; display: block; margin-bottom: 10px; }
  .why-title { font-weight: 700; font-size: 16px; color: ${colors.neutral[900]}; margin-bottom: 4px; }
  .why-desc { font-size: 13px; color: ${colors.neutral[500]}; line-height: 1.5; }
`;

// ============================================
// 6. TESTIMONIALS - PREMIUM
// ============================================

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 60px;
`;

const TestimonialCard = styled.div`
  background: #fff;
  border-radius: 18px;
  padding: 28px;
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  transition: all 0.3s ease;

  &:hover { transform: translateY(-4px); box-shadow: 0 16px 56px rgba(0,0,0,0.06); }

  .testimonial-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;
    .stars { color: #F59E0B; font-size: 18px; letter-spacing: 2px; }
    .quote-icon { font-size: 32px; color: rgba(79,70,229,0.1); }
  }

  .comment { color: ${colors.neutral[700]}; font-size: 14px; line-height: 1.8; margin-bottom: 16px; font-style: italic; }
  .customer { display: flex; align-items: center; gap: 14px;
    .avatar { width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #4F46E5, #7C3AED); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; }
    .customer-info { .name { font-weight: 600; color: ${colors.neutral[900]}; font-size: 15px; } .location { font-size: 13px; color: ${colors.neutral[500]}; } }
  }
`;

// ============================================
// 7. NEWSLETTER - PREMIUM
// ============================================

const NewsletterSection = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 18px;
  padding: 48px 40px;
  text-align: center;
  color: #fff;
  margin-bottom: 60px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%; right: -20%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(79,70,229,0.1), transparent 70%);
    border-radius: 50%;
  }

  h2 { font-size: 2rem; font-weight: 800; margin-bottom: 8px; position: relative; }
  p { opacity: 0.8; margin-bottom: 20px; position: relative; font-size: 1rem; }
`;

const NewsletterForm = styled.form`
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;

  input {
    flex: 1; min-width: 200px; padding: 14px 24px; border: none; border-radius: 50px; font-size: 15px; outline: none; background: rgba(255,255,255,0.1); color: #fff; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);
    &::placeholder { color: rgba(255,255,255,0.5); }
    &:focus { border-color: rgba(255,255,255,0.3); }
  }

  button {
    padding: 14px 36px; background: linear-gradient(135deg, #4F46E5, #7C3AED); color: #fff; border: none; border-radius: 50px; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 24px rgba(79,70,229,0.3);
    &:hover { transform: translateY(-3px); box-shadow: 0 8px 40px rgba(79,70,229,0.4); }
  }
`;

// ============================================
// FLOATING WHATSAPP
// ============================================

const FloatingWhatsApp = styled.a`
  position: fixed;
  bottom: 100px; right: 24px;
  background: #25D366;
  color: #fff;
  width: 60px; height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  text-decoration: none;
  box-shadow: 0 4px 25px rgba(37,211,102,0.4);
  z-index: 999;
  transition: all 0.3s ease;

  &:hover { transform: scale(1.1); box-shadow: 0 8px 40px rgba(37,211,102,0.5); }

  @media (max-width: ${breakpoints.md}) {
    width: 52px; height: 52px; font-size: 26px; bottom: 80px; right: 16px;
  }
`;

// ============================================
// LOADING SKELETON
// ============================================

const LoadingWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

const LoadingCard = styled.div`
  background: #fff; border-radius: 18px; padding: 24px;
  animation: shimmer 1.5s ease-in-out infinite;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

// ============================================
// COMPONENT
// ============================================

function Home() {
  const [featuredYatras, setFeaturedYatras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [settings, setSettings] = useState({
    hero_title: '',
    hero_subtitle: '',
    hero_badge: '',
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
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderInterval = useRef(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getHomeSettings();
        setSettings(prev => ({ ...prev, ...data, slider_images: data.slider_images || [] }));
      } catch (error) { console.error('Error loading home settings:', error); }
    };
    loadSettings();
    loadFeaturedTours();
  }, []);

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
    if (settings.slider_images && settings.slider_images.length > 1) {
      sliderInterval.current = setInterval(() => {
        setCurrentSlide(prev => prev === settings.slider_images.length - 1 ? 0 : prev + 1);
      }, 5000);
    }
    return () => { if (sliderInterval.current) clearInterval(sliderInterval.current); };
  }, [settings.slider_images]);

  const loadFeaturedTours = async () => {
    try {
      setLoading(true);
      const data = await getYatras();
      setFeaturedYatras(data.slice(0, 4));
    } catch (err) { console.error('Error loading featured tours:', err); } finally { setLoading(false); }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '⭐'.repeat(full) + (half ? '⭐' : '') + '☆'.repeat(empty);
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const goToSlide = (index) => setCurrentSlide(index);
  const goToPrev = () => setCurrentSlide(prev => prev === 0 ? settings.slider_images.length - 1 : prev - 1);
  const goToNext = () => setCurrentSlide(prev => prev === settings.slider_images.length - 1 ? 0 : prev + 1);

  const WHATSAPP_NUMBER = settings.whatsapp_number || '919312113322';
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20I%20want%20to%20know%20more%20about%20your%20tours`;

  const destinations = [
    { name: 'Manali', icon: '🏔️', tours: 7, price: '₹4,500', link: '/tours' },
    { name: 'Haridwar', icon: '🌊', tours: 4, price: '₹1,000', link: '/tours' },
    { name: 'Khatu Shyam', icon: '🙏', tours: 6, price: '₹1,400', link: '/tours' },
    { name: 'Vrindavan', icon: '🌸', tours: 4, price: '₹1,700', link: '/tours' },
  ];

  const categories = [
    { name: 'Spiritual Tours', icon: '🛕', count: 12, link: '/tours' },
    { name: 'Adventure Tours', icon: '🏔️', count: 8, link: '/tours' },
    { name: 'Heritage Tours', icon: '🏛️', count: 6, link: '/tours' },
    { name: 'Weekend Getaways', icon: '🌅', count: 10, link: '/tours' },
  ];

  const testimonials = [
    { id: 1, name: 'Rahul Sharma', location: 'Delhi', rating: 5, comment: 'GetMeYatra made our trip unforgettable. The arrangements were perfect and we felt completely safe throughout the journey. Highly recommended!' },
    { id: 2, name: 'Priya Patel', location: 'Mumbai', rating: 5, comment: 'Best travel experience ever! The team was professional and everything was well-organized. Will definitely book again!' },
    { id: 3, name: 'Amit Singh', location: 'Bangalore', rating: 5, comment: 'Amazing service! From booking to the end of the trip, everything was smooth. The guides were knowledgeable and friendly.' },
  ];

  return (
    <PageContainer>
      <ScrollProgress progress={scrollProgress} />

      {/* ===== HERO SECTION (UNCHANGED) ===== */}
      <HeroSection>
        {settings.slider_images && settings.slider_images.length > 0 ? (
          <SliderContainer>
            <SliderWrapper style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {settings.slider_images.map((img, index) => (
                <Slide key={index}>
                  <img src={`https://getmeyatra.com${img}`} alt={`Slide ${index + 1}`} loading="lazy" />
                </Slide>
              ))}
            </SliderWrapper>

            {settings.slider_images.length > 1 && (
              <>
                <SliderArrow className="prev" onClick={goToPrev}>‹</SliderArrow>
                <SliderArrow className="next" onClick={goToNext}>›</SliderArrow>
                <SliderDots>
                  {settings.slider_images.map((_, index) => (
                    <Dot key={index} active={currentSlide === index} onClick={() => goToSlide(index)} />
                  ))}
                </SliderDots>
              </>
            )}
          </SliderContainer>
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }} />
        )}

        <HeroContent>
          <HeroBadge>
            <span className="dot"></span>
            {settings.hero_badge || 'Explore India with GetMeYatra'}
          </HeroBadge>

          <HeroTitle dangerouslySetInnerHTML={{
            __html: settings.hero_title || 'Discover the <span class="highlight">Spiritual & Scenic</span> Beauty of India'
          }} />

          <HeroSubtitle>
            {settings.hero_subtitle || 'Journey to sacred temples, serene hill stations, and breathtaking landscapes with comfortable travel, expert guides, and unforgettable experiences.'}
          </HeroSubtitle>

          <SearchBar>
            <input type="text" placeholder="🔍 Search tours..." />
            <select>
              <option value="">📍 All Destinations</option>
              <option value="manali">Manali</option>
              <option value="vrindavan">Vrindavan</option>
              <option value="khatu">Khatu Shyam</option>
              <option value="haridwar">Haridwar</option>
            </select>
            <input type="date" />
            <Link to="/tours" className="search-btn">Find Tours →</Link>
          </SearchBar>

          <HeroButtons>
            <HeroButton to="/tours" className="primary">Explore Tours →</HeroButton>
            <HeroButton to="/contact" className="secondary">Contact Us</HeroButton>
          </HeroButtons>

          <HeroStats>
            <div className="stat">
              <span className="icon">🚌</span>
              <div className="number">{settings.stats_travelers || '5000+'}</div>
              <span className="label">{settings.stats_label_travelers || 'Happy Travelers'}</span>
            </div>
            <div className="stat">
              <span className="icon">📍</span>
              <div className="number">{settings.stats_destinations || '50+'}</div>
              <span className="label">{settings.stats_label_destinations || 'Destinations'}</span>
            </div>
            <div className="stat">
              <span className="icon">⭐</span>
              <div className="number">{settings.stats_rating || '4.9'}</div>
              <span className="label">{settings.stats_label_rating || 'Average Rating'}</span>
            </div>
          </HeroStats>
        </HeroContent>
      </HeroSection>

      {/* ============================================ */}
      {/* BELOW HERO - PREMIUM & ATTRACTIVE            */}
      {/* ============================================ */}

      <Container>

        {/* ===== 1. TRUST BADGES ===== */}
        <TrustBadges>
          <TrustBadge>
            <span className="icon">🏆</span>
            <div className="number">75+</div>
            <div className="label">Years of Trust</div>
          </TrustBadge>
          <TrustBadge>
            <span className="icon">👥</span>
            <div className="number">5000+</div>
            <div className="label">Happy Travelers</div>
          </TrustBadge>
          <TrustBadge>
            <span className="icon">📍</span>
            <div className="number">50+</div>
            <div className="label">Destinations</div>
          </TrustBadge>
          <TrustBadge>
            <span className="icon">⭐</span>
            <div className="number">4.9</div>
            <div className="label">Average Rating</div>
          </TrustBadge>
          <TrustBadge>
            <span className="icon">🛡️</span>
            <div className="number">100%</div>
            <div className="label">Safe Travel</div>
          </TrustBadge>
        </TrustBadges>

        {/* ===== 2. CATEGORIES ===== */}
        <SectionHeader>
          <span className="badge">Categories</span>
          <h2>Explore by <span className="gradient-text">Interest</span></h2>
          <p>Find the perfect tour based on what you love</p>
        </SectionHeader>

        <CategoryGrid>
          {categories.map((cat, index) => (
            <CategoryCard key={index} to={cat.link}>
              <span className="cat-icon">{cat.icon}</span>
              <div className="cat-name">{cat.name}</div>
              <div className="cat-count">{cat.count} Tours</div>
            </CategoryCard>
          ))}
        </CategoryGrid>

        {/* ===== 3. POPULAR DESTINATIONS ===== */}
        <SectionHeader>
          <span className="badge">Destinations</span>
          <h2>Popular <span className="gradient-text">Destinations</span></h2>
          <p>Explore our most popular tour destinations</p>
        </SectionHeader>

        <DestGrid>
          {destinations.map((dest, index) => (
            <DestCard key={index} to={dest.link}>
              <span className="dest-icon">{dest.icon}</span>
              <div className="dest-name">{dest.name}</div>
              <div className="dest-info">{dest.tours} Tours available</div>
              <span className="dest-price">From {dest.price}</span>
            </DestCard>
          ))}
        </DestGrid>

        {/* ===== 4. FEATURED TOURS ===== */}
        <SectionHeader>
          <span className="badge">Featured</span>
          <h2>Popular <span className="gradient-text">Tours</span></h2>
          <p>Handpicked spiritual and adventure journeys you'll love</p>
        </SectionHeader>

        {loading ? (
          <LoadingWrapper>
            {[1, 2, 3, 4].map(i => <LoadingCard key={i} />)}
          </LoadingWrapper>
        ) : (
          <FeaturedGrid>
            {featuredYatras.map((yatra) => (
              <FeaturedCard key={yatra.id} to={`/yatra/${yatra.id}`}>
                <div className="featured-image">
                  {yatra.image_url ? (
                    <img src={`https://getmeyatra.com${yatra.image_url}`} alt={yatra.yatra_name} />
                  ) : '🏔️'}
                  <span className="featured-badge">⭐ Featured</span>
                </div>
                <div className="featured-content">
                  <h4>{yatra.yatra_name}</h4>
                  <div className="featured-meta">
                    <span>📅 {formatDate(yatra.start_date)} - {formatDate(yatra.end_date)}</span>
                  </div>
                  <div className="featured-bottom">
                    <span className="featured-price">₹{yatra.rate_per_seat}</span>
                    <span className="featured-btn">View Details</span>
                  </div>
                </div>
              </FeaturedCard>
            ))}
          </FeaturedGrid>
        )}

        {/* ===== 5. WHY CHOOSE US ===== */}
        <WhySection>
          <SectionHeader style={{ marginBottom: '16px' }}>
            <span className="badge">Why Us</span>
            <h2>Why Choose <span className="gradient-text">GetMeYatra</span></h2>
          </SectionHeader>
          <WhyGrid>
            <WhyItem>
              <span className="why-icon">🚌</span>
              <div className="why-title">Comfortable Travel</div>
              <div className="why-desc">Well-maintained vehicles with experienced drivers</div>
            </WhyItem>
            <WhyItem>
              <span className="why-icon">🏨</span>
              <div className="why-title">Quality Stays</div>
              <div className="why-desc">Carefully selected hotels for a comfortable stay</div>
            </WhyItem>
            <WhyItem>
              <span className="why-icon">👨‍💼</span>
              <div className="why-title">Expert Guides</div>
              <div className="why-desc">Knowledgeable tour coordinators to enhance your experience</div>
            </WhyItem>
            <WhyItem>
              <span className="why-icon">💯</span>
              <div className="why-title">Best Price Guarantee</div>
              <div className="why-desc">Competitive prices with no hidden charges</div>
            </WhyItem>
          </WhyGrid>
        </WhySection>

        {/* ===== 6. TESTIMONIALS ===== */}
        <SectionHeader>
          <span className="badge">Testimonials</span>
          <h2>What Our <span className="gradient-text">Travelers Say</span></h2>
          <p>Real experiences from real people</p>
        </SectionHeader>

        <TestimonialGrid>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id}>
              <div className="testimonial-header">
                <div className="stars">{renderStars(testimonial.rating)}</div>
                <span className="quote-icon">"</span>
              </div>
              <div className="comment">"{testimonial.comment}"</div>
              <div className="customer">
                <div className="avatar">{getInitials(testimonial.name)}</div>
                <div className="customer-info">
                  <div className="name">{testimonial.name}</div>
                  <div className="location">{testimonial.location}</div>
                </div>
              </div>
            </TestimonialCard>
          ))}
        </TestimonialGrid>

        {/* ===== 7. NEWSLETTER ===== */}
        <NewsletterSection>
          <h2>📧 Stay Updated</h2>
          <p>Get the latest tour updates, exclusive offers, and travel tips</p>
          <NewsletterForm onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing! 🎉'); }}>
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit">Subscribe</button>
          </NewsletterForm>
        </NewsletterSection>

      </Container>

      {/* ===== FLOATING WHATSAPP ===== */}
      <FloatingWhatsApp href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
        💬
      </FloatingWhatsApp>
    </PageContainer>
  );
}

export default Home;
