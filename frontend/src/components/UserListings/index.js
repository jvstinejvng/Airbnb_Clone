import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserSpots } from "../../store/spots";

import "../CSS/UserListings.css"

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
    <div className="MyListingContainer">
      <h2>Review your listings</h2>
      <div className="AllMyListing">
        {loaded &&
          spotsList.map((spot) => (
            <div
              className="MyListings"
              key={spot.id}
              onClick={() => handleClick(spot)}
            >
              <div className="MyIndividualListing">
                <div className="MyListingTitle" >
                  <span className="MyListingDetials" >{spot.name}</span>
                  <span  className="MyListingDetials" >{spot.city}, {spot.state}</span>
                </div>
                <img
                  className="UserListingImg"
                  src={spot.previewImage}
                  alt={spot.name}
                ></img>
                {/* <p className="DetailDescription">{spot.description}</p> */}
                {/* <p className="ListingPrice">${spot.price} night</p> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserSpots;
