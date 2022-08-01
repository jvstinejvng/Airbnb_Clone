import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import "./spotDetail.css";


const CreateReview = () => {
  const dispatch = useDispatch();
  let { spotId} = useParams();
  spotId = Number(spotId);

  const [reviewText, setReviewMessage] = useState("");
  const [stars, setStars] = useState("");

  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (submitSuccess) {
    return <Redirect to={`/spots/${spotId}`} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let review = {
      review: reviewText,
      stars: stars,
    };
    return dispatch(reviewActions.createReviews(spotId, review))
      .then(async (res) => {
        setSubmitSuccess(true);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (

    <div class="Reviews">

    <form className="SpotsReview" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div class="">
      <label className="userInputField">
        Message:
        <input 
          type="text"
          placeholder="Review Message"
          value={reviewText}
          onChange={(e) => setReviewMessage(e.target.value)}
          required
        />
      </label>
      <label>
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
      <button className="FormButton" type="submit">Create Review</button>
      
    </form>
    </div>
  );
};

export default CreateReview;
