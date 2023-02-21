import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from "react-router-dom";
import * as sessionActions from '../../store/session';

import { Modal } from '../../context/Modal';
import SignUpFormPage from '../UserForms/SignupForm'
import LoginForm from "../UserForms/LoginForm/LoginForm";

import '../CSS/ProfileButton.css'

function ProfileButton() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const users = useSelector(state => Object.values(state.users))

  let userDetails
  if (sessionUser) userDetails = users.filter((user) => user.id === sessionUser.id)

  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogIn, setShowLogIn] = useState(false)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/")
  };

  return (
    <>
      <div>
        <div>
          <div className="profile-button-div">
            <button onClick={openMenu} className="profile-button">
              <div className="profile-icons">
                <svg xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', margin: '0 10px 0 5px', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 3, overflow: 'visible' }} width={32} height={32}><g fill="none" fillRule="nonzero" stroke="#222222" strokeWidth="3px"><path d="m2 16h28" stroke="#222222" fill="none" strokeWidth="3px" /><path d="m2 24h28" stroke="#222222" fill="none" strokeWidth="3px" /><path d="m2 8h28" stroke="#222222" fill="none" strokeWidth="3px" /></g></svg>
                {sessionUser && userDetails[0]?.profile_url ? <img src={userDetails[0].profile_url} className='user-profile-icon'></img> : <svg xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', margin: '1px', height: '100%', width: '100%', fill: 'currentcolor' }} width={32} height={32}><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z" fill="#717171" /></svg>}
              </div>
            </button>
          </div>
          {showMenu && !sessionUser && (
            <div className="show-menu-div">
              <div className="profile-dropdown">
                <span className="login-dropdown" onClick={() => setShowLogIn(true)}>
                  <span>Log In</span>
                </span>
                <span className="signup-dropdown" onClick={() => setShowSignUp(true)}>
                  <span>Sign Up</span>
                </span>
              </div>
            </div>
          )}
          {showLogIn && (
            <Modal onClose={() => setShowLogIn(false)}>
              <LoginForm setShowLogIn={setShowLogIn} />
            </Modal>
          )}
          {showSignUp && (
            <Modal onClose={() => setShowSignUp(false)}>
              <SignUpFormPage setShowSignUp={setShowSignUp} />
            </Modal>
          )}
          {showMenu && sessionUser && (
            <div className="show-menu-div">
              <div className="profile-dropdown">
                <div className="account-div">
                  {sessionUser.email}
                </div>
                <Link to="/bookings" className="link trips">Trips</Link>
                <Link to="/yourlistings" className="link manage-listings">Manage Listings</Link>
                <Link to="/becomeahost" className="link host-home">Host your home</Link>
                <div className="logout-div" onClick={logout}>Log Out</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileButton;
