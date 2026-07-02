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

// ===== MONTH TABS =====
const MonthTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
  padding: 16px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  justify-content: center;
`;

const MonthTab = styled.button`
  padding: 10px 24px;
  border: 2px solid ${({ active }) => active ? '#FF6B59' : '#e8e8e8'};
  background: ${({ active }) => active ? '#FF6B59' : 'transparent'};
  color: ${({ active }) => active ? '#fff' : '#6b6b6b'};
  border-radius: 50px;
  font-size: 14px;
  font-weight: ${({ active }) => active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: #FF6B59;
    color: ${({ active }) => active ? '#fff' : '#FF6B59'};
  }

  .count {
    background: ${({ active }) => active ? 'rgba(255,255,255,0.2)' : '#f0f0f0'};
    padding: 2px 10px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 600;
  }
`;

// ===== TOUR GRID =====
const TourGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 30px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// ===== TOUR CARD =====
const TourCard = styled.div`
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
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
`;

const TourDiscount = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  background: #00BCB4;
  color: #fff;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 11px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 188, 180, 0.3);
`;

const TourContent = styled.div`
  padding: 24px;
`;

const TourTitle = styled.h3`
  font-size: 19px;
  font-weight: 700;
  color: #2d2d2d;
  margin-bottom: 8px;
  line-height: 1.3;
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

const TourDates = styled.div`
  display: flex;
  gap: 16px;
  margin: 8px 0 12px;
  padding: 10px 14px;
  background: #f8f9fa;
  border-radius: 10px;
  font-size: 13px;
  flex-wrap: wrap;

  .date-item {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #2d2d2d;

    i {
      color: #FF6B59;
      font-size: 14px;
    }

    .label {
      color: #8a8a8a;
      font-weight: 500;
    }

    .value {
      font-weight: 600;
      color: #2d2d2d;
    }
  }
`;

const TourFeatures = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 12px 0 16px;
  padding: 12px 0;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;

  span {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    color: #6b6b6b;

    i {
      color: #00BCB4;
      font-size: 14px;
    }
  }
`;

const TourFooter = styled.div`
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

const TourPrice = styled.div`
  display: flex;
  flex-direction: column;

  .amount {
    font-size: 28px;
    font-weight: 800;
    color: #FF6B59;
    line-height: 1;
  }

  .per-person {
    font-size: 13px;
    color: #8a8a8a;
  }

  .original-price {
    font-size: 14px;
    color: #b0b0b0;
    text-decoration: line-through;
    margin-left: 8px;
    font-weight: 400;
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

// ===== EMPTY STATE =====
const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #8a8a8a;

  i {
    font-size: 48px;
    margin-bottom: 20px;
    color: #FF6B59;
  }

  h3 {
    color: #2d2d2d;
    margin-bottom: 10px;
  }

  p {
    font-size: 15px;
  }
`;

// ===== CTA SECTION =====
const CTASection = styled.section`
  padding: 60px 0;
  background: linear-gradient(135deg, #2d2d2d 0%, #1a1a2e 100%);
  position: relative;
  overflow: hidden;
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

// ===== TOURS COMPONENT =====
const Tours = () => {
  const [selectedMonth, setSelectedMonth] = useState('january');

  const tripData = {
    january: [
      {
        id: 1,
        title: "Haridwar, Rishikesh & Shivpuri Camping Yatra",
        location: "Uttarakhand, India",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
        badge: "Adventure",
        badgeColor: "linear-gradient(135deg, #00BCB4, #00D4C0)",
        features: ["Camping", "River Rafting", "Ganga Aarti", "Yoga"],
        price: 6999,
        originalPrice: 8999,
        days: "4 Days / 3 Nights",
        departureDate: "Jan 15, 2025",
        arrivalDate: "Jan 18, 2025",
        rating: 4.7,
        description: "Experience the spiritual and adventurous side of Uttarakhand with this comprehensive tour package. Visit the holy cities of Haridwar and Rishikesh, enjoy thrilling river rafting, and camp under the stars at Shivpuri.",
        itinerary: [
          { day: "Day 1", title: "Arrival in Haridwar", description: "Arrive in Haridwar, check-in to hotel, evening Ganga Aarti at Har Ki Pauri." },
          { day: "Day 2", title: "Haridwar to Rishikesh", description: "Visit Mansa Devi Temple, Chandi Devi Temple, drive to Rishikesh, explore Laxman Jhula and Ram Jhula." },
          { day: "Day 3", title: "Rishikesh to Shivpuri", description: "Enjoy river rafting in Rishikesh, drive to Shivpuri, camping with bonfire." },
          { day: "Day 4", title: "Departure", description: "Morning nature walk, breakfast, drive back to Haridwar for departure." }
        ]
      },
      {
        id: 2,
        title: "Khatu Shyam, Salasar Balaji & Rani Sati Darshan",
        location: "Rajasthan, India",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600",
        badge: "Pilgrimage",
        badgeColor: "linear-gradient(135deg, #FF6B59, #EE5A24)",
        features: ["Temple Darshan", "Private Car", "Guide Included", "Prasad"],
        price: 4999,
        originalPrice: 6499,
        days: "3 Days / 2 Nights",
        departureDate: "Jan 22, 2025",
        arrivalDate: "Jan 24, 2025",
        rating: 4.9,
        description: "Embark on a spiritual journey to three of Rajasthan's most revered temples. Visit Khatu Shyam Ji, Salasar Balaji, and Rani Sati Temple with expert guides and comfortable transport.",
        itinerary: [
          { day: "Day 1", title: "Delhi to Khatu Shyam", description: "Depart from Delhi, visit Khatu Shyam Temple, overnight stay in Khatu." },
          { day: "Day 2", title: "Khatu to Salasar Balaji", description: "Visit Salasar Balaji Temple, proceed to Rani Sati Temple, overnight stay." },
          { day: "Day 3", title: "Return to Delhi", description: "Morning darshan, breakfast, drive back to Delhi with blessings." }
        ]
      }
    ],
    february: [
      {
        id: 3,
        title: "Vrindavan, Barshana & Bhandirvan Spiritual Tour",
        location: "Uttar Pradesh, India",
        image: "https://images.unsplash.com/photo-1544717305-278b9c5136ac?w=600",
        badge: "Spiritual",
        badgeColor: "linear-gradient(135deg, #FFB347, #FF8C00)",
        features: ["Temple Tours", "Evening Aarti", "Local Guide", "Bhajan"],
        price: 3499,
        originalPrice: 4499,
        days: "2 Days / 1 Night",
        departureDate: "Feb 10, 2025",
        arrivalDate: "Feb 11, 2025",
        rating: 4.9,
        description: "Experience the divine land of Lord Krishna with visits to Vrindavan, Barshana (Radha's village), and Bhandirvan. Witness evening aartis and immerse in devotional bhajans.",
        itinerary: [
          { day: "Day 1", title: "Vrindavan Exploration", description: "Visit Banke Bihari Temple, ISKCON Temple, and other sacred sites in Vrindavan." },
          { day: "Day 2", title: "Barshana & Bhandirvan", description: "Visit Barshana (Radha Rani Temple), explore Bhandirvan forest, return to Delhi." }
        ]
      },
      {
        id: 4,
        title: "Manali, Sisu, Kasol & Manikaran Sahib Tour",
        location: "Himachal Pradesh, India",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600",
        badge: "Hill Station",
        badgeColor: "linear-gradient(135deg, #00BCB4, #00A8A0)",
        features: ["Scenic Views", "River Rafting", "Sightseeing", "Local Food"],
        price: 8499,
        originalPrice: 10499,
        days: "5 Days / 4 Nights",
        departureDate: "Feb 20, 2025",
        arrivalDate: "Feb 24, 2025",
        rating: 4.8,
        description: "Discover the stunning beauty of Himachal Pradesh with visits to Manali, Sisu, Kasol, and the sacred Manikaran Sahib. Perfect for nature lovers and adventure seekers.",
        itinerary: [
          { day: "Day 1", title: "Arrival in Manali", description: "Drive from Delhi to Manali, check-in, explore local market." },
          { day: "Day 2", title: "Manali Sightseeing", description: "Visit Hadimba Temple, Vashisht Temple, Solang Valley, and Sisu." },
          { day: "Day 3", title: "Manali to Kasol", description: "Drive to Kasol, explore the scenic Parvati Valley, visit Manikaran Sahib." },
          { day: "Day 4", title: "Kasol Exploration", description: "Explore Kasol, nature walks, local cafes, and nearby villages." },
          { day: "Day 5", title: "Return to Delhi", description: "Drive back to Delhi with beautiful memories of the mountains." }
        ]
      }
    ],
    march: [
      {
        id: 5,
        title: "Haridwar - Mansa Devi & Chandi Devi Same Day Tour",
        location: "Uttarakhand, India",
        image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600",
        badge: "Same Day",
        badgeColor: "linear-gradient(135deg, #FFB347, #FFD93D)",
        features: ["Cable Car", "Temple Darshan", "Local Lunch", "Guide"],
        price: 2499,
        originalPrice: 2999,
        days: "1 Day",
        departureDate: "Mar 5, 2025",
        arrivalDate: "Mar 5, 2025",
        rating: 4.6,
        description: "A perfect one-day pilgrimage to two of Haridwar's most important temples - Mansa Devi and Chandi Devi. Enjoy cable car rides and panoramic views.",
        itinerary: [
          { day: "Day 1", title: "Same Day Tour", description: "Morning arrival in Haridwar, visit Mansa Devi Temple via cable car, visit Chandi Devi Temple, local lunch, evening Ganga Aarti, return." }
        ]
      }
    ],
    april: [],
    may: [],
    june: [],
    july: [],
    august: [],
    september: [],
    october: [],
    november: [],
    december: []
  };

  const months = [
    { id: 'january', label: 'January' },
    { id: 'february', label: 'February' },
    { id: 'march', label: 'March' },
    { id: 'april', label: 'April' },
    { id: 'may', label: 'May' },
    { id: 'june', label: 'June' },
    { id: 'july', label: 'July' },
    { id: 'august', label: 'August' },
    { id: 'september', label: 'September' },
    { id: 'october', label: 'October' },
    { id: 'november', label: 'November' },
    { id: 'december', label: 'December' }
  ];

  const currentTrips = tripData[selectedMonth] || [];

  return (
    <PageContainer>
      {/* ===== HERO SECTION ===== */}
      <HeroSection>
        <HeroContent>
          <HeroBadge>Explore Our Tours</HeroBadge>
          <HeroTitle>
            Discover <span className="highlight">Amazing</span> <br />
            Tour Packages
          </HeroTitle>
          <HeroSubtitle>
            From spiritual pilgrimages to adventure getaways, explore our curated collection 
            of tour packages across India. Book your dream journey today!
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      {/* ===== TOURS SECTION ===== */}
      <Section bg="#faf6f0">
        <Container>
          {/* Month Tabs */}
          <MonthTabs>
            {months.map(month => (
              <MonthTab
                key={month.id}
                active={selectedMonth === month.id}
                onClick={() => setSelectedMonth(month.id)}
              >
                {month.label}
                <span className="count">{(tripData[month.id] || []).length}</span>
              </MonthTab>
            ))}
          </MonthTabs>

          {/* Results Count */}
          <div style={{ 
            marginBottom: '20px', 
            color: '#8a8a8a', 
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {months.find(m => m.id === selectedMonth)?.label} - {currentTrips.length} trip{currentTrips.length !== 1 ? 's' : ''} available
          </div>

          {/* Tour Grid */}
          {currentTrips.length > 0 ? (
            <TourGrid>
              {currentTrips.map((trip) => (
                <TourCard key={trip.id}>
                  <TourImage>
                    <img src={trip.image} alt={trip.title} />
                    <TourBadge color={trip.badgeColor}>{trip.badge}</TourBadge>
                    {trip.originalPrice && (
                      <TourDiscount>Save {Math.round(((trip.originalPrice - trip.price) / trip.originalPrice) * 100)}%</TourDiscount>
                    )}
                  </TourImage>
                  <TourContent>
                    <TourTitle>{trip.title}</TourTitle>
                    <TourLocation>
                      <i className="fas fa-map-marker-alt"></i>
                      {trip.location}
                      <span style={{ marginLeft: 'auto', color: '#FFB347' }}>
                        <i className="fas fa-star"></i> {trip.rating}
                      </span>
                    </TourLocation>
                    
                    {/* Departure & Arrival Dates */}
                    <TourDates>
                      <span className="date-item">
                        <i className="fas fa-plane-departure"></i>
                        <span className="label">Departure:</span>
                        <span className="value">{trip.departureDate}</span>
                      </span>
                      <span className="date-item">
                        <i className="fas fa-plane-arrival"></i>
                        <span className="label">Arrival:</span>
                        <span className="value">{trip.arrivalDate}</span>
                      </span>
                    </TourDates>

                    <div style={{ fontSize: '14px', color: '#00BCB4', fontWeight: '600' }}>
                      <i className="fas fa-calendar-alt"></i> {trip.days}
                    </div>

                    <TourFeatures>
                      {trip.features.map((feature, idx) => (
                        <span key={idx}>
                          <i className="fas fa-check-circle"></i> {feature}
                        </span>
                      ))}
                    </TourFeatures>

                    <TourFooter>
                      <TourPrice>
                        <div>
                          <span className="amount">₹{trip.price.toLocaleString()}</span>
                          {trip.originalPrice && (
                            <span className="original-price">₹{trip.originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                        <span className="per-person">per person</span>
                      </TourPrice>
                      <BookBtn to="/booking" state={{ tour: trip }}>Book Now <i className="fas fa-arrow-right"></i></BookBtn>
                    </TourFooter>
                  </TourContent>
                </TourCard>
              ))}
            </TourGrid>
          ) : (
            <EmptyState>
              <i className="fas fa-calendar-plus"></i>
              <h3>No trips planned for this month</h3>
              <p>Check back later for upcoming tours in {months.find(m => m.id === selectedMonth)?.label}</p>
            </EmptyState>
          )}
        </Container>
      </Section>

      {/* ===== CTA SECTION ===== */}
      <CTASection>
        <Container>
          <CTAContent>
            <h2>Need a <span style={{ background: 'linear-gradient(135deg, #FF6B59, #FFB347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Custom Tour</span> Package?</h2>
            <p>
              Don't see what you're looking for? We create custom tour packages tailored to 
              your preferences. Contact us and let's plan your perfect journey!
            </p>
            <CTAButton to="/contact">Contact Us <i className="fas fa-arrow-right"></i></CTAButton>
          </CTAContent>
        </Container>
      </CTASection>
    </PageContainer>
  );
};

export default Tours;
