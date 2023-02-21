// frontend/src/components/SignupForm/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import * as sessionActions from '../../../store/session';
import LoginForm from "../LoginForm/LoginForm";
import "../../CSS/SignupForm.css"

function SignupForm({ setShowSignUp }) {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showLogIn, setShowLogIn] = useState(false)

  if (sessionUser) {
    setShowSignUp(false)
    // return <Redirect to="/" />
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors)
            if (data) {
              const errors = Object.values(data.errors)
              setErrors(errors)
            }
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
      {showLogIn ? <LoginForm setShowLogIn={setShowLogIn} /> : <form onSubmit={handleSubmit} className="signUp-form">
        <div>
          <h2 className="signUp-header">Welcome to WhereBnb</h2>
        </div>
        <label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div className="signUp-outer-errors">
          {errors.length > 0 && (<ul>
            {errors.map((error, idx) => <li className="errors-signUp" key={idx}>{error}</li>)}
          </ul>)}
        </div>
        <button className="signUp-button" type="submit">Sign Up</button>
        <div className='or-outer'>
          <span className='or-border'></span>
          <span>&nbsp; or &nbsp;</span>
          <span className='or-border'></span>
        </div>
        <button type='button' onClick={() => setShowLogIn(true)} className='login-register-button'>Log In</button>
      </form>}
    </>
  );
}

export default SignupForm;
