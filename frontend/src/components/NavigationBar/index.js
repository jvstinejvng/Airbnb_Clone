import React from 'react'
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';

import '../CSS/NavigationBar.css'

function NavigationBar({ isLoaded, setFilterRooms, setCategory }) {

  return (
    <>
      <nav className="main-nav">
        <div className="navigation-outer">
          <div className='navigation-bar'>
            <NavLink exact to="/" className="nav-link home-link">
              <span className="iconify" data-icon="fa-brands:airbnb" data-width="40"></span>
              <span className='airbnb-name' onClick={() => { setFilterRooms([]); setCategory(null) }}></span>
            </NavLink>
            <SearchBar />
            {isLoaded && <ProfileButton />}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavigationBar;
