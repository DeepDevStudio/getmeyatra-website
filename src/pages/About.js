import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  padding-top: 0;
  background: #faf6f0;
`;

// ===== HERO SECTION =====
const HeroSection = styled.section`
  padding: 160px 0 80px;
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

  @media (max-width: 768px) {
    font-size: 16px;
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
  background: rgba(255, 107, 89, 0.08);
  color: #FF6B59;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SectionTitle = styled.h2`
  font-size: 38px;
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
    font-size: 28px;
  }
`;

const SectionSubtitle = styled.p`
  color: #8a8a8a;
  max-width: 600px;
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.6;
`;

// ===== ABOUT STORY =====
const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const StoryImage = styled.div`
  img {
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  }
`;

const StoryContent = styled.div`
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
`;

// ===== STATS =====
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(255, 107, 89, 0.08);
    border-color: rgba(255, 107, 89, 0.15);
  }

  .number {
    font-size: 42px;
    font-weight: 900;
    color: #FF6B59;
    display: block;
  }

  .label {
    font-size: 14px;
    color: #8a8a8a;
    margin-top: 8px;
    display: block;
  }
`;

// ===== MISSION VISION =====
const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MissionCard = styled.div`
  background: #fff;
  padding: 40px 30px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(255, 107, 89, 0.08);
  }

  .icon {
    font-size: 48px;
    margin-bottom: 16px;
    display: block;
  }

  h4 {
    font-size: 20px;
    font-weight: 700;
    color: #2d2d2d;
    margin-bottom: 10px;
  }

  p {
    color: #8a8a8a;
    line-height: 1.7;
    font-size: 14px;
  }
`;

// ===== TEAM =====
const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const TeamCard = styled.div`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(255, 107, 89, 0.08);
  }

  .image {
    height: 220px;
    background: linear-gradient(135deg, #FF6B59 0%, #FFB347 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 72px;
    color: rgba(255, 255, 255, 0.3);
  }

  .info {
    padding: 20px;

    h4 {
      font-size: 18px;
      font-weight: 700;
      color: #2d2d2d;
      margin-bottom: 4px;
    }

    p {
      font-size: 14px;
      color: #8a8a8a;
    }
  }
`;

// ===== VALUES =====
const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
`;

const ValueCard = styled.div`
  background: #fff;
  padding: 30px 20px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(255, 107, 89, 0.08);
  }

  .icon {
    font-size: 36px;
    margin-bottom: 12px;
    display: block;
  }

  h4 {
    font-size: 16px;
    font-weight: 700;
    color: #2d2d2d;
    margin-bottom: 6px;
  }

  p {
    font-size: 13px;
    color: #8a8a8a;
    line-height: 1.5;
  }
`;

// ===== CTA =====
const CTASection = styled.section`
  padding: 80px 0;
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

const CTAContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;

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

// ===== ABOUT COMPONENT =====
const About = () => {
  return (
    <PageContainer>
      {/* ===== HERO SECTION ===== */}
      <HeroSection>
        <HeroContent>
          <HeroBadge>About GetMeYatra</HeroBadge>
          <HeroTitle>
            Your Trusted <span className="highlight">Travel Partner</span> <br />
            Across India
          </HeroTitle>
          <HeroSubtitle>
            We are a premier pan-India tour and cab service provider dedicated to making your 
            travel experiences unforgettable with premium vehicles and expert guidance.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      {/* ===== OUR STORY ===== */}
      <Section bg="#ffffff">
        <Container>
          <SectionHeader>
            <SectionTag>Our Story</SectionTag>
            <SectionTitle>Journey of <span className="gradient-text">GetMeYatra</span></SectionTitle>
            <SectionSubtitle>From a small vision to a trusted pan-India travel partner.</SectionSubtitle>
          </SectionHeader>
          <StoryGrid>
            <StoryImage>
              <img 
                src="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600" 
                alt="Our Journey" 
              />
            </StoryImage>
            <StoryContent>
              <h3>Your Journey, Our <span style={{ background: 'linear-gradient(135deg, #FF6B59, #FFB347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Passion</span></h3>
              <p>
                GetMeYatra was founded with a simple yet powerful vision: to make travel accessible, 
                enjoyable, and memorable for everyone. What started as a small cab service has now 
                grown into a comprehensive travel solution provider across India.
              </p>
              <p>
                From the spiritual lands of Vrindavan, Haridwar, and Rishikesh to the scenic beauty 
                of Manali, Kasol, and beyond, we've been privileged to be a part of countless 
                unforgettable journeys.
              </p>
              <p>
                Today, with a fleet of premium vehicles and a team of dedicated professionals, 
                we continue to serve thousands of happy travelers across the country.
              </p>
            </StoryContent>
          </StoryGrid>
        </Container>
      </Section>

      {/* ===== STATS ===== */}
      <Section bg="#faf6f0">
        <Container>
          <SectionHeader>
            <SectionTag>Our Numbers</SectionTag>
            <SectionTitle>GetMeYatra by <span className="gradient-text">the Numbers</span></SectionTitle>
            <SectionSubtitle>Our growth and reach in the travel industry.</SectionSubtitle>
          </SectionHeader>
          <StatsGrid>
            <StatCard>
              <span className="number">5000+</span>
              <span className="label">Happy Travelers</span>
            </StatCard>
            <StatCard>
              <span className="number">50+</span>
              <span className="label">Destinations</span>
            </StatCard>
            <StatCard>
              <span className="number">200+</span>
              <span className="label">Premium Vehicles</span>
            </StatCard>
            <StatCard>
              <span className="number">98%</span>
              <span className="label">Satisfaction Rate</span>
            </StatCard>
          </StatsGrid>
        </Container>
      </Section>

      {/* ===== MISSION & VISION ===== */}
      <Section bg="#ffffff">
        <Container>
          <SectionHeader>
            <SectionTag>Mission & Vision</SectionTag>
            <SectionTitle>Our <span className="gradient-text">Purpose</span></SectionTitle>
            <SectionSubtitle>Driven by passion, guided by purpose.</SectionSubtitle>
          </SectionHeader>
          <MissionGrid>
            <MissionCard>
              <span className="icon">🎯</span>
              <h4>Our Mission</h4>
              <p>
                To provide exceptional travel experiences through premium vehicle rentals 
                and curated tours, making every journey comfortable, safe, and memorable.
              </p>
            </MissionCard>
            <MissionCard>
              <span className="icon">👁️</span>
              <h4>Our Vision</h4>
              <p>
                To become India's most trusted travel partner, connecting people with the 
                divine and scenic beauty of the country through unparalleled service.
              </p>
            </MissionCard>
            <MissionCard>
              <span className="icon">💎</span>
              <h4>Our Values</h4>
              <p>
                Integrity, excellence, and customer-centricity are at the core of everything 
                we do. We believe in building lasting relationships through trust and quality.
              </p>
            </MissionCard>
          </MissionGrid>
        </Container>
      </Section>

      {/* ===== OUR VALUES ===== */}
      <Section bg="#faf6f0">
        <Container>
          <SectionHeader>
            <SectionTag>Core Values</SectionTag>
            <SectionTitle>What <span className="gradient-text">Drives Us</span></SectionTitle>
            <SectionSubtitle>The principles that guide our every action.</SectionSubtitle>
          </SectionHeader>
          <ValuesGrid>
            <ValueCard>
              <span className="icon">🙏</span>
              <h4>Spiritual Connection</h4>
              <p>Deep understanding of pilgrimage routes and sacred traditions.</p>
            </ValueCard>
            <ValueCard>
              <span className="icon">🚗</span>
              <h4>Premium Quality</h4>
              <p>Well-maintained vehicles and professional drivers for your safety.</p>
            </ValueCard>
            <ValueCard>
              <span className="icon">💝</span>
              <h4>Customer First</h4>
              <p>Personalized attention and care from booking to drop-off.</p>
            </ValueCard>
            <ValueCard>
              <span className="icon">🌏</span>
              <h4>Pan India Reach</h4>
              <p>Extensive network across major cities and tourist destinations.</p>
            </ValueCard>
            <ValueCard>
              <span className="icon">💰</span>
              <h4>Transparent Pricing</h4>
              <p>No hidden charges, competitive rates, and best price guarantee.</p>
            </ValueCard>
            <ValueCard>
              <span className="icon">🛡️</span>
              <h4>Safety First</h4>
              <p>Regularly sanitized vehicles and trained drivers for your safety.</p>
            </ValueCard>
          </ValuesGrid>
        </Container>
      </Section>

      {/* ===== CTA SECTION ===== */}
      <CTASection>
        <Container>
          <CTAContent>
            <h2>Ready to <span style={{ background: 'linear-gradient(135deg, #FF6B59, #FFB347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Explore</span> with Us?</h2>
            <p>
              Join thousands of happy travelers who trust GetMeYatra for their journeys. 
              Let's create unforgettable memories together.
            </p>
            <CTAButton to="/contact">Get Started <i className="fas fa-arrow-right"></i></CTAButton>
          </CTAContent>
        </Container>
      </CTASection>
    </PageContainer>
  );
};

export default About;
