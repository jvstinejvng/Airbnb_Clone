import React, { useState,useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findASpot } from "../../store/spots";
import { spotDelete } from "../../store/spots";

import SpotReviews from "./ListingReviews";
import PawReviews from "./PawReviews";
import  ReviewFormModal  from "../CreateReview";

import "../CSS/ListingDetail.css";

const ListingDetails = () => {

  const [ModalReview, setModalReview] = useState(false);
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
          
          <div class="ListingHeader">
            <h2>{listing.name}</h2>   
              <div className="ListSubTitle">
              <span className="PawRating"><PawReviews spot={listing}/> • </span>
              <span className="NumberOfReviews"></span> 
              <span className="ListingLocation"> {listing.city}, {listing.state}, {listing.country} </span>
              </div>
          </div>

          <div className="ListingPhotoGrid">
            <img  className="MainImage" src={listing.previewImage} alt={listing.name}></img>
          </div>

          <div className="ListHost">
            <h3>Full service pet care by {listing.ownerId}</h3>
            <div className="ListingPrice">${listing.price} 
              <span className="Text-Night">night</span>
            </div>
          </div>

          <div className="Line"></div>

          <div className="DetailDescription">{listing.description}</div>

          {/* <div className="Line"></div> */}

        </div>

        {sessionUser && sessionUser.id === listing.ownerId && (
            <div>
                <button className="ListingButton" onClick={handleEditClick}> Edit </button>
                <button className="ListingButton" onClick={handleDelete}> Delete </button>
            </div>
        )}

        <div className="Line2"></div>

        
        <div className="ReviewContainer">


          <div>
            <SpotReviews spotId={spotId}/>
          </div>

          {/* {sessionUser && (
            <div className = "CreateReviewButton">
              <NavLink className = "CreateReviewText" onClick={()=> setModalReview(true)} to={`/spots/${spotId}`}>CreateReview</NavLink>
            </div>
        )} */}

  
        </div>

        <div className="Line2"></div>



      </div>
    </>
    )
  );
};

export default ListingDetails;
