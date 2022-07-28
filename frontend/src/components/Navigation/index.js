import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <div>
        <ProfileButton user={sessionUser} />
      </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
      <div id='NavMenuRight'>
        <div id='loginButton'> <LoginFormModal /></div>
        <div id='signUp'><NavLink to="/signup">Sign Up</NavLink> </div>
      </div>
      </>
    );
  }

  return (
    <nav>
        <div className='NavigationBarLeft'>
        <div class='siteLogo'>
            <NavLink exact to='/' className='logoSite'>
              <img src={require('../../assets/Petbnb.png')} alt='Petbnb Logo' />
              <div className='PetbnbText'>petbnb</div>
            </NavLink>
        </div>
            {isLoaded && sessionLinks}
      </div >
    </nav >
  );
}

export default Navigation;