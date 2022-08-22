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
     
      <div className='all-reviews-div'>
        <h2>Reviews</h2>
        {reviews.map((reviewState, i) => {

          return (
            <div>
            <p className='review'>{`${reviewState.review}`}</p>
            <p className='stars'>{`${reviewState.stars} stars`}</p>

            </div>
          )
        })
        }

      </div>
    
    )


};

export default SpotReviews;
