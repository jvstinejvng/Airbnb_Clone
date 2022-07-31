import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({LoginModal, setLoginModal, onClose}) {

  return (
    <>

      {LoginModal && (
        <Modal onClose={() => setLoginModal(false)}>
          <LoginForm LoginModal={LoginModal} setLoginModal={setLoginModal} />
          <button onClick={onClose}> </button>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;