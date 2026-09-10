import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { colors, shadows, breakpoints } from '../styles/theme';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #fff;
  box-shadow: ${shadows.md};
  transition: all 0.3s ease;
`;

const MainNav = styled.div`
  padding: ${({ scrolled }) => scrolled ? '8px 0' : '12px 0'};
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

  @media (max-width: ${breakpoints.md}) {
    padding: 8px 0;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;

  img {
    height: 50px;
    width: auto;
    object-fit: contain;
  }

  .logo-text {
    .main {
      font-size: 22px;
      font-weight: 800;
      background: ${colors.primary.gradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .tagline {
      display: block;
      font-size: 9px;
      font-weight: 400;
      color: ${colors.neutral[500]};
      -webkit-text-fill-color: ${colors.neutral[500]};
      letter-spacing: 0.5px;
      margin-top: -2px;
    }
  }

  @media (max-width: ${breakpoints.sm}) {
    img {
      height: 36px;
    }
    .logo-text .main {
      font-size: 16px;
    }
    .logo-text .tagline {
      font-size: 7px;
    }
  }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 30px;
  align-items: center;
  margin: 0;
  padding: 0;

  @media (max-width: ${breakpoints.md}) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => isOpen ? '0' : '-100%'};
    width: 80%;
    max-width: 320px;
    height: 100vh;
    background: #fff;
    flex-direction: column;
    padding: 80px 24px 30px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${shadows.xl};
    gap: 12px;
    overflow-y: auto;
    z-index: 1001;
  }
`;

const NavLink = styled(Link)`
  color: ${({ active }) => active ? colors.primary.main : colors.neutral[700]};
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.3s ease;
  padding: 5px 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${({ active }) => active ? '100%' : '0'};
    height: 2.5px;
    background: ${colors.primary.gradient};
    transition: all 0.3s ease;
    border-radius: 2px;
  }

  &:hover {
    color: ${colors.primary.main};
    &::after { width: 100%; }
  }

  @media (max-width: ${breakpoints.md}) {
    font-size: 18px;
    padding: 10px 0;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid ${colors.neutral[100]};
    
    &::after {
      display: none;
    }
    
    &.active {
      background: rgba(79,70,229,0.06);
      border-radius: 8px;
    }
  }
`;

const BookButton = styled(Link)`
  padding: 10px 28px;
  background: ${colors.primary.gradient};
  color: #fff;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
  white-space: nowrap;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
  }

  @media (max-width: ${breakpoints.md}) {
    width: 100%;
    text-align: center;
    padding: 12px;
    font-size: 16px;
  }
`;

const AuthButton = styled(Link)`
  color: ${({ active }) => active ? colors.primary.main : colors.neutral[700]};
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.3s ease;
  padding: 5px 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${({ active }) => active ? '100%' : '0'};
    height: 2.5px;
    background: ${colors.primary.gradient};
    transition: all 0.3s ease;
    border-radius: 2px;
  }

  &:hover {
    color: ${colors.primary.main};
    &::after { width: 100%; }
  }

  @media (max-width: ${breakpoints.md}) {
    font-size: 18px;
    padding: 10px 0;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid ${colors.neutral[100]};
    
    &::after {
      display: none;
    }
  }
`;

const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: ${colors.neutral[700]};
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 5px 0;
  position: relative;

  &:hover {
    color: ${colors.status.error};
  }

  @media (max-width: ${breakpoints.md}) {
    font-size: 18px;
    padding: 10px 0;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid ${colors.neutral[100]};
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 5px;
  z-index: 1002;

  span {
    width: 26px;
    height: 2.5px;
    background: ${colors.neutral[700]};
    transition: all 0.3s ease;
    border-radius: 2px;
    display: block;
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

  @media (max-width: ${breakpoints.md}) {
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
  z-index: 1000;
  backdrop-filter: blur(4px);

  ${({ isOpen }) => isOpen && `display: block;`}
`;

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);

  // ===== FETCH LOGO FROM CRM =====
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch('/api/home-settings');
        const data = await response.json();
        if (data.logo_url) {
          setLogoUrl(data.logo_url);
        }
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    };
    fetchLogo();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const customer = localStorage.getItem('customer');
    setIsLoggedIn(!!customer);
  }, [location]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('customer');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <NavContainer>
      <MainNav scrolled={scrolled}>
        <div className="container">
          <Logo to="/" onClick={closeMenu}>
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="GetMeYatra" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <span className="logo-text" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="main">GetMeYatra</span>
                <span className="tagline">Tours & Travel</span>
              </span>
            )}
          </Logo>

          <Hamburger className={isOpen ? 'active' : ''} onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </Hamburger>

          <NavMenu isOpen={isOpen}>
            <li><NavLink to="/" active={location.pathname === '/'} onClick={closeMenu}>Home</NavLink></li>
            <li><NavLink to="/tours" active={location.pathname === '/tours'} onClick={closeMenu}>Tours</NavLink></li>
            <li><NavLink to="/about" active={location.pathname === '/about'} onClick={closeMenu}>About</NavLink></li>
            <li><NavLink to="/contact" active={location.pathname === '/contact'} onClick={closeMenu}>Contact</NavLink></li>
            
            {isLoggedIn ? (
              <>
                <li><AuthButton to="/dashboard" active={location.pathname === '/dashboard'} onClick={closeMenu}>📊 Dashboard</AuthButton></li>
                <li><LogoutButton onClick={handleLogout}>🚪 Logout</LogoutButton></li>
              </>
            ) : (
              <>
                <li><AuthButton to="/login" active={location.pathname === '/login'} onClick={closeMenu}>🔑 Login</AuthButton></li>
                <li><BookButton to="/register" onClick={closeMenu}>Register</BookButton></li>
              </>
            )}
          </NavMenu>
        </div>
      </MainNav>

      <Overlay isOpen={isOpen} onClick={closeMenu} />
    </NavContainer>
  );
}

export default Navbar;
