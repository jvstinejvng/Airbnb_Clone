import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadReviews } from '../../store/reviews';

const SpotReviews = ({spotId}) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviews));

  useEffect(() => {
      dispatch(loadReviews(spotId));
  }, [dispatch, spotId])

    return (
     
      <div >
        <h3>Reviews</h3>
        <div className="UserReview">
        {reviews.map((reviewState, i) => {

          return (
            <div className="ListingReviews">
              <span className="ReviewUser" >{`${reviewState.userId}`}</span>
              <span className="ReviewPaws">{`${reviewState.stars} paws`}</span>
              <span className="ReviewText">{`${reviewState.review}`}</span>
            </div>

          )
        })
        }
        </div>

      </div>
    
    )


};

export default SpotReviews;
