import React, { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserSpots } from "../../store/spots";
import "./currentUser.css"

const UserSpots = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const spotsList = useSelector((state) => Object.values(state.spots));

  const handleClick = (spot) => {
    history.push(`/spots/${spot.id}`);
  };

  useEffect(() => {
    dispatch(getCurrentUserSpots()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    <div className="userSpotPage">
        <h2>My Listings</h2>
    <div className="detailSpot">
      {loaded &&
        spotsList.map((spot) => (
          <div  key={spot.id} onClick={() =>handleClick(spot)}>
            <div>
              <h4 className="detailUserName">{spot.name}</h4>
              <img
                className="detailUserImg"
                src={spot.previewImage}
                alt={spot.name}
              ></img>
              <h3 className="detailLocation">
                {spot.city}, {spot.state}
              </h3>
              <p className="detailUserDescription">{spot.description}</p>
              <p className="detailUserPrice">${spot.price} night</p>
            </div>
          </div>
        ))}
    </div>
    </div>
  );
};

export default UserSpots;
