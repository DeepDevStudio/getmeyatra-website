import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, breakpoints } from '../styles/theme';

// ============================================
// TRANSLATION DICTIONARY
// ============================================

const translations = {
    'Contact Us': 'संपर्क करें',
    "We'd Love to Hear From You": 'हम आपसे सुनना पसंद करेंगे',
    'Get in touch with our team': 'हमारी टीम से संपर्क करें',
    'Your Name': 'आपका नाम',
    'Email Address': 'ईमेल पता',
    'Phone Number': 'फोन नंबर',
    'Subject': 'विषय',
    'Your Message': 'आपका संदेश',
    'Send Message': 'संदेश भेजें',
    'Sending...': 'भेजा जा रहा है...',
    'Message sent successfully!': 'संदेश सफलतापूर्वक भेजा गया!',
    'Failed to send message. Please try again.': 'संदेश भेजने में विफल। कृपया पुन: प्रयास करें।',
    'Phone': 'फोन',
    'Email': 'ईमेल',
    'Office': 'कार्यालय',
    'Working Hours': 'कार्य समय',
    'Mon - Sun': 'सोम - रवि',
    'Get in Touch': 'संपर्क करें',
    'Visit Us': 'हमसे मिलें',
    'Follow Us': 'हमें फॉलो करें',
    'Call Us': 'हमें कॉल करें',
    'Email Us': 'हमें ईमेल करें',
    'Our Offices': 'हमारे कार्यालय',
    'Find Us': 'हमें खोजें',
    'Our Location': 'हमारा स्थान',
    'Visit us at our office for a personal consultation.': 'व्यक्तिगत परामर्श के लिए हमारे कार्यालय में आएं।',
    'Ready to Plan Your Next Journey?': 'अपनी अगली यात्रा की योजना बनाने के लिए तैयार हैं?',
    'Let us help you create unforgettable memories.': 'हम आपको अविस्मरणीय यादें बनाने में मदद करें।',
    'Explore Our Tours': 'हमारी यात्राएं देखें',
};

const translateText = (text, targetLang) => {
    if (!text) return text;
    if (targetLang === 'en') return text;
    return translations[text] || text;
};

// ============================================
// STYLED COMPONENTS
// ============================================

const PageContainer = styled.div`
  padding-top: 0;
  background: ${colors.background.main};
`;

// ============================================
// SCROLL PROGRESS BAR
// ============================================

const ScrollProgress = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #4F46E5, #7C3AED);
    z-index: 9999;
    width: ${props => props.progress}%;
    transition: width 0.1s ease;
`;

// ============================================
// LANGUAGE TOGGLE
// ============================================

const LanguageToggle = styled.button`
    padding: 6px 16px;
    border-radius: 50px;
    border: 2px solid ${colors.primary.main};
    background: ${props => props.lang === 'hi' ? colors.primary.gradient : 'transparent'};
    color: ${props => props.lang === 'hi' ? '#fff' : colors.primary.main};
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 20px;
    margin-left: auto;
    display: block;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.2);
    }
`;

// ============================================
// HERO SECTION
// ============================================

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
    background: radial-gradient(circle, rgba(255,255,255,0.08), transparent);
    border-radius: 50%;
    animation: float 10s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.05), transparent);
    border-radius: 50%;
    animation: float 8s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(30px, -20px) scale(1.1); }
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
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  backdrop-filter: blur(10px);
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 12px;

  .highlight {
    background: rgba(255,255,255,0.15);
    padding: 4px 16px;
    border-radius: 12px;
    display: inline-block;
  }

  @media (max-width: ${breakpoints.md}) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255,255,255,0.85);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;

  @media (max-width: ${breakpoints.md}) {
    font-size: 1rem;
  }
`;

// ============================================
// CONTENT SECTION
// ============================================

const Section = styled.section`
  padding: 60px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

// ============================================
// CONTACT FORM
// ============================================

const Form = styled.form`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  border: 1px solid rgba(255,255,255,0.3);
  box-shadow: 0 8px 40px rgba(0,0,0,0.06);

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${colors.neutral[900]};
    margin-bottom: 4px;
  }

  .subtitle {
    color: ${colors.neutral[500]};
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 18px;

  label {
    display: block;
    font-weight: 600;
    font-size: 14px;
    color: ${colors.neutral[700]};
    margin-bottom: 6px;
  }

  input, select, textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid ${colors.neutral[200]};
    border-radius: 12px;
    font-size: 14px;
    transition: all 0.3s ease;
    outline: none;
    background: #fff;
    font-family: inherit;

    &:focus {
      border-color: ${colors.primary.main};
      box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
    }

    &:disabled {
      background: ${colors.neutral[50]};
      cursor: not-allowed;
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }

  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239CA3AF' stroke-width='2' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: ${colors.primary.gradient};
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// ============================================
// CONTACT INFO
// ============================================

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoCard = styled.div`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(255,255,255,0.3);
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);

  h4 {
    font-size: 1rem;
    font-weight: 700;
    color: ${colors.neutral[900]};
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;

    i {
      color: ${colors.primary.main};
    }
  }

  .item {
    display: flex;
    gap: 12px;
    padding: 8px 0;
    border-bottom: 1px solid ${colors.neutral[100]};
    font-size: 14px;
    color: ${colors.neutral[700]};

    &:last-child {
      border-bottom: none;
    }

    i {
      color: ${colors.primary.main};
      font-size: 16px;
      min-width: 20px;
      margin-top: 2px;
    }

    .label {
      font-weight: 600;
      color: ${colors.neutral[600]};
    }

    a {
      color: ${colors.primary.main};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    div {
      line-height: 1.6;
    }
  }
`;

// ============================================
// MAP SECTION
// ============================================

const MapSection = styled.section`
  padding: 40px 0 60px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;

  .section-tag {
    display: inline-block;
    padding: 4px 16px;
    background: rgba(79,70,229,0.08);
    color: ${colors.primary.main};
    border-radius: 50px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }

  h2 {
    font-size: 2rem;
    font-weight: 800;
    color: ${colors.neutral[900]};
    margin-bottom: 4px;

    .gradient-text {
      background: ${colors.primary.gradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  p {
    color: ${colors.neutral[500]};
    font-size: 1rem;
  }
`;

const MapContainer = styled.div`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0,0,0,0.06);
  border: 1px solid ${colors.neutral[100]};

  iframe {
    width: 100%;
    height: 350px;
    border: none;
    display: block;
  }
`;

// ============================================
// CTA SECTION
// ============================================

const CTASection = styled.section`
  background: ${colors.primary.gradient};
  padding: 60px 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255,255,255,0.08), transparent);
    border-radius: 50%;
  }
`;

const CTAContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;

  h2 {
    font-size: 2.2rem;
    font-weight: 800;
    margin-bottom: 12px;

    @media (max-width: ${breakpoints.md}) {
      font-size: 1.8rem;
    }

    span {
      background: rgba(255,255,255,0.15);
      padding: 4px 16px;
      border-radius: 12px;
      display: inline-block;
    }
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
    margin-bottom: 24px;
  }
`;

const CTALink = styled(Link)`
  display: inline-block;
  padding: 14px 40px;
  background: #fff;
  color: ${colors.primary.main};
  border-radius: 50px;
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.25);
  }
`;

// ============================================
// FLOATING WHATSAPP
// ============================================

const FloatingWhatsApp = styled.a`
    position: fixed;
    bottom: 120px;
    right: 24px;
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
    box-shadow: 0 4px 25px rgba(37, 211, 102, 0.4);
    z-index: 99;
    transition: all 0.3s ease;
    &:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 35px rgba(37, 211, 102, 0.5);
    }
`;

// ============================================
// COMPONENT
// ============================================

function Contact() {
    const [language, setLanguage] = useState('en');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const t = (text) => translateText(text, language);

    useEffect(() => {
        const handleScrollProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScrollProgress);
        return () => window.removeEventListener('scroll', handleScrollProgress);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccess('');

        try {
            // Simulate API call - replace with actual API endpoint
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setSuccess(t('Message sent successfully!'));
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (err) {
            console.error('Error sending message:', err);
            setError(t('Failed to send message. Please try again.'));
        } finally {
            setSubmitting(false);
        }
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    return (
        <PageContainer>
            <ScrollProgress progress={scrollProgress} />

            {/* ===== HERO SECTION ===== */}
            <HeroSection>
                <HeroContent>
                    <HeroBadge>📞 {t('Get in Touch')}</HeroBadge>
                    <HeroTitle>
                        {t("We'd Love to Hear From You")}
                    </HeroTitle>
                    <HeroSubtitle>
                        {t('Get in touch with our team')}
                    </HeroSubtitle>
                </HeroContent>
            </HeroSection>

            {/* ===== CONTACT FORM & INFO ===== */}
            <Section>
                <Container>
                    <LanguageToggle lang={language} onClick={toggleLanguage}>
                        {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
                    </LanguageToggle>

                    <ContactGrid>
                        {/* Contact Form */}
                        <Form onSubmit={handleSubmit}>
                            <h3>{t('Send Us a Message')}</h3>
                            <p className="subtitle">{t('Fill in the details and we\'ll get back to you soon.')}</p>

                            {error && <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px' }}>{error}</div>}
                            {success && <div style={{ background: '#D1FAE5', color: '#065F46', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px' }}>✅ {success}</div>}

                            <FormRow>
                                <FormGroup>
                                    <label>{t('Your Name')} *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={t('Your full name')}
                                        required
                                        disabled={submitting}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>{t('Email Address')} *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        required
                                        disabled={submitting}
                                    />
                                </FormGroup>
                            </FormRow>

                            <FormRow>
                                <FormGroup>
                                    <label>{t('Phone Number')}</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        disabled={submitting}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>{t('Subject')}</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        disabled={submitting}
                                    >
                                        <option value="">{t('Select a subject')}</option>
                                        <option value="tour">Tour Booking</option>
                                        <option value="cab">Cab Rental</option>
                                        <option value="custom">Custom Package</option>
                                        <option value="other">Other</option>
                                    </select>
                                </FormGroup>
                            </FormRow>

                            <FormGroup>
                                <label>{t('Your Message')} *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={t('Tell us about your travel plans...')}
                                    required
                                    disabled={submitting}
                                />
                            </FormGroup>

                            <SubmitButton type="submit" disabled={submitting}>
                                {submitting ? t('Sending...') : `${t('Send Message')} →`}
                            </SubmitButton>
                        </Form>

                        {/* Contact Information */}
                        <ContactInfo>
                            <InfoCard>
                                <h4><i className="fas fa-phone"></i> {t('Call Us')}</h4>
                                <div className="item">
                                    <i className="fas fa-phone"></i>
                                    <span><span className="label">{t('Phone')}:</span> <a href="tel:+918010320000">+91 8010320000</a></span>
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
                                <h4><i className="fas fa-envelope"></i> {t('Email Us')}</h4>
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
                                <h4><i className="fas fa-building"></i> {t('Our Offices')}</h4>
                                <div className="item">
                                    <i className="fas fa-building"></i>
                                    <div>
                                        <span className="label">{t('Office')}:</span>
                                        <span>B-26, Rajeev Nagar, Opp. Rohini, Sec-22, New Delhi-110086</span>
                                    </div>
                                </div>
                                <div className="item">
                                    <i className="fas fa-building"></i>
                                    <div>
                                        <span className="label">Registered Office:</span>
                                        <span>725/2C, Punjabi Basti, Karol Bagh, New Delhi-110005</span>
                                    </div>
                                </div>
                            </InfoCard>

                            <InfoCard>
                                <h4><i className="fas fa-clock"></i> {t('Working Hours')}</h4>
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
                        <div className="section-tag">{t('Find Us')}</div>
                        <h2>{t('Our')} <span className="gradient-text">{t('Location')}</span></h2>
                        <p>{t('Visit us at our office for a personal consultation.')}</p>
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
                        <h2>{t('Ready to Plan Your Next Journey?')}</h2>
                        <p>{t('Let us help you create unforgettable memories.')}</p>
                        <CTALink to="/tours">{t('Explore Our Tours')} →</CTALink>
                    </CTAContent>
                </Container>
            </CTASection>

            {/* ===== FLOATING WHATSAPP ===== */}
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

export default Contact;
