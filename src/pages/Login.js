import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors, shadows, breakpoints } from '../styles/theme';
import { loginCustomer } from '../services/api';

// ============================================
// TRANSLATION DICTIONARY
// ============================================

const translations = {
    'Welcome Back': 'वापसी पर स्वागत है',
    'Login to your account': 'अपने खाते में लॉगिन करें',
    'Email Address': 'ईमेल पता',
    'Phone Number': 'फोन नंबर',
    'Password': 'पासवर्ड',
    'Remember me': 'मुझे याद रखें',
    'Forgot Password?': 'पासवर्ड भूल गए?',
    'Login': 'लॉगिन',
    "Don't have an account?": 'खाता नहीं है?',
    'Register': 'रजिस्टर करें',
    'OR continue with': 'या इसके साथ जारी रखें',
    'Email is required': 'ईमेल आवश्यक है',
    'Password is required': 'पासवर्ड आवश्यक है',
    'Phone is required': 'फोन आवश्यक है',
    'Please enter a valid email': 'कृपया मान्य ईमेल दर्ज करें',
    'Password must be at least 6 characters': 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए',
    'Loading...': 'लोड हो रहा है...',
    'Invalid credentials. Please try again.': 'अमान्य क्रेडेंशियल। कृपया पुन: प्रयास करें।',
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
// LOGIN CARD
// ============================================

const LoginCard = styled.div`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 48px 40px;
  max-width: 420px;
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
  margin-bottom: 28px;
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
  margin-bottom: 20px;
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
// OPTIONS ROW
// ============================================

const OptionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${colors.neutral[600]};
  cursor: pointer;

  input {
    width: 16px;
    height: 16px;
    accent-color: ${colors.primary.main};
    cursor: pointer;
  }
`;

const ForgotLink = styled(Link)`
  color: ${colors.primary.main};
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
  }
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

const RegisterLink = styled.p`
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

const ErrorMessage = styled.div`
  background: #FEE2E2;
  color: #DC2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
`;

// ============================================
// COMPONENT
// ============================================

function Login() {
    const navigate = useNavigate();
    const [language, setLanguage] = useState('en');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        remember: false,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
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

    useEffect(() => {
        // Check if already logged in
        const customer = JSON.parse(localStorage.getItem('customer') || '{}');
        if (customer.phone) {
            navigate('/dashboard');
        }
    }, []);

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
    };

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!formData.phone.trim()) {
            errors.phone = t('Phone is required');
            isValid = false;
        } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
            errors.phone = 'Please enter a valid 10-digit phone number';
            isValid = false;
        }

        if (!formData.password.trim()) {
            errors.password = t('Password is required');
            isValid = false;
        } else if (formData.password.length < 6) {
            errors.password = t('Password must be at least 6 characters');
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

            const response = await loginCustomer({
                phone: formData.phone,
                password: formData.password,
            });

            if (response && response.customer) {
                localStorage.setItem('customer', JSON.stringify(response.customer));
                navigate('/dashboard');
            } else {
                setError(t('Invalid credentials. Please try again.'));
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || t('Invalid credentials. Please try again.'));
        } finally {
            setLoading(false);
        }
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    return (
        <PageContainer>
            <ScrollProgress progress={scrollProgress} />
            
            <LoginCard>
                <LanguageToggle lang={language} onClick={toggleLanguage}>
                    {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
                </LanguageToggle>

                <Logo>
                    <span className="logo-icon">🚐</span>
                    <div className="logo-text">GetMeYatra</div>
                </Logo>

                <Title>{t('Welcome Back')}</Title>
                <Subtitle>{t('Login to your account')}</Subtitle>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>{t('Phone Number')} <span className="required">*</span></Label>
                        <Input
                            type="tel"
                            name="phone"
                            placeholder="Enter your 10-digit phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            disabled={loading}
                        />
                        {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                        <Label>{t('Password')} <span className="required">*</span></Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            disabled={loading}
                        />
                        {errors.password && <ErrorText>{errors.password}</ErrorText>}
                    </FormGroup>

                    <OptionsRow>
                        <CheckboxLabel>
                            <input
                                type="checkbox"
                                name="remember"
                                checked={formData.remember}
                                onChange={handleChange}
                            />
                            {t('Remember me')}
                        </CheckboxLabel>
                        <ForgotLink to="/forgot-password">
                            {t('Forgot Password?')}
                        </ForgotLink>
                    </OptionsRow>

                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? t('Loading...') : t('Login')}
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

                <RegisterLink>
                    {t("Don't have an account?")}{' '}
                    <Link to="/register">{t('Register')}</Link>
                </RegisterLink>
            </LoginCard>
        </PageContainer>
    );
}

export default Login;
