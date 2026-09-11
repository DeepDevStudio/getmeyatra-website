import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, shadows, breakpoints } from '../styles/theme';

const Page = styled.div`
  min-height: 100vh;
  padding: 130px 20px 80px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9edf5 100%);
`;

const Container = styled.div`
  max-width: 1150px;
  margin: 0 auto;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 40px;

  .badge {
    display: inline-block;
    padding: 7px 16px;
    border-radius: 50px;
    background: rgba(79, 70, 229, 0.08);
    color: ${colors.primary.main};
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 14px;
  }

  h1 {
    margin: 0 0 12px;
    font-size: 2.6rem;
    font-weight: 800;
    color: ${colors.neutral[900]};

    span {
      background: ${colors.primary.gradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    @media (max-width: ${breakpoints.sm}) {
      font-size: 2rem;
    }
  }

  p {
    max-width: 650px;
    margin: 0 auto;
    color: ${colors.neutral[600]};
    line-height: 1.7;
    font-size: 1rem;
  }
`;

const BookingCard = styled.div`
  background: #fff;
  border-radius: 24px;
  padding: 32px;
  box-shadow: ${shadows.xl};
  border: 1px solid rgba(0,0,0,0.04);
  margin-bottom: 45px;

  @media (max-width: ${breakpoints.sm}) {
    padding: 20px;
    border-radius: 18px;
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

const VehicleSection = styled.div`
  grid-column: 1 / -1;
  margin-top: 5px;

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

const vehicles = [
  { id: 1, name: 'Swift Dzire', seats: 4, price: 11, icon: '🚗' },
  { id: 2, name: 'Toyota Innova Crysta', seats: 7, price: 20, icon: '🚙' },
  { id: 3, name: 'Toyota Fortuner', seats: 7, price: 30, icon: '🚘' },
  { id: 4, name: 'Mercedes E-Class', seats: 4, price: 48, icon: '✨' },
];

function RoundTrip() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Your round-trip request has been received. Our team will contact you with the fare.');
  };

  return (
    <Page>
      <Container>
        <Hero>
          <div className="badge">🔄 Round Trip Cab Service</div>
          <h1>Comfortable <span>Round Trip</span> Travel</h1>
          <p>
            Book a comfortable cab for your complete journey with a dedicated
            vehicle and experienced driver.
          </p>
        </Hero>

        <BookingCard>
          <form onSubmit={handleSubmit}>
            <FormGrid>
              <Field>
                <label>📍 Pickup Location</label>
                <input type="text" placeholder="Enter pickup location" required />
              </Field>

              <Field>
                <label>🎯 Destination</label>
                <input type="text" placeholder="Enter destination" required />
              </Field>

              <Field>
                <label>📅 Departure Date</label>
                <input type="date" required />
              </Field>

              <Field>
                <label>🔄 Return Date</label>
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

              <VehicleSection>
                <h3>🚘 Select Vehicle</h3>

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
              </VehicleSection>
            </FormGrid>

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
          <h2>Planning a return journey?</h2>
          <p>Share your travel dates and we'll help arrange your round-trip cab.</p>
          <a href="tel:+919312113322">📞 Contact GetMeYatra</a>
        </CTA>
      </Container>
    </Page>
  );
}

export default RoundTrip;
