import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors, shadows, breakpoints } from '../styles/theme';
import { getCustomerBookings } from '../services/api';

// ============================================
// STYLED COMPONENTS
// ============================================

const PageContainer = styled.div`
  padding-top: 160px;
  min-height: 100vh;
  background: ${colors.background.main};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

// ===== WELCOME SECTION =====
const WelcomeSection = styled.div`
  background: ${colors.background.card};
  border-radius: 16px;
  padding: 24px 32px;
  margin-bottom: 24px;
  box-shadow: ${shadows.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  border: 1px solid ${colors.neutral[100]};

  h1 {
    font-size: 1.5rem;
    font-weight: 800;
    color: ${colors.neutral[900]};
    margin-bottom: 4px;

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

  .logout-btn {
    padding: 10px 24px;
    background: ${colors.status.error};
    color: #fff;
    border: none;
    border-radius: 10px;
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
  background: ${colors.background.card};
  border-radius: 12px;
  padding: 20px;
  box-shadow: ${shadows.sm};
  border: 1px solid ${colors.neutral[100]};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.md};
  }

  .stat-number {
    font-size: 2rem;
    font-weight: 800;
    color: ${props => props.color || colors.primary.main};
    display: block;
  }

  .stat-label {
    font-size: 14px;
    color: ${colors.neutral[500]};
    margin-top: 4px;
  }
`;

// ===== BOOKINGS SECTION =====
const BookingsSection = styled.div`
  background: ${colors.background.card};
  border-radius: 16px;
  padding: 24px 32px;
  box-shadow: ${shadows.md};
  border: 1px solid ${colors.neutral[100]};

  h2 {
    font-size: 1.3rem;
    font-weight: 700;
    color: ${colors.neutral[900]};
    margin-bottom: 16px;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  thead {
    background: ${colors.neutral[50]};
    border-radius: 8px;

    th {
      padding: 12px 16px;
      text-align: left;
      font-weight: 600;
      color: ${colors.neutral[600]};
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid ${colors.neutral[200]};
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid ${colors.neutral[100]};
      transition: all 0.3s ease;

      &:hover {
        background: ${colors.neutral[50]};
      }

      td {
        padding: 14px 16px;
        color: ${colors.neutral[700]};
      }
    }
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => props.bg || colors.neutral[200]};
  color: ${props => props.color || colors.neutral[700]};
`;

const ViewLink = styled(Link)`
  color: ${colors.primary.main};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;

  .icon {
    font-size: 64px;
    margin-bottom: 16px;
    opacity: 0.6;
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
  padding: 12px 32px;
  background: ${colors.primary.gradient};
  color: #fff;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
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
    const [stats, setStats] = useState({
        total: 0,
        upcoming: 0,
        ongoing: 0,
        completed: 0,
        cancelled: 0
    });

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
            console.log('📦 Bookings data:', data);
            
            const bookingsArray = Array.isArray(data) ? data : [];
            setBookings(bookingsArray);
            
            // Calculate stats
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
                        <p>Loading your bookings...</p>
                    </LoadingSpinner>
                </Container>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <Container>
                {/* Welcome Section */}
                <WelcomeSection>
                    <div>
                        <h1>Welcome back, <span>{customer?.customer_name || 'Guest'}</span>! 👋</h1>
                        <p>Manage your bookings and trips</p>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                        🚪 Logout
                    </button>
                </WelcomeSection>

                {/* Stats Cards */}
                <StatsGrid>
                    <StatCard color={colors.primary.main}>
                        <span className="stat-number">{stats.total}</span>
                        <span className="stat-label">📋 Total Bookings</span>
                    </StatCard>
                    <StatCard color="#22C55E">
                        <span className="stat-number">{stats.upcoming + stats.ongoing}</span>
                        <span className="stat-label">🚀 Active / Upcoming</span>
                    </StatCard>
                    <StatCard color="#3B82F6">
                        <span className="stat-number">{stats.completed}</span>
                        <span className="stat-label">✅ Completed</span>
                    </StatCard>
                    <StatCard color="#EF4444">
                        <span className="stat-number">{stats.cancelled}</span>
                        <span className="stat-label">❌ Cancelled</span>
                    </StatCard>
                </StatsGrid>

                {/* Bookings Table */}
                <BookingsSection>
                    <h2>📋 Your Bookings</h2>
                    
                    {bookings.length === 0 ? (
                        <EmptyState>
                            <div className="icon">📭</div>
                            <h3>No bookings yet</h3>
                            <p>Start exploring tours and book your first trip!</p>
                            <BrowseButton to="/tours">Browse Tours →</BrowseButton>
                        </EmptyState>
                    ) : (
                        <TableWrapper>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tour</th>
                                        <th>Date</th>
                                        <th>Seats</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking, index) => {
                                        const statusInfo = getStatusInfo(booking.status);
                                        return (
                                            <tr key={booking.id || index}>
                                                <td>{index + 1}</td>
                                                <td>{booking.yatra_name || 'N/A'}</td>
                                                <td>{formatDate(booking.start_date) || 'N/A'}</td>
                                                <td>{booking.total_seats || 0}</td>
                                                <td>₹{booking.total_amount || 0}</td>
                                                <td>
                                                    <StatusBadge bg={statusInfo.bg} color={statusInfo.color}>
                                                        {statusInfo.label}
                                                    </StatusBadge>
                                                </td>
                                                <td>
                                                    <ViewLink to={`/booking-details/${booking.id}`}>
                                                        View Details →
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
