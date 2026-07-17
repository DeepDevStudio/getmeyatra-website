import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors, shadows, breakpoints } from '../styles/theme';
import api from '../services/api';

// ============================================
// STYLED COMPONENTS
// ============================================

const PageContainer = styled.div`
  padding-top: 160px;
  min-height: 100vh;
  background: ${colors.background.main};
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
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

const Card = styled.div`
  background: ${colors.background.card};
  border-radius: 16px;
  padding: 32px;
  box-shadow: ${shadows.md};
  border: 1px solid ${colors.neutral[100]};
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
  background: ${colors.background.card};
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  box-shadow: ${shadows.md};
  border: 1px solid ${colors.neutral[100]};

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

// ===== FLOATING WHATSAPP BUTTON =====
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
            setError('Failed to load booking details');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async () => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;
        
        setCancelling(true);
        try {
            await api.put(`/yatra-bookings/${id}/cancel`);
            alert('✅ Booking cancelled successfully!');
            loadBookingDetails();
        } catch (err) {
            console.error('Error cancelling booking:', err);
            alert('❌ Failed to cancel booking. Please try again.');
        } finally {
            setCancelling(false);
        }
    };

    const handlePrint = () => {
        window.print();
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
            return { label: 'Confirmed', bg: '#D1FAE5', color: '#065F46' };
        } else if (s === 'pending') {
            return { label: 'Pending', bg: '#FEF3C7', color: '#92400E' };
        } else if (s === 'completed') {
            return { label: 'Completed', bg: '#DBEAFE', color: '#1E40AF' };
        } else if (s === 'cancelled') {
            return { label: 'Cancelled', bg: '#FEE2E2', color: '#991B1B' };
        } else {
            return { label: status || 'Confirmed', bg: '#F3F4F6', color: '#374151' };
        }
    };

    if (loading) {
        return (
            <PageContainer>
                <Container>
                    <LoadingSpinner>
                        <div className="spinner"></div>
                        <p>Loading booking details...</p>
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
                        <h2>❌ {error || 'Booking not found'}</h2>
                        <p>We couldn't find the booking you're looking for.</p>
                        <Link to="/dashboard" style={{ color: colors.primary.main, fontWeight: 600, textDecoration: 'none' }}>
                            ← Back to Dashboard
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
                <BackLink to="/dashboard">← Back to Dashboard</BackLink>

                <Card>
                    <Title>Booking <span>Details</span></Title>
                    <Subtitle>Booking ID: #{booking.id} • {formatDate(booking.created_at)}</Subtitle>

                    <DetailsGrid>
                        {/* Tour Details */}
                        <Section>
                            <h3>🚌 Tour Details</h3>
                            <DetailRow>
                                <span className="label">Tour Name</span>
                                <span className="value">{booking.yatra_name || 'N/A'}</span>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">Start Date</span>
                                <span className="value">{formatDate(booking.start_date)}</span>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">End Date</span>
                                <span className="value">{formatDate(booking.end_date)}</span>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">Total Seats</span>
                                <span className="value">{booking.total_seats || 0}</span>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">Seat Numbers</span>
                                <span className="value">{booking.seat_numbers?.join(', ') || 'N/A'}</span>
                            </DetailRow>
                        </Section>

                        {/* Payment Details */}
                        <Section>
                            <h3>💰 Payment Details</h3>
                            <DetailRow>
                                <span className="label">Total Amount</span>
                                <span className="value" style={{ color: colors.primary.main, fontWeight: 800 }}>
                                    ₹{booking.total_amount || 0}
                                </span>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">Advance Paid</span>
                                <span className="value" style={{ color: '#22C55E' }}>
                                    ₹{booking.advance_amount || 0}
                                </span>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">Balance</span>
                                <span className="value" style={{ color: colors.status.error }}>
                                    ₹{booking.balance_amount || 0}
                                </span>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">Payment Mode</span>
                                <span className="value">{booking.payment_mode || 'Cash'}</span>
                            </DetailRow>
                            <DetailRow>
                                <span className="label">Status</span>
                                <span className="value">
                                    <StatusBadge bg={statusInfo.bg} color={statusInfo.color}>
                                        {statusInfo.label}
                                    </StatusBadge>
                                </span>
                            </DetailRow>
                        </Section>
                    </DetailsGrid>

                    {/* Actions */}
                    <Actions>
                        {isActive && (
                            <ActionButton
                                className="danger"
                                onClick={handleCancelBooking}
                                disabled={cancelling}
                            >
                                {cancelling ? 'Cancelling...' : '❌ Cancel Booking'}
                            </ActionButton>
                        )}
                        <ActionButton className="outline" onClick={handlePrint}>
                            🖨️ Print Receipt
                        </ActionButton>
                        <Link to="/tours" style={{ textDecoration: 'none' }}>
                            <ActionButton>📋 Book Another Tour</ActionButton>
                        </Link>
                    </Actions>
                </Card>
            </Container>

            {/* ===== FLOATING WHATSAPP BUTTON ===== */}
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
