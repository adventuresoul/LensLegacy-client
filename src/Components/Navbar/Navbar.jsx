import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="Nav">
      <nav className="navbar">
         <div className="logo">
         <Link to="/" className="logo-link">
            <p>lensLegacy</p>
          </Link>
        </div>
        <ul className="menu">
          <li>
            <Link to="/">
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link to="/profile">
                <p>Profile</p>
            </Link>
          </li>

        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
