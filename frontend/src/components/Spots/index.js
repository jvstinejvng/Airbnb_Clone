import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import { loadReviews } from "../../store/reviews";
import "./spots.css";
import StarReviews from "../SpotDetail/PawReviews";


const SpotsPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state?.spots));
  const reviews = useSelector((state) => Object.values(state.reviews))

  const spotsString = JSON.stringify(spots);
  const reviewsString = JSON.stringify(reviews);

  useEffect(() => {
    getAllSpots(dispatch);
  }, [dispatch, spotsString]);

  useEffect(() => {
    dispatch(loadReviews());
  }, [dispatch, reviewsString]);



  
  return (
    <div className="SpotListPage">
      {spots &&
        spots.map((spot) => (
          <div key={spot.id}>
            <NavLink to={`/spots/${spot.id}`}>
              <div className="OneSpotContainer">
                <img
                  className="SpotImage"
                  src={spot.previewImage}
                  alt={spot.name}
                ></img>
                 <div className="PawRating">
                <StarReviews spot={spot} />
              </div>
                <h4 className="SpotLocation">
                  {spot.city}, {spot.state}
                </h4>
                <p className="SpotDescription">{spot.description}</p>
                <p className="SpotPrice"> ${spot.price} night</p>

              </div>
            </NavLink>
          </div>
        ))}
    </div>
  );
};

export default SpotsPage;
