import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyBottomBar from './components/StickyBottomBar';
import Home from './pages/Home';
import Cars from './pages/Cars';
import Tours from './pages/Tours';
import About from './pages/About';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import YatraDetailsPage from './pages/YatraDetailsPage';
import BookingDetails from './pages/BookingDetails';
import ToursDetail from './pages/ToursDetail';
import CabServices from './pages/CabServices';
import ExploreCabs from './pages/ExploreCabs';
import CabBooking from './pages/CabBooking';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding-bottom: 60px; /* Space for sticky bar */
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/yatra/:id" element={<YatraDetailsPage />} />
            <Route path="/booking-details/:id" element={<BookingDetails />} />
            <Route path="/tours/:id" element={<ToursDetail />} />
            <Route path="/cab-services" element={<CabServices />} />
        <Route path="/explore-cabs" element={<ExploreCabs />} />
        <Route path="/cab-booking" element={<CabBooking />} />
          </Routes>
        </MainContent>
        <StickyBottomBar />
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
