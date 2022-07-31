import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm'

function formsSignupModal({ModalSignup, setModalSignUp}) {

  return (
    <>
      {ModalSignup && (
        <Modal onClose={() => setModalSignUp(false)}>
          <SignupForm ModalSignup={ModalSignup} setModalSignUp={setModalSignUp} />
        </Modal>
      )}
    </>
  );
}

export default formsSignupModal;
