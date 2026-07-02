import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';

const PageContainer = styled.div`
  padding-top: 80px;
  background: #faf6f0;
  min-height: 100vh;
`;

// ===== HERO SECTION =====
const HeroSection = styled.section`
  padding: 40px 0 30px;
  background: linear-gradient(135deg, #2d2d2d 0%, #1a1a2e 100%);

  @media (max-width: 768px) {
    padding: 30px 0 20px;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  margin-bottom: 12px;
  flex-wrap: wrap;

  a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 13px;
    &:hover {
      color: #FF6B59;
    }
  }

  span {
    color: rgba(255, 255, 255, 0.3);
  }

  .current {
    color: #FF6B59;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    gap: 5px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 6px;

  @media (max-width: 768px) {
    font-size: 26px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

// ===== MAIN CONTENT =====
const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 25px;
    padding: 20px 16px 40px;
  }

  @media (max-width: 480px) {
    padding: 15px 12px 30px;
    gap: 20px;
  }
`;

// ===== LEFT SIDE - TOUR DETAILS =====
const TourDetails = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 12px;
  }
`;

const TourImage = styled.div`
  width: 100%;
  height: 240px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    height: 200px;
  }

  @media (max-width: 480px) {
    height: 180px;
    border-radius: 8px;
    margin-bottom: 16px;
  }
`;

const TourBadge = styled.span`
  display: inline-block;
  padding: 4px 14px;
  background: linear-gradient(135deg, #FF6B59, #FFB347);
  color: #fff;
  border-radius: 50px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 3px 12px;
  }
`;

const TourTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #2d2d2d;
  margin-bottom: 6px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const TourLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #8a8a8a;
  font-size: 14px;
  margin-bottom: 14px;

  i {
    color: #FF6B59;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const MetaInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 14px;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 18px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    padding: 12px;
    gap: 8px;
  }
`;

const MetaItem = styled.div`
  text-align: center;

  .label {
    font-size: 10px;
    color: #8a8a8a;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: block;
  }

  .value {
    font-size: 14px;
    font-weight: 700;
    color: #2d2d2d;
    margin-top: 3px;
  }

  @media (max-width: 480px) {
    .value {
      font-size: 13px;
    }
  }
`;

const SectionTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: #2d2d2d;
  margin: 20px 0 10px;
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    color: #FF6B59;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    margin: 16px 0 8px;
  }
`;

const Description = styled.p`
  color: #6b6b6b;
  line-height: 1.7;
  font-size: 14px;
  margin-bottom: 14px;

  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 1.6;
  }
`;

const ItineraryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ItineraryItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 14px;
  background: #f8f9fa;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f1f2;
  }

  .day {
    font-weight: 700;
    color: #FF6B59;
    min-width: 50px;
    font-size: 13px;
  }

  .content {
    flex: 1;
    h4 {
      font-size: 13px;
      font-weight: 600;
      color: #2d2d2d;
      margin-bottom: 3px;
    }
    p {
      font-size: 12px;
      color: #8a8a8a;
      line-height: 1.5;
    }
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
    gap: 10px;
    .day {
      font-size: 12px;
      min-width: 40px;
    }
    .content {
      h4 {
        font-size: 12px;
      }
      p {
        font-size: 11px;
      }
    }
  }
`;

const FeaturesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 6px 0;

  span {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    background: #f0f4f8;
    border-radius: 50px;
    font-size: 12px;
    color: #2d2d2d;

    i {
      color: #00BCB4;
      font-size: 11px;
    }
  }

  @media (max-width: 480px) {
    gap: 5px;
    span {
      font-size: 11px;
      padding: 3px 10px;
    }
  }
`;

// ===== RIGHT SIDE - BOOKING FORM =====
const BookingForm = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 100px;

  @media (max-width: 1024px) {
    position: static;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 12px;
  }
`;

const FormTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #2d2d2d;
  margin-bottom: 6px;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const FormSubtitle = styled.p`
  color: #8a8a8a;
  font-size: 13px;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 16px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;

  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #2d2d2d;
  margin-bottom: 5px;

  .required {
    color: #FF6B59;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 11px 14px;
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: #fafafa;

  &:focus {
    outline: none;
    border-color: #FF6B59;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(255, 107, 89, 0.08);
  }

  &::placeholder {
    color: #b0b0b0;
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
    font-size: 13px;
    border-radius: 8px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 11px 14px;
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: #fafafa;
  resize: vertical;
  min-height: 90px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #FF6B59;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(255, 107, 89, 0.08);
  }

  &::placeholder {
    color: #b0b0b0;
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
    font-size: 13px;
    min-height: 70px;
    border-radius: 8px;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 11px 14px;
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: #fafafa;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #FF6B59;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(255, 107, 89, 0.08);
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
    font-size: 13px;
    border-radius: 8px;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const PriceSummary = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 18px;

  .row {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    font-size: 13px;
    color: #6b6b6b;

    &.total {
      border-top: 2px solid #e8e8e8;
      margin-top: 5px;
      padding-top: 10px;
      font-weight: 700;
      font-size: 17px;
      color: #2d2d2d;

      .amount {
        color: #FF6B59;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 12px 14px;
    .row {
      font-size: 12px;
      &.total {
        font-size: 15px;
      }
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #FF6B59 0%, #FFB347 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(255, 107, 89, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 15px;
    border-radius: 10px;
  }
`;

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 14px;
  display: ${({ show }) => show ? 'block' : 'none'};
  text-align: center;
  font-weight: 600;
  font-size: 14px;

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 10px 12px;
  }
`;

// ===== BACK BUTTON =====
const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #6b6b6b;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
  transition: all 0.3s ease;

  &:hover {
    color: #FF6B59;
  }

  i {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 12px;
  }
`;

// ===== BOOKING COMPONENT =====
const Booking = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: '1',
    date: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const defaultTour = {
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
  };

  const tour = location.state?.tour || defaultTour;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      alert('🎉 Thank you for your booking! We will contact you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        travelers: '1',
        date: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <PageContainer>
      {/* ===== HERO SECTION ===== */}
      <HeroSection>
        <HeroContent>
          <Breadcrumb>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/tours">Tours</Link>
            <span>/</span>
            <span className="current">Book Now</span>
          </Breadcrumb>
          <HeroTitle>Book Your Tour</HeroTitle>
          <HeroSubtitle>Fill in the details to confirm your booking</HeroSubtitle>
        </HeroContent>
      </HeroSection>

      {/* ===== MAIN CONTENT ===== */}
      <MainContent>
        {/* LEFT SIDE - Tour Details */}
        <TourDetails>
          <BackButton to="/tours">
            <i className="fas fa-arrow-left"></i> Back to Tours
          </BackButton>

          <TourImage>
            <img src={tour.image} alt={tour.title} />
          </TourImage>

          <TourBadge>{tour.badge}</TourBadge>
          <TourTitle>{tour.title}</TourTitle>
          <TourLocation>
            <i className="fas fa-map-marker-alt"></i>
            {tour.location}
            <span style={{ marginLeft: 'auto', color: '#FFB347' }}>
              <i className="fas fa-star"></i> {tour.rating}
            </span>
          </TourLocation>

          <MetaInfo>
            <MetaItem>
              <span className="label">Duration</span>
              <span className="value">{tour.days}</span>
            </MetaItem>
            <MetaItem>
              <span className="label">Departure</span>
              <span className="value">{tour.departureDate}</span>
            </MetaItem>
            <MetaItem>
              <span className="label">Arrival</span>
              <span className="value">{tour.arrivalDate}</span>
            </MetaItem>
          </MetaInfo>

          {/* Meta Title & Description */}
          <SectionTitle>
            <i className="fas fa-info-circle"></i> Tour Overview
          </SectionTitle>
          <Description>{tour.description}</Description>

          {/* Itinerary */}
          <SectionTitle>
            <i className="fas fa-map-signs"></i> Itinerary
          </SectionTitle>
          <ItineraryList>
            {tour.itinerary.map((item, index) => (
              <ItineraryItem key={index}>
                <span className="day">{item.day}</span>
                <div className="content">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </ItineraryItem>
            ))}
          </ItineraryList>

          {/* Features */}
          <SectionTitle>
            <i className="fas fa-check-circle"></i> Inclusions
          </SectionTitle>
          <FeaturesList>
            {tour.features.map((feature, index) => (
              <span key={index}>
                <i className="fas fa-check"></i> {feature}
              </span>
            ))}
          </FeaturesList>
        </TourDetails>

        {/* RIGHT SIDE - Booking Form */}
        <BookingForm>
          <FormTitle>Book This Tour</FormTitle>
          <FormSubtitle>Fill in your details to reserve your spot</FormSubtitle>

          <SuccessMessage show={submitted}>
            <i className="fas fa-check-circle"></i> Booking submitted successfully!
          </SuccessMessage>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Full Name <span className="required">*</span></Label>
              <Input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label>Email Address <span className="required">*</span></Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Phone Number <span className="required">*</span></Label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>Number of Travelers <span className="required">*</span></Label>
                <Select
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleChange}
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Preferred Date <span className="required">*</span></Label>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label>Special Requests</Label>
              <TextArea
                name="message"
                placeholder="Any special requirements or preferences..."
                value={formData.message}
                onChange={handleChange}
              />
            </FormGroup>

            <PriceSummary>
              <div className="row">
                <span>Price per person</span>
                <span>₹{tour.price.toLocaleString()}</span>
              </div>
              <div className="row">
                <span>Number of travelers</span>
                <span>{formData.travelers || 1}</span>
              </div>
              <div className="row total">
                <span>Total Amount</span>
                <span className="amount">₹{(tour.price * (formData.travelers || 1)).toLocaleString()}</span>
              </div>
            </PriceSummary>

            <SubmitButton type="submit">
              <i className="fas fa-check-circle"></i> Confirm Booking
            </SubmitButton>
          </form>
        </BookingForm>
      </MainContent>
    </PageContainer>
  );
};

export default Booking;
