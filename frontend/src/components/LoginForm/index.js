import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({LoginModal, setLoginModal}) {

  return (
    <>
      {LoginModal && (
        <Modal onClose={() => setLoginModal(false)}>
          <LoginForm LoginModal={LoginModal} setLoginModal={setLoginModal} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
