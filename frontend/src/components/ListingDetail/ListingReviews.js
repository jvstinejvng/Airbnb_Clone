import React, {useState, useEffect} from 'react';
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loadReviews } from '../../store/reviews';

import  ReviewFormModal  from "../CreateReview";


const SpotReviews = ({spotId}) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviews));
  const sessionUser = useSelector((state) => state.session.user);
  const [ModalReview, setModalReview] = useState(false)


  useEffect(() => {
      dispatch(loadReviews(spotId));
  }, [dispatch, spotId])

    return (
     
      <div >

        <div>
          {(<ReviewFormModal ModalReview={ModalReview} setModalReview={setModalReview}/>)}
        </div>

        <h3>Reviews</h3>
        <div className="UserReview">
        {reviews.map((reviewState, i) => {

          return (
            <div className="ListingReviews">
              <span className="ReviewUser" >{`${reviewState.User.firstName}`}</span>
              <span className="ReviewText">{`${reviewState.review}`}</span>
            </div>
          )
        })
        }
        </div>

        {sessionUser && (
            <div className = "CreateReviewButton">
              <NavLink className = "CreateReviewText" onClick={()=> setModalReview(true)} to={`/spots/${spotId}`}>Create Review</NavLink>
            </div>
        )}

      </div>
    
    )


};

export default SpotReviews;
