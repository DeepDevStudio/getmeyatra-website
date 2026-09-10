import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../styles/theme';

const StickyBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${colors.primary.gradient};
  padding: 10px 20px;
  z-index: 999;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;

  a, span {
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.8;
      transform: translateY(-2px);
    }
  }

  .icon {
    font-size: 18px;
  }

  .divider {
    color: rgba(255, 255, 255, 0.3);
    font-size: 20px;
  }

  @media (max-width: ${breakpoints.md}) {
    gap: 15px;
    padding: 8px 15px;
    
    a, span {
      font-size: 12px;
    }
    
    .divider {
      display: none;
    }
  }

  @media (max-width: ${breakpoints.sm}) {
    gap: 10px;
    padding: 6px 10px;
    
    a, span {
      font-size: 10px;
    }
    
    .icon {
      font-size: 14px;
    }
  }
`;

const StickyBottomBar = () => {
  return (
    <StickyBar>
      <a href="tel:+919312113322">
        <span className="icon">📞</span> +91 9312113322
      </a>
      <span className="divider">|</span>
      <a href="https://wa.me/919312113322" target="_blank" rel="noopener noreferrer">
        <span className="icon">💬</span> WhatsApp
      </a>
      <span className="divider">|</span>
      <a href="mailto:info@getmeyatra.com">
        <span className="icon">📧</span> info@getmeyatra.com
      </a>
    </StickyBar>
  );
};

export default StickyBottomBar;
