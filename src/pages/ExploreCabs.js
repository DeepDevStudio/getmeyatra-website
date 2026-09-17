import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../styles/theme';
import { useLocation, useNavigate } from 'react-router-dom';

const Page = styled.div`
  min-height: 100vh;
  background: ${colors.background.main};
  padding: 105px 24px 60px;

  @media (max-width: ${breakpoints.sm}) {
    padding: 90px 14px 40px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 0.72fr) minmax(0, 1.28fr);
  gap: 28px;
  align-items: start;

  @media (max-width: ${breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const JourneyPanel = styled.aside`
  position: sticky;
  top: 95px;
  padding: 34px;
  border-radius: 28px;
  background: linear-gradient(145deg, #111827 0%, #312e81 100%);
  color: #fff;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(17, 24, 39, 0.18);

  &::before {
    content: '';
    position: absolute;
    width: 220px;
    height: 220px;
    top: -100px;
    right: -80px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
  }

  @media (max-width: ${breakpoints.lg}) {
    position: relative;
    top: auto;
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: 25px 20px;
    border-radius: 22px;
  }
`;

const Eyebrow = styled.div`
  position: relative;
  color: #c4b5fd;
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 10px;
`;

const JourneyTitle = styled.h1`
  position: relative;
  margin: 0;
  max-width: 340px;
  color: #fff;
  font-size: clamp(30px, 3.2vw, 44px);
  line-height: 1.05;
  font-weight: 900;
  letter-spacing: -1.5px;
`;

const JourneySubtitle = styled.p`
  position: relative;
  margin: 14px 0 28px;
  max-width: 380px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 14px;
  line-height: 1.6;
`;

const JourneyCard = styled.div`
  position: relative;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
`;

const JourneyLabel = styled.div`
  margin-bottom: 14px;
  color: #c4b5fd;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Route = styled.div`
  display: flex;
  align-items: stretch;
  gap: 14px;
`;

const RouteLine = styled.div`
  width: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
`;

const RouteDot = styled.span`
  width: 9px;
  height: 9px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #fff;
`;

const RouteConnector = styled.span`
  width: 1px;
  flex: 1;
  min-height: 34px;
  margin: 5px 0;
  background: rgba(255, 255, 255, 0.3);
`;

const RouteContent = styled.div`
  flex: 1;
`;

const RouteLocation = styled.strong`
  display: block;
  color: #fff;
  font-size: 17px;
  font-weight: 800;
`;

const RouteSmall = styled.span`
  display: block;
  margin-top: 4px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 11px;
`;

const TripMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
`;

const TripBadge = styled.span`
  padding: 7px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.82);
  font-size: 10px;
  font-weight: 800;
`;

const TrustSection = styled.div`
  position: relative;
  margin-top: 28px;
`;

const TrustTitle = styled.h3`
  margin: 0 0 13px;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
`;

const TrustList = styled.div`
  display: grid;
  gap: 10px;
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;

  span {
    color: #c4b5fd;
    font-weight: 900;
  }
`;

const ResultsPanel = styled.main`
  min-width: 0;
`;

const ResultsHeader = styled.div`
  margin-bottom: 20px;

  h2 {
    margin: 0;
    color: ${colors.neutral[900]};
    font-size: clamp(26px, 3vw, 34px);
    font-weight: 900;
    letter-spacing: -0.8px;
  }

  p {
    margin: 7px 0 0;
    color: ${colors.neutral[500]};
    font-size: 14px;
  }
`;

const Results = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const CabCard = styled.div`
  min-width: 0;
  padding: 20px;
  background: #fff;
  border: 1px solid ${colors.neutral[200]};
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #c4b5fd;
    box-shadow: 0 16px 35px rgba(79, 70, 229, 0.10);
  }
`;

const CabTop = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 17px;
`;

const CabIcon = styled.div`
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: ${colors.neutral[100]};
  font-size: 29px;
`;

const CabName = styled.div`
  flex: 1;
  min-width: 0;

  h3 {
    margin: 2px 0 5px;
    color: ${colors.neutral[900]};
    font-size: 17px;
    font-weight: 900;
  }

  p {
    margin: 0;
    color: ${colors.neutral[500]};
    font-size: 11px;
    line-height: 1.5;
  }
`;

const Price = styled.div`
  flex-shrink: 0;
  text-align: right;

  span {
    display: block;
    margin-bottom: 3px;
    color: ${colors.neutral[500]};
    font-size: 9px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  strong {
    color: ${colors.primary.main};
    font-size: 20px;
    font-weight: 900;
  }
`;

const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 16px;
`;

const Detail = styled.span`
  padding: 6px 9px;
  border-radius: 7px;
  background: ${colors.neutral[100]};
  color: ${colors.neutral[600]};
  font-size: 10px;
  font-weight: 800;
`;

const SelectButton = styled.button`
  width: 100%;
  min-height: 46px;
  border: 0;
  border-radius: 11px;
  background: ${colors.primary.gradient};
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(79, 70, 229, 0.22);
  }
`;

const StateCard = styled.div`
  padding: 50px 25px;
  text-align: center;
  background: #fff;
  border-radius: 20px;
  border: 1px solid ${colors.neutral[200]};

  h3 {
    margin: 0 0 8px;
    color: ${colors.neutral[800]};
    font-size: 20px;
  }

  p {
    margin: 0;
    color: ${colors.neutral[500]};
    font-size: 14px;
  }
`;
function ExploreCabs() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchData = location.state || {};

  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCabs = async () => {
      try {
        const fleet = [
          {
            id: 'sedan',
            cab_type: 'Sedan',
            price: 5000,
            fixed_price: 5000,
            km: null,
            per_day_limit: null,
            extra_per_km: null,
          },
          {
            id: 'innova-crysta',
            cab_type: 'Innova Crysta',
            price: 5000,
            fixed_price: 5000,
            km: null,
            per_day_limit: null,
            extra_per_km: null,
          },
          {
            id: 'ertiga',
            cab_type: 'Ertiga',
            price: 5000,
            fixed_price: 5000,
            km: null,
            per_day_limit: null,
            extra_per_km: null,
          },
          {
            id: 'tempo-traveller',
            cab_type: 'Tempo Traveller',
            price: 5000,
            fixed_price: 5000,
            km: null,
            per_day_limit: null,
            extra_per_km: null,
          },
          {
            id: 'urbania',
            cab_type: 'Urbania',
            price: 5000,
            fixed_price: 5000,
            km: null,
            per_day_limit: null,
            extra_per_km: null,
          },
          {
            id: 'bus',
            cab_type: 'Bus',
            price: 5000,
            fixed_price: 5000,
            km: null,
            per_day_limit: null,
            extra_per_km: null,
          },
        ];

        setCabs(fleet);
      } catch (error) {
        console.error('Failed to load cab fleet:', error);
        setCabs([]);
      } finally {
        setLoading(false);
      }
    };

    loadCabs();
  }, [searchData.mode]);

  const handleSelectCab = (cab) => {
    navigate('/cab-booking', {
      state: {
        ...searchData,
        cab,
      },
    });
  };

  return (
    <Page>
      <Container>
        <Layout>
          <JourneyPanel>
            <Eyebrow>GetMeYatra Cab Services</Eyebrow>

            <JourneyTitle>Find Your Perfect Ride</JourneyTitle>

            <JourneySubtitle>
              Comfortable travel for every journey, from everyday trips to group travel.
            </JourneySubtitle>

            <JourneyCard>
              <JourneyLabel>Your Journey</JourneyLabel>

              <Route>
                <RouteLine>
                  <RouteDot />
                  <RouteConnector />
                  <RouteDot />
                </RouteLine>

                <RouteContent>
                  <RouteLocation>
                    {searchData.source || 'Source'}
                  </RouteLocation>
                  <RouteSmall>Pickup location</RouteSmall>

                  <div style={{ height: 30 }} />

                  <RouteLocation>
                    {searchData.destination || 'Destination'}
                  </RouteLocation>
                  <RouteSmall>Travel destination</RouteSmall>
                </RouteContent>
              </Route>

              <TripMeta>
                <TripBadge>
                  {searchData.pickupDate || 'Date not selected'}
                </TripBadge>

                <TripBadge>
                  {searchData.pickupTime || 'Time not selected'}
                </TripBadge>

                <TripBadge>
                  {searchData.mode === 'round-trip' ? 'ROUND TRIP' : 'ONE WAY'}
                </TripBadge>

                {searchData.mode === 'round-trip' && searchData.returnDate && (
                  <TripBadge>
                    Return: {searchData.returnDate}
                  </TripBadge>
                )}
              </TripMeta>
            </JourneyCard>

            <TrustSection>
              <TrustTitle>Why travel with GetMeYatra?</TrustTitle>

              <TrustList>
                <TrustItem>
                  <span>✓</span>
                  Comfortable & well-maintained vehicles
                </TrustItem>

                <TrustItem>
                  <span>✓</span>
                  Professional drivers
                </TrustItem>

                <TrustItem>
                  <span>✓</span>
                  Simple booking process
                </TrustItem>

                <TrustItem>
                  <span>✓</span>
                  Transparent pricing
                </TrustItem>
              </TrustList>
            </TrustSection>
          </JourneyPanel>

          <ResultsPanel>
            <ResultsHeader>
              <h2>Choose Your Ride</h2>
              <p>Select a vehicle that works best for your journey.</p>
            </ResultsHeader>

            {loading ? (
              <StateCard>
                <h3>Finding available cabs...</h3>
                <p>Please wait while we load the available vehicles.</p>
              </StateCard>
            ) : cabs.length === 0 ? (
              <StateCard>
                <h3>No cabs available</h3>
                <p>No vehicles are currently available.</p>
              </StateCard>
            ) : (
              <Results>
                {cabs.map((cab) => (
                  <CabCard key={cab.id}>
                    <CabTop>
                      <CabIcon>
                        {cab.cab_type === 'Bus'
                          ? '🚌'
                          : cab.cab_type === 'Tempo Traveller' || cab.cab_type === 'Urbania'
                            ? '🚐'
                            : '🚙'}
                      </CabIcon>

                      <CabName>
                        <h3>{cab.cab_type}</h3>
                        <p>
                          {searchData.source || 'Source'}
                          {' → '}
                          {searchData.destination || 'Destination'}
                        </p>
                      </CabName>

                      <Price>
                        <span>Trip Price</span>
                        <strong>₹5,000</strong>
                      </Price>
                    </CabTop>

                    <Details>
                      <Detail>
                        {searchData.mode === 'round-trip' ? 'Round Trip' : 'One Way'}
                      </Detail>

                      <Detail>Price on Request</Detail>
                    </Details>

                    <SelectButton onClick={() => handleSelectCab(cab)}>
                      SELECT CAB →
                    </SelectButton>
                  </CabCard>
                ))}
              </Results>
            )}
          </ResultsPanel>
        </Layout>
      </Container>
    </Page>
  );
}

export default ExploreCabs;
