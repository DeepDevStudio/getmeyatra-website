import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
