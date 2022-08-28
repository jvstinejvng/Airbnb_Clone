import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getUserReviews, loadReviews } from "../../store/reviews";
import { deleteReview } from "../../store/reviews";

import "../CSS/UserReviews.css";

function UserReviews() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [isLoaded, setIsloaded] = useState(false);
  const [reviewId, setReviewId] = useState();
  const reviews = useSelector((state) => {
    return Object.values(state.reviews);
  });
  useEffect(() => {
    dispatch(getUserReviews()).then(() => setIsloaded(true));
  }, [dispatch]);

  const handleDeleteClick = (reviewId) => async (e) => {
    e.preventDefault();
    const response = await dispatch(deleteReview(reviewId));
    if (response) {
      history.push(`/user/reviews`);
    }
  };

  return (
    isLoaded && (
      <div> 
        <h1>Reviews by you</h1>
            <div className="ReviewContainer">
                <div className="ReviewHeader">
                 <div className="MyReviews">{reviews?.length > 0 ? "Past reviews you've written!" : "You have not written any reviews yet."}</div>
                 </div>
              <div className="AllReviews" >
                  {reviews?.map((review) => (
                    <div key={review.id} className="EachReview">
                      <h4>Review for {review.Spot.name}</h4>
                      <div>{review.stars} out of 5 Paws</div>
                      <div>{review.review}</div>
                        <div>
                          <button  className="DeleteButton" onClick={handleDeleteClick(review.id)}>Delete this review</button>
                        </div>
                    </div>
                  ))}
              </div>
            </div>
      </div>
    )
  );
}

export default UserReviews;



