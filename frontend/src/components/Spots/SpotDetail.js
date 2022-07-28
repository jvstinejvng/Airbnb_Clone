import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSpotById } from "../../store/spots";
import "./SpotDetail.css";

const SpotsDetailPage = () => {
  const { spotId: id } = useParams();

  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots[id]);

  useEffect(() => {
    dispatch(getSpotById(id));
  }, [dispatch, id]);

  return (
    <div >
      <h4 className="spotName">{spot.name}</h4>
      <img className="spotImgage" src={spot.previewImage} alt={spot.name}></img>
      <h3 className="spotLocation">
        {spot.city}, {spot.state}
      </h3>
      <p className="spotDescription">{spot.description}</p>
      <p className="spotPrice">${spot.price} night</p>
      
    </div>
  );
};

export default SpotsDetailPage;

