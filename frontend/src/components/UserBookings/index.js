import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { listAllUsers } from "../../store/users";
import { listAllBookings, getAllBookings, bookingDelete, updateBooking } from "../../store/bookings";
import NavigationBar from "../NavigationBar";
import "../CSS/UserBookings.css"

const UserBookings = ({ isLoaded }) => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const sessionUser = useSelector(state => state.session.user);

  const allBookings = useSelector(getAllBookings)
  const [bookingId, setBookingId] = useState()
  const [spotId, setSpotId] = useState()
  const [checkIn, setCheckIn] = useState(new Date().toISOString().slice(0, 10))
  const [checkOut, setCheckOut] = useState(new Date().toISOString().slice(0, 10))
  const [editBookings, setEditBookings] = useState(0)
  const [showEdit, setShowEdit] = useState(false)
  const [bookingErrors, setBookingErrors] = useState([])
  const [checkDates, setCheckDates] = useState(true)

  const tomorrow = new Date()
  const nextDay = new Date()

  tomorrow.setHours(tomorrow.getHours() + 7)
  nextDay.setHours(nextDay.getHours() + 31)

  const bookingsPerSpot = allBookings.filter(booking => booking.spotId === spotId && sessionUser.id !== booking.userId)

  const reservations = allBookings.filter(booking => sessionUser.id === booking.userId)
  const futureReservations = reservations.filter(reservation => new Date() <= new Date(reservation.endDate)).sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
  const pastReservations = reservations.filter(reservation => new Date() > new Date(reservation.endDate)).sort((a, b) => new Date(b.startDate) - new Date(a.startDate))

  const allStartDates = bookingsPerSpot.map(booking => booking.startDate)
  const allEndDates = bookingsPerSpot.map(booking => booking.endDate)

  let today = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })

  useEffect(() => {

    dispatch(listAllBookings())
    dispatch(listAllUsers())

    const errors = []

    if (today > new Date(checkIn)) {
      errors.push("The current reservation cannot be modified at this time")
    }

    if (checkIn === checkOut)
      errors.push("Reservations must have a minimum duration of one night")
    else if (new Date(checkIn) > new Date(checkOut))
      errors.push("The check-in date must be earlier than the checkout date")

    for (let i = 0; i < allStartDates.length; i++) {

      let startReq = new Date(checkIn);
      let endReq = new Date(checkOut);
      let startRes = new Date(allStartDates[i]);
      let endRes = new Date(allEndDates[i]);

      if ((startReq >= startRes && startReq < endRes) ||
        (endReq > startRes && endReq <= endRes) ||
        startRes >= startReq && startRes < endReq ||
        endRes > startReq && endRes <= endReq)
        errors.push("The selected dates overlap with an existing booking")
      else if (startRes === startReq)
        errors.push("The selected check-in date is in conflict with an existing booking")
      else if (endRes === endReq)
        errors.push("The selected checkout date is in conflict with an existing booking")
    }

    if (errors.length > 0) {
      setBookingErrors(errors)
      setCheckDates(true)
    } else {
      setBookingErrors([])
      setCheckDates(false)
    }

  }, [dispatch, checkIn, checkOut])

  const handleDelete = (bookingId) => async (e) => {
    e.preventDefault()
    const response = await dispatch(bookingDelete(bookingId))

    if (response) {
      setShowEdit(false)
      dispatch(listAllBookings())
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const bookingData = {
      bookingId,
      userId: sessionUser.id,
      spotId,
      startDate: checkIn,
      endDate: checkOut
    }

    const updatedBooking = await dispatch(updateBooking(bookingData))
    setShowEdit(false)
    dispatch(listAllBookings())
    dispatch(listAllBookings(spotId))

  }

  return (
    <div className="user-bookings-main">
      <div className="users-booking-nav-bar">
        <NavigationBar isLoaded={isLoaded} />
      </div>
      <div className="nav-border"></div>
      {sessionUser ?
        <div className="user-bookings-page">
          <div><h1>Trips</h1>
            {futureReservations.length > 0 ? <></> : <div className="main-no-trips">
              <div className="no-trips-header">No trips booked...yet!</div>
                <div className="no-trips-caption">Time to dust off your bags and start planning your next adventure</div>
                  <div className="no-trips-search-button">
                    <Link to="/">
                      <button type="button" className="start-search-button">Start searching</button>
                    </Link>
                  </div>
              </div>
            }
            {futureReservations.length > 0 ? <div className="res-header">Upcoming bookings</div> : <></>}
              <form onSubmit={handleSubmit}>
                {futureReservations?.map((booking, i) => {

                  let startDate = new Date(booking?.startDate)
                  startDate = new Date(startDate.getTime() + startDate.getTimezoneOffset() * 60000)

                  const startMonth = startDate.toLocaleString('default', { month: 'short' })
                  const startDay = startDate.getDate()

                  let endDate = new Date(booking?.endDate)
                  endDate = new Date(endDate.getTime() + endDate.getTimezoneOffset() * 60000)
                  const endMonth = endDate.toLocaleString('default', { month: 'short' })
                  const endDay = endDate.getDate()
                  const endYear = endDate.getFullYear()

                  return (
                    <div className="outer-main">
                      <div key={booking.id} className="main-booking-content">
                        <div className="left-res-content">
                          <div className="left-res-inner">
                            <div className="top-left-res-content">
                              <div className="top-left-name">
                                <div className="booking-listing-name">{booking?.Spot?.name}</div>
                                <div className="bookings-hosted-by">{booking?.Spot?.type} hosted by {users[booking?.Spot?.ownerId]?.firstName}</div>
                              </div>
                            </div>
                              <div className="bottom-left-res-content">
                                <div className="bottom-change-res">
                                  <div className="bottom-dates">
                                    {startMonth === endMonth ? <div className="res-month-day">
                                      <span className="month-res">{startMonth}</span>
                                      <div className="day-res">{' '}{startDay} - {endDay} </div>
                                    </div> :
                                      <div className="res-month-day">
                                        <span className="date-res-other">{startMonth} {startDay} - </span>
                                        <div className="date-res-other">{endMonth} {endDay}</div>
                                      </div>
                                    }
                                    <div className="res-year">{endYear}</div>
                                  </div>
                                  <div className="bottom-edit-res">
                                    <button type="button" onClick={() => { setBookingId(booking?.id); setSpotId(booking?.spotId); setCheckIn(booking?.startDate); setCheckOut(booking?.endDate); setEditBookings(booking?.id); setShowEdit(!showEdit); }} className="res-button">{showEdit ? editBookings === booking.id ? "X" : "Edit" : "Edit"}</button>
                                  </div>
                                </div>
                                <div className="bottom-location">
                                  <div className="res-address">{booking?.Spot?.address}</div>
                                  <div className="res-city-state">{`${booking?.Spot?.city}, ${booking?.Spot?.state}`}</div>
                                  <div className="res-country">{booking?.Spot?.country}</div>
                                </div>
                              </div>
                          </div>
                        </div>
                        <div className="right-res-content">
                          <Link to={`/rooms/${booking.spotId}`}>
                            <img className="res-img" src={`${booking?.Spot?.images[0]?.url}`}></img>
                          </Link>
                        </div>
                      </div>
                      { showEdit ? editBookings === booking.id ?
                        <>
                        <div className={today > new Date(checkIn) ? "hidden" : "update-res-header"}>Change booking:</div>
                          <div className={today > new Date(checkIn) ? "hidden" : "middle-change-res"}>
                            <div className={today > new Date(checkIn) ? "hidden" : "booking-dates-res"}>
                              <div className="check-res" disabled>
                                <label className="check-label-edit">CHECK-IN</label>
                                  <input
                                    type="date"
                                    min={tomorrow.toISOString().split('T')[0]}
                                    className="select-date-res"
                                    value={new Date(checkIn).toISOString().slice(0, 10)}
                                    onChange={(e) => { setCheckIn(new Date(e.target.value).toISOString().slice(0, 10)); setCheckOut(new Date(e.target.value).toISOString().slice(0, 10)) }}
                                  />
                              </div>
                              <div className="check-res">
                                <label className="check-label-edit">CHECKOUT</label>
                                  <input
                                    type="date"
                                    min={new Date(checkIn).toISOString().split('T')[0]}
                                    className="select-date-res"
                                    value={new Date(checkOut).toISOString().slice(0, 10)}
                                    onChange={(e) => setCheckOut(new Date(e.target.value).toISOString().slice(0, 10))}
                                  />
                              </div>
                            </div>
                            <div>
                              <div className="edit-delete-buttons">
                                <button type="submit" className="res-button update-button" disabled={checkDates}>Update Reservation</button>
                                <button type="button" onClick={handleDelete(booking.id)} className="res-button cancel-button" disabled={today > startDate}>Cancel Reservation</button>
                              </div>
                            </div>
                          </div>
                            {bookingErrors.length > 0 && (
                              <>
                                <ul className="ul-res-error">
                                  {bookingErrors.map((error, idx) => <li key={idx} className="res-list-error">{error}</li>)}
                                </ul>
                              </>
                            )}
                        </> : <></> : <></>
                      }
                      </div>
                    )
                  })}
              </form>
            <div className="res-header">Where you've been</div>
              <div className="past-outer-grid">
                {pastReservations?.map((booking, i) => {
                  let startDate = new Date(booking?.startDate)
                  startDate = new Date(startDate.getTime() + startDate.getTimezoneOffset() * 60000)
                  const startMonth = startDate.toLocaleString('default', { month: 'short' })
                  const startDay = startDate.getDate()

                  let endDate = new Date(booking?.endDate)
                  endDate = new Date(endDate.getTime() + endDate.getTimezoneOffset() * 60000)
                  const endMonth = endDate.toLocaleString('default', { month: 'short' })
                  const endDay = endDate.getDate()
                  const endYear = endDate.getFullYear()

                  return (
                    <div className="past-outer-main">
                      <div className="past-left-content">
                        <Link to={`/rooms/${booking.spotId}`}>
                          <img className="past-res-img" src={`${booking?.Spot?.images[0]?.url}`}></img>
                        </Link>
                      </div>
                      <div className="past-right-content">
                        <div className="past-res-city-state">{`${booking?.Spot?.city}, ${booking?.Spot?.state}`}</div>
                        <div className="past-res-hosted-by">Hosted by {users[booking?.Spot?.ownerId]?.firstName}</div>
                        <div className="past-bottom-dates">
                          {startMonth === endMonth ? <div className="past-res-month-day">
                            <span className="past-month-res">{startMonth} {startDay}-{endDay}, {endYear} </span>
                          </div> :
                            <div className="past-res-month-day">
                              <span className="past-date-res-other">{startMonth} {startDay}-{endMonth} {endDay}, {endYear}</span>
                            </div>}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
          </div >
        </div > : <>
          <div className="no-session-user">
            Error 401 - Unauthorized
            <div className="no-session-inner">
              Please login to continue
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default UserBookings;
