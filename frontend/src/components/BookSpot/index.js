import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAllBookings, getSpotBookings, getNewBooking } from "../../store/bookings";
import { Modal } from "../../context/Modal";
import LoginForm from "../UserForms/LoginForm/LoginForm";

import "../CSS/BookSpot.css"

const BookSpot = ({ spotId, avgStarRating, checkIn, setCheckIn, checkOut, setCheckOut, selectDate, setSelectDate }) => {
  const spot = useSelector((state) => state.spots[spotId])
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const history = useHistory()

  const currRoomReservations = useSelector(getAllBookings)

  const [bookingErrors, setReservationErrors] = useState([])
  const [checkOwner, setCheckOwner] = useState(false)
  const [showReservations, setShowReservations] = useState(false)
  const [showLogIn, setShowLogIn] = useState(false)

  useEffect(() => {
    dispatch(getSpotBookings(spotId))

    const errors = []

    if (sessionUser?.id === spot?.ownerId) {
      setCheckOwner(true)
      errors.push("Hosts can't reserve their own listings")
    }

    if (errors.length > 0) {
      setReservationErrors(errors)
    }

  }, [dispatch, checkIn, checkOut])


  const numDays = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 3600 * 24))
  const cleaningFee = Math.floor(spot?.price / 5)
  const serviceFee = Math.floor(spot?.price / 8)

  const handleSubmit = async (e) => {
    e.preventDefault()
    let bookingData

    if (typeof checkIn === 'string') {
      bookingData = {
        userId: sessionUser.id,
        spotId,
        startDate: checkIn,
        endDate: checkOut
      }
    } else {
      bookingData = {
        userId: sessionUser.id,
        spotId,
        startDate: new Date(checkIn).toISOString().slice(0, 10),
        endDate: new Date(checkOut).toISOString().slice(0, 10)
      }
    }

    console.log(bookingData)

    dispatch(getNewBooking(bookingData))
      .then(() => { history.push("/bookings") })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) { setReservationErrors(Object.values(data.errors)); }
        else if (data) {
          const errors = []
          errors.push(data.message)
          setReservationErrors(errors)
        }
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="booking-main">
          <div className="reserve-details">
            <div className="reserve-price">{`$${spot?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
            <span>night</span>
            <span className="reserve-rating">
              <i className="fa-solid fa-star smaller"></i>
              {avgStarRating}</span>
            <span className="span-separator-smaller">·</span>
            <span className="reserve-review" onClick={() => { document.getElementById('reviews').scrollIntoView() }}>{`${spot?.Reviews ? spot.Reviews.length : 0} reviews`}</span>
          </div>
          <div>
            <div className="booking-dates">
              <div className="check-in">
                <label className="check-label">CHECK-IN</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="select-date"
                  value={new Date(checkIn).toISOString().slice(0, 10)}
                  onChange={(e) => {
                    setCheckIn(new Date(e.target.value)); setCheckOut(new Date(e.target.value)); setSelectDate(!selectDate)
                  }}
                  disabled={true}
                />
              </div>
              <div className="check-out">
                <label className="check-label">CHECKOUT</label>
                <input
                  type="date"
                  min={new Date(checkIn).toISOString().split('T')[0]}
                  className="select-date"
                  value={new Date(checkOut).toISOString().slice(0, 10)}
                  onChange={(e) => { setCheckOut(new Date(e.target.value)); setSelectDate(!selectDate) }}
                  disabled={true}
                />
              </div>
            </div>
            {showReservations ?
              (<div className="outer-list-booking">
                {currRoomReservations.length > 0 ? currRoomReservations.map(booking => {
                  return (
                    <div key={`${booking.id}`} className="list-bookings-div">
                      <div className="inner-list-div">
                        <div key={`start${booking.id}`} className="view-start">{booking.startDate}</div>
                        <div key={`to${booking.id}`} className="view-to">to</div>
                        <div key={`end${booking.id}`} className="view-end">{booking.endDate}</div>
                      </div>
                    </div>
                  )
                }) : <></>}
              </div>) : <></>}
            <div className="reserve-button-div">
              {sessionUser ?
                <button type="submit" className="reserve-button" disabled={checkOwner}>{checkOwner ? "Unable to Reserve" : "Reserve"}</button> : <button className="reserve-button" onClick={() => { setShowLogIn(true) }}>Log In to Reserve</button>
              }
              {bookingErrors.length > 0 && (
                <ul className="res-error-ul-host">
                  {bookingErrors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
              )}
            </div>
          </div>
          <div className="fee-warning">
            <div>You won't be charged yet</div>
          </div>
          <div className="total-fees">
            <div className="top-fees">
              <div className="fee-label">
                <div className="each-fee">{`$${spot?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} x ${numDays}`} {numDays > 1 ? "nights" : "night"}</div>
                <div className="each-fee">Cleaning Fee</div>
                <div className="each-fee">Service Fee</div>
              </div>
              <div className="fee-price">
                <div className="fee-number">{`$${(numDays * spot?.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                <div className="fee-number">{`$${cleaningFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                <div className="fee-number">{`$${serviceFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
              </div>
            </div>
            <div className="total-fees-bottom">
              <div className="total-each-fee">Total before taxes</div>
              <div className="total-fee-number">{`$${((numDays * spot?.price) + cleaningFee + serviceFee).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
            </div>
          </div>
        </div>
      </form >
      {
        showLogIn && (
          <Modal onClose={() => setShowLogIn(false)}>
            <LoginForm setShowLogIn={setShowLogIn} />
          </Modal>
        )
      }
    </>
  )
}

export default BookSpot
