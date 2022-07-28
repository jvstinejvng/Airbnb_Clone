import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import CreateReview from "./CreateReview";
import allSpotReviews from "../../store/reviews";
import removeReview from "../../store/reviews";

const ReviewContainer = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const spotReviews = useSelector((state) => Object.values(state.review));

  spotReviews.forEach((review) => {
    let date = new Date(review.createdAt);
    review.createdAt = date.toDateString();
  });


  useEffect(() => {
    dispatch(getReviews(id));
  }, [dispatch, id]);

   
  return (
    <div className="review-container">
      <div className="border">
        {spotReviews.map((review) => (
          <div key={review.id} className="session-review">
            <div className="user-name">
              <i className="fas fa-user-alt fa-1x" />
              <h3 className="name">{review.User?.username}</h3>
            </div>
            <div className="stardate">
              {review.rating === 1 ? (
                <i className="fas fa-star" />
              ) : review.rating === 2 ? (
                <div>
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
              ) : review.rating === 3 ? (
                <div>
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
              ) : review.rating === 4 ? (
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
            <div className="reviewbody" key={review.reviewBody}>
              {review?.reviewBody}
            </div>
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
