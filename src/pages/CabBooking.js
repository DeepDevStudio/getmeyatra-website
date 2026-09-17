import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { colors, breakpoints } from '../styles/theme';

const Page = styled.div`
  min-height: 100vh;
  background: #f6f7fb;
  padding: 105px 20px 60px;

  @media (max-width: ${breakpoints.sm}) {
    padding: 90px 12px 40px;
  }
`;

const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`;

const TopBar = styled.div`
  margin-bottom: 22px;
`;

const Eyebrow = styled.div`
  color: ${colors.primary.main};
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 7px;
`;

const Title = styled.h1`
  margin: 0;
  color: #151922;
  font-size: clamp(28px, 4vw, 40px);
  line-height: 1.12;
`;

const Subtitle = styled.p`
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 14px;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 350px;
  gap: 22px;
  align-items: start;

  @media (max-width: ${breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const SideColumn = styled.div`
  position: sticky;
  top: 90px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: ${breakpoints.lg}) {
    position: static;
  }
`;

const Card = styled.section`
  background: #fff;
  border: 1px solid #e6e8ee;
  border-radius: 14px;
  padding: 22px;
  box-shadow: 0 5px 18px rgba(17, 24, 39, 0.045);

  @media (max-width: ${breakpoints.sm}) {
    padding: 17px;
    border-radius: 12px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: #171a21;
  font-size: 18px;
`;

const SectionHint = styled.span`
  color: #8b93a1;
  font-size: 12px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;

  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  &.full {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  color: #454b57;
  font-size: 12px;
  font-weight: 700;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 46px;
  padding: 0 13px;
  border: 1px solid #dfe3ea;
  border-radius: 9px;
  background: #fff;
  color: #171a21;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.08);
  }
`;

const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  height: 46px;
  padding: 0 13px;
  border: 1px solid #dfe3ea;
  border-radius: 9px;
  background: #fff;
  color: #171a21;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.08);
  }
`;

const PhoneRow = styled.div`
  display: grid;
  grid-template-columns: 105px 1fr;
  gap: 8px;
`;

const RouteBox = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #fafbfc;
  border: 1px solid #eceef2;
  border-radius: 11px;

  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const RoutePoint = styled.div`
  strong {
    display: block;
    color: #171a21;
    font-size: 15px;
    margin-top: 3px;
  }

  span {
    color: #8b93a1;
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.6px;
  }
`;

const Arrow = styled.div`
  color: ${colors.primary.main};
  font-size: 22px;
  font-weight: 800;

  @media (max-width: ${breakpoints.sm}) {
    transform: rotate(90deg);
    justify-self: center;
  }
`;

const CabCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
`;

const CabTop = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 16px;
`;

const CabIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 11px;
  display: grid;
  place-items: center;
  background: #f1f3ff;
  font-size: 27px;
`;

const CabInfo = styled.div`
  flex: 1;

  h3 {
    margin: 0 0 5px;
    color: #171a21;
    font-size: 16px;
  }

  p {
    margin: 0;
    color: #7b8491;
    font-size: 12px;
  }
`;

const CabFare = styled.div`
  text-align: right;

  span {
    display: block;
    color: #9299a5;
    font-size: 10px;
    margin-bottom: 3px;
  }

  strong {
    color: #171a21;
    font-size: 20px;
  }
`;

const CabMeta = styled.div`
  display: flex;
  gap: 8px;
  padding: 11px 16px;
  border-top: 1px solid #eceef2;
  background: #fafbfc;
  flex-wrap: wrap;
`;

const Meta = styled.span`
  padding: 6px 9px;
  border-radius: 6px;
  background: #fff;
  border: 1px solid #e6e8ee;
  color: #5d6572;
  font-size: 11px;
  font-weight: 700;
`;

const CouponRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 9px;
`;

const SmallButton = styled.button`
  height: 46px;
  padding: 0 18px;
  border: 1px solid ${colors.primary.main};
  border-radius: 9px;
  background: #fff;
  color: ${colors.primary.main};
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
`;

const CheckRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 11px;
  padding: 13px;
  border: 1px solid #e8eaf0;
  border-radius: 9px;
  cursor: pointer;

  & + & {
    margin-top: 9px;
  }

  input {
    margin-top: 2px;
    accent-color: ${colors.primary.main};
  }

  strong {
    display: block;
    color: #343943;
    font-size: 13px;
  }

  span {
    display: block;
    margin-top: 3px;
    color: #8a919d;
    font-size: 11px;
  }
`;

const InfoBox = styled.div`
  padding: 13px;
  border-radius: 9px;
  background: #f8f9fc;
  border: 1px solid #e8eaf0;
  color: #69717e;
  font-size: 12px;
  line-height: 1.6;
`;

const FareRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 10px 0;
  color: #666e7b;
  font-size: 13px;

  strong {
    color: #252a33;
  }
`;

const FareTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  margin-top: 7px;
  border-top: 1px dashed #dfe3e9;

  span {
    color: #303641;
    font-size: 15px;
    font-weight: 800;
  }

  strong {
    color: ${colors.primary.main};
    font-size: 24px;
  }
`;

const PaymentOption = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 9px;
  cursor: pointer;
  color: #3f4651;
  font-size: 13px;
  font-weight: 700;

  input {
    accent-color: ${colors.primary.main};
  }
`;

const ProceedButton = styled.button`
  width: 100%;
  height: 52px;
  margin-top: 17px;
  border: 0;
  border-radius: 10px;
  background: ${colors.primary.gradient};
  color: #fff;
  font-size: 15px;
  font-weight: 900;
  letter-spacing: 0.3px;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(79, 70, 229, 0.22);

  &:hover {
    opacity: 0.94;
  }
`;

const Terms = styled.p`
  margin: 11px 0 0;
  color: #8a919d;
  font-size: 10px;
  line-height: 1.5;
  text-align: center;
`;

function CabBooking() {
  const location = useLocation();
  const bookingData = location.state || {};
  const cab = bookingData.cab || {};

  const [customer, setCustomer] = useState({
    name: '',
    countryCode: '+91',
    mobile: '',
    email: '',
    gstRequired: false,
    gstNumber: '',
    companyName: '',
  });

  const [coupon, setCoupon] = useState('');
  const [payment, setPayment] = useState('full');
  const [personalize, setPersonalize] = useState({
    childSeat: false,
    extraLuggage: false,
  });

  const isRoundTrip = bookingData.mode === 'round-trip';
  const fare = Number(isRoundTrip ? cab.fixed_price || 0 : cab.price || 0);

  const handleCustomerChange = (event) => {
    const { name, value, type, checked } = event.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePersonalizeChange = (event) => {
    const { name, checked } = event.target;

    setPersonalize((previous) => ({
      ...previous,
      [name]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!customer.name || !customer.mobile || !customer.email) {
      alert('Please fill your name, mobile number and email.');
      return;
    }

    console.log('Cab booking submitted:', {
      trip: bookingData,
      cab,
      customer,
      coupon,
      payment,
      personalize,
      fare,
    });

    alert('Booking submission will be connected to the backend next.');
  };

  return (
    <Page>
      <Container>
        <TopBar>
          <Eyebrow>GetMeYatra Cab Booking</Eyebrow>
          <Title>Complete Your Cab Booking</Title>
          <Subtitle>
            Review your journey, enter your details and proceed with your booking.
          </Subtitle>
        </TopBar>

        <Layout>
          <MainColumn>
            <Card>
              <SectionHeader>
                <SectionTitle>Trip Details</SectionTitle>
                <SectionHint>{isRoundTrip ? 'Round Trip' : 'One Way'}</SectionHint>
              </SectionHeader>

              <RouteBox>
                <RoutePoint>
                  <span>Pickup</span>
                  <strong>{bookingData.source || 'Not selected'}</strong>
                </RoutePoint>

                <Arrow>→</Arrow>

                <RoutePoint>
                  <span>Drop</span>
                  <strong>{bookingData.destination || 'Not selected'}</strong>
                </RoutePoint>
              </RouteBox>

              <div style={{ height: 14 }} />

              <Grid>
                <Field>
                  <Label>Pickup Date</Label>
                  <Input
                    type="text"
                    value={bookingData.pickupDate || 'Not selected'}
                    readOnly
                  />
                </Field>

                {isRoundTrip && (
                  <Field>
                    <Label>Return Date</Label>
                    <Input
                      type="text"
                      value={bookingData.returnDate || 'Not selected'}
                      readOnly
                    />
                  </Field>
                )}

                <Field>
                  <Label>Pickup Time</Label>
                  <Input
                    type="text"
                    value={bookingData.pickupTime || 'Not selected'}
                    readOnly
                  />
                </Field>
              </Grid>
            </Card>

            <Card>
              <SectionHeader>
                <SectionTitle>Selected Cab</SectionTitle>
                <SectionHint>Your selected vehicle</SectionHint>
              </SectionHeader>

              <CabCard>
                <CabTop>
                  <CabIcon>🚕</CabIcon>

                  <CabInfo>
                    <h3>{cab.cab_type || 'Cab Service'}</h3>
                    <p>
                      {bookingData.source || 'Source'} →{' '}
                      {bookingData.destination || 'Destination'}
                    </p>
                  </CabInfo>

                  <CabFare>
                    <span>Fare</span>
                    <strong>
                      ₹{fare ? fare.toLocaleString('en-IN') : '—'}
                    </strong>
                  </CabFare>
                </CabTop>

                <CabMeta>
                  {isRoundTrip ? (
                    <>
                      <Meta>Up to {cab.per_day_limit || '—'} KM / Day</Meta>
                      <Meta>
                        ₹{Number(cab.extra_per_km || 0).toLocaleString('en-IN')} / Extra KM
                      </Meta>
                      <Meta>Round Trip</Meta>
                    </>
                  ) : (
                    <>
                      <Meta>{cab.km ? `${cab.km} KM` : 'Distance —'}</Meta>
                      <Meta>One Way</Meta>
                    </>
                  )}
                </CabMeta>
              </CabCard>
            </Card>

            <Card>
              <SectionHeader>
                <SectionTitle>Customer Information</SectionTitle>
                <SectionHint>Required for booking</SectionHint>
              </SectionHeader>

              <Grid>
                <Field className="full">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={customer.name}
                    onChange={handleCustomerChange}
                    required
                  />
                </Field>

                <Field>
                  <Label htmlFor="mobile">Mobile Number</Label>

                  <PhoneRow>
                    <Select
                      name="countryCode"
                      value={customer.countryCode}
                      onChange={handleCustomerChange}
                    >
                      <option value="+91">+91 India</option>
                      <option value="+1">+1 USA</option>
                      <option value="+44">+44 UK</option>
                    </Select>

                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      placeholder="Mobile number"
                      value={customer.mobile}
                      onChange={handleCustomerChange}
                      required
                    />
                  </PhoneRow>
                </Field>

                <Field>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={customer.email}
                    onChange={handleCustomerChange}
                    required
                  />
                </Field>
              </Grid>

              <div style={{ marginTop: 17 }}>
                <CheckRow>
                  <input
                    type="checkbox"
                    name="gstRequired"
                    checked={customer.gstRequired}
                    onChange={handleCustomerChange}
                  />

                  <div>
                    <strong>Booking for a company / need GST details?</strong>
                    <span>Add company information for your booking.</span>
                  </div>
                </CheckRow>
              </div>

              {customer.gstRequired && (
                <div style={{ marginTop: 12 }}>
                  <Grid>
                    <Field>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        placeholder="Enter company name"
                        value={customer.companyName}
                        onChange={handleCustomerChange}
                      />
                    </Field>

                    <Field>
                      <Label htmlFor="gstNumber">GST Number</Label>
                      <Input
                        id="gstNumber"
                        name="gstNumber"
                        placeholder="Enter GST number"
                        value={customer.gstNumber}
                        onChange={handleCustomerChange}
                      />
                    </Field>
                  </Grid>
                </div>
              )}
            </Card>

            <Card>
              <SectionHeader>
                <SectionTitle>Coupon & Offers</SectionTitle>
                <SectionHint>Optional</SectionHint>
              </SectionHeader>

              <CouponRow>
                <Input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(event) => setCoupon(event.target.value)}
                />
                <SmallButton
                  type="button"
                  onClick={() => alert('Coupon validation will be connected next.')}
                >
                  APPLY
                </SmallButton>
              </CouponRow>
            </Card>

            <Card>
              <SectionHeader>
                <SectionTitle>Personalize Your Journey</SectionTitle>
                <SectionHint>Optional services</SectionHint>
              </SectionHeader>

              <CheckRow>
                <input
                  type="checkbox"
                  name="childSeat"
                  checked={personalize.childSeat}
                  onChange={handlePersonalizeChange}
                />
                <div>
                  <strong>Child Seat</strong>
                  <span>Request a child seat if required.</span>
                </div>
              </CheckRow>

              <CheckRow>
                <input
                  type="checkbox"
                  name="extraLuggage"
                  checked={personalize.extraLuggage}
                  onChange={handlePersonalizeChange}
                />
                <div>
                  <strong>Extra Luggage</strong>
                  <span>Let us know if you require additional luggage space.</span>
                </div>
              </CheckRow>
            </Card>

            <Card>
              <SectionHeader>
                <SectionTitle>Inclusions & Exclusions</SectionTitle>
              </SectionHeader>

              <InfoBox>
                Final inclusions, exclusions and applicable cab-service charges
                will be displayed here according to the selected service.
              </InfoBox>
            </Card>

            <Card>
              <SectionHeader>
                <SectionTitle>Cancellation & Terms</SectionTitle>
              </SectionHeader>

              <InfoBox>
                Cancellation rules, refund conditions and booking terms will be
                displayed here once the applicable GetMeYatra cab-service
                policies are connected.
              </InfoBox>
            </Card>
          </MainColumn>

          <SideColumn>
            <Card>
              <SectionHeader>
                <SectionTitle>Fare Summary</SectionTitle>
              </SectionHeader>

              <FareRow>
                <span>Cab Fare</span>
                <strong>
                  ₹{fare ? fare.toLocaleString('en-IN') : '—'}
                </strong>
              </FareRow>

              <FareRow>
                <span>Additional Charges</span>
                <strong>—</strong>
              </FareRow>

              <FareRow>
                <span>Coupon Discount</span>
                <strong>—</strong>
              </FareRow>

              <FareTotal>
                <span>Total Fare</span>
                <strong>
                  ₹{fare ? fare.toLocaleString('en-IN') : '—'}
                </strong>
              </FareTotal>
            </Card>

            <Card>
              <SectionHeader>
                <SectionTitle>Payment</SectionTitle>
              </SectionHeader>

              <PaymentOption>
                <input
                  type="radio"
                  name="payment"
                  value="full"
                  checked={payment === 'full'}
                  onChange={(event) => setPayment(event.target.value)}
                />
                Pay Full Amount
              </PaymentOption>

              <div style={{ height: 9 }} />

              <PaymentOption>
                <input
                  type="radio"
                  name="payment"
                  value="advance"
                  checked={payment === 'advance'}
                  onChange={(event) => setPayment(event.target.value)}
                />
                Pay Advance
              </PaymentOption>
            </Card>

            <Card>
              <SectionTitle>Booking Summary</SectionTitle>

              <FareRow>
                <span>Trip Type</span>
                <strong>{isRoundTrip ? 'Round Trip' : 'One Way'}</strong>
              </FareRow>

              <FareRow>
                <span>Route</span>
                <strong>
                  {bookingData.source || '—'} → {bookingData.destination || '—'}
                </strong>
              </FareRow>

              <FareRow>
                <span>Pickup</span>
                <strong>{bookingData.pickupDate || '—'}</strong>
              </FareRow>

              {isRoundTrip && (
                <FareRow>
                  <span>Return</span>
                  <strong>{bookingData.returnDate || '—'}</strong>
                </FareRow>
              )}

              <FareRow>
                <span>Time</span>
                <strong>{bookingData.pickupTime || '—'}</strong>
              </FareRow>

              <ProceedButton type="submit" form="cab-booking-form">
                PROCEED →
              </ProceedButton>

              <Terms>
                By proceeding, you agree to the applicable booking terms and
                conditions.
              </Terms>
            </Card>
          </SideColumn>
        </Layout>
      </Container>

      <form id="cab-booking-form" onSubmit={handleSubmit} />
    </Page>
  );
}

export default CabBooking;
