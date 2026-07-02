import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// ===== STYLED COMPONENTS =====

const PageContainer = styled.div`
  padding-top: 80px;
  background: #faf6f0;
`;

// ===== HERO SECTION WITH BACKGROUND IMAGE =====
const HeroSection = styled.section`
  min-height: 92vh;
  position: relative;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 100%),
    url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600') center/cover fixed;
  overflow: hidden;
  padding: 60px 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 107, 89, 0.2) 0%, rgba(0, 188, 180, 0.2) 100%);
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(to top, #faf6f0, transparent);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroText = styled.div`
  max-width: 600px;

  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

const HeroBadge = styled.span`
  display: inline-block;
  padding: 10px 28px;
  background: linear-gradient(135deg, rgba(255, 107, 89, 0.3), rgba(0, 188, 180, 0.3));
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
  letter-spacing: 1px;
  text-transform: uppercase;
  animation: fadeInUp 1s ease;

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const HeroTitle = styled.h1`
  font-size: 68px;
  font-weight: 900;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 25px;
  animation: fadeInUp 1s ease 0.2s both;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);

  .highlight {
    background: linear-gradient(135deg, #FF6B59 0%, #FFB347 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 40px;
  max-width: 500px;
  line-height: 1.8;
  animation: fadeInUp 1s ease 0.4s both;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 1024px) {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  animation: fadeInUp 1s ease 0.6s both;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const PrimaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 40px;
  background: linear-gradient(135deg, #FF6B59 0%, #FFB347 100%);
  color: #fff;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(255, 107, 89, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(255, 107, 89, 0.4);
  }
`;

const OutlineBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 40px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
  }
`;

const HeroImage = styled.div`
  animation: fadeInRight 1s ease;

  img {
    width: 100%;
    max-width: 500px;
    border-radius: 24px;
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 1024px) {
    display: none;
  }

  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
  }
`;

const HeroStats = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  animation: fadeInUp 1s ease 0.8s both;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatItem = styled.div`
  text-align: center;
  
  h3 {
    font-size: 42px;
    font-weight: 900;
    color: #fff;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);

    @media (max-width: 768px) {
      font-size: 30px;
    }
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    margin-top: 5px;
    font-weight: 400;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
`;

// ===== SECTION COMPONENTS =====

const Section = styled.section`
  padding: 80px 0;
  background: ${({ bg }) => bg || '#fff'};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SectionTag = styled.span`
  display: inline-block;
  padding: 6px 20px;
  background: rgba(255, 107, 89, 0.1);
  color: #FF6B59;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SectionTitle = styled.h2`
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 12px;
  color: #2d2d2d;

  .gradient-text {
    background: linear-gradient(135deg, #FF6B59 0%, #FFB347 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const SectionSubtitle = styled.p`
  color: #8a8a8a;
  max-width: 600px;
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.6;
`;

// ===== ABOUT SECTION =====
const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const AboutImage = styled.div`
  img {
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  }
`;

const AboutContent = styled.div`
  h3 {
    font-size: 28px;
    font-weight: 800;
    color: #2d2d2d;
    margin-bottom: 16px;
  }

  p {
    color: #6b6b6b;
    line-height: 1.8;
    margin-bottom: 16px;
    font-size: 15px;
  }

  .features {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 20px;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: #2d2d2d;

    i {
      color: #FF6B59;
      font-size: 18px;
    }
  }
`;

// ===== PAN INDIA PRESENCE =====
const PresenceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const PresenceCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(255, 107, 89, 0.1);
    border-color: rgba(255, 107, 89, 0.2);
  }

  .icon {
    font-size: 32px;
    margin-bottom: 10px;
  }

  h4 {
    font-size: 14px;
    font-weight: 700;
    color: #2d2d2d;
    margin-bottom: 4px;
  }

  p {
    font-size: 12px;
    color: #8a8a8a;
  }
`;

// ===== CAB CATEGORIES =====
const CabGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-top: 20px;
`;

const CabCard = styled.div`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(255, 107, 89, 0.1);
  }
`;

const CabImage = styled.div`
  height: 180px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, #FF6B59 0%, #FFB347 100%);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.4s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const CabBadge = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ color }) => color || 'linear-gradient(135deg, #FF6B59, #FFB347)'};
  color: #fff;
  padding: 3px 12px;
  border-radius: 50px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CabContent = styled.div`
  padding: 20px;
`;

const CabTitle = styled.h4`
  font-size: 17px;
  font-weight: 700;
  color: #2d2d2d;
  margin-bottom: 4px;
`;

const CabSubtitle = styled.p`
  font-size: 13px;
  color: #8a8a8a;
  margin-bottom: 10px;
`;

const CabFeatures = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;

  span {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #8a8a8a;

    i {
      color: #FF6B59;
      font-size: 12px;
    }
  }
`;

const CabPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;

  .amount {
    font-size: 20px;
    font-weight: 800;
    color: #FF6B59;
  }

  .per-km {
    font-size: 12px;
    color: #8a8a8a;
  }
`;

// ===== TOUR PACKAGES =====

const TourGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 30px;
  margin-top: 20px;
`;

const TourCard = styled.div`
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 60px rgba(255, 107, 89, 0.1);
  }
`;

const TourImage = styled.div`
  height: 220px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, #FF6B59 0%, #FFB347 100%);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.4s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const TourBadge = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  background: ${({ color }) => color || 'linear-gradient(135deg, #FF6B59, #FFB347)'};
  color: #fff;
  padding: 4px 14px;
  border-radius: 50px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const TourContent = styled.div`
  padding: 24px;
`;

const TourTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #2d2d2d;
  margin-bottom: 8px;
`;

const TourLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #8a8a8a;
  font-size: 14px;
  margin-bottom: 12px;

  i {
    color: #FF6B59;
  }
`;

const TourFeatures = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin: 12px 0 16px;

  span {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    color: #8a8a8a;

    i {
      color: #00BCB4;
      font-size: 14px;
    }
  }
`;

const TourPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 16px;

  .amount {
    font-size: 28px;
    font-weight: 800;
    color: #FF6B59;
  }

  .per-person {
    font-size: 14px;
    color: #8a8a8a;
  }
`;

const BookBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 28px;
  background: linear-gradient(135deg, #FF6B59 0%, #FFB347 100%);
  color: #fff;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 107, 89, 0.3);
  }
`;

// ===== SERVICES =====

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
`;

const ServiceCard = styled.div`
  background: #fff;
  padding: 30px 20px;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(255, 107, 89, 0.08);
    border-color: rgba(255, 107, 89, 0.15);
  }

  .icon {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, rgba(255, 107, 89, 0.08), rgba(255, 179, 71, 0.08));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    font-size: 28px;
    color: #FF6B59;
  }

  h4 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 6px;
    color: #2d2d2d;
  }

  p {
    font-size: 14px;
    color: #8a8a8a;
    line-height: 1.5;
  }
`;

// ===== WHY CHOOSE US =====

const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
`;

const WhyCard = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(0, 188, 180, 0.08);
    border-color: rgba(0, 188, 180, 0.15);
  }

  .icon {
    font-size: 36px;
    margin-bottom: 12px;
  }

  h4 {
    font-size: 16px;
    font-weight: 700;
    color: #2d2d2d;
    margin-bottom: 6px;
  }

  p {
    font-size: 14px;
    color: #8a8a8a;
    line-height: 1.5;
  }
`;

// ===== TESTIMONIALS =====

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

const TestimonialCard = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(255, 107, 89, 0.08);
  }

  .stars {
    color: #FFB347;
    margin-bottom: 12px;
    font-size: 14px;
  }

  p {
    font-size: 14px;
    color: #4a4a4a;
    line-height: 1.7;
    margin-bottom: 16px;
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
  }

  .info {
    h4 {
      font-size: 14px;
      font-weight: 700;
      color: #2d2d2d;
    }

    span {
      font-size: 12px;
      color: #8a8a8a;
    }
  }
`;

// ===== CTA SECTION =====

const CTASection = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 107, 89, 0.1), transparent);
    top: -100px;
    right: -100px;
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(0, 188, 180, 0.08), transparent);
    bottom: -100px;
    left: -100px;
    border-radius: 50%;
  }
`;

const CTAContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;

  h2 {
    font-size: 40px;
    font-weight: 900;
    color: #fff;
    margin-bottom: 16px;

    @media (max-width: 768px) {
      font-size: 28px;
    }
  }

  p {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
    max-width: 600px;
    margin: 0 auto 30px;
    line-height: 1.6;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 40px;
  background: linear-gradient(135deg, #FF6B59 0%, #FFB347 100%);
  color: #fff;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(255, 107, 89, 0.3);
  }
`;

// ===== HOME COMPONENT =====

const Home = () => {
  const [tourData] = useState([
    {
      id: 1,
      title: "Khatu Shyam, Salasar Balaji & Rani Sati",
      location: "Rajasthan, India",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600",
      badge: "Pilgrimage",
      badgeColor: "linear-gradient(135deg, #FF6B59, #EE5A24)",
      features: ["Temple Darshan", "Private Car", "Guide Included"],
      price: 4999,
      days: "3 Days"
    },
    {
      id: 2,
      title: "Manali, Sisu, Kasol & Manikaran Sahib",
      location: "Himachal Pradesh, India",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600",
      badge: "Hill Station",
      badgeColor: "linear-gradient(135deg, #00BCB4, #00A8A0)",
      features: ["Scenic Views", "River Rafting", "Sightseeing"],
      price: 8499,
      days: "5 Days"
    },
    {
      id: 3,
      title: "Barshana, Vrindavan & Bhandirvan",
      location: "Uttar Pradesh, India",
      image: "https://images.unsplash.com/photo-1544717305-278b9c5136ac?w=600",
      badge: "Spiritual",
      badgeColor: "linear-gradient(135deg, #FFB347, #FF8C00)",
      features: ["Temple Tours", "Evening Aarti", "Local Guide"],
      price: 3499,
      days: "2 Days"
    },
    {
      id: 4,
      title: "Haridwar, Rishikesh & Shivpuri Camping",
      location: "Uttarakhand, India",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
      badge: "Adventure",
      badgeColor: "linear-gradient(135deg, #00BCB4, #00D4C0)",
      features: ["Camping", "River Rafting", "Ganga Aarti"],
      price: 6999,
      days: "4 Days"
    },
    {
      id: 5,
      title: "Haridwar - Mansa Devi & Chandi Devi Tour",
      location: "Uttarakhand, India",
      image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600",
      badge: "Same Day",
      badgeColor: "linear-gradient(135deg, #FFB347, #FFD93D)",
      features: ["Cable Car", "Temple Darshan", "Local Lunch"],
      price: 2499,
      days: "1 Day"
    },
    {
      id: 6,
      title: "Sawariya Seth, Nathdwara & Chardham",
      location: "Rajasthan & Uttarakhand",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600",
      badge: "Premium",
      badgeColor: "linear-gradient(135deg, #FF6B59, #FFB347)",
      features: ["All Inclusive", "Luxury Stay", "Complete Guide"],
      price: 14999,
      days: "7 Days"
    }
  ]);

  const [cabData] = useState([
    {
      id: 1,
      name: "Toyota Crysta",
      subtitle: "Premium 7-Seater Luxury",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500",
      badge: "Luxury",
      badgeColor: "linear-gradient(135deg, #FF6B59, #FFB347)",
      features: ["7 Seats", "AC", "Luggage Space"],
      price: 18
    },
    {
      id: 2,
      name: "Maruti Ertiga",
      subtitle: "Comfortable Family 7-Seater",
      image: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=500",
      badge: "Family",
      badgeColor: "linear-gradient(135deg, #00BCB4, #00D4C0)",
      features: ["7 Seats", "AC", "Family Friendly"],
      price: 14
    },
    {
      id: 3,
      name: "Honda City",
      subtitle: "Premium Sedan for Comfort",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500",
      badge: "Sedan",
      badgeColor: "linear-gradient(135deg, #FFB347, #FFD93D)",
      features: ["5 Seats", "AC", "Premium Interior"],
      price: 12
    },
    {
      id: 4,
      name: "Toyota Hycross",
      subtitle: "Premium 7-Seater SUV",
      image: "https://images.unsplash.com/photo-1550355291-bbee04a4cb7f?w=500",
      badge: "SUV",
      badgeColor: "linear-gradient(135deg, #00BCB4, #00A8A0)",
      features: ["7 Seats", "AC", "SUV Comfort"],
      price: 22
    },
    {
      id: 5,
      name: "Tempo Traveller",
      subtitle: "12-Seater for Group Tours",
      image: "https://images.unsplash.com/photo-1549317661-bf32b8ea0d4e?w=500",
      badge: "Group",
      badgeColor: "linear-gradient(135deg, #FF6B59, #EE5A24)",
      features: ["12 Seats", "AC", "Spacious"],
      price: 28
    },
    {
      id: 5,
      name: "Tempo Traveller",
      subtitle: "12-Seater for Group Tours",
      image: "https://images.unsplash.com/photo-1549317661-bf32b8ea0d4e?w=500",
      badge: "Group",
      badgeColor: "linear-gradient(135deg, #FF6B59, #EE5A24)",
      features: ["12 Seats", "AC", "Spacious"],
      price: 28
    },
    {
      id: 6,
      name: "Force Urbania",
      subtitle: "Premium 9-Seater Luxury Van",
      image: "https://images.unsplash.com/photo-1549317661-bf32b8ea0d4e?w=500",
      badge: "Luxury",
      badgeColor: "linear-gradient(135deg, #FF6B59, #FFB347)",
      features: ["9 Seats", "AC", "Luxury Interior"],
      price: 32
    },
    {
      id: 6,
      name: "Force Urbania",
      subtitle: "Premium 9-Seater Luxury Van",
      image: "https://images.unsplash.com/photo-1549317661-bf32b8ea0d4e?w=500",
      badge: "Luxury",
      badgeColor: "linear-gradient(135deg, #FF6B59, #FFB347)",
      features: ["9 Seats", "AC", "Luxury Interior"],
      price: 32
    }
  ]);

  const [presenceData] = useState([
    { city: "Jaipur", state: "Rajasthan", icon: "🏛️" },
    { city: "Delhi", state: "NCR", icon: "🏙️" },
    { city: "Mumbai", state: "Maharashtra", icon: "🌊" },
    { city: "Varanasi", state: "Uttar Pradesh", icon: "🛕" },
    { city: "Haridwar", state: "Uttarakhand", icon: "⛰️" },
    { city: "Udaipur", state: "Rajasthan", icon: "🏰" },
    { city: "Ahmedabad", state: "Gujarat", icon: "🏙️" },
    { city: "Indore", state: "Madhya Pradesh", icon: "🏛️" },
    { city: "Bengaluru", state: "Karnataka", icon: "🏙️" },
    { city: "Vrindavan", state: "Uttar Pradesh", icon: "🛕" }
  ]);

  useEffect(() => {
    const animateCounter = (element) => {
      const target = parseInt(element.getAttribute('data-target'));
      const duration = 2000;
      const step = Math.max(1, Math.floor(target / 60));
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current >= target) {
          element.textContent = target;
          return;
        }
        element.textContent = current;
        requestAnimationFrame(updateCounter);
      };

      updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <PageContainer>
      {/* ===== HERO SECTION WITH BACKGROUND IMAGE ===== */}
      <HeroSection>
        <HeroContent>
          <HeroText>
            <HeroBadge>✨ India's Most Trusted Travel Partner</HeroBadge>
            <HeroTitle>
              Explore the <br />
              <span className="highlight">Divine & Scenic</span> <br />
              India
            </HeroTitle>
            <HeroSubtitle>
              Experience spiritual journeys, hill station retreats, and adventure tours 
              with premium car rentals and expert guides. Your perfect travel companion.
            </HeroSubtitle>
            <HeroButtons>
              <PrimaryBtn to="/tours">Explore Tours</PrimaryBtn>
              <OutlineBtn to="/contact">Contact Us</OutlineBtn>
            </HeroButtons>
          </HeroText>
          <HeroImage>
            <img 
              src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600" 
              alt="Indian Temple" 
            />
          </HeroImage>
          <HeroStats>
            <StatItem>
              <h3><span className="counter" data-target="5000">0</span>+</h3>
              <p>Happy Travelers</p>
            </StatItem>
            <StatItem>
              <h3><span className="counter" data-target="50">0</span>+</h3>
              <p>Destinations</p>
            </StatItem>
            <StatItem>
              <h3><span className="counter" data-target="100">0</span>%</h3>
              <p>Customized Tours</p>
            </StatItem>
            <StatItem>
              <h3><span className="counter" data-target="98">0</span>%</h3>
              <p>Satisfaction Rate</p>
            </StatItem>
          </HeroStats>
        </HeroContent>
      </HeroSection>

      {/* ===== ABOUT SECTION ===== */}
      <Section bg="#ffffff">
        <Container>
          <SectionHeader>
            <SectionTag>About Us</SectionTag>
            <SectionTitle>Pan India <span className="gradient-text">Tour & Cab</span> Services</SectionTitle>
            <SectionSubtitle>Your trusted travel partner for spiritual tours, hill station getaways, and premium cab rentals across India.</SectionSubtitle>
          </SectionHeader>
          <AboutGrid>
            <AboutImage>
              <img 
                src="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600" 
                alt="Travel India" 
              />
            </AboutImage>
            <AboutContent>
              <h3>Your Journey, Our <span style={{ background: 'linear-gradient(135deg, #FF6B59, #FFB347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Passion</span></h3>
              <p>
                GetMeYatra is a premier pan-India tour and cab service provider dedicated to making your travel 
                experiences unforgettable. From the spiritual lands of Vrindavan and Haridwar to the scenic 
                beauty of Manali and Rishikesh, we cover it all.
              </p>
              <p>
                With a fleet of premium vehicles including Toyota Crysta, Ertiga, Sedans, Hycross, Tempo Traveller, 
                and Urbania, we ensure comfortable journeys for individuals, families, and large groups.
              </p>
              <div className="features">
                <div className="feature-item"><i className="fas fa-check-circle"></i> 100+ Customized Tours</div>
                <div className="feature-item"><i className="fas fa-check-circle"></i> Premium Fleet of 50+ Vehicles</div>
                <div className="feature-item"><i className="fas fa-check-circle"></i> Expert Local Guides</div>
                <div className="feature-item"><i className="fas fa-check-circle"></i> 24/7 Customer Support</div>
              </div>
            </AboutContent>
          </AboutGrid>
        </Container>
      </Section>

      {/* ===== PAN INDIA PRESENCE ===== */}
      <Section bg="#faf6f0">
        <Container>
          <SectionHeader>
            <SectionTag>Pan India Presence</SectionTag>
            <SectionTitle>Our <span className="gradient-text">Footprint</span></SectionTitle>
            <SectionSubtitle>Serving travelers across the length and breadth of India with our extensive network.</SectionSubtitle>
          </SectionHeader>
          <PresenceGrid>
            {presenceData.map((item, index) => (
              <PresenceCard key={index}>
                <div className="icon">{item.icon}</div>
                <h4>{item.city}</h4>
                <p>{item.state}</p>
              </PresenceCard>
            ))}
          </PresenceGrid>
        </Container>
      </Section>

      {/* ===== CAB CATEGORIES ===== */}
      <Section bg="#ffffff">
        <Container>
          <SectionHeader>
            <SectionTag>Our Fleet</SectionTag>
            <SectionTitle>Cab Categories <span className="gradient-text">Available for Rent</span></SectionTitle>
            <SectionSubtitle>Choose from our premium range of vehicles for comfortable and safe journeys.</SectionSubtitle>
          </SectionHeader>
          <CabGrid>
            {cabData.map((cab) => (
              <CabCard key={cab.id}>
                <CabImage>
                  <img src={cab.image} alt={cab.name} />
                  <CabBadge color={cab.badgeColor}>{cab.badge}</CabBadge>
                </CabImage>
                <CabContent>
                  <CabTitle>{cab.name}</CabTitle>
                  <CabSubtitle>{cab.subtitle}</CabSubtitle>
                  <CabFeatures>
                    {cab.features.map((feature, idx) => (
                      <span key={idx}><i className="fas fa-check-circle"></i> {feature}</span>
                    ))}
                  </CabFeatures>
                  <CabPrice>
                    <span className="amount">₹{cab.price}</span>
                    <span className="per-km">/ km</span>
                  </CabPrice>
                </CabContent>
              </CabCard>
            ))}
          </CabGrid>
        </Container>
      </Section>

      {/* ===== TOUR PACKAGES SECTION ===== */}
      <Section bg="#faf6f0">
        <Container>
          <SectionHeader>
            <SectionTag>Popular Tours</SectionTag>
            <SectionTitle>Our <span className="gradient-text">Tour Packages</span></SectionTitle>
            <SectionSubtitle>Curated spiritual and adventure tours across India's most sacred and scenic destinations.</SectionSubtitle>
          </SectionHeader>
          <TourGrid>
            {tourData.map((tour) => (
              <TourCard key={tour.id}>
                <TourImage>
                  <img src={tour.image} alt={tour.title} />
                  <TourBadge color={tour.badgeColor}>{tour.badge}</TourBadge>
                </TourImage>
                <TourContent>
                  <TourTitle>{tour.title}</TourTitle>
                  <TourLocation>
                    <i className="fas fa-map-marker-alt"></i>
                    {tour.location}
                  </TourLocation>
                  <TourFeatures>
                    <span><i className="fas fa-calendar-alt"></i> {tour.days}</span>
                    {tour.features.map((feature, idx) => (
                      <span key={idx}><i className="fas fa-check-circle"></i> {feature}</span>
                    ))}
                  </TourFeatures>
                  <TourPrice>
                    <span className="amount">₹{tour.price.toLocaleString()}</span>
                    <span className="per-person">per person</span>
                  </TourPrice>
                  <BookBtn to="/contact">Book Now <i className="fas fa-arrow-right"></i></BookBtn>
                </TourContent>
              </TourCard>
            ))}
          </TourGrid>
        </Container>
      </Section>

      {/* ===== SERVICES SECTION ===== */}
      <Section bg="#ffffff">
        <Container>
          <SectionHeader>
            <SectionTag>Our Services</SectionTag>
            <SectionTitle>Why Travel With <span className="gradient-text">Us?</span></SectionTitle>
            <SectionSubtitle>We provide end-to-end travel solutions for spiritual, adventure, and leisure tours.</SectionSubtitle>
          </SectionHeader>
          <ServiceGrid>
            <ServiceCard>
              <div className="icon"><i className="fas fa-car"></i></div>
              <h4>Premium Cab Rental</h4>
              <p>Luxury vehicles with experienced drivers for comfortable journeys across India.</p>
            </ServiceCard>
            <ServiceCard>
              <div className="icon"><i className="fas fa-map-marked-alt"></i></div>
              <h4>Expert Tour Guides</h4>
              <p>Knowledgeable local guides for spiritual, historical, and cultural insights.</p>
            </ServiceCard>
            <ServiceCard>
              <div className="icon"><i className="fas fa-hotel"></i></div>
              <h4>Premium Accommodation</h4>
              <p>Carefully selected hotels and resorts for a comfortable and memorable stay.</p>
            </ServiceCard>
            <ServiceCard>
              <div className="icon"><i className="fas fa-headset"></i></div>
              <h4>24/7 Customer Support</h4>
              <p>Round-the-clock assistance for a hassle-free and enjoyable travel experience.</p>
            </ServiceCard>
          </ServiceGrid>
        </Container>
      </Section>

      {/* ===== WHY CHOOSE US ===== */}
      <Section bg="#faf6f0">
        <Container>
          <SectionHeader>
            <SectionTag>Why Choose Us</SectionTag>
            <SectionTitle>Your Trusted <span className="gradient-text">Travel Partner</span></SectionTitle>
            <SectionSubtitle>We go above and beyond to make your journey memorable and hassle-free.</SectionSubtitle>
          </SectionHeader>
          <WhyGrid>
            <WhyCard>
              <div className="icon">🙏</div>
              <h4>Spiritual Expertise</h4>
              <p>Deep knowledge of pilgrimage routes and sacred traditions across India.</p>
            </WhyCard>
            <WhyCard>
              <div className="icon">🚗</div>
              <h4>Premium Fleet</h4>
              <p>Wide range of vehicles from sedans to luxury vans for every group size.</p>
            </WhyCard>
            <WhyCard>
              <div className="icon">💰</div>
              <h4>Best Price Guarantee</h4>
              <p>Competitive pricing with transparent billing and no hidden charges.</p>
            </WhyCard>
            <WhyCard>
              <div className="icon">⭐</div>
              <h4>5-Star Service</h4>
              <p>Personalized attention and exceptional customer care from booking to return.</p>
            </WhyCard>
            <WhyCard>
              <div className="icon">🌏</div>
              <h4>Pan India Network</h4>
              <p>Extensive presence across major cities and tourist destinations in India.</p>
            </WhyCard>
            <WhyCard>
              <div className="icon">🛡️</div>
              <h4>Safety First</h4>
              <p>Regularly maintained vehicles and trained drivers for your safety.</p>
            </WhyCard>
          </WhyGrid>
        </Container>
      </Section>

      {/* ===== TESTIMONIALS ===== */}
      <Section bg="#ffffff">
        <Container>
          <SectionHeader>
            <SectionTag>Testimonials</SectionTag>
            <SectionTitle>What Our <span className="gradient-text">Travelers Say</span></SectionTitle>
            <SectionSubtitle>Real stories from real travelers who explored with us.</SectionSubtitle>
          </SectionHeader>
          <TestimonialGrid>
            <TestimonialCard>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p>"Amazing spiritual tour! The arrangements were perfect and our guide was very knowledgeable about all the temples."</p>
              <TestimonialAuthor>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Rahul" />
                <div className="info">
                  <h4>Rahul Sharma</h4>
                  <span>Khatu Shyam Tour</span>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
            <TestimonialCard>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p>"Manali trip was wonderful! The camping experience in Shivpuri and rafting in Rishikesh was the highlight of our tour."</p>
              <TestimonialAuthor>
                <img src="https://images.unsplash.com/photo-1494790108372-be9c29b29330?w=100" alt="Priya" />
                <div className="info">
                  <h4>Priya Patel</h4>
                  <span>Manali & Rishikesh Tour</span>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
            <TestimonialCard>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p>"Vrindavan and Barshana tour was a soulful experience. The team took care of everything, highly recommended!"</p>
              <TestimonialAuthor>
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" alt="Amit" />
                <div className="info">
                  <h4>Amit Kumar</h4>
                  <span>Vrindavan Tour</span>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialGrid>
        </Container>
      </Section>

      {/* ===== CTA SECTION ===== */}
      <CTASection>
        <Container>
          <CTAContent>
            <SectionTag style={{ background: 'rgba(255,255,255,0.08)', color: '#fff' }}>
              Special Offer
            </SectionTag>
            <h2>Ready for Your <span style={{ background: 'linear-gradient(135deg, #FF6B59, #FFB347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Next Journey?</span></h2>
            <p>
              Book your spiritual or adventure tour today and get 10% off on your first booking. 
              Experience the divine and scenic beauty of India with our premium cab and tour services.
            </p>
            <CTAButton to="/contact">Book Your Tour Now <i className="fas fa-arrow-right"></i></CTAButton>
          </CTAContent>
        </Container>
      </CTASection>
    </PageContainer>
  );
};

export default Home;
