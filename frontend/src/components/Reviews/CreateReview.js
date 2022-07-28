import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import { addReview, allSpotReviews } from "../../store/reviews";

const CreateReviewPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams();
    const sessionUser = useSelector(state => state.session.user);

    const [star, setStar] = useState(1);
    const [review, setReview ] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const loadReview = {
            userId: sessionUser.id,
            spotId: id,
            star,
            review,
        };

        const createdReview = dispatch(addReview(loadReview, id));
        dispatch(allSpotReviews(id));

        if (createdReview) {
            setStar(1);
            setReview("");
            history.push(`/spots/${id}`);
          }
        };

        useEffect(() => {
            let validateReview = [];
        
            if (star < 1 || star > 5 ) validateReview.push('Paws must be between 1 and 5')
            if (review.length < 5) validateReview.push('Description must be at least 5 characters')
            
            setErrors(errors);

          }, [review]);
        
          useEffect(() => {
            dispatch(allSpotReviews(id));
          }, [dispatch, id, review]);
        
    

    // const resetReview = () => {
    // setStar('')
    // setReview('')
    // setErrors([])
    // }

    // const reviewSubmit = async (e) => {
    //     e.preventDefault()
    //     setErrors([])
    
    //     const validateReview = []
    //     if (star < 1 || star > 5 ) validateReview.push('Paws must be between 1 and 5')
    //     if (review.length < 5) validateReview.push('Description must be at least 5 characters')
    
    //     setErrors(validateReview)
    
    //     if (validateReview.length === 0) {
    //         const userReview = {
    //             userId: sessionUser.id,
    //             spotId: id,
    //             star,
    //             review
    //         }
    
    //         const createdReview = await dispatch(spotActions.addReview(userReview, id))
    //         dispatch(allSpotReviews(id));

    //         resetReview()
    //         history.push(`/spots/${id}`)
    
    //     }
    //   }
    
    //   const newStar = (e) => setStar(e.target.value)
    //   const newReview = (e) => setReview(e.target.value)

    //   return (
    //     <>
    //     <form id='new-review-form' onSubmit={handleSubmit}>
    //         {errors.length > 0 ?
    //             <ul>
    //                 {errors.map((error, idx) => <li key={idx}>{error}</li>)}
    //             </ul> : null}
    //             <div className="form-element">
    //                 <label className="stars">
    //                     Paws
    //                     <input
    //                         type="number"
    //                         min='1'
    //                         max='5'
    //                         value={star}
    //                         onChange={(e) => setStar(e.target.value)}
    //                         required
    //                     />
    //                 </label>
    //             </div>
    //             <textarea
    //                 value={review}
    //                 onChange={(e) => setReview(e.target.value)}
    //                 placeholder="Description"
    //                 rows='10'
    //             />

    //             <button className='edit-post-button' id='new-review-submit-button' type='submit'>Submit Review</button>
    //         </form>
    //     </>
    // );
    
    return (
        <>
          <ul className="form-error">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <form className="create-review" onSubmit={handleSubmit}>
            <label className="rate-label">Rate the Place</label>
            <select
              className="rating-select"
              name="paws"
              value={star}
              onChange={(e) => setStar(e.target.value)}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <div className="review-content">
              <textarea
                rows="10"
                cols="100"
                placeholder="How was your experience?"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
            </div>
            <div>
              <button className="review-button" disabled={!review}>
                Post Review
              </button>
            </div>
          </form>
        </>
      );



}
  


export default CreateReviewPage;
