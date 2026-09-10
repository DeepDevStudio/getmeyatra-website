import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors, shadows, breakpoints } from '../styles/theme';
import { getCustomerBookings } from '../services/api';

// ============================================
// TRANSLATION DICTIONARY
// ============================================

const translations = {
    'Dashboard': 'डैशबोर्ड',
    'Welcome back': 'वापसी पर स्वागत है',
    'Total Bookings': 'कुल बुकिंग',
    'Completed': 'समाप्त',
    'Upcoming': 'आगामी',
    'Rating': 'रेटिंग',
    'My Bookings': 'मेरी बुकिंग',
    'No bookings found': 'कोई बुकिंग नहीं मिली',
    'Start your first journey with GetMeYatra!': 'GetMeYatra के साथ अपनी पहली यात्रा शुरू करें!',
    'View Details': 'विवरण देखें',
    'Cancel Booking': 'बुकिंग रद्द करें',
    'Print': 'प्रिंट करें',
    'Tour': 'यात्रा',
    'Date': 'तिथि',
    'Seats': 'सीटें',
    'Amount': 'राशि',
    'Status': 'स्थिति',
    'Confirmed': 'पुष्टि की गई',
    'Pending': 'लंबित',
    'Cancelled': 'रद्द कर दिया गया',
    'Profile': 'प्रोफ़ाइल',
    'Phone': 'फोन',
    'Email': 'ईमेल',
    'Member since': 'सदस्यता तिथि',
    'Loading your bookings...': 'आपकी बुकिंग लोड हो रही है...',
    'Active / Upcoming': 'सक्रिय / आगामी',
    'Logout': 'लॉगआउट',
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

// ===== WELCOME SECTION =====
const WelcomeSection = styled.div`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 28px 32px;
  margin-bottom: 24px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  border: 1px solid rgba(255,255,255,0.3);

  .welcome-content {
    display: flex;
    align-items: center;
    gap: 16px;
    
    .avatar {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: ${colors.primary.gradient};
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-weight: 700;
    }
    
    .welcome-text {
      h1 {
        font-size: 1.5rem;
        font-weight: 800;
        color: ${colors.neutral[900]};
        margin-bottom: 2px;

        span {
          background: ${colors.primary.gradient};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }

      p {
        color: ${colors.neutral[500]};
        font-size: 14px;
      }
    }
  }

  .logout-btn {
    padding: 10px 24px;
    background: ${colors.status.error};
    color: #fff;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
    }
  }

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
    
    .welcome-content {
      flex-direction: column;
      text-align: center;
    }
  }
`;

// ===== STATS GRID =====
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  border: 1px solid rgba(255,255,255,0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.color || colors.primary.gradient};
    opacity: 0.6;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.08);
  }

  .stat-number {
    font-size: 2rem;
    font-weight: 800;
    color: ${props => props.color || colors.primary.main};
    display: block;
    line-height: 1.2;
  }

  .stat-icon {
    font-size: 20px;
    margin-right: 4px;
  }

  .stat-label {
    font-size: 13px;
    color: ${colors.neutral[500]};
    margin-top: 2px;
    font-weight: 500;
  }
`;

// ===== BOOKINGS SECTION =====
const BookingsSection = styled.div`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 28px 32px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.06);
  border: 1px solid rgba(255,255,255,0.3);

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;

    h2 {
      font-size: 1.3rem;
      font-weight: 700;
      color: ${colors.neutral[900]};
    }

    .booking-count {
      padding: 4px 16px;
      background: ${colors.neutral[100]};
      border-radius: 50px;
      font-size: 13px;
      color: ${colors.neutral[600]};
    }
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid ${colors.neutral[100]};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  thead {
    background: ${colors.neutral[50]};

    th {
      padding: 12px 16px;
      text-align: left;
      font-weight: 600;
      color: ${colors.neutral[600]};
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid ${colors.neutral[200]};
      white-space: nowrap;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid ${colors.neutral[100]};
      transition: all 0.3s ease;

      &:hover {
        background: ${colors.neutral[50]};
      }

      &:last-child {
        border-bottom: none;
      }

      td {
        padding: 14px 16px;
        color: ${colors.neutral[700]};
        vertical-align: middle;
      }
    }
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 14px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => props.bg || colors.neutral[200]};
  color: ${props => props.color || colors.neutral[700]};
  white-space: nowrap;
`;

const ViewLink = styled(Link)`
  color: ${colors.primary.main};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    text-decoration: underline;
    gap: 8px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 50px 20px;

  .icon {
    font-size: 64px;
    margin-bottom: 16px;
    display: block;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colors.neutral[700]};
    margin-bottom: 8px;
  }

  p {
    color: ${colors.neutral[500]};
    margin-bottom: 16px;
  }
`;

const BrowseButton = styled(Link)`
  display: inline-block;
  padding: 12px 36px;
  background: ${colors.primary.gradient};
  color: #fff;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
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

// ============================================
// COMPONENT
// ============================================

function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [customer, setCustomer] = useState(null);
    const [language, setLanguage] = useState('en');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [stats, setStats] = useState({
        total: 0,
        upcoming: 0,
        ongoing: 0,
        completed: 0,
        cancelled: 0
    });

    const t = (text) => translateText(text, language);

    useEffect(() => {
        // Scroll Progress
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
        // Check if user is logged in
        const customerData = JSON.parse(localStorage.getItem('customer') || '{}');
        if (!customerData.phone) {
            navigate('/login');
            return;
        }
        setCustomer(customerData);
        loadBookings(customerData.phone);
    }, []);

    const loadBookings = async (phone) => {
        try {
            setLoading(true);
            const data = await getCustomerBookings(phone);
            
            const bookingsArray = Array.isArray(data) ? data : [];
            setBookings(bookingsArray);
            
            const total = bookingsArray.length;
            const upcoming = bookingsArray.filter(b => 
                b.status === 'pending' || b.status === 'confirmed' || b.status === 'Confirmed'
            ).length;
            const ongoing = bookingsArray.filter(b => 
                b.status === 'active' || b.status === 'ongoing'
            ).length;
            const completed = bookingsArray.filter(b => 
                b.status === 'completed' || b.status === 'Completed'
            ).length;
            const cancelled = bookingsArray.filter(b => 
                b.status === 'cancelled' || b.status === 'Cancelled'
            ).length;
            
            setStats({ total, upcoming, ongoing, completed, cancelled });
        } catch (error) {
            console.error('Error loading bookings:', error);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('customer');
        navigate('/');
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

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
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
                <ScrollProgress progress={0} />
                <Container>
                    <LoadingSpinner>
                        <div className="spinner"></div>
                        <p>{t('Loading your bookings...')}</p>
                    </LoadingSpinner>
                </Container>
            </PageContainer>
        );
    }

    const activeCount = stats.upcoming + stats.ongoing;

    return (
        <PageContainer>
            <ScrollProgress progress={scrollProgress} />
            <Container>
                <LanguageToggle lang={language} onClick={toggleLanguage}>
                    {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
                </LanguageToggle>

                {/* ===== WELCOME SECTION ===== */}
                <WelcomeSection>
                    <div className="welcome-content">
                        <div className="avatar">{getInitials(customer?.customer_name)}</div>
                        <div className="welcome-text">
                            <h1>{t('Welcome back')}, <span>{customer?.customer_name || 'Guest'}</span>! 👋</h1>
                            <p>📱 {customer?.phone} • {t('Member since')}: {formatDate(customer?.created_at)}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                        🚪 {t('Logout')}
                    </button>
                </WelcomeSection>

                {/* ===== STATS CARDS ===== */}
                <StatsGrid>
                    <StatCard color="#4F46E5">
                        <span className="stat-number">
                            <span className="stat-icon">📋</span> {stats.total}
                        </span>
                        <span className="stat-label">{t('Total Bookings')}</span>
                    </StatCard>
                    <StatCard color="#22C55E">
                        <span className="stat-number">
                            <span className="stat-icon">🚀</span> {activeCount}
                        </span>
                        <span className="stat-label">{t('Active / Upcoming')}</span>
                    </StatCard>
                    <StatCard color="#3B82F6">
                        <span className="stat-number">
                            <span className="stat-icon">✅</span> {stats.completed}
                        </span>
                        <span className="stat-label">{t('Completed')}</span>
                    </StatCard>
                    <StatCard color="#EF4444">
                        <span className="stat-number">
                            <span className="stat-icon">❌</span> {stats.cancelled}
                        </span>
                        <span className="stat-label">{t('Cancelled')}</span>
                    </StatCard>
                </StatsGrid>

                {/* ===== BOOKINGS TABLE ===== */}
                <BookingsSection>
                    <div className="section-header">
                        <h2>📋 {t('My Bookings')}</h2>
                        <span className="booking-count">{bookings.length} bookings</span>
                    </div>
                    
                    {bookings.length === 0 ? (
                        <EmptyState>
                            <span className="icon">📭</span>
                            <h3>{t('No bookings found')}</h3>
                            <p>{t('Start your first journey with GetMeYatra!')}</p>
                            <BrowseButton to="/tours">Browse Tours →</BrowseButton>
                        </EmptyState>
                    ) : (
                        <TableWrapper>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>{t('Tour')}</th>
                                        <th>{t('Date')}</th>
                                        <th>{t('Seats')}</th>
                                        <th>{t('Amount')}</th>
                                        <th>{t('Status')}</th>
                                        <th>{t('Action')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking, index) => {
                                        const statusInfo = getStatusInfo(booking.status);
                                        return (
                                            <tr key={booking.id || index}>
                                                <td>{index + 1}</td>
                                                <td style={{ fontWeight: 500 }}>{booking.yatra_name || 'N/A'}</td>
                                                <td>{formatDate(booking.start_date) || 'N/A'}</td>
                                                <td>{booking.total_seats || 0}</td>
                                                <td style={{ fontWeight: 600, color: colors.primary.main }}>
                                                    ₹{booking.total_amount || 0}
                                                </td>
                                                <td>
                                                    <StatusBadge bg={statusInfo.bg} color={statusInfo.color}>
                                                        {statusInfo.label}
                                                    </StatusBadge>
                                                </td>
                                                <td>
                                                    <ViewLink to={`/booking-details/${booking.id}`}>
                                                        {t('View Details')} →
                                                    </ViewLink>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </TableWrapper>
                    )}
                </BookingsSection>
            </Container>
        </PageContainer>
    );
}

export default Dashboard;
