import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './LoginForm.css'

function LoginForm({ LoginModal, setLoginModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(()=>setLoginModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='formPage'>
      <button type="button" className="closeModalButton"
      onClick={()=>{setLoginModal(!LoginModal)}}>
      <i className="fas fa-xmark" />
      </button>
    <form onSubmit={handleSubmit} className='loginFormBox'>
      <div>
        <h2>Petbnb Log in</h2>
      </div>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>

      <div className='userInputField'>
      <label>
        Email
        <input
          id='input'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          />
      </label>
      </div>

      <div className='userInputField'>
      Password
      <label>
        <input
          id='input'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      </div>
      <p>
      <button id='loginButton' type="submit">Continue</button>
      </p>
    </form>
    </div>
  );
}

export default LoginForm;
