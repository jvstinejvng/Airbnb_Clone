import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";

import "../CSS/UserReviews.css";

const CreateReview = ({ModalReview,setModalReview}) => {
  const dispatch = useDispatch();
  let { spotId} = useParams();
  spotId = Number(spotId);

  const [reviewText, setreviewText] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (submitSuccess) {
    return <Redirect to={`/spots/${spotId}`} />;
  }

  const validations = () => {
    const errors = [];
    if (reviewText.length < 5)
      errors.push("Review character count must be 5 or greater");
    if (stars > 5 || stars < 1)
      errors.push("Please enter a number from 1 to 5 stars");
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      review: reviewText,
      stars: stars,
    };

    const errors = validations();
    if (errors.length) {
      setErrors(errors);
      return;
    }
    return dispatch(reviewActions.createReviews(spotId, data)).then(
      async (res) => {
        setSubmitSuccess(true);
        setModalReview(false);
      }
    );
  };


  return (
    <div class="Reviews">
    <form className="SpotsReview" onSubmit={handleSubmit}>
    <div>
          <h2>Tell Us About Your experience</h2>
        </div>
        {errors ?? (
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      )}
      <div class="text">
      <label className="userInputField">
        Message:
        <input 
          type="text"
          placeholder="Review Message"
          value={reviewText}
          onChange={(e) => setreviewText(e.target.value)}
          required
        />
      </label>
      <label className="userInputField" >
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