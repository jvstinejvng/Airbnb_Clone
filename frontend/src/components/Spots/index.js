import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import "./spots.css";

const SpotsPage = () => {
  const dispatch = useDispatch();
  const spotsList = useSelector((state) => Object.values(state?.spots));

  useEffect(() => {
    getAllSpots(dispatch);
  }, [dispatch]);

  

  return (
    <div className="spotsPage">
      {spotsList &&
        spotsList.map((spot) => (
          <div key={spot.id}>
            <NavLink to={`/spots/${spot.id}`}>
              <div className="eachSpot">
                <img
                  className="spotImg"
                  src={spot.previewImage}
                  alt={spot.name}
                ></img>
                <h3 className="spotName">{spot.name}</h3>
                <h4 className="spotLocation">
                  {spot.city}, {spot.state}
                </h4>
                <p className="spotAddress">{spot.address}</p>
                <p className="spotDetails">{spot.description}</p>
                <p className="spotPrice"> ${spot.price} night</p>
                <p className="spotStars">Star Rating{spot.avgStarRating}</p>

              </div>
            </NavLink>
          </div>
        ))}
    </div>
  );
};

export default SpotsPage;
