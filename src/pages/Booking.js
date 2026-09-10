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
// PICKUP POINTS DATA
// ============================================
const PICKUP_POINTS = {
    'Vrindavan': [
        'GetMeYatra Office, Rohini Sector-22',
        'Rithala Metro Station',
        'Madhuban Chowk',
        'Peera Garhi Chowk',
        'Janakpuri East Metro Station',
        'Rajouri Garden Metro Station',
        'Dhaula Kuan (Moti Bagh Gurudwara)',
        'Ashram Chowk',
        'Sarita Vihar',
        'NHPC Chowk Metro Station',
        'Bata Chowk, Faridabad'
    ],
    'Khatu Shyam': [
        'GetMeYatra Office, Rohini Sector-22',
        'Rithala Metro Station',
        'Peera Garhi Chowk',
        'Janakpuri East Metro Station',
        'Rajouri Garden Metro Station',
        'Dhaula Kuan Metro Station',
        'IFFCO Chowk (Gurugram)',
        'Rajeev Chowk (Gurugram)',
        'Manesar Toll Plaza (Gurugram)'
    ],
    'Haridwar': [
        'GetMeYatra Office, Rohini Sector-22',
        'Rithala Metro Station',
        'Madhuban Chowk',
        'Burari Bus Stop (Bypass)',
        'Kashmere Gate Metro Station',
        'Akshardham Metro Station',
        'Noida Sector-62 (Highway)'
    ],
    'Manali': [
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
    ],
    'Other': [
        'Please enter your pickup location below'
    ]
};

const getPickupPoints = (destination) => {
    if (!destination) return PICKUP_POINTS['Other'];
    if (destination.includes('Vrindavan') || destination.includes('Barsana')) return PICKUP_POINTS['Vrindavan'];
    if (destination.includes('Khatu') || destination.includes('Salasar')) return PICKUP_POINTS['Khatu Shyam'];
    if (destination.includes('Haridwar') || destination.includes('Rishikesh')) return PICKUP_POINTS['Haridwar'];
    if (destination.includes('Manali') || destination.includes('Kasol')) return PICKUP_POINTS['Manali'];
    return PICKUP_POINTS['Other'];
};

// ============================================
// TRANSLATION DICTIONARY
// ============================================

const translations = {
    'Book Your': 'बुक करें',
    'Trip': 'यात्रा',
    'Fill in your details': 'अपना विवरण भरें',
    'Full Name': 'पूरा नाम',
    'Phone Number': 'फोन नंबर',
    'Email Address': 'ईमेल पता',
    'Select Trip': 'यात्रा चुनें',
    'Number of Seats': 'सीटों की संख्या',
    'Additional Customer Details': 'अतिरिक्त ग्राहक विवरण',
    'Advance Amount': 'अग्रिम राशि',
    'Pickup Location': 'पिकअप स्थान',
    'Special Requests': 'विशेष अनुरोध',
    'Confirm Booking': 'बुकिंग पुष्टि करें',
    'Booking...': 'बुकिंग हो रही है...',
    'Trip Summary': 'यात्रा सारांश',
    'Tour': 'यात्रा',
    'Start': 'प्रारंभ',
    'End': 'समाप्त',
    'Price per seat': 'प्रति सीट मूल्य',
    'Selected Trip': 'चयनित यात्रा',
    'Seats selected': 'चयनित सीटें',
    'Total amount': 'कुल राशि',
    'Advance payment (30%)': 'अग्रिम भुगतान (30%)',
    'Balance amount': 'शेष राशि',
    'Select a trip...': 'एक यात्रा चुनें...',
    'Where should we pick you up?': 'हम आपको कहाँ से पिक करें?',
    'Any special requirements or requests...': 'कोई विशेष आवश्यकता या अनुरोध...',
    'Loading booking details...': 'बुकिंग विवरण लोड हो रहा है...',
    'Booking successful! We will contact you shortly.': 'बुकिंग सफल! हम आपसे जल्द ही संपर्क करेंगे।',
    'Failed to load booking data. Please try again.': 'बुकिंग डेटा लोड करने में विफल। कृपया पुन: प्रयास करें।',
    'Failed to create booking. Please try again.': 'बुकिंग बनाने में विफल। कृपया पुन: प्रयास करें।',
    'A travel expert will confirm your booking within 24 hours.': 'एक यात्रा विशेषज्ञ 24 घंटे के भीतर आपकी बुकिंग की पुष्टि करेगा।',
    'Please keep your phone handy.': 'कृपया अपना फोन संभाल कर रखें।',
    'Booking Confirmed': 'बुकिंग पुष्टि हुई',
    'Your booking has been confirmed successfully!': 'आपकी बुकिंग सफलतापूर्वक पुष्टि हो गई है!',
    'Booking ID': 'बुकिंग आईडी',
    'Name': 'नाम',
    'Phone': 'फोन',
    'Email': 'ईमेल',
    'Seats': 'सीटें',
    'Pickup Point': 'पिकअप प्वाइंट',
    'Total Amount': 'कुल राशि',
    'Advance Paid': 'अग्रिम भुगतान',
    'Balance Due': 'शेष राशि',
    'View Tours': 'यात्राएं देखें',
    'Select a pickup point...': 'पिकअप प्वाइंट चुनें...',
    'or enter your pickup location': 'या अपना पिकअप स्थान दर्ज करें',
    'Customer': 'ग्राहक',
    'Please select a trip': 'कृपया एक यात्रा चुनें',
    'Please select at least 1 seat': 'कृपया कम से कम 1 सीट चुनें',
    'Enter your full name': 'अपना पूरा नाम दर्ज करें',
    'Enter 10-digit phone number': '10 अंकों का फोन नंबर दर्ज करें',
    'Enter your email address': 'अपना ईमेल पता दर्ज करें',
    'Recommended': 'अनुशंसित',
    'TBD': 'बाद में बताया जाएगा',
    'Approx': 'लगभग',
    'Total': 'कुल',
    'Seats Available': 'उपलब्ध सीटें',
    'seats left': 'सीटें बाकी',
    'Pickup Time': 'पिकअप समय',
    'Trip Type': 'यात्रा प्रकार',
    'Booking Details': 'बुकिंग विवरण',
    'Share via WhatsApp': 'व्हाट्सएप पर शेयर करें',
    'Print Booking': 'बुकिंग प्रिंट करें',
    'Send to WhatsApp': 'व्हाट्सएप पर भेजें',
    'Booking Confirmation': 'बुकिंग पुष्टिकरण',
    'Thank you for booking with GetMeYatra!': 'GetMeYatra के साथ बुकिंग के लिए धन्यवाद!',
    'We will contact you shortly.': 'हम आपसे जल्द ही संपर्क करेंगे।',
    'Tour Details': 'यात्रा विवरण',
    'Yatra Name': 'यात्रा का नाम',
    'Start Date': 'प्रारंभ तिथि',
    'End Date': 'समाप्ति तिथि',
    'Start Time': 'प्रारंभ समय',
    'End Time': 'समाप्ति समय',
    'Return Time': 'वापसी समय',
    'Rate per Seat': 'प्रति सीट दर',
    'Total Seats': 'कुल सीटें',
    'Booked Seats': 'बुक की गई सीटें',
    'Available Seats': 'उपलब्ध सीटें',
    'Status': 'स्थिति',
    'Payment Mode': 'भुगतान मोड',
    'Pending': 'लंबित',
    'Confirmed': 'पुष्टि की गई',
    'Cancelled': 'रद्द कर दिया गया',
    'Booking Date': 'बुकिंग तिथि',
    'Additional Passengers': 'अतिरिक्त यात्री',
    'Step 1': 'चरण 1',
    'Step 2': 'चरण 2',
    'Step 3': 'चरण 3',
    'Select Your Tour': 'अपनी यात्रा चुनें',
    'Customer Details': 'ग्राहक विवरण',
    'Review & Confirm': 'समीक्षा करें और पुष्टि करें',
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
    padding-top: 160px;
    padding-bottom: 60px;
    background: linear-gradient(135deg, #f5f7fa 0%, #e9edf5 100%);
    min-height: 100vh;
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
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
// STEP PROGRESS
// ============================================

const StepProgress = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-bottom: 32px;
    padding: 14px 24px;
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.3);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
`;

const Step = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: ${props => props.active ? 700 : 500};
    color: ${props => props.active ? colors.primary.main : colors.neutral[400]};
    
    .step-number {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: ${props => props.active ? colors.primary.gradient : colors.neutral[200]};
        color: ${props => props.active ? '#fff' : colors.neutral[500]};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 700;
    }
    
    .step-label {
        display: none;
        @media (min-width: ${breakpoints.md}) {
            display: inline;
        }
    }
`;

const StepLine = styled.div`
    width: 30px;
    height: 2px;
    background: ${props => props.active ? colors.primary.main : colors.neutral[200]};
    border-radius: 2px;
`;

// ============================================
// BOOKING WRAPPER
// ============================================

const BookingWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    max-width: 1100px;
    margin: 0 auto;

    @media (max-width: ${breakpoints.md}) {
        grid-template-columns: 1fr;
        gap: 24px;
    }
`;

const BookingCard = styled.div`
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.08);
    border: 1px solid rgba(255,255,255,0.3);
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

const Select = styled.select`
    width: 100%;
    padding: 12px 16px;
    border: 2px solid ${({ error }) => error ? colors.status.error : colors.neutral[200]};
    border-radius: 12px;
    font-size: 14px;
    transition: all 0.3s ease;
    outline: none;
    background: #fff;
    appearance: none;

    &:focus {
        border-color: ${colors.primary.main};
        box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
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
    border-radius: 12px;
    font-size: 14px;
    transition: all 0.3s ease;
    outline: none;
    min-height: 80px;
    resize: vertical;
    font-family: inherit;

    &:focus {
        border-color: ${colors.primary.main};
        box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
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
    border-radius: 12px;
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

// ============================================
// CONFIRMATION MODAL
// ============================================

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
`;

const Modal = styled.div`
    background: #fff;
    border-radius: 24px;
    padding: 40px;
    max-width: 550px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 40px 80px rgba(0,0,0,0.3);
    animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;

const ModalHeader = styled.div`
    text-align: center;
    margin-bottom: 24px;

    .icon {
        font-size: 64px;
        display: block;
        margin-bottom: 8px;
    }

    h2 {
        font-size: 1.5rem;
        font-weight: 800;
        color: ${colors.neutral[900]};
        margin: 0;
    }

    p {
        color: ${colors.neutral[600]};
        margin: 4px 0 0;
    }
`;

const ModalBody = styled.div`
    margin-bottom: 24px;

    .detail-row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid ${colors.neutral[100]};

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
    }

    .total-row {
        display: flex;
        justify-content: space-between;
        padding: 12px 0;
        border-top: 2px solid ${colors.primary.main};
        margin-top: 8px;

        .label {
            font-weight: 700;
            font-size: 16px;
            color: ${colors.neutral[800]};
        }

        .value {
            font-weight: 800;
            font-size: 18px;
            color: ${colors.primary.main};
        }
    }
`;

const ModalActions = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    button {
        flex: 1;
        min-width: 120px;
        padding: 12px 20px;
        border: none;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-2px);
        }
    }

    .btn-primary {
        background: ${colors.primary.gradient};
        color: #fff;
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
    }

    .btn-success {
        background: #25D366;
        color: #fff;
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
    }

    .btn-outline {
        background: transparent;
        border: 2px solid ${colors.neutral[200]};
        color: ${colors.neutral[600]};
    }
`;

// ============================================
// SKELETON LOADING
// ============================================

const SkeletonCard = styled.div`
    background: rgba(255,255,255,0.9);
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.08);
    animation: shimmer 1.5s ease-in-out infinite;
    background: linear-gradient(
        90deg,
        ${colors.neutral[100]} 25%,
        ${colors.neutral[200]} 50%,
        ${colors.neutral[100]} 75%
    );
    background-size: 200% 100%;

    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
`;

const SkeletonLine = styled.div`
    height: ${props => props.height || '16px'};
    width: ${props => props.width || '100%'};
    background: ${colors.neutral[200]};
    border-radius: 8px;
    margin-bottom: ${props => props.mb || '12px'};
    opacity: 0.6;
`;

// ============================================
// CUSTOMER FIELDS COMPONENT
// ============================================
const CustomerFields = ({ index, customer, onChange, errors, submitting, language }) => {
    const t = (text) => translateText(text, language);

    return (
        <div style={{ 
            border: `2px dashed ${colors.neutral[200]}`, 
            borderRadius: '12px', 
            padding: '16px',
            marginBottom: '12px',
            background: `${colors.neutral[50]}`
        }}>
            <Label style={{ fontSize: '13px', color: colors.primary.main }}>
                👤 {t('Customer')} {index + 1}
            </Label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                    <Label style={{ fontSize: '12px' }}>{t('Name')} <span className="required">*</span></Label>
                    <Input
                        type="text"
                        name={`customer_${index}_name`}
                        placeholder={t('Full Name')}
                        value={customer.name}
                        onChange={(e) => onChange(index, 'name', e.target.value)}
                        error={errors?.[`customer_${index}_name`]}
                        disabled={submitting}
                        style={{ fontSize: '13px', padding: '8px 12px' }}
                    />
                </div>
                <div>
                    <Label style={{ fontSize: '12px' }}>{t('Phone')} <span className="required">*</span></Label>
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
                    <Label style={{ fontSize: '12px' }}>{t('Email')}</Label>
                    <Input
                        type="email"
                        name={`customer_${index}_email`}
                        placeholder={t('Email Address')}
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

    const [language, setLanguage] = useState('en');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [bookingData, setBookingData] = useState(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(1);

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
    const [customers, setCustomers] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [pickupPoints, setPickupPoints] = useState([]);

    const t = (text) => translateText(text, language);

    // Scroll Progress
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
        loadData();
    }, [yatraId]);

    useEffect(() => {
        if (yatraId && trips.length > 0) {
            const filtered = trips.filter(trip => trip.yatra_id === parseInt(yatraId));
            setFilteredTrips(filtered);
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
        if (yatra) {
            const points = getPickupPoints(yatra.destination || yatra.yatra_name || '');
            setPickupPoints(points);
        }
    }, [yatra]);

    useEffect(() => {
        const seatCount = parseInt(formData.total_seats) || 1;
        const currentCustomers = [...customers];
        
        while (currentCustomers.length < seatCount) {
            currentCustomers.push({ name: '', phone: '', email: '' });
        }
        
        while (currentCustomers.length > seatCount) {
            currentCustomers.pop();
        }
        
        setCustomers(currentCustomers);
    }, [formData.total_seats]);

    useEffect(() => {
        const total = ratePerSeat * totalSeats;
        const defaultAdvance = Math.round(total * 0.3);
        if (!formData.advance_amount || formData.advance_amount === 0) {
            setFormData(prev => ({ ...prev, advance_amount: defaultAdvance }));
        }
    }, [totalSeats, ratePerSeat]);

    const loadData = async () => {
        try {
            setLoading(true);
            setError('');

            if (yatraId) {
                const yatraData = await getYatra(yatraId);
                setYatra(yatraData);
            }

            const tripsData = await getTrips();
            setTrips(tripsData);

        } catch (err) {
            console.error('Error loading data:', err);
            setError(t('Failed to load booking data. Please try again.'));
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

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!formData.customer_name.trim()) {
            errors.customer_name = t('Full Name') + ' is required';
            isValid = false;
        }

        if (!formData.phone.trim()) {
            errors.phone = t('Phone Number') + ' is required';
            isValid = false;
        } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
            errors.phone = 'Please enter a valid 10-digit phone number';
            isValid = false;
        }

        if (!formData.trip_id) {
            errors.trip_id = t('Please select a trip');
            isValid = false;
        }

        if (!formData.total_seats || formData.total_seats < 1) {
            errors.total_seats = t('Please select at least 1 seat');
            isValid = false;
        }

        if (selectedTrip && formData.total_seats > (selectedTrip.total_seats || 0)) {
            errors.total_seats = `Only ${selectedTrip.total_seats} seats available`;
            isValid = false;
        }

        if (parseInt(formData.total_seats) > 1) {
            customers.forEach((customer, index) => {
                if (!customer.name.trim()) {
                    errors[`customer_${index}_name`] = t('Name') + ' is required';
                    isValid = false;
                }
                if (!customer.phone.trim()) {
                    errors[`customer_${index}_phone`] = t('Phone') + ' is required';
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

    const sendWhatsAppConfirmation = (data) => {
        const message = `✅ *Booking Confirmed!*\n\n` +
                        `🏷️ Booking ID: #${data.bookingId}\n` +
                        `🚌 Tour: ${data.tourName}\n` +
                        `👤 Name: ${data.customerName}\n` +
                        `📱 Phone: ${data.phone}\n` +
                        `📧 Email: ${data.email || 'N/A'}\n` +
                        `💺 Seats: ${data.seats}\n` +
                        `📍 Pickup: ${data.pickup}\n\n` +
                        `💰 Total: ₹${data.totalAmount}\n` +
                        `💳 Advance: ₹${data.advanceAmount}\n` +
                        `📌 Balance: ₹${data.balanceAmount}\n\n` +
                        `🙏 Thank you for booking with GetMeYatra!\n` +
                        `📞 For any queries: 8010320000`;

        const url = `https://wa.me/${data.phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const handlePrint = () => {
        window.print();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setSubmitting(true);
            setError('');

            let customer = null;
            try {
                customer = await checkCustomer(formData.phone);
            } catch (err) {}

            if (!customer || !customer.id) {
                const newCustomer = await createCustomer({
                    customer_name: formData.customer_name,
                    mobile_number: formData.phone,
                    email: formData.email || '',
                });
                customer = newCustomer;
            }

            const bookingPayload = {
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
                additional_customers: customers.slice(1).filter(c => c.name.trim() || c.phone.trim())
            };

            const response = await createBooking(formData.trip_id, bookingPayload);

            const bookingInfo = {
                bookingId: response?.id || 'BK' + Date.now(),
                tourName: yatra?.yatra_name || '',
                customerName: formData.customer_name,
                phone: formData.phone,
                email: formData.email || '',
                seats: parseInt(formData.total_seats),
                pickup: formData.pickup_location || 'TBD',
                totalAmount: totalAmount,
                advanceAmount: advanceAmount,
                balanceAmount: balanceAmount,
                selectedTrip: selectedTrip,
            };

            setBookingData(bookingInfo);
            setShowConfirmation(true);

        } catch (err) {
            console.error('Error creating booking:', err);
            setError(err.response?.data?.message || t('Failed to create booking. Please try again.'));
        } finally {
            setSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setShowConfirmation(false);
        navigate('/tours');
    };

    const totalSeats = parseInt(formData.total_seats) || 0;
    const ratePerSeat = yatra?.rate_per_seat || 0;
    const totalAmount = ratePerSeat * totalSeats;
    const advanceAmount = parseFloat(formData.advance_amount) || Math.round(totalAmount * 0.3);
    const balanceAmount = totalAmount - advanceAmount;
    const seatsAvailable = selectedTrip 
        ? (selectedTrip.total_seats || 0) - (selectedTrip.booked_seats || 0) 
        : 0;

    // Determine current step
    useEffect(() => {
        if (formData.trip_id && formData.customer_name && formData.phone) {
            setCurrentStep(3);
        } else if (formData.trip_id) {
            setCurrentStep(2);
        } else {
            setCurrentStep(1);
        }
    }, [formData.trip_id, formData.customer_name, formData.phone]);

    if (loading) {
        return (
            <PageContainer>
                <ScrollProgress progress={0} />
                <Container>
                    <BookingWrapper>
                        <SkeletonCard>
                            <SkeletonLine height="28px" width="60%" mb="12px" />
                            <SkeletonLine height="16px" width="80%" />
                            <SkeletonLine height="48px" width="100%" mb="16px" />
                            <SkeletonLine height="48px" width="100%" mb="16px" />
                            <SkeletonLine height="48px" width="100%" mb="16px" />
                            <SkeletonLine height="48px" width="100%" mb="16px" />
                            <SkeletonLine height="56px" width="100%" />
                        </SkeletonCard>
                        <SkeletonCard>
                            <SkeletonLine height="28px" width="60%" mb="12px" />
                            <SkeletonLine height="16px" width="80%" />
                            <SkeletonLine height="16px" width="90%" />
                            <SkeletonLine height="16px" width="70%" />
                            <SkeletonLine height="16px" width="50%" />
                        </SkeletonCard>
                    </BookingWrapper>
                </Container>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <ScrollProgress progress={scrollProgress} />
            <Container>
                <LanguageToggle lang={language} onClick={toggleLanguage}>
                    {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
                </LanguageToggle>

                {/* ===== STEP PROGRESS ===== */}
                <StepProgress>
                    <Step active={currentStep >= 1}>
                        <span className="step-number">1</span>
                        <span className="step-label">{t('Select Your Tour')}</span>
                    </Step>
                    <StepLine active={currentStep >= 2} />
                    <Step active={currentStep >= 2}>
                        <span className="step-number">2</span>
                        <span className="step-label">{t('Customer Details')}</span>
                    </Step>
                    <StepLine active={currentStep >= 3} />
                    <Step active={currentStep >= 3}>
                        <span className="step-number">3</span>
                        <span className="step-label">{t('Review & Confirm')}</span>
                    </Step>
                </StepProgress>

                <BookingWrapper>
                    {/* LEFT: Booking Form */}
                    <BookingCard>
                        <BookingTitle>
                            {t('Book Your')} <span className="gradient-text">{t('Trip')}</span>
                        </BookingTitle>
                        <BookingSubtitle>
                            {yatra ? `Booking: ${yatra.yatra_name}` : t('Fill in your details')}
                        </BookingSubtitle>

                        {error && <ErrorMessage>{error}</ErrorMessage>}

                        <form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label>{t('Full Name')} <span className="required">*</span></Label>
                                <Input
                                    type="text"
                                    name="customer_name"
                                    placeholder={t('Enter your full name')}
                                    value={formData.customer_name}
                                    onChange={handleChange}
                                    error={formErrors.customer_name}
                                    disabled={submitting}
                                />
                                {formErrors.customer_name && <ErrorText>{formErrors.customer_name}</ErrorText>}
                            </FormGroup>

                            <FormGroup>
                                <Label>{t('Phone Number')} <span className="required">*</span></Label>
                                <Input
                                    type="tel"
                                    name="phone"
                                    placeholder={t('Enter 10-digit phone number')}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    error={formErrors.phone}
                                    disabled={submitting}
                                />
                                {formErrors.phone && <ErrorText>{formErrors.phone}</ErrorText>}
                            </FormGroup>

                            <FormGroup>
                                <Label>{t('Email Address')}</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder={t('Enter your email address')}
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={submitting}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>{t('Select Trip')} <span className="required">*</span></Label>
                                <Select
                                    name="trip_id"
                                    value={selectedTripId}
                                    onChange={handleTripSelect}
                                    error={formErrors.trip_id}
                                    disabled={submitting}
                                >
                                    <option value="">{t('Select a trip...')}</option>
                                    {filteredTrips.map(trip => (
                                        <option key={trip.id} value={trip.id}>
                                            {formatDateRange(trip.start_date, trip.end_date)} - {trip.total_seats || 0} seats
                                        </option>
                                    ))}
                                </Select>
                                {formErrors.trip_id && <ErrorText>{formErrors.trip_id}</ErrorText>}
                            </FormGroup>

                            <FormGroup>
                                <Label>{t('Number of Seats')} <span className="required">*</span></Label>
                                <Input
                                    type="number"
                                    name="total_seats"
                                    min="1"
                                    max={seatsAvailable || 20}
                                    value={formData.total_seats}
                                    onChange={handleChange}
                                    error={formErrors.total_seats}
                                    disabled={submitting}
                                />
                                {selectedTrip && (
                                    <div style={{ fontSize: '12px', color: colors.neutral[500], marginTop: '4px' }}>
                                        {t('Seats Available')}: <strong style={{ 
                                            color: seatsAvailable < 5 ? colors.status.error : '#22C55E'
                                        }}>{seatsAvailable}</strong> {t('seats left')}
                                    </div>
                                )}
                                {formErrors.total_seats && <ErrorText>{formErrors.total_seats}</ErrorText>}
                            </FormGroup>

                            {parseInt(formData.total_seats) > 1 && (
                                <FormGroup>
                                    <Label>{t('Additional Customer Details')}</Label>
                                    {customers.slice(1).map((customer, index) => (
                                        <CustomerFields
                                            key={index}
                                            index={index + 1}
                                            customer={customer}
                                            onChange={handleCustomerChange}
                                            errors={formErrors}
                                            submitting={submitting}
                                            language={language}
                                        />
                                    ))}
                                </FormGroup>
                            )}

                            <FormGroup>
                                <Label>{t('Advance Amount')} (₹)</Label>
                                <Input
                                    type="number"
                                    name="advance_amount"
                                    min="0"
                                    max={totalAmount}
                                    value={formData.advance_amount}
                                    onChange={handleChange}
                                    disabled={submitting}
                                    placeholder={`${t('Recommended')}: ₹${advanceAmount}`}
                                />
                                <div style={{ fontSize: '12px', color: colors.neutral[500], marginTop: '4px' }}>
                                    {t('Advance payment (30%)')}: ₹{Math.round(totalAmount * 0.3)}
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <Label>{t('Pickup Location')} <span className="required">*</span></Label>
                                {pickupPoints && pickupPoints.length > 0 && pickupPoints[0] !== 'Please enter your pickup location below' ? (
                                    <>
                                        <Select
                                            name="pickup_location"
                                            value={formData.pickup_location}
                                            onChange={handleChange}
                                            disabled={submitting}
                                        >
                                            <option value="">{t('Select a pickup point...')}</option>
                                            {pickupPoints.map((point) => (
                                                <option key={point} value={point}>{point}</option>
                                            ))}
                                            <option value="other">✏️ {t('or enter your pickup location')}</option>
                                        </Select>
                                        {formData.pickup_location === 'other' && (
                                            <Input
                                                type="text"
                                                placeholder={t('Enter your pickup location')}
                                                value={formData.pickup_location === 'other' ? '' : formData.pickup_location}
                                                onChange={(e) => {
                                                    setFormData(prev => ({ ...prev, pickup_location: e.target.value }));
                                                }}
                                                disabled={submitting}
                                                style={{ marginTop: '8px' }}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <Input
                                        type="text"
                                        name="pickup_location"
                                        placeholder={t('Where should we pick you up?')}
                                        value={formData.pickup_location}
                                        onChange={handleChange}
                                        disabled={submitting}
                                    />
                                )}
                            </FormGroup>

                            <FormGroup>
                                <Label>{t('Special Requests')}</Label>
                                <TextArea
                                    name="remarks"
                                    placeholder={t('Any special requirements or requests...')}
                                    value={formData.remarks}
                                    onChange={handleChange}
                                    disabled={submitting}
                                />
                            </FormGroup>

                            <SubmitButton type="submit" disabled={submitting}>
                                {submitting ? t('Booking...') : t('Confirm Booking')}
                            </SubmitButton>
                        </form>
                    </BookingCard>

                    {/* RIGHT: Booking Summary */}
                    <BookingCard>
                        <BookingTitle>
                            {t('Trip')} <span className="gradient-text">{t('Summary')}</span>
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
                                    <span className="label">{t('Tour')}</span>
                                    <span className="value">{yatra.yatra_name}</span>
                                </SummaryItem>
                                <SummaryItem>
                                    <span className="label">{t('Trip Type')}</span>
                                    <span className="value" style={{ 
                                        background: colors.primary.light, 
                                        color: colors.primary.main,
                                        padding: '2px 12px',
                                        borderRadius: '20px',
                                        fontSize: '12px'
                                    }}>
                                        {selectedTrip?.trip_type || yatra?.trip_type || 'Standard'}
                                    </span>
                                </SummaryItem>
                                <SummaryItem>
                                    <span className="label">{t('Start')}</span>
                                    <span className="value">{formatDate(yatra.start_date)} | {yatra.start_time ? formatTime(yatra.start_time) : t('TBD')}</span>
                                </SummaryItem>
                                <SummaryItem>
                                    <span className="label">{t('End')}</span>
                                    <span className="value">{formatDate(yatra.end_date)} | {yatra.return_time ? yatra.return_time + ' (' + t('Approx') + ')' : t('TBD')}</span>
                                </SummaryItem>
                                <SummaryItem>
                                    <span className="label">{t('Price per seat')}</span>
                                    <span className="value">₹{ratePerSeat}</span>
                                </SummaryItem>
                                {selectedTrip && (
                                    <>
                                        <SummaryItem>
                                            <span className="label">{t('Selected Trip')}</span>
                                            <span className="value">{formatDateRange(selectedTrip.start_date, selectedTrip.end_date)}</span>
                                        </SummaryItem>
                                        <SummaryItem>
                                            <span className="label">{t('Seats Available')}</span>
                                            <span className="value" style={{ 
                                                color: seatsAvailable < 5 ? colors.status.error : '#22C55E',
                                                fontWeight: '700'
                                            }}>
                                                {seatsAvailable} {t('seats left')}
                                            </span>
                                        </SummaryItem>
                                        {selectedTrip.start_time && (
                                            <SummaryItem>
                                                <span className="label">{t('Pickup Time')}</span>
                                                <span className="value">{formatTime(selectedTrip.start_time)}</span>
                                            </SummaryItem>
                                        )}
                                    </>
                                )}
                                <SummaryItem>
                                    <span className="label">{t('Seats selected')}</span>
                                    <span className="value">{totalSeats}</span>
                                </SummaryItem>
                                <SummaryItem style={{ borderBottom: '2px solid ' + colors.primary.main, paddingBottom: '12px' }}>
                                    <span className="label" style={{ fontWeight: '700', fontSize: '16px' }}>{t('Total')}</span>
                                    <span className="value" style={{ color: colors.primary.main, fontSize: '1.4rem', fontWeight: '800' }}>
                                        ₹{totalAmount}
                                    </span>
                                </SummaryItem>
                                <SummaryItem>
                                    <span className="label">{t('Advance payment (30%)')}</span>
                                    <span className="value" style={{ color: colors.primary.main, fontWeight: '700' }}>₹{advanceAmount}</span>
                                </SummaryItem>
                                <SummaryItem>
                                    <span className="label">{t('Balance amount')}</span>
                                    <span className="value" style={{ color: colors.status.error, fontWeight: '700', fontSize: '1.1rem' }}>
                                        ₹{balanceAmount}
                                    </span>
                                </SummaryItem>
                            </>
                        )}

                        <div style={{ marginTop: '24px', padding: '16px', background: colors.neutral[100], borderRadius: '10px' }}>
                            <p style={{ fontSize: '14px', color: colors.neutral[600] }}>
                                💡 {t('A travel expert will confirm your booking within 24 hours.')}<br />
                                {t('Please keep your phone handy.')}
                            </p>
                        </div>
                    </BookingCard>
                </BookingWrapper>
            </Container>

            {/* ===== CONFIRMATION MODAL ===== */}
            {showConfirmation && bookingData && (
                <ModalOverlay onClick={handleCloseModal}>
                    <Modal onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <span className="icon">✅</span>
                            <h2>{t('Booking Confirmed')}</h2>
                            <p>{t('Thank you for booking with GetMeYatra!')}<br />{t('We will contact you shortly.')}</p>
                        </ModalHeader>
                        <ModalBody>
                            <div className="detail-row">
                                <span className="label">{t('Booking ID')}</span>
                                <span className="value">#{bookingData.bookingId}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">{t('Tour')}</span>
                                <span className="value">{bookingData.tourName}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">{t('Name')}</span>
                                <span className="value">{bookingData.customerName}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">{t('Phone')}</span>
                                <span className="value">{bookingData.phone}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">{t('Email')}</span>
                                <span className="value">{bookingData.email || 'N/A'}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">{t('Seats')}</span>
                                <span className="value">{bookingData.seats}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">{t('Pickup Point')}</span>
                                <span className="value">{bookingData.pickup}</span>
                            </div>
                            <div className="total-row">
                                <span className="label">{t('Total Amount')}</span>
                                <span className="value">₹{bookingData.totalAmount}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">{t('Advance Paid')}</span>
                                <span className="value">₹{bookingData.advanceAmount}</span>
                            </div>
                            <div className="detail-row" style={{ borderBottom: 'none' }}>
                                <span className="label">{t('Balance Due')}</span>
                                <span className="value" style={{ color: colors.status.error, fontWeight: '700' }}>
                                    ₹{bookingData.balanceAmount}
                                </span>
                            </div>
                        </ModalBody>
                        <ModalActions>
                            <button className="btn-primary" onClick={handleCloseModal}>
                                {t('View Tours')}
                            </button>
                            <button className="btn-success" onClick={() => sendWhatsAppConfirmation(bookingData)}>
                                💬 {t('Send to WhatsApp')}
                            </button>
                            <button className="btn-outline" onClick={handlePrint}>
                                🖨️ {t('Print Booking')}
                            </button>
                        </ModalActions>
                    </Modal>
                </ModalOverlay>
            )}
        </PageContainer>
    );
}

export default Booking;
