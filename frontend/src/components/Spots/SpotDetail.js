import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { allSpotReviews } from "../../store/reviews";
import Reviews from '../Reviews';

import "./SpotDetail.css";

const SpotsDetailPage = () => {

  const dispatch = useDispatch();
  const { id } = useParams();

  const spot = useSelector((state) => state?.spot[id]);

  useEffect(() => {
    dispatch(allSpotReviews(id));
  }, [dispatch, id]);


  return (
    
      <div>
      <h4 className="spotName">{spot.name}</h4>
      <img className="spotImgage" src={spot.previewImage} alt={spot.name}></img>
      <h3 className="spotLocation">
        {spot.city}, {spot.state}
      </h3>
      <p className="spotDescription">{spot.description}</p>
      <p className="spotPrice">${spot.price} night</p>
      
      <Reviews />

    </div>
  );
};

export default SpotsDetailPage;

