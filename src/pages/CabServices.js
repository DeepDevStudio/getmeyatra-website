import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors, breakpoints } from '../styles/theme';

const LOCATION_DATA = {
  Delhi: [
    'New Delhi',
    'Delhi',
    'Dwarka',
    'Rohini',
    'Saket',
    'Karol Bagh',
    'Janakpuri',
    'Lajpat Nagar',
    'Vasant Kunj',
    'Connaught Place',
  ],
  Haryana: [
    'Gurugram',
    'Faridabad',
    'Panipat',
    'Rohtak',
    'Hisar',
    'Karnal',
    'Ambala',
    'Sonipat',
    'Panchkula',
    'Rewari',
    'Bhiwani',
    'Kurukshetra',
    'Yamunanagar',
    'Sirsa',
    'Kaithal',
    'Bahadurgarh',
    'Manesar',
    'Narnaul',
  ],
  Punjab: [
    'Chandigarh',
    'Amritsar',
    'Ludhiana',
    'Jalandhar',
    'Patiala',
    'Bathinda',
    'Mohali',
    'Pathankot',
    'Hoshiarpur',
    'Moga',
    'Firozpur',
    'Kapurthala',
    'Phagwara',
    'Sangrur',
  ],
  'Uttar Pradesh': [
    'Noida',
    'Greater Noida',
    'Ghaziabad',
    'Agra',
    'Mathura',
    'Vrindavan',
    'Lucknow',
    'Kanpur',
    'Varanasi',
    'Prayagraj',
    'Meerut',
    'Bareilly',
    'Moradabad',
    'Aligarh',
    'Gorakhpur',
    'Ayodhya',
    'Jhansi',
    'Muzaffarnagar',
    'Saharanpur',
  ],
  Uttarakhand: [
    'Dehradun',
    'Haridwar',
    'Rishikesh',
    'Mussoorie',
    'Nainital',
    'Haldwani',
    'Roorkee',
    'Rudrapur',
    'Kashipur',
    'Almora',
    'Ranikhet',
    'Ramnagar',
    'Badrinath',
    'Kedarnath',
  ],
  Rajasthan: [
    'Jaipur',
    'Jodhpur',
    'Udaipur',
    'Ajmer',
    'Pushkar',
    'Kota',
    'Bikaner',
    'Jaisalmer',
    'Mount Abu',
    'Alwar',
    'Bharatpur',
    'Chittorgarh',
    'Ranthambore',
    'Sikar',
    'Neemrana',
    'Mandawa',
  ],
  'Himachal Pradesh': [
    'Shimla',
    'Manali',
    'Chandigarh',
    'Dharamshala',
    'Dalhousie',
    'Kullu',
    'Kasol',
    'Mandi',
    'Solan',
    'Kasauli',
    'Chamba',
    'Kufri',
    'Narkanda',
    'Palampur',
    'McLeod Ganj',
    'Spiti',
  ],
  Bihar: [
    'Patna',
    'Gaya',
    'Bodh Gaya',
    'Muzaffarpur',
    'Bhagalpur',
    'Darbhanga',
    'Nalanda',
    'Rajgir',
    'Vaishali',
    'Hajipur',
    'Purnia',
    'Begusarai',
    'Ara',
    'Madhubani',
  ],
  Gujarat: [
    'Ahmedabad',
    'Surat',
    'Vadodara',
    'Rajkot',
    'Gandhinagar',
    'Bhavnagar',
    'Jamnagar',
    'Anand',
    'Bharuch',
    'Vapi',
    'Junagadh',
    'Dwarka',
    'Somnath',
    'Bhuj',
    'Porbandar',
    'Saputara',
  ],
  'Jammu & Kashmir': [
    'Jammu',
    'Srinagar',
    'Gulmarg',
    'Pahalgam',
    'Sonamarg',
    'Katra',
    'Udhampur',
    'Patnitop',
    'Anantnag',
    'Baramulla',
    'Doda',
    'Leh',
  ],
};

const STATES = Object.keys(LOCATION_DATA);

const Page = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: #080b16;
`;

const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 80% 20%, rgba(124,58,237,0.25), transparent 34%),
    linear-gradient(90deg, rgba(8,11,22,0.94) 0%, rgba(8,11,22,0.72) 52%, rgba(8,11,22,0.78) 100%),
    url('/uploads/home_images/home-1785131915699-160627787.jpeg') center/cover no-repeat;
`;

const Content = styled.main`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 125px 24px 70px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${breakpoints.sm}) {
    padding: 105px 15px 45px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1180px;
`;

const Header = styled.div`
  max-width: 760px;
  margin-bottom: 30px;
  color: #fff;

  @media (max-width: ${breakpoints.md}) {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.16);
  backdrop-filter: blur(14px);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(38px, 5vw, 62px);
  line-height: 1.02;
  letter-spacing: -2px;
  font-weight: 900;

  span {
    display: block;
    background: ${colors.primary.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: ${breakpoints.sm}) {
    font-size: 38px;
    letter-spacing: -1.2px;
  }
`;

const Description = styled.p`
  max-width: 650px;
  margin: 16px 0 0;
  color: rgba(255,255,255,0.72);
  font-size: 15px;
  line-height: 1.7;

  @media (max-width: ${breakpoints.md}) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const Card = styled.div`
  background: rgba(255,255,255,0.98);
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: 26px;
  padding: 24px;
  box-shadow: 0 35px 90px rgba(0,0,0,0.32);
  backdrop-filter: blur(20px);

  @media (max-width: ${breakpoints.sm}) {
    padding: 16px;
    border-radius: 20px;
  }
`;

const ModeBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${colors.neutral[200]};

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ModeTabs = styled.div`
  display: flex;
  gap: 6px;
  padding: 5px;
  background: ${colors.neutral[100]};
  border-radius: 14px;
`;

const ModeTab = styled.button`
  min-height: 44px;
  padding: 0 22px;
  border: 0;
  border-radius: 10px;
  background: ${props =>
    props.active ? colors.primary.gradient : 'transparent'};
  color: ${props => (props.active ? '#fff' : colors.neutral[600])};
  font-size: 12px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: ${props =>
    props.active ? '0 5px 16px rgba(79,70,229,0.22)' : 'none'};

  @media (max-width: ${breakpoints.sm}) {
    flex: 1;
    padding: 0 10px;
  }
`;

const ModeLabel = styled.div`
  color: ${colors.neutral[500]};
  font-size: 12px;
  font-weight: 700;

  strong {
    color: ${colors.neutral[800]};
  }

  @media (max-width: ${breakpoints.sm}) {
    text-align: center;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 22px;
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: ${colors.neutral[700]};
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.7px;
`;

const Required = styled.span`
  color: #ef4444;
  margin-left: 3px;
`;

const Input = styled.input`
  width: 100%;
  height: 54px;
  box-sizing: border-box;
  padding: 0 15px;
  border: 1px solid ${colors.neutral[200]};
  border-radius: 13px;
  background: #fff;
  color: ${colors.neutral[800]};
  font-size: 14px;
  font-weight: 650;
  outline: none;

  &:focus {
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 4px rgba(79,70,229,0.1);
  }
`;

const SearchBox = styled.div`
  position: relative;
`;

const SearchInput = styled(Input)`
  padding-right: 45px;
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.neutral[400]};
  pointer-events: none;
`;

const Dropdown = styled.div`
  position: absolute;
  z-index: 30;
  top: calc(100% + 7px);
  left: 0;
  right: 0;
  max-height: 260px;
  overflow-y: auto;
  padding: 7px;
  border: 1px solid ${colors.neutral[200]};
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 18px 45px rgba(17,24,39,0.18);
`;

const Option = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 43px;
  padding: 8px 11px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: ${colors.neutral[800]};
  text-align: left;
  font-size: 13px;
  font-weight: 650;
  cursor: pointer;

  &:hover {
    background: ${colors.neutral[100]};
    color: ${colors.primary.main};
  }
`;

const AddOption = styled(Option)`
  margin-top: 5px;
  border-top: 1px solid ${colors.neutral[200]};
  border-radius: 0 0 9px 9px;
  color: ${colors.primary.main};
  font-weight: 850;
`;

const SelectButton = styled.button`
  width: 100%;
  height: 54px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${colors.neutral[200]};
  border-radius: 13px;
  background: #fff;
  color: ${props =>
    props.placeholder ? colors.neutral[400] : colors.neutral[800]};
  font-size: 14px;
  font-weight: 650;
  cursor: pointer;
  text-align: left;

  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 4px rgba(79,70,229,0.1);
  }

  &:disabled {
    background: ${colors.neutral[50]};
    cursor: not-allowed;
  }
`;

const Helper = styled.div`
  margin-top: 7px;
  color: ${colors.neutral[500]};
  font-size: 11px;
`;

const SearchSection = styled.div`
  padding: 18px;
  border-radius: 18px;
  background: linear-gradient(135deg, #f8faff 0%, #f5f3ff 100%);
  border: 1px solid #e8e9f8;
`;

const SearchSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;

  strong {
    color: ${colors.neutral[800]};
    font-size: 13px;
  }

  span {
    color: ${colors.neutral[500]};
    font-size: 11px;
  }
`;

const SearchButton = styled.button`
  width: 100%;
  min-height: 57px;
  border: 0;
  border-radius: 14px;
  background: ${colors.primary.gradient};
  color: #fff;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0.3px;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(79,70,229,0.28);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 34px rgba(79,70,229,0.34);
  }

  &:active {
    transform: translateY(0);
  }
`;

const AddPanel = styled.div`
  margin-top: 8px;
  padding: 12px;
  border: 1px solid ${colors.neutral[200]};
  border-radius: 12px;
  background: ${colors.neutral[50]};
`;

const AddRow = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
  }
`;

const SmallButton = styled.button`
  min-height: 44px;
  padding: 0 15px;
  border: 0;
  border-radius: 10px;
  background: ${colors.primary.main};
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
`;

const CancelButton = styled(SmallButton)`
  background: ${colors.neutral[200]};
  color: ${colors.neutral[700]};
`;

const Note = styled.div`
  margin-top: 13px;
  text-align: center;
  color: ${colors.neutral[500]};
  font-size: 11px;
`;

function SearchableLocation({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled,
  addLabel,
  onAdd,
}) {
  const wrapperRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value || '');

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    const handleOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return options;
    }

    return options.filter(option =>
      option.toLowerCase().includes(search)
    );
  }, [options, query]);

  const handleSelect = option => {
    setQuery(option);
    setOpen(false);
    onChange(option);
  };

  return (
    <Field ref={wrapperRef}>
      <Label>{label}<Required>*</Required></Label>

      <SearchBox>
        <SearchInput
          value={query}
          placeholder={disabled ? 'Select state first' : placeholder}
          disabled={disabled}
          autoComplete="off"
          onFocus={() => !disabled && setOpen(true)}
          onChange={event => {
            setQuery(event.target.value);
            onChange('');
            setOpen(true);
          }}
        />
        <SearchIcon>⌕</SearchIcon>

        {open && !disabled && (
          <Dropdown>
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <Option
                  type="button"
                  key={option}
                  onMouseDown={event => event.preventDefault()}
                  onClick={() => handleSelect(option)}
                >
                  <span>{option}</span>
                  <span>›</span>
                </Option>
              ))
            ) : (
              <Option type="button" disabled>
                <span>No matching locations</span>
              </Option>
            )}

            {onAdd && (
              <AddOption
                type="button"
                onMouseDown={event => event.preventDefault()}
                onClick={() => {
                  setOpen(false);
                  onAdd();
                }}
              >
                <span>＋ {addLabel}</span>
                <span>›</span>
              </AddOption>
            )}
          </Dropdown>
        )}
      </SearchBox>

      {!disabled && options.length > 0 && (
        <Helper>{options.length} locations available in this state</Helper>
      )}
    </Field>
  );
}

function CabServices() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mode, setMode] = useState(
    location.state?.mode === 'round-trip' ? 'round-trip' : 'one-way'
  );

  const [formData, setFormData] = useState({
    state: '',
    source: '',
    destination: '',
    pickupDate: '',
    returnDate: '',
    pickupTime: '',
  });

  const [locationData, setLocationData] = useState(LOCATION_DATA);
  const [states, setStates] = useState(STATES);
  const [serviceData, setServiceData] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  const [destinationOpen, setDestinationOpen] = useState(false);
  const [destinationQuery, setDestinationQuery] = useState('');

  const [addType, setAddType] = useState(null);
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    const initialMode =
      location.state?.mode === 'round-trip' ? 'round-trip' : 'one-way';

    setMode(initialMode);
  }, [location.state?.mode]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const endpoint =
          mode === 'round-trip'
            ? '/api/round-trip-services'
            : '/api/cab-services';

        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error('Unable to load cab services');
        }

        const data = await response.json();
        setServiceData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Cab services loading error:', error);
        setServiceData([]);
      } finally {
        setLoadingServices(false);
      }
    };

    setLoadingServices(true);
    loadServices();
  }, [mode]);

  const stateLocations = formData.state
    ? locationData[formData.state] || []
    : [];

  const sourceOptions = useMemo(() => {
    return [...stateLocations].sort((a, b) =>
      a.localeCompare(b)
    );
  }, [stateLocations]);

  const destinationOptions = useMemo(() => {
    const allLocations = Object.values(locationData).flat();

    const serviceDestinations = serviceData
      .map(service => service.destination)
      .filter(Boolean);

    return Array.from(
      new Set([...allLocations, ...serviceDestinations])
    ).sort((a, b) => a.localeCompare(b));
  }, [serviceData]);

  const filteredDestinationOptions = useMemo(() => {
    const query = destinationQuery.trim().toLowerCase();

    if (!query) {
      return destinationOptions;
    }

    return destinationOptions.filter(destination =>
      destination.toLowerCase().includes(query)
    );
  }, [destinationOptions, destinationQuery]);

  const handleModeChange = nextMode => {
    setMode(nextMode);
    setFormData({
      state: '',
      source: '',
      destination: '',
      pickupDate: '',
      returnDate: '',
      pickupTime: '',
    });
    setDestinationQuery('');
    setDestinationOpen(false);
    setAddType(null);
  };

  const handleStateChange = state => {
    setFormData(prev => ({
      ...prev,
      state,
      source: '',
      destination: '',
    }));

    setDestinationQuery('');
    setDestinationOpen(false);
  };

  const handleSourceChange = source => {
    setFormData(prev => ({
      ...prev,
      source,
      destination: '',
    }));

    setDestinationQuery('');
    setDestinationOpen(false);
  };

  const handleChange = event => {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    const requiredFields = [
      formData.state,
      formData.source,
      formData.destination,
      formData.pickupDate,
      formData.pickupTime,
    ];

    if (mode === 'round-trip') {
      requiredFields.push(formData.returnDate);
    }

    if (requiredFields.some(field => !field)) {
      alert(
        mode === 'round-trip'
          ? 'Please fill all Round Trip details.'
          : 'Please fill all One Way trip details.'
      );
      return;
    }

    if (
      mode === 'round-trip' &&
      formData.returnDate < formData.pickupDate
    ) {
      alert('Return Date cannot be before Pickup Date.');
      return;
    }

    navigate('/explore-cabs', {
      state: {
        mode,
        ...formData,
      },
    });
  };

  const handleAddSubmit = () => {
    const cleanValue = newValue.trim();

    if (!cleanValue) {
      alert(
        addType === 'state'
          ? 'Please enter a state name.'
          : 'Please enter a city or travel destination.'
      );
      return;
    }

    if (addType === 'state') {
      if (STATES.some(state => state.toLowerCase() === cleanValue.toLowerCase())) {
        alert('This state already exists.');
        return;
      }

      setStates(prev => [...prev, cleanValue]);

      setLocationData(prev => ({
        ...prev,
        [cleanValue]: [],
      }));

      setFormData(prev => ({
        ...prev,
        state: cleanValue,
        source: '',
        destination: '',
      }));

      setDestinationQuery('');
      setDestinationOpen(false);
    } else if (addType === 'location') {
      if (!formData.state) {
        alert('Please select a state first.');
        return;
      }

      const existingLocations = locationData[formData.state] || [];

      if (
        existingLocations.some(
          location =>
            location.toLowerCase() === cleanValue.toLowerCase()
        )
      ) {
        alert('This city/location already exists in the selected state.');
        return;
      }

      setLocationData(prev => ({
        ...prev,
        [formData.state]: [
          ...(prev[formData.state] || []),
          cleanValue,
        ],
      }));

      setFormData(prev => ({
        ...prev,
        source: cleanValue,
      }));
    } else if (addType === 'destination') {
      setDestinationQuery(cleanValue);

      setFormData(prev => ({
        ...prev,
        destination: cleanValue,
      }));
    }

    setNewValue('');
    setAddType(null);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Page>
      <HeroBackground />

      <Content>
        <Container>
          <Header>
            <Eyebrow>🚕 GETMEYATRA CAB SERVICES</Eyebrow>

            <Title>
              Choose Your Route.
              <span>We'll Handle The Ride.</span>
            </Title>

            <Description>
              Select your state and pickup location, choose an available
              destination, and explore cabs that match your journey.
            </Description>
          </Header>

          <Card>
            <ModeBar>
              <ModeTabs>
                <ModeTab
                  type="button"
                  active={mode === 'one-way'}
                  onClick={() => handleModeChange('one-way')}
                >
                  ONE WAY
                </ModeTab>

                <ModeTab
                  type="button"
                  active={mode === 'round-trip'}
                  onClick={() => handleModeChange('round-trip')}
                >
                  ROUND TRIP
                </ModeTab>
              </ModeTabs>

              <ModeLabel>
                Booking mode: <strong>{mode === 'one-way' ? 'One Way' : 'Round Trip'}</strong>
              </ModeLabel>
            </ModeBar>

            <Form onSubmit={handleSubmit}>
              <SearchSection>
                <SearchSectionHeader>
                  <strong>📍 Choose Your Journey</strong>
                  <span>
                    {loadingServices
                      ? 'Loading available routes…'
                      : `${destinationOptions.length} destination${destinationOptions.length === 1 ? '' : 's'} available`}
                  </span>
                </SearchSectionHeader>

                <FieldGrid>
                  <SearchableLocation
                    label="State"
                    value={formData.state}
                    onChange={handleStateChange}
                    options={states}
                    placeholder="Type to search your state"
                    disabled={false}
                    addLabel="Add State"
                    onAdd={() => {
                      setAddType('state');
                      setNewValue('');
                    }}
                  />

                  <SearchableLocation
                    label="Source"
                    value={formData.source}
                    onChange={handleSourceChange}
                    options={sourceOptions}
                    placeholder="Type to search your pickup location"
                    disabled={!formData.state}
                    addLabel="Add City / Location"
                    onAdd={() => {
                      setAddType('location');
                      setNewValue('');
                    }}
                  />
                </FieldGrid>

                <Field style={{ marginTop: 16 }}>
                  <Label>Destination<Required>*</Required></Label>

                  <SearchBox>
                    <SearchInput
                      value={destinationQuery || formData.destination}
                      placeholder={
                        !formData.source
                          ? 'Select source first'
                          : destinationOptions.length
                            ? 'Search any destination'
                            : 'No matching destination found'
                      }
                      disabled={!formData.source}
                      autoComplete="off"
                      onFocus={() =>
                        formData.source && setDestinationOpen(true)
                      }
                      onChange={event => {
                        setDestinationQuery(event.target.value);
                        setFormData(prev => ({
                          ...prev,
                          destination: '',
                        }));
                        setDestinationOpen(true);
                      }}
                    />

                    <SearchIcon>⌕</SearchIcon>

                    {destinationOpen && formData.source && (
                      <Dropdown>
                        {filteredDestinationOptions.length > 0 ? (
                          filteredDestinationOptions.map(destination => (
                            <Option
                              type="button"
                              key={destination}
                              onMouseDown={event => event.preventDefault()}
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  destination,
                                }));
                                setDestinationQuery(destination);
                                setDestinationOpen(false);
                              }}
                            >
                              <span>{destination}</span>
                              <span>›</span>
                            </Option>
                          ))
                        ) : (
                          <Option type="button" disabled>
                            <span>No matching destination found</span>
                          </Option>
                        )}

                        <AddOption
                          type="button"
                          onMouseDown={event => event.preventDefault()}
                          onClick={() => {
                            setDestinationOpen(false);
                            setAddType('destination');
                            setNewValue('');
                          }}
                        >
                          <span>＋ Add City / Location</span>
                          <span>›</span>
                        </AddOption>
                      </Dropdown>
                    )}
                  </SearchBox>

                  <Helper>
                    Choose any city or travel destination for your journey.
                  </Helper>
                </Field>
              </SearchSection>

              <DateGrid>
                <Field>
                  <Label htmlFor="pickupDate">
                    Pickup Date<Required>*</Required>
                  </Label>
                  <Input
                    id="pickupDate"
                    name="pickupDate"
                    type="date"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    min={today}
                    required
                  />
                </Field>

                {mode === 'round-trip' && (
                  <Field>
                    <Label htmlFor="returnDate">
                      Return Date<Required>*</Required>
                    </Label>
                    <Input
                      id="returnDate"
                      name="returnDate"
                      type="date"
                      value={formData.returnDate}
                      onChange={handleChange}
                      min={formData.pickupDate || today}
                      required
                    />
                  </Field>
                )}

                <Field>
                  <Label htmlFor="pickupTime">
                    Pickup Time<Required>*</Required>
                  </Label>
                  <Input
                    id="pickupTime"
                    name="pickupTime"
                    type="time"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    required
                  />
                </Field>
              </DateGrid>

              {addType && (
                <AddPanel>
                  <AddRow>
                    <Input
                      value={newValue}
                      onChange={event => setNewValue(event.target.value)}
                      placeholder={
                        addType === 'state'
                          ? 'Enter new state'
                          : 'Enter city or travel destination'
                      }
                      autoFocus
                    />

                    <SmallButton type="button" onClick={handleAddSubmit}>
                      ＋ Add
                    </SmallButton>

                    <CancelButton
                      type="button"
                      onClick={() => {
                        setAddType(null);
                        setNewValue('');
                      }}
                    >
                      Cancel
                    </CancelButton>
                  </AddRow>
                </AddPanel>
              )}

              <SearchButton type="submit">
                EXPLORE AVAILABLE CABS →
              </SearchButton>
            </Form>

            <Note>
              {mode === 'round-trip'
                ? 'Round Trip includes your pickup and return date.'
                : 'Your source is filtered by state, while the destination can be anywhere.'}
            </Note>
          </Card>
        </Container>
      </Content>
    </Page>
  );
}

export default CabServices;
