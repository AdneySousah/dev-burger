import { navLinks } from "./navLinks";
import Logo from "../../assets/logo.svg";
import { SignOut, List } from "@phosphor-icons/react";
import {
  Container,
  Footer,
  NavLinkContainer,
  NavLink,
  HamburgerButton,
} from "./styles";
import { useUser } from "../../hooks/UserContext";
import { useResolvedPath } from "react-router-dom";
import { useState } from "react";

export function SideNavAdmin() {
  const { logout } = useUser();
  const { pathname } = useResolvedPath();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <Container>
      <img src={Logo} alt="hamburger logo admin" />

      <HamburgerButton onClick={toggleMenu}>
        <div>
        <List />
       <p>Navegação</p>
       </div>
      </HamburgerButton>

      <NavLinkContainer className={isOpen ? "open" : ""}>
        {navLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            $isActive={pathname === link.path}
            onClick={handleLinkClick}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}

        <Footer>
          <NavLink to="/login" onClick={() => { logout(); handleLinkClick(); }}>
            <SignOut />
            <p>Sair</p>
          </NavLink>
        </Footer>
      </NavLinkContainer>
    </Container>
  );
}
