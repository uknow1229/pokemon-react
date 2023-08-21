import React from 'react';
// import './Navbar.css';
import styled from 'styled-components';

const StyledNavbar = styled.nav`
  background-color: rgb(255, 214, 137);
  color: white;
  height: 65px;
  font-weight: 600;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Navbar = () => {
  return <StyledNavbar>ポケモン図鑑</StyledNavbar>;
};

export default Navbar;
