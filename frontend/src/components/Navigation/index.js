import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function NavigationBar(){
  const sessionUser = useSelector(state => state.session.user);


    let sessionLinks;
    if(sessionUser){
      sessionLinks = (
       <ProfileButton user={sessionUser} />
      )
    } else {
      sessionLinks = (
        <ProfileButton />
       )
    }
    
  return (
    <>
      <div className='NavBar'>
        
        <div className='logoLeft'>
          <NavLink className='logoSite' exact to="/">
          <img src={require('../../assets/Petbnb.png')} alt='Petbnb Logo' />
          <div className='PetbnbText'>Petbnb</div>
          </NavLink>

        </div>
        <ul className='nav-menu'>
                    <li className='nav-link'>
                        {sessionLinks}
                    </li>
                </ul>
    
      </div>
    </>
  );
}

export default NavigationBar;
