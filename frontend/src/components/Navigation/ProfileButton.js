import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory, Redirect, Route, useLocation } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LoginFormModal from "../LoginForm";
import SignupFormModal from "../SignupForm";
import { login } from "../../store/session";

function ProfileButton({ user }) {

  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [LoginModal, setLoginModal] = useState(false)
  const [ModalSignup, setModalSignup] = useState(false)


// Menu Open -------------------------
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
// ------------------------------------


  const handleDemoClick = () => {
      dispatch(login({
        credential: 'DemoUser',
        password: 'password'
      }))
      .then(() => setShowMenu(false))
      .then(() => {
        if ('/') {
          history.push('/')
        }
      })  }
     
    const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout())
      .then(() => {
        if ('/spots/current') {
          history.push('/')
        }
        if ('/spots/host') {
          history.push('/')
        }
      })
      .then(()=>setShowMenu(false));
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
    {!user && (
      <>
      <button className="demoUser" onClick={handleDemoClick}>Demo User</button>
      </>
    )}
    {user && (<NavLink className='hostButton' to='/spots/host'>Become a Host</NavLink>)}
      <button className="navButtonRight" onClick={openMenu}>
      <i className="fas fa-bars"/> <i className="fas fa-user-circle"/>
      </button>
      {showMenu && (
        <div className="DropDownMenu">
        <div className="navMenuRight">
          {!user && (
            <>
            <div className="menuLink-background"><NavLink className="menuLink" onClick={()=> setLoginModal(true)} to=''>Log In</NavLink><p/></div>
            <div className="menuLink-background"><NavLink className="menuLink" onClick={()=> setModalSignup(true)} to=''>Sign Up</NavLink></div>
          </>
          )}
          {user && (
          <>
          <div className="userRightMenu">
          <div className="menutext">{user.email}</div>
          </div>
          <p/>
          <div>
          <NavLink className="menuLink" to='/' onClick={logout}>Log out</NavLink><br/>
          </div>
          </>
          )}
        </div>
        </div>
      )}
    </div>
    </>
  );
}

export default ProfileButton;
