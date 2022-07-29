import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { allSpotReviews } from "../../store/reviews";
import CreateReview from "./CreateReview";
import { removeReview } from "../../store/reviews";

const ReviewContainer = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const spotReviews = useSelector((state) => Object.values(state.review.spotId));

  spotReviews.forEach((review) => {
    let date = new Date(review.createdAt);
    review.createdAt = date.toDateString();
  });

  const handleDelete = (id) => {
    dispatch(removeReview(id));
  };

  useEffect(() => {
    dispatch(allSpotReviews(id));
  }, [dispatch, id]);

  
  return (
    <div className="review-container">
      <div className="border">
        {spotReviews.map((review) => (
          <div key={review.id} className="session-review">
            <div className="user-name">
               <i className="fas fa-user-alt fa-1x" />
                <h3 className="name">{review.User?.firstName}</h3>
            </div>
            <div className="stardate">
              {review.stars === 1 ? (
                <i className="fas fa-star" />
              ) : review.stars === 2 ? (
                <div>
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
              ) : review.stars === 3 ? (
                <div>
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
              ) : review.stars === 4 ? (
                <div>
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
              ) : (
                <div>
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
              )}
            </div>
            <div className="date" key={review.createdAt}>
              {review?.createdAt}
            </div>
            <div className="reviewbody" key={review.review}>
              {review?.review}
            </div>
              <button
                className="delete-review-button"
                onClick={() => handleDelete(review.id)}
              >
                Delete
              </button>
          </div>
        ))}
      </div>
      <div className="create-review-container">
        <h2 className="review-div">Write a review!</h2>
        <CreateReview />
      </div>
    </div>
  );
};

export default ReviewContainer;
