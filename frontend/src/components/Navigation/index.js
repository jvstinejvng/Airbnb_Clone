import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function NavigationBar({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
      <div className='NavBar'>

        <div className='logoLeft'>
          <NavLink className='logoSite' exact to="/">
          <img src={require('../../assets/Petbnb.png')} alt='Petbnb Logo' />
          <div className='PetbnbText'>Petbnb</div>
          </NavLink>
        </div>

        {isLoaded && (<ProfileButton user={sessionUser} />)}

      </div>
  );
}

export default NavigationBar;
