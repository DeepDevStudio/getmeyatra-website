import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getYatras } from '../services/api';
import { colors, shadows, breakpoints } from '../styles/theme';

// ============================================
// STYLED COMPONENTS
// ============================================

const PageContainer = styled.div`
  padding-top: 160px;
  padding-bottom: 60px;
  background: ${colors.background.main};
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

// ===== HERO SECTION =====
const HeroSection = styled.div`
  background: ${colors.primary.gradient};
  border-radius: 16px;
  padding: 60px 40px;
  color: #fff;
  text-align: center;
  margin-bottom: 60px;

  h1 {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 16px;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.8;
  }

  @media (max-width: ${breakpoints.md}) {
    padding: 40px 20px;
    h1 {
      font-size: 2.2rem;
    }
  }
`;

// ===== SECTION =====
const Section = styled.div`
  margin-bottom: 60px;

  h2 {
    font-size: 2rem;
    font-weight: 800;
    color: ${colors.neutral[900]};
    margin-bottom: 8px;
  }

  .subtitle {
    color: ${colors.neutral[600]};
    font-size: 1.1rem;
    margin-bottom: 32px;
  }

  .gradient-text {
    background: ${colors.primary.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

// ===== OUR STORY =====
const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;

  .story-text {
    p {
      color: ${colors.neutral[600]};
      line-height: 1.8;
      margin-bottom: 16px;
      font-size: 1.05rem;
    }
  }

  .story-image {
    background: ${colors.primary.gradient};
    border-radius: 16px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80px;
    color: #fff;
    opacity: 0.7;
  }

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
    .story-image {
      height: 200px;
      order: -1;
    }
  }
`;

// ===== STATS =====
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  .stat-card {
    background: ${colors.background.card};
    padding: 30px 20px;
    border-radius: 12px;
    text-align: center;
    box-shadow: ${shadows.sm};
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: ${shadows.lg};
    }

    .number {
      font-size: 2.5rem;
      font-weight: 900;
      color: ${colors.primary.main};
      display: block;
    }

    .label {
      color: ${colors.neutral[600]};
      font-size: 14px;
      margin-top: 4px;
    }
  }

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

// ===== WHY CHOOSE US =====
const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  .why-card {
    background: ${colors.background.card};
    padding: 30px;
    border-radius: 12px;
    box-shadow: ${shadows.sm};
    transition: all 0.3s ease;
    text-align: center;

    &:hover {
      transform: translateY(-5px);
      box-shadow: ${shadows.lg};
    }

    .icon {
      font-size: 40px;
      margin-bottom: 12px;
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

// ===== TEAM SECTION =====
const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;

  .team-card {
    background: ${colors.background.card};
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    box-shadow: ${shadows.sm};
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: ${shadows.lg};
    }

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: ${colors.primary.gradient};
      margin: 0 auto 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      color: #fff;
    }

    .name {
      font-weight: 700;
      color: ${colors.neutral[900]};
      font-size: 1rem;
    }

    .role {
      color: ${colors.neutral[500]};
      font-size: 13px;
    }
  }
`;

// ===== CTA SECTION =====
const CTASection = styled.div`
  background: ${colors.primary.gradient};
  border-radius: 16px;
  padding: 50px 40px;
  text-align: center;
  color: #fff;

  h2 {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 8px;
  }

  p {
    opacity: 0.9;
    margin-bottom: 24px;
    font-size: 1.1rem;
  }

  .cta-btn {
    display: inline-block;
    padding: 14px 40px;
    background: #fff;
    color: ${colors.primary.main};
    border-radius: 50px;
    font-weight: 700;
    font-size: 16px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.3);
    }
  }

  @media (max-width: ${breakpoints.md}) {
    padding: 30px 20px;
    h2 {
      font-size: 1.5rem;
    }
  }
`;

// ============================================
// NEW: FLOATING WHATSAPP BUTTON
// ============================================
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

// ============================================
// COMPONENT
// ============================================

function About() {
  const [stats, setStats] = useState({
    travelers: '1000+',
    destinations: '50+',
    customized: '100%',
    satisfaction: '98%'
  });

  useEffect(() => {
    // Fetch real stats from API
    const fetchStats = async () => {
      try {
        const data = await getYatras();
        if (data && data.length > 0) {
          // Calculate real stats
          const totalTours = data.length;
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

          // Get total seats from all tours
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

  // Team members
  const team = [
    { name: 'Sanjeev', role: 'Co-Founder & CEO', emoji: '👨‍💼' },
    { name: 'Rajeev', role: 'Co-Founder & Director', emoji: '👨‍💼' },
    { name: 'Hritik', role: 'Senior Developer', emoji: '👨‍💻' },
    { name: 'Deepanshu', role: 'Developer', emoji: '🧑‍💻' },
    { name: 'Dev', role: 'Team Member', emoji: '👨‍💻' },
    { name: 'Muskan', role: 'Team Member', emoji: '👩‍💼' },
    { name: 'Riya', role: 'Team Member', emoji: '👩‍💼' },
  ];

  return (
    <PageContainer>
      <Container>
        {/* Hero Section */}
        <HeroSection>
          <h1>🙏 About GetMeYatra</h1>
          <p>
            Your trusted travel partner for spiritual journeys, hill station retreats,
            and adventure tours across India. We believe in creating memorable experiences
            that connect you with the divine and scenic beauty of our country.
          </p>
        </HeroSection>

        {/* Our Story */}
        <Section>
          <StoryGrid>
            <div className="story-text">
              <h2>Our <span className="gradient-text">Story</span></h2>
              <p className="subtitle">From a small dream to a trusted travel partner</p>
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
            </div>
            <div className="story-image">🚐</div>
          </StoryGrid>
        </Section>

        {/* Stats */}
        <Section>
          <h2 style={{ textAlign: 'center' }}>Our <span className="gradient-text">Impact</span></h2>
          <p className="subtitle" style={{ textAlign: 'center' }}>
            Numbers that tell our story
          </p>
          <StatsGrid>
            <div className="stat-card">
              <span className="number">{stats.travelers}</span>
              <span className="label">Happy Travelers</span>
            </div>
            <div className="stat-card">
              <span className="number">{stats.destinations}</span>
              <span className="label">Destinations</span>
            </div>
            <div className="stat-card">
              <span className="number">{stats.customized}</span>
              <span className="label">Customized Tours</span>
            </div>
            <div className="stat-card">
              <span className="number">{stats.satisfaction}</span>
              <span className="label">Satisfaction Rate</span>
            </div>
          </StatsGrid>
        </Section>

        {/* Why Choose Us */}
        <Section>
          <h2 style={{ textAlign: 'center' }}>Why <span className="gradient-text">Choose Us</span></h2>
          <p className="subtitle" style={{ textAlign: 'center' }}>
            What makes us different
          </p>
          <WhyGrid>
            <div className="why-card">
              <div className="icon">🙏</div>
              <h4>Spiritual Expertise</h4>
              <p>Deep knowledge of pilgrimage routes and sacred traditions across India.</p>
            </div>
            <div className="why-card">
              <div className="icon">🚗</div>
              <h4>Premium Fleet</h4>
              <p>Wide range of vehicles from sedans to luxury vans for every group size.</p>
            </div>
            <div className="why-card">
              <div className="icon">💰</div>
              <h4>Best Price Guarantee</h4>
              <p>Competitive pricing with transparent billing and no hidden charges.</p>
            </div>
            <div className="why-card">
              <div className="icon">⭐</div>
              <h4>5-Star Service</h4>
              <p>Personalized attention and exceptional customer care from booking to return.</p>
            </div>
            <div className="why-card">
              <div className="icon">🌏</div>
              <h4>Pan India Network</h4>
              <p>Extensive presence across major cities and tourist destinations in India.</p>
            </div>
            <div className="why-card">
              <div className="icon">🛡️</div>
              <h4>Safety First</h4>
              <p>Regularly maintained vehicles and trained drivers for your safety.</p>
            </div>
          </WhyGrid>
        </Section>

        {/* Team */}
        <Section>
          <h2 style={{ textAlign: 'center' }}>Our <span className="gradient-text">Team</span></h2>
          <p className="subtitle" style={{ textAlign: 'center' }}>
            The people behind your journeys
          </p>
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

        {/* CTA */}
        <CTASection>
          <h2>Ready for Your Next Journey?</h2>
          <p>
            Experience the divine and scenic beauty of India with GetMeYatra.
            Book your spiritual or adventure tour today!
          </p>
          <Link to="/tours" className="cta-btn">
            Explore Tours →
          </Link>
        </CTASection>
      </Container>

      {/* ===== FLOATING WHATSAPP BUTTON ===== */}
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
