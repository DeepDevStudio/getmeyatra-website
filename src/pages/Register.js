import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors, shadows, breakpoints } from '../styles/theme';
import { createCustomer } from '../services/api';

// ============================================
// STYLED COMPONENTS
// ============================================

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 20px 60px;
  background: ${colors.background.main};
`;

const RegisterCard = styled.div`
  background: ${colors.background.card};
  padding: 40px;
  border-radius: 16px;
  box-shadow: ${shadows.lg};
  max-width: 420px;
  width: 100%;
  border: 1px solid ${colors.neutral[100]};
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: ${colors.neutral[900]};
  text-align: center;
  margin-bottom: 8px;

  .gradient-text {
    background: ${colors.primary.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Subtitle = styled.p`
  color: ${colors.neutral[500]};
  text-align: center;
  font-size: 14px;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
  color: ${colors.neutral[700]};
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid ${({ error }) => error ? colors.status.error : colors.neutral[200]};
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  outline: none;
  background: #fff;

  &:focus {
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  &::placeholder {
    color: ${colors.neutral[400]};
  }
`;

const ErrorText = styled.span`
  color: ${colors.status.error};
  font-size: 12px;
  margin-top: 4px;
`;

const PasswordWrapper = styled.div`
  position: relative;

  input {
    padding-right: 48px;
    width: 100%;
  }

  .toggle-btn {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: ${colors.neutral[500]};
    font-size: 16px;
    padding: 4px;

    &:hover {
      color: ${colors.neutral[700]};
    }
  }
`;

const SubmitButton = styled.button`
  padding: 14px;
  background: ${colors.primary.gradient};
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
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
  margin: 8px 0;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${colors.neutral[200]};
  }

  span {
    color: ${colors.neutral[500]};
    font-size: 13px;
    white-space: nowrap;
  }
`;

const LoginLink = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${colors.neutral[600]};
  margin-top: 8px;

  a {
    color: ${colors.primary.main};
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// ============================================
// COMPONENT
// ============================================

function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (error) setError('');
    };

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            errors.name = 'Full name is required';
            isValid = false;
        }

        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
            isValid = false;
        } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
            errors.phone = 'Please enter a valid 10-digit phone number';
            isValid = false;
        }

        if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!formData.password.trim()) {
            errors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (!formData.confirmPassword.trim()) {
            errors.confirmPassword = 'Please confirm your password';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const customerData = {
                customer_name: formData.name,
                mobile_number: formData.phone,
                email: formData.email || '',
                password: formData.password
            };

            await createCustomer(customerData);
            
            // Redirect to login page
            navigate('/login');
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer>
            <RegisterCard>
                <Title>
                    Create <span className="gradient-text">Account</span>
                </Title>
                <Subtitle>Join GetMeYatra and start your journey</Subtitle>

                <Form onSubmit={handleSubmit}>
                    {error && (
                        <ErrorText style={{ textAlign: 'center', padding: '10px', background: '#FEE2E2', borderRadius: '8px' }}>
                            {error}
                        </ErrorText>
                    )}

                    <FormGroup>
                        <Label>Full Name <span style={{ color: colors.status.error }}>*</span></Label>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            error={formErrors.name}
                            disabled={loading}
                        />
                        {formErrors.name && <ErrorText>{formErrors.name}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                        <Label>Phone Number <span style={{ color: colors.status.error }}>*</span></Label>
                        <Input
                            type="tel"
                            name="phone"
                            placeholder="Enter 10-digit phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            error={formErrors.phone}
                            disabled={loading}
                        />
                        {formErrors.phone && <ErrorText>{formErrors.phone}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                        <Label>Email Address</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                            error={formErrors.email}
                            disabled={loading}
                        />
                        {formErrors.email && <ErrorText>{formErrors.email}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                        <Label>Password <span style={{ color: colors.status.error }}>*</span></Label>
                        <PasswordWrapper>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Create a password (min 6 characters)"
                                value={formData.password}
                                onChange={handleChange}
                                error={formErrors.password}
                                disabled={loading}
                            />
                            <button
                                type="button"
                                className="toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </PasswordWrapper>
                        {formErrors.password && <ErrorText>{formErrors.password}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                        <Label>Confirm Password <span style={{ color: colors.status.error }}>*</span></Label>
                        <PasswordWrapper>
                            <Input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={formErrors.confirmPassword}
                                disabled={loading}
                            />
                            <button
                                type="button"
                                className="toggle-btn"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </PasswordWrapper>
                        {formErrors.confirmPassword && <ErrorText>{formErrors.confirmPassword}</ErrorText>}
                    </FormGroup>

                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account →'}
                    </SubmitButton>

                    <Divider>
                        <span>Already have an account?</span>
                    </Divider>

                    <LoginLink>
                        <Link to="/login">Login to your account</Link>
                    </LoginLink>
                </Form>
            </RegisterCard>
        </PageContainer>
    );
}

export default Register;
