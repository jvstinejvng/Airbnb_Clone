import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSpotById } from "../../store/spots";
import "./SpotDetail.css"

const SpotsDetail = () => {
  let { spotId } = useParams();
  spotId = Number(spotId);

  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots[spotId]);
  
  useEffect(() => {
    dispatch(getSpotById(spotId));
  }, [dispatch, spotId]);

  return (
    <div key={spot.id}>
      <h4 className="spotName">{spot.name}</h4>
      <img className="spotImg" src={spot.previewImage} alt={spot.name}></img>
      <h3 className="spotLocation">
        {spot.city}, {spot.state}
      </h3>
      <p className="spotDescription">{spot.description}</p>
      <p className="SpotPrice">${spot.price} night</p>
    </div>
  );
};

export default SpotsDetail;
