import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Nav = ({ setQuery }) => {
  let navigate = useNavigate();

  const handleNavLinkClick = (tag) => {
    setQuery(tag); 
    navigate(`search/${tag}`); 
  };

  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="cats" onClick={() => handleNavLinkClick('cats')}>
            Cats
          </NavLink>
        </li>
        <li>
          <NavLink to="dogs" onClick={() => handleNavLinkClick('dogs')}>
            Dogs
          </NavLink>
        </li>
        <li>
          <NavLink to="computers" onClick={() => handleNavLinkClick('computers')}>
            Computers
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
