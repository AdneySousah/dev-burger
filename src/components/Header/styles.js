import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  z-index: 100;
  background-color: ${p => p.theme.mainBlack};
  width: 100%;
  height: 72px;
  padding: 0 36px;
  box-sizing: border-box;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  height: 72px;
`;

/* Navigation */
export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;

  /* container dos links desktop (usamos a classe desktop-links no JSX) */
  div.desktop-links {
    margin-left: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  hr {
    height: 24px;
    border: 1px solid #625e5e;
  }

  @media (max-width: 768px) {
    div.desktop-links {
      display: none; /* <<- importante: esconde os links desktop no mobile */
      margin-left: 0;
      gap: 10px;
    }
  }
`;

/* Links padrão */
export const HeaderLink = styled(Link)`
  color: ${p => (p.$isActive ? p.theme.purple : p.theme.white)};
  border-bottom: ${p => (p.$isActive ? `2px solid ${p.theme.purple}` : 'none')};
  padding-bottom: 5px;
  text-decoration: none;
  font-size: 14px;
  transition: 0.25s ease-in-out;

  &:hover {
    color: #9758a6;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const HeaderLinkCart = styled(Link)`
  color: ${p => (p.$isActive ? p.theme.purple : p.theme.white)};
  border-bottom: ${p => (p.$isActive ? `2px solid ${p.theme.purple}` : 'none')};
  padding-bottom: 5px;
  text-decoration: none;
  font-size: 14px;
  transition: 0.25s;

  &:hover {
    color: #9758a6;
  }
`;

export const HeaderLinkMenu = styled(Link)`
  color: ${p => (p.$isActive ? p.theme.purple : p.theme.white)};
  border-bottom: ${p => (p.$isActive ? `2px solid ${p.theme.purple}` : 'none')};
  padding-bottom: 5px;
  text-decoration: none;
  font-size: 14px;
  transition: 0.25s;

  ${p => p.$isStatus && `
    color: #72eb4dff;
    animation: pulse 1.5s ease-in-out infinite;
  `}

  &:hover {
    color: #9758a6;
  }

  @keyframes pulse { from { opacity: 0.5 } to { opacity: 1 } }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;

  p {
    color: #fff;
    line-height: 90%;
    font-weight: 300;
    margin: 0;
    span {
      color: #9758a6;
      font-weight: 900;
    }
  }

  @media (max-width: 768px) {
    p { display: none; }
    span { display: none; }
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  p {
    color: #ff3205;
    font-weight: bold;
    animation: blink 1s infinite ease-in-out;
    margin: 0;
  }

  @keyframes blink { from { opacity: 0.5 } to { opacity: 1 } }
`;

export const Logout = styled.button`
  color: #ff3205;
  text-decoration: none;
  background-color: transparent;
  border: none;
  font-weight: 700;
  cursor: pointer;
`;

/* ================= mobile ================= */

export const MobileButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
    margin-left: 12px;
  }
`;

export const Hamburger = styled.div`
  width: 28px;
  height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    display: block;
    height: 2px;
    border-radius: 2px;
    background: ${p => p.theme.white};
    transition: transform .25s ease, opacity .25s ease;
  }

  ${p => p.$open && `
    span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
    span:nth-child(2) { opacity: 0; }
    span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
  `}
`;

export const MobileMenu = styled.div`
  position: absolute;
  top: 72px;
  left: 0;
  right: 0;
  background: ${p => p.theme.mainBlack};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  gap: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  transform-origin: top;
  transition: transform .18s ease, opacity .18s ease, visibility .18s;
  opacity: ${p => (p.$open ? 1 : 0)};
  transform: ${p => (p.$open ? 'translateY(0)' : 'translateY(-8px)')};
  visibility: ${p => (p.$open ? 'visible' : 'hidden')};
  z-index: 9999;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileItem = styled(Link)`
  color: ${p => (p.$isActive ? p.theme.purple : p.theme.white)};
  text-decoration: none;
  font-size: 16px;
  padding: 8px 16px;
  width: 100%;
  text-align: center;

  ${p => p.$isStatus && `
    color: #72eb4dff;
    animation: pulse 1.5s linear infinite;
    @keyframes pulse { from { opacity: 0.5 } to { opacity: 1 } }
  `}

  &:hover {
    color: #9758a6;
  }
`;
