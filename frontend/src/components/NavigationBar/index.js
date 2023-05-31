import React from 'react'
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';

import '../CSS/NavigationBar.css'
import PetbnbLogo from '../../assets/Petbnb.png'

function NavigationBar({ isLoaded, setFilterSpots, setCategory }) {

  return (
    <>
      <nav className='main-navbar'>
        <div className='navbar-container'>
          <div className='navbar'>
            <NavLink exact to='/' className='navbar-home-link'>
              <span className='petbnb-logo'> <img src={PetbnbLogo} alt='petbnb logo' width='40' height='40'></img></span>
              <span className='petbnb-name' onClick={() => { setFilterSpots([]); setCategory(null) }}>petbnb</span>
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
