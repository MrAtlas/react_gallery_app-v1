import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Nav = ({ changeQuery }) => {

  let navigate = useNavigate();

  const handleNavLinkClick = (tag) => {
    changeQuery(tag); 
    //navigate(`search/${tag}`); 
  };

  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="search/cats" onClick={() => handleNavLinkClick('cats')}>
            Cats
          </NavLink>
        </li>
        <li>
          <NavLink to="search/dogs" onClick={() => handleNavLinkClick('dogs')}>
            Dogs
          </NavLink>
        </li>
        <li>
          <NavLink to="search/computers" onClick={() => handleNavLinkClick('computers')}>
            Computers
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
