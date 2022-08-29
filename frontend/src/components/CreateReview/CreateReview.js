import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";

import "../CSS/UserReviews.css";
import "../CSS/CreateReview.css";


const CreateReview = ({ModalReview,setModalReview}) => {
  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const [reviewMessage, setReviewMessage] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (submitSuccess) {
    return <Redirect to={`/spots/${spotId}`} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      review: reviewMessage,
      stars: stars,
    };
    return dispatch(reviewActions.createReviews(spotId, data))
      .then(async (res) => {
        setSubmitSuccess(true);
        setModalReview(false)
      })
      .catch(async (res) => {
        const error = await res.json();
        if (error) setErrors([error.message]);
      });
  };

  return (
    <div className="Reviews">
    <form className="ReviewForm" onSubmit={handleSubmit}>
    <div>
          <h2>Tell us about your experience</h2>
        </div>
        {errors ?? (
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      )}
      <div className="ReviewInputContainer">
      <label className="ReviewInputField">
        Message:
        <input 
          type="text"
          placeholder="Review Message"
          value={reviewMessage}
          onChange={(e) => setReviewMessage(e.target.value)}
          required
        />
      </label>
      <label className="ReviewInputField" >
        Stars:
        <input
          type="text"
          placeholder="Rating"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          required
        />
      </label>
      </div>
      <div>
      <button className="ReviewFormButton" type="submit" >Create Review</button>
      </div>
    </form>

    </div>
  );
};

export default CreateReview;