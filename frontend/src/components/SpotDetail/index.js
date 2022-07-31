import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { spotDelete } from "../../store/spots";
import { loadAllReviewsThunk } from "../../store/reviews";

import "./spotDetail.css";

const SpotsDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const spots = useSelector((state) => state.spots);
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviews));

  const spotsString = JSON.stringify(spots);
  const reviewsString = JSON.stringify(reviews);

  useEffect(() => {
    getAllSpots(dispatch);
  }, [dispatch, spotsString]);

  useEffect(() => {
    dispatch(loadAllReviewsThunk());
  }, [dispatch, reviewsString]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(spotDelete(spotId));
    history.push("/");
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    history.push(`/spots/${spotId}/edit`);
  };

  const handleCreateReview = (e) => {
    e.preventDefault();
    history.push(`/spots/${spotId}/createReview`);
  };

  //If reviews is undefined, it will run forEach on an empty array.
  let spot = spots[spotId];
  const allReviewsForThisSpot = reviews.filter((review) => {
    return review.spotId === spotId;
  });
  let allStars = 0;
  (allReviewsForThisSpot || []).forEach((review) => {
    allStars += review.stars;
  });
  const avgStarRating = allStars / allReviewsForThisSpot.length;

  const userReviewForThisSpot = reviews.filter((review) => {
    return review.userId === sessionUser.user.id && review.spotId === spotId
  });

  return (
    spot && (
      <>
        <div>
          <div className="detailName">{spot.name} </div>
          <img
            className="detailImg"
            src={spot.previewImage}
            alt={spot.name}
          ></img>
          <h3 className="detailLocation">
            {spot.city}, {spot.state}
          </h3>
          <p className="avgStarRating">
            Average Star Rating: {avgStarRating.toFixed(2)}
          </p>
          <p className="detailDescription">Description: {spot.description}</p>
          <p className="detailPrice">Price: ${spot.price} night</p>
          {sessionUser &&
            sessionUser.user &&
            sessionUser.user.id === spot.ownerId && (
              <div>
                <button onClick={handleEditClick}>Edit Spot</button>
                <button onClick={handleDelete}>Delete Spot</button>
              </div>
            )}
        </div>
        <div>
          {!userReviewForThisSpot.length && (
            <button onClick={handleCreateReview}>Create Review</button>
          )}
        </div>
        <div className="spotsReviews">
          {allReviewsForThisSpot.map((review) => (
            <div key={review.id}>
              <div className="eachReview">
                <h3 className="reviewName">Reviews: {review.review}</h3>
                <div className="reviewStars">Stars: {review.stars}</div>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  );
};

export default SpotsDetail;
