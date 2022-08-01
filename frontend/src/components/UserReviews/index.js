import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReviews, deleteReview} from '../../store/reviews';
import { useHistory } from 'react-router-dom';
import "./userReviews.css"

const Reviews = () => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => Object.values(state.reviews));
    const history = useHistory()
 

    useEffect(() => {
        dispatch(getUserReviews());
    }, [dispatch])


    const deleteReviews = (reviewID) => async (e) => {
      e.preventDefault()
      await dispatch(deleteReview(reviewID))
      await (dispatch(getUserReviews(reviewID)))
      history.push('/user/reviews')
    }



    return (
  

    <div className='all-reviews-div'>
      <div className='header'>
        <h1>Reviews</h1>
      </div>
      <div className='userPage'>
    
      {reviews.map((reviewState) => {
        return (
          <div key={reviewState.id}>
          <div className='review-div'>
          <p className='user'>{`${reviewState.stars} stars`}</p>
          <p className='actual-review'>{`${reviewState.review}`}</p>
          </div>
          <div className="deleteButton">
            <button onClick={deleteReviews(reviewState.id)}>Delete Review</button>
          </div>
          </div>
        )
      })
      }
      </div>
    </div>

  )


};

export default Reviews;
