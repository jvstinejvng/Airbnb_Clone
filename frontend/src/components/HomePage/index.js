import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { getAllSpots } from "../../store/spots";
import PawReviews from "../ListingDetail/PawReviews";

import "../CSS/HomePage1.css";

const SpotsPage = () => {

  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state?.spots));
  const spotsString = JSON.stringify(spots);


  useEffect(() => {
    getAllSpots(dispatch);
  }, [dispatch, spotsString]);

  

  return (
    <div className="AllListings">
      {spots &&
        spots.map((spot) => (
          <div key={spot.id}>
            <NavLink to={`/spots/${spot.id}`}>
              <div className="PerListing" >
                <img
                  className="ListingImage"
                  src={spot.previewImage}
                  alt={spot.name}
                >

                </img>

              <div className="ListingTitle">

                <span className="ListingLocation">
                  {spot.city}, {spot.state}
                </span>

                <span className="HomepagePawRating">
                <PawReviews spot={spot} />
                </span>

                </div>

                <p className="ListingDescription">{spot.description}</p>
                <p className="HomepageListingPrice"> ${spot.price} <span className="HomepageNightText">night</span></p>

              </div>
            </NavLink>
          </div>
        ))}
    </div>
  );
};

export default SpotsPage;
