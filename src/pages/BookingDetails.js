import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors, shadows, breakpoints } from '../styles/theme';
import api from '../services/api';

// ============================================
// TRANSLATION DICTIONARY
// ============================================

const translations = {
    'Booking Details': 'बुकिंग विवरण',
    'Booking ID': 'बुकिंग आईडी',
    'Tour Details': 'यात्रा विवरण',
    'Tour Name': 'यात्रा का नाम',
    'Start Date': 'प्रारंभ तिथि',
    'End Date': 'समाप्ति तिथि',
    'Total Seats': 'कुल सीटें',
    'Seat Numbers': 'सीट संख्या',
    'Payment Details': 'भुगतान विवरण',
    'Total Amount': 'कुल राशि',
    'Advance Paid': 'अग्रिम भुगतान',
    'Balance': 'शेष राशि',
    'Payment Mode': 'भुगतान मोड',
    'Status': 'स्थिति',
    'Cancel Booking': 'बुकिंग रद्द करें',
    'Print Receipt': 'रसीद प्रिंट करें',
    'Book Another Tour': 'एक और यात्रा बुक करें',
    'Back to Dashboard': 'डैशबोर्ड पर वापस जाएँ',
    'Loading booking details...': 'बुकिंग विवरण लोड हो रहा है...',
    'Booking not found': 'बुकिंग नहीं मिली',
    'Failed to load booking details': 'बुकिंग विवरण लोड करने में विफल',
    "We couldn't find the booking you're looking for.": 'हमें वह बुकिंग नहीं मिली जिसे आप ढूंढ रहे हैं।',
    'Are you sure you want to cancel this booking?': 'क्या आप वाकई इस बुकिंग को रद्द करना चाहते हैं?',
    'Booking cancelled successfully!': 'बुकिंग सफलतापूर्वक रद्द कर दी गई!',
    'Failed to cancel booking. Please try again.': 'बुकिंग रद्द करने में विफल। कृपया पुनः प्रयास करें।',
    'Confirmed': 'पुष्टि की गई',
    'Pending': 'लंबित',
    'Completed': 'समाप्त',
    'Cancelled': 'रद्द कर दिया गया',
    'Pickup Location': 'पिकअप स्थान',
    'Additional Passengers': 'अतिरिक्त यात्री',
    'Customer Details': 'ग्राहक विवरण',
    'Name': 'नाम',
    'Phone': 'फोन',
    'Email': 'ईमेल',
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
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9edf5 100%);
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px 60px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  color: ${colors.primary.main};
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 16px;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
  }
`;

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

const Card = styled.div`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.08);
  border: 1px solid rgba(255,255,255,0.3);
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${colors.neutral[900]};
  margin-bottom: 4px;

  span {
    background: ${colors.primary.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Subtitle = styled.p`
  color: ${colors.neutral[500]};
  font-size: 14px;
  margin-bottom: 24px;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const Section = styled.div`
  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: ${colors.neutral[800]};
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 2px solid ${colors.neutral[200]};
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid ${colors.neutral[100]};

  &:last-child {
    border-bottom: none;
  }

  .label {
    color: ${colors.neutral[500]};
    font-size: 14px;
  }

  .value {
    font-weight: 600;
    color: ${colors.neutral[800]};
    font-size: 14px;
    text-align: right;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  background: ${props => props.bg || colors.neutral[200]};
  color: ${props => props.color || colors.neutral[700]};
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 2px solid ${colors.neutral[200]};
`;

const ActionButton = styled.button`
  padding: 12px 28px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.bg || colors.primary.gradient};
  color: #fff;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  &.danger {
    background: ${colors.status.error};
    &:hover {
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
    }
  }

  &.outline {
    background: transparent;
    color: ${colors.primary.main};
    border: 2px solid ${colors.primary.main};
    &:hover {
      background: ${colors.primary.main};
      color: #fff;
    }
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;

  .spinner {
    width: 48px;
    height: 48px;
    border: 4px solid ${colors.neutral[200]};
    border-top-color: ${colors.primary.main};
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  p {
    margin-top: 16px;
    color: ${colors.neutral[500]};
  }
`;

const ErrorBox = styled.div`
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 8px 40px rgba(0,0,0,0.08);
  border: 1px solid rgba(255,255,255,0.3);

  h2 {
    color: ${colors.status.error};
    font-size: 1.3rem;
    margin-bottom: 8px;
  }

  p {
    color: ${colors.neutral[500]};
    margin-bottom: 16px;
  }
`;

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

function BookingDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancelling, setCancelling] = useState(false);
    const [language, setLanguage] = useState('en');

    const t = (text) => translateText(text, language);

    useEffect(() => {
        const customer = JSON.parse(localStorage.getItem('customer') || '{}');
        if (!customer.phone) {
            navigate('/login');
            return;
        }
        loadBookingDetails();
    }, [id]);

    const loadBookingDetails = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/yatra-bookings/${id}`);
            setBooking(response.data);
            setError(null);
        } catch (err) {
            console.error('Error loading booking details:', err);
            setError(t('Failed to load booking details'));
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async () => {
        if (!window.confirm(t('Are you sure you want to cancel this booking?'))) return;
        
        setCancelling(true);
        try {
            await api.put(`/yatra-bookings/${id}/cancel`);
            alert('✅ ' + t('Booking cancelled successfully!'));
            loadBookingDetails();
        } catch (err) {
            console.error('Error cancelling booking:', err);
            alert('❌ ' + t('Failed to cancel booking. Please try again.'));
        } finally {
            setCancelling(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getStatusInfo = (status) => {
        const s = status?.toLowerCase() || '';
        if (s === 'confirmed' || s === 'active') {
            return { label: t('Confirmed'), bg: '#D1FAE5', color: '#065F46' };
        } else if (s === 'pending') {
            return { label: t('Pending'), bg: '#FEF3C7', color: '#92400E' };
        } else if (s === 'completed') {
            return { label: t('Completed'), bg: '#DBEAFE', color: '#1E40AF' };
        } else if (s === 'cancelled') {
            return { label: t('Cancelled'), bg: '#FEE2E2', color: '#991B1B' };
        } else {
            return { label: status || t('Confirmed'), bg: '#F3F4F6', color: '#374151' };
        }
    };

    if (loading) {
        return (
            <PageContainer>
                <Container>
                    <LoadingSpinner>
                        <div className="spinner"></div>
                        <p>{t('Loading booking details...')}</p>
                    </LoadingSpinner>
                </Container>
            </PageContainer>
        );
    }

    if (error || !booking) {
        return (
            <PageContainer>
                <Container>
                    <ErrorBox>
                        <h2>❌ {error || t('Booking not found')}</h2>
                        <p>{t("We couldn't find the booking you're looking for.")}</p>
                        <Link to="/dashboard" style={{ color: colors.primary.main, fontWeight: 600, textDecoration: 'none' }}>
                            ← {t('Back to Dashboard')}
                        </Link>
                    </ErrorBox>
                </Container>
            </PageContainer>
        );
    }

    const statusInfo = getStatusInfo(booking.status);
    const isActive = booking.status !== 'cancelled' && booking.status !== 'completed';

    return (
        <PageContainer>
            <Container>
                <LanguageToggle lang={language} onClick={toggleLanguage}>
                    {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
                </LanguageToggle>

                <BackLink to="/dashboard">← {t('Back to Dashboard')}</BackLink>

                <Card>
                    <Title>{t('Booking')} <span>{t('Details')}</span></Title>
                    <Subtitle>{t('Booking ID')}: #{booking.id} • {formatDate(booking.created_at)}</Subtitle>

                    <DetailsGrid>
                        {/* Tour Details */}
                        <Section>
                            <h3>🚌 {t('Tour Details')}</h3>
                            <DetailRow>
                                <span className="label">{t('Tour Name')}</span>
                                <span className="value">{booking.yatra_name || 'N/A'}</span>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">{t('Start Date')}</span>
                                <span className="value">{formatDate(booking.start_date)}</span>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">{t('End Date')}</span>
                                <span className="value">{formatDate(booking.end_date)}</span>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">{t('Total Seats')}</span>
                                <span className="value">{booking.total_seats || 0}</span>
                            </DetailRow>
                            {booking.pickup_location && (
                                <DetailRow>
                                    <span className="label">{t('Pickup Location')}</span>
                                    <span className="value">{booking.pickup_location}</span>
                                </DetailRow>
                            )}
                        </Section>

                        {/* Customer Details */}
                        <Section>
                            <h3>👤 {t('Customer Details')}</h3>
                            <DetailRow>
                                <span className="label">{t('Name')}</span>
                                <span className="value">{booking.customer_name || 'N/A'}</span>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">{t('Phone')}</span>
                                <span className="value">{booking.phone || 'N/A'}</span>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">{t('Email')}</span>
                                <span className="value">{booking.email || 'N/A'}</span>
                            </DetailRow>
                        </Section>

                        {/* Payment Details */}
                        <Section>
                            <h3>💰 {t('Payment Details')}</h3>
                            <DetailRow>
                                <span className="label">{t('Total Amount')}</span>
                                <span className="value" style={{ color: colors.primary.main, fontWeight: 800 }}>
                                    ₹{booking.total_amount || 0}
                                </span>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">{t('Advance Paid')}</span>
                                <span className="value" style={{ color: '#22C55E' }}>
                                    ₹{booking.advance_amount || 0}
                                </span>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">{t('Balance')}</span>
                                <span className="value" style={{ color: colors.status.error }}>
                                    ₹{booking.balance_amount || 0}
                                </span>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">{t('Payment Mode')}</span>
                                <span className="value">{booking.payment_mode || 'Cash'}</span>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">{t('Status')}</span>
                                <span className="value">
                                    <StatusBadge bg={statusInfo.bg} color={statusInfo.color}>
                                        {statusInfo.label}
                                    </StatusBadge>
                                </span>
                            </DetailRow>
                        </Section>

                        {/* Additional Passengers */}
                        {booking.additional_customers && booking.additional_customers.length > 0 && (
                            <Section>
                                <h3>👥 {t('Additional Passengers')}</h3>
                                {booking.additional_customers.map((passenger, index) => (
                                    <DetailRow key={index}>
                                        <span className="label">Passenger {index + 1}</span>
                                        <span className="value">{passenger.name} ({passenger.phone})</span>
                                    </DetailRow>
                                ))}
                            </Section>
                        )}
                    </DetailsGrid>

                    {/* Actions */}
                    <Actions>
                        {isActive && (
                            <ActionButton
                                className="danger"
                                onClick={handleCancelBooking}
                                disabled={cancelling}
                            >
                                {cancelling ? '...' : '❌ ' + t('Cancel Booking')}
                            </ActionButton>
                        )}
                        <ActionButton className="outline" onClick={handlePrint}>
                            🖨️ {t('Print Receipt')}
                        </ActionButton>
                        <Link to="/tours" style={{ textDecoration: 'none' }}>
                            <ActionButton>📋 {t('Book Another Tour')}</ActionButton>
                        </Link>
                    </Actions>
                </Card>
            </Container>

            <FloatingWhatsApp 
                href={`https://wa.me/918010320000?text=Hi%20I%20have%20a%20question%20about%20my%20booking%20%23${booking.id}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                💬
            </FloatingWhatsApp>
        </PageContainer>
    );
}

export default BookingDetails;
