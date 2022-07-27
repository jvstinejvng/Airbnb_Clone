import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getSpotById } from "../../store/spots";
import "./SpotDetail.css"


const SpotsDetailPage = () => {

  const { id } = useParams();
   id = Number(id);

  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const spot = useSelector((state) => state.spots[id]);
  
  useEffect(() => {
    dispatch(getSpotById(id));
  }, [dispatch, id]);

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

export default SpotsDetailPage;
