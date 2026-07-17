import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getYatra, getTrips, createBooking, checkCustomer, createCustomer } from '../services/api';
import styled from 'styled-components';
import { colors, shadows, breakpoints } from '../styles/theme';

// ============================================
// HELPER FUNCTIONS
// ============================================

const formatTime = (time) => {
    if (!time) return '';
    const parts = time.split(':');
    const h = parseInt(parts[0]);
    const m = parts[1] || '00';
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${m} ${ampm}`;
};

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return '';
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`;
};

// ============================================
// MANALI PICKUP POINTS
// ============================================
const MANALI_PICKUP_POINTS = [
    'Akshardham Metro Station',
    'Kashmere Gate Bus Stand',
    'Tis Hazari Metro Station',
    'Karol Bagh Metro Station',
    'Shadipur Metro Station',
    'Rajouri Garden Metro Station',
    'Janakpuri East Metro Station',
    'Peeragarhi Chowk',
    'Madhuban Chowk',
    'Karnal Bypass'
];

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
  outline: none;
  background: #fff;

  &:focus {
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  &:disabled {
    background: ${colors.neutral[50]};
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${({ error }) => error ? colors.status.error : colors.neutral[200]};
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  outline: none;
  background: #fff;
  appearance: none;

  &:focus {
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  &:disabled {
    background: ${colors.neutral[50]};
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${colors.neutral[200]};
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  outline: none;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  &:disabled {
    background: ${colors.neutral[50]};
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: ${colors.primary.gradient};
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 18px;
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

const ErrorMessage = styled.div`
  background: #FEE2E2;
  color: #DC2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
`;

const ErrorText = styled.span`
  color: ${colors.status.error};
  font-size: 12px;
  display: block;
  margin-top: 4px;
`;

const TourImage = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  background: ${colors.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #fff;
  opacity: 0.6;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid ${colors.neutral[100]};

  &:last-child {
    border-bottom: none;
  }

  .label {
    color: ${colors.neutral[600]};
    font-size: 14px;
  }

  .value {
    font-weight: 600;
    color: ${colors.neutral[800]};
    text-align: right;
    font-size: 14px;
  }
`;

// ============================================
// CUSTOMER FIELDS COMPONENT
// ============================================
const CustomerFields = ({ index, customer, onChange, errors, submitting }) => {
    return (
        <div style={{ 
            border: `1px solid ${colors.neutral[200]}`, 
            borderRadius: '10px', 
            padding: '16px',
            marginBottom: '12px',
            background: colors.neutral[50]
        }}>
            <Label style={{ fontSize: '13px', color: colors.primary.main }}>
                👤 Customer {index + 1}
            </Label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                    <Label style={{ fontSize: '12px' }}>Name <span className="required">*</span></Label>
                    <Input
                        type="text"
                        name={`customer_${index}_name`}
                        placeholder="Full name"
                        value={customer.name}
                        onChange={(e) => onChange(index, 'name', e.target.value)}
                        error={errors?.[`customer_${index}_name`]}
                        disabled={submitting}
                        style={{ fontSize: '13px', padding: '8px 12px' }}
                    />
                </div>
                <div>
                    <Label style={{ fontSize: '12px' }}>Phone <span className="required">*</span></Label>
                    <Input
                        type="tel"
                        name={`customer_${index}_phone`}
                        placeholder="10-digit phone"
                        value={customer.phone}
                        onChange={(e) => onChange(index, 'phone', e.target.value)}
                        error={errors?.[`customer_${index}_phone`]}
                        disabled={submitting}
                        style={{ fontSize: '13px', padding: '8px 12px' }}
                    />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                    <Label style={{ fontSize: '12px' }}>Email</Label>
                    <Input
                        type="email"
                        name={`customer_${index}_email`}
                        placeholder="Email address"
                        value={customer.email}
                        onChange={(e) => onChange(index, 'email', e.target.value)}
                        disabled={submitting}
                        style={{ fontSize: '13px', padding: '8px 12px' }}
                    />
                </div>
            </div>
        </div>
    );
};

// ============================================
// COMPONENT
// ============================================

function Booking() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const yatraId = queryParams.get('yatra');

    const [yatra, setYatra] = useState(null);
    const [trips, setTrips] = useState([]);
    const [filteredTrips, setFilteredTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    // ===== FORM STATE =====
    const [formData, setFormData] = useState({
        customer_name: '',
        phone: '',
        email: '',
        trip_id: '',
        total_seats: 1,
        pickup_location: '',
        remarks: '',
        advance_amount: 0,
    });

    const [selectedTripId, setSelectedTripId] = useState('');
    const [selectedTrip, setSelectedTrip] = useState(null);

    // ===== MULTI-CUSTOMER STATE =====
    const [customers, setCustomers] = useState([]);

    // ===== FORM ERRORS =====
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        loadData();
    }, [yatraId]);

    useEffect(() => {
        // Filter trips based on yatra ID
        if (yatraId && trips.length > 0) {
            const filtered = trips.filter(trip => trip.yatra_id === parseInt(yatraId));
            setFilteredTrips(filtered);
            // Auto-select first trip
            if (filtered.length > 0) {
                const firstTrip = filtered[0];
                setSelectedTripId(firstTrip.id.toString());
                setSelectedTrip(firstTrip);
                setFormData(prev => ({ ...prev, trip_id: firstTrip.id }));
            }
        } else {
            setFilteredTrips(trips);
        }
    }, [trips, yatraId]);

    useEffect(() => {
        // Update customer fields when seats change
        const seatCount = parseInt(formData.total_seats) || 1;
        const currentCustomers = [...customers];
        
        // Add new customers
        while (currentCustomers.length < seatCount) {
            currentCustomers.push({ name: '', phone: '', email: '' });
        }
        
        // Remove extra customers
        while (currentCustomers.length > seatCount) {
            currentCustomers.pop();
        }
        
        setCustomers(currentCustomers);
    }, [formData.total_seats]);

    const loadData = async () => {
        try {
            setLoading(true);
            setError('');

            // Load yatra details
            if (yatraId) {
                const yatraData = await getYatra(yatraId);
                setYatra(yatraData);
            }

            // Load all trips
            const tripsData = await getTrips();
            setTrips(tripsData);

        } catch (err) {
            console.error('Error loading data:', err);
            setError('Failed to load booking data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleTripSelect = (e) => {
        const tripId = e.target.value;
        setSelectedTripId(tripId);
        setFormData(prev => ({ ...prev, trip_id: tripId }));

        const trip = filteredTrips.find(t => t.id === parseInt(tripId));
        setSelectedTrip(trip);

        if (formErrors.trip_id) {
            setFormErrors(prev => ({ ...prev, trip_id: '' }));
        }
    };

    const handleCustomerChange = (index, field, value) => {
        const updated = [...customers];
        updated[index] = { ...updated[index], [field]: value };
        setCustomers(updated);
    };

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        // Validate main customer
        if (!formData.customer_name.trim()) {
            errors.customer_name = 'Full name is required';
            isValid = false;
        }

        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
            isValid = false;
        } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
            errors.phone = 'Please enter a valid 10-digit phone number';
            isValid = false;
        }

        if (!formData.trip_id) {
            errors.trip_id = 'Please select a trip';
            isValid = false;
        }

        if (!formData.total_seats || formData.total_seats < 1) {
            errors.total_seats = 'Please select at least 1 seat';
            isValid = false;
        }

        // Check seat availability
        if (selectedTrip && formData.total_seats > (selectedTrip.total_seats || 0)) {
            errors.total_seats = `Only ${selectedTrip.total_seats} seats available`;
            isValid = false;
        }

        // Validate all customers if more than 1 seat
        if (parseInt(formData.total_seats) > 1) {
            customers.forEach((customer, index) => {
                if (!customer.name.trim()) {
                    errors[`customer_${index}_name`] = 'Name is required';
                    isValid = false;
                }
                if (!customer.phone.trim()) {
                    errors[`customer_${index}_phone`] = 'Phone is required';
                    isValid = false;
                } else if (!/^[0-9]{10}$/.test(customer.phone.trim())) {
                    errors[`customer_${index}_phone`] = 'Valid 10-digit phone required';
                    isValid = false;
                }
            });
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setSubmitting(true);
            setError('');

            // Check if main customer exists
            let customer = null;
            try {
                customer = await checkCustomer(formData.phone);
            } catch (err) {
                // Customer not found, create new
            }

            if (!customer || !customer.id) {
                const newCustomer = await createCustomer({
                    customer_name: formData.customer_name,
                    mobile_number: formData.phone,
                    email: formData.email || '',
                });
                customer = newCustomer;
            }

            // Prepare booking data
            const bookingData = {
                customer_id: customer.id || customer.customer_id,
                customer_name: formData.customer_name,
                phone: formData.phone,
                email: formData.email || '',
                total_seats: parseInt(formData.total_seats),
                pickup_location: formData.pickup_location || '',
                notes: formData.remarks || '',
                advance_amount: parseFloat(formData.advance_amount) || 0,
                booking_date: new Date().toISOString().split('T')[0],
                payment_mode: 'Pending',
                // Additional customers
                additional_customers: customers.slice(1).filter(c => c.name.trim() || c.phone.trim())
            };

            // Create booking
            await createBooking(formData.trip_id, bookingData);

            alert('✅ Booking successful! We will contact you shortly.');
            navigate('/tours');

        } catch (err) {
            console.error('Error creating booking:', err);
            setError(err.response?.data?.message || 'Failed to create booking. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    // Calculate amounts
    const totalSeats = parseInt(formData.total_seats) || 0;
    const ratePerSeat = yatra?.rate_per_seat || 0;
    const totalAmount = ratePerSeat * totalSeats;
    const advanceAmount = parseFloat(formData.advance_amount) || Math.round(totalAmount * 0.3);
    const balanceAmount = totalAmount - advanceAmount;

    if (loading) {
        return (
            <PageContainer>
                <div className="container text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                    <p className="text-gray-500 mt-4">Loading booking details...</p>
                </div>
            </PageContainer>
        );
    }

    // Determine if we should show pickup points (Manali)
    const isManali = yatra?.destination === 'Manali' || yatra?.yatra_name?.toLowerCase().includes('manali');

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
                                    name="trip_id"
                                    value={selectedTripId}
                                    onChange={handleTripSelect}
                                    error={formErrors.trip_id}
                                    disabled={submitting}
                                >
                                    <option value="">Select a trip...</option>
                                    {filteredTrips.map(trip => (
                                        <option key={trip.id} value={trip.id}>
                                            {formatDateRange(trip.start_date, trip.end_date)} - {trip.total_seats || 0} seats
                                        </option>
                                    ))}
                                </Select>
                                {formErrors.trip_id && <ErrorText>{formErrors.trip_id}</ErrorText>}
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

                            {/* Multi-Customer Fields */}
                            {parseInt(formData.total_seats) > 1 && (
                                <FormGroup>
                                    <Label>Additional Customer Details</Label>
                                    {customers.slice(1).map((customer, index) => (
                                        <CustomerFields
                                            key={index}
                                            index={index + 1}
                                            customer={customer}
                                            onChange={handleCustomerChange}
                                            errors={formErrors}
                                            submitting={submitting}
                                        />
                                    ))}
                                </FormGroup>
                            )}

                            <FormGroup>
                                <Label>Advance Amount (₹)</Label>
                                <Input
                                    type="number"
                                    name="advance_amount"
                                    min="0"
                                    value={formData.advance_amount}
                                    onChange={handleChange}
                                    disabled={submitting}
                                    placeholder={`Recommended: ₹${advanceAmount}`}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Pickup Location</Label>
                                {isManali ? (
                                    <Select
                                        name="pickup_location"
                                        value={formData.pickup_location}
                                        onChange={handleChange}
                                        disabled={submitting}
                                    >
                                        <option value="">Select a pickup point...</option>
                                        {MANALI_PICKUP_POINTS.map((point) => (
                                            <option key={point} value={point}>{point}</option>
                                        ))}
                                    </Select>
                                ) : (
                                    <Input
                                        type="text"
                                        name="pickup_location"
                                        placeholder="Where should we pick you up?"
                                        value={formData.pickup_location}
                                        onChange={handleChange}
                                        disabled={submitting}
                                    />
                                )}
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
                                {yatra.image_url && (
                                    <TourImage>
                                        <img 
                                            src={'http://getmeyatra.com' + yatra.image_url}
                                            alt={yatra.yatra_name}
                                            onError={(e) => { 
                                                e.target.style.display = 'none'; 
                                            }}
                                        />
                                    </TourImage>
                                )}
                                <SummaryItem>
                                    <span className="label">Tour</span>
                                    <span className="value">{yatra.yatra_name}</span>
                                </SummaryItem>
                                <SummaryItem>
                                    <span className="label">Start</span>
                                    <span className="value">{formatDate(yatra.start_date)} | {yatra.start_time ? formatTime(yatra.start_time) : 'TBD'}</span>
                                </SummaryItem>
                                <SummaryItem>
                                    <span className="label">End</span>
                                    <span className="value">{formatDate(yatra.end_date)} | {yatra.return_time ? yatra.return_time + ' (Approx)' : 'TBD'}</span>
                                </SummaryItem>
                                <SummaryItem>
                                    <span className="label">Price per seat</span>
                                    <span className="value">₹{ratePerSeat}</span>
                                </SummaryItem>
                                {selectedTrip && (
                                    <SummaryItem>
                                        <span className="label">Selected Trip</span>
                                        <span className="value">{formatDateRange(selectedTrip.start_date, selectedTrip.end_date)}</span>
                                    </SummaryItem>
                                )}
                                <SummaryItem>
                                    <span className="label">Seats selected</span>
                                    <span className="value">{totalSeats}</span>
                                </SummaryItem>
                                <SummaryItem style={{ borderBottom: '2px solid ' + colors.primary.main, paddingBottom: '12px' }}>
                                    <span className="label" style={{ fontWeight: '700', fontSize: '16px' }}>Total amount</span>
                                    <span className="value" style={{ color: colors.primary.main, fontSize: '1.4rem', fontWeight: '800' }}>
                                        ₹{totalAmount}
                                    </span>
                                </SummaryItem>
                                <SummaryItem>
                                    <span className="label">Advance payment (30%)</span>
                                    <span className="value" style={{ color: colors.primary.main, fontWeight: '700' }}>₹{advanceAmount}</span>
                                </SummaryItem>
                                <SummaryItem>
                                    <span className="label">Balance amount</span>
                                    <span className="value" style={{ color: colors.status.error, fontWeight: '700', fontSize: '1.1rem' }}>
                                        ₹{balanceAmount}
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
