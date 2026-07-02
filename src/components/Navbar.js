import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #fff;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
`;

// ===== TOP CONTACT BAR =====
const TopBar = styled.div`
  background: linear-gradient(135deg, #FF6B59 0%, #FFB347 100%);
  padding: 8px 0;
  color: #fff;
  font-size: 13px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .contact-info {
    display: flex;
    align-items: center;
    gap: 25px;
    flex-wrap: wrap;

    span {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      opacity: 0.95;

      i {
        font-size: 13px;
      }

      a {
        color: #fff;
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .social-info {
    display: flex;
    align-items: center;
    gap: 20px;

    a {
      color: #fff;
      text-decoration: none;
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
      opacity: 0.9;
      transition: all 0.3s ease;

      &:hover {
        opacity: 1;
        transform: translateY(-1px);
      }

      i {
        font-size: 14px;
      }
    }

    .divider {
      width: 1px;
      height: 20px;
      background: rgba(255, 255, 255, 0.2);
    }
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      text-align: center;
      gap: 5px;
    }

    .contact-info {
      justify-content: center;
      gap: 15px;
    }

    .social-info {
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .contact-info {
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;

      span {
        font-size: 11px;
      }
    }

    .social-info {
      gap: 12px;

      a {
        font-size: 11px;
      }
    }
  }
`;

// ===== MAIN NAVBAR =====
const MainNav = styled.div`
  padding: ${({ scrolled }) => scrolled ? '10px 0' : '15px 0'};
  transition: all 0.3s ease;
  background: #fff;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 26px;
  font-weight: 800;
  text-decoration: none;
  color: #2d2d2d;
  flex-shrink: 0;
  
  i {
    color: #FF6B59;
    font-size: 30px;
  }
  
  span {
    background: linear-gradient(135deg, #FF6B59 0%, #FFB347 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .tagline {
    font-size: 10px;
    font-weight: 400;
    color: #8a8a8a;
    -webkit-text-fill-color: #8a8a8a;
    display: block;
    margin-top: -2px;
    letter-spacing: 0.5px;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 35px;
  align-items: center;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => isOpen ? '0' : '-100%'};
    width: 80%;
    max-width: 320px;
    height: 100vh;
    background: #fff;
    flex-direction: column;
    padding: 80px 30px 30px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: -10px 0 40px rgba(0, 0, 0, 0.1);
    gap: 20px;
    overflow-y: auto;
  }
`;

const NavLink = styled(Link)`
  color: ${({ active }) => active ? '#FF6B59' : '#4a4a4a'};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  font-size: 15px;
  padding: 5px 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${({ active }) => active ? '100%' : '0'};
    height: 2.5px;
    background: linear-gradient(135deg, #FF6B59 0%, #FFB347 100%);
    transition: all 0.3s ease;
    border-radius: 2px;
  }
  
  &:hover {
    color: #FF6B59;
    &::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 10px 0;
    width: 100%;
    text-align: center;
  }
`;

const BookButton = styled(Link)`
  padding: 12px 32px;
  background: linear-gradient(135deg, #FF6B59 0%, #FFB347 100%);
  color: #fff;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(255, 107, 89, 0.25);
  white-space: nowrap;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(255, 107, 89, 0.35);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 14px;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 5px;
  
  span {
    width: 28px;
    height: 2.5px;
    background: #2d2d2d;
    transition: all 0.3s ease;
    border-radius: 2px;
  }
  
  &.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  &.active span:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }
  
  &.active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(4px);

  ${({ isOpen }) => isOpen && `
    display: block;
  `}
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <NavContainer>
      {/* ===== TOP CONTACT BAR ===== */}
      <TopBar>
        <div className="container">
          <div className="contact-info">
            <span>
              <i className="fas fa-phone"></i>
              <a href="tel:+918010320000">+91 8010320000</a>
            </span>
            <span>
              <i className="fab fa-whatsapp"></i>
              <a href="https://wa.me/918010320000" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </span>
            <span>
              <i className="fas fa-phone-alt"></i>
              <span>011-47527920</span>
            </span>
            <span>
              <i className="fas fa-envelope"></i>
              <a href="mailto:info@getmecab.com">info@getmecab.com</a>
            </span>
          </div>
          <div className="social-info">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
            <span className="divider"></span>
            <a href="https://www.getmecab.com" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe"></i> getmecab.com
            </a>
          </div>
        </div>
      </TopBar>

      {/* ===== MAIN NAVBAR ===== */}
      <MainNav scrolled={scrolled}>
        <div className="container">
          <Logo to="/" onClick={closeMenu}>
            <i className="fas fa-compass"></i>
            <div>
              GetMe<span>Yatra</span>
              <span className="tagline">Premium Tours & Cabs</span>
            </div>
          </Logo>
          
          <Hamburger className={isOpen ? 'active' : ''} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </Hamburger>
          
          <NavMenu isOpen={isOpen}>
            <li><NavLink to="/" active={location.pathname === '/'} onClick={closeMenu}>Home</NavLink></li>
            <li><NavLink to="/cars" active={location.pathname === '/cars'} onClick={closeMenu}>Cars</NavLink></li>
            <li><NavLink to="/tours" active={location.pathname === '/tours'} onClick={closeMenu}>Tours</NavLink></li>
            <li><NavLink to="/about" active={location.pathname === '/about'} onClick={closeMenu}>About</NavLink></li>
            <li><NavLink to="/contact" active={location.pathname === '/contact'} onClick={closeMenu}>Contact</NavLink></li>
            <li><BookButton to="/contact" onClick={closeMenu}>Book Now</BookButton></li>
          </NavMenu>
        </div>
      </MainNav>

      {/* ===== MOBILE OVERLAY ===== */}
      <Overlay isOpen={isOpen} onClick={closeMenu} />
    </NavContainer>
  );
};

export default Navbar;
