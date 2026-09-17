import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../styles/theme';
import { useLocation, useNavigate } from 'react-router-dom';

const Page = styled.div`
  min-height: 100vh;
  background: ${colors.background.main};
  padding: 110px 24px 70px;

  @media (max-width: ${breakpoints.sm}) {
    padding: 95px 16px 50px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 28px;
`;

const Eyebrow = styled.div`
  color: ${colors.primary.main};
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  margin: 0;
  color: ${colors.neutral[900]};
  font-size: clamp(30px, 4vw, 46px);
  font-weight: 900;
  letter-spacing: -1px;
`;

const Subtitle = styled.p`
  margin: 10px 0 0;
  color: ${colors.neutral[500]};
  font-size: 15px;
`;

const SearchSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 18px;
  margin-bottom: 28px;
  background: #fff;
  border: 1px solid ${colors.neutral[200]};
  border-radius: 18px;
  box-shadow: ${'0 8px 24px rgba(0,0,0,0.06)'};

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SummaryItem = styled.div`
  padding: 12px;
  border-radius: 12px;
  background: ${colors.neutral[50]};

  span {
    display: block;
    color: ${colors.neutral[500]};
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 5px;
  }

  strong {
    color: ${colors.neutral[800]};
    font-size: 14px;
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 16px;

  h2 {
    margin: 0;
    color: ${colors.neutral[900]};
    font-size: 22px;
    font-weight: 900;
  }
`;

const Results = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const CabCard = styled.div`
  background: #fff;
  border: 1px solid ${colors.neutral[200]};
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 32px rgba(0,0,0,0.10);
  }
`;

const CabTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 18px;
`;

const CabIcon = styled.div`
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  border-radius: 15px;
  background: ${colors.neutral[100]};
  font-size: 28px;
`;

const CabName = styled.div`
  flex: 1;

  h3 {
    margin: 0 0 5px;
    color: ${colors.neutral[900]};
    font-size: 18px;
    font-weight: 900;
  }

  p {
    margin: 0;
    color: ${colors.neutral[500]};
    font-size: 12px;
  }
`;

const Price = styled.div`
  text-align: right;

  span {
    display: block;
    color: ${colors.neutral[500]};
    font-size: 10px;
    font-weight: 700;
  }

  strong {
    color: ${colors.primary.main};
    font-size: 21px;
    font-weight: 900;
  }
`;

const Details = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 18px;
`;

const Detail = styled.span`
  padding: 7px 10px;
  border-radius: 8px;
  background: ${colors.neutral[100]};
  color: ${colors.neutral[600]};
  font-size: 11px;
  font-weight: 700;
`;

const SelectButton = styled.button`
  width: 100%;
  min-height: 50px;
  border: 0;
  border-radius: 12px;
  background: ${colors.primary.gradient};
  color: #fff;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
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
        <Header>
          <Eyebrow>GetMeYatra Cab Services</Eyebrow>
          <Title>Explore Available Cabs</Title>
          <Subtitle>
            Choose the cab that works best for your journey.
          </Subtitle>
        </Header>

        <SearchSummary>
          <SummaryItem>
            <span>Source</span>
            <strong>{searchData.source || 'Not selected'}</strong>
          </SummaryItem>

          <SummaryItem>
            <span>Destination</span>
            <strong>{searchData.destination || 'Not selected'}</strong>
          </SummaryItem>

          <SummaryItem>
            <span>Pickup Date</span>
            <strong>{searchData.pickupDate || 'Not selected'}</strong>
          </SummaryItem>

          {searchData.mode === 'round-trip' && (
            <SummaryItem>
              <span>Return Date</span>
              <strong>{searchData.returnDate || 'Not selected'}</strong>
            </SummaryItem>
          )}

          <SummaryItem>
            <span>Pickup Time</span>
            <strong>{searchData.pickupTime || 'Not selected'}</strong>
          </SummaryItem>
        </SearchSummary>

        <ResultsHeader>
          <h2>Available Cabs</h2>
        </ResultsHeader>

        {loading ? (
          <StateCard>
            <h3>Finding available cabs...</h3>
            <p>Please wait while we load the available services.</p>
          </StateCard>
        ) : cabs.length === 0 ? (
          <StateCard>
            <h3>No cabs available</h3>
            <p>No cab services are currently available.</p>
          </StateCard>
        ) : (
          <Results>
            {cabs.map((cab) => (
              <CabCard key={cab.id}>
                <CabTop>
                  <CabIcon>🚕</CabIcon>

                  <CabName>
                    <h3>{cab.cab_type || 'Cab Service'}</h3>
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
                  <Detail>₹5,000 Fixed</Detail>
                </Details>

                <SelectButton onClick={() => handleSelectCab(cab)}>
                  SELECT CAB →
                </SelectButton>
              </CabCard>
            ))}
          </Results>
        )}
      </Container>
    </Page>
  );
}

export default ExploreCabs;
