import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { listAllBookings, getAllBookings, bookingDelete, updateBooking } from "../../store/bookings";
import NavigationBar from "../NavigationBar";
import { listAllUsers } from "../../store/users";

import "../CSS/UserBookings.css"

const UserBookings = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

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

  const trips = allBookings.filter(booking => sessionUser.id === booking.userId)
  const futureTrips = trips.filter(trip => new Date() <= new Date(trip.endDate)).sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
  const pastTrips = trips.filter(trip => new Date() > new Date(trip.endDate)).sort((a, b) => new Date(b.startDate) - new Date(a.startDate))

  const allStartDates = bookingsPerSpot.map(booking => booking.startDate)
  const allEndDates = bookingsPerSpot.map(booking => booking.endDate)

  let today = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })

  useEffect(() => {

    dispatch(listAllBookings())
    dispatch(listAllUsers())

    const errors = []

    if (today > new Date(checkIn)) {
      errors.push("Cannot modify current booking")
    }

    if (checkIn === checkOut)
      errors.push("Reservations must be a minimum of 1 day")
    else if (new Date(checkIn) > new Date(checkOut))
      errors.push("Check-in date must be prior to check-out date")

    for (let i = 0; i < allStartDates.length; i++) {
      let startReq = new Date(checkIn);
      let endReq = new Date(checkOut);
      let startRes = new Date(allStartDates[i]);
      let endRes = new Date(allEndDates[i]);

      if ((startReq >= startRes && startReq < endRes) ||
        (endReq > startRes && endReq <= endRes) ||
        startRes >= startReq && startRes < endReq ||
        endRes > startReq && endRes <= endReq)
        errors.push("Selected dates conflict with an existing booking")
      else if (startRes === startReq)
        errors.push("Check-in date conflicts with an existing booking")
      else if (endRes === endReq)
        errors.push("Check-out date conflicts with an existing booking")
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
    <div className="trips-outer">
      <div className="trips-nav-main">
        <NavigationBar isLoaded={isLoaded} />
      </div>
      <div className="navigation-border"></div>
      {sessionUser ?
        <div className="trips-page">
          <div className="trips-main-div">
            <div className="trips-header">Trips</div>
            {futureTrips.length > 0 ? <></> : <div className="main-no-trips">
              <div className="outer-no-trips">
                <div className="wave-icon">
                  <svg xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '50px', width: '50px', fill: 'rgb(227, 28, 95)', stroke: 'currentcolor' }} width={58} height={58}><g stroke="none" fill="#E31C5F"><path d="M15.629 22.596l-2.735 2.801a2 2 0 0 1-2.792.07L7.554 22.67c-.73 2.89-1.162 4.807-1.295 5.75-.134.942-.213 1.72-.238 2.334-.005.238.013.6.056 1.086.17 1.21.515 2.33 1.011 3.333 1.825 3.69 5.47 5.748 8.949 5.869 3.31.115 5.517-.794 8.313-3.48l2.715-2.752-11.436-12.214z" opacity=".2" fill="#E31C5F" /><path d="M28.207 9.793c.469.468.79 1.028.965 1.622l.62-.622a3.828 3.828 0 0 1 5.755 5.026 3.829 3.829 0 0 1 1.81 6.23l-1.77 1.78c.452.133.885.351 1.272.655l.348.309a3.828 3.828 0 0 1 .154 5.252l-10.437 10.56c-1.044.935-1.74 1.522-2.086 1.76-1.884 1.375-3.787 2.15-6.1 2.464-.723.155-1.868.196-3.432.123-7.054-.575-12.678-6.198-13.257-13.25-.146-2.892.572-6.85 2.153-11.876 1.019-3.917 1.793-6.789 2.323-8.616.239-1.315 2.137-1.414 3.72-.754l.327.15c1.867.933 2.87 2.808 2.462 5.299l-.735 4.381L22.793 9.793a3.828 3.828 0 0 1 5.414 0zm-3.877 1.302L12.836 22.578c4.186 4.427 4.186 11.502-.204 16.054l-1.414-1.414c3.64-3.642 3.708-9.504.153-13.28L9.93 22.343l1.09-6.54c.351-1.752-.204-2.84-1.341-3.409-.34-.18-.777-.286-1.31-.317-1.986 7.282-3.228 11.911-3.726 13.886-.422 1.887-.634 3.556-.634 5.01.235 6.32 5.165 11.443 11.405 11.98 1.127.058 2.14.024 3.039-.104 1.998-.271 3.588-.919 5.221-2.11.613-.33 4.653-4.311 12.12-11.946a1.828 1.828 0 0 0-2.463-2.698l-6.057 6.045-1.362-1.467 9.882-9.88a1.829 1.829 0 0 0 .203-2.345l-.203-.24a1.828 1.828 0 0 0-2.586 0l-9.785 9.784-1.363-1.467 11.734-11.732a1.829 1.829 0 0 0 .203-2.345l-.203-.24a1.829 1.829 0 0 0-2.463-.113L19.57 23.844l-1.362-1.467 8.586-8.584a1.829 1.829 0 0 0 .112-2.463l-.235-.235a1.829 1.829 0 0 0-2.34 0zM47 17v2h-5v-2h5zM42.293 4.293l1.414 1.414-4 4-1.414-1.414 4-4zM31 1v5h-2V1h2z" fill="#E31C5F" /></g></svg>
                </div>
                <div className="no-trips-header">No trips booked...yet!
                </div>
                <div className="no-trips-caption">Time to dust off your bags and start planning your next adventure</div>
                <div className="no-trips-search-button">
                  <Link to="/">
                    <button type="button" className="start-search-button">Start searching</button>
                  </Link>
                </div>
              </div>
            </div>}
            {futureTrips.length > 0 ? <div className="res-header">Upcoming bookings</div> : <></>}
            <form onSubmit={handleSubmit}>
              {futureTrips?.map((booking, i) => {

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
                    {
                      showEdit ? editBookings === booking.id ?
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
              {pastTrips?.map((booking, i) => {

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
