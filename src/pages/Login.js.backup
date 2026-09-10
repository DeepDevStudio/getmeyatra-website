import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors, shadows, breakpoints } from '../styles/theme';
import { loginCustomer } from '../services/api';

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

const LoginCard = styled.div`
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
  display: flex;
  justify-content: space-between;
  align-items: center;

  .forgot-link {
    font-weight: 400;
    font-size: 12px;
    color: ${colors.primary.main};
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
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

const ErrorText = styled.span`
  color: ${colors.status.error};
  font-size: 12px;
  margin-top: 4px;
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: ${colors.primary.main};
    cursor: pointer;
  }

  label {
    font-size: 14px;
    color: ${colors.neutral[600]};
    cursor: pointer;
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

const RegisterLink = styled.p`
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

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        password: ''
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

        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
            isValid = false;
        } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
            errors.phone = 'Please enter a valid 10-digit phone number';
            isValid = false;
        }

        if (!formData.password.trim()) {
            errors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
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
            // Call the API to check if customer exists
            const customer = await loginCustomer(formData.phone);
            
            if (customer && customer.id) {
                // Store customer data in localStorage
                localStorage.setItem('customer', JSON.stringify(customer));
                navigate('/dashboard');
            } else {
                setError('Invalid phone number or password');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid phone number or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer>
            <LoginCard>
                <Title>
                    Welcome <span className="gradient-text">Back</span>
                </Title>
                <Subtitle>Login to your GetMeYatra account</Subtitle>

                <Form onSubmit={handleSubmit}>
                    {error && (
                        <ErrorText style={{ textAlign: 'center', padding: '10px', background: '#FEE2E2', borderRadius: '8px' }}>
                            {error}
                        </ErrorText>
                    )}

                    <FormGroup>
                        <Label>Phone Number</Label>
                        <Input
                            type="tel"
                            name="phone"
                            placeholder="Enter your 10-digit phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            error={formErrors.phone}
                            disabled={loading}
                        />
                        {formErrors.phone && <ErrorText>{formErrors.phone}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Password
                            <Link to="/forgot-password" className="forgot-link">Forgot?</Link>
                        </Label>
                        <PasswordWrapper>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter your password"
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
                        <RememberMe>
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </RememberMe>
                    </FormGroup>

                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </SubmitButton>

                    <Divider>
                        <span>or</span>
                    </Divider>

                    <RegisterLink>
                        Don't have an account? <Link to="/register">Register Now</Link>
                    </RegisterLink>
                </Form>
            </LoginCard>
        </PageContainer>
    );
}

export default Login;
