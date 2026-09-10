import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors, shadows, breakpoints } from '../styles/theme';
import { registerCustomer } from '../services/api';

// ============================================
// TRANSLATION DICTIONARY
// ============================================

const translations = {
    'Create Account': 'खाता बनाएं',
    'Join GetMeYatra and start your journey': 'GetMeYatra से जुड़ें और अपनी यात्रा शुरू करें',
    'Full Name': 'पूरा नाम',
    'Phone Number': 'फोन नंबर',
    'Email Address': 'ईमेल पता',
    'Password': 'पासवर्ड',
    'Confirm Password': 'पासवर्ड पुष्टि करें',
    'By creating an account, you agree to our': 'खाता बनाकर, आप हमारी से सहमत हैं',
    'Terms of Service': 'सेवा की शर्तें',
    'and': 'और',
    'Privacy Policy': 'गोपनीयता नीति',
    'Already have an account?': 'पहले से खाता है?',
    'Register': 'रजिस्टर करें',
    'Registering...': 'रजिस्टर हो रहा है...',
    'Loading...': 'लोड हो रहा है...',
    'Full Name is required': 'पूरा नाम आवश्यक है',
    'Phone is required': 'फोन आवश्यक है',
    'Please enter a valid 10-digit phone number': 'कृपया 10 अंकों का मान्य फोन नंबर दर्ज करें',
    'Email is required': 'ईमेल आवश्यक है',
    'Please enter a valid email': 'कृपया मान्य ईमेल दर्ज करें',
    'Password is required': 'पासवर्ड आवश्यक है',
    'Password must be at least 6 characters': 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए',
    'Passwords do not match': 'पासवर्ड मेल नहीं खाते',
    'Registration successful! Please login.': 'रजिस्ट्रेशन सफल! कृपया लॉगिन करें।',
    'OR continue with': 'या इसके साथ जारी रखें',
    'Login': 'लॉगिन',
    'Confirm': 'पुष्टि करें',
    'Password strength': 'पासवर्ड ताकत',
    'Weak': 'कमजोर',
    'Medium': 'मध्यम',
    'Strong': 'मजबूत',
    'Very Strong': 'बहुत मजबूत',
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
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 20px 60px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9edf5 100%);
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
// REGISTER CARD
// ============================================

const RegisterCard = styled.div`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 48px 40px;
  max-width: 460px;
  width: 100%;
  border: 1px solid rgba(255,255,255,0.3);
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 8px;

  .logo-icon {
    font-size: 48px;
    display: block;
  }

  .logo-text {
    font-size: 24px;
    font-weight: 800;
    background: ${colors.primary.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${colors.neutral[900]};
  text-align: center;
  margin-bottom: 4px;
`;

const Subtitle = styled.p`
  color: ${colors.neutral[500]};
  text-align: center;
  font-size: 14px;
  margin-bottom: 24px;
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
    margin-bottom: 16px;
    margin-left: auto;
    display: block;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.2);
    }
`;

const FormGroup = styled.div`
  margin-bottom: 18px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  font-size: 14px;
  color: ${colors.neutral[700]};
  margin-bottom: 6px;

  .required {
    color: ${colors.status.error};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${({ error }) => error ? colors.status.error : colors.neutral[200]};
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.3s ease;
  outline: none;
  background: #fff;

  &:focus {
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
  }

  &:disabled {
    background: ${colors.neutral[50]};
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  color: ${colors.status.error};
  font-size: 12px;
  display: block;
  margin-top: 4px;
`;

// ============================================
// PASSWORD STRENGTH
// ============================================

const StrengthContainer = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
  align-items: center;
`;

const StrengthBar = styled.div`
  flex: 1;
  height: 4px;
  border-radius: 4px;
  background: ${props => props.bg || colors.neutral[200]};
  transition: all 0.3s ease;
`;

const StrengthLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.color || colors.neutral[500]};
  min-width: 50px;
  text-align: right;
`;

// ============================================
// BUTTONS
// ============================================

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

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0;

  hr {
    flex: 1;
    border: none;
    border-top: 1px solid ${colors.neutral[200]};
  }

  span {
    color: ${colors.neutral[400]};
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const SocialButton = styled.button`
  flex: 1;
  padding: 12px;
  border: 2px solid ${colors.neutral[200]};
  border-radius: 12px;
  background: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${colors.neutral[700]};

  &:hover {
    border-color: ${colors.primary.main};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.06);
  }

  .icon {
    font-size: 20px;
  }

  &.google { color: #EA4335; }
  &.facebook { color: #1877F2; }
`;

const LoginLink = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${colors.neutral[500]};
  margin-top: 8px;

  a {
    color: ${colors.primary.main};
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const TermsText = styled.p`
  text-align: center;
  font-size: 12px;
  color: ${colors.neutral[400]};
  margin-bottom: 16px;
  line-height: 1.6;

  a {
    color: ${colors.primary.main};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  background: #FEE2E2;
  color: #DC2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
`;

const SuccessMessage = styled.div`
  background: #D1FAE5;
  color: #065F46;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
`;

// ============================================
// COMPONENT
// ============================================

function Register() {
    const navigate = useNavigate();
    const [language, setLanguage] = useState('en');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        email: '',
        password: '',
        confirm_password: '',
        accept_terms: false,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: '' });

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

    useEffect(() => {
        // Check if already logged in
        const customer = JSON.parse(localStorage.getItem('customer') || '{}');
        if (customer.phone) {
            navigate('/dashboard');
        }
    }, []);

    useEffect(() => {
        // Calculate password strength
        const pwd = formData.password;
        let score = 0;
        if (pwd.length >= 6) score++;
        if (pwd.length >= 10) score++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
        if (/\d/.test(pwd)) score++;
        if (/[^a-zA-Z0-9]/.test(pwd)) score++;

        const strengthMap = {
            0: { label: t('Weak'), color: '#EF4444' },
            1: { label: t('Weak'), color: '#EF4444' },
            2: { label: t('Medium'), color: '#F59E0B' },
            3: { label: t('Medium'), color: '#F59E0B' },
            4: { label: t('Strong'), color: '#22C55E' },
            5: { label: t('Very Strong'), color: '#22C55E' },
        };

        setPasswordStrength({
            score,
            label: strengthMap[Math.min(score, 5)].label,
            color: strengthMap[Math.min(score, 5)].color,
        });
    }, [formData.password]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setError('');
        setSuccess('');
    };

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!formData.full_name.trim()) {
            errors.full_name = t('Full Name is required');
            isValid = false;
        }

        if (!formData.phone.trim()) {
            errors.phone = t('Phone is required');
            isValid = false;
        } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
            errors.phone = t('Please enter a valid 10-digit phone number');
            isValid = false;
        }

        if (!formData.email.trim()) {
            errors.email = t('Email is required');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            errors.email = t('Please enter a valid email');
            isValid = false;
        }

        if (!formData.password.trim()) {
            errors.password = t('Password is required');
            isValid = false;
        } else if (formData.password.length < 6) {
            errors.password = t('Password must be at least 6 characters');
            isValid = false;
        }

        if (formData.confirm_password !== formData.password) {
            errors.confirm_password = t('Passwords do not match');
            isValid = false;
        }

        if (!formData.accept_terms) {
            errors.accept_terms = 'Please accept the terms and conditions';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            setError('');
            setSuccess('');

            const response = await registerCustomer({
                customer_name: formData.full_name,
                mobile_number: formData.phone,
                email: formData.email,
                password: formData.password,
            });

            setSuccess(t('Registration successful! Please login.'));
            setFormData({
                full_name: '',
                phone: '',
                email: '',
                password: '',
                confirm_password: '',
                accept_terms: false,
            });

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    const getStrengthBarColor = (index) => {
        if (index < passwordStrength.score) {
            return passwordStrength.color;
        }
        return colors.neutral[200];
    };

    return (
        <PageContainer>
            <ScrollProgress progress={scrollProgress} />
            
            <RegisterCard>
                <LanguageToggle lang={language} onClick={toggleLanguage}>
                    {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
                </LanguageToggle>

                <Logo>
                    <span className="logo-icon">🚐</span>
                    <div className="logo-text">GetMeYatra</div>
                </Logo>

                <Title>{t('Create Account')}</Title>
                <Subtitle>{t('Join GetMeYatra and start your journey')}</Subtitle>

                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}

                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>{t('Full Name')} <span className="required">*</span></Label>
                        <Input
                            type="text"
                            name="full_name"
                            placeholder="Enter your full name"
                            value={formData.full_name}
                            onChange={handleChange}
                            error={errors.full_name}
                            disabled={loading}
                        />
                        {errors.full_name && <ErrorText>{errors.full_name}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                        <Label>{t('Phone Number')} <span className="required">*</span></Label>
                        <Input
                            type="tel"
                            name="phone"
                            placeholder="Enter 10-digit phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            disabled={loading}
                        />
                        {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                        <Label>{t('Email Address')} <span className="required">*</span></Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            disabled={loading}
                        />
                        {errors.email && <ErrorText>{errors.email}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                        <Label>{t('Password')} <span className="required">*</span></Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Create a password (min 6 characters)"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            disabled={loading}
                        />
                        {formData.password && (
                            <StrengthContainer>
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <StrengthBar key={i} bg={getStrengthBarColor(i)} />
                                ))}
                                <StrengthLabel color={passwordStrength.color}>
                                    {passwordStrength.label}
                                </StrengthLabel>
                            </StrengthContainer>
                        )}
                        {errors.password && <ErrorText>{errors.password}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                        <Label>{t('Confirm Password')} <span className="required">*</span></Label>
                        <Input
                            type="password"
                            name="confirm_password"
                            placeholder="Confirm your password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            error={errors.confirm_password}
                            disabled={loading}
                        />
                        {errors.confirm_password && <ErrorText>{errors.confirm_password}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                        <Label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="accept_terms"
                                checked={formData.accept_terms}
                                onChange={handleChange}
                                style={{ width: '18px', height: '18px', accentColor: colors.primary.main }}
                            />
                            {t('By creating an account, you agree to our')}{' '}
                            <a href="#" style={{ color: colors.primary.main, textDecoration: 'none' }}>
                                {t('Terms of Service')}
                            </a>
                            {' '}{t('and')}{' '}
                            <a href="#" style={{ color: colors.primary.main, textDecoration: 'none' }}>
                                {t('Privacy Policy')}
                            </a>
                        </Label>
                        {errors.accept_terms && <ErrorText>{errors.accept_terms}</ErrorText>}
                    </FormGroup>

                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? t('Registering...') : t('Register')}
                    </SubmitButton>
                </form>

                <Divider>
                    <hr />
                    <span>{t('OR continue with')}</span>
                    <hr />
                </Divider>

                <SocialButtons>
                    <SocialButton className="google">
                        <span className="icon">G</span>
                        Google
                    </SocialButton>
                    <SocialButton className="facebook">
                        <span className="icon">f</span>
                        Facebook
                    </SocialButton>
                </SocialButtons>

                <LoginLink>
                    {t('Already have an account?')}{' '}
                    <Link to="/login">{t('Login')}</Link>
                </LoginLink>
            </RegisterCard>
        </PageContainer>
    );
}

export default Register;
