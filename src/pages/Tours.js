import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: ${colors.neutral[900]};
    margin-bottom: 8px;
  }

  p {
    color: ${colors.neutral[600]};
    font-size: 1.1rem;
  }

  .gradient-text {
    background: ${colors.primary.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const TourGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const TourCard = styled.div`
  background: ${colors.background.card};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${shadows.md};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${shadows.xl};
  }
`;

const CardImage = styled.div`
  height: 200px;
  background: ${colors.primary.gradient};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    font-size: 64px;
    opacity: 0.3;
    color: #fff;
  }

  .badge {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(255, 255, 255, 0.95);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    color: ${colors.primary.main};
  }
`;

const CardContent = styled.div`
  padding: 24px;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${colors.neutral[900]};
  margin-bottom: 8px;
`;

const CardMeta = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 14px;
  color: ${colors.neutral[600]};

  span {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const CardDescription = styled.p`
  color: ${colors.neutral[600]};
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid ${colors.neutral[200]};
`;

const Price = styled.div`
  .amount {
    font-size: 1.5rem;
    font-weight: 800;
    color: ${colors.primary.main};
  }
  .per {
    font-size: 12px;
    color: ${colors.neutral[500]};
  }
`;

const BookNowBtn = styled(Link)`
  padding: 10px 24px;
  background: ${colors.primary.gradient};
  color: #fff;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
  }
`;

// ============================================
// COMPONENT
// ============================================

function Tours() {
    const [yatras, setYatras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadYatras();
    }, []);

    const loadYatras = async () => {
        try {
            setLoading(true);
            const data = await getYatras();
            setYatras(data);
            setError(null);
        } catch (err) {
            console.error('Error loading yatras:', err);
            setError('Failed to load yatras. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                    <p className="text-gray-500 mt-4">Loading Tours...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500">{error}</p>
                    <button 
                        onClick={loadYatras}
                        className="mt-4 bg-indigo-500 px-6 py-2 rounded-lg text-white"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <PageContainer>
            <div className="container">
                <PageHeader>
                    <h1>✨ Our <span className="gradient-text">Tour Packages</span></h1>
                    <p>Discover spiritual journeys and adventure tours across India</p>
                </PageHeader>

                <TourGrid>
                    {yatras.map((yatra) => (
                        <TourCard key={yatra.id}>
                            <CardImage>
                                <span className="icon">🏔️</span>
                                <span className="badge">
                                    {yatra.trip_count || 0} Trips Available
                                </span>
                            </CardImage>
                            <CardContent>
                                <CardTitle>{yatra.yatra_name}</CardTitle>
                                <CardMeta>
                                    <span>📅 {new Date(yatra.start_date).toLocaleDateString()}</span>
                                    <span>📆 {new Date(yatra.end_date).toLocaleDateString()}</span>
                                </CardMeta>
                                <CardDescription>
                                    {yatra.description || 'Explore this amazing journey with GetMeYatra.'}
                                </CardDescription>
                                <CardFooter>
                                    <Price>
                                        <span className="amount">₹{yatra.rate_per_seat}</span>
                                        <span className="per"> / seat</span>
                                    </Price>
                                    <BookNowBtn to={`/booking?yatra=${yatra.id}`}>
                                        Book Now →
                                    </BookNowBtn>
                                </CardFooter>
                            </CardContent>
                        </TourCard>
                    ))}
                </TourGrid>

                {yatras.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No tours available at the moment.</p>
                    </div>
                )}
            </div>
        </PageContainer>
    );
}

export default Tours;
