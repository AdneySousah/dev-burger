import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: #363636;
  width: 100%;
  height: 100vh;
  align-items: center;
  position: relative;

  img {
    width: 60%;
    margin: 40px 0;
  }

  @media (max-width: 768px) {
    height: auto;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 20px;

    img {
      display: none;
    }
  }
`;

export const NavLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 768px) {
    display: none;
    position: absolute;
    top: 60px;
    left: 0;
    background-color: #363636;
    width: 100%;
    z-index: 1000;

    &.open {
      display: flex;
    }
  }
`;

export const Footer = styled.footer`
  width: 100%;
  margin-top: auto;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  text-decoration: none;
  color: #fff;
  background-color: ${(props) => (props.$isActive ? "#9758a6" : "transparent")};

  &:hover {
    background-color: #9758a6;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const HamburgerButton = styled.button`
  display: none;

  @media (max-width: 768px) {

    display: block;
    background: none;
    border: none;
    color: white;
    cursor: pointer;

    div{
        font-size: 1rem;
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
    }
  }
`;
