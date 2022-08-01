import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findASpot } from "../../store/spots";
import { spotDelete } from "../../store/spots";
import "./spotDetail.css";
import SpotReviews from "./spotReviews";

const SpotsDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = Number(spotId);

  const spot = useSelector((state) => state.spots[spotId]);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!spot) {
      dispatch(findASpot(spotId));
    }
  }, [dispatch, spotId, spot]);

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

  return (
    spot && (
      <>
        <div className="SpotsDetail">
            <div className="SpotHeader">{spot.name} </div>
              <img
            className="SpotDetailImg"
            src={spot.previewImage}
            alt={spot.name}
           ></img>

          <p className="detailLocation">
            {spot.city}, {spot.state}
          </p>
          </div>

          <div className="SpotInformation" >
          <div className="detailDescription">Description: {spot.description}</div>
          <div className="detailPrice">Price: ${spot.price} night</div>
          </div>

          <div className="PawRating">

          <p>
                  {" "}
                  Average rating:
                  {Number(spot.avgStarRating) > 0 ? (
                    <span> {Number(spot.avgStarRating).toFixed(1)} / 5</span>
                  ) : (
                    <span> No reviews</span>
                  )}
          </p>
          </div>
            <div className="line"></div>
  
          {sessionUser &&
            sessionUser.user &&
            sessionUser.user.id === spot.ownerId && (
              <div className="spotEdits">
                <button onClick={handleEditClick}>Edit Spot</button>
                <button onClick={handleDelete}>Delete Spot</button>
              </div>
            )}
        <div className = "reviewButton">
          <button onClick={handleCreateReview}>Create Review</button>

        </div>
        <div>
          <SpotReviews spotId={spotId}/>
        </div>
      </>
    )
  );
};

export default SpotsDetail;
