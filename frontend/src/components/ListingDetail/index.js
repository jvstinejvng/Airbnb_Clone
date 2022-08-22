import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findASpot } from "../../store/spots";
import { spotDelete } from "../../store/spots";
import "./spotDetail.css";
import SpotReviews from "./spotReviews";
import StarReviews from "./PawReviews";


const SpotsDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = Number(spotId);

  const spot = useSelector((state) => state.spots[spotId]);
  const sessionUser = useSelector((state) => state.session.user);


  useEffect(() => {
    if (!spot) {
      dispatch(findASpot(spotId));
    }
  }, [dispatch, spotId, spot]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(spotDelete(spotId));
    history.push("/");
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    history.push(`/spots/${spotId}/edit`);
  };

  const handleCreateReview = (e) => {
    e.preventDefault();
    history.push(`/spots/${spotId}/createReview`);
  };

  

  return (
    spot && (
      <>
         <div className="rating">
        

        <div className="SpotsDetail">
          <div class="SpotBox">
            <div className="SpotHeader">{spot.name} </div>
            </div>
            <div className="SpotDetailImg">
              <img
            src={spot.previewImage}
            alt={spot.name}
            className="SpotDetailImg"
           ></img>
           </div>

          <p className="detailLocation">
            {spot.city}, {spot.state},  {spot.country}
          </p>
          </div>
          <div className="SpotInformation" >
          <div className="detailDescription">Description: {spot.description}</div>
          <div className="detailPrice">Price: ${spot.price} night</div>
          </div>
          <div className="Paw">
          <StarReviews spot={spot} />
        </div>

          </div>
            <div className="line"></div>
  
            {sessionUser && sessionUser.id === spot.ownerId && (
                  <div className="reviewButton">
                    <button className="editButton" onClick={handleEditClick}> Edit </button>
                    <button className="deleteButton" onClick={handleDelete}> Delete </button>
                  </div>
                )}
        
        {sessionUser && (<div className = "reviewButton">
          <button onClick={handleCreateReview}>Create Review</button>
        </div>)}
    
  
        <div>
          <SpotReviews spotId={spotId}/>
        </div>


      </>
    )
  );
};

export default SpotsDetail;
