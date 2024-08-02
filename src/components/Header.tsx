import React from 'react';
import { Navbar } from 'react-bootstrap';
import catSymbol from '../images/cat_symbol.avif';

interface HeaderProps {
  onHeaderClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHeaderClick }) => (
  <Navbar bg="light" className="my-4" onClick={onHeaderClick} style={{ cursor: 'pointer' }}>
    <Navbar.Brand>
      <img
        src={catSymbol}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="Cat Symbol"
      />
      {' '}
      My Webapp
    </Navbar.Brand>
  </Navbar>
);

export default Header;
