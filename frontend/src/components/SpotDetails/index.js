import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSpotById } from "../../store/spots";
import "./SpotDetail.css"

const SpotsDetail = () => {
  let { spotId } = useParams();
  spotId = Number(spotId);
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots[spotId]);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSpotById(spotId));
  }, [dispatch, spotId]);

  return (
    <div key={spot.id}>
      <h4 className="detailName">{spot.name}</h4>
      <img className="detailImg" src={spot.previewImage} alt={spot.name}></img>
      <h3 className="detailLocation">
        {spot.city}, {spot.state}
      </h3>
      <p className="detailDescription">{spot.description}</p>
      <p className="detailPrice">${spot.price} night</p>
    </div>
  );
};

export default SpotsDetail;
