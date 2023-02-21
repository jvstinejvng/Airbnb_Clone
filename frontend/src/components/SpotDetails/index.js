import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { findSpotById, spotDelete } from "../../store/spots";
import { getAllBookings, getSpotBookings } from "../../store/bookings";
import { listAllUsers } from "../../store/users";
import { getAllRoomReviews } from "../../store/reviews";

import Maps from '../Maps'
import Reviews from "../Reviews";
import EditSpot from "../UserSpots/EditSpot";
import BookSpot from "../BookSpot";
import NavigationBar from "../NavigationBar";
import { Modal } from "../../context/Modal";
import { DateRange } from 'react-date-range'

// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file

import "../CSS/SpotDetails.css"

const SpotDetails = ({ isLoaded }) => {
  let { spotId } = useParams()
  spotId = Number(spotId)

  const dispatch = useDispatch()
  const history = useHistory()
  const spot = useSelector((state) => state.spots[spotId])
  const sessionUser = useSelector(state => state.session.user);
  const users = useSelector(state => state.users)
  const [confirmDelete, setConfirmDelete] = useState(false);
  const currRoomReservations = useSelector(getAllBookings)
  const [selectDate, setSelectDate] = useState(false)

  const today = new Date()
  const tomorrow = new Date()
  const nextDay = new Date()

  // tomorrow.setDate(tomorrow.getDate() + 1)
  // nextDay.setDate(nextDay.getDate() + 2)
  tomorrow.setHours(tomorrow.getHours() + 7)
  nextDay.setHours(nextDay.getHours() + 31)

  const [checkIn, setCheckIn] = useState(tomorrow)
  const [checkOut, setCheckOut] = useState(nextDay)
  const [dates, setDates] = useState([
    {
      startDate: tomorrow,
      endDate: nextDay,
      key: 'selection'
    }
  ])

  useEffect(() => {
    if (dates[0].startDate !== tomorrow) {
      setCheckIn(dates[0].startDate.toISOString().slice(0, 10))
      setCheckOut(dates[0].endDate.toISOString().slice(0, 10))
    }
  }, [dates])

  useEffect(() => {
    if (checkIn !== today) {
      setDates([
        {
          startDate: new Date(checkIn),
          endDate: new Date(checkOut),
          key: 'selection'
        }
      ])
    }

  }, [selectDate])

  useEffect(() => {
    dispatch(getSpotBookings(spotId))
    getBookedDates()
  }, [spotId])

  const allStartDates = currRoomReservations.map(booking => booking.startDate)
  const allEndDates = currRoomReservations.map(booking => booking.endDate)

  const getDays = (start, end) => {
    for (var betweenDates = [], date = new Date(start); date <= new Date(end); date.setDate(date.getDate() + 1)) {
      betweenDates.push(new Date(date));
    }
    return betweenDates;
  };

  const getBookedDates = () => {
    let i = 0
    let bookedDates = []
    while (i < allStartDates.length) {
      let allDates = getDays(new Date(allStartDates[i]), new Date(allEndDates[i]));
      allDates.map((date) => date.toISOString().slice(0, 10)).join("")
      bookedDates.push(...allDates)
      i++
    }
    return bookedDates
  }

  const [page, setPage] = useState(1)

  let avgStarRating = spot?.avgStarRating;
  avgStarRating = Math.round(avgStarRating * 100) / 100

  const wholeNumbers = [1, 2, 3, 4, 5]
  if (wholeNumbers.includes(avgStarRating)) avgStarRating = avgStarRating.toString() + ".0"

  const returnToListing = () => {
    setPage(1)
  }

  const handleEdit = (e) => {
    e.preventDefault()
    setPage(2)
  }

  const handleConfirmDelete = () => {
    setConfirmDelete(true)
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    const deleteResponse = await dispatch(spotDelete(spotId))

    if (deleteResponse) {
      history.push('/')
    }
  }

  useEffect(() => {
    dispatch(findSpotById(spotId))
    dispatch(getSpotBookings(spotId))
    dispatch(listAllUsers())
    dispatch(getAllRoomReviews(spotId))
    document.documentElement.scrollTop = 0;

  }, [dispatch])


  return (
    <div className="spot-details-outer">
      <div className="spot-nav-main">
        <NavigationBar isLoaded={isLoaded} />
      </div>
      <div className="navigation-border"></div>
      {page === 1 &&
        <div className="spot-content">
          <div className="main-top">
            <div className="outer-top-content">
              <div className="spot-top-content">
                <div className="spot-header">
                  <div className="spot-name">{spot?.name}</div>
                  <div className="spot-information-top">
                    <span><i className="fa-solid fa-star"></i>{avgStarRating}</span>
                    <span className="span-separator">·</span>
                    <span className="spot-reviews" onClick={() => { document.getElementById('reviews').scrollIntoView() }}>{`${spot?.Reviews ? spot?.Reviews.length : 0} reviews`}</span>
                    <span className="span-separator">·</span>
                    <span className="spot-location" onClick={() => { document.getElementById('maps').scrollIntoView() }}>{`${spot?.city}, ${spot?.state}, ${spot?.country}`}</span>
                  </div>
                </div>
                <div className="session-user-buttons">
                  {sessionUser ?
                    <>
                      {sessionUser?.id === spot?.ownerId &&
                        <div>
                          <button onClick={handleEdit} className="edit-listing-button">Edit</button>
                          <button onClick={handleConfirmDelete} className="delete-listing-button">Delete</button>
                          {confirmDelete &&
                            <Modal onClose={() => setConfirmDelete(false)}>
                              <div className="delete-confirmation-modal">
                                Permanently remove listing?
                                <div className="delete-confirmation-button-outer">
                                  <button onClick={handleDelete} className='delete-confirm-button'>Delete</button>
                                </div>
                              </div>
                            </Modal>}
                        </div>}
                    </> : <></>}
                </div>
              </div>
            </div>
            <div className="outer-spot-images">
              <div className="spot-images">
                <div className="left-image-div">
                  {spot?.images &&
                    <img src={spot?.images[0]?.url} alt="exterior" className="main-image"></img>}
                </div>
                <div className="right-image-div">
                  {spot?.images?.map((image, i) => {
                    if (i > 0)
                      return (
                        <div className="side-image-div" key={image.url}>
                          <img src={`${image?.url}`} alt="interior" className={`side-images side-images${i}`}></img>
                        </div>
                      )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="spot-information-bottom">
            <div className="default-description">
              <div className="spot-info-general">
                <div className="spot-info-left">
                  <div className="spot-info-header">{spot?.type} hosted by {users[spot?.ownerId]?.firstName}</div>
                  <div className="spot-info-beds">{spot?.pets} pets · {spot?.bedspots} bedspots · {spot?.beds} beds · {spot?.baths} baths </div>
                </div>
                <div className="spot-info-right">
                  <img src={users[spot?.ownerId]?.profile_url} className='spot-owner-img'></img>
                </div>
              </div>
              <div className="spot-description">{spot?.description}</div>
              <div className="spot-calendar">
                <div className="calendar-header">Select Travel Dates</div>
                <DateRange
                  ranges={dates}
                  editableDateInputs={false}
                  moveRangeOnFirstSelection={false}
                  rangeColors={['black']}
                  onChange={(e) => setDates([e.selection])}
                  showDateDisplay={false}
                  months={2}
                  minDate={new Date()}
                  direction={"horizontal"}
                  disabledDates={getBookedDates()}
                />
              </div>
            </div>
            <BookSpot spotId={spotId} avgStarRating={avgStarRating} checkIn={checkIn} setCheckIn={setCheckIn} checkOut={checkOut} setCheckOut={setCheckOut} selectDate={selectDate} setSelectDate={setSelectDate} />
          </div>
          <Reviews spot={spot} avgStarRating={avgStarRating} spotId={spotId} />
          <Maps spot={spot} />
        </div>
      }
      {page === 2 && <EditSpot listingId={spotId} returnToListing={returnToListing} />}
    </div>
  )
}

export default SpotDetails;
