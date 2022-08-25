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
    <div className='formPage'>
      <button
      type="button"
      className="modalClose"
      onClick={()=>{setLoginModal(!LoginModal)}}>
      <i className="fas fa-xmark" />
      </button>
  
    <form onSubmit={handleSubmit} className='loginFormBox'>
      <div>
        <h2>Petbnb Log in</h2>
      </div>
      <ul>
        {errors.message}
      </ul>
      <div className='userInputField'>
      <label>
        Email
        <input
          id='input'
          type="text"
          value={email}
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
