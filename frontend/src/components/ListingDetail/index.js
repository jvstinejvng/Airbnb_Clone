import React, { useState,useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { findASpot,spotDelete } from "../../store/spots";
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


  const spot = useSelector((state) => state.spots[+spotId]);
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


  return (
    spot && (
    <>
      <div className="ListingPage">
        <div>
          {(<ReviewFormModal ModalReview={ModalReview} setModalReview={setModalReview}/>)}
        </div>

        <div className="ListingDetails">
          
          <div class="ListingHeader">
            <h2>{spot.name}</h2>   
              <div className="ListSubTitle">
              <span className="PawRating"><PawReviews spot={spot}/> • </span>
              <span className="NumberOfReviews"></span> 
              <span className="PerListingLocation"> {spot.city}, {spot.state}, {spot.country} </span>
              </div>
          </div>

          <div className='ImageGrid'>
                        <img className='ListingPreviewLargeImg' src={spot.previewImage} alt={spot.id} />
                        <div className='ListingSideImg'>
                            {spot.images && (spot.images.map((url, index) => index === 0 && 
                            ( <img key={index} className='MiddleImgs' src={url.url} alt={spot.id} /> )))}
                            {spot.images && (spot.images.map((url, index) => index === 1 && 
                            ( <img key={index} className='RightSideImg' src={url.url} alt={spot.id} /> )))}
                            {spot.images && (spot.images.map((url, index) => index === 2 && 
                            ( <img key={index} className='MiddleImgs' src={url.url} alt={spot.id} /> )))}
                            {spot.images && (spot.images.map((url, index) => index === 3 && 
                            ( <img key={index} className= 'RightSideImg' src={url.url} alt={spot.id} /> )))}
                        </div>
                    </div>
          <div className="ListHost">
            <h3>Full service pet care by {spot.ownerId}</h3>
            <div className="ListingPrice">${spot.price} 
              <span className="Text-Night">night</span>
            </div>
          </div>

          <div className="Line"></div>

          <div className="DetailDescription">{spot.description}</div>

          {/* <div className="Line"></div> */}

        </div>

        {sessionUser && sessionUser.id === spot.ownerId && (
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
