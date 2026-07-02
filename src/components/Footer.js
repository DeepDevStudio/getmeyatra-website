import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #1a1a2e;
  color: #fff;
  padding: 60px 0 0;
`;

const FooterWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 40px;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FooterSection = styled.div`
  h3, h4 {
    margin-bottom: 16px;
    color: #fff;
  }

  h3 {
    font-size: 22px;
    i {
      color: #FF6B59;
      margin-right: 8px;
    }
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #FFB347;
  }

  p {
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.8;
    font-size: 14px;
  }

  ul {
    list-style: none;
    
    li {
      margin-bottom: 10px;
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      
      i {
        width: 20px;
        color: #FF6B59;
        font-size: 14px;
        margin-top: 3px;
      }

      a {
        color: rgba(255, 255, 255, 0.6);
        text-decoration: none;
        transition: all 0.3s ease;
        
        &:hover {
          color: #FF6B59;
        }
      }

      .label {
        font-weight: 600;
        color: rgba(255, 255, 255, 0.8);
        min-width: 80px;
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  
  a {
    width: 38px;
    height: 38px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, #FF6B59 0%, #FFB347 100%);
      transform: translateY(-3px);
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;

  i {
    color: #FF6B59;
    font-size: 16px;
    margin-top: 3px;
    min-width: 20px;
  }

  .content {
    line-height: 1.6;
    
    .number {
      display: block;
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

const FooterBottom = styled.div`
  padding: 20px 0;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  margin-top: 0;
`;

const BottomWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: center;
    text-align: center;
  }
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  a {
    color: rgba(255, 255, 255, 0.4);
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 13px;

    &:hover {
      color: #FF6B59;
    }
  }

  span {
    color: rgba(255, 255, 255, 0.2);
  }
`;

const Footer = () => {
  const handleNewsletter = (e) => {
    e.preventDefault();
    alert('🎉 Thank you for subscribing!');
    e.target.reset();
  };

  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterTop>
          {/* Company Info */}
          <FooterSection>
            <h3><i className="fas fa-compass"></i> GetMeYatra</h3>
            <p>
              Your trusted partner for car rentals and group tours across India. 
              Experience spiritual journeys, hill station retreats, and adventure 
              tours with premium vehicles and expert guides.
            </p>
            <SocialLinks>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="https://wa.me/918010320000" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
              </a>
            </SocialLinks>
          </FooterSection>

          {/* Quick Links */}
          <FooterSection>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/cars"><i className="fas fa-chevron-right"></i> Car Rentals</Link></li>
              <li><Link to="/tours"><i className="fas fa-chevron-right"></i> Group Tours</Link></li>
              <li><Link to="/about"><i className="fas fa-chevron-right"></i> About Us</Link></li>
              <li><Link to="/contact"><i className="fas fa-chevron-right"></i> Contact</Link></li>
              <li><Link to="/contact"><i className="fas fa-chevron-right"></i> Book Now</Link></li>
            </ul>
          </FooterSection>

          {/* Contact Info */}
          <FooterSection>
            <h4>Contact Us</h4>
            <ul>
              <li>
                <i className="fas fa-phone"></i>
                <div>
                  <span className="label">Telephone:</span>
                  <a href="tel:+918010320000">+91 8010320000</a>
                </div>
              </li>
              <li>
                <i className="fab fa-whatsapp"></i>
                <div>
                  <span className="label">WhatsApp:</span>
                  <a href="https://wa.me/918010320000">+91 8010320000</a>
                </div>
              </li>
              <li>
                <i className="fas fa-phone-alt"></i>
                <div>
                  <span className="label">Others:</span>
                  <span>+91 9868304354, +91 9312113322</span>
                </div>
              </li>
              <li>
                <i className="fas fa-phone-alt"></i>
                <div>
                  <span className="label">Landline:</span>
                  <span>011-47527920</span>
                </div>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <div>
                  <span className="label">Email:</span>
                  <a href="mailto:info@getmecab.com">info@getmecab.com</a>
                </div>
              </li>
            </ul>
          </FooterSection>

          {/* Office Addresses */}
          <FooterSection>
            <h4>Our Offices</h4>
            <ul>
              <li>
                <i className="fas fa-building"></i>
                <div>
                  <span className="label">Working Office:</span>
                  <span>B-26, Rajeev Nagar, Opp. Rohini, Sec-22, Near Radhey Krishna Mandir, New Delhi-110086</span>
                </div>
              </li>
              <li>
                <i className="fas fa-building"></i>
                <div>
                  <span className="label">Registered Office:</span>
                  <span>725/2C, Street No-5, Punjabi Basti, Military Road, Anand Parbat, Karol Bagh, New Delhi-110005</span>
                </div>
              </li>
            </ul>
          </FooterSection>
        </FooterTop>
      </FooterWrapper>

      {/* Bottom Footer with Business Info */}
      <FooterBottom>
        <BottomWrapper>
          <div>
            &copy; 2024 GetMeYatra. All rights reserved.
          </div>
          <BottomLinks>
            <span><i className="fas fa-id-card"></i> GST: 07AABCU3052C1ZT</span>
            <span>|</span>
            <span><i className="fas fa-building"></i> CIN: U49210DL2011PTC337212</span>
            <span>|</span>
            <span><i className="fas fa-file-invoice"></i> PAN: AABCU3052C</span>
            <span>|</span>
            <a href="https://www.getmecab.com" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe"></i> getmecab.com
            </a>
          </BottomLinks>
        </BottomWrapper>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
