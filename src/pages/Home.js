import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getYatras } from '../services/api';
import { colors, shadows, breakpoints } from '../styles/theme';

// ============================================
// STYLED COMPONENTS
// ============================================

const PageContainer = styled.div`
  padding-top: 160px;
  background: ${colors.background.main};
  min-height: 100vh;
`;

// ===== HERO SECTION =====
const HeroSection = styled.section`
  min-height: 70vh;
  position: relative;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.85) 0%, rgba(124, 58, 237, 0.85) 100%),
    url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600') center/cover;
  padding: 60px 0;
  margin-bottom: 60px;
  border-radius: 0 0 40px 40px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to top, ${colors.background.main}, transparent);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  color: #fff;

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
    margin-bottom: 32px;
    line-height: 1.6;
  }

  @media (max-width: ${breakpoints.md}) {
    text-align: center;
    h1 {
      font-size: 2.5rem;
    }
    p {
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.md}) {
    justify-content: center;
  }
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

// ===== STATS SECTION =====
const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: -40px auto 60px;
  padding: 0 20px;
  position: relative;
  z-index: 3;

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

  .number {
    font-size: 2rem;
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

// ===== TOURS SECTION =====
const ToursSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 60px;
`;

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

const TourGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const TourCard = styled.div`
  background: ${colors.background.card};
  border-radius: 16px;
  padding: 24px;
  box-shadow: ${shadows.md};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${shadows.xl};
  }

  .icon {
    font-size: 32px;
    margin-bottom: 12px;
  }
  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${colors.neutral[900]};
    margin-bottom: 8px;
  }
  p {
    color: ${colors.neutral[600]};
    font-size: 14px;
    margin-bottom: 16px;
    line-height: 1.5;
  }
  .price {
    font-weight: 800;
    color: ${colors.primary.main};
    font-size: 1.2rem;
  }
`;

// ============================================
// COMPONENT
// ============================================

function Home() {
  const [featuredYatras, setFeaturedYatras] = useState([]);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await getYatras();
        setFeaturedYatras(data.slice(0, 4));
      } catch (err) {
        console.error('Error loading featured yatras:', err);
      }
    };
    loadFeatured();
  }, []);

  return (
    <PageContainer>
      {/* HERO */}
      <HeroSection>
        <HeroContent>
          <h1>
            Explore the <span className="highlight">Divine & Scenic</span> India
          </h1>
          <p>
            Experience spiritual journeys, hill station retreats, and adventure tours
            with premium car rentals and expert guides. Your perfect travel companion.
          </p>
          <HeroButtons>
            <HeroButton to="/tours" className="primary">Explore Tours</HeroButton>
            <HeroButton to="/contact" className="secondary">Contact Us</HeroButton>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      {/* STATS */}
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

      {/* FEATURED TOURS */}
      <ToursSection>
        <SectionHeader>
          <h2>✨ Popular <span className="gradient-text">Tour Packages</span></h2>
          <p>Curated spiritual and adventure tours across India's most sacred destinations</p>
        </SectionHeader>

        <TourGrid>
          {featuredYatras.map((yatra) => (
            <TourCard key={yatra.id}>
              <div className="icon">🏔️</div>
              <h3>{yatra.yatra_name}</h3>
              <p>
                {yatra.start_date ? new Date(yatra.start_date).toLocaleDateString() : ''} - 
                {yatra.end_date ? new Date(yatra.end_date).toLocaleDateString() : ''}
              </p>
              <div className="price">₹{yatra.rate_per_seat} / seat</div>
            </TourCard>
          ))}
        </TourGrid>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/tours" className="btn-primary">View All Tours →</Link>
        </div>
      </ToursSection>
    </PageContainer>
  );
}

export default Home;
