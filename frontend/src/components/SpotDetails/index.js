import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findASpot } from "../../store/spots";

const SpotDetail = () => {
    let { spotId } = useParams();
    spotId = Number(spotId);
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots);
  
    useEffect(() => {
      dispatch(findASpot(spotId));
    }, [dispatch, spotId]);
  
    return (
      <div>
        <div key={spot.id}>
          <h3>{spot.name}</h3>
          <h4>
            {spot.city}, {spot.state}
          </h4>
          <div>{spot.images}</div>
          <p>{spot.description}</p>
          <p> Price: ${spot.price}</p>
        </div>
      </div>
  
    );
  };
  

export default SpotDetail;