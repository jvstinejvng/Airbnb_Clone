import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "../CSS/SignUpInForm.css"


function SignupFormPage({ModalSignup, setModalSignup}) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        setErrors([]);
        return dispatch(sessionActions.signup({ email, firstName, lastName, password }))
            .then(()=>setModalSignup(false))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
};

    return (
      <div className='formPage'>
        <button type="button" className="modalClose" onClick={()=>{setModalSignup(!ModalSignup)}}>
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required />
          </label>
        </div>
        <button type="submit" className="FormButton">Continue</button>
      </form>
      </div>
  );
}

export default SignupFormPage;
