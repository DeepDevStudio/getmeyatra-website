import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getYatras } from '../services/api';
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

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  color: ${colors.primary.main};
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TourHeader = styled.div`
  background: ${colors.background.card};
  border-radius: 16px;
  padding: 24px 32px;
  margin-bottom: 30px;
  box-shadow: ${shadows.sm};
  border: 1px solid ${colors.neutral[100]};
`;

const TourImage = styled.div`
  width: 100%;
  height: 200px;
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

const TourTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: ${colors.neutral[900]};
  margin-bottom: 4px;
`;

const TourMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: ${colors.neutral[500]};
  font-size: 14px;
  margin-top: 8px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  i {
    color: ${colors.primary.main};
  }
`;

const TourDescription = styled.p`
  color: ${colors.neutral[600]};
  font-size: 15px;
  line-height: 1.8;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${colors.neutral[100]};
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${colors.neutral[800]};
  margin-bottom: 16px;

  span {
    color: ${colors.primary.main};
  }
`;

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const DateCard = styled(Link)`
  background: ${colors.background.card};
  padding: 20px 24px;
  border-radius: 12px;
  box-shadow: ${shadows.sm};
  text-decoration: none;
  color: ${colors.neutral[900]};
  transition: all 0.3s ease;
  border: 1px solid ${colors.neutral[200]};
  position: relative;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${shadows.lg};
    border-color: ${colors.primary.main};
  }

  .date {
    font-size: 1.2rem;
    font-weight: 700;
    color: ${colors.primary.main};
  }

  .details {
    color: ${colors.neutral[600]};
    font-size: 13px;
    margin-top: 6px;
  }

  .price {
    font-weight: 700;
    color: ${colors.primary.main};
    font-size: 1.1rem;
    margin-top: 8px;
  }

  .status-badge {
    display: inline-block;
    margin-top: 6px;
    padding: 2px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;

    &.upcoming {
      background: #D1FAE5;
      color: #065F46;
    }
    &.ongoing {
      background: #FEF3C7;
      color: #92400E;
    }
    &.completed {
      background: #FEE2E2;
      color: #991B1B;
    }
  }
`;

const NoData = styled.p`
  color: ${colors.neutral[500]};
  font-style: italic;
  text-align: center;
  padding: 40px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;

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
  text-align: center;
  padding: 40px;

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
// HELPER FUNCTIONS
// ============================================

const getTourStatus = (startDate, endDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    
    if (end < today) return { label: 'COMPLETED', type: 'completed' };
    if (start <= today && end >= today) return { label: 'ONGOING', type: 'ongoing' };
    return { label: 'UPCOMING', type: 'upcoming' };
};

// ============================================
// COMPONENT
// ============================================

function ToursDetail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [groupName, setGroupName] = useState('');
    const [groupYatras, setGroupYatras] = useState([]);
    const [firstYatra, setFirstYatra] = useState(null);

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await getYatras();
            
            const selectedYatra = data.find(y => y.id === parseInt(id));
            if (!selectedYatra) {
                setError('Tour not found');
                setLoading(false);
                return;
            }
            
            // Get the base name without date suffix
            let baseName = selectedYatra.yatra_name;
            baseName = baseName.replace(/\s*-\s*\d{1,2}\s*[A-Za-z]{3}\s*\d{4}/g, '');
            baseName = baseName.replace(/\s*-\s*[A-Za-z]+\s*\d{1,2}\s*[A-Za-z]{3}\s*\d{4}/g, '');
            baseName = baseName.trim();
            
            // Find all yatras with same base name
            const filtered = data.filter(y => {
                let yName = y.yatra_name;
                yName = yName.replace(/\s*-\s*\d{1,2}\s*[A-Za-z]{3}\s*\d{4}/g, '');
                yName = yName.replace(/\s*-\s*[A-Za-z]+\s*\d{1,2}\s*[A-Za-z]{3}\s*\d{4}/g, '');
                yName = yName.trim();
                return yName === baseName;
            });
            
            // Sort by date
            filtered.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
            
            setGroupName(baseName);
            setGroupYatras(filtered);
            setFirstYatra(selectedYatra);
            setError(null);
        } catch (err) {
            console.error('Error loading data:', err);
            setError('Failed to load tours');
        } finally {
            setLoading(false);
        }
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

    if (loading) {
        return (
            <PageContainer>
                <Container>
                    <LoadingSpinner>
                        <div className="spinner"></div>
                        <p>Loading tour details...</p>
                    </LoadingSpinner>
                </Container>
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer>
                <Container>
                    <ErrorBox>
                        <h2>❌ {error}</h2>
                        <Link to="/tours" style={{ color: colors.primary.main, fontWeight: 600, textDecoration: 'none' }}>
                            ← Back to Tours
                        </Link>
                    </ErrorBox>
                </Container>
            </PageContainer>
        );
    }

    const priceRange = groupYatras.length > 0 ? {
        min: Math.min(...groupYatras.map(y => y.rate_per_seat)),
        max: Math.max(...groupYatras.map(y => y.rate_per_seat))
    } : { min: 0, max: 0 };

    return (
        <PageContainer>
            <Container>
                <BackButton to="/tours">← Back to Tours</BackButton>

                {/* Tour Header */}
                <TourHeader>
                    {firstYatra?.image_url && (
                        <TourImage>
                            <img 
                                src={'http://getmeyatra.com' + firstYatra.image_url} 
                                alt={groupName}
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        </TourImage>
                    )}
                    
                    <TourTitle>{groupName}</TourTitle>
                    
                    <TourMeta>
                        <span><i className="fas fa-calendar-alt"></i> {groupYatras.length} trips available</span>
                        <span><i className="fas fa-tag"></i> ₹{priceRange.min} - ₹{priceRange.max} / seat</span>
                        <span><i className="fas fa-map-marker-alt"></i> Multiple destinations</span>
                    </TourMeta>

                    {firstYatra?.description && (
                        <TourDescription>
                            {firstYatra.description.split('\n').slice(0, 3).join('\n')}
                            {firstYatra.description.split('\n').length > 3 && '...'}
                        </TourDescription>
                    )}
                </TourHeader>

                {/* Date Grid */}
                <SectionTitle>📅 Select a <span>Date</span></SectionTitle>
                <p style={{ color: colors.neutral[500], marginBottom: '20px' }}>
                    Choose your preferred date and book your journey
                </p>

                {groupYatras.length === 0 ? (
                    <NoData>No trips available for this tour.</NoData>
                ) : (
                    <DateGrid>
                        {groupYatras.map((yatra) => {
                            const status = getTourStatus(yatra.start_date, yatra.end_date);
                            return (
                                <DateCard key={yatra.id} to={`/booking?yatra=${yatra.id}`}>
                                    <div className="date">📅 {formatDate(yatra.start_date)}</div>
                                    <div className="details">
                                        {yatra.start_time && `🕐 ${yatra.start_time.slice(0,5)}`}
                                        {yatra.return_time && ` | ↩️ ${yatra.return_time}`}
                                    </div>
                                    <div className="price">₹{yatra.rate_per_seat} / person</div>
                                    <span className={`status-badge ${status.type}`}>{status.label}</span>
                                </DateCard>
                            );
                        })}
                    </DateGrid>
                )}
            </Container>

            {/* ===== FLOATING WHATSAPP BUTTON ===== */}
            <FloatingWhatsApp 
                href={`https://wa.me/918010320000?text=Hi%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(groupName)}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                💬
            </FloatingWhatsApp>
        </PageContainer>
    );
}

export default ToursDetail;
