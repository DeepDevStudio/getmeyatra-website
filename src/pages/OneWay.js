import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors, shadows, breakpoints } from '../styles/theme';

const Page = styled.div`
  min-height: 100vh;
  padding: 118px 20px 80px;
  background:
    radial-gradient(circle at 10% 0%, rgba(79,70,229,0.10), transparent 32%),
    radial-gradient(circle at 90% 10%, rgba(124,58,237,0.08), transparent 30%),
    linear-gradient(180deg, #f8f9fc 0%, #eef1f7 100%);
  overflow: hidden;

  @media (max-width: ${breakpoints.sm}) {
    padding: 105px 14px 55px;
  }
`;

const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`;

const Hero = styled.div`
  text-align: center;
  margin: 0 auto 34px;
  max-width: 820px;

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 15px;
    border-radius: 50px;
    background: rgba(79, 70, 229, 0.09);
    border: 1px solid rgba(79, 70, 229, 0.12);
    color: ${colors.primary.main};
    font-size: 12px;
    letter-spacing: 0.2px;
    font-weight: 800;
    margin-bottom: 15px;
  }

  h1 {
    margin: 0 0 12px;
    font-size: clamp(2.2rem, 4vw, 3.35rem);
    line-height: 1.08;
    letter-spacing: -1.5px;
    font-weight: 850;
    color: ${colors.neutral[900]};

    span {
      background: ${colors.primary.gradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  p {
    max-width: 690px;
    margin: 0 auto;
    color: ${colors.neutral[600]};
    line-height: 1.75;
    font-size: 15px;
  }

  @media (max-width: ${breakpoints.sm}) {
    margin-bottom: 25px;

    h1 {
      letter-spacing: -0.8px;
    }

    p {
      font-size: 14px;
      line-height: 1.65;
    }
  }
`;

const BookingCard = styled.div`
  position: relative;
  background: rgba(255,255,255,0.96);
  border-radius: 26px;
  padding: 34px;
  box-shadow: 0 24px 70px rgba(31,41,55,0.12);
  border: 1px solid rgba(255,255,255,0.85);
  margin-bottom: 46px;
  backdrop-filter: blur(12px);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 5px;
    border-radius: 26px 26px 0 0;
    background: ${colors.primary.gradient};
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: 22px 17px;
    border-radius: 20px;

    &::before {
      border-radius: 20px 20px 0 0;
    }
  }
`;

const TripSwitcher = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  padding: 5px;
  margin-bottom: 28px;
  background: ${colors.neutral[100]};
  border: 1px solid ${colors.neutral[200]};
  border-radius: 14px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 46px;
    border-radius: 10px;
    text-decoration: none;
    color: ${colors.neutral[600]};
    font-size: 14px;
    font-weight: 700;
    transition: all 0.25s ease;
  }

  a.active {
    color: #fff;
    background: ${colors.primary.gradient};
    box-shadow: 0 6px 18px rgba(79,70,229,0.20);
  }

  a:not(.active):hover {
    color: ${colors.primary.main};
    background: #fff;
  }

  @media (max-width: ${breakpoints.sm}) {
    a {
      font-size: 13px;
      min-height: 43px;
    }
  }
`;

const FormIntro = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding-bottom: 25px;
  margin-bottom: 28px;
  border-bottom: 1px solid ${colors.neutral[200]};

  .intro-icon {
    width: 52px;
    height: 52px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    border-radius: 15px;
    background: rgba(79,70,229,0.09);
    border: 1px solid rgba(79,70,229,0.10);
    font-size: 25px;
  }

  h2 {
    margin: 0 0 5px;
    color: ${colors.neutral[900]};
    font-size: 21px;
    line-height: 1.2;
    font-weight: 800;
  }

  p {
    margin: 0;
    color: ${colors.neutral[500]};
    font-size: 13px;
    line-height: 1.5;
  }

  @media (max-width: ${breakpoints.sm}) {
    align-items: flex-start;

    h2 {
      font-size: 18px;
    }
  }
`;

const FormSection = styled.section`
  margin-bottom: 30px;
`;

const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;

  .number {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    border-radius: 10px;
    background: ${colors.primary.gradient};
    color: #fff;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.4px;
    box-shadow: 0 6px 16px rgba(79,70,229,0.18);
  }

  h3 {
    margin: 0 0 2px;
    color: ${colors.neutral[900]};
    font-size: 16px;
    line-height: 1.3;
    font-weight: 800;
  }

  p {
    margin: 0;
    color: ${colors.neutral[500]};
    font-size: 12px;
    line-height: 1.4;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 13px;
    font-weight: 700;
    color: ${colors.neutral[700]};
  }

  input,
  select {
    width: 100%;
    box-sizing: border-box;
    padding: 14px 15px;
    border: 1px solid ${colors.neutral[200]};
    border-radius: 12px;
    background: ${colors.neutral[50]};
    color: ${colors.neutral[800]};
    font-size: 14px;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: ${colors.primary.main};
      box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
      background: #fff;
    }
  }
`;

const LocationField = styled(Field)`
  .location-row {
    display: flex;
    gap: 10px;

    input {
      flex: 1;
      min-width: 0;
    }

    @media (max-width: ${breakpoints.sm}) {
      flex-direction: column;
    }
  }

  .location-button {
    flex-shrink: 0;
    border: 1px solid ${colors.primary.main};
    border-radius: 12px;
    padding: 0 15px;
    background: rgba(79,70,229,0.06);
    color: ${colors.primary.main};
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: ${colors.primary.main};
      color: #fff;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    @media (max-width: ${breakpoints.sm}) {
      min-height: 44px;
    }
  }

  .location-status {
    margin-top: 7px;
    font-size: 12px;
    color: ${colors.status.success};
    font-weight: 600;
  }
`;

const FullField = styled(Field)`
  grid-column: 1 / -1;
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 24px;
  padding: 15px 24px;
  border: none;
  border-radius: 50px;
  background: ${colors.primary.gradient};
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(79,70,229,0.25);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(79,70,229,0.35);
  }
`;

const VehicleSection = styled.div`
  margin-top: 28px;

  h3 {
    margin: 0 0 15px;
    color: ${colors.neutral[900]};
    font-size: 18px;
  }
`;

const VehicleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const VehicleCard = styled.button`
  text-align: left;
  background: #fff;
  border: 2px solid ${({ selected }) =>
    selected ? colors.primary.main : colors.neutral[200]};
  border-radius: 16px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: ${({ selected }) =>
    selected ? '0 8px 25px rgba(79,70,229,0.12)' : 'none'};

  &:hover {
    transform: translateY(-3px);
    border-color: ${colors.primary.main};
  }

  .icon {
    font-size: 30px;
    margin-bottom: 8px;
  }

  .name {
    font-size: 14px;
    font-weight: 700;
    color: ${colors.neutral[900]};
    margin-bottom: 4px;
  }

  .details {
    font-size: 12px;
    color: ${colors.neutral[500]};
  }

  .price {
    margin-top: 9px;
    font-size: 14px;
    font-weight: 800;
    color: ${colors.primary.main};
  }
`;

const Benefits = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 45px;

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const Benefit = styled.div`
  background: #fff;
  padding: 25px;
  border-radius: 18px;
  text-align: center;
  box-shadow: ${shadows.md};

  .icon {
    font-size: 32px;
    display: block;
    margin-bottom: 10px;
  }

  h3 {
    margin: 0 0 6px;
    font-size: 16px;
    color: ${colors.neutral[900]};
  }

  p {
    margin: 0;
    font-size: 13px;
    line-height: 1.6;
    color: ${colors.neutral[500]};
  }
`;

const CTA = styled.div`
  text-align: center;
  background: ${colors.primary.gradient};
  color: #fff;
  border-radius: 22px;
  padding: 38px 25px;

  h2 {
    margin: 0 0 8px;
    font-size: 1.8rem;
  }

  p {
    margin: 0 0 20px;
    opacity: 0.9;
  }

  a {
    display: inline-block;
    padding: 12px 25px;
    background: #fff;
    color: ${colors.primary.main};
    text-decoration: none;
    border-radius: 50px;
    font-weight: 700;
  }
`;

const pickupLocations = [
  'Delhi',
  'Uttar Pradesh',
  'Rajasthan',
  'Uttarakhand',
  'Himachal Pradesh',
  'Punjab',
  'Bihar',
  'Jammu',
  'Gujarat',
  'Haryana',
];

const vehicles = [
  { id: 1, name: 'Swift Dzire', seats: 4, price: 11, icon: '🚗' },
  { id: 2, name: 'Toyota Innova Crysta', seats: 7, price: 20, icon: '🚙' },
  { id: 3, name: 'Toyota Fortuner', seats: 7, price: 30, icon: '🚘' },
  { id: 4, name: 'Mercedes E-Class', seats: 4, price: 48, icon: '✨' },
];

function OneWay() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [pickupLocation, setPickupLocation] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');

    if (from && pickupLocations.includes(from)) {
      setPickupLocation(from);
    }
  }, []);

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Location services are not supported by your browser.');
      return;
    }

    setLocationLoading(true);
    setLocationStatus('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPickupLocation(`Current Location (${latitude.toFixed(6)}, ${longitude.toFixed(6)})`);
        setLocationStatus('✓ Current location detected');
        setLocationLoading(false);
      },
      () => {
        setLocationStatus('Unable to access your location. Please enter it manually.');
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Your one-way trip request has been received. Our team will contact you with the fare.');
  };

  return (
    <Page>
      <Container>
        <Hero>
          <div className="badge">🚕 One Way Cab Service</div>
          <h1>Comfortable <span>One Way</span> Travel</h1>
          <p>
            Travel from your pickup location to your destination with a
            comfortable cab and an experienced driver.
          </p>
        </Hero>

        <BookingCard>
          <form onSubmit={handleSubmit}>
            <TripSwitcher>
              <Link to="/one-way" className="active">
                🚕 One Way
              </Link>
              <Link to="/round-trip">
                🔄 Round Trip
              </Link>
            </TripSwitcher>

            <FormIntro>
              <div className="intro-icon">🚕</div>
              <div>
                <h2>One Way Taxi/Cab Service From</h2>
                <p>Delhi • Uttar Pradesh • Rajasthan • Uttarakhand • Himachal Pradesh • Punjab • Bihar • Jammu • Gujarat • Haryana</p>
              </div>
            </FormIntro>

            <FormSection>
              <SectionHeading>
                <span className="number">01</span>
                <div>
                  <h3>Passenger Details</h3>
                  <p>Tell us who is travelling</p>
                </div>
              </SectionHeading>

              <FormGrid>
                <Field>
                  <label>👤 Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />
                </Field>

                <Field>
                  <label>📱 Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your 10-digit mobile number"
                    inputMode="numeric"
                    pattern="[6-9][0-9]{9}"
                    maxLength="10"
                    required
                  />
                </Field>
              </FormGrid>
            </FormSection>

            <FormSection>
              <SectionHeading>
                <span className="number">02</span>
                <div>
                  <h3>Journey Details</h3>
                  <p>Where would you like to travel?</p>
                </div>
              </SectionHeading>

              <FormGrid>
                <LocationField>
                  <label>📍 Pickup Location</label>
                  <div className="location-row">
                    <select
                      value={pickupLocation}
                      onChange={(event) => {
                        setPickupLocation(event.target.value);
                        setLocationStatus('');
                      }}
                      required
                    >
                      <option value="">Select pickup location</option>
                      {pickupLocations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      className="location-button"
                      onClick={useCurrentLocation}
                      disabled={locationLoading}
                    >
                      {locationLoading ? 'Locating...' : '📍 Use My Location'}
                    </button>
                  </div>

                  {locationStatus && (
                    <div className="location-status">{locationStatus}</div>
                  )}
                </LocationField>

                <Field>
                  <label>🎯 Destination</label>
                  <select defaultValue="" required>
                    <option value="" disabled>Select destination</option>
                    {pickupLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </Field>
              </FormGrid>
            </FormSection>

            <FormSection>
              <SectionHeading>
                <span className="number">03</span>
                <div>
                  <h3>Travel Schedule</h3>
                  <p>Choose your preferred travel date and time</p>
                </div>
              </SectionHeading>

              <FormGrid>
                <Field>
                  <label>📅 Travel Date</label>
                  <input type="date" required />
                </Field>

                <Field>
                  <label>⏰ Pickup Time</label>
                  <input type="time" required />
                </Field>

                <Field>
                  <label>👥 Passengers</label>
                  <select defaultValue="1">
                    <option value="1">1 Passenger</option>
                    <option value="2">2 Passengers</option>
                    <option value="3">3 Passengers</option>
                    <option value="4">4 Passengers</option>
                    <option value="5">5 Passengers</option>
                    <option value="6">6 Passengers</option>
                    <option value="7">7 Passengers</option>
                  </select>
                </Field>
              </FormGrid>
            </FormSection>

            <FormSection>
              <SectionHeading>
                <span className="number">04</span>
                <div>
                  <h3>Choose Your Vehicle</h3>
                  <p>Select the vehicle that best fits your journey</p>
                </div>
              </SectionHeading>

              <VehicleGrid>
                {vehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    type="button"
                    selected={selectedVehicle === vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <div className="icon">{vehicle.icon}</div>
                    <div className="name">{vehicle.name}</div>
                    <div className="details">{vehicle.seats} seats • AC</div>
                    <div className="price">From ₹{vehicle.price}/km</div>
                  </VehicleCard>
                ))}
              </VehicleGrid>
            </FormSection>

            <SubmitButton type="submit">
              Get Fare & Continue →
            </SubmitButton>
          </form>
        </BookingCard>

        <Benefits>
          <Benefit>
            <span className="icon">🛡️</span>
            <h3>Safe & Reliable</h3>
            <p>Experienced drivers and well-maintained vehicles.</p>
          </Benefit>

          <Benefit>
            <span className="icon">💰</span>
            <h3>Transparent Pricing</h3>
            <p>Clear starting rates with fare confirmation before booking.</p>
          </Benefit>

          <Benefit>
            <span className="icon">📞</span>
            <h3>Dedicated Support</h3>
            <p>Our travel team is available to help with your journey.</p>
          </Benefit>
        </Benefits>

        <CTA>
          <h2>Ready for your journey?</h2>
          <p>Tell us your route and we'll help arrange your one-way cab.</p>
          <a href="tel:+919312113322">📞 Contact GetMeYatra</a>
        </CTA>
      </Container>
    </Page>
  );
}

export default OneWay;
