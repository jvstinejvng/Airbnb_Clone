import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';


import '../CSS/NavigationBar.css';

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
    <nav>
      <div className='NavigationBar'>
        
        <div className='NavBarLeft-Logo'>
          <NavLink className='SiteLogo-NavLeft' exact to="/">
          <img className="Logo" src={require('../../assets/Petbnb.png')} alt='Petbnb Logo' />
          <div className='PetbnbText'>petbnb</div>
          </NavLink>

        </div>
 
                   
       {sessionLinks}

    
      </div>
      </nav>
    </>
  );
}

export default NavigationBar;
