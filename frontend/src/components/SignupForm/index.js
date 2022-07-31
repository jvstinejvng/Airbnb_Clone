import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm'

function SignupModal ({ModalSignup, setModalSignup, onClose}) {

  return (
    <>
      {ModalSignup && (
          <Modal onClose={() => setModalSignup(false)}>
            <SignupForm ModalSignup={ModalSignup} setModalSignup={setModalSignup} /> 
            <button onClick={onClose}> </button>
          </Modal>

      )}
    </>
  );
}

export default SignupModal;
