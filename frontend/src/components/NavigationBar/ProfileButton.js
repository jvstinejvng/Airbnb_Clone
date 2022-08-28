import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LoginFormModal from "../LoginForm";
import SignupFormModal from "../SignupForm";


function ProfileButton({ user }) {

  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const [LoginModal, setLoginModal] = useState(false)
  const [ModalSignup, setModalSignup] = useState(false)

const openMenu = () => {
  if (showMenu) return;
  setShowMenu(true);
};

useEffect(() => {
  if (!showMenu) return;

  const closeMenu = () => {
      setShowMenu(false);
  };

  document.addEventListener('click', closeMenu)

  return () => document.removeEventListener("click", closeMenu);
}, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
      .then(() => history.push('/'));
};


  return (
    <>
    {(
      <>
      <LoginFormModal LoginModal={LoginModal} setLoginModal={setLoginModal} />
      <SignupFormModal ModalSignup={ModalSignup} setModalSignup={setModalSignup} />
      </>
    )}
    <div className="NavBarRight-MenuHost">
      { user && 
        <div className='HostButtonText'>
        <NavLink className='HostButtonText' to='/spots/create'>Become a pet sitter</NavLink> 
        </div>
      }
        <button className="DropDownMenuIcon" onClick={openMenu}>
          <i className="fas fa-bars"/> <i className="fas fa-user-circle"/>
          </button>
      
      {showMenu && (
        <div className="DropDownMenu">
        <div className="NavBarShowMenu">
          { !user && (
            <div className="NavBarShowMenu">
                <div className="MenuHighlight">
                <NavLink className="MenuOptionNavLinks" 
                onClick={()=> setLoginModal(true)} to='/'>Log in</NavLink>
                </div>
               <div className="MenuHighlight">
               <NavLink className="MenuOptionNavLinks" 
                onClick={()=> setModalSignup(true)} to='/'>Sign up</NavLink>
                </div>
          
            </div>
            )}     
          { user && (
            <div className="UserMenuNavBar" >
              <div className="MenuHighlight">
                <NavLink  className="MenuOptionNavLinks" to='/user/reviews' >Manage reviews</NavLink><p/>
              </div>
              <div className="MenuHighlight">
                <NavLink  className="MenuOptionNavLinks" to='/users/current/spots'>Manage listings</NavLink><p/>
              </div>
              <div className="MenuBarLine"></div>
              <div className="MenuHighlight">
                <NavLink  className="MenuOptionNavLinks" to='/' onClick={logout}>Log out</NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  </>
  );
}

export default ProfileButton;
