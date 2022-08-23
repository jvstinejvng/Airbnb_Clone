import { Modal } from '../../context/Modal';
import CreateReview from './CreateReview'

function ReviewModal ({ModalReview,setModalReview, onClose}) {

  return (
    <>
      {ModalReview && (
          <Modal onClose={() => setModalReview(false)}>
            <CreateReview ModalReview={ModalReview} setModalReview={setModalReview} /> 
            <button onClick={onClose}> </button>
          </Modal>

      )}
    </>
  );
}

export default ReviewModal;
