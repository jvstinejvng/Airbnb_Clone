import React, { useState,useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findASpot } from "../../store/spots";
import { spotDelete } from "../../store/spots";
import SpotReviews from "./spotReviews";
import StarReviews from "./PawReviews";
import  ReviewFormModal  from "../CreateReview";

import "../CSS/ListingDetail.css";

const ListingDetails = () => {

  const [ModalReview, setModalReview] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = Number(spotId);

  const listing = useSelector((state) => state.spots[spotId]);
  const sessionUser = useSelector((state) => state.session.user);


  useEffect(() => {
    if (!listing) {
      dispatch(findASpot(spotId));
    }
  }, [dispatch, spotId, listing]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(spotDelete(spotId));
    history.push("/");
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    history.push(`/spots/${spotId}/edit`);
  };


  return (
    listing && (
    <>
      <div className="ListingPage">
        <div>
          {(<ReviewFormModal ModalReview={ModalReview} setModalReview={setModalReview}/>)}
        </div>

        <div className="ListingDetails">
          
          <div class="ListingTitle">
            <h2>{listing.name}</h2>
            <div className="PawRating"><StarReviews spot={listing} /></div>
            <div className="ListingLocation"> {listing.city}, {listing.state}, {listing.country} </div>
          </div>

          <div className="ListingPhotos">
            <img src={listing.previewImage} alt={listing.name}></img>
          </div>

          <div className="ListHost">
            <h2>Pet Care by {listing.ownerId}</h2>
          </div>

          <div className="Line"></div>

          <div className="ListingPrice">${listing.price} <span className="Text-Night">night</span></div>
          <div className="DetailDescription">{listing.description}</div>

          <div className="Line"></div>

        </div>

          {sessionUser && sessionUser.id === listing.ownerId && (
              <div>
                  <button className="ListingButton" onClick={handleEditClick}> Edit </button>
                  <button className="ListingButton" onClick={handleDelete}> Delete </button>
              </div>
          )}
        
          {sessionUser && (
              <div className = "ReviewButton">
                <NavLink onClick={()=> setModalReview(true)} to={`/spots/${spotId}`} >CreateReview</NavLink>
              </div>
          )}
  
          <div className="ListingReviews">
            <SpotReviews spotId={spotId}/>
          </div>


      </div>
    </>
    )
  );
};

export default ListingDetails;
