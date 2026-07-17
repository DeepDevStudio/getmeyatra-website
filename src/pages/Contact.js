import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, breakpoints } from '../styles/theme';

const PageContainer = styled.div`
  padding-top: 0;
  background: ${colors.background.main};
`;

// ===== HERO SECTION =====
const HeroSection = styled.section`
  padding: 160px 0 60px;
  background: ${colors.primary.gradient};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent);
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
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: #fff;
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
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 16px;
    border-radius: 12px;
    display: inline-block;
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.85);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
`;

// ===== SECTION =====
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
  background: ${colors.primary.light};
  color: ${colors.primary.main};
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
  color: ${colors.neutral[900]};

  .gradient-text {
    background: ${colors.primary.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const SectionSubtitle = styled.p`
  color: ${colors.neutral[500]};
  max-width: 600px;
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.6;
`;

// ===== CONTACT GRID =====
const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

// ===== FORM =====
const Form = styled.form`
  background: ${colors.background.card};
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid ${colors.neutral[100]};

  h3 {
    font-size: 24px;
    font-weight: 700;
    color: ${colors.neutral[900]};
    margin-bottom: 8px;
  }

  .subtitle {
    color: ${colors.neutral[500]};
    font-size: 14px;
    margin-bottom: 30px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 14px;
    color: ${colors.neutral[700]};
  }
  
  input, textarea, select {
    width: 100%;
    padding: 14px 16px;
    border: 2px solid ${colors.neutral[200]};
    border-radius: 12px;
    font-size: 15px;
    transition: all 0.3s ease;
    background: ${colors.neutral[50]};
    font-family: inherit;
    
    &:focus {
      outline: none;
      border-color: ${colors.primary.main};
      box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.08);
      background: #fff;
    }

    &::placeholder {
      color: ${colors.neutral[400]};
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: ${colors.primary.gradient};
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(79, 70, 229, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

// ===== CONTACT INFO =====
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InfoCard = styled.div`
  background: ${colors.background.card};
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid ${colors.neutral[100]};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(79, 70, 229, 0.06);
    border-color: ${colors.primary.light};
  }

  h4 {
    font-size: 16px;
    font-weight: 700;
    color: ${colors.neutral[900]};
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;

    i {
      color: ${colors.primary.main};
      font-size: 18px;
    }
  }

  .item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 8px 0;
    color: ${colors.neutral[600]};
    font-size: 14px;
    border-bottom: 1px solid ${colors.neutral[100]};

    &:last-child {
      border-bottom: none;
    }

    i {
      color: ${colors.primary.main};
      width: 20px;
      font-size: 14px;
      margin-top: 2px;
    }

    a {
      color: ${colors.neutral[600]};
      text-decoration: none;
      transition: all 0.3s ease;

      &:hover {
        color: ${colors.primary.main};
      }
    }

    .label {
      font-weight: 600;
      color: ${colors.neutral[700]};
      min-width: 80px;
    }
  }
`;

// ===== MAP SECTION =====
const MapSection = styled.section`
  padding: 0 0 80px 0;
  background: ${colors.background.main};
`;

const MapContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  iframe {
    width: 100%;
    height: 400px;
    border-radius: 20px;
    border: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }
`;

// ===== CTA =====
const CTASection = styled.section`
  padding: 60px 0;
  background: ${colors.primary.gradient};
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
    color: rgba(255, 255, 255, 0.85);
    max-width: 600px;
    margin: 0 auto 20px;
  }
`;

const CTALink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  background: rgba(255,255,255,0.2);
  padding: 12px 28px;
  border-radius: 50px;
  border: 2px solid rgba(255,255,255,0.3);

  &:hover {
    gap: 15px;
    background: rgba(255,255,255,0.3);
    transform: translateY(-3px);
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

// ============================================
// COMPONENT
// ============================================

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('🎉 Thank you for your message! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setSubmitting(false);
  };

  return (
    <PageContainer>
      {/* ===== HERO SECTION ===== */}
      <HeroSection>
        <HeroContent>
          <HeroBadge>Get in Touch</HeroBadge>
          <HeroTitle>
            We'd Love to <span className="highlight">Hear</span> From You
          </HeroTitle>
          <HeroSubtitle>
            Have questions about our tours, cab services, or need help planning your journey? 
            Reach out to us and we'll get back to you within 24 hours.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      {/* ===== CONTACT FORM & INFO ===== */}
      <Section bg={colors.background.main}>
        <Container>
          <ContactGrid>
            {/* Contact Form */}
            <Form onSubmit={handleSubmit}>
              <h3>Send Us a Message</h3>
              <p className="subtitle">Fill in the details and we'll get back to you soon.</p>
              
              <FormRow>
                <FormGroup>
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                </FormGroup>
                <FormGroup>
                  <label>Subject</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Select a subject</option>
                    <option value="tour">Tour Booking</option>
                    <option value="cab">Cab Rental</option>
                    <option value="custom">Custom Package</option>
                    <option value="other">Other</option>
                  </select>
                </FormGroup>
              </FormRow>

              <FormGroup>
                <label>Your Message *</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your travel plans, requirements, or any questions..."
                  required
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Message →'}
              </SubmitButton>
            </Form>

            {/* Contact Information */}
            <ContactInfo>
              <InfoCard>
                <h4><i className="fas fa-phone"></i> Call Us</h4>
                <div className="item">
                  <i className="fas fa-phone"></i>
                  <span><span className="label">Telephone:</span> <a href="tel:+918010320000">+91 8010320000</a></span>
                </div>
                <div className="item">
                  <i className="fab fa-whatsapp"></i>
                  <span><span className="label">WhatsApp:</span> <a href="https://wa.me/918010320000">+91 8010320000</a></span>
                </div>
                <div className="item">
                  <i className="fas fa-phone-alt"></i>
                  <span><span className="label">Others:</span> <a href="tel:+919015154545">+91 9015154545</a>, <a href="tel:+919312113322">+91 9312113322</a></span>
                </div>
              </InfoCard>

              <InfoCard>
                <h4><i className="fas fa-envelope"></i> Email Us</h4>
                <div className="item">
                  <i className="fas fa-envelope"></i>
                  <span><a href="mailto:info@getmeyatra.com">info@getmeyatra.com</a></span>
                </div>
                <div className="item">
                  <i className="fas fa-globe"></i>
                  <span><a href="https://www.getmeyatra.com" target="_blank" rel="noopener noreferrer">www.getmeyatra.com</a></span>
                </div>
              </InfoCard>

              <InfoCard>
                <h4><i className="fas fa-building"></i> Our Offices</h4>
                <div className="item">
                  <i className="fas fa-building"></i>
                  <div>
                    <span className="label">Working Office:</span>
                    <span>B-26, Rajeev Nagar, Opp. Rohini, Sec-22, Near Radhey Krishna Mandir, New Delhi-110086</span>
                  </div>
                </div>
                <div className="item">
                  <i className="fas fa-building"></i>
                  <div>
                    <span className="label">Registered Office:</span>
                    <span>725/2C, Street No-5, Punjabi Basti, Military Road, Anand Parbat, Karol Bagh, New Delhi-110005</span>
                  </div>
                </div>
              </InfoCard>

              <InfoCard>
                <h4><i className="fas fa-clock"></i> Working Hours</h4>
                <div className="item">
                  <i className="fas fa-clock"></i>
                  <span>Monday - Sunday: 6:00 AM - 11:00 PM</span>
                </div>
                <div className="item">
                  <i className="fas fa-headset"></i>
                  <span>24/7 Customer Support Available</span>
                </div>
              </InfoCard>
            </ContactInfo>
          </ContactGrid>
        </Container>
      </Section>

      {/* ===== MAP SECTION ===== */}
      <MapSection>
        <Container>
          <SectionHeader>
            <SectionTag>Find Us</SectionTag>
            <SectionTitle>Our <span className="gradient-text">Location</span></SectionTitle>
            <SectionSubtitle>Visit us at our office for a personal consultation.</SectionSubtitle>
          </SectionHeader>
          <MapContainer>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.456!2d77.1456!3d28.6789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQwJzQ0LjAiTiA3N8KwMDgnNDUuMCJF!5e0!3m2!1sen!2sin!4v1700000000000" 
              title="GetMeYatra Office Location"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </MapContainer>
        </Container>
      </MapSection>

      {/* ===== CTA SECTION ===== */}
      <CTASection>
        <Container>
          <CTAContent>
            <h2>Ready to Plan Your <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 16px', borderRadius: '12px' }}>Next Journey?</span></h2>
            <p>Let us help you create unforgettable memories. Book your tour or cab today!</p>
            <CTALink to="/tours">Explore Our Tours →</CTALink>
          </CTAContent>
        </Container>
      </CTASection>

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
};

export default Contact;
