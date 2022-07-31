import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'

function SignupFormPage({  ModalSignup, setModalSignup }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [validatePassword, setvalidatePassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === validatePassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, password, firstName, lastName }))
        .then(()=>setModalSignup(false))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
      }
      return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
      <>
      <button type="button" className="closeModalButton" onClick={()=>{setModalSignup(!ModalSignup)}}>
        <i className="fas fa-xmark" />
      </button>
      <form onSubmit={handleSubmit} className='signupForm'>
        <div>
          <h2>Welcome to Petbnb</h2>
        </div>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="userInputField">
          First Name
          <label>
            <input
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required />
          </label>
        </div>
        <div className="userInputField">
          Last Name
          <label>
            <input
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required />
          </label>
        </div>
        <div className="userInputField">
          Email
          <label>
            <input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </label>
        </div>
        <div className="userInputField">
          Password
          <label>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </label>
        </div>
        <div className="userInputField">
          Confirm Password
          <label>
            <input
              className="CPInput focus-visible"
              placeholder="Confirm Password"
              type="password"
              value={validatePassword}
              onChange={(e) => setvalidatePassword(e.target.value)}
              required />
          </label>
        </div>
        <button type="submit" className="signupButton">Continue</button>
      </form>
    </>
  );
}

export default SignupFormPage;
