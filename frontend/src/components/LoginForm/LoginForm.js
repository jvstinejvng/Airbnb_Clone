import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';

import '../CSS/SignUpInForm.css'

function LoginForm({setLoginModal, LoginModal}) {
  const dispatch = useDispatch();
  const [email, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ email, password }))
    .then(()=>setLoginModal(false))
    .catch(
        async (res) => {
            const data = await res.json();
            if (data) setErrors(data);
        }
    );
    };

  const DemoUserLogin = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({
        email: 'demo@demo.io',
        password: 'password',
    }))
    .then(()=>setLoginModal(false))
    .catch(
            async (res) => {
                const data = await res.json();
                if (data) setErrors(data);
            }
    );
  }

return (
    <div className='FormPage'>
    <div className="LoginSignupText">
      <button type="button" className="ModalClose" onClick={()=>{setLoginModal(!LoginModal)}}>
      <span className="XIcon">&#10005;</span>
    </button>
    Log in or sign up
    </div>
    
    <form onSubmit={handleSubmit} >
    <div  className="WelcomeText">
      <h2>Welcome to Petbnb</h2>
    </div>
    <div className="InputField">
    <ul>
      {errors.message}
    </ul>
    <div className='userInputField'>
    <label>
      Email
      <input
        id='input'
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setCredential(e.target.value)}
        required
        />
    </label>
    </div>
    <div className='userInputField3'>
    Password
    <label>
      <input
        id='input'
        placeholder="Password"
        type="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </label>
    </div>
    </div>
    <div>
    <button className='FormButton' type="submit">Continue</button>
    </div>
    <div>
    <button className="FormButton" onClick={DemoUserLogin}>Demo User</button>
    </div>
  </form>
  </div>
);
}

export default LoginForm;
