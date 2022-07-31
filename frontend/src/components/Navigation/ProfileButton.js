import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, Redirect, Route, useLocation } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LoginFormModal from "../LoginForm";
import SignupFormModal from "../SignupForm";

function ProfileButton({ user }) {

  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const [LoginModal, setLoginModal] = useState(false)
  const [ModalSignup, setModalSignup] = useState(false)

  const sessionUser = useSelector(state => state.session.user);

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
    <div className="navRight">
      { sessionUser && <NavLink className='hostButton' to='/spots/create'>Become a Pet Host</NavLink> }
        <button className="navButtonRight" onClick={openMenu}>
          <i className="fas fa-bars"/> <i className="fas fa-user-circle"/>
          </button>
      
      {showMenu && (
        <div className="DropDownMenu">
        <div className="navMenuRight">
            <div><NavLink className="menuLink" onClick={()=> setLoginModal(true)} to=''>Log In</NavLink><p/></div>
            <div><NavLink className="menuLink" onClick={()=> setModalSignup(true)} to=''>Sign Up</NavLink></div>
    
          { sessionUser && (
            <div className="logoutbutton" >
            <NavLink  className="menuLink" to='/' onClick={logout}>Log Out</NavLink>
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
