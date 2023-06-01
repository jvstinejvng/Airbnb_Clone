import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";

import { addNewReview, updateReview } from "../../store/reviews";
import { findSpotById } from "../../store/spots";
import '../CSS/CreateReview.css'

const CreateReview = ({ setShowReview, editReview, setEditReview, reviewId }) => {
  let { spotId } = useParams()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const reviews = useSelector(state => state.reviews)
  const [userId, serUserId] = useState(sessionUser?.id)
  const [stars, setStars] = useState(0)
  const [review, setReview] = useState("")
  const [ratedStar1, setRatedStar1] = useState(false)
  const [ratedStar2, setRatedStar2] = useState(false)
  const [ratedStar3, setRatedStar3] = useState(false)
  const [ratedStar4, setRatedStar4] = useState(false)
  const [ratedStar5, setRatedStar5] = useState(false)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    const errors = []

    if (stars === 0) errors.push('Please rate your stay from 1 to 5 stars')
    if (review?.length < 10 || review?.length > 290) errors.push('Review must be between 10 and 290 characters')

    if (errors.length > 0) setErrors(errors)
    else setErrors([])

  }, [stars, review])

  useEffect(() => {
    if (editReview) {
      changeReviewStars(reviews[reviewId]?.stars)
      setReview(reviews[reviewId]?.review)
    }
  }, [])

  const changeReviewStars = (num) => {
    if (num >= 1) {
      setStars(1)
      setRatedStar1(true)
      setRatedStar2(false)
      setRatedStar3(false)
      setRatedStar4(false)
      setRatedStar5(false)
    }
    if (num >= 2) {
      setStars(2)
      setRatedStar2(true)
    }
    if (num >= 3) {
      setStars(3)
      setRatedStar3(true)
    }
    if (num >= 4) {
      setStars(4)
      setRatedStar4(true)
    }
    if (num >= 5) {
      setStars(5)
      setRatedStar5(true)
    }
  }

  const handleWriteReview = async (e) => {
    e.preventDefault()

    if (errors.length > 0) return

    if (editReview) {

      const reviewData = {
        reviewId,
        userId,
        stars,
        review
      }

      const editReviewResponse = await dispatch(updateReview(reviewData))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(Object.values(data.errors))
          }
        })

      if (editReviewResponse) {
        dispatch(findSpotById(spotId))
        setEditReview(false)
        setShowReview(false)
      }

    } else {

      const reviewData = {
        userId,
        spotId,
        stars,
        review
      }

      const reviewResponse = await dispatch(addNewReview(reviewData))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(Object.values(data.errors))
          }
        })

      if (reviewResponse) {
        dispatch(findSpotById(spotId))
        setShowReview(false)
      }
    }

  }

  return (
    <>
      <form onSubmit={handleWriteReview} className='review-form'>
        <div className="review-return-outer">
          <button className="review-return-button" onClick={() => setShowReview(false)}>Return to Listing</button>
        </div>
        <div className="review-header">How was your stay?</div>
        <div className="review-star-rating">
          <div className="rating-review-header">Overall experience*</div>
          <i className={ratedStar1 ? "fa-solid fa-paw rated-true" : "fa-solid fa-paw rated-false"} onClick={() => changeReviewStars(1)} alt='star'></i>
          <i className={ratedStar2 ? "fa-solid fa-paw rated-true" : "fa-solid fa-paw rated-false"} onClick={() => changeReviewStars(2)} alt='star'></i>
          <i className={ratedStar3 ? "fa-solid fa-paw rated-true" : "fa-solid fa-paw rated-false"} onClick={() => changeReviewStars(3)} alt='star'></i>
          <i className={ratedStar4 ? "fa-solid fa-paw rated-true" : "fa-solid fa-paw rated-false"} onClick={() => changeReviewStars(4)} alt='star'></i>
          <i className={ratedStar5 ? "fa-solid fa-paw rated-true" : "fa-solid fa-paw rated-false"} onClick={() => changeReviewStars(5)} alt='star'></i>
        </div>
        <div>
          <div className="review-content-header">Share your story*</div>
          <div className="review-content-caption">The best reviews are helpful ones</div>
          <textarea
            type='text'
            className="review-text"
            value={review}
            onChange={e => setReview(e.target.value)}
            maxLength={291}
          />
        </div>
        {errors.length > 0 && (<>
          <div className="review-error-message-outer">
            {errors.map((error, i) => <div className="review-error-message" key={i}>*{error}</div>)}
          </div>
        </>
        )}
        <div className="review-submit-outer">
          <button className="review-submit-button">{editReview ? "Update" : "Submit"}</button>
        </div>
      </form>
    </>
  )
}

export default CreateReview
