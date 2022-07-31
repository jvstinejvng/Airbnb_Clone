import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";

const CreateReviews = () => {
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

  const validations = () => {
    const errors = [];
    if (reviewMessage.length < 5) errors.push("Review character count must be 5 or greater")
    if (stars > 5 || stars < 1) errors.push("Please enter a number from 1 to 5 stars")
    return errors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      review: reviewMessage,
      stars: stars,
    };

    const errors = validations();
    if (errors.length) {
      setErrors(errors);
      return;
    }
    return dispatch(reviewActions.createReviews(spotId, data))
      .then(async (res) => {
        setSubmitSuccess(true);
      })
  };

  return (
    <form className="spotsReview" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Message:
        <input
          type="text"
          placeholder="Review Message"
          value={reviewMessage}
          onChange={(e) => setReviewMessage(e.target.value)}
          required
        />
      </label>
      <label>
        Stars:
        <input
          type="number"
          placeholder="Rating"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          required
        />
      </label>
      <button type="submit">Create Review</button>
    </form>
  );
};

export default CreateReviews;