import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { getYatras } from '../services/api';
import { colors, shadows, breakpoints } from '../styles/theme';

// ============================================
// STYLED COMPONENTS
// ============================================

const PageContainer = styled.div`
  padding-top: 160px;
  background: ${colors.background.main};
  min-height: 100vh;
  overflow-x: hidden;
`;

// ===== HERO BUTTONS =====
const HeroButtons = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;

const HeroButton = styled(Link)`
  padding: 14px 36px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;

  &.primary {
    background: #fff;
    color: ${colors.primary.main};
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }
  }

  &.secondary {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-3px);
    }
  }
`;

// ===== HERO SLIDER =====
const HeroSlider = styled.section`
  min-height: 70vh;
  position: relative;
  overflow: hidden;
  margin-bottom: 60px;
  border-radius: 0 0 40px 40px;
`;

const SlideContainer = styled.div`
  display: flex;
  transition: transform 0.8s ease-in-out;
  transform: translateX(${props => props.currentIndex * -100}%);
  height: 70vh;
  min-height: 500px;
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bg || 'linear-gradient(135deg, rgba(79, 70, 229, 0.85) 0%, rgba(124, 58, 237, 0.85) 100%)'};
  position: relative;
  color: #fff;
  padding: 60px 20px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to top, ${colors.background.main}, transparent);
  }

  .slide-content {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    text-align: center;

    h1 {
      font-size: 3.5rem;
      font-weight: 900;
      line-height: 1.2;
      margin-bottom: 16px;

      .highlight {
        background: rgba(255, 255, 255, 0.2);
        padding: 4px 16px;
        border-radius: 12px;
        display: inline-block;
      }
    }

    p {
      font-size: 1.2rem;
      opacity: 0.95;
      max-width: 600px;
      margin: 0 auto 32px;
      line-height: 1.6;
    }
  }

  @media (max-width: ${breakpoints.md}) {
    .slide-content h1 {
      font-size: 2.5rem;
    }
  }
`;

const SlideDots = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: ${props => props.active ? '#fff' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    transform: scale(1.2);
  }
`;

const SlideArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: none;
  color: #fff;
  font-size: 24px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
    transform: translateY(-50%) scale(1.1);
  }

  &.prev { left: 20px; }
  &.next { right: 20px; }

  @media (max-width: ${breakpoints.md}) {
    display: none;
  }
`;

// ===== SEARCH BAR =====
const SearchSection = styled.div`
  max-width: 800px;
  margin: -30px auto 40px;
  padding: 0 20px;
  position: relative;
  z-index: 5;
`;

const SearchBox = styled.div`
  background: ${colors.background.card};
  border-radius: 60px;
  padding: 8px;
  box-shadow: ${shadows.xl};
  display: flex;
  align-items: center;
  gap: 8px;
  border: 2px solid ${colors.neutral[200]};
  transition: all 0.3s ease;

  &:focus-within {
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
  }

  input {
    flex: 1;
    padding: 14px 20px;
    border: none;
    outline: none;
    font-size: 16px;
    background: transparent;
    color: ${colors.neutral[700]};
    min-width: 0;

    &::placeholder {
      color: ${colors.neutral[400]};
    }
  }

  button {
    padding: 12px 28px;
    background: ${colors.primary.gradient};
    color: #fff;
    border: none;
    border-radius: 50px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
    }
  }

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
    border-radius: 20px;
    padding: 16px;
    button { width: 100%; }
  }
`;

// ===== STATS SECTION =====
const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 0 20px;

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: ${colors.background.card};
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  box-shadow: ${shadows.lg};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${shadows.xl};
  }

  .number {
    font-size: 2.4rem;
    font-weight: 800;
    color: ${colors.primary.main};
    display: block;
  }
  .label {
    color: ${colors.neutral[600]};
    font-size: 14px;
    margin-top: 4px;
  }
`;

// ===== WHY CHOOSE US =====
const WhySection = styled.section`
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 0 20px;
`;

const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
`;

const WhyCard = styled.div`
  background: ${colors.background.card};
  padding: 30px 24px;
  border-radius: 16px;
  text-align: center;
  box-shadow: ${shadows.sm};
  border: 1px solid ${colors.neutral[200]};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${shadows.md};
    border-color: ${colors.primary.main};
  }

  .icon {
    font-size: 40px;
    margin-bottom: 12px;
    display: block;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${colors.neutral[900]};
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: ${colors.neutral[600]};
    line-height: 1.6;
  }
`;

// ============================================
// NEW: FEATURED DESTINATION CARDS
// ============================================

const DestSection = styled.section`
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 0 20px;
`;

const DestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const DestCard = styled.div`
  background: ${colors.background.card};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${shadows.md};
  transition: all 0.3s ease;
  border: 1px solid ${colors.neutral[200]};
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${shadows.xl};
    border-color: ${colors.primary.main};
  }

  .dest-image {
    height: 200px;
    background: ${props => props.bg || colors.primary.gradient};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 64px;
    color: #fff;
    opacity: 0.7;
    position: relative;

    .dest-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 16px;
      background: linear-gradient(transparent, rgba(0,0,0,0.5));
      
      .dest-name {
        color: #fff;
        font-size: 1.3rem;
        font-weight: 700;
        margin: 0;
      }
    }
  }

  .dest-content {
    padding: 16px;

    .dest-price {
      font-weight: 700;
      color: ${colors.primary.main};
      font-size: 1.1rem;
    }

    .dest-tours {
      font-size: 13px;
      color: ${colors.neutral[600]};
      margin-bottom: 8px;
    }

    .dest-btn {
      display: inline-block;
      padding: 8px 20px;
      background: ${colors.primary.gradient};
      color: #fff;
      border-radius: 50px;
      font-weight: 600;
      font-size: 13px;
      text-decoration: none;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
`;

// ===== UPCOMING TOURS =====
const UpcomingSection = styled.section`
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 0 20px;
`;

const UpcomingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const UpcomingCard = styled(Link)`
  background: ${colors.background.card};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${shadows.md};
  transition: all 0.3s ease;
  text-decoration: none;
  color: ${colors.neutral[900]};
  border: 1px solid ${colors.neutral[200]};
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${shadows.xl};
    border-color: ${colors.primary.main};
  }

  .upcoming-image {
    height: 180px;
    background: ${colors.primary.gradient};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    color: #fff;
    opacity: 0.6;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .upcoming-content {
    padding: 16px;

    h4 {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 4px;
    }

    p {
      font-size: 13px;
      color: ${colors.neutral[600]};
      margin-bottom: 8px;
    }

    .upcoming-price {
      font-weight: 700;
      color: ${colors.primary.main};
      font-size: 1.1rem;
    }

    .upcoming-date {
      display: inline-block;
      background: ${colors.primary.light};
      color: ${colors.primary.main};
      font-size: 11px;
      font-weight: 600;
      padding: 2px 12px;
      border-radius: 20px;
      margin-bottom: 8px;
    }
  }

  .countdown-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(239, 68, 68, 0.9);
    color: #fff;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    backdrop-filter: blur(4px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
`;

// ===== FEATURED TOURS =====
const FeaturedSection = styled.section`
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 0 20px;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const FeaturedCard = styled(Link)`
  background: ${colors.background.card};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${shadows.md};
  transition: all 0.3s ease;
  text-decoration: none;
  color: ${colors.neutral[900]};
  border: 1px solid ${colors.neutral[200]};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${shadows.xl};
    border-color: ${colors.primary.main};
  }

  .featured-image {
    height: 180px;
    background: ${colors.primary.gradient};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    color: #fff;
    opacity: 0.6;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .featured-content {
    padding: 16px;

    h4 {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 4px;
    }

    p {
      font-size: 13px;
      color: ${colors.neutral[600]};
      margin-bottom: 8px;
    }

    .featured-price {
      font-weight: 700;
      color: ${colors.primary.main};
      font-size: 1.1rem;
    }

    .featured-badge {
      display: inline-block;
      background: ${colors.primary.gradient};
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 10px;
      border-radius: 20px;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
`;

// ===== TESTIMONIALS =====
const TestimonialSection = styled.section`
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 0 20px;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const TestimonialCard = styled.div`
  background: ${colors.background.card};
  padding: 24px;
  border-radius: 16px;
  box-shadow: ${shadows.sm};
  border: 1px solid ${colors.neutral[200]};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${shadows.md};
  }

  .stars {
    color: #f59e0b;
    font-size: 18px;
    margin-bottom: 8px;
  }

  .comment {
    font-size: 14px;
    color: ${colors.neutral[700]};
    line-height: 1.6;
    margin-bottom: 12px;
    font-style: italic;
  }

  .customer {
    display: flex;
    align-items: center;
    gap: 12px;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: ${colors.primary.gradient};
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 700;
      font-size: 16px;
    }

    .name {
      font-weight: 600;
      color: ${colors.neutral[900]};
    }

    .location {
      font-size: 12px;
      color: ${colors.neutral[500]};
    }
  }
`;

// ===== TRUST BADGES =====
const TrustSection = styled.section`
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 0 20px;
`;

const TrustGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  background: ${colors.background.card};
  border-radius: 16px;
  border: 1px solid ${colors.neutral[200]};
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${colors.neutral[600]};

  .icon {
    font-size: 20px;
  }
`;

// ===== NEWSLETTER =====
const NewsletterSection = styled.section`
  max-width: 800px;
  margin: 0 auto 60px;
  padding: 40px;
  background: ${colors.primary.gradient};
  border-radius: 20px;
  text-align: center;
  color: #fff;

  h2 {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 8px;
  }

  p {
    opacity: 0.9;
    margin-bottom: 20px;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 12px;
  max-width: 500px;
  margin: 0 auto;
  flex-wrap: wrap;

  input {
    flex: 1;
    padding: 14px 20px;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    outline: none;
    min-width: 200px;
  }

  button {
    padding: 14px 32px;
    background: #fff;
    color: ${colors.primary.main};
    border: none;
    border-radius: 50px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
  }

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
    button { width: 100%; }
  }
`;

// ===== VIEW ALL BUTTON =====
const ViewAllWrapper = styled.div`
  text-align: center;
  margin-top: 40px;
`;

const ViewAllButton = styled(Link)`
  display: inline-block;
  padding: 14px 40px;
  background: ${colors.primary.gradient};
  color: #fff;
  border-radius: 50px;
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
  }
`;

// ===== POPUP OFFER =====
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 1000;
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  padding: 20px;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
`;

const PopupContent = styled.div`
  background: ${colors.background.card};
  border-radius: 24px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  position: relative;
  text-align: center;
  animation: popIn 0.5s ease;

  @keyframes popIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: ${colors.neutral[100]};
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: ${colors.status.error};
      color: #fff;
    }
  }

  .icon {
    font-size: 64px;
    margin-bottom: 16px;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 800;
    color: ${colors.neutral[900]};
    margin-bottom: 8px;
  }

  p {
    color: ${colors.neutral[600]};
    margin-bottom: 20px;
  }

  .discount-code {
    display: inline-block;
    background: ${colors.primary.gradient};
    color: #fff;
    padding: 8px 24px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1.2rem;
    letter-spacing: 2px;
    margin-bottom: 16px;
  }

  .popup-btn {
    display: inline-block;
    padding: 12px 32px;
    background: ${colors.primary.gradient};
    color: #fff;
    border: none;
    border-radius: 50px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
    }
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

// ===== SECTION HEADER =====
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h2 {
    font-size: 2.2rem;
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

const getDaysUntil = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

// ============================================
// COMPONENT
// ============================================

function Home() {
  const [featuredYatras, setFeaturedYatras] = useState([]);
  const [upcomingYatras, setUpcomingYatras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Hero slides data
  const slides = [
    {
      id: 1,
      title: 'Spiritual Yatras Across India',
      subtitle: 'Visit sacred temples, holy rivers, and divine destinations with our carefully curated pilgrimage tours.',
      bg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(245, 158, 11, 0.9) 100%)',
      emoji: '🙏'
    },
    {
      id: 2,
      title: 'Adventure & Hill Station Tours',
      subtitle: 'From Manali to Kasol, experience the thrill of mountains, snow, and scenic landscapes.',
      bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(37, 99, 235, 0.9) 100%)',
      emoji: '🏔️'
    },
    {
      id: 3,
      title: 'Explore the Divine & Scenic India',
      subtitle: 'Experience spiritual journeys, hill station retreats, and adventure tours with premium car rentals and expert guides.',
      bg: 'linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(124, 58, 237, 0.9) 100%)',
      emoji: '🛕'
    },
    {
      id: 4,
      title: 'Customized Tours Just for You',
      subtitle: 'Tailor-made itineraries to match your preferences, budget, and travel style.',
      bg: 'linear-gradient(135deg, rgba(236, 72, 153, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%)',
      emoji: '✨'
    }
  ];

  // Featured Destinations Data
  const destinations = [
    {
      id: 'manali',
      name: 'Manali',
      icon: '🏔️',
      bg: 'linear-gradient(135deg, #74B9FF, #0984E3)',
      tours: '7 Tours',
      price: '₹4,500'
    },
    {
      id: 'vrindavan',
      name: 'Vrindavan',
      icon: '🛕',
      bg: 'linear-gradient(135deg, #FF6B6B, #EE5A24)',
      tours: '4 Tours',
      price: '₹1,000'
    },
    {
      id: 'khatu-shyam',
      name: 'Khatu Shyam',
      icon: '🙏',
      bg: 'linear-gradient(135deg, #FDCB6E, #E17055)',
      tours: '6 Tours',
      price: '₹1,400'
    },
    {
      id: 'barsana',
      name: 'Barsana',
      icon: '🌸',
      bg: 'linear-gradient(135deg, #F093FB, #F5576C)',
      tours: '4 Tours',
      price: '₹1,700'
    }
  ];

  useEffect(() => {
    loadData();
    
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getYatras();
      
      const sorted = [...data].sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
      setFeaturedYatras(sorted.slice(0, 4));
      
      const today = new Date();
      const upcoming = sorted.filter(y => new Date(y.start_date) > today);
      setUpcomingYatras(upcoming.slice(0, 4));
      
    } catch (err) {
      console.error('Error loading tours:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/tours?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const testimonials = [
    {
      id: 1,
      name: 'Mohit Gupta',
      location: 'Delhi',
      comment: 'I had to catch a flight from Delhi and was worried about finding reliable transportation. GetMeYatra showed up on time, and the ride was smooth. I\'ll definitely use them for future trips!',
      rating: 5
    },
    {
      id: 2,
      name: 'Ashish Kumar',
      location: 'Mumbai',
      comment: 'Amazing service! The cab was clean, the driver was professional, and I felt very safe throughout the journey. This is definitely my new go-to for all my travel needs!',
      rating: 5
    },
    {
      id: 3,
      name: 'Aayushi Roy',
      location: 'Bangalore',
      comment: 'I\'ve tried multiple services, but GetMeYatra\'s customer service really stood out. They were quick to assist with a minor issue I had, and it made all the difference in my experience.',
      rating: 5
    }
  ];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <PageContainer>
      {/* ===== HERO SLIDER ===== */}
      <HeroSlider>
        <SlideContainer currentIndex={currentSlide}>
          {slides.map((slide) => (
            <Slide key={slide.id} bg={slide.bg}>
              <div className="slide-content">
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>{slide.emoji}</div>
                <h1 dangerouslySetInnerHTML={{ __html: slide.title.replace(/(Divine & Scenic|Spiritual Yatras|Adventure & Hill Station|Customized Tours)/g, '<span class="highlight">$1</span>') }} />
                <p>{slide.subtitle}</p>
                <HeroButtons>
                  <HeroButton to="/tours" className="primary">Explore Tours</HeroButton>
                  <HeroButton to="/contact" className="secondary">Contact Us</HeroButton>
                </HeroButtons>
              </div>
            </Slide>
          ))}
        </SlideContainer>
        
        <SlideDots>
          {slides.map((_, index) => (
            <Dot key={index} active={index === currentSlide} onClick={() => setCurrentSlide(index)} />
          ))}
        </SlideDots>
        
        <SlideArrow className="prev" onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}>‹</SlideArrow>
        <SlideArrow className="next" onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}>›</SlideArrow>
      </HeroSlider>

      {/* ===== SEARCH BAR ===== */}
      <SearchSection>
        <SearchBox>
          <input 
            type="text" 
            placeholder="Search for tours, destinations..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search Tours</button>
        </SearchBox>
      </SearchSection>

      {/* ===== STATS ===== */}
      <StatsSection>
        <StatCard>
          <span className="number">1000+</span>
          <span className="label">Happy Travelers</span>
        </StatCard>
        <StatCard>
          <span className="number">50+</span>
          <span className="label">Destinations</span>
        </StatCard>
        <StatCard>
          <span className="number">100%</span>
          <span className="label">Customized Tours</span>
        </StatCard>
        <StatCard>
          <span className="number">98%</span>
          <span className="label">Satisfaction Rate</span>
        </StatCard>
      </StatsSection>

      {/* ============================================
          NEW: FEATURED DESTINATIONS
      ============================================ */}
      <DestSection>
        <SectionHeader>
          <h2>🏝️ Popular <span className="gradient-text">Destinations</span></h2>
          <p>Explore our most popular tour destinations</p>
        </SectionHeader>
        <DestGrid>
          {destinations.map((dest) => (
            <DestCard key={dest.id} bg={dest.bg}>
              <div className="dest-image">
                <span style={{ fontSize: '64px' }}>{dest.icon}</span>
                <div className="dest-overlay">
                  <h3 className="dest-name">{dest.name}</h3>
                </div>
              </div>
              <div className="dest-content">
                <div className="dest-tours">{dest.tours} available</div>
                <div className="dest-price">Starting from {dest.price}</div>
                <br />
                <Link to="/tours" className="dest-btn">View Tours →</Link>
              </div>
            </DestCard>
          ))}
        </DestGrid>
      </DestSection>

      {/* ===== WHY CHOOSE US ===== */}
      <WhySection>
        <SectionHeader>
          <h2>Why Choose <span className="gradient-text">GetMeYatra</span></h2>
          <p>Your trusted partner for spiritual and adventure travel</p>
        </SectionHeader>
        <WhyGrid>
          <WhyCard>
            <span className="icon">🚌</span>
            <h4>Premium Transport</h4>
            <p>Comfortable AC vehicles with experienced drivers for a safe journey</p>
          </WhyCard>
          <WhyCard>
            <span className="icon">🏨</span>
            <h4>Quality Stays</h4>
            <p>Carefully selected hotels and accommodations for a comfortable stay</p>
          </WhyCard>
          <WhyCard>
            <span className="icon">👨‍💼</span>
            <h4>Expert Guides</h4>
            <p>Knowledgeable tour coordinators to enhance your travel experience</p>
          </WhyCard>
          <WhyCard>
            <span className="icon">💯</span>
            <h4>Best Price Guarantee</h4>
            <p>Competitive prices with no hidden charges. Book with confidence</p>
          </WhyCard>
        </WhyGrid>
      </WhySection>

      {/* ===== UPCOMING TOURS ===== */}
      <UpcomingSection>
        <SectionHeader>
          <h2>🚀 Upcoming <span className="gradient-text">Tours</span></h2>
          <p>Book your spot before they fill up</p>
        </SectionHeader>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading upcoming tours...</p>
          </div>
        ) : (
          <>
            <UpcomingGrid>
              {upcomingYatras.map((yatra) => {
                const daysUntil = getDaysUntil(yatra.start_date);
                return (
                  <UpcomingCard key={yatra.id} to={`/yatra/${yatra.id}`}>
                    <div className="upcoming-image">
                      {yatra.image_url ? (
                        <img src={'http://getmeyatra.com' + yatra.image_url} alt={yatra.yatra_name} />
                      ) : (
                        '🗓️'
                      )}
                    </div>
                    <div className="upcoming-content">
                      <span className="upcoming-date">📅 {formatDate(yatra.start_date)}</span>
                      <h4>{yatra.yatra_name}</h4>
                      <p>{formatDate(yatra.start_date)} - {formatDate(yatra.end_date)}</p>
                      <div className="upcoming-price">₹{yatra.rate_per_seat} / seat</div>
                    </div>
                    {daysUntil > 0 && daysUntil <= 7 && (
                      <div className="countdown-badge">🔥 {daysUntil} days left</div>
                    )}
                  </UpcomingCard>
                );
              })}
            </UpcomingGrid>
            {upcomingYatras.length > 0 && (
              <ViewAllWrapper>
                <ViewAllButton to="/tours">View All Tours →</ViewAllButton>
              </ViewAllWrapper>
            )}
          </>
        )}
      </UpcomingSection>

      {/* ===== FEATURED TOURS ===== */}
      <FeaturedSection>
        <SectionHeader>
          <h2>✨ Featured <span className="gradient-text">Tours</span></h2>
          <p>Handpicked spiritual and adventure journeys you'll love</p>
        </SectionHeader>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading featured tours...</p>
          </div>
        ) : (
          <>
            <FeaturedGrid>
              {featuredYatras.map((yatra) => (
                <FeaturedCard key={yatra.id} to={`/yatra/${yatra.id}`}>
                  <div className="featured-image">
                    {yatra.image_url ? (
                      <img src={'http://getmeyatra.com' + yatra.image_url} alt={yatra.yatra_name} />
                    ) : (
                      '🏔️'
                    )}
                  </div>
                  <div className="featured-content">
                    <span className="featured-badge">⭐ Featured</span>
                    <h4>{yatra.yatra_name}</h4>
                    <p>{formatDate(yatra.start_date)} - {formatDate(yatra.end_date)}</p>
                    <div className="featured-price">₹{yatra.rate_per_seat} / seat</div>
                  </div>
                </FeaturedCard>
              ))}
            </FeaturedGrid>
          </>
        )}
      </FeaturedSection>

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialSection>
        <SectionHeader>
          <h2>⭐ What Our <span className="gradient-text">Travelers Say</span></h2>
          <p>Real experiences from real people</p>
        </SectionHeader>
        <TestimonialGrid>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id}>
              <div className="stars">{renderStars(testimonial.rating)}</div>
              <div className="comment">"{testimonial.comment}"</div>
              <div className="customer">
                <div className="avatar">{getInitials(testimonial.name)}</div>
                <div>
                  <div className="name">{testimonial.name}</div>
                  <div className="location">{testimonial.location}</div>
                </div>
              </div>
            </TestimonialCard>
          ))}
        </TestimonialGrid>
      </TestimonialSection>

      {/* ===== TRUST BADGES ===== */}
      <TrustSection>
        <TrustGrid>
          <TrustBadge><span className="icon">🔒</span> Secure Payments</TrustBadge>
          <TrustBadge><span className="icon">✅</span> Verified Tours</TrustBadge>
          <TrustBadge><span className="icon">🛡️</span> Safety Assured</TrustBadge>
          <TrustBadge><span className="icon">💳</span> No Hidden Charges</TrustBadge>
          <TrustBadge><span className="icon">📱</span> 24/7 Support</TrustBadge>
        </TrustGrid>
      </TrustSection>

      {/* ===== NEWSLETTER ===== */}
      <NewsletterSection>
        <h2>📧 Subscribe to Our Newsletter</h2>
        <p>Get the latest tour updates, exclusive offers, and travel tips</p>
        <NewsletterForm onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
          <input type="email" placeholder="Enter your email address" required />
          <button type="submit">Subscribe</button>
        </NewsletterForm>
      </NewsletterSection>

      {/* ===== FLOATING WHATSAPP BUTTON ===== */}
      <FloatingWhatsApp 
          href="https://wa.me/918010320000?text=Hi%20I%20want%20to%20know%20more%20about%20your%20tours"
          target="_blank"
          rel="noopener noreferrer"
      >
          💬
      </FloatingWhatsApp>

      {/* ===== POPUP OFFER ===== */}
      <PopupOverlay show={showPopup}>
        <PopupContent>
          <button className="close-btn" onClick={() => setShowPopup(false)}>✕</button>
          <div className="icon">🎉</div>
          <h2>Welcome to GetMeYatra!</h2>
          <p>Get <strong>10% OFF</strong> on your first booking. Use the code below:</p>
          <div className="discount-code">GETME10</div>
          <br />
          <Link to="/tours" className="popup-btn" onClick={() => setShowPopup(false)}>
            Explore Tours →
          </Link>
        </PopupContent>
      </PopupOverlay>
    </PageContainer>
  );
}

export default Home;
