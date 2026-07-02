import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  padding-top: 0;
  background: #faf6f0;
`;

// ===== HERO SECTION =====
const HeroSection = styled.section`
  padding: 160px 0 60px;
  background: linear-gradient(135deg, #2d2d2d 0%, #1a1a2e 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255, 107, 89, 0.1), transparent);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 179, 71, 0.08), transparent);
    border-radius: 50%;
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
  background: rgba(255, 107, 89, 0.15);
  border: 1px solid rgba(255, 107, 89, 0.2);
  border-radius: 50px;
  color: #FF6B59;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const HeroTitle = styled.h1`
  font-size: 52px;
  font-weight: 900;
  color: #fff;
  margin-bottom: 20px;
  line-height: 1.2;

  .highlight {
    background: linear-gradient(135deg, #FF6B59 0%, #FFB347 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
`;

// ===== SECTION =====
const Section = styled.section`
  padding: 60px 0 80px;
  background: ${({ bg }) => bg || '#fff'};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

// ===== FILTER SECTION =====
const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
  padding: 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterTitle = styled.span`
  font-weight: 600;
  color: #2d2d2d;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    color: #FF6B59;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FilterButton = styled.button`
  padding: 8px 20px;
  border: 2px solid ${({ active }) => active ? '#FF6B59' : '#e8e8e8'};
  background: ${({ active }) => active ? '#FF6B59' : 'transparent'};
  color: ${({ active }) => active ? '#fff' : '#6b6b6b'};
  border-radius: 50px;
  font-size: 13px;
  font-weight: ${({ active }) => active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #FF6B59;
    color: ${({ active }) => active ? '#fff' : '#FF6B59'};
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8f8f8;
  padding: 8px 16px;
  border-radius: 50px;
  border: 1px solid #e8e8e8;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: #FF6B59;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(255, 107, 89, 0.08);
  }

  i {
    color: #8a8a8a;
  }

  input {
    border: none;
    background: transparent;
    padding: 6px 0;
    font-size: 14px;
    outline: none;
    width: 150px;
    color: #2d2d2d;

    &::placeholder {
      color: #b0b0b0;
    }
  }
`;

// ===== CAB GRID =====
const CabGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// ===== CAB CARD =====
const CabCard = styled.div`
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 60px rgba(255, 107, 89, 0.1);
    border-color: rgba(255, 107, 89, 0.15);
  }
`;

const CabImage = styled.div`
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

const CabBadge = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  background: ${({ color }) => color || 'linear-gradient(135deg, #FF6B59, #FFB347)'};
  color: #fff;
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
`;

const CabSpecial = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  background: #FF6B59;
  color: #fff;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  animation: pulse 2s infinite;
  box-shadow: 0 4px 15px rgba(255, 107, 89, 0.3);

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

const CabContent = styled.div`
  padding: 24px;
`;

const CabTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2d2d2d;
  margin-bottom: 4px;
`;

const CabSubtitle = styled.p`
  font-size: 14px;
  color: #8a8a8a;
  margin-bottom: 12px;
`;

const CabSpecs = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin: 12px 0 16px;
  padding: 12px 0;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #6b6b6b;

    i {
      color: #FF6B59;
      font-size: 14px;
    }
  }
`;

const CabFeatures = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;

  span {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    background: #f8f8f8;
    border-radius: 50px;
    font-size: 12px;
    color: #6b6b6b;

    i {
      color: #00BCB4;
      font-size: 11px;
    }
  }
`;

const CabFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;

  @media (max-width: 380px) {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
`;

const CabPrice = styled.div`
  display: flex;
  flex-direction: column;

  .amount {
    font-size: 28px;
    font-weight: 800;
    color: #FF6B59;
    line-height: 1;
  }

  .per-km {
    font-size: 13px;
    color: #8a8a8a;
  }

  .min-charge {
    font-size: 12px;
    color: #b0b0b0;
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
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 107, 89, 0.3);
  }

  @media (max-width: 380px) {
    justify-content: center;
  }
`;

// ===== SPECIAL DEMAND SECTION =====
const SpecialSection = styled.section`
  padding: 60px 0;
  background: linear-gradient(135deg, #2d2d2d 0%, #1a1a2e 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 107, 89, 0.08), transparent);
    top: -100px;
    right: -100px;
    border-radius: 50%;
  }
`;

const SpecialContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;

  h2 {
    font-size: 38px;
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

const SpecialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const SpecialCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 107, 89, 0.3);
  }

  .icon {
    font-size: 48px;
    margin-bottom: 16px;
    display: block;
  }

  h4 {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.6;
  }

  .price {
    font-size: 28px;
    font-weight: 800;
    color: #FFB347;
    margin: 12px 0;
    display: block;
  }
`;

const SpecialBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 32px;
  background: linear-gradient(135deg, #FF6B59 0%, #FFB347 100%);
  color: #fff;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(255, 107, 89, 0.3);
  }
`;

// ===== CTA =====
const CTASection = styled.section`
  padding: 60px 0;
  background: linear-gradient(135deg, #2d2d2d 0%, #1a1a2e 100%);
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const CTAContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;

  h2 {
    font-size: 32px;
    font-weight: 900;
    color: #fff;
    margin-bottom: 12px;

    @media (max-width: 768px) {
      font-size: 24px;
    }
  }

  p {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
    max-width: 600px;
    margin: 0 auto 20px;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 36px;
  background: linear-gradient(135deg, #FF6B59 0%, #FFB347 100%);
  color: #fff;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(255, 107, 89, 0.3);
  }
`;

// ===== CARS COMPONENT =====
const Cars = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const cabData = [
    {
      id: 1,
      name: "Toyota Crysta",
      subtitle: "Premium 7-Seater Luxury SUV",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500",
      badge: "Luxury",
      badgeColor: "linear-gradient(135deg, #FF6B59, #FFB347)",
      seats: 7,
      bags: 3,
      ac: true,
      features: ["Leather Seats", "Sunroof", "Premium Sound", "Chauffeur"],
      price: 18,
      minCharge: 800,
      category: "luxury",
      special: false
    },
    {
      id: 2,
      name: "Maruti Ertiga",
      subtitle: "Comfortable Family 7-Seater MPV",
      image: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=500",
      badge: "Family",
      badgeColor: "linear-gradient(135deg, #00BCB4, #00A8A0)",
      seats: 7,
      bags: 3,
      ac: true,
      features: ["Spacious", "AC", "Family Friendly", "Economical"],
      price: 14,
      minCharge: 600,
      category: "family",
      special: false
    },
    {
      id: 3,
      name: "Honda City",
      subtitle: "Premium Sedan for Executive Travel",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500",
      badge: "Sedan",
      badgeColor: "linear-gradient(135deg, #FFB347, #FFD93D)",
      seats: 5,
      bags: 2,
      ac: true,
      features: ["Premium Interior", "Luxury", "Comfort Ride", "Executive"],
      price: 12,
      minCharge: 500,
      category: "sedan",
      special: false
    },
    {
      id: 4,
      name: "Toyota Hycross",
      subtitle: "Premium 7-Seater SUV with Panoramic Roof",
      image: "https://images.unsplash.com/photo-1550355291-bbee04a4cb7f?w=500",
      badge: "SUV",
      badgeColor: "linear-gradient(135deg, #00BCB4, #00D4C0)",
      seats: 7,
      bags: 4,
      ac: true,
      features: ["Panoramic Roof", "Ventilated Seats", "Premium", "SUV"],
      price: 22,
      minCharge: 1000,
      category: "luxury",
      special: true
    },
    {
      id: 5,
      name: "Tempo Traveller",
      subtitle: "12-Seater Group Tour Vehicle",
      image: "https://images.unsplash.com/photo-1549317661-bf32b8ea0d4e?w=500",
      badge: "Group",
      badgeColor: "linear-gradient(135deg, #FF6B59, #EE5A24)",
      seats: 12,
      bags: 6,
      ac: true,
      features: ["Spacious", "Group Friendly", "Luggage Space", "Comfort"],
      price: 28,
      minCharge: 1500,
      category: "group",
      special: false
    },
    {
      id: 6,
      name: "Force Urbania",
      subtitle: "Premium 9-Seater Luxury Van",
      image: "https://images.unsplash.com/photo-1549317661-bf32b8ea0d4e?w=500",
      badge: "Luxury Van",
      badgeColor: "linear-gradient(135deg, #FF6B59, #FFB347)",
      seats: 9,
      bags: 5,
      ac: true,
      features: ["Luxury Interior", "Premium", "Spacious", "Comfort"],
      price: 32,
      minCharge: 1800,
      category: "luxury",
      special: true
    },
    {
      id: 7,
      name: "Mercedes-Benz S-Class",
      subtitle: "Ultimate Luxury Sedan for VIP Travel",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500",
      badge: "VIP Luxury",
      badgeColor: "linear-gradient(135deg, #FF6B59, #FFB347)",
      seats: 4,
      bags: 2,
      ac: true,
      features: ["Massage Seats", "Ambient Light", "Premium Sound", "VIP Service"],
      price: 45,
      minCharge: 2500,
      category: "special-demand",
      special: true,
      isSpecialDemand: true
    },
    {
      id: 8,
      name: "BMW 7 Series",
      subtitle: "Executive Luxury Sedan with Driver",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500",
      badge: "Executive",
      badgeColor: "linear-gradient(135deg, #FF6B59, #FFB347)",
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
    { id: 'all', label: 'All Vehicles' },
    { id: 'luxury', label: '💎 Luxury' },
    { id: 'family', label: '👨‍👩‍👧‍👦 Family' },
    { id: 'sedan', label: '🚗 Sedan' },
    { id: 'group', label: '👥 Group' },
    { id: 'special-demand', label: '⭐ Special Demand' }
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
      {/* ===== HERO SECTION ===== */}
      <HeroSection>
        <HeroContent>
          <HeroBadge>Premium Fleet</HeroBadge>
          <HeroTitle>
            Choose Your <span className="highlight">Perfect Ride</span>
          </HeroTitle>
          <HeroSubtitle>
            From luxury sedans to spacious vans, we have the perfect vehicle for every journey. 
            Premium cars available on special demand for VIP experiences.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      {/* ===== CAB CATEGORIES ===== */}
      <Section bg="#faf6f0">
        <Container>
          {/* Filter Section */}
          <FilterSection>
            <FilterTitle>
              <i className="fas fa-sliders-h"></i> Filter Vehicles
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
                placeholder="Search vehicles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchBox>
          </FilterSection>

          {/* Results Count */}
          <div style={{ 
            marginBottom: '20px', 
            color: '#8a8a8a', 
            fontSize: '14px',
            textAlign: 'center'
          }}>
            Showing {filteredCabs.length} vehicle{filteredCabs.length !== 1 ? 's' : ''}
          </div>

          {/* Cab Grid */}
          <CabGrid>
            {filteredCabs.map((cab) => (
              <CabCard key={cab.id}>
                <CabImage>
                  <img src={cab.image} alt={cab.name} />
                  <CabBadge color={cab.badgeColor}>{cab.badge}</CabBadge>
                  {cab.isSpecialDemand && (
                    <CabSpecial>⭐ Special Demand</CabSpecial>
                  )}
                </CabImage>
                <CabContent>
                  <CabTitle>{cab.name}</CabTitle>
                  <CabSubtitle>{cab.subtitle}</CabSubtitle>
                  <CabSpecs>
                    <span><i className="fas fa-users"></i> {cab.seats} Seats</span>
                    <span><i className="fas fa-suitcase"></i> {cab.bags} Bags</span>
                    <span><i className="fas fa-snowflake"></i> {cab.ac ? 'AC' : 'Non-AC'}</span>
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
                      <span className="min-charge">Min. {cab.minCharge} km charge</span>
                    </CabPrice>
                    <BookBtn to="/contact">Book Now <i className="fas fa-arrow-right"></i></BookBtn>
                  </CabFooter>
                </CabContent>
              </CabCard>
            ))}
          </CabGrid>

          {filteredCabs.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#8a8a8a'
            }}>
              <i className="fas fa-search" style={{ fontSize: '48px', marginBottom: '20px', color: '#FF6B59' }}></i>
              <h3 style={{ color: '#2d2d2d', marginBottom: '10px' }}>No vehicles found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          )}
        </Container>
      </Section>

      {/* ===== SPECIAL DEMAND SECTION ===== */}
      <SpecialSection>
        <Container>
          <SpecialContent>
            <h2>⭐ Luxury Vehicles on <span style={{ background: 'linear-gradient(135deg, #FF6B59, #FFB347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Special Demand</span></h2>
            <p>
              Experience the ultimate luxury with our premium vehicles available on special request. 
              Perfect for VIP events, weddings, corporate travel, and special occasions.
            </p>
            <SpecialGrid>
              {specialCabs.map((cab) => (
                <SpecialCard key={cab.id}>
                  <span className="icon">��</span>
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
                  <SpecialBtn to="/contact">Request Now <i className="fas fa-arrow-right"></i></SpecialBtn>
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
            <h2>Need a <span style={{ background: 'linear-gradient(135deg, #FF6B59, #FFB347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Custom</span> Vehicle?</h2>
            <p>
              Don't see what you're looking for? We have a wide range of vehicles available. 
              Contact us for special requests and custom requirements.
            </p>
            <CTAButton to="/contact">Contact Us <i className="fas fa-arrow-right"></i></CTAButton>
          </CTAContent>
        </Container>
      </CTASection>
    </PageContainer>
  );
};

export default Cars;
