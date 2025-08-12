import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Container,
  Content,
  HeaderLink,
  LinkContainer,
  Logout,
  Navigation,
  Options,
  Profile,
  HeaderLinkMenu,
  HeaderLinkCart,
  MobileButton,
  MobileMenu,
  MobileItem,
  Hamburger
} from "./styles";

import { UserCircle, ShoppingCart } from '@phosphor-icons/react';
import { useUser } from '../../hooks/UserContext';
import { useCart } from '../../hooks/CartContext';
import { api } from '../../services/api';

export function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation(); // <-- useLocation para pegar o pathname atual
  const { cartProducts } = useCart();
  const { logout, userInfo } = useUser();

  const [orders, setOrders] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    async function getUserStorage() {
      try {
        const { data } = await api.get("/orders");
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao buscar orders:", err);
        setOrders([]);
      }
    }
    getUserStorage();
  }, []);

  // fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  // quando muda de rota, fecha o menu
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  function LogoutUser() {
    logout();
    navigate('/login');
  }

  // determina se há pedidos não finalizados (ajusta conforme a shape do seu backend)
  const hasPending = Array.isArray(orders) && orders.some(o => o?.status && o.status !== 'Pedido finalizado');

  return (
    <Container>
      <Content>
        <Navigation>
          <div className="desktop-links">
            <HeaderLinkMenu to="/" $isActive={pathname === '/'}>Home</HeaderLinkMenu>
            <hr />
            <HeaderLinkMenu to="/cardapio" $isActive={pathname === '/cardapio'}>Cardápio</HeaderLinkMenu>
            <HeaderLinkMenu to="/status" $isActive={pathname === '/status'} $isStatus={hasPending}>Status do pedido</HeaderLinkMenu>
          </div>

          {/* botão mobile (aparece apenas em <=768px) */}
          <MobileButton
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen(v => !v)}
          >
            <Hamburger $open={menuOpen}><span/><span/><span/></Hamburger>
          </MobileButton>

          {/* menu mobile */}
          <MobileMenu ref={menuRef} $open={menuOpen} id="mobile-menu" role="menu">
            <MobileItem to="/" $isActive={pathname === '/'} onClick={() => setMenuOpen(false)}>Home</MobileItem>
            <MobileItem to="/cardapio" $isActive={pathname === '/cardapio'} onClick={() => setMenuOpen(false)}>Cardápio</MobileItem>
            <MobileItem to="/status" $isActive={pathname === '/status'} $isStatus={hasPending} onClick={() => setMenuOpen(false)}>Status do pedido</MobileItem>
          </MobileMenu>
        </Navigation>

        <Options>
          <LinkContainer>
            {
              cartProducts?.length >= 1 ?
                <HeaderLinkCart to="/carrinho"><ShoppingCart color="#ff3205" size={24} /></HeaderLinkCart>
                : <HeaderLinkCart to="/carrinho"><ShoppingCart color="#fff" size={24} /></HeaderLinkCart>
            }
            <HeaderLink to="/carrinho">Carrinho</HeaderLink>
          </LinkContainer>

          <Profile>
            <UserCircle color="#fff" size={24} />
            <div>
              <p>Olá, <span>{userInfo?.name}</span> </p>
              <Logout onClick={LogoutUser}>Sair</Logout>
            </div>
          </Profile>
        </Options>
      </Content>
    </Container>
  );
}
