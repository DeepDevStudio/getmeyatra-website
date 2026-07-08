import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getYatra, getTrips, createBooking, checkCustomer, createCustomer } from '../services/api';
import styled from 'styled-components';
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

const BookingWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const BookingCard = styled.div`
  background: ${colors.background.card};
  border-radius: 16px;
  padding: 32px;
  box-shadow: ${shadows.md};
`;

const BookingTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.neutral[900]};
  margin-bottom: 8px;

  .gradient-text {
    background: ${colors.primary.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const BookingSubtitle = styled.p`
  color: ${colors.neutral[600]};
  margin-bottom: 24px;
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
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${({ error }) => error ? colors.status.error : colors.neutral[200]};
  border-radius: 10px;
  font-size: 14px;
  background: #fff;

  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${colors.neutral[200]};
  border-radius: 10px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

const ErrorText = styled.p`
  color: ${colors.status.error};
  font-size: 12px;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: ${colors.primary.gradient};
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  padding: 20px;
  background: #ECFDF5;
  border: 1px solid #10B981;
  border-radius: 10px;
  text-align: center;

  h3 {
    color: #065F46;
    font-size: 1.2rem;
    margin-bottom: 8px;
  }
  p {
    color: #065F46;
  }
`;

const ErrorMessage = styled.div`
  padding: 16px;
  background: #FEF2F2;
  border: 1px solid ${colors.status.error};
  border-radius: 10px;
  color: ${colors.status.error};
  margin-bottom: 16px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid ${colors.neutral[200]};

  &:last-child {
    border-bottom: none;
  }

  .label {
    color: ${colors.neutral[600]};
  }
  .value {
    font-weight: 600;
    color: ${colors.neutral[900]};
  }
`;

// ============================================
// COMPONENT
// ============================================

function Booking() {
    const location = useLocation();
    const navigate = useNavigate();
    const [yatra, setYatra] = useState(null);
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        customer_name: '',
        phone: '',
        email: '',
        total_seats: 1,
        advance_amount: 0,
        pickup_location: '',
        remarks: ''
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams(location.search);
            const yatraId = params.get('yatra');
            
            if (yatraId) {
                const yatraData = await getYatra(yatraId);
                setYatra(yatraData);
            }
            
            const tripsData = await getTrips();
            setTrips(tripsData);
        } catch (err) {
            console.error('Error loading data:', err);
            setError('Failed to load booking data');
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.customer_name.trim()) {
            errors.customer_name = 'Name is required';
        }
        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
            errors.phone = 'Enter a valid 10-digit phone number';
        }
        if (!selectedTrip) {
            errors.trip = 'Please select a trip';
        }
        if (formData.total_seats < 1) {
            errors.total_seats = 'At least 1 seat is required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            setSubmitting(true);
            setError(null);
            
            const bookingData = {
                customer_name: formData.customer_name,
                phone: formData.phone,
                email: formData.email,
                total_seats: formData.total_seats,
                advance_amount: formData.advance_amount || 0,
                pickup_location: formData.pickup_location,
                remarks: formData.remarks,
                yatra_id: yatra?.id
            };
            
            const result = await createBooking(selectedTrip, bookingData);
            setSuccess(true);
            console.log('Booking successful:', result);
            
            setTimeout(() => {
                navigate('/');
            }, 5000);
            
        } catch (err) {
            console.error('Booking error:', err);
            setError(err.response?.data?.message || 'Booking failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <PageContainer>
                <div className="container text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                    <p className="text-gray-500 mt-4">Loading booking details...</p>
                </div>
            </PageContainer>
        );
    }

    if (success) {
        return (
            <PageContainer>
                <div className="container">
                    <BookingCard>
                        <SuccessMessage>
                            <h3>🎉 Booking Confirmed!</h3>
                            <p>Your booking has been successfully created. We'll contact you shortly.</p>
                            <button 
                                className="btn-primary mt-4"
                                onClick={() => navigate('/')}
                            >
                                Return to Home
                            </button>
                        </SuccessMessage>
                    </BookingCard>
                </div>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <div className="container">
                <BookingWrapper>
                    {/* LEFT: Booking Form */}
                    <BookingCard>
                        <BookingTitle>
                            Book Your <span className="gradient-text">Trip</span>
                        </BookingTitle>
                        <BookingSubtitle>
                            {yatra ? `Booking: ${yatra.yatra_name}` : 'Fill in your details'}
                        </BookingSubtitle>

                        {error && <ErrorMessage>{error}</ErrorMessage>}

                        <form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label>Full Name <span className="required">*</span></Label>
                                <Input
                                    type="text"
                                    name="customer_name"
                                    placeholder="Enter your full name"
                                    value={formData.customer_name}
                                    onChange={handleChange}
                                    error={formErrors.customer_name}
                                    disabled={submitting}
                                />
                                {formErrors.customer_name && <ErrorText>{formErrors.customer_name}</ErrorText>}
                            </FormGroup>

                            <FormGroup>
                                <Label>Phone Number <span className="required">*</span></Label>
                                <Input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter 10-digit phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    error={formErrors.phone}
                                    disabled={submitting}
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
                                    disabled={submitting}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Select Trip <span className="required">*</span></Label>
                                <Select
                                    name="trip"
                                    value={selectedTrip}
                                    onChange={(e) => {
                                        setSelectedTrip(e.target.value);
                                        if (formErrors.trip) {
                                            setFormErrors(prev => ({ ...prev, trip: '' }));
                                        }
                                    }}
                                    error={formErrors.trip}
                                    disabled={submitting}
                                >
                                    <option value="">Select a trip...</option>
                                    {trips.map(trip => (
                                        <option key={trip.id} value={trip.id}>
                                            {trip.trip_date} - {trip.total_seats || 0} seats available
                                        </option>
                                    ))}
                                </Select>
                                {formErrors.trip && <ErrorText>{formErrors.trip}</ErrorText>}
                            </FormGroup>

                            <FormGroup>
                                <Label>Number of Seats <span className="required">*</span></Label>
                                <Input
                                    type="number"
                                    name="total_seats"
                                    min="1"
                                    max="20"
                                    value={formData.total_seats}
                                    onChange={handleChange}
                                    error={formErrors.total_seats}
                                    disabled={submitting}
                                />
                                {formErrors.total_seats && <ErrorText>{formErrors.total_seats}</ErrorText>}
                            </FormGroup>

                            <FormGroup>
                                <Label>Pickup Location</Label>
                                <Input
                                    type="text"
                                    name="pickup_location"
                                    placeholder="Where should we pick you up?"
                                    value={formData.pickup_location}
                                    onChange={handleChange}
                                    disabled={submitting}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Special Requests</Label>
                                <TextArea
                                    name="remarks"
                                    placeholder="Any special requirements or requests..."
                                    value={formData.remarks}
                                    onChange={handleChange}
                                    disabled={submitting}
                                />
                            </FormGroup>

                            <SubmitButton type="submit" disabled={submitting}>
                                {submitting ? 'Booking...' : 'Confirm Booking'}
                            </SubmitButton>
                        </form>
                    </BookingCard>

                    {/* RIGHT: Booking Summary */}
                    <BookingCard>
                        <BookingTitle>
                            Trip <span className="gradient-text">Summary</span>
                        </BookingTitle>

                        {yatra && (
                            <>
                                <SummaryItem>
                                    <span className="label">Tour</span>
                                    <span className="value">{yatra.yatra_name}</span>
                                </SummaryItem>
                                <SummaryItem>
                                    <span className="label">Price per seat</span>
                                    <span className="value">₹{yatra.rate_per_seat}</span>
                                </SummaryItem>
                                <SummaryItem>
                                    <span className="label">Seats selected</span>
                                    <span className="value">{formData.total_seats}</span>
                                </SummaryItem>
                                <SummaryItem>
                                    <span className="label">Total amount</span>
                                    <span className="value" style={{ color: colors.primary.main, fontSize: '1.2rem' }}>
                                        ₹{yatra.rate_per_seat * formData.total_seats}
                                    </span>
                                </SummaryItem>
                                <SummaryItem>
                                    <span className="label">Advance payment</span>
                                    <span className="value">₹{formData.advance_amount || 0}</span>
                                </SummaryItem>
                                <SummaryItem>
                                    <span className="label">Balance amount</span>
                                    <span className="value" style={{ color: colors.status.error }}>
                                        ₹{(yatra.rate_per_seat * formData.total_seats) - (formData.advance_amount || 0)}
                                    </span>
                                </SummaryItem>
                            </>
                        )}

                        <div style={{ marginTop: '24px', padding: '16px', background: colors.neutral[100], borderRadius: '10px' }}>
                            <p style={{ fontSize: '14px', color: colors.neutral[600] }}>
                                💡 A travel expert will confirm your booking within 24 hours.
                                Please keep your phone handy.
                            </p>
                        </div>
                    </BookingCard>
                </BookingWrapper>
            </div>
        </PageContainer>
    );
}

export default Booking;
